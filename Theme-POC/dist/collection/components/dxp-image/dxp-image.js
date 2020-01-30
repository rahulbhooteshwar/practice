import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-image */
export class Image {
    constructor() {
        /** position of the caption on image */
        this.captionPosition = 'bottom-left';
        /** Text to be shown on overlay */
        this.imageTitle = '';
    }
    /** watch change in image path and update the data-src accordingly for lazyloading */
    imagePathChangeHandler() {
        this.imgSrc = this.src;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.loadResource();
        this.calculateFocalPoint();
    }
    /** updating rendered state with the componentDidLoad() */
    componentDidLoad() {
        this.imageContainer = this.element ? this.element.querySelector('.image-container') : this.element.querySelector('.image-container');
        this.anchorElm = this.element ? this.element.querySelector('.image-container a') : this.element.querySelector('.image-container a');
        this.imgParentElm = this.anchorElm ? this.anchorElm : this.imageContainer;
        this.componentParentElm = this.element.parentElement;
        this.img = this.element ? this.element.querySelector('img') : this.element.querySelector('img');
        this.lazyLoadImage();
        // Apply focal point values on image as per X and Y coordinates
        this.applyFocalPoints();
    }
    /** component will update  */
    componentWillUpdate() {
        if (this.responsive) {
            this.img.removeAttribute('style');
            this.imgParentElm.removeAttribute('style');
            return;
        }
    }
    /** component did update  */
    componentDidUpdate() {
        this.lazyLoadImage();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** window resize */
    windowResizes() {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.loadResource();
        }, 300);
    }
    /** Apply focal point values on image as per X and Y coordinates */
    applyFocalPoints() {
        const dir = this.dir.toLowerCase();
        if (this.focalPoints && this.xPos !== undefined && this.yPos !== undefined && !this.responsive) {
            this.img.style.left = dir !== 'rtl' ? `${this.xPos}%` : `-${this.xPos}%`;
            // in case parent height is auto, focal point works only horizontally
            if (window.getComputedStyle(this.componentParentElm).height === 'auto') {
                this.img.style.transform = dir !== 'rtl' ? `translate(-${this.xPos}%, ${0})` : `translate(${this.xPos}%, ${0}%)`;
            }
            else {
                this.img.style.transform = dir !== 'rtl' ? `translate(-${this.xPos}%, -${this.yPos}%)` : `translate(${this.xPos}%, -${this.yPos}%)`;
                this.img.style.top = `${this.yPos}%`;
            }
        }
    }
    /** calculate device specific focal point */
    calculateDeviceFocalPoint(fpMd, fpLg, fpXl) {
        fpMd ? this.focalPoints = fpMd : fpLg ? this.focalPoints = fpLg : fpXl ? this.focalPoints = fpXl : this.focalPoints = '';
    }
    /** calculate focal point */
    calculateFocalPoint() {
        // Separate out focal point value and store in respective variables
        if (this.focalPoints !== undefined) {
            try {
                this.focalPoints = typeof this.focalPoints === 'string' && this.focalPoints.length !== 0 ? JSON.parse(this.focalPoints) : this.focalPoints;
                if (this.focalPoints.length === 2 && this.focalPoints[0] <= 10 && this.focalPoints[1] <= 10) {
                    this.xPos = this.dir !== 'rtl' ? this.focalPoints[0] * 10 : (10 - this.focalPoints[0]) * 10;
                    this.yPos = this.focalPoints[1] * 10;
                }
                else {
                    this.focalPoints = undefined;
                }
            }
            catch (err) {
                this.focalPoints = undefined;
                dxp.log.error(this.element.tagName, 'calculateFocalPoint()', 'Error message: ', err);
                return false;
            }
        }
    }
    /** emit analytics data */
    emitAnalyticsData() {
        const analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_title': this.imageTitle,
            'di_comp_src': this.imgSrc
        };
        this.analyticsDataEmitter.emit(analyticsInfoObj);
        dxp.log.info(this.element.tagName, 'emitAnalytics()', analyticsInfoObj);
    }
    /** lazy load fallback condition for IE and Edge browser */
    fallBack() {
        const lazyloadImage = this.base.shadowRootQuerySelector(this.element, 'img', false);
        setTimeout(() => {
            const scrollTop = window.pageYOffset;
            if (lazyloadImage['offsetTop'] < (window.innerHeight + scrollTop)) {
                lazyloadImage['src'] = lazyloadImage['dataset'].src;
                lazyloadImage.classList.remove('lazy');
            }
        }, 20);
    }
    /** apply lazy loading for browser chrome, safari and firefox. Not supported on IE/Edge as it does not support event */
    lazyLoadImage() {
        let lazyloadImage;
        if (window['IntersectionObserver']) {
            lazyloadImage = this.base.shadowRootQuerySelector(this.element, 'img', false);
            const imageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy');
                        imageObserver.unobserve(image);
                    }
                });
            });
            if (lazyloadImage) {
                imageObserver.observe(lazyloadImage);
            }
        }
        else {
            this.fallBack();
        }
    }
    /** Load dynamic resources */
    loadResource() {
        if (this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg') {
            this.src ? this.imgSrc = this.src : this.imgSrc = '';
            this.calculateDeviceFocalPoint('', '', this.focalPoint);
        }
        else if (this.base.getDeviceWidthType() === 'md') {
            this.srcLg ? this.imgSrc = this.srcLg : this.src ? this.imgSrc = this.src : this.imgSrc = '';
            this.calculateDeviceFocalPoint('', this.focalPointLg, this.focalPoint);
        }
        else {
            this.srcMd ? this.imgSrc = this.srcMd : this.srcLg ? this.imgSrc = this.srcLg : this.src ? this.imgSrc = this.src : this.imgSrc = '';
            this.calculateDeviceFocalPoint(this.focalPointMd, this.focalPointLg, this.focalPoint);
        }
        this.calculateFocalPoint();
        setTimeout(() => {
            if (this.focalPoints && !this.responsive) {
                this.applyFocalPoints();
            }
        }, 300);
    }
    /** render captions on image */
    renderCaptions() {
        return ((this.captionTitle || this.captionEyebrow || this.captionSubtitle) && h("div", { class: this.captionPosition },
            this.captionEyebrow && h("p", { class: "dxp-title-eyebrow dxp-font-size-lg" }, this.captionEyebrow),
            this.captionTitle && h("h3", { class: "dxp-title-1" }, this.captionTitle),
            h("p", { class: this.captionSubtitle ? 'description dxp-hidden-xs-only' : 'description' }, this.captionSubtitle)));
    }
    /** Render the image */
    render() {
        return (this.imgSrc && this.imgSrc.length ?
            h("div", { class: this.base.componentClass(), dir: this.dir },
                h("link", { rel: "stylesheet", href: `` }),
                this.theme && [
                    h("link", { rel: "stylesheet", href: `` }),
                    h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-image.min.css` })
                ],
                this.dtmUrl && (h("script", { src: this.dtmUrl })),
                h("div", { class: "image-container" },
                    this.href ?
                        h("a", { href: this.href, "aria-label": this.ariaLabel, target: this.openInNewTab ? '_blank' : '_self', onClick: () => this.emitAnalyticsData() },
                            h("img", { class: this.focalPoints && !this.responsive ? 'focal-point-img' : this.responsive ? 'dxp-img-fluid' : undefined, alt: this.alt, title: this.imageTitle, "data-src": this.imgSrc }),
                            this.enableOverlay && h("div", { class: "overlay" },
                                h("p", null,
                                    this.imageTitle,
                                    h("slot", { name: "overlay" })))) :
                        [
                            h("img", { class: this.focalPoints && !this.responsive ? 'focal-point-img' : this.responsive ? 'dxp-img-fluid' : undefined, alt: this.alt, title: this.imageTitle, "data-src": this.imgSrc }),
                            this.enableOverlay && h("div", { class: "overlay" },
                                h("p", null,
                                    this.imageTitle,
                                    h("slot", { name: "overlay" })))
                        ],
                    this.renderCaptions())) : undefined);
    }
    static get is() { return "dxp-image"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-image.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-image.css"]
    }; }
    static get properties() { return {
        "alt": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Alt/title text for image. Also for SEO."
            },
            "attribute": "alt",
            "reflect": false
        },
        "ariaLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "aria-label for image link. Also for accessibility."
            },
            "attribute": "aria-label",
            "reflect": false
        },
        "captionEyebrow": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "eyebrow of caption to be shown over the image"
            },
            "attribute": "caption-eyebrow",
            "reflect": false
        },
        "captionPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'centered'",
                "resolved": "\"bottom-left\" | \"bottom-right\" | \"centered\" | \"top-left\" | \"top-right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "position of the caption on image"
            },
            "attribute": "caption-position",
            "reflect": false,
            "defaultValue": "'bottom-left'"
        },
        "captionSubtitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "subtitle of caption to be shown over the image"
            },
            "attribute": "caption-subtitle",
            "reflect": false
        },
        "captionTitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title of caption to be shown over the image"
            },
            "attribute": "caption-title",
            "reflect": false
        },
        "deviceHeight": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Device height"
            },
            "attribute": "device-height",
            "reflect": true
        },
        "enableOverlay": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Enables overlay on the image if set to true"
            },
            "attribute": "enable-overlay",
            "reflect": false
        },
        "focalPoint": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Focal point of XL images"
            },
            "attribute": "focal-point",
            "reflect": false
        },
        "focalPointLg": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "focal point for large devices"
            },
            "attribute": "focal-point-lg",
            "reflect": false
        },
        "focalPointMd": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "focal point for medium devices"
            },
            "attribute": "focal-point-md",
            "reflect": false
        },
        "href": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Link destination when clicked."
            },
            "attribute": "href",
            "reflect": false
        },
        "imageTitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Text to be shown on overlay"
            },
            "attribute": "image-title",
            "reflect": false,
            "defaultValue": "''"
        },
        "imgSrc": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "imgSrc"
            },
            "attribute": "img-src",
            "reflect": false
        },
        "openInNewTab": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Link target.  Set to true to open in an new window."
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "responsive": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "whether image should use its size or be responsive"
            },
            "attribute": "responsive",
            "reflect": false
        },
        "srcLg": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "source lg"
            },
            "attribute": "src-lg",
            "reflect": false
        },
        "srcMd": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "source md"
            },
            "attribute": "src-md",
            "reflect": false
        },
        "src": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Path for the image to display"
            },
            "attribute": "src",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "dtmUrl": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "src",
            "methodName": "imagePathChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "resize",
            "method": "windowResizes",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
