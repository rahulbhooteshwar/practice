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
import { m as messages, C as CommonUtility } from './messages-9ecf548a.js';
var NAV_GROUP = 'dxp-nav-group';
var ARIA_EXPANDED_TRUE = '[aria-expanded="true"]';
var BLOCK_CLASS = '.dxp-block';
var NAV_ITEM = 'dxp-nav-item';
var NAV_SUB_ITEM = 'dxp-nav-sub-item';
var ACTIVE_LINK = 'active-link';
var MAX_HEIGHT_NONE = 'max-height-none';
var ARIA_EXPANDED = 'aria-expanded';
var NAV_ONE_LINK_CLASS = '.nav-level-one-link';
var Navigation = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    /** life cycle hook runs before loading the component */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shadow, href, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'Navigation', messages);
                        shadow = this.element ? this.element : this.element;
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-navigation.min.css";
                        dxp.util.appendLinkElement(shadow, href);
                        this.utility = new CommonUtility();
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
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Actions to perform after component load */
    class_1.prototype.componentDidLoad = function () {
        var levelOneMenuItems = this.element.querySelectorAll(NAV_GROUP).length ? this.element.querySelectorAll(NAV_GROUP) : this.element.querySelectorAll(NAV_GROUP);
        // Remove nav item more than 6
        this.utility.preventExtraMenuItems(levelOneMenuItems, 5);
        // accessibility compliance
        // Work for Nested element implementation
        this.defaultActions();
    };
    /** Actions to perform after component update */
    class_1.prototype.componentDidUpdate = function () {
        // accessibility compliance
        // Work for JSON or API data
        this.defaultActions();
    };
    /** Click events */
    class_1.prototype.handleClickEvent = function (e) {
        this.base.routingEventListener(e);
        var target = e.target ? e.composedPath()[0] : e.target;
        var expandedItems = this.element.querySelectorAll('.down').length ? this.element.querySelectorAll('.down') : this.element.querySelectorAll('.down');
        var expandedMainMenu = target ? target.closest('.in') : undefined;
        var nextSibling = target ? target.nextElementSibling : undefined;
        // Mobile menu/sub menu expand and collapse
        this.menuItemsHandler(target, nextSibling, expandedItems, expandedMainMenu);
    };
    /** Document click event handler */
    class_1.prototype.handleDocumentClick = function (e) {
        var dxpNav = e.target.closest('dxp-navigation');
        var ariaExpanded = this.element.querySelector(ARIA_EXPANDED_TRUE) || this.element.querySelector(ARIA_EXPANDED_TRUE);
        var expandedMenus = this.element.querySelector(BLOCK_CLASS) || this.element.querySelector(BLOCK_CLASS);
        // Collapse expanded menu item on click in web page anywhere
        this.collapseExpandedNav(dxpNav, ariaExpanded, expandedMenus);
    };
    /** Key down events */
    class_1.prototype.handleKeydownEvents = function (e) {
        var keys = [32, 37, 38, 39, 40];
        var keycode = e.keyCode;
        var target = e.target ? e.target.activeElement : e.target;
        // Expanded level two menu item
        var expandedNavItem = this.element.querySelector(BLOCK_CLASS);
        var isLevelOne;
        var nestedItem;
        var isNavItem;
        var subItems;
        var isSubItem;
        var nextItem;
        var prevItem;
        var nextSubItem;
        var prevSubItem;
        var isExpanded;
        if (target) {
            isLevelOne = target.classList.contains('nav-level-one-link');
            nestedItem = target.parentElement.querySelector('.mega-menu-container');
            isNavItem = target.classList.contains('mega-menu-link');
            subItems = target.parentElement.querySelector('.mega-sub-menu');
            isSubItem = target.classList.contains('mega-sub-menu-link');
            nextItem = target.closest(NAV_ITEM) ? target.closest(NAV_ITEM).nextElementSibling : false;
            prevItem = target.closest(NAV_ITEM) ? target.closest(NAV_ITEM).previousElementSibling : false;
            nextSubItem = target.closest(NAV_SUB_ITEM) ? target.closest(NAV_SUB_ITEM).nextElementSibling : false;
            prevSubItem = target.closest(NAV_SUB_ITEM) ? target.closest(NAV_SUB_ITEM).previousElementSibling : false;
        }
        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
        this.preventDefaultAction(e, keys);
        // Hide expanded nav item (level 2) if the tab key pressed on first level menu item
        this.hideNavItem(target, isLevelOne, expandedNavItem, keycode);
        // Check the level-2 menu item is expanded. Get 'true' if expanded
        if (nestedItem) {
            isExpanded = nestedItem.classList.contains('dxp-block');
        }
        // show/hide the nested menu items
        // Space bar key can show and hide the dropdown menu items
        // Down arrow key only expand menu items
        this.showHideMenuWithKeys(target, keycode, nestedItem, isExpanded);
        // Select Level 2 first menu item with down arrow key
        this.selectNestedMenuItem(nestedItem, keycode, isExpanded);
        // Navigate expanded menu items
        this.navigateInExpandedMenu(isNavItem, keycode, subItems, nextItem);
        // Navigate in nav-sub-menu items
        this.navigateSubItems(isSubItem, nextSubItem, keycode, prevSubItem);
        // Select previous nav item
        this.selectParentNavItem(target, prevSubItem, isSubItem, keycode);
        // Select previous nav sub item (nav sub item) OR nav item (level-2)
        this.selectPrevNavItem(isNavItem, prevItem, keycode);
        // Select next nav item (level 2) from nav sub item (Level 3)
        this.selectNextNavItem(isSubItem, nextSubItem, nextItem, keycode);
    };
    /** key up events */
    class_1.prototype.handleUpkeyEvents = function (e) {
        var target = e.target ? e.target.activeElement : e.target;
        var keycode = e.keyCode;
        var expandedNavItem = e.target ? this.element.querySelector(BLOCK_CLASS) : this.element.querySelector(BLOCK_CLASS);
        var ariaExpanded = e.target ? this.element.querySelector(ARIA_EXPANDED_TRUE) : this.element.querySelector(ARIA_EXPANDED_TRUE);
        var expandedMenus = e.target ? this.element.querySelector(BLOCK_CLASS) : this.element.querySelector(BLOCK_CLASS);
        var isLevelOne;
        if (target) {
            isLevelOne = target.classList.contains('nav-level-one-link');
        }
        // Collapse expanded menu items
        // * if menu item looses the focus (with Tab key)
        // * collapse expanded menu items on Esc key
        this.hideMenuItemsOnKeyPress(target, keycode, isLevelOne, expandedNavItem, expandedMenus, ariaExpanded);
    };
    /** window resize event */
    class_1.prototype.onWindowResize = function () {
        var navOverlay = document.querySelector('.nav-overlay');
        var windowWidth = window.innerWidth;
        // Hide nav overlay if lG & XL breakpoint
        if (navOverlay) {
            windowWidth >= 992 ? navOverlay.style.display = 'none' : navOverlay.style.display = 'block';
        }
    };
    /** Collapse all level menu items */
    class_1.prototype.collapseAllMenus = function (expandedItems) {
        for (var _i = 0, _a = Object.keys(expandedItems); _i < _a.length; _i++) {
            var i = _a[_i];
            // Prevent the set time out execution
            clearTimeout(this.clearSetTimeout);
            expandedItems[i].classList.remove('down');
            expandedItems[i].previousElementSibling.classList.remove(ACTIVE_LINK);
            expandedItems[i].nextElementSibling.classList.remove('in');
            expandedItems[i].nextElementSibling.classList.remove(MAX_HEIGHT_NONE);
        }
    };
    /** Collapse expanded menu item on click in web page anywhere */
    class_1.prototype.collapseExpandedNav = function (dxpNav, ariaExpanded, expandedMenus) {
        if (!dxpNav && expandedMenus) {
            ariaExpanded.setAttribute(ARIA_EXPANDED, 'false');
            expandedMenus.classList.remove('dxp-block');
        }
    };
    /** handled the accessibility compliance  */
    class_1.prototype.defaultActions = function () {
        var menuItems = this.element.querySelectorAll(NAV_ONE_LINK_CLASS).length ?
            this.element.querySelectorAll(NAV_ONE_LINK_CLASS)
            :
                this.element.querySelectorAll(NAV_ONE_LINK_CLASS);
        // set the position of first level menu-items and the number of menu items of accessibility compliance
        // Work for nested element implementation
        this.utility.setPosNSize(menuItems);
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** Collapse expanded menu items with key up event */
    class_1.prototype.hideMenuItemsOnKeyPress = function (target, keycode, isLevelOne, expandedNavItem, expandedMenus, ariaExpanded) {
        // Collapse expanded menu items if menu item looses the focus (with Tab key)
        if (isLevelOne && expandedNavItem && keycode === 9) {
            target.setAttribute(ARIA_EXPANDED, 'false');
            expandedNavItem.classList.remove('dxp-block');
        }
        // Collapse expanded menu items on Esc key
        if (expandedMenus && keycode === 27) {
            this.focusElement(ariaExpanded);
            ariaExpanded.setAttribute(ARIA_EXPANDED, 'false');
            expandedMenus.classList.remove('dxp-block');
        }
    };
    /** Hide entire navigation in mobile with hamburger (close button) */
    class_1.prototype.hideNav = function (nav, target, expandedItems) {
        var overlay = document.querySelector('.nav-overlay');
        nav.classList.remove('nav-height');
        nav.classList.remove('overflow-y-auto');
        target.classList.remove('nav-close');
        target.classList.add('hamburger-btn');
        // Collapse all expanded menu items
        this.collapseAllMenus(expandedItems);
        // Remove navigation overlay background
        if (overlay) {
            setTimeout(function () {
                overlay.remove();
            }, 200);
        }
    };
    /** Hide expanded nav item (level 2) if the tab key pressed on first level menu item */
    class_1.prototype.hideNavItem = function (target, isLevelOne, expandedNavItem, keycode) {
        if (isLevelOne && expandedNavItem && keycode === 9) {
            target.setAttribute(ARIA_EXPANDED, 'false');
            expandedNavItem.classList.remove('dxp-block');
        }
    };
    /** Hide expanded sibling sub items */
    class_1.prototype.hideSubMenu = function (expandedSubItems) {
        // Prevent the set time out execution
        clearTimeout(this.clearSetTimeout);
        expandedSubItems.previousElementSibling.classList.remove(ACTIVE_LINK);
        expandedSubItems.classList.remove('down');
        expandedSubItems.nextElementSibling.classList.remove('in');
        expandedSubItems.nextElementSibling.classList.remove(MAX_HEIGHT_NONE);
    };
    /** Mobile menu/sub menu expand and collapse */
    class_1.prototype.menuItemsHandler = function (target, itemContainer, expandedItems, expandedMainMenu) {
        var expandedSubItems = expandedMainMenu ? expandedMainMenu.querySelector('.down') : undefined;
        if (target && target.classList.contains('caret')) {
            // Expand collapse menu items
            if (!target.classList.contains('down')) {
                // Before expand current nested menu items.
                // It hides all previous expanded menu & sub menu items
                if (expandedItems && !expandedMainMenu) {
                    this.collapseAllMenus(expandedItems);
                }
                // Hide expanded sibling sub items before new will expand
                if (expandedMainMenu && expandedSubItems) {
                    this.hideSubMenu(expandedSubItems);
                }
                // Expand nested menu/sub menu items
                target.previousElementSibling.classList.add(ACTIVE_LINK);
                target.classList.add('down');
                itemContainer.classList.add('in');
                this.clearSetTimeout = setTimeout(function () {
                    itemContainer.classList.add(MAX_HEIGHT_NONE);
                }, 600);
            }
            else if (expandedMainMenu && expandedSubItems) {
                // Hide expanded sub menu item clicking on same already expanded sub menu item
                this.hideSubMenu(expandedSubItems);
            }
            else {
                this.collapseAllMenus(expandedItems);
            }
        }
    };
    /** Navigate expanded menu items */
    class_1.prototype.navigateInExpandedMenu = function (isNavItem, keycode, subItems, nextItem) {
        if (isNavItem && (keycode === 39 || keycode === 40)) {
            // Select first link of nav sub item
            if (subItems) {
                var links = subItems.querySelectorAll('a');
                this.focusElement(links[1]);
            }
            // Select next nav item (level-2)
            if (!subItems && nextItem) {
                nextItem.querySelector('.mega-menu-content a').focus();
            }
        }
    };
    /** Navigate in nav-sub-menu items */
    class_1.prototype.navigateSubItems = function (isSubItem, nextSubItem, keycode, prevSubItem) {
        // Next
        if (isSubItem && nextSubItem && (keycode === 39 || keycode === 40)) {
            nextSubItem.querySelector('a').focus();
        }
        // Previous
        if (isSubItem && prevSubItem && (keycode === 37 || keycode === 38)) {
            prevSubItem.querySelector('a').focus();
        }
    };
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    class_1.prototype.preventDefaultAction = function (event, keys) {
        if (keys.indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
    };
    /** Select Level two's first menu item with down arrow key */
    class_1.prototype.selectNestedMenuItem = function (nestedItem, keycode, isExpanded) {
        if (nestedItem && (keycode === 39 || keycode === 40) && isExpanded) {
            var menuItem = nestedItem.querySelector('.mega-menu-content');
            var link = menuItem.querySelector('a');
            this.focusElement(link);
        }
    };
    /** Select next nav item (level 2) from nav sub item (Level 3) */
    class_1.prototype.selectNextNavItem = function (isSubItem, nextSubItem, nextItem, keycode) {
        if (isSubItem && !nextSubItem && nextItem && (keycode === 39 || keycode === 40)) {
            nextItem.querySelector('.mega-menu-content a').focus();
        }
    };
    /** Select parent nav item with up arrow key (if first sub menu item is already selected) */
    class_1.prototype.selectParentNavItem = function (target, prevSubItem, isSubItem, keycode) {
        // Previous nav item
        if (isSubItem && !prevSubItem && (keycode === 37 || keycode === 38)) {
            var navItem = target.closest('.mega-menu-content').querySelector('.mega-menu-link');
            this.focusElement(navItem);
        }
    };
    /** select previous nav sub item (nav sub item) OR nav item (level-2) */
    class_1.prototype.selectPrevNavItem = function (isNavItem, prevItem, keycode) {
        if (isNavItem && prevItem && (keycode === 37 || keycode === 38)) {
            var lastSubItem = prevItem.querySelectorAll('.mega-sub-menu-link');
            // Select last nav sub link of previous nav-item
            if (lastSubItem.length) {
                this.focusElement(lastSubItem[lastSubItem.length - 1]);
            }
            else {
                this.focusElement(prevItem.querySelector('.mega-menu-link'));
            }
        }
    };
    /**
     * Show/hide the nested menu items
     * Space bar key can show and hide the dropdown menu items
     * Down arrow key only expand menu items
     */
    class_1.prototype.showHideMenuWithKeys = function (target, keycode, nestedItem, isExpanded) {
        if ((keycode === 32 || keycode === 39 || keycode === 40) && nestedItem) {
            // Space bar key
            if (keycode !== 39 && keycode !== 40 && isExpanded) {
                target.setAttribute(ARIA_EXPANDED, 'false');
                nestedItem.classList.remove('dxp-block');
            }
            else {
                target.setAttribute(ARIA_EXPANDED, 'true');
                nestedItem.classList.add('dxp-block');
            }
        }
    };
    /** Render the navigation */
    class_1.prototype.render = function () {
        dxp.log.debug("in dxp-navigation render() : " + "DEVELOPMENT");
        return (h("nav", { dir: this.dir, "data-theme": this.theme, class: this.base.componentClass() + " nav-primary", role: "navigation" }, h("ul", { class: "nav", role: "menu" }, this.navData && this.navData.navigationData
            ? this.navData.navigationData.map(function (navItem) { return h("dxp-nav-group", { "link-title": navItem['linkTitle'], "navigation-title": navItem['navigationTitle'], "menu-route-link": navItem['menuRouteLink'], "accessibility-text": navItem['accessibilityText'], child: navItem['child'] }); })
            : h("slot", null))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ".dxp.dxp-navigation{width:100%;display:block;background:none;-ms-flex-align:center;align-items:center}.dxp.dxp-navigation.pos-relative{position:relative}.dxp.dxp-navigation.nav-primary{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-order:1;order:1;margin-right:0;padding:0;width:100%;right:0}.dxp.dxp-navigation a{font-size:14px;letter-spacing:1.57px;line-height:24px;text-decoration:none}.dxp.dxp-navigation a:hover{text-decoration:none}.dxp.dxp-navigation .nav{padding:20px 28px 0 38px;width:100%;height:100%}\@media (min-width:992px){.dxp.dxp-navigation.nav-primary{width:100%;-ms-flex-direction:row;flex-direction:row;margin:0;right:auto;padding:0;-ms-flex-order:0;order:0;height:100%}.dxp.dxp-navigation a{font-size:16px;letter-spacing:0}.dxp.dxp-navigation .nav{background:transparent;margin:0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:auto}}\@media (max-width:991px){.dxp.dxp-navigation.nav-primary{overflow-y:hidden;max-height:0;-webkit-transition:max-height .35s ease;transition:max-height .35s ease}.dxp.dxp-navigation.nav-height{max-height:100vh;-webkit-transition:max-height .6s ease;transition:max-height .6s ease}.dxp.dxp-navigation.overflow-y-auto{overflow-y:auto}.dxp.dxp-navigation .nav{margin-top:0;padding-bottom:40px}}.dxp.dxp-navigation[dir=rtl].nav-primary{text-align:right;-ms-flex-align:start;align-items:flex-start}\@media (min-width:992px){.dxp.dxp-navigation[dir=rtl].nav-primary{margin-left:auto}.dxp.dxp-navigation[dir=rtl] .nav{padding:0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Navigation as dxp_navigation };
