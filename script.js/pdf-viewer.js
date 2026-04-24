// pdf-viewer.js
class PDFViewer {
    constructor(containerId, toolbarId) {
        this.container = document.getElementById(containerId);
        this.toolbar = document.getElementById(toolbarId);
        this.currentPDF = null;
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 1.0;

        this.resizeTimeout = null;

        this.init();
        this.setupResizeListener();
    }

    init() {
        // Create canvas for PDF rendering
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'pdf-canvas';
        this.canvas.className = 'pdf-page-canvas';

        // Use toolbar if provided, otherwise create default
        const controlsHTML = `
            <div class="pdf-controls-group pdf-nav-group">
                <button id="pdf-prev" class="pdf-nav-btn" title="Previous Page" disabled>
                    <i class="fas fa-chevron-left"></i>
                    <span class="pdf-nav-label">Prev</span>
                </button>
                <div class="pdf-page-badge">
                    <span id="pdf-page-info">Page 1 of 1</span>
                </div>
                <button id="pdf-next" class="pdf-nav-btn" title="Next Page">
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
                <button id="pdf-download" class="pdf-action-btn" title="Download PDF">
                    <i class="fas fa-download"></i>
                    <span class="pdf-nav-label">Save</span>
                </button>
            </div>
        `;

        if (this.toolbar) {
            this.toolbar.innerHTML = controlsHTML;
        } else {
            this.controls = document.createElement('div');
            this.controls.className = 'pdf-controls-default';
            this.controls.innerHTML = controlsHTML;
            this.container.appendChild(this.controls);
        }

        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'pdf-canvas-wrapper';
        canvasWrapper.appendChild(this.canvas);
        this.container.innerHTML = '';
        this.container.appendChild(canvasWrapper);

        // Add event listeners with null checks for toolbar buttons
        const subscribeEvent = (id, fn) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', fn);
        };

        subscribeEvent('pdf-prev', () => this.onPrevPage());
        subscribeEvent('pdf-next', () => this.onNextPage());
        subscribeEvent('pdf-zoom-in', () => this.zoomIn());
        subscribeEvent('pdf-zoom-out', () => this.zoomOut());

        this.ensurePDFJS();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                if (this.pdfDoc && !this.pageRendering) {
                    this.renderPage(this.pageNum);
                }
            }, 300);
        });
        
        // Setup Swipe Gestures for Professional Navigation
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        if (startX - endX > threshold) {
            // Swipe Left -> Next Page
            this.onNextPage();
        } else if (endX - startX > threshold) {
            // Swipe Right -> Previous Page
            this.onPrevPage();
        }
    }

    ensurePDFJS() {
        if (!window.pdfjsLib) {
            console.log('Loading PDF.js...');
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.async = true; // For speed
            script.onload = () => {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            };
            document.head.appendChild(script);
        } else if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    }

    async loadPDF(url) {
        if (!window.pdfjsLib) {
            // Force load script if not yet ready
            this.ensurePDFJS();
            // Wait for it with a dynamic check instead of fixed delay
            let attempts = 0;
            while (!window.pdfjsLib && attempts < 10) {
                await new Promise(r => setTimeout(r, 100));
                attempts++;
            }
            if (!window.pdfjsLib) {
                this.showError('PDF Library still loading. Please wait a moment.');
                return;
            }
        }

        try {
            this.showLoading();

            const loadingTask = window.pdfjsLib.getDocument(url);
            this.pdfDoc = await loadingTask.promise;
            this.numPages = this.pdfDoc.numPages;
            this.pageNum = 1;
            this.currentPDF = url;

            await this.renderPage(this.pageNum);
            this.updateControls();

            // Set download button
            const downloadBtn = document.getElementById('pdf-download');
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = url.split('/').pop();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

            this.hideLoading();
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.showError('Failed to load PDF. Please try again.');
            this.hideLoading();
        }
    }

    async renderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
            return;
        }
        this.pageRendering = true;

        try {
            // Add professional fade transition
            this.canvas.style.opacity = '0.5';
            this.canvas.style.transition = 'opacity 0.2s ease-in-out';
            
            const page = await this.pdfDoc.getPage(num);

            // Calculate scale based on container width for responsiveness
            const containerWidth = this.container.clientWidth - 40; // padding
            const unscaledViewport = page.getViewport({ scale: 1 });
            const autoScale = containerWidth / unscaledViewport.width;

            // Use user-defined scale multiplied by auto-calculated responsive scale
            const finalScale = this.scale * autoScale;
            const viewport = page.getViewport({ scale: Math.min(finalScale, 3.0) });

            const canvasContext = this.canvas.getContext('2d');
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: canvasContext,
                viewport: viewport,
                intent: 'display', // Optimized for screen
                enableWebGL: true  // Speed boost if available
            };

            const renderTask = page.render(renderContext);
            await renderTask.promise;

            // Fade back in completely once rendered
            this.canvas.style.opacity = '1';

            this.pageRendering = false;
            if (this.pageNumPending !== null) {
                this.renderPage(this.pageNumPending);
                this.pageNumPending = null;
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            this.pageRendering = false;
            this.canvas.style.opacity = '1';
        }
    }

    onPrevPage() {
        if (this.pageNum <= 1) return;
        this.pageNum--;
        this.renderPage(this.pageNum);
        this.updateControls();
    }

    onNextPage() {
        if (this.pageNum >= this.numPages) return;
        this.pageNum++;
        this.renderPage(this.pageNum);
        this.updateControls();
    }

    async zoomIn() {
        if (this.scale >= 3) return;
        this.scale += 0.25;
        await this.renderPage(this.pageNum);
    }

    async zoomOut() {
        if (this.scale <= 0.5) return;
        this.scale -= 0.25;
        await this.renderPage(this.pageNum);
    }

    updateControls() {
        const pageInfo = document.getElementById('pdf-page-info');
        const zoomInfo = document.getElementById('pdf-zoom-info');
        const prevBtn = document.getElementById('pdf-prev');
        const nextBtn = document.getElementById('pdf-next');

        if (pageInfo) pageInfo.textContent = `Page ${this.pageNum} of ${this.numPages}`;
        if (zoomInfo) zoomInfo.textContent = `${Math.round(this.scale * 100)}%`;
        if (prevBtn) prevBtn.disabled = this.pageNum <= 1;
        if (nextBtn) nextBtn.disabled = this.pageNum >= this.numPages;
    }

    showLoading() {
        let loader = document.getElementById('pdf-viewer-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'pdf-viewer-loader';
            loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading PDF...';
            loader.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                padding: 20px;
                border-radius: 8px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            `;
            this.container.style.position = 'relative';
            this.container.appendChild(loader);
        }
        loader.style.display = 'block';
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
                <button onclick="location.reload()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }

    destroy() {
        this.pdfDoc = null;
        this.currentPDF = null;
        this.container.innerHTML = '';
        this.container.style.position = '';
    }

    clear() {
        this.destroy();
    }
}
