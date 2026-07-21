// Shared continuous PDF.js viewer for document modals.
class PDFViewer {
    constructor(containerId, toolbarId) {
        this.container = document.getElementById(containerId);
        this.toolbar = document.getElementById(toolbarId);
        this.currentPDF = null;
        this.pdfDoc = null;
        this.numPages = 0;
        this.pageNum = 1;
        this.scale = 1;
        this.resizeTimeout = null;
        this.renderToken = 0;
        this.pagedMode = false;

        if (!this.container) return;

        this.init();
        this.setupResizeListener();
    }

    init() {
        const controlsHTML = `
            <div class="pdf-controls-group pdf-nav-group">
                <button id="pdf-prev" class="pdf-nav-btn" title="Previous Page" disabled>
                    <i class="fas fa-chevron-left"></i>
                    <span class="pdf-nav-label">Prev</span>
                </button>
                <div class="pdf-page-badge">
                    <span id="pdf-page-info">Page 1 of 1</span>
                </div>
                <button id="pdf-next" class="pdf-nav-btn" title="Next Page" disabled>
                    <span class="pdf-nav-label">Next</span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="pdf-controls-group pdf-zoom-group">
                <button id="pdf-zoom-out" class="pdf-zoom-btn" title="Zoom Out">
                    <i class="fas fa-minus"></i>
                </button>
                <span id="pdf-zoom-info" class="pdf-zoom-badge">100%</span>
                <button id="pdf-zoom-in" class="pdf-zoom-btn" title="Zoom In">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="pdf-controls-group">
                <a id="pdf-open" class="pdf-action-btn pdf-open-btn" href="#" target="_blank" rel="noopener" title="Open PDF">
                    <i class="fas fa-external-link-alt"></i>
                    <span class="pdf-nav-label">Open</span>
                </a>
                <button id="pdf-download" class="pdf-action-btn" title="Download PDF">
                    <i class="fas fa-download"></i>
                    <span class="pdf-nav-label">Save</span>
                </button>
            </div>
        `;

        if (this.toolbar) {
            this.toolbar.innerHTML = controlsHTML;
        }

        this.pagesWrapper = document.createElement('div');
        this.pagesWrapper.className = 'pdf-pages-wrapper';
        this.container.innerHTML = '';
        this.container.appendChild(this.pagesWrapper);

        const subscribeEvent = (id, fn) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', fn);
        };

        subscribeEvent('pdf-prev', () => this.scrollToPage(this.pageNum - 1));
        subscribeEvent('pdf-next', () => this.scrollToPage(this.pageNum + 1));
        subscribeEvent('pdf-zoom-in', () => this.zoomIn());
        subscribeEvent('pdf-zoom-out', () => this.zoomOut());

        this.container.addEventListener('scroll', () => this.updateCurrentPageFromScroll(), { passive: true });
        this.ensurePDFJS();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                if (this.pdfDoc) this.renderDocument();
            }, 300);
        });
    }

    shouldUsePagedMode() {
        return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    }

    ensurePDFJS() {
        if (!window.pdfjsLib) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.async = true;
            script.onload = () => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            };
            document.head.appendChild(script);
        } else if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    }

    async waitForPDFJS() {
        this.ensurePDFJS();

        for (let attempts = 0; attempts < 50; attempts++) {
            if (window.pdfjsLib) return true;
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return false;
    }

    async loadPDF(url) {
        const loaded = await this.waitForPDFJS();
        if (!loaded) {
            if (typeof this.onError === 'function') {
                this.onError(url);
                return;
            }
            this.showError('PDF viewer is still loading. Please use Download/Open PDF.');
            return;
        }

        try {
            this.showLoading();

            const safeUrl = encodeURI(url);
            const loadingTask = window.pdfjsLib.getDocument(safeUrl);
            this.pdfDoc = await loadingTask.promise;
            this.numPages = this.pdfDoc.numPages;
            this.pageNum = 1;
            this.currentPDF = url;
            this.pagedMode = this.shouldUsePagedMode();

            const downloadBtn = document.getElementById('pdf-download');
            const openBtn = document.getElementById('pdf-open');
            if (openBtn) {
                openBtn.href = safeUrl;
            }
            if (downloadBtn) {
                downloadBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = safeUrl;
                    a.download = url.split('/').pop();
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
            }

            await this.renderDocument();
            this.updateControls();
            this.hideLoading();
        } catch (error) {
            console.error('Error loading PDF:', error);
            if (typeof this.onError === 'function') {
                this.onError(url, error);
                return;
            }
            this.showError('Failed to load the full PDF. Please download or open it in a new tab.');
            this.hideLoading();
        }
    }

    async renderDocument() {
        this.pagedMode = this.shouldUsePagedMode();

        if (this.pagedMode) {
            await this.renderSinglePage(this.pageNum || 1);
            return;
        }

        await this.renderAllPages();
    }

    async renderSinglePage(num) {
        if (!this.pdfDoc || !this.pagesWrapper) return;

        const token = ++this.renderToken;
        const pageNumber = Math.min(Math.max(num, 1), this.numPages);

        this.pageNum = pageNumber;
        this.pagesWrapper.innerHTML = '';
        this.showLoading(`Loading page ${pageNumber} of ${this.numPages}...`);

        const pageShell = document.createElement('section');
        pageShell.className = 'pdf-page-shell';
        pageShell.dataset.pageNumber = String(pageNumber);
        pageShell.setAttribute('aria-label', `Page ${pageNumber} of ${this.numPages}`);

        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        pageShell.appendChild(canvas);
        this.pagesWrapper.appendChild(pageShell);

        await this.renderPageToCanvas(pageNumber, canvas);
        if (token !== this.renderToken) return;

        this.container.scrollTop = 0;
        this.hideLoading();
        this.updateControls();
    }

    async renderAllPages() {
        if (!this.pdfDoc || !this.pagesWrapper) return;

        const token = ++this.renderToken;
        const previousPage = this.pageNum;
        this.pagesWrapper.innerHTML = '';
        this.showLoading(`Loading ${this.numPages} pages...`);

        for (let num = 1; num <= this.numPages; num++) {
            if (token !== this.renderToken) return;

            const pageShell = document.createElement('section');
            pageShell.className = 'pdf-page-shell';
            pageShell.dataset.pageNumber = String(num);
            pageShell.setAttribute('aria-label', `Page ${num} of ${this.numPages}`);

            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-page-canvas';
            pageShell.appendChild(canvas);
            this.pagesWrapper.appendChild(pageShell);

            await this.renderPageToCanvas(num, canvas);
            this.updateLoadingProgress(num);
        }

        this.hideLoading();
        this.pageNum = Math.min(previousPage, this.numPages) || 1;
        this.updateControls();
    }

    async renderPageToCanvas(num, canvas) {
        const page = await this.pdfDoc.getPage(num);
        const containerWidth = Math.max(this.container.clientWidth - 32, 260);
        const unscaledViewport = page.getViewport({ scale: 1 });
        const fitScale = containerWidth / unscaledViewport.width;
        const cssScale = Math.min(fitScale * this.scale, 3);
        const viewport = page.getViewport({ scale: cssScale });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const context = canvas.getContext('2d');

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        await page.render({
            canvasContext: context,
            viewport,
            intent: 'display'
        }).promise;
    }

    scrollToPage(num) {
        if (!this.pagesWrapper || num < 1 || num > this.numPages) return;

        if (this.pagedMode) {
            this.renderSinglePage(num);
            return;
        }

        const page = this.pagesWrapper.querySelector(`[data-page-number="${num}"]`);
        if (!page) return;

        this.pageNum = num;
        page.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.updateControls();
    }

    updateCurrentPageFromScroll() {
        if (this.pagedMode) return;
        if (!this.pagesWrapper) return;

        const pages = Array.from(this.pagesWrapper.querySelectorAll('.pdf-page-shell'));
        if (!pages.length) return;

        const containerTop = this.container.getBoundingClientRect().top;
        let closestPage = this.pageNum;
        let closestDistance = Infinity;

        pages.forEach(page => {
            const distance = Math.abs(page.getBoundingClientRect().top - containerTop);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPage = Number(page.dataset.pageNumber);
            }
        });

        if (closestPage !== this.pageNum) {
            this.pageNum = closestPage;
            this.updateControls();
        }
    }

    async zoomIn() {
        if (this.scale >= 2.5) return;
        this.scale += 0.25;
        await this.renderDocument();
    }

    async zoomOut() {
        if (this.scale <= 0.5) return;
        this.scale -= 0.25;
        await this.renderDocument();
    }

    updateControls() {
        const pageInfo = document.getElementById('pdf-page-info');
        const zoomInfo = document.getElementById('pdf-zoom-info');
        const prevBtn = document.getElementById('pdf-prev');
        const nextBtn = document.getElementById('pdf-next');

        if (pageInfo) pageInfo.textContent = `Page ${this.pageNum} of ${this.numPages || 1}`;
        if (zoomInfo) zoomInfo.textContent = `${Math.round(this.scale * 100)}%`;
        if (prevBtn) prevBtn.disabled = this.pageNum <= 1;
        if (nextBtn) nextBtn.disabled = this.pageNum >= this.numPages;
    }

    showLoading(message = 'Loading PDF...') {
        let loader = document.getElementById('pdf-viewer-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'pdf-viewer-loader';
            loader.className = 'pdf-viewer-loader';
            this.container.style.position = 'relative';
            this.container.appendChild(loader);
        }
        loader.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${message}</span>`;
        loader.style.display = 'flex';
    }

    updateLoadingProgress(pageNum) {
        const loader = document.getElementById('pdf-viewer-loader');
        if (loader) {
            loader.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Loading page ${pageNum} of ${this.numPages}...</span>`;
        }
    }

    hideLoading() {
        const loader = document.getElementById('pdf-viewer-loader');
        if (loader) loader.style.display = 'none';
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="pdf-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                ${this.currentPDF ? `<a href="${encodeURI(this.currentPDF)}" target="_blank" rel="noopener" class="btn btn-primary">Open PDF</a>` : ''}
            </div>
        `;
    }

    destroy() {
        this.renderToken++;
        this.pdfDoc = null;
        this.currentPDF = null;
        this.numPages = 0;
        this.pageNum = 1;
        if (this.container) {
            this.container.innerHTML = '';
            this.container.style.position = '';
        }
        if (this.toolbar) this.toolbar.innerHTML = '';
    }

    clear() {
        this.destroy();
    }
}
