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
var IN_PAGE_NAV_ITEM = 'dxp-in-page-nav-item';
var IN_PAGE_NAV_CLASS = '.dxp-in-page-nav';
var IN_PAGE_NAV_ITEM_CLASS = '.dxp-in-page-nav-item';
var InPageNav = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    /** inPageNavItemsData */
    class_1.prototype.dataChangeHandler = function () {
        this.base.createNestedMarkup(this.itemContainer, IN_PAGE_NAV_ITEM, this.inPageNavItemsData);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'InPageNav', messages);
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + ".min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** On component load */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var navBar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataChangeHandler();
                        navBar = this.element ? this.element.querySelector(IN_PAGE_NAV_CLASS) : this.element.querySelector(IN_PAGE_NAV_CLASS);
                        this.NAV_HEIGHT = this.clientHeight(navBar);
                        this.NAV_OFFSET_TOP = navBar['offsetTop'];
                        this.navItems = this.element.querySelectorAll(IN_PAGE_NAV_ITEM).length ?
                            this.element.querySelectorAll(IN_PAGE_NAV_ITEM)
                            :
                                this.element.querySelectorAll(IN_PAGE_NAV_ITEM);
                        return [4 /*yield*/, this.handleScroll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** listen to window scroll event */
    class_1.prototype.handleScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabActive, index, isElemInViewport, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, navbar, navBarRoot;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        index = 0;
                        _l.label = 1;
                    case 1:
                        if (!(index < this.navItems.length)) return [3 /*break*/, 8];
                        if (!(index === this.navItems.length - 1)) return [3 /*break*/, 3];
                        _b = this.checkViewPort;
                        _d = (_c = document).querySelector;
                        return [4 /*yield*/, this.navItems[index].getHref()];
                    case 2:
                        _a = _b.apply(this, [_d.apply(_c, [_l.sent()]), undefined]);
                        return [3 /*break*/, 6];
                    case 3:
                        _e = this.checkViewPort;
                        _g = (_f = document).querySelector;
                        return [4 /*yield*/, this.navItems[index].getHref()];
                    case 4:
                        _h = [_g.apply(_f, [_l.sent()])];
                        _k = (_j = document).querySelector;
                        return [4 /*yield*/, this.navItems[index + 1].getHref()];
                    case 5:
                        _a = _e.apply(this, _h.concat([_k.apply(_j, [_l.sent()])]));
                        _l.label = 6;
                    case 6:
                        isElemInViewport = _a;
                        if (isElemInViewport && !tabActive) {
                            this.navItems[index].setAttribute('active', true);
                            tabActive = true;
                        }
                        else {
                            this.navItems[index].setAttribute('active', false);
                        }
                        _l.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 1];
                    case 8:
                        if (!(window.innerWidth < 767 && !tabActive)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.navItems[0].setActive()];
                    case 9:
                        _l.sent();
                        _l.label = 10;
                    case 10:
                        navbar = this.element ? this.element.querySelector('nav') : this.element.querySelector('nav');
                        navBarRoot = this.element ? this.element.querySelector(IN_PAGE_NAV_CLASS) : this.element.querySelector(IN_PAGE_NAV_CLASS);
                        if (navbar) {
                            if (window.pageYOffset > navbar.offsetTop) {
                                navbar.classList.add('fixed');
                                navBarRoot.classList.add('fixed');
                            }
                            if (window.pageYOffset <= this.NAV_OFFSET_TOP) {
                                navbar.classList.remove('fixed');
                                navBarRoot.classList.remove('fixed');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** click listener for routing events on anchor tag */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** function to check if a given div is in viewport or not */
    class_1.prototype.checkViewPort = function (element, nextElement) {
        if (nextElement) {
            return ((element.getBoundingClientRect().top) < this.NAV_HEIGHT + (window.innerHeight / 2))
                && ((nextElement.getBoundingClientRect().top) > this.NAV_HEIGHT + (window.innerHeight / 2));
        }
        return ((element.getBoundingClientRect().top) < this.NAV_HEIGHT + (window.innerHeight / 2))
            && (Number.MAX_VALUE > this.NAV_HEIGHT + (window.innerHeight / 2));
    };
    /** method to calculate client height */
    class_1.prototype.clientHeight = function (elem) {
        return elem.clientHeight;
    };
    /** function to toggle nav dropdown on mobile devices */
    class_1.prototype.toggleNavDropdown = function () {
        var _this = this;
        if (window.innerWidth <= 767) {
            var caret = this.element.querySelector('.triangle') || this.element.querySelector('.triangle');
            if (caret.classList.contains('up')) {
                caret.classList.remove('up');
                caret.classList.add('down');
            }
            else {
                caret.classList.add('up');
                caret.classList.remove('down');
            }
            this.navItems.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            item.querySelector(IN_PAGE_NAV_ITEM_CLASS).classList.toggle('dxp-block');
                            return [4 /*yield*/, item.getActive()];
                        case 1:
                            if (_a.sent()) {
                                item.querySelector(IN_PAGE_NAV_ITEM_CLASS).classList.add('bg-white');
                            }
                            else {
                                item.querySelector(IN_PAGE_NAV_ITEM_CLASS).classList.remove('bg-white');
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    /** Render in-page-nav */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-in-page-nav render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && (h("link", { rel: "stylesheet", href: "" }))],
            [this.theme && (h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-in-page-nav.min.css" }))]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("nav", null, h("ul", { class: "nav-list", role: "menu", onClick: function () { return _this.toggleNavDropdown(); } }, h("div", { ref: function (el) { return (_this.itemContainer = el); } }, h("slot", null))), h("div", { class: "triangle down", onClick: function () { return _this.toggleNavDropdown(); } }))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "inPageNavItemsData": ["dataChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-in-page-nav{text-align:center;z-index:2}div.dxp.dxp-in-page-nav nav{width:100%;min-height:55px;z-index:1}div.dxp.dxp-in-page-nav nav .nav-list{margin:0}div.dxp.dxp-in-page-nav .fixed{position:fixed;top:0;left:0;-webkit-box-shadow:0 4px 6px 0 rgba(20,20,19,.1);box-shadow:0 4px 6px 0 rgba(20,20,19,.1);z-index:10}div.dxp.dxp-in-page-nav .triangle.down,div.dxp.dxp-in-page-nav .triangle.up{border-top:0}\@media screen and (min-width:320px) and (max-width:767px){div.dxp.dxp-in-page-nav{z-index:2}div.dxp.dxp-in-page-nav .triangle{display:inline-block;margin:0 5px;vertical-align:middle;position:absolute;right:20px;width:0;height:9px}div.dxp.dxp-in-page-nav .triangle.up{border-left:8px solid transparent;border-right:8px solid transparent;margin-top:24px}div.dxp.dxp-in-page-nav .triangle.down{border-left:8px solid transparent;border-right:8px solid transparent;margin-top:28px}div.dxp.dxp-in-page-nav nav{width:100%;min-height:55px;position:relative}div.dxp.dxp-in-page-nav nav .nav-list{width:100%;float:left;padding:0}div.dxp.dxp-in-page-nav.fixed{position:fixed;top:0;left:0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { InPageNav as dxp_in_page_nav };
