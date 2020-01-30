import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const CTA_LIST = 'dxp-cta-list';
const TEXT_PARA_PAD = 'text-para-pad';
/** dxp-pull-quote */
export class PullQuote {
    constructor() {
        /** whether image should use its size or be responsive */
        this.responsive = true;
    }
    /** Listener that looks for pullQuote object to be assigned/changed externally */
    pullQuoteDataChangeHandler() {
        if (!this.pullQuoteData) {
            return;
        }
        if (this.pullQuoteData.imageField) {
            this.base.createNestedMarkup(this.imageContainer, 'dxp-image', this.pullQuoteData.imageField);
        }
        if (this.pullQuoteData.quickLinks) {
            this.base.createNestedMarkup(this.ctaContainer, CTA_LIST, this.pullQuoteData.quickLinks);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.pullQuoteData) {
            this.pullQuoteData = (typeof this.pullQuoteData === 'string') ? JSON.parse(this.pullQuoteData) : this.pullQuoteData;
        }
        this.withImage = this.src || (this.pullQuoteData && this.pullQuoteData.imageField) ? 'with-image' : undefined;
    }
    /** actions to be performed after the component loading */
    async componentDidLoad() {
        this.pullQuoteDataChangeHandler();
        await this.checkCTAListOrientation();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** check cta list orientation */
    async checkCTAListOrientation() {
        let dxpCTAList = this.element.querySelector(CTA_LIST);
        dxpCTAList = dxpCTAList ? dxpCTAList : this.element.querySelector(CTA_LIST); // check cta-list is present
        if (dxpCTAList) {
            await dxpCTAList.componentOnReady().then(res => {
                if (res.orientation === 'horizontal') {
                    let CTABlock = this.element.querySelector('.cta-block');
                    CTABlock = CTABlock ? CTABlock : this.element.querySelector('.cta-block');
                    if (CTABlock) {
                        CTABlock.classList.add('cta-block-container');
                    }
                }
            }).catch(error => {
                dxp.log.error(this.element.tagName, 'checkCTAListOrientation()', 'Error message: fail to fetch cta list - ', error);
            });
        }
    }
    /** check CTA present */
    checkCTAPresent() {
        let dxpCTAList = this.element.querySelector(CTA_LIST);
        dxpCTAList = dxpCTAList ? dxpCTAList : this.element.querySelector(CTA_LIST); // check cta-list is present
        let dxpCTA = this.element.querySelector('dxp-cta');
        dxpCTA = dxpCTA ? dxpCTA : this.element.querySelector('dxp-cta'); // check cta is present
        return (this.base.returnBooleanValue((this.pullQuoteData && this.pullQuoteData.quickLinks) || dxpCTA || dxpCTAList));
    }
    /** render cta */
    renderCta() {
        return (h("div", { class: `${(this.titleText || (this.pullQuoteData && this.pullQuoteData.titleText)) ? 'cta-pad' : ''} cta-block`, ref: el => this.ctaContainer = el },
            h("slot", { name: "ctalist" })));
    }
    /** render eyebrow tiltle */
    renderEyebrowTitle() {
        return (this.eyebrowTitle ?
            h("p", { class: `${this.titleText ? 'eyebrow-margin' : ''} dxp-title-eyebrow dxp-font-size-sm`, innerHTML: this.eyebrowTitle })
            :
                (this.pullQuoteData && this.pullQuoteData.eyebrowTitle)
                    && h("p", { class: `${this.pullQuoteData.titleText ? 'eyebrow-margin' : ''} dxp-title-eyebrow dxp-font-size-sm `, innerHTML: this.pullQuoteData.eyebrowTitle }));
    }
    /** render the quote text */
    renderQuoteText() {
        return (this.quote ?
            h("div", { class: `${this.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-description dxp-font-size-sm`, innerHTML: this.quote })
            :
                (this.pullQuoteData && this.pullQuoteData.quote) &&
                    h("div", { class: `${this.pullQuoteData.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-description dxp-font-size-sm`, innerHTML: this.pullQuoteData.quote }));
    }
    /** render text paragraphs */
    renderTextPara() {
        return (h("div", { class: "text-para" },
            this.author ?
                h("p", { class: `${this.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-name dxp-font-size-lg`, innerHTML: this.author })
                :
                    (this.pullQuoteData && this.pullQuoteData.author) &&
                        h("p", { class: `${this.pullQuoteData.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-name dxp-font-size-lg `, innerHTML: this.pullQuoteData.author }),
            this.profile ?
                h("p", { class: `${this.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-details dxp-font-size-md`, innerHTML: this.profile })
                :
                    (this.pullQuoteData && this.pullQuoteData.profile) &&
                        h("p", { class: `${this.pullQuoteData.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-details dxp-font-size-md`, innerHTML: this.pullQuoteData.profile }),
            this.renderQuoteText()));
    }
    /** Render the pull-quote */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-pull-quote render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-pull-quote.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("div", { class: "pull-quote-content" },
                h("div", { class: `pull-quote-state ${this.withImage}` },
                    h("div", { class: "content-wrap" },
                        this.renderEyebrowTitle(),
                        this.titleText ?
                            h("h2", { class: "dxp-pull-quote-heading", innerHTML: this.titleText })
                            :
                                (this.pullQuoteData && this.pullQuoteData.titleText) && h("h2", { class: "dxp-pull-quote-heading", innerHTML: this.pullQuoteData.titleText }),
                        (this.author || this.profile || this.quote || (this.pullQuoteData && (this.pullQuoteData.author || this.pullQuoteData.profile || this.pullQuoteData.quote))) ?
                            this.renderTextPara()
                            : '',
                        this.checkCTAPresent() ?
                            this.renderCta()
                            : '')),
                this.withImage && h("div", { class: "img-wrap", ref: el => this.imageContainer = el },
                    h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "aria-label": this.ariaLabel, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive })))));
    }
    static get is() { return "dxp-pull-quote"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-pull-quote.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-pull-quote.css"]
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
        "author": {
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
                "text": "name of the  author"
            },
            "attribute": "author",
            "reflect": false
        },
        "ctaData": {
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
                "text": "cta data for child components"
            },
            "attribute": "cta-data",
            "reflect": false
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
                "text": "eyebrow text for dxp-pull-quote"
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
                "text": "Array of coordinates to set the focal point of the image. values can be passed as an array of coordinates to set\nthe focal point of the image on small sized devices.[up, down, left, right]"
            },
            "attribute": "focal-point",
            "reflect": true
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
            "reflect": true
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
            "reflect": true
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
        "profile": {
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
                "text": "profile of the author"
            },
            "attribute": "profile",
            "reflect": false
        },
        "quote": {
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
                "text": "quote given by author"
            },
            "attribute": "quote",
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
            "reflect": true,
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
                "text": "Path for the image to display"
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
                "text": "title text for dxp-pull-quote"
            },
            "attribute": "title-text",
            "reflect": false
        },
        "pullQuoteData": {
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
                "text": "pullQuoteData"
            },
            "attribute": "pull-quote-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "pullQuoteData",
            "methodName": "pullQuoteDataChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
