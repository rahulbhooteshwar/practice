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
var LanguageItem = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** condition to show the language */
        this.showLanguage = false;
        this.languageChanged = createEvent(this, "languageChanged", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** change of language */
    class_1.prototype.handleChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dxp.i18n.changeLanguage(this.locale);
                this.languageChanged.emit({ 'locale': this.locale.toLowerCase() });
                if (this.link) { // not to redirect in case of SPAs
                    window.location.href = this.link;
                }
                return [2 /*return*/];
            });
        });
    };
    /** render function */
    class_1.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-language-selector.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, h("li", { tabindex: "-2", role: "option", "data-value": this.locale, "aria-label": this.accessibilityText, "aria-selected": "true", class: this.selectedLanguage ? 'active langElement' : 'langElement', onClick: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleChange()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            }); }); } }, h("a", { class: "language-link", "data-value": this.locale }, this.inLanguage))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-language-item li{cursor:pointer;padding:0 16px 12px 16px}div.dxp.dxp-language-item li a,div.dxp.dxp-language-item li span{padding:12px 0;display:inline-block;font-size:16px;letter-spacing:0}div.dxp.dxp-language-item li.active a,div.dxp.dxp-language-item li.active a:focus,div.dxp.dxp-language-item li.active span,div.dxp.dxp-language-item li:focus a,div.dxp.dxp-language-item li:focus a:focus,div.dxp.dxp-language-item li:focus span,div.dxp.dxp-language-item li:hover a,div.dxp.dxp-language-item li:hover a:focus,div.dxp.dxp-language-item li:hover span{padding-bottom:8px;text-decoration:none}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { LanguageItem as dxp_language_item };
