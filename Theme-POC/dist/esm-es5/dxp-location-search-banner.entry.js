import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var LocationSearchBanner = /** @class */ (function () {
    function LocationSearchBanner(hostRef) {
        registerInstance(this, hostRef);
        /** whether image should use its size or be responsive */
        this.responsive = false;
        this.locationSelected = createEvent(this, "locationSelected", 7);
    }
    /** actions to be performed prior to component loading */
    LocationSearchBanner.prototype.componentWillLoad = function () {
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
    };
    /** Component did load */
    LocationSearchBanner.prototype.componentDidLoad = function () {
        var _this = this;
        var dxpCta = this.element ? this.element.querySelector('dxp-cta') : this.element.querySelector('dxp-cta');
        dxpCta.addEventListener('click', function () {
            _this.locationSelected.emit(_this.locationData);
            dxp.log.info(_this.element.tagName, ' Location Data ===> ', _this.locationData);
        });
    };
    /** Render the location-search-banner */
    LocationSearchBanner.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-location-search-banner render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "image-container" }, h("dxp-image", { src: this.src, alt: this.alt, responsive: this.responsive, "aria-label": this.ariaLabel, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd })), h("div", { class: "dxp-container banner-content" }, this.eyebrowTitle || this.bannerTitle || this.descriptionText ?
            h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12 dxp-col-md-10 dxp-col-lg-6" }, this.eyebrowTitle && h("p", { class: "dxp-eyebrow-lg", innerHTML: this.eyebrowTitle }), this.bannerTitle && h("h1", { innerHTML: this.bannerTitle }), this.descriptionText && h("p", { class: "lead", innerHTML: this.descriptionText }))) : undefined, h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12 dxp-col-lg-6 location-selector" }, h("dxp-location-selector", { placeholder: this.placeholder, "api-key": this.apiKey, "search-type": this.searchType })), h("div", { class: "dxp-col-12 dxp-col-lg-2" }, h("dxp-cta", { type: this.searchInputType, text: this.searchBtnText, "button-type": this.searchBtnType }))))));
    };
    Object.defineProperty(LocationSearchBanner.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationSearchBanner, "style", {
        get: function () { return "div.dxp.dxp-location-search-banner{position:relative}div.dxp.dxp-location-search-banner .dxp-eyebrow-lg{margin-bottom:8px}div.dxp.dxp-location-search-banner h1{margin-bottom:0}div.dxp.dxp-location-search-banner .banner-content .dxp-row:last-child,div.dxp.dxp-location-search-banner .lead{margin-top:1rem}div.dxp.dxp-location-search-banner .image-container{height:320px;overflow:hidden}div.dxp.dxp-location-search-banner .banner-content{padding-top:24px;padding-bottom:24px;min-height:288px}div.dxp.dxp-location-search-banner .location-selector{margin-bottom:24px}\@media (min-width:768px){div.dxp.dxp-location-search-banner{max-height:450px;overflow:hidden}div.dxp.dxp-location-search-banner .dxp-eyebrow-lg{margin-bottom:13px}div.dxp.dxp-location-search-banner .banner-content .dxp-row:last-child{margin-top:1.875rem}div.dxp.dxp-location-search-banner .banner-content{min-height:auto;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-location-search-banner .image-container{height:auto}}\@media (min-width:992px){div.dxp.dxp-location-search-banner .location-selector{margin-bottom:0}}"; },
        enumerable: true,
        configurable: true
    });
    return LocationSearchBanner;
}());
export { LocationSearchBanner as dxp_location_search_banner };
