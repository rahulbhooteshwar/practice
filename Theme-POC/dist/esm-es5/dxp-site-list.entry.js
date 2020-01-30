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
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-78210655.js';
var ACCORDION_ITEM = 'dxp-accordion-item';
var ACCORDION_LABEL_CLASS = '.acc-label';
var DxpSiteList = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1, shadow, href;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'SiteList', messages);
                        if (!this.endPointUrl) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dxp.api(this.endPointUrl)];
                    case 2:
                        response = _a.sent();
                        this.regions = response.regions;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        dxp.log.error(this.element.tagName, 'componentWillLoad()', "fetch failed for", err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        shadow = this.element ? this.element : this.element;
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-site-list.min.css";
                        dxp.util.appendLinkElement(shadow, href);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        var regionList = this.element.querySelectorAll(ACCORDION_ITEM).length ?
            this.element.querySelectorAll(ACCORDION_ITEM)
            :
                this.element.querySelectorAll(ACCORDION_ITEM);
        if (regionList.length) {
            var lastRegion = regionList[regionList.length - 1];
            var accLabel = lastRegion ? lastRegion.querySelector(ACCORDION_LABEL_CLASS) : lastRegion.querySelector(ACCORDION_LABEL_CLASS);
            if (accLabel) {
                accLabel.classList.add('acc-bottom');
            }
            // get locale value from the url, required for performing expand appropriate region block
            var locale = dxp.util.getQueryParameterByKey('locale', window.location.href);
            for (var _i = 0, regionList_1 = regionList; _i < regionList_1.length; _i++) {
                var regionListMarkup = regionList_1[_i];
                if (this.regions) {
                    for (var _a = 0, _b = this.regions; _a < _b.length; _a++) {
                        var regions = _b[_a];
                        this.setDescriptionText(regionListMarkup, regions, locale);
                    }
                }
            }
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** set description text */
    class_1.prototype.setDescriptionText = function (regionListMarkup, regions, locale) {
        if (regionListMarkup.getAttribute('item-title') === regions.region) {
            var descriptionBlock = regionListMarkup.querySelector('.description');
            if (descriptionBlock) {
                descriptionBlock.innerHTML = regions.regionalDescription ?
                    regions.regionalDescription
                    :
                        dxp.i18n.t('SiteList:regionDescription', { regionalSiteLink: regions.defaultSiteLink, region: regions.region });
                var descriptionBlockregion = regionListMarkup.querySelector('.description a');
                descriptionBlockregion.setAttribute('aria-label', dxp.i18n.t('SiteList:defaultRegional', { region: regions.defaultSiteLink }));
            }
        }
        for (var _i = 0, _a = regions.countries; _i < _a.length; _i++) {
            var countries = _a[_i];
            for (var _b = 0, _c = countries.locales; _b < _c.length; _b++) {
                var locales = _c[_b];
                if (locales.locale === locale && regionListMarkup.getAttribute('item-title') === regions.region && regionListMarkup) {
                    regionListMarkup.querySelector(ACCORDION_LABEL_CLASS).click();
                }
            }
        }
    };
    /** Render the country-selector */
    class_1.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-site render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("h1", null, dxp.i18n.t('SiteList:title')), this.regions ? (this.regions.map(function (object) {
            return (h("dxp-region", { name: object.region, "is-open": object.isOpen }, object.countries.map(function (country) {
                return (h("dxp-country-item", { name: country.country, slot: "top" }, country.locales.map(function (locale) {
                    return (h("dxp-in-language", { link: locale.link, name: locale.inLanguage }));
                })));
            }), h("div", { class: "description", slot: "top" })));
        })) : (h("slot", null))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { DxpSiteList as dxp_site_list };
