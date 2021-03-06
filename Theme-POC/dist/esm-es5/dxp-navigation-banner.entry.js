import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        hello: 'Hello World!'
    },
    'en-US': {
        hello: 'Hello World! en-US'
    },
    'es': {
        hello: 'Hola Mundo!'
    },
    'es-ES': {
        hello: 'Hola Mundo! es-ES'
    }
};
var CTA_LIST = 'dxp-cta-list';
var NavigationBanner = /** @class */ (function () {
    function NavigationBanner(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Watcher that looks for cta object to be assigned/changed externally */
    NavigationBanner.prototype.ctaDataChangeHandler = function () {
        // secondary button disable on page load
        if (this.ctaData && this.ctaData[0] && this.ctaData[0].ctaList[0]['button-type'] === 'secondary') {
            if (this.dropDownData && this.dropDownData.length) {
                this.ctaData[0].ctaList[0].disabled = 'true';
            }
        }
        this.base.createNestedMarkup(this.ctaContainer, CTA_LIST, this.ctaData);
    };
    /** actions to be performed prior to component loading */
    NavigationBanner.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'NavigationBanner', messages);
    };
    /** actions to be performed after component loading */
    NavigationBanner.prototype.componentDidLoad = function () {
        this.navBannerClass = this.verticalContentBanner ? 'vertical-content' : '';
        this.ctaDataChangeHandler();
    };
    /**
     * click listener for routing events on anchor tag
     */
    NavigationBanner.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** change button link according to drop down option */
    NavigationBanner.prototype.changeSecondaryCtaLink = function (e) {
        var selectedValue = e.target.value;
        var secondaryBtn = this.element.querySelector(CTA_LIST) ?
            this.element.querySelector(CTA_LIST).querySelector('dxp-cta')
            :
                this.element.querySelector(CTA_LIST).querySelector('dxp-cta');
        if (selectedValue) {
            secondaryBtn.href = selectedValue;
            secondaryBtn.disabled = false;
        }
        else {
            secondaryBtn.disabled = true;
        }
    };
    /** Render the navigation-banner */
    NavigationBanner.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-navigation-banner render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-navigation-banner.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "navigation-banner" }, h("div", { class: "navigation-banner-content " + this.navBannerClass }, h("div", { class: "navigation-banner-state " + (this.applyIndentation ? 'apply-indentation' : '') }, h("div", { class: "banner-container" }, this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }), this.navTitle && h("h2", { innerHTML: this.navTitle })), h("div", { class: "banner-with-dropdown-container" }, this.subTitle && h("p", { class: "dxp-lead " + (this.dropDownData && this.dropDownData.length > 0 ? 'add-dropdown' : ''), innerHTML: this.subTitle }), this.dropDownData && this.dropDownData.length > 0 &&
            h("div", { class: "dropdown-block" }, h("label", { class: "dxp-sr-only" }), h("select", { onChange: function (e) { return _this.changeSecondaryCtaLink(e); } }, h("option", { value: "", selected: true }, this.placeholder), this.dropDownData.map(function (item) { return (h("option", { value: item.value }, item.label)); }))), h("div", { class: "cta-block", ref: function (el) { return _this.ctaContainer = el; } }, h("slot", null))))))));
    };
    Object.defineProperty(NavigationBanner.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationBanner, "watchers", {
        get: function () {
            return {
                "ctaData": ["ctaDataChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationBanner, "style", {
        get: function () { return "div.dxp.dxp-navigation-banner select::-ms-expand{display:none}div.dxp.dxp-navigation-banner .navigation-banner{position:relative}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content{position:relative;width:100%;margin:auto}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-order:2;order:2;padding:5.8rem 0 4rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container{float:left;width:50%}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container{padding-right:7.25rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container h2{margin-bottom:.718rem;line-height:2.63rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container .dxp-title-eyebrow{margin-bottom:.8125rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .dxp-lead{margin-bottom:1.1rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .dropdown-block{margin-bottom:1.5rem;width:79.1%}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-container{padding-left:6.75rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container{padding-right:6.75rem;padding-left:7.25rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;padding:5.23rem 0 4.52rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container{float:none;width:100%;padding-left:0;padding-right:0}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container h2,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container h2{margin-bottom:.1rem;line-height:2.375rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .dxp-lead{margin-bottom:1rem;margin-top:.45rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .add-dropdown{margin-bottom:1rem;margin-top:.55rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .dropdown-block{margin-bottom:1.5rem;width:77.8%}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .apply-indentation .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .apply-indentation .banner-with-dropdown-container{padding-left:6.75rem;padding-right:7.25rem}\@media (max-width:991px){div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state{-ms-flex-direction:column;flex-direction:column;padding:5.15rem 0 4rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container{padding-right:17.25rem;width:100%!important}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container h2,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container h2{margin-bottom:.1rem;font-size:1.8rem;line-height:2.3rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container .dxp-lead,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .dxp-lead{margin-bottom:1.1rem;margin-top:.44rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container .dropdown-block,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .dropdown-block{width:89.1%;margin-bottom:1.5rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container{padding-left:2.25rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state{padding:5.2rem 0 4rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container{padding-left:0;padding-right:0;width:100%}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container h2,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container h2{margin-bottom:.1rem;line-height:2.25rem;font-size:1.75rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container .dxp-lead,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .dxp-lead{margin-bottom:1rem;margin-top:.45rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container .add-dropdown,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .add-dropdown{margin-bottom:1.1rem;margin-top:.45rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container .dropdown-block,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .dropdown-block{width:67.1%;margin-bottom:1.47rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state.apply-indentation .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container{padding-left:2.25rem;padding-right:17.25rem}}\@media (max-width:767px){div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state{padding:3.62rem 0 2.11rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container{padding:0}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container h2{margin-bottom:.1rem;font-size:1.8rem;line-height:2.3rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .dxp-lead{margin-bottom:2.125rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .dropdown-block{width:100%;margin-bottom:2rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container .cta-block{display:grid;width:50%}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation{padding:3.62rem 1.2rem 2.11rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container{padding:0}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state{padding:3.7rem 0 2.6rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state.apply-indentation{padding:3.7rem 1.2rem 2.6rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state.apply-indentation .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container{padding:0}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container h2,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container h2{margin-bottom:.368rem;font-size:1.75rem;line-height:2.25rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container .dxp-lead,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .dxp-lead{margin-bottom:1.5rem;margin-top:.1rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container .add-dropdown,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .add-dropdown{margin-bottom:2.1rem;margin-top:.225rem}div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-container .dropdown-block,div.dxp.dxp-navigation-banner .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state .banner-with-dropdown-container .dropdown-block{width:100%;margin-bottom:1.92rem}}div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state{-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container{padding-left:7.25rem}div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content.vertical-content .navigation-banner-state{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column}\@media (max-width:991px){div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-container,div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container{padding-right:2.25rem;padding-left:17.25rem}div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container{padding-right:0;padding-left:17.25rem}}\@media (max-width:767px){div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-container,div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state.apply-indentation .banner-with-dropdown-container,div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state .banner-container,div.dxp.dxp-navigation-banner[dir=rtl] .navigation-banner .navigation-banner-content .navigation-banner-state .banner-with-dropdown-container{padding-right:0;padding-left:0}}"; },
        enumerable: true,
        configurable: true
    });
    return NavigationBanner;
}());
export { NavigationBanner as dxp_navigation_banner };
