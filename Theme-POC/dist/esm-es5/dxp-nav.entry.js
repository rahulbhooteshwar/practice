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
import { C as CommonUtility } from './overlay-7417567e.js';
var messages = {
    'en': {
        closeIcon: 'Close navigation Menu'
    },
    'en-US': {
        closeIcon: 'Close navigation Menu'
    },
    'es': {
        closeIcon: 'Hola Mundo'
    },
    'es-ES': {
        closeIcon: 'Hola Mundo'
    }
};
var Nav = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    /** watch for navigation data change  */
    class_1.prototype.navigationDataHandler = function () {
        this.base.createNestedMarkup(this.navigationContainer, 'dxp-nav-menu', this.navData.navigationData);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1, shadow, href;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        if (!this.apiUrl) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, dxp.api(this.apiUrl)];
                    case 2:
                        _a.navData = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        dxp.log.error(this.element.tagName, 'componentWillLoad()', "fetch failed for " + this.apiUrl, err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.utility = new CommonUtility();
                        this.base.i18Init(dxp, 'Nav', messages);
                        shadow = this.element ? this.element : this.element;
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-nav.min.css";
                        dxp.util.appendLinkElement(shadow, href);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.nav = this.element ? this.element.querySelector('nav') : this.element.querySelector('nav');
        this.overlay = this.element ? this.element.querySelector('.overlay') : this.element.querySelector('.overlay');
        if (this.navData) {
            this.navigationDataHandler();
        }
    };
    /** close overlay click */
    class_1.prototype.childEventHandler = function (e) {
        this.currentChild = e.detail;
        this.closeOverlayHandler();
    };
    /** click event on document level  */
    class_1.prototype.documentClickEventHandler = function (e) {
        var expandedMenuItem = this.element.querySelector('.in') ? this.element.querySelector('.in') : this.element.querySelector('.in');
        if (expandedMenuItem && !e.target.closest('dxp-nav')) {
            this.utility.closeOverlay(expandedMenuItem, this.element);
        }
    };
    /** hide expanded sub menu items with close button */
    class_1.prototype.hideMenuWithKeys = function (e) {
        var target = e.target ? e.composedPath()[0] : e.target;
        if (target.classList.contains('dxp-icon-close')) {
            if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) {
                this.utility.closeOverlay(this.currentNav, this.element);
            }
        }
    };
    /** Listen key down events */
    class_1.prototype.keyDownEventHandler = function (e) {
        var keycode = e.keyCode;
        var target = e.target ? e.composedPath()[0] : e.target;
        if (target && target.classList.contains('dxp-icon-close')) {
            var expandedSubNav = this.element.querySelector('.expanded') ? this.element.querySelector('.expanded') : this.element.querySelector('.expanded');
            var dxpNavItemContent = expandedSubNav.querySelectorAll('dxp-nav-item-content');
            var dxpCtas = expandedSubNav.querySelectorAll('dxp-cta');
            if (!dxpCtas.length) {
                var dxpCtaList = expandedSubNav.querySelector('dxp-cta-list');
                dxpCtas = dxpCtaList && dxpCtaList ? dxpCtaList.querySelectorAll('dxp-cta') : dxpCtaList && dxpCtaList.querySelectorAll('dxp-cta');
            }
            e.preventDefault();
            if (keycode === 38 || keycode === 37) {
                // Select last sub menu item from close button (with Up key)
                if (dxpNavItemContent && dxpNavItemContent.length > 0) {
                    var subNavItem = dxpNavItemContent[dxpNavItemContent.length - 1].querySelector('.sub-nav-item');
                    this.focusElement(subNavItem);
                    return;
                }
                // Select last Quick link element from close button (with Up key)
                if (dxpCtas && dxpCtas.length > 0) {
                    var link = dxpCtas[dxpCtas.length - 1] ? dxpCtas[dxpCtas.length - 1].querySelector('a') : dxpCtas[dxpCtas.length - 1].querySelector('a');
                    this.focusElement(link);
                }
            }
            if (keycode === 9 || keycode === 40 || keycode === 39) {
                // Select first Quick link element from close button (with Down Arrow/Tab key)
                if (dxpCtas && dxpCtas.length > 0) {
                    var link = dxpCtas[0] ? dxpCtas[0].querySelector('a') : dxpCtas[0].querySelector('a');
                    this.focusElement(link);
                    return;
                }
                // Select first sub menu item from close button (with Down Arrow/Tab key)
                if (dxpNavItemContent && dxpNavItemContent.length > 0) {
                    var subNavItem = dxpNavItemContent[0].querySelector('.sub-nav-item');
                    this.focusElement(subNavItem);
                    return;
                }
            }
            // Close the expaned nav
            if (keycode === 32 || keycode === 13) {
                this.closeIconClickHandler();
            }
        }
    };
    /** close overlay click */
    class_1.prototype.navHeaderHandler = function (e) {
        this.currentNav = e.detail;
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** crossIcon handler */
    class_1.prototype.closeIconClickHandler = function () {
        if (this.overlay) {
            this.utility.closeOverlay(this.currentNav, this.element);
        }
    };
    /** click handler nav */
    class_1.prototype.closeOverlayHandler = function () {
        if (this.currentChild.classList.contains('nav-item') || this.currentChild.nodeName === 'DXP-CTA-LIST'
            || this.currentChild.closest('dxp-cta-list') || this.currentNav.closest('.nav-item-li')) {
            return false;
            /** on click of sub-nav it should close the overlay handled here */
        }
        if (this.currentChild.parentElement.parentElement.classList.contains('quick-links-container') ||
            this.currentChild.parentElement.parentElement.parentElement.parentElement.classList.contains('group-container')) {
            return false;
        }
        this.utility.closeOverlay(this.currentNav, this.element);
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** Render the nav */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-nav render() : " + "DEVELOPMENT");
        return (h("nav", { class: "" + this.base.componentClass(), dir: this.dir, "data-theme": this.theme, role: "application" }, h("ul", { class: "nav-ul", ref: function (el) { return _this.navigationContainer = el; } }, h("slot", null)), h("span", { role: "button", tabindex: "-1", class: "dxp-none dxp-icon dxp-icon-close", "aria-label": dxp.i18n.t('Nav:closeIcon'), onClick: function () {
                _this.closeIconClickHandler();
            } }), h("div", { class: "overlay overlay-container", onClick: function () {
                _this.closeIconClickHandler();
            } }, h("span", { class: "overlay-bg-img" }), h("span", { class: "overlay-bg-opacity" }))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "navData": ["navigationDataHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "nav.dxp.dxp-nav{display:block;margin:0;padding:0;background:none}nav.dxp.dxp-nav .overlay-container{opacity:0;z-index:-1}nav.dxp.dxp-nav .overlay,nav.dxp.dxp-nav .overlay-bg-img,nav.dxp.dxp-nav .overlay-bg-opacity,nav.dxp.dxp-nav .overlay-container{position:fixed;height:100vh;top:0;right:0;bottom:0;left:0;pointer-events:none}nav.dxp.dxp-nav .overlay-bg-img{background-size:cover;background-repeat:no-repeat;background-position:50%}nav.dxp.dxp-nav .expanded{opacity:1;height:auto;pointer-events:all;visibility:visible}nav.dxp.dxp-nav .nav-ul{width:100%;left:0;margin-bottom:0}\@media (min-width:992px){nav.dxp.dxp-nav .dxp-icon-close{position:absolute;cursor:pointer;padding:.4375rem;border:.0625rem solid transparent;margin-top:5.4rem}nav.dxp.dxp-nav .nav-ul{width:auto;margin-top:0}nav.dxp.dxp-nav ::slotted(dxp-nav-menu){margin-right:1.6rem}nav.dxp.dxp-nav .dxp-nav-menu{margin-right:1.87rem}}\@media (max-width:767px){nav.dxp.dxp-nav .nav-ul{padding:12px 12px 16px 0}}\@media (max-width:991px){nav.dxp.dxp-nav .dxp-icon-close,nav.dxp.dxp-nav .overlay-container{display:none}}\@media (max-width:767px){nav.dxp.dxp-nav[dir=rtl] .nav-ul{padding:12px 0 16px 12px}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Nav as dxp_nav };
