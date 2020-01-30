import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
const XL_BANNER = 'extra-long';
const BANNER_BENEFITS_HERO = '.dxp-banner-benefits-hero';
const FULL_HEIGHT_BANNER = 'full-height-banner';
/** dxp-banner-benefits-hero */
export class BannerBenefitsHero {
    constructor() {
        /** to give custom id to banner */
        this.customId = 'benefits-hero';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['benefits-hero', 'js-fontsize', this.theme].join(' ');
        const sizeAndWidthCheck = ([XL_BANNER, 'long'].includes(this.bannerSize)) && (window.innerWidth >= 992);
        this.responsive = !this.base.returnBooleanValue(sizeAndWidthCheck);
    }
    /** Actions to perform after component load */
    componentDidLoad() {
        this.applyWindowHeight();
        window.addEventListener('orientationchange', () => {
            dxp.log.debug(this.element.tagName, 'componentDidLoad()', `inside orientationchange`);
            setTimeout(() => {
                const sizeAndWidthCheck = ([XL_BANNER, 'long'].includes(this.bannerSize)) && (window.innerWidth >= 992);
                this.responsive = !this.base.returnBooleanValue(sizeAndWidthCheck);
                this.applyWindowHeight();
            }, 200);
        });
        this.applyContentHeight();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** apply height to banner - sm,lg,md */
    applyBannerHeight(contentWrapper, imageWrapper, bannerMaxHeight, bannerStateSize) {
        if (contentWrapper && imageWrapper && this.clientHeight(contentWrapper) > bannerMaxHeight.substr(0, bannerMaxHeight.length - 2)) {
            contentWrapper.style.paddingBottom = '10px';
            imageWrapper.style.height = `${this.clientHeight(contentWrapper)}px`;
            bannerStateSize.style.maxHeight = 'none';
        }
    }
    /** Apply content height for dynamic content */
    applyContentHeight() {
        const imgRoot = this.element ? this.element.querySelector('dxp-image') : this.element.querySelector('dxp-image');
        const imgLoad = imgRoot ? imgRoot.querySelector('img') : imgRoot.querySelector('img');
        if (imgLoad) {
            imgLoad.addEventListener('load', () => {
                if (this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg') {
                    this.calculateBannerHeight();
                }
            });
        }
    }
    /** Apply window height to banner */
    applyWindowHeight() {
        const windowHeight = window.innerHeight;
        const extraLong = this.element ? this.element.querySelector('.extra-long') : this.element.querySelector('.extra-long');
        const benefitsHeroContainer = this.element ?
            this.element.querySelector(BANNER_BENEFITS_HERO)
            :
                this.element.querySelector(BANNER_BENEFITS_HERO);
        if (window.innerWidth >= 992 && extraLong && benefitsHeroContainer) {
            benefitsHeroContainer.style.height = `${windowHeight}px`;
            benefitsHeroContainer.classList.add(FULL_HEIGHT_BANNER);
        }
        else if (window.innerWidth < 992 && extraLong && benefitsHeroContainer) {
            dxp.log.debug(this.element.tagName, 'applyWindowHeight()', `inside applyWindowHeight in else block`);
            benefitsHeroContainer.classList.remove(FULL_HEIGHT_BANNER);
            benefitsHeroContainer.removeAttribute('style');
        }
    }
    /** apply height to extra-long banner */
    applyXLBannerHeight(contentWrapper, imageWrapper) {
        if (contentWrapper && this.clientHeight(contentWrapper) > window.innerHeight) {
            contentWrapper.style.paddingTop = '10px';
            imageWrapper.style.height = `${this.clientHeight(contentWrapper)}px`;
            imageWrapper.style.maxHeight = 'none';
            const benefitsHeroContainer = this.element ?
                this.element.querySelector(BANNER_BENEFITS_HERO)
                :
                    this.element.querySelector(BANNER_BENEFITS_HERO);
            benefitsHeroContainer.classList.remove(FULL_HEIGHT_BANNER);
        }
    }
    /** calculate height for large content */
    calculateBannerHeight() {
        const contentWrapper = this.base.shadowRootQuerySelector(this.element, '.content-wrapper', false);
        const imageWrapper = this.base.shadowRootQuerySelector(this.element, '.img-wrapper', false);
        const bannerStateSize = this.base.shadowRootQuerySelector(this.element, `.${this.bannerSize}`, false);
        const bannerMaxHeight = window.getComputedStyle(bannerStateSize).maxHeight;
        if (this.bannerSize === 'extra-long') {
            this.applyXLBannerHeight(contentWrapper, imageWrapper);
        }
        else {
            this.applyBannerHeight(contentWrapper, imageWrapper, bannerMaxHeight, bannerStateSize);
        }
    }
    /** method to calculate client height */
    clientHeight(elem) {
        return elem.clientHeight;
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
          #${this.customId} .banner-state h1, h2{
            color: inherit;
          }` : '';
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-benefits-hero render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })],
            h("style", null, this.renderStyles())
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("div", { id: this.customId, class: this.cssClass },
                h("div", { class: "benefits-hero-content" },
                    h("div", { class: `banner-state ${this.positionOfImageClass} ${this.bannerSize}` },
                        h("div", { class: "img-wrapper" },
                            h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "data-theme": this.theme, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "open-in-new-tab": this.openInNewTab, responsive: this.responsive })),
                        h("div", { class: "content-wrapper" },
                            h("div", { class: "text-container" },
                                this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }),
                                this.titleText &&
                                    (this.bannerSize === XL_BANNER) ?
                                    h("h2", { class: this.titleText && 'dxp-header-text', innerHTML: this.titleText }) :
                                    h("h1", { class: this.titleText && 'dxp-header-text', innerHTML: this.titleText }),
                                this.subTitle && h("p", { class: "dxp-lead", innerHTML: this.subTitle })),
                            h("slot", null)))))));
    }
    static get is() { return "dxp-banner-benefits-hero"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-benefits-hero.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-benefits-hero.css"]
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
        "bannerSize": {
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
                "text": "banner size"
            },
            "attribute": "banner-size",
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
                "text": "slide background color"
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
            "defaultValue": "'benefits-hero'"
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
                "text": "focal Point"
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
            "reflect": false
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
