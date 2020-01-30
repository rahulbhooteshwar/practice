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
import { C as CommonUtility } from './overlay-7417567e.js';
var CTA_LIST = 'dxp-cta-list';
var SUB_NAV_ITEM_CLASS = '.sub-nav-item';
var NavMenu = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.navHeaderClicked = createEvent(this, "navHeaderClicked", 7);
        this.childClickEvent = createEvent(this, "childClickEvent", 7);
    }
    /** watch for navigation data change  */
    class_1.prototype.navGroupHandler = function () {
        this.base.createNestedMarkup(this.navGroupContainer, 'dxp-nav-item-content', this.child);
    };
    /** watch for navigation data change  */
    class_1.prototype.quickLinksHandler = function () {
        if (this.quickLinks.length > 0) {
            for (var _i = 0, _a = this.quickLinks; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.quickLinkDescription) {
                    item['title-text'] = item.quickLinkDescription;
                    item['orientation'] = 'vertical';
                    for (var _b = 0, _c = item.ctaList; _b < _c.length; _b++) {
                        var prop = _c[_b];
                        if (prop.title) {
                            prop['text'] = prop.title;
                            prop['type'] = 'link';
                            prop['src'] = prop.image;
                            prop['href'] = prop.link;
                            prop['alt'] = prop.imageAltText;
                            prop['icon-align'] = 'left';
                        }
                    }
                }
            }
            this.quickLinks[0].titleStyle = 'dxp-title-sm';
            this.quickLinks[0].orientation = 'vertical';
        }
        this.base.createNestedMarkup(this.quickLinksContainer, CTA_LIST, this.quickLinks);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.utility = new CommonUtility();
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.quickLinks) {
                            this.quickLinksHandler();
                        }
                        if (this.child) {
                            this.navGroupHandler();
                        }
                        return [4 /*yield*/, this.defaultActionOnFocus()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // On addition of data through API
                    return [4 /*yield*/, this.defaultActionOnFocus()];
                    case 1:
                        // On addition of data through API
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** default actions */
    class_1.prototype.defaultActionOnFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var primaryMenuList, navListItem, ctaList, dxpCtas, _i, dxpCtas_1, dxpCta, _a, navListItem_1, item, navItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        primaryMenuList = [];
                        navListItem = this.element.parentElement.querySelectorAll('dxp-nav-menu');
                        ctaList = this.element.querySelector(CTA_LIST);
                        if (!ctaList) return [3 /*break*/, 5];
                        return [4 /*yield*/, ctaList.componentOnReady().then(function (res) {
                                if (res) {
                                    // hide dxp-cta-list title for md and small devices
                                    var ctaListTitle = res ? res.querySelector('p') : res.querySelector('p');
                                    ctaListTitle.classList.add('dxp-hidden-md-down');
                                    ctaListTitle.classList.add('dxp-lg-block');
                                    dxpCtas = res.querySelector('dxp-cta') ? res.querySelectorAll('dxp-cta') : res.querySelectorAll('dxp-cta');
                                }
                            })];
                    case 1:
                        _b.sent();
                        if (!(dxpCtas && dxpCtas.length)) return [3 /*break*/, 5];
                        _i = 0, dxpCtas_1 = dxpCtas;
                        _b.label = 2;
                    case 2:
                        if (!(_i < dxpCtas_1.length)) return [3 /*break*/, 5];
                        dxpCta = dxpCtas_1[_i];
                        return [4 /*yield*/, dxpCta.componentOnReady().then(function (res) {
                                var link = res ? res.querySelector('a') : res.querySelector('a');
                                link.setAttribute('tabindex', '-1');
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        for (_a = 0, navListItem_1 = navListItem; _a < navListItem_1.length; _a++) {
                            item = navListItem_1[_a];
                            navItem = item.querySelector('li.nav-item-li');
                            primaryMenuList.push(navItem);
                        }
                        this.utility.setPosNSize(primaryMenuList);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** nav click - opens overlay */
    class_1.prototype.parentNavHandler = function () {
        var listItem = this.element.querySelector('li') ? this.element.querySelector('li') : this.element.querySelector('li');
        if (this.overlayBgImage) {
            this.utility.openOverlay(listItem, this.overlayBgImage);
        }
        else {
            this.utility.openOverlay(listItem);
        }
        this.navHeaderClicked.emit(listItem);
    };
    /** Prevent scrolling the web page with space-bar and all up/down/left/right arrow keys */
    class_1.prototype.preventDefaultBehaviour = function (keycode, e) {
        var preventDefaultKyes = [32, 37, 38, 39, 40];
        if (preventDefaultKyes.indexOf(keycode) !== -1) {
            e.preventDefault();
        }
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /**  click event handler  */
    class_1.prototype.clickEventHandler = function (event) {
        // click listener for routing events on anchor tag
        this.base.routingEventListener(event);
        // show and hide overlay
        this.childClickEvent.emit(event.target);
    };
    /** show and hide overlay */
    class_1.prototype.showHideMenuWithKeyDown = function (e) {
        var target = e.target ? e.composedPath()[0] : e.target;
        var isNavitem = target.classList.contains('nav-item');
        var parentDxpNav = target.getRootNode && target.getRootNode().host ? target.getRootNode().host.closest('dxp-nav') : target.closest('dxp-nav');
        var closeIcon = parentDxpNav && parentDxpNav ? parentDxpNav.querySelector('.dxp-icon-close')
            : parentDxpNav && parentDxpNav.querySelector('.dxp-icon-close');
        var ariaExpandedNavItem = target.getAttribute('aria-expanded');
        var dxpCtaList = this.element.querySelector(CTA_LIST);
        var parentDxpCta = target.closest('dxp-cta');
        var nextElmDxpCta = (parentDxpCta && parentDxpCta.nextElementSibling)
            || (target.getRootNode && target.getRootNode().host && target.getRootNode().host.nodeName === 'DXP-CTA' && target.getRootNode().host.nextElementSibling);
        var prevElmDxpCta = (parentDxpCta && parentDxpCta.previousElementSibling)
            || (target.getRootNode && target.getRootNode().host && target.getRootNode().host.nodeName === 'DXP-CTA') && target.getRootNode().host.previousElementSibling;
        var lastElmDxpCta = (parentDxpCta && !parentDxpCta.nextElementSibling)
            || (target.getRootNode && target.getRootNode().host && target.getRootNode().host.nodeName === 'DXP-CTA' && !target.getRootNode().host.nextElementSibling);
        var isSubNavItem = target.classList.contains('sub-nav-item');
        var subNavItem = this.element.querySelector(SUB_NAV_ITEM_CLASS);
        var parentDxpNavItemContent = target.closest('dxp-nav-item-content');
        var nextDxpNavItemContent = parentDxpNavItemContent && parentDxpNavItemContent.nextElementSibling;
        var prevDxpNavItemContent = parentDxpNavItemContent && parentDxpNavItemContent.previousElementSibling;
        var keycode = e.keyCode;
        var isCta = target.closest('.dxp-cta');
        // Prevent scrolling the web page with space-bar and all up/down/left/right arrow keys
        this.preventDefaultBehaviour(keycode, e);
        if (isNavitem && (keycode === 13 || keycode === 32)) {
            this.parentNavHandler();
        }
        // If tab key pressed on Quick link : Hide current expanded menus and select next menu item (Level one)
        if (keycode === 9 && ((target.getRootNode && target.getRootNode.host && target.getRootNode().host.nodeName === 'DXP-CTA') || parentDxpCta)) {
            this.parentNavHandler();
            return;
        }
        // If tab key pressed on Sub menu item link: Hide current expanded menus and select next menu item (Level one)
        if ((isCta || isSubNavItem) && keycode === 9) {
            this.parentNavHandler();
        }
        // If tab key pressed on main menu (Level 1): Hide current expanded menus and select next menu item (Level one)
        if ((isNavitem) && ariaExpandedNavItem === 'true' && (keycode === 9 || keycode === 27)) {
            this.parentNavHandler();
        }
        // Select first link of Quick link OR Sub menu item
        if (isNavitem && ariaExpandedNavItem === 'true' && (keycode === 40 || keycode === 38)) {
            var dxpCta = void 0;
            var link = void 0;
            if (dxpCtaList) {
                dxpCta = dxpCtaList.querySelector('dxp-cta') ? dxpCtaList.querySelector('dxp-cta') : dxpCtaList.querySelector('dxp-cta');
                link = dxpCta ? dxpCta.querySelector('a') : dxpCta.querySelector('a');
            }
            // Select first link of Quick link
            if (link) {
                this.focusElement(link);
                return;
            }
            // Select first link of Sub link
            if (subNavItem) {
                this.focusElement(subNavItem);
            }
        }
        // Navigate through quick links (Down arrow)
        if (keycode === 40 && nextElmDxpCta) {
            var link = nextElmDxpCta ? nextElmDxpCta.querySelector('a') : nextElmDxpCta.querySelector('a');
            if (link) {
                this.focusElement(link);
                return;
            }
        }
        // Navigate through quick links (Up arrow)
        if (keycode === 38 && prevElmDxpCta) {
            var link = void 0;
            if (prevElmDxpCta) {
                link = prevElmDxpCta ? prevElmDxpCta.querySelector('a') : prevElmDxpCta.querySelector('a');
            }
            if (link) {
                this.focusElement(link);
                return;
            }
        }
        // Select first link of sub menus from quick link OR close button
        if (lastElmDxpCta && keycode === 40) {
            var currentSubNavItem = this.subNavChildContainer.querySelector(SUB_NAV_ITEM_CLASS);
            // Sub menu first link
            if (currentSubNavItem) {
                this.focusElement(currentSubNavItem);
                return;
            }
            // Expanded menu close button
            if (parentDxpNav) {
                this.focusElement(closeIcon);
            }
        }
        // Navigate through sub menus items (Down arrow)
        if (target && isSubNavItem && nextDxpNavItemContent && keycode === 40) {
            var currentSubNavItem = nextDxpNavItemContent.querySelector(SUB_NAV_ITEM_CLASS);
            if (currentSubNavItem) {
                this.focusElement(currentSubNavItem);
            }
        }
        // Navigate through sub menus items (Up arrow)
        if (target && isSubNavItem && prevDxpNavItemContent && keycode === 38) {
            var currentSubNavItem = prevDxpNavItemContent.querySelector(SUB_NAV_ITEM_CLASS);
            if (currentSubNavItem) {
                this.focusElement(currentSubNavItem);
            }
        }
        // Select close button to close the expanded nav
        if (target && isSubNavItem && !nextDxpNavItemContent && keycode === 40) {
            this.focusElement(closeIcon);
        }
        // Select last link of quick link form sub menu item
        if (target && isSubNavItem && !prevDxpNavItemContent && keycode === 38) {
            if (this.subNavChildContainer) {
                var currentDxpCtaList = this.subNavChildContainer.querySelector(CTA_LIST);
                var dxpCta = currentDxpCtaList && currentDxpCtaList.querySelector('dxp-cta') ?
                    currentDxpCtaList.querySelectorAll('dxp-cta')
                    :
                        currentDxpCtaList.querySelectorAll('dxp-cta');
                var link = dxpCta && dxpCta[dxpCta.length - 1] ?
                    dxpCta[dxpCta.length - 1].querySelector('a')
                    :
                        dxpCta && dxpCta[dxpCta.length - 1].querySelector('a');
                if (link) {
                    this.focusElement(link);
                }
            }
        }
        // expand second level menu items
        if (isNavitem && ariaExpandedNavItem !== 'true' && (keycode === 40 || keycode === 38)) {
            this.parentNavHandler();
        }
    };
    /** Render the nav */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug("in dxp-nav-menu render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-nav.min.css" })]
        ];
        return (h("li", { class: "nav-item-li " + this.base.componentClass(), dir: this.dir, "data-theme": this.theme, role: "menu" }, styles, h("span", { class: "nav-item h5", tabindex: "0", onClick: function () { _this.parentNavHandler(); }, role: "menuitem", "aria-haspopup": "true", "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle }, this.navigationTitle), h("div", { class: "sub-nav-child-container", ref: function (el) { return _this.subNavChildContainer = el; } }, h("div", { class: "quick-links-container dxp-col-lg-3", ref: function (el) { return _this.quickLinksContainer = el; } }, h("slot", null), "\u00A0"), this.child &&
            h("div", { ref: function (el) { return _this.groupContainer = el; }, class: "group-container dxp-col-lg-4 dxp-col-offset-lg-1" }, h("dxp-nav-item-container", null, h("div", { class: "dxp-scrollable-container" }, h("div", { class: "dxp-scrollable" }, h("ul", { ref: function (el) { return _this.navGroupContainer = el; } }, h("slot", null)))))), !this.child &&
            h("div", { ref: function (el) { return _this.groupContainer = el; }, class: "group-container dxp-col-lg-4 dxp-col-offset-lg-1" }, h("div", { class: "dxp-scrollable-container" }, h("div", { class: "dxp-scrollable" }, h("ul", null, h("slot", { name: "group-content" }))))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "child": ["navGroupHandler"],
                "quickLinks": ["quickLinksHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "li.dxp.dxp-nav-menu{background:none;padding:.8rem 0}li.dxp.dxp-nav-menu>a,li.dxp.dxp-nav-menu>span{margin:0}li.dxp.dxp-nav-menu .sub-nav-child-container{margin-top:1.125rem;display:none;-ms-flex-direction:column-reverse;flex-direction:column-reverse}li.dxp.dxp-nav-menu.in+li{padding-top:0}li.dxp.dxp-nav-menu .nav-item{display:block;width:100%;height:auto;position:relative;padding:0;cursor:pointer}li.dxp.dxp-nav-menu .nav-item:before{content:\"\";display:block;position:absolute}\@media (min-width:992px){li.dxp.dxp-nav-menu{display:inline-block;padding:0}li.dxp.dxp-nav-menu:not(:first-of-type){margin-left:3.5rem}li.dxp.dxp-nav-menu dxp-nav-item-content{display:block}li.dxp.dxp-nav-menu dxp-nav-item-content:not(:last-child){margin-bottom:2.2rem}li.dxp.dxp-nav-menu.in .nav-item:focus{border:.0625rem solid transparent}li.dxp.dxp-nav-menu .nav-item:after{content:\"\";display:block;height:.0625rem;width:calc(100% + 1.3125rem)}li.dxp.dxp-nav-menu .sub-nav-child-container{position:absolute;width:100%;left:0;display:none;margin-top:7.375rem;opacity:0;-webkit-transition:opacity .3s;transition:opacity .3s;pointer-events:none}li.dxp.dxp-nav-menu .sub-nav-child-container.show{display:block}li.dxp.dxp-nav-menu .sub-nav-child-container.expanded{opacity:1;pointer-events:all}li.dxp.dxp-nav-menu .sub-nav-child-container .sub-nav-item{margin:0}li.dxp.dxp-nav-menu .dxp-scrollable{max-height:calc(100vh - 11.3rem)}li.dxp.dxp-nav-menu .dxp-scrollable ul{margin-bottom:0}}\@media screen and (min-width:992px) and (min-width:0\\0){li.dxp.dxp-nav-menu .dxp-scrollable{max-height:calc(100vh - 102px)}}\@media (max-width:991px){li.dxp.dxp-nav-menu.in .sub-nav-child-container{display:-ms-flexbox;display:flex;padding-left:16px}}\@media (max-width:767px){li.dxp.dxp-nav-menu.in .sub-nav-child-container{padding-left:8px}}li.dxp.dxp-nav-menu[dir=rtl].in .nav-item:before,li.dxp.dxp-nav-menu[dir=rtl] .nav-item:before{right:auto;left:0}\@media (min-width:992px){li.dxp.dxp-nav-menu[dir=rtl].in .nav-item:before,li.dxp.dxp-nav-menu[dir=rtl] .nav-item:before{right:auto;left:1.2rem}}\@media (max-width:991px){li.dxp.dxp-nav-menu[dir=rtl].in .sub-nav-child-container{display:-ms-flexbox;display:flex;padding-right:16px}}\@media (max-width:767px){li.dxp.dxp-nav-menu[dir=rtl].in .sub-nav-child-container{padding-right:8px}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { NavMenu as dxp_nav_menu };
