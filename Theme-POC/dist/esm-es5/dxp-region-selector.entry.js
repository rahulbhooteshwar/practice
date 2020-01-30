var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        close: 'Click to close region selector',
        countryLanguagePageText: 'Other Country or Region'
    },
    'en-US': {
        close: 'Click to close region selector',
        countryLanguagePageText: 'Other Country or Region'
    },
    'es': {
        close: 'Haga clic para cerrar el selector de región',
        countryLanguagePageText: 'Otro país o región'
    },
    'es-ES': {
        close: 'Haga clic para cerrar el selector de región',
        countryLanguagePageText: 'Otro país o región'
    }
};
var RegionSelector = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.buttonClick = createEvent(this, "buttonClick", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'RegionSelector', messages);
                        if (document.querySelector('meta[name="country_code"]')) {
                            this.originCountry = document.querySelector('meta[name="country_code"]').getAttribute('content').toLowerCase().trim();
                        }
                        _a = this;
                        if (!(!this.compareLocales() && !this.siteList)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getSiteList()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = this.parseSiteList(JSON.parse(this.siteList));
                        _c.label = 3;
                    case 3:
                        _a.siteList = _b;
                        if (this.countryLanguagePageLink) {
                            this.siteList.push({ text: this.countryLanguagePageText || dxp.i18n.t('RegionSelector:countryLanguagePageText'), link: this.countryLanguagePageLink });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** function to handle the button click */
    class_1.prototype.onClick = function () {
        var select = this.element ? this.element.querySelector('select') : this.element.querySelector('select');
        this.setCookie(this.siteList[select.selectedIndex].locale);
        window.location.href = this.siteList[select.selectedIndex].link;
    };
    /** click listener for routing events on anchor tag */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** function to read and compare locales of a page and request origin  */
    class_1.prototype.compareLocales = function () {
        // Origin Country: we'll get this from the meta tag of the page
        // this.locale: this is detected automatically by dxp-ui-core and here we are assuming it to be in a format like "en-us"
        return this.originCountry.toLowerCase().trim() === this.locale.toLowerCase().split('-')[1];
    };
    /** function to dismiss region selector */
    class_1.prototype.dismissRegionSelector = function () {
        this.element ?
            this.element.querySelector('.dxp-region-selector').classList.add('dxp-none')
            :
                this.element.querySelector('.dxp-region-selector').classList.add('dxp-none');
    };
    /** function to fetch the list of locale-wise sites */
    class_1.prototype.getSiteList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.apiUrl) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this.parseSiteList;
                        return [4 /*yield*/, dxp.api(this.apiUrl)];
                    case 2: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        err_1 = _b.sent();
                        dxp.log.error(this.element.tagName, 'getSiteList()', "fetch failed for " + this.apiUrl, err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** function to parse the site list coming from either JSON or API */
    class_1.prototype.parseSiteList = function (siteList) {
        var _this = this;
        var list = [];
        for (var _i = 0, _a = siteList['regions']; _i < _a.length; _i++) {
            var region = _a[_i];
            region['countries'].forEach(function (country) {
                if (country['countryCode'].toLowerCase() === _this.originCountry.toLowerCase()) {
                    country['locales'].forEach(function (locale) {
                        locale['country'] = country['country'];
                        locale['countryCode'] = country['countryCode'];
                        list.push(locale);
                    });
                }
            });
        }
        return list;
    };
    /** function to set cookie containing the selected locale */
    class_1.prototype.setCookie = function (value) {
        var days = this.cookieExpiryTime ? this.cookieExpiryTime : 7;
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = "locale=" + value + ";" + expires + ";path=/";
    };
    /** Render the region-selector */
    class_1.prototype.render = function () {
        var _this = this;
        if (!this.compareLocales() && this.siteList) {
            var styles = [
                h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/dxp.css" }),
                [this.theme && h("link", { rel: "stylesheet", href: "" })],
                [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-region-selector.min.css" })]
            ];
            return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "padding" }, h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12" }, h("div", { class: "region-selector-wrapper" }, h("div", { class: "dxp-col-sm-12 dxp-col-md-12 dxp-col-lg-6" }, this.eyebrowText && h("p", { class: "eyebrow-text", innerHTML: this.eyebrowText }), this.titleText && h("p", { class: "title-text", innerHTML: this.titleText })), h("div", { class: "dxp-col-sm-12 dxp-col-md-12 dxp-col-lg-6" }, h("div", { class: "close-icon", onClick: function () { return _this.dismissRegionSelector(); }, onKeyUp: function (e) { return e.keyCode === 13 && _this.dismissRegionSelector(); } }, h("span", { class: "dxp-icon dxp-icon-close", "aria-label": dxp.i18n.t('RegionSelector:close'), tabIndex: 3 })), h("div", { class: "row-reverse dxp-col-sm-12" }, this.buttonText && h("div", { class: "cta-button", tabIndex: -1 }, h("dxp-cta", { type: "button", "button-type": "secondary", text: this.buttonText, tabIndex: 2 })), h("div", { class: "select-button" }, h("select", { tabIndex: 1 }, this.siteList.map(function (site) {
                if (site.hasOwnProperty('country')) {
                    return h("option", null, site['country'] + " - " + site['language']);
                }
                return h("option", null, site['text']);
            })))))))))));
        }
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-region-selector{z-index:999;position:fixed;top:0;width:100%}div.dxp.dxp-region-selector .padding{padding-top:2rem;padding-bottom:1.625rem}div.dxp.dxp-region-selector .region-selector-wrapper{width:100%}div.dxp.dxp-region-selector .region-selector-wrapper p{margin:0;padding:0}div.dxp.dxp-region-selector .region-selector-wrapper .eyebrow-text{font-size:.75rem;line-height:1rem;text-transform:uppercase;letter-spacing:.1125rem;text-align:left;margin-bottom:.275rem}div.dxp.dxp-region-selector .region-selector-wrapper .eyebrow-text:only-child{margin-top:1rem}div.dxp.dxp-region-selector .region-selector-wrapper .title-text{font-size:1rem;line-height:1.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .title-text:only-child{margin-top:.75rem}div.dxp.dxp-region-selector .region-selector-wrapper .row-reverse{width:auto;float:right}div.dxp.dxp-region-selector .region-selector-wrapper .select-button{float:right}div.dxp.dxp-region-selector .region-selector-wrapper .select-button select{width:18rem;height:2.5rem;border-radius:.25rem;padding-right:2.4rem}div.dxp.dxp-region-selector .region-selector-wrapper .select-button select:focus{outline:none}div.dxp.dxp-region-selector .region-selector-wrapper .cta-button{float:right;margin-left:1rem}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon{float:right}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon .cta-with-icon{margin-left:.375rem}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon .dxp-icon-close{font-size:1.1275rem;margin-top:.75rem;margin-left:1.7175rem;display:block}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon .dxp-icon-close:focus{outline:1px solid}div.dxp.dxp-region-selector .region-selector-wrapper .dxp-btn-secondary:focus:before{border:0}\@media (max-width:992px){div.dxp.dxp-region-selector .region-selector-wrapper .row-reverse{margin-top:1.25rem;width:auto;padding-left:0;display:-webkit-flex;-webkit-flex-direction:row-reverse;display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse;float:left}div.dxp.dxp-region-selector .region-selector-wrapper .select-button{float:left;margin-bottom:.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .cta-button{float:left}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon{float:right;margin-top:-3.1875rem}}\@media (max-width:767px){div.dxp.dxp-region-selector .region-selector-wrapper .padding{padding-top:1.375rem;padding-bottom:1.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .row-reverse{-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}div.dxp.dxp-region-selector .region-selector-wrapper .cta-button{margin-left:0;margin-top:1rem}div.dxp.dxp-region-selector .region-selector-wrapper .eyebrow-text,div.dxp.dxp-region-selector .region-selector-wrapper .title-text{margin-right:3.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon{margin-top:-4.85rem}}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper p:first-child{text-align:right}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .row-reverse{display:-webkit-flex;-webkit-flex-direction:row-reverse;display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .cta-button{margin-left:auto;margin-right:1rem}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .close-icon{float:left}\@media (max-width:992px){div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .row-reverse{float:right;padding-right:0}}\@media (max-width:767px){div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .row-reverse{-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .dxp-icon-close{margin-left:0}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .cta-button{margin-right:0}}\@media (max-width:767px){div.dxp.dxp-region-selector .padding{padding-top:1.375rem;padding-bottom:1.5rem}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { RegionSelector as dxp_region_selector };
