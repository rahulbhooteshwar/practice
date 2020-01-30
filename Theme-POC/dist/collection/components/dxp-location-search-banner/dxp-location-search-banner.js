import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-location-search-banner */
export class LocationSearchBanner {
    constructor() {
        /** whether image should use its size or be responsive */
        this.responsive = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.bannerData) {
            // Banner properties
            this.eyebrowTitle = this.bannerData['eyebrow-title'];
            this.bannerTitle = this.bannerData['banner-title'];
            this.descriptionText = this.bannerData['description-text'];
            // Image properties
            this.src = this.bannerData['src'];
            this.alt = this.bannerData['src'];
            this.responsive = this.bannerData['responsive'];
            this.ariaLabel = this.bannerData['aria-label'];
            this.focalPoint = this.bannerData['focal-point'];
            this.focalPointLg = this.bannerData['focal-point-lg'];
            this.focalPointMd = this.bannerData['focal-point-md'];
            // Location Selector properties
            this.placeholder = this.bannerData['placeholder'];
            this.apiKey = this.bannerData['api-key'];
            this.searchType = this.bannerData['search-type'];
            // CTA properties
            this.searchInputType = this.bannerData['search-input-type'];
            this.searchBtnType = this.bannerData['search-btn-type'];
            this.searchBtnText = this.bannerData['search-btn-text'];
        }
    }
    /** Component did load */
    componentDidLoad() {
        const dxpCta = this.element ? this.element.querySelector('dxp-cta') : this.element.querySelector('dxp-cta');
        dxpCta.addEventListener('click', () => {
            this.locationSelected.emit(this.locationData);
            dxp.log.info(this.element.tagName, ' Location Data ===> ', this.locationData);
        });
    }
    /** Render the location-search-banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-location-search-banner render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "image-container" },
                h("dxp-image", { src: this.src, alt: this.alt, responsive: this.responsive, "aria-label": this.ariaLabel, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd })),
            h("div", { class: "dxp-container banner-content" },
                this.eyebrowTitle || this.bannerTitle || this.descriptionText ?
                    h("div", { class: "dxp-row" },
                        h("div", { class: "dxp-col-12 dxp-col-md-10 dxp-col-lg-6" },
                            this.eyebrowTitle && h("p", { class: "dxp-eyebrow-lg", innerHTML: this.eyebrowTitle }),
                            this.bannerTitle && h("h1", { innerHTML: this.bannerTitle }),
                            this.descriptionText && h("p", { class: "lead", innerHTML: this.descriptionText }))) : undefined,
                h("div", { class: "dxp-row" },
                    h("div", { class: "dxp-col-12 dxp-col-lg-6 location-selector" },
                        h("dxp-location-selector", { placeholder: this.placeholder, "api-key": this.apiKey, "search-type": this.searchType })),
                    h("div", { class: "dxp-col-12 dxp-col-lg-2" },
                        h("dxp-cta", { type: this.searchInputType, text: this.searchBtnText, "button-type": this.searchBtnType }))))));
    }
    static get is() { return "dxp-location-search-banner"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-location-search-banner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-location-search-banner.css"]
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
        "apiKey": {
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
                "text": "api-key for url to search offer"
            },
            "attribute": "api-key",
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
        "bannerData": {
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
                "text": "Location search banner data for script support"
            },
            "attribute": "banner-data",
            "reflect": false
        },
        "bannerTitle": {
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
                "text": "bannerText"
            },
            "attribute": "banner-title",
            "reflect": false
        },
        "descriptionText": {
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
                "text": "description"
            },
            "attribute": "description-text",
            "reflect": false
        },
        "eyebrowTitle": {
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
                "text": "Eyeborw title"
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
        "placeholder": {
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
                "text": "placeholder text for search box"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "responsive": {
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
                "text": "whether image should use its size or be responsive"
            },
            "attribute": "responsive",
            "reflect": false,
            "defaultValue": "false"
        },
        "searchBtnText": {
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
                "text": "text to show in the CTA"
            },
            "attribute": "search-btn-text",
            "reflect": false
        },
        "searchBtnType": {
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
                "text": "CTA type to show the link OR button"
            },
            "attribute": "search-btn-type",
            "reflect": false
        },
        "searchInputType": {
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
                "text": "CTA input field type"
            },
            "attribute": "search-input-type",
            "reflect": false
        },
        "searchType": {
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
                "text": "searchType for search offer by cities,region ex"
            },
            "attribute": "search-type",
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
                "text": "Image path to display the banner image"
            },
            "attribute": "src",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "locationSelected",
            "name": "locationSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "This emit the selected checkbox data to listen any event listener"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
}
