'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const CTA_LIST = 'dxp-cta-list';
const TEXT_PARA_PAD = 'text-para-pad';
const PullQuote = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
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
                core$1.dxp.log.error(this.element.tagName, 'checkCTAListOrientation()', 'Error message: fail to fetch cta list - ', error);
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
        return (core$1.h("div", { class: `${(this.titleText || (this.pullQuoteData && this.pullQuoteData.titleText)) ? 'cta-pad' : ''} cta-block`, ref: el => this.ctaContainer = el }, core$1.h("slot", { name: "ctalist" })));
    }
    /** render eyebrow tiltle */
    renderEyebrowTitle() {
        return (this.eyebrowTitle ?
            core$1.h("p", { class: `${this.titleText ? 'eyebrow-margin' : ''} dxp-title-eyebrow dxp-font-size-sm`, innerHTML: this.eyebrowTitle })
            :
                (this.pullQuoteData && this.pullQuoteData.eyebrowTitle)
                    && core$1.h("p", { class: `${this.pullQuoteData.titleText ? 'eyebrow-margin' : ''} dxp-title-eyebrow dxp-font-size-sm `, innerHTML: this.pullQuoteData.eyebrowTitle }));
    }
    /** render the quote text */
    renderQuoteText() {
        return (this.quote ?
            core$1.h("div", { class: `${this.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-description dxp-font-size-sm`, innerHTML: this.quote })
            :
                (this.pullQuoteData && this.pullQuoteData.quote) &&
                    core$1.h("div", { class: `${this.pullQuoteData.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-description dxp-font-size-sm`, innerHTML: this.pullQuoteData.quote }));
    }
    /** render text paragraphs */
    renderTextPara() {
        return (core$1.h("div", { class: "text-para" }, this.author ?
            core$1.h("p", { class: `${this.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-name dxp-font-size-lg`, innerHTML: this.author })
            :
                (this.pullQuoteData && this.pullQuoteData.author) &&
                    core$1.h("p", { class: `${this.pullQuoteData.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-name dxp-font-size-lg `, innerHTML: this.pullQuoteData.author }), this.profile ?
            core$1.h("p", { class: `${this.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-details dxp-font-size-md`, innerHTML: this.profile })
            :
                (this.pullQuoteData && this.pullQuoteData.profile) &&
                    core$1.h("p", { class: `${this.pullQuoteData.titleText ? TEXT_PARA_PAD : ''} dxp-pull-quote-details dxp-font-size-md`, innerHTML: this.pullQuoteData.profile }), this.renderQuoteText()));
    }
    /** Render the pull-quote */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-pull-quote render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-pull-quote.min.css` })]
        ];
        return (core$1.h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, core$1.h("div", { class: "pull-quote-content" }, core$1.h("div", { class: `pull-quote-state ${this.withImage}` }, core$1.h("div", { class: "content-wrap" }, this.renderEyebrowTitle(), this.titleText ?
            core$1.h("h2", { class: "dxp-pull-quote-heading", innerHTML: this.titleText })
            :
                (this.pullQuoteData && this.pullQuoteData.titleText) && core$1.h("h2", { class: "dxp-pull-quote-heading", innerHTML: this.pullQuoteData.titleText }), (this.author || this.profile || this.quote || (this.pullQuoteData && (this.pullQuoteData.author || this.pullQuoteData.profile || this.pullQuoteData.quote))) ?
            this.renderTextPara()
            : '', this.checkCTAPresent() ?
            this.renderCta()
            : '')), this.withImage && core$1.h("div", { class: "img-wrap", ref: el => this.imageContainer = el }, core$1.h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "aria-label": this.ariaLabel, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive })))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "pullQuoteData": ["pullQuoteDataChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-pull-quote{width:100%}div.dxp.dxp-pull-quote h2{quotes:inherit}div.dxp.dxp-pull-quote .pull-quote-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;position:relative}div.dxp.dxp-pull-quote .pull-quote-state{width:100%;position:inherit}div.dxp.dxp-pull-quote .content-wrap{width:100%;margin-left:0;margin-right:0}div.dxp.dxp-pull-quote .img-wrap{height:100%;width:100%;margin-bottom:2.5rem;overflow:hidden}div.dxp.dxp-pull-quote .eyebrow-margin{margin-left:22px}div.dxp.dxp-pull-quote .text-para{padding-top:.125rem}div.dxp.dxp-pull-quote .text-para-pad{padding-left:22px;line-height:18px}div.dxp.dxp-pull-quote .dxp-pull-quote-name{margin-bottom:16px;line-height:26px}div.dxp.dxp-pull-quote .dxp-pull-quote-details{margin-bottom:16px;line-height:18px}div.dxp.dxp-pull-quote .dxp-pull-quote-heading{padding-left:16px}div.dxp.dxp-pull-quote .dxp-pull-quote-description{text-decoration:underline}div.dxp.dxp-pull-quote .cta-pad{padding-left:22px;margin-top:2.5rem}\@media (min-width:768px){div.dxp.dxp-pull-quote .content-wrap .dxp-title-eyebrow{margin-bottom:24px}div.dxp.dxp-pull-quote .content-wrap .dxp-pull-quote-heading{margin-bottom:32px}div.dxp.dxp-pull-quote .img-wrap{height:768px}}\@media (min-width:992px){div.dxp.dxp-pull-quote .pull-quote-content{-ms-flex-direction:row;flex-direction:row}div.dxp.dxp-pull-quote .pull-quote-state{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:40px 0}div.dxp.dxp-pull-quote .pull-quote-state.with-image{width:50%}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-title-eyebrow{margin-bottom:32px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .eyebrow-margin{margin-left:30px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-pull-quote-heading{padding-left:24px;margin-bottom:40px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap h2:before{content:open-quote}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap h2:after{content:close-quote}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .cta-pad,div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .text-para-pad{padding-left:30px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-pull-quote-description{line-height:18px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-pull-quote-description p{margin-bottom:0}div.dxp.dxp-pull-quote .img-wrap{height:708px;width:50%;margin-bottom:0}}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .eyebrow-margin{margin-right:22px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .text-para-pad{padding-right:22px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .dxp-pull-quote-heading{padding-right:16px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .cta-pad{padding-right:22px}\@media (min-width:992px){div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .dxp-pull-quote-heading{padding-right:24px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .text-para-pad{padding-right:30px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .eyebrow-margin{margin-right:30px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .cta-pad{padding-right:30px}}"; }
};

exports.dxp_pull_quote = PullQuote;
