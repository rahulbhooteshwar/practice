import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var TITLE_TEXT_CLASS = '.titleText';
var STICKY_CONTAINER_ID = '#stickyContainer';
var FooterSticky = /** @class */ (function () {
    function FooterSticky(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Listener that looks for cta object to be assigned/changed externally */
    FooterSticky.prototype.ctaChangeHandler = function () {
        var _this = this;
        if (this.cta) {
            var footerprops = this.cta.map(function (it) { return (Object.assign(Object.assign({}, it), { footerType: _this.footerType })); });
            this.base.createNestedMarkup(this.ctaContainer, 'dxp-sticky-footer-cta', footerprops);
        }
    };
    /** actions to be performed prior to component loading */
    FooterSticky.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed after component loading */
    FooterSticky.prototype.componentDidLoad = function () {
        var _this = this;
        // For supporting RTE, this code will work fine for the normal text too
        if (this.element && this.element.querySelector(TITLE_TEXT_CLASS)) {
            this.element.querySelector(TITLE_TEXT_CLASS).innerHTML = this.titleText;
        }
        else {
            if (this.element.querySelector(TITLE_TEXT_CLASS)) {
                this.element.querySelector(TITLE_TEXT_CLASS).innerHTML = this.titleText;
            }
        }
        this.ctaChangeHandler();
        setTimeout(function () {
            var stickyContainer = _this.element.querySelectorAll(STICKY_CONTAINER_ID);
            if (_this.footerType === 'sticky') {
                document.body.style.paddingBottom = stickyContainer[0]['offsetHeight'] + 50 + "px";
            }
        }, 100);
    };
    /** Handle resize event */
    FooterSticky.prototype.handleResize = function () {
        if (this.footerType === 'sticky') {
            var stickyContainer = this.element ? this.element.querySelectorAll(STICKY_CONTAINER_ID) : this.element.querySelectorAll(STICKY_CONTAINER_ID);
            document.body.style.paddingBottom = stickyContainer[0] && stickyContainer[0]['offsetHeight'] + 50 + "px";
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    FooterSticky.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the footer-sticky */
    FooterSticky.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-sticky-footer render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-sticky-footer.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { id: "stickyContainer", class: this.footerType === 'sticky' ? 'sticky-footer' : 'non-sticky-footer' }, h("div", { class: "dxp-text-center sticky-footer-cont" }, h("p", { class: "titleText sticky-footer-text" }, this.titleText), h("div", { class: "btn-cont", ref: function (el) { return (_this.ctaContainer = el); } }, h("slot", { name: "footer-sticky-cta" }))))));
    };
    Object.defineProperty(FooterSticky.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterSticky, "watchers", {
        get: function () {
            return {
                "cta": ["ctaChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterSticky, "style", {
        get: function () { return "div.dxp.dxp-sticky-footer .sticky-footer-cont{margin:0}div.dxp.dxp-sticky-footer .sticky-footer-cont .sticky-footer-text{font-size:1.4rem}div.dxp.dxp-sticky-footer .sticky-footer{margin:0;padding:10px 0;right:0;left:0;z-index:1;position:fixed;bottom:0;width:100%}div.dxp.dxp-sticky-footer .sticky-footer .sticky-footer-text{display:inline-block;margin:0 42px 0 0}\@media (max-width:767px){div.dxp.dxp-sticky-footer .sticky-footer .sticky-footer-text{margin:0 0 20px 0;display:block}}div.dxp.dxp-sticky-footer .sticky-footer .btn-cont{display:inline-block}div.dxp.dxp-sticky-footer .non-sticky-footer{margin:0;padding:10px 0;right:0;left:0;z-index:1}div.dxp.dxp-sticky-footer .non-sticky-footer .sticky-footer-text{display:inline-block;margin:0 42px 0 0}\@media (max-width:767px){div.dxp.dxp-sticky-footer .non-sticky-footer .sticky-footer-text{margin:0 0 20px 0;display:block}}div.dxp.dxp-sticky-footer .non-sticky-footer .btn-cont{display:inline-block}"; },
        enumerable: true,
        configurable: true
    });
    return FooterSticky;
}());
export { FooterSticky as dxp_sticky_footer };
