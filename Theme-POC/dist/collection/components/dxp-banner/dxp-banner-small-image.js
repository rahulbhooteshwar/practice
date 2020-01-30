import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-small-image */
export class BannerSmallImage {
    constructor() {
        /** to give custom id to banner */
        this.customId = 'banner-small';
        /** whether image should use its size or be responsive */
        this.responsive = true;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['banner-small', 'js-fontsize', this.theme].join(' ');
        this.responsive = (this.base.getDeviceWidthType() === 'sm' || this.base.getDeviceWidthType() === 'md');
    }
    /** Actions to perform after component load */
    componentDidLoad() {
        if (this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg') {
            const contentWrapper = this.base.shadowRootQuerySelector(this.element, '.content-wrapper', false);
            const imageWrapper = this.base.shadowRootQuerySelector(this.element, '.img-wrapper', false);
            if (contentWrapper && imageWrapper) {
                imageWrapper.style.height = `${contentWrapper.clientHeight}px`;
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** to generate dynamic styles */
    renderStyles() {
        const bgColor = this.cardColor ? `background-color: ${this.cardColor};` : '';
        const txtColor = this.textColor ? `color: ${this.textColor};` : '';
        return (this.textColor || this.cardColor) ?
            `#${this.customId} .banner-state{
            ${bgColor} ${txtColor}
          }
          #${this.customId} .banner-state .dxp-title-eyebrow,
          #${this.customId} .banner-state .dxp-lead,
          #${this.customId} .banner-state h2{
            color: inherit;
          }` : '';
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-small render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })],
            h("style", null, this.renderStyles())
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("div", { id: this.customId, class: this.cssClass },
                h("div", { class: `banner-large banner-small-content` },
                    h("div", { class: `banner-state ${this.positionOfImageClass}` },
                        h("div", { class: "img-wrapper" },
                            h("dxp-image", { "data-theme": this.theme, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "open-in-new-tab": this.openInNewTab, responsive: this.responsive })),
                        h("div", { class: "content-wrapper" },
                            h("div", { class: "text-container" },
                                this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }),
                                this.titleText && h("h2", { innerHTML: this.titleText }),
                                this.subTitle && h("p", { class: "dxp-lead", innerHTML: this.subTitle })),
                            h("slot", null)))))));
    }
    static get is() { return "dxp-banner-small-image"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-small-image.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-small-image.css"]
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
                "text": "alt Text"
            },
            "attribute": "alt",
            "reflect": false
        },
        "bannerType": {
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
                "text": "banner type"
            },
            "attribute": "banner-type",
            "reflect": false
        },
        "cardColor": {
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
                "text": "slide text color"
            },
            "attribute": "card-color",
            "reflect": false
        },
        "cta": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "cta attributes"
            },
            "attribute": "cta",
            "reflect": false
        },
        "customId": {
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
                "text": "to give custom id to banner"
            },
            "attribute": "custom-id",
            "reflect": false,
            "defaultValue": "'banner-small'"
        },
        "eyebrowTitle": {
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
                "text": "eyebrow title"
            },
            "attribute": "eyebrow-title",
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
                "text": "image Href"
            },
            "attribute": "href",
            "reflect": false
        },
        "imageEnableOverlay": {
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
                "text": "position Of Image"
            },
            "attribute": "image-enable-overlay",
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
                "text": "image Title"
            },
            "attribute": "image-title",
            "reflect": false
        },
        "openInNewTab": {
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
                "text": "Open in new tab"
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "positionOfImage": {
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
                "text": "position Of Image"
            },
            "attribute": "position-of-image",
            "reflect": false
        },
        "positionOfImageClass": {
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
                "text": "image position as per dir attribute (if any)"
            },
            "attribute": "position-of-image-class",
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
            "reflect": false,
            "defaultValue": "true"
        },
        "src": {
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
                "text": "image source"
            },
            "attribute": "src",
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
        "subTitle": {
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
                "text": "subtitle"
            },
            "attribute": "sub-title",
            "reflect": false
        },
        "textColor": {
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
                "text": "slide text color"
            },
            "attribute": "text-color",
            "reflect": false
        },
        "titleText": {
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
                "text": "title text"
            },
            "attribute": "title-text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "cssClass": {},
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
