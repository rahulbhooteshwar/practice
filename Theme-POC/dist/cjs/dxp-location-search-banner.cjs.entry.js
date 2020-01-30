'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const LocationSearchBanner = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** whether image should use its size or be responsive */
        this.responsive = false;
        this.locationSelected = core.createEvent(this, "locationSelected", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
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
            core.dxp.log.info(this.element.tagName, ' Location Data ===> ', this.locationData);
        });
    }
    /** Render the location-search-banner */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-location-search-banner render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `` })]
        ];
        return (core.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core.h("div", { class: "image-container" }, core.h("dxp-image", { src: this.src, alt: this.alt, responsive: this.responsive, "aria-label": this.ariaLabel, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd })), core.h("div", { class: "dxp-container banner-content" }, this.eyebrowTitle || this.bannerTitle || this.descriptionText ?
            core.h("div", { class: "dxp-row" }, core.h("div", { class: "dxp-col-12 dxp-col-md-10 dxp-col-lg-6" }, this.eyebrowTitle && core.h("p", { class: "dxp-eyebrow-lg", innerHTML: this.eyebrowTitle }), this.bannerTitle && core.h("h1", { innerHTML: this.bannerTitle }), this.descriptionText && core.h("p", { class: "lead", innerHTML: this.descriptionText }))) : undefined, core.h("div", { class: "dxp-row" }, core.h("div", { class: "dxp-col-12 dxp-col-lg-6 location-selector" }, core.h("dxp-location-selector", { placeholder: this.placeholder, "api-key": this.apiKey, "search-type": this.searchType })), core.h("div", { class: "dxp-col-12 dxp-col-lg-2" }, core.h("dxp-cta", { type: this.searchInputType, text: this.searchBtnText, "button-type": this.searchBtnType }))))));
    }
    get element() { return core.getElement(this); }
    static get style() { return "div.dxp.dxp-location-search-banner{position:relative}div.dxp.dxp-location-search-banner .dxp-eyebrow-lg{margin-bottom:8px}div.dxp.dxp-location-search-banner h1{margin-bottom:0}div.dxp.dxp-location-search-banner .banner-content .dxp-row:last-child,div.dxp.dxp-location-search-banner .lead{margin-top:1rem}div.dxp.dxp-location-search-banner .image-container{height:320px;overflow:hidden}div.dxp.dxp-location-search-banner .banner-content{padding-top:24px;padding-bottom:24px;min-height:288px}div.dxp.dxp-location-search-banner .location-selector{margin-bottom:24px}\@media (min-width:768px){div.dxp.dxp-location-search-banner{max-height:450px;overflow:hidden}div.dxp.dxp-location-search-banner .dxp-eyebrow-lg{margin-bottom:13px}div.dxp.dxp-location-search-banner .banner-content .dxp-row:last-child{margin-top:1.875rem}div.dxp.dxp-location-search-banner .banner-content{min-height:auto;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-location-search-banner .image-container{height:auto}}\@media (min-width:992px){div.dxp.dxp-location-search-banner .location-selector{margin-bottom:0}}"; }
};

exports.dxp_location_search_banner = LocationSearchBanner;
