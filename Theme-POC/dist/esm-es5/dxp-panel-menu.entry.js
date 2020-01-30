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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-6d333681.js';
var PANEL_SUB_MENU = 'dxp-panel-sub-menu';
var PanelMenu = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** Nested menu elements */
        this.nestedMenus = [];
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'PanelMenu', messages);
    };
    /** listen for key down on enter key to switch panel menus */
    class_1.prototype.keyDownHandler = function (event) {
        if (event.keyCode === 13 && this.focusedControl) {
            this.focusedControl.click();
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Following method will be called by child items to register items in sub-menus so that control group can be created */
    class_1.prototype.registerMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.activateDefaultMenu();
                // re-render menu list by changing state
                this.nestedMenus = __spreadArrays(this.getRenderedMenuItems());
                return [2 /*return*/];
            });
        });
    };
    /** activate default menu if not provided */
    class_1.prototype.activateDefaultMenu = function () {
        var activeMenus = this.getRenderedMenuItems() && this.getRenderedMenuItems().filter(function (menu) {
            return menu && menu['active'];
        });
        if (activeMenus && activeMenus.length === 0) {
            var firstMenu = this.getRenderedMenuItems()[0];
            if (firstMenu) {
                firstMenu['active'] = true;
            }
        }
    };
    /** activate default menu if not provided */
    class_1.prototype.activateMenu = function (menuElement) {
        for (var _i = 0, _a = this.nestedMenus; _i < _a.length; _i++) {
            var menu = _a[_i];
            menu['active'] = this.base.returnBooleanValue(menuElement.isEqualNode(menu));
        }
        // re-render menu controls by changing state
        this.nestedMenus = __spreadArrays(this.nestedMenus);
    };
    /** convert node list to array */
    class_1.prototype.getArrayFromNodeList = function (nodeList) {
        return [].slice.call(nodeList);
    };
    /** get array of rendered child sub-menu elements */
    class_1.prototype.getRenderedMenuItems = function () {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        var renderedSubMenus = this.element ?
            this.getArrayFromNodeList(this.element.querySelectorAll(PANEL_SUB_MENU))
            :
                this.getArrayFromNodeList(this.element.querySelectorAll(PANEL_SUB_MENU));
        // if child items are not found within this component then search for slotted items (childNodes)
        renderedSubMenus = renderedSubMenus.length > 0 ? renderedSubMenus : this.getArrayFromNodeList(this.element.childNodes).filter(function (child) {
            return child['tagName'] && child['tagName'].toLowerCase() === PANEL_SUB_MENU;
        });
        return renderedSubMenus;
    };
    /** Render the panel-menu */
    class_1.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-panel-menu.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-row" }, h("div", { class: "panel-control-group panel-vertical" }, this.nestedMenus.map(function (menuElement) { return h("div", { class: "panel-control " + (menuElement['active'] ? 'panel-control-active' : '') + " " + (_this.fixedWidth ? 'panel-fixed-width' : ''), onClick: function () { return _this.activateMenu(menuElement); } }, h("slot", { name: "top" }), h("div", { tabindex: "0", role: "button", class: "panel-title", onFocus: function (event) { return _this.focusedControl = event.target; } }, h("div", { class: "dxp-row dxp-ml-0 dxp-mr-0 dxp-no-gutters" }, h("div", { class: "dxp-text-truncate " + (menuElement['progressBar'] ? 'dxp-col-lg-6 dxp-col-md-8 dxp-col-sm-12' : 'dxp-col-12') }, h("div", { class: "panel-icon-wrapper" }, menuElement['menuIconSrc']
            ? h("img", { src: menuElement['menuIconSrc'], alt: menuElement['alt'] ? menuElement['alt'] : menuElement['menuTitle'] })
            : ''), h("span", { class: "" + (_this.iconOnlySm ? 'icon-only-sm' : ''), title: menuElement['menuTitle'], innerHTML: menuElement['menuTitle'] })), menuElement['progressBar'] ?
            h("div", { class: "dxp-col-lg-6 dxp-col-md-4 dxp-col-sm-12" }, h("div", { class: "dxp-mt-3 dxp-ml-1" }, h("dxp-progressbar", { type: "linear", "background-color": "#F3F0EE", "progress-color": menuElement['progressColor'], "current-value": menuElement['currentValue'], "max-value": menuElement['maxValue'], "have-description": "false", height: "5px" })))
            : '')), (menuElement['subMenu'] && menuElement['subMenu'].split(',').length) ?
            h("div", { class: "subpanel-wrapper" }, menuElement['subMenu'].split(',').map(function (subMenu) { return menuElement['active'] ? h("p", { class: "sub-menus ", title: subMenu, "aria-label": subMenu }, subMenu) : ''; }))
            : ''); }), h("slot", { name: "bottom" })), h("div", { class: "item-wrapper item-wrapper-vertical dxp-col-12" }, h("div", null, this.menuItems
            ? this.menuItems.map(function (menuItem) { return h("dxp-panel-sub-menu", { active: menuItem['active'], "menu-title": menuItem['menuTitle'], content: menuItem['content'], "menu-icon-src": menuItem['menuIconSrc'], alt: menuItem['alt'], "progress-bar": menuItem['progressBar'], "progress-color": menuItem['progressColor'], "current-value": menuItem['currentValue'], "max-value": menuItem['maxValue'], "sub-menu": menuItem['subMenu'] }); })
            : h("slot", null))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-panel-menu{width:100%;padding:1rem}div.dxp.dxp-panel-menu .panel-control-group{width:100%;display:-ms-flexbox;display:flex;overflow-x:auto}div.dxp.dxp-panel-menu .panel-control-group.panel-vertical{display:inline-block;width:25%;padding-right:2.5rem;float:left}div.dxp.dxp-panel-menu .panel-control{text-align:left;background-color:inherit;border:none;outline:none;cursor:pointer;min-width:6.1875rem;background:transparent;border-radius:0;padding:0 12px;font-size:.875rem}div.dxp.dxp-panel-menu .panel-control.panel-fixed-width{width:100%}div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper{display:inline-block}\@media (max-width:767.9px){div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper{display:block}}div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper img{width:1.5rem;height:1.5rem;margin-right:.5rem}div.dxp.dxp-panel-menu .panel-control.panel-control-active .panel-title{border-bottom-width:6px;border-bottom-style:solid;outline:none}div.dxp.dxp-panel-menu .panel-control.panel-control-active .subpanel-wrapper{padding:1rem 0}div.dxp.dxp-panel-menu .panel-control.panel-control-active .subpanel-wrapper .sub-menus{margin-bottom:.5rem}div.dxp.dxp-panel-menu .panel-control.panel-control-active .subpanel-wrapper .sub-menus:last-child{margin-bottom:0}div.dxp.dxp-panel-menu .panel-control .panel-title{padding:.75rem .0625rem;height:100%}\@media (max-width:767.9px){div.dxp.dxp-panel-menu .panel-control .panel-title .icon-only-sm{display:none}}div.dxp.dxp-panel-menu .panel-control:not(.panel-control-active) .panel-title:focus,div.dxp.dxp-panel-menu .panel-control:not(.panel-control-active) .panel-title:hover{border-bottom-width:2px;border-bottom-style:solid}div.dxp.dxp-panel-menu .item-wrapper.item-wrapper-vertical{padding:0 0 2rem 1rem;width:calc(75% - 1.5rem);display:inline-block}div.dxp.dxp-panel-menu .item-wrapper .item-container{padding:3rem 0;border-top-width:1px;border-top-style:solid}\@media (max-width:767px){div.dxp.dxp-panel-menu .panel-control{font-size:.75rem;min-width:9rem}div.dxp.dxp-panel-menu .panel-control.panel-control-active .panel-title{border-bottom-width:4px}div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper img{margin-bottom:.5rem}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { PanelMenu as dxp_panel_menu };
