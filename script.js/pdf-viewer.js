// pdf-viewer.js
class PDFViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPDF = null;
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 1.0; // Start with a more mobile-friendly default scale

        // Debounce resize listener
        this.resizeTimeout = null;

        this.init();
        this.setupResizeListener();
    }

    init() {
        // Create canvas for PDF rendering
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'pdf-canvas';
        this.canvas.style.display = 'block';
        this.canvas.style.margin = '0 auto';
        this.canvas.style.maxWidth = '100%';

        // Create controls
        this.controls = document.createElement('div');
        this.controls.className = 'pdf-controls';
        this.controls.innerHTML = `
            <button id="pdf-prev" class="btn btn-secondary">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            <span id="pdf-page-info">Page 1 of 1</span>
            <button id="pdf-next" class="btn btn-secondary">
                Next <i class="fas fa-chevron-right"></i>
            </button>
            <div class="pdf-zoom-controls">
                <button id="pdf-zoom-out" class="btn btn-secondary">
                    <i class="fas fa-search-minus"></i>
                </button>
                <button id="pdf-zoom-in" class="btn btn-secondary">
                    <i class="fas fa-search-plus"></i>
                </button>
            </div>
            <button id="pdf-download" class="btn btn-primary">
                <i class="fas fa-download"></i> Download
            </button>
        `;

        // Clear container and add elements
        this.container.innerHTML = '';
        this.container.appendChild(this.controls);

        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'canvas-wrapper';
        canvasWrapper.style.overflow = 'auto';
        canvasWrapper.style.background = '#888';
        canvasWrapper.style.padding = '20px 0';
        canvasWrapper.appendChild(this.canvas);
        this.container.appendChild(canvasWrapper);

        // Add event listeners
        document.getElementById('pdf-prev').addEventListener('click', () => this.onPrevPage());
        document.getElementById('pdf-next').addEventListener('click', () => this.onNextPage());
        document.getElementById('pdf-zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('pdf-zoom-out').addEventListener('click', () => this.zoomOut());

        // Ensure PDF.js is available
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

            this.pageRendering = false;
            if (this.pageNumPending !== null) {
                this.renderPage(this.pageNumPending);
                this.pageNumPending = null;
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            this.pageRendering = false;
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
        document.getElementById('pdf-page-info').textContent =
            `Page ${this.pageNum} of ${this.numPages}`;
        document.getElementById('pdf-prev').disabled = this.pageNum <= 1;
        document.getElementById('pdf-next').disabled = this.pageNum >= this.numPages;
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
    }
}
