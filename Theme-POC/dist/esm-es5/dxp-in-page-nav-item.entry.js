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
import { m as messages } from './messages-14b75d1c.js';
var InPageNavItem = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'InPageNavItem', messages);
    };
    /** click listener for routing events on anchor tag */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** function to get active status of an item */
    class_1.prototype.getActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.active];
            });
        });
    };
    /** function to get href of an item */
    class_1.prototype.getHref = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.href];
            });
        });
    };
    /** function to get active status of an item */
    class_1.prototype.setActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.active = true;
                return [2 /*return*/];
            });
        });
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** function to scroll to the selected section */
    class_1.prototype.scrollTo = function (href) {
        var elem = document.querySelector(href);
        this.focusElement(elem);
        var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
        var NAV_HEIGHT = 90;
        var target = elem.getBoundingClientRect().top + scrollOffset - NAV_HEIGHT;
        if (dxp.is.chrome()) {
            window.scrollTo({
                top: target,
                behavior: 'smooth'
            });
        }
        else {
            this.scrollView(elem);
            var scrolledY = window.scrollY;
            if (scrolledY) {
                window.scroll(0, scrolledY - NAV_HEIGHT);
            }
        }
    };
    /** method to scroll to input element  */
    class_1.prototype.scrollView = function (elem) {
        elem.scrollIntoView();
    };
    /** Render the in-page-nav */
    class_1.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && (h("link", { rel: "stylesheet", href: "" }))],
            [this.theme && (h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-in-page-nav.min.css" }))]
        ];
        return (h("div", { class: (this.active ? 'active' : '') + " " + this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("li", { class: "" + (this.active ? 'active' : ''), role: "menuitem", onClick: function () { return _this.scrollTo(_this.href); }, tabIndex: 0, onKeyUp: function (e) { return e.keyCode === 13 && _this.scrollTo(_this.href); } }, h("span", null, this.text || h("slot", null)))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-in-page-nav-item{display:inline-block;text-align:center;margin:1px}div.dxp.dxp-in-page-nav-item span{padding:2rem 1.5rem;display:block;text-transform:uppercase;margin-bottom:0}div.dxp.dxp-in-page-nav-item li{list-style:none}div.dxp.dxp-in-page-nav-item li:focus,div.dxp.dxp-in-page-nav-item li:hover{border-bottom:2px solid}div.dxp.dxp-in-page-nav-item li:focus{outline:1px solid}div.dxp.dxp-in-page-nav-item li:hover{cursor:pointer}div.dxp.dxp-in-page-nav-item li.active span{border-bottom:6px solid}\@media screen and (min-width:320px) and (max-width:767px){div.dxp.dxp-in-page-nav-item{display:none}div.dxp.dxp-in-page-nav-item li:focus,div.dxp.dxp-in-page-nav-item li:hover{border-bottom:0;border-color:transparent}div.dxp.dxp-in-page-nav-item li.active span{border-bottom:0}div.dxp.dxp-in-page-nav-item span{padding:2em 1em}div.dxp.dxp-in-page-nav-item.active{display:block}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { InPageNavItem as dxp_in_page_nav_item };
