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
var SIDEBAR_MENU_ITEM = 'dxp-sidebar-menu-item';
var SidebarMenuGroup = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** value to check for child side-menu-items */
        this.hasChildMenuItems = true;
        this.toggleEmitter = createEvent(this, "toggleEmitter", 7);
    }
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    class_1.prototype.subMenuChangeHandler = function () {
        this.base.createNestedMarkup(this.subMenuContainer, SIDEBAR_MENU_ITEM, this.child);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'SidebarMenuGroup', messages);
    };
    /** actions to be performed after component loaded */
    class_1.prototype.componentDidLoad = function () {
        this.subMenuChangeHandler();
        var shadowEle = this.base.shadowRootQuerySelector(this.element, SIDEBAR_MENU_ITEM, true);
        var childElement = shadowEle && shadowEle.length ? shadowEle : this.element.querySelectorAll(SIDEBAR_MENU_ITEM);
        this.hasChildMenuItems = childElement.length > 0;
    };
    /** Actions to perform after component update */
    class_1.prototype.componentDidUpdate = function () {
        this.subMenuChangeHandler();
    };
    /** for mouse click outside of component */
    class_1.prototype.clickOutsideComponentEvent = function (e) {
        if ((e.target || e.target) && e.composedPath()[0]) {
            this.toggle = e.composedPath()[0].className === 'menu-item' || e.composedPath()[0].classList.contains('collapse-icon')
                || e.composedPath()[0].className === 'caret-icon' || e.composedPath()[0].classList.contains('item-label')
                || e.composedPath()[0].classList.contains('item-icon') || e.composedPath()[0].classList.contains('menu-icon-image')
                || (e.composedPath()[0].classList.contains('sub-item-label')) ? this.toggle : false;
        }
    };
    /** show and hide overlay */
    class_1.prototype.handleKeyPress = function (event) {
        var keys = [32, 37, 38, 39, 40];
        // handle expand/collapse menu-item
        var eventKey = event.key || event.keyCode;
        if ((eventKey === ' ' || eventKey === 32) || (eventKey === 'Enter' || eventKey === 13)) {
            this.toggleMenu();
        }
        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
        this.preventDefaultAction(event, keys);
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** to collapse sideMenu group from parent component */
    class_1.prototype.collapse = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.toggle = false;
                return [2 /*return*/];
            });
        });
    };
    /** to expand sideMenu group from parent component */
    class_1.prototype.expand = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.toggle = true;
                return [2 /*return*/];
            });
        });
    };
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    class_1.prototype.preventDefaultAction = function (event, keys) {
        var eventKey = event.key || event.keyCode;
        if (keys.indexOf(eventKey) > -1) {
            event.preventDefault();
        }
    };
    /** Sub-menu item container */
    class_1.prototype.renderMenuItems = function () {
        var _this = this;
        return (h("div", { class: "child-menu dxp-scrollable " + ((this.viewPopup && this.toggle) ? 'tool' : this.toggle ? 'dxp-block' : 'dxp-none'), style: { 'max-height': this.menuItemsListMaxHeight } }, this.viewPopup && this.toggle && h("span", { class: "caret-icon" }), h("div", { class: "sub-menu-wrapper" }, this.viewPopup && h("span", { class: "item-heading dxp-flex" }, this.menuTitle), h("div", { ref: function (el) { return _this.subMenuContainer = el; } }, h("slot", null)))));
    };
    /** Action for toggle component */
    class_1.prototype.toggleMenu = function () {
        var menuGroup = this.base.shadowRootQuerySelector(this.element, 'a', false);
        if (!this.hasChildMenuItems && this.menuHref) {
            menuGroup.setAttribute('href', this.menuHref);
            menuGroup.setAttribute('target', '_blank');
        }
        this.toggleEmitter.emit();
        this.toggle = !this.toggle;
    };
    /** Render the sidebar-menu */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-sidebar-menu-group render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-sidebar-menu.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "item-wrapper dxp-scrollable-container" }, h("div", null, h("a", { tabindex: "0", title: this.menuTitle, onClick: function () { return _this.toggleMenu(); }, class: "menu-item " + ((this.toggle && this.menuHref) ? 'active' : '') + " " + ((this.toggle && this.hasChildMenuItems) ? 'item-expanded active' : ''), "aria-expanded": (this.toggle && this.hasChildMenuItems) ? 'true' : 'false' }, h("span", { class: "item-icon dxp-flex" }, h("img", { src: this.menuSrc, class: "menu-icon-image", alt: this.menuAlt })), h("span", { class: "item-label " + (this.viewPopup ? 'dxp-none' : 'dxp-flex') }, this.menuTitle, this.hasChildMenuItems && h("i", { class: "caret-icon" })))), this.hasChildMenuItems && this.renderMenuItems()), h("dxp-line", { type: "solid", "border-color": "#d0d0d0", "background-color": "transparent", "height-xl": "1", "height-lg": "1", "height-md": "1", "height-sm": "1" })));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "child": ["subMenuChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-sidebar-menu-group .item-wrapper .child-menu{overflow-y:scroll}div.dxp.dxp-sidebar-menu-group .tool{-webkit-transform:translate3d(3.5rem,-3.25rem,6.25rem);transform:translate3d(3.5rem,-3.25rem,6.25rem);position:absolute;display:inline-block;padding-left:.5rem}div.dxp.dxp-sidebar-menu-group .tool .caret-icon{position:absolute;left:0;top:1rem}div.dxp.dxp-sidebar-menu-group .tool .sub-menu-wrapper{display:inline-block;min-width:10rem}div.dxp.dxp-sidebar-menu-group .tool .sub-menu-wrapper .item-heading{padding:.75rem 1.2rem}div.dxp.dxp-sidebar-menu-group .menu-item{padding:1.2rem;display:-ms-flexbox;display:flex;cursor:pointer}div.dxp.dxp-sidebar-menu-group .menu-item .item-icon{width:1.5rem;background-size:contain}div.dxp.dxp-sidebar-menu-group .menu-item .item-icon img{width:100%;height:100%}div.dxp.dxp-sidebar-menu-group .menu-item .item-label{padding-left:.88rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-sidebar-menu-group .menu-item .item-label .caret-icon{width:.5rem;height:1rem;-webkit-transition:-webkit-transform .2s ease-in;transition:-webkit-transform .2s ease-in;transition:transform .2s ease-in;transition:transform .2s ease-in,-webkit-transform .2s ease-in;margin-left:auto}div.dxp.dxp-sidebar-menu-group .menu-item.item-expanded .caret-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg)}div.dxp.dxp-sidebar-menu-group .item-label{padding-left:.93rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex:1 1 auto;flex:1 1 auto}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { SidebarMenuGroup as dxp_sidebar_menu_group };
