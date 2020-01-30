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
import { m as messages } from './messages-f17494bc.js';
var SIDEBAR_MENU_GROUP = 'dxp-sidebar-menu-group';
var SIDEBAR_EXPANDED = 'sidebar-expanded';
var SIDEBAR_COLLAPSED = 'sidebar-collapsed';
var SidebarMenu = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** To display collapse in header/footer */
        this.expandCollapseIconPosition = 'footer';
        this.collapsed = createEvent(this, "collapsed", 7);
        this.expanded = createEvent(this, "expanded", 7);
    }
    /** Listener that looks for menu items object to be assigned/changed externally */
    class_1.prototype.menuChangeHandler = function () {
        this.base.createNestedMarkup(this.menuContainer, SIDEBAR_MENU_GROUP, this.menuItems);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'SidebarMenu', messages);
        if (this.expandOnHover) {
            this.showExpanded = false;
        }
    };
    /** actions to be performed after component loaded */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.menuChangeHandler();
                        if (!!this.showExpanded) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.collapse()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.expand()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Listener for action to perform for keyup event */
    class_1.prototype.handleKeyEvents = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, eventKey, target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = [32, 37, 38, 39, 40];
                        eventKey = event.key || event.keyCode;
                        target = event.target ? event.composedPath()[0] : event.target;
                        if (!target.classList.contains('collapse-icon')) return [3 /*break*/, 2];
                        if (!(eventKey === 32 || eventKey === 13)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.collapseExpandSidebar()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
                        this.preventDefaultAction(event, keys);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** click listener for routing events on anchor tag */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** function to collapse sidebar */
    class_1.prototype.collapse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentContainer;
            return __generator(this, function (_a) {
                parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
                parentContainer.classList.add(SIDEBAR_COLLAPSED);
                parentContainer.classList.remove(SIDEBAR_EXPANDED);
                this.setAndCollapse(true);
                this.collapsed.emit({ action: 'collapsed' });
                return [2 /*return*/];
            });
        });
    };
    /** To collapse/expand sidebar menu panel */
    class_1.prototype.collapseExpandSidebar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentContainer;
            return __generator(this, function (_a) {
                parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
                if (parentContainer && parentContainer.classList.contains(SIDEBAR_EXPANDED)) {
                    parentContainer.classList.add(SIDEBAR_COLLAPSED);
                    parentContainer.classList.remove(SIDEBAR_EXPANDED);
                    this.setAndCollapse(true);
                    this.collapsed.emit({ action: 'collapsed' });
                }
                else {
                    parentContainer.classList.add(SIDEBAR_EXPANDED);
                    parentContainer.classList.remove(SIDEBAR_COLLAPSED);
                    this.setAndCollapse(false);
                    this.expanded.emit({ action: 'expanded' });
                }
                return [2 /*return*/];
            });
        });
    };
    /**  function to expnd sidebar */
    class_1.prototype.expand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parentContainer;
            return __generator(this, function (_a) {
                parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
                parentContainer.classList.add(SIDEBAR_EXPANDED);
                parentContainer.classList.remove(SIDEBAR_COLLAPSED);
                this.setAndCollapse(false);
                this.expanded.emit({ action: 'expanded' });
                return [2 /*return*/];
            });
        });
    };
    /** to return all sidebar menu group elements */
    class_1.prototype.getAllMenuGroupElements = function () {
        var menuGroups = this.base.shadowRootQuerySelector(this.element, SIDEBAR_MENU_GROUP, true);
        return menuGroups && menuGroups.length > 0 ? menuGroups : this.element.querySelectorAll(SIDEBAR_MENU_GROUP);
    };
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    class_1.prototype.preventDefaultAction = function (event, keys) {
        var eventKey = event.key || event.keyCode;
        if (keys.indexOf(eventKey) > -1) {
            event.preventDefault();
        }
    };
    /** collapsing all opened sidebar menu groups on collapse/expand of sidebar menu panel */
    class_1.prototype.setAndCollapse = function (shouldShowView) {
        var elem = this.getAllMenuGroupElements();
        for (var _i = 0, _a = Object.keys(elem); _i < _a.length; _i++) {
            var i = _a[_i];
            elem[i].viewPopup = shouldShowView;
            this.showExpanded = shouldShowView;
            elem[i].collapse();
        }
    };
    /** Render the sidebar-menu */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-sidebar-menu render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-sidebar-menu.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("nav", { class: "" + (this.expandCollapseIconPosition === 'footer' ? 'column-reverse' : ''), role: "navigation" }, !this.expandOnHover && this.showExpandCollapseIcon && h("div", { class: "expand-collapse-icon" }, h("a", { class: "collapse-nav" }, h("span", { tabindex: "0", class: "collapse-icon tooltip-on-hover", onClick: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collapseExpandSidebar()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            }); }); } }, h("span", { class: "tooltip" }, h("span", { class: "caret-icon" }), h("div", { class: "sub-menu-wrapper" }, h("span", { class: "dxp-flex icon-heading" }, this.showExpanded ? dxp.i18n.t('SidebarMenu:expandTxt') : dxp.i18n.t('SidebarMenu:collapseTxt'))))))), h("div", { class: "menu-wrapper" }, h("header", { class: 'header-order-one' }, h("slot", { name: "header" })), h("div", { class: "sidebar", onMouseEnter: function () { return _this.expandOnHover && _this.expand(); }, onMouseLeave: function () { return _this.expandOnHover && _this.collapse(); } }, h("div", { class: "nav nav-sidebar", ref: function (el) { return _this.menuContainer = el; } }, h("slot", null)))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "menuItems": ["menuChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-sidebar-menu{height:100%;position:-webkit-sticky;position:sticky;z-index:99}div.dxp.dxp-sidebar-menu .column-reverse{display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse}div.dxp.dxp-sidebar-menu nav{position:-webkit-sticky;position:sticky;display:-ms-flexbox;display:flex;height:100%;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-sidebar-menu nav .menu-wrapper{-ms-flex:1 1 auto;flex:1 1 auto}div.dxp.dxp-sidebar-menu nav .header-order-one{-ms-flex-order:1;order:1}div.dxp.dxp-sidebar-menu nav .default-header-order{-ms-flex-order:0;order:0}div.dxp.dxp-sidebar-menu nav .tooltip{display:none;left:100%;position:absolute;display:inline-block;padding-left:1rem;-webkit-transition:all .2s ease-in;transition:all .2s ease-in;opacity:0}div.dxp.dxp-sidebar-menu nav .tooltip .caret-icon{position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding-left:.7rem}div.dxp.dxp-sidebar-menu nav .tooltip .sub-menu-wrapper{padding:.3rem .5rem;display:inline-block;min-width:4rem}div.dxp.dxp-sidebar-menu nav .tooltip .sub-menu-wrapper .icon-heading{-ms-flex-pack:center;justify-content:center}div.dxp.dxp-sidebar-menu header{padding:.7rem}div.dxp.dxp-sidebar-menu .tooltip-on-hover{position:relative}div.dxp.dxp-sidebar-menu .tooltip-on-hover:hover .tooltip{display:-ms-flexbox;display:flex;opacity:1}div.dxp.dxp-sidebar-menu .sidebar{-ms-flex:1 1 auto;flex:1 1 auto;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-sidebar-menu .nav-sidebar{-ms-flex:1 1 auto;flex:1 1 auto;list-style-type:none;margin:0;padding:0}div.dxp.dxp-sidebar-menu .sidebar-collapsed{min-width:4rem;display:-ms-inline-flexbox;display:inline-flex;-webkit-transition:.24s;transition:.24s}div.dxp.dxp-sidebar-menu .sidebar-expanded{min-width:16.25rem;display:-ms-inline-flexbox;display:inline-flex;-webkit-transition:.24s;transition:.24s;width:260px}div.dxp.dxp-sidebar-menu .collapse-nav{display:-ms-flexbox;display:flex;padding:.32rem 1rem;-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-sidebar-menu .collapse-icon{display:inline-block;width:1.5rem;height:1.5rem;border-radius:.18rem}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { SidebarMenu as dxp_sidebar_menu };
