import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages, C as CommonUtility } from './messages-9ecf548a.js';
var NAV_ONE_LINK = '.nav-level-one-link';
var NavGroup = /** @class */ (function () {
    function NavGroup(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    NavGroup.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'NavGroup', messages);
        this.utility = new CommonUtility();
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-navigation.min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** actions to perform after component load */
    NavGroup.prototype.componentDidLoad = function () {
        var icons = this.element.querySelectorAll('.mega-menu-icon');
        var links = this.element.querySelectorAll('a');
        var menuItems = this.element.querySelectorAll('.mega-menu-link');
        var navItems = this.element.querySelectorAll('dxp-nav-item');
        // Remove item more than 4 items in level 2
        this.utility.preventExtraMenuItems(navItems, 3);
        // Add the active class to Main menu & Sub menu link of current web page
        this.utility.currentPageMenuLink(links);
        // set the position of level-2 menu-items and the number of menu items of accessibility compliance
        // Work for nested element implementation
        this.utility.setPosNSize(menuItems);
        // Resolve the IE issue for alternative text for visible
        this.findBrokenImage(icons);
        this.activeManually();
    };
    /** Actions to perform after component update */
    NavGroup.prototype.componentDidUpdate = function () {
        var menuItems = this.element.querySelectorAll('.mega-menu-link');
        var icons = this.element.querySelectorAll('.mega-menu-icon');
        // set the position of level-2 menu-items and the number of menu items of accessibility compliance
        // Work for Script JSON or service API
        this.utility.setPosNSize(menuItems);
        // Resolve the IE issue for alternative text for visible
        this.findBrokenImage(icons);
        this.activeManually();
    };
    /** Listen screen change event */
    NavGroup.prototype.onWindowResize = function () {
        var windowWidth = window.innerWidth;
        var navOverlay = (this.element.getAttribute('is-nested-menu') === 'true') ? this.element.querySelectorAll(NAV_ONE_LINK) : '';
        var MenuItems = this.element.querySelectorAll('.mega-menu-content > .caret');
        if (windowWidth <= 992) {
            Array.prototype.slice.call(navOverlay).map(function (e) { return e.setAttribute('tabIndex', '-1'); });
            Array.prototype.slice.call(MenuItems).map(function (e) { return e.previousSibling.setAttribute('tabIndex', '-1'); });
        }
        else {
            Array.prototype.slice.call(navOverlay).map(function (e) { return e.removeAttribute('tabIndex'); });
            Array.prototype.slice.call(MenuItems).map(function (e) { return e.previousSibling.removeAttribute('tabIndex'); });
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    NavGroup.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
        this.clickHandler();
    };
    /** manually active links */
    NavGroup.prototype.activeManually = function () {
        var links = Array.from(this.element.parentElement.querySelectorAll('a'));
        var curLink = this.element.querySelector(NAV_ONE_LINK);
        if (this.isActive) {
            links.forEach(function (e) { return e.classList.remove('active'); });
            curLink.classList.add('active');
            curLink.setAttribute('aria-current', 'page');
        }
        else {
            curLink.classList.remove('active');
            curLink.removeAttribute('aria-current');
            this.utility.currentPageMenuLink(links);
        }
    };
    /** will remove is-active attribute on click and will add active link function */
    NavGroup.prototype.clickHandler = function () {
        var links = Array.from(this.element.parentElement.querySelectorAll('a'));
        links.forEach(function (e) { return e.classList.remove('active'); });
        Array.from(this.element.parentElement.querySelectorAll('dxp-nav-group')).forEach(function (e) { return e.removeAttribute('is-active'); });
        this.element.querySelector(NAV_ONE_LINK).classList.add('active');
    };
    /** Resolve the IE issue for alternative text for visible */
    NavGroup.prototype.findBrokenImage = function (icons) {
        if (icons.length) {
            var _loop_1 = function (i) {
                icons[i].onerror = function () {
                    icons[i].classList.remove('mega-menu-icon');
                    icons[i].style.width = 'auto';
                };
            };
            for (var _i = 0, _a = Object.keys(icons); _i < _a.length; _i++) {
                var i = _a[_i];
                _loop_1(i);
            }
        }
    };
    /** Render Nested Menu */
    NavGroup.prototype.renderNestedMenu = function () {
        return (h("div", { class: "group-slot" }, this.child
            ? this.child.map(function (childItem) { return h("dxp-nav-item", { src: childItem['src'], "alt-text": childItem['altText'], "link-title": childItem['linkTitle'], "navigation-title": childItem['navigationTitle'], "menu-route-link": childItem['menuRouteLink'], "accessibility-text": childItem['accessibilityText'], child: childItem['child'] }); })
            : h("slot", null)));
    };
    /** Render the NavGroup */
    NavGroup.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-nav-group render() : " + "DEVELOPMENT");
        return (h("li", { dir: this.dir, "data-theme": this.theme, class: this.base.componentClass() + " nav-level-one", role: "none" }, h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, "aria-haspopup": this.isNestedMenu ? 'true' : undefined, "aria-expanded": this.isNestedMenu ? 'false' : undefined, role: "menuitem", class: "nav-level-one-link", href: this.menuRouteLink }, this.navigationTitle), this.isNestedMenu || (this.child && this.child.length) ? h("button", { "aria-label": dxp.i18n.t('NavGroup:ariaMenuText'), role: "button", class: "caret carrot" }) : undefined, this.isNestedMenu || (this.child && this.child.length) ? h("div", { class: "mega-menu-container", role: "menu" }, h("div", { class: "mega-menu-nav" }, h("div", { class: "dxp-hidden-lg-up overview-link" }, h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, role: "menuitem", class: "mega-menu-link", href: this.menuRouteLink }, this.navigationTitle)), this.renderNestedMenu())) : undefined));
    };
    Object.defineProperty(NavGroup.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavGroup, "style", {
        get: function () { return "dxp-nav-group{height:100%}.dxp.dxp-nav-group.nav-level-one{position:relative}.dxp.dxp-nav-group.nav-level-one .nav-level-one-link{font-family:MarkForMC,-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-weight:400;text-decoration:none;line-height:24px;padding:17px 16px 18px;display:block;font-size:.875rem;letter-spacing:.5px;line-height:1.1}\@media (max-width:991px){.dxp.dxp-nav-group.nav-level-one .nav-level-one-link{padding:24px 20px 24px 0}.dxp.dxp-nav-group.nav-level-one .nav-level-one-link.active-link,.dxp.dxp-nav-group.nav-level-one .nav-level-one-link.active-link:hover{border-bottom:3px solid}}.dxp.dxp-nav-group .mega-menu-container,.dxp.dxp-nav-group.nav-level-one>ul{display:none}.dxp.dxp-nav-group .carrot,.dxp.dxp-nav-group .carrot-down,.dxp.dxp-nav-group .carrot-small,.dxp.dxp-nav-group .carrot-small-down{position:absolute;right:0;top:0;width:100%;display:block;background:transparent;outline:0;border:0;z-index:9;overflow:hidden;text-indent:-999px}.dxp.dxp-nav-group .carrot-down:after,.dxp.dxp-nav-group .carrot-down:before,.dxp.dxp-nav-group .carrot-small-down:after,.dxp.dxp-nav-group .carrot-small-down:before,.dxp.dxp-nav-group .carrot-small:after,.dxp.dxp-nav-group .carrot-small:before,.dxp.dxp-nav-group .carrot:after,.dxp.dxp-nav-group .carrot:before{content:\"\";display:block;width:1px;-webkit-transform:rotate(-40deg);transform:rotate(-40deg);position:absolute;right:4px}.dxp.dxp-nav-group .carrot-down:after,.dxp.dxp-nav-group .carrot-small-down:after,.dxp.dxp-nav-group .carrot-small:after,.dxp.dxp-nav-group .carrot:after{-webkit-transform:rotate(40deg);transform:rotate(40deg)}.dxp.dxp-nav-group .carrot-down:focus,.dxp.dxp-nav-group .carrot-small-down:focus,.dxp.dxp-nav-group .carrot-small:focus,.dxp.dxp-nav-group .carrot:focus{outline:0}.dxp.dxp-nav-group .carrot,.dxp.dxp-nav-group .carrot.down{height:63px}.dxp.dxp-nav-group .carrot.down:after,.dxp.dxp-nav-group .carrot.down:before,.dxp.dxp-nav-group .carrot:after,.dxp.dxp-nav-group .carrot:before{height:11px;top:21px}.dxp.dxp-nav-group .carrot.down:after,.dxp.dxp-nav-group .carrot:after{top:30px}.dxp.dxp-nav-group .carrot.down:before{-webkit-transform:rotate(55deg);transform:rotate(55deg);top:27px}.dxp.dxp-nav-group .carrot.down:after{-webkit-transform:rotate(-55deg);transform:rotate(-55deg);top:27px;right:13px}.dxp.dxp-nav-group .carrot-small,.dxp.dxp-nav-group .carrot-small.down{top:0;width:100%;height:44px;right:0}.dxp.dxp-nav-group .carrot-small.down:after,.dxp.dxp-nav-group .carrot-small.down:before,.dxp.dxp-nav-group .carrot-small:after,.dxp.dxp-nav-group .carrot-small:before{height:7px;top:18px;right:2px}.dxp.dxp-nav-group .carrot-small.down:after,.dxp.dxp-nav-group .carrot-small:after{top:23px}.dxp.dxp-nav-group .carrot-small.down:after,.dxp.dxp-nav-group .carrot-small.down:before{top:20px;right:3px}.dxp.dxp-nav-group .carrot-small.down:before{-webkit-transform:rotate(55deg);transform:rotate(55deg)}.dxp.dxp-nav-group .carrot-small.down:after{-webkit-transform:rotate(-55deg);transform:rotate(-55deg);right:8px}.dxp.dxp-nav-group .overview-link a{padding-top:0}.dxp.dxp-nav-group .dxp-nav-item{position:relative;background:transparent;margin:0}.dxp.dxp-nav-group .mega-menu-link{font-size:14px;line-height:24px;padding:10px 15px 10px 0;letter-spacing:0;display:block}.dxp.dxp-nav-group .mega-menu-link:hover+.mega-sub-menu{display:block}.dxp.dxp-nav-group .mega-sub-menu{display:none;margin-top:10px;margin-bottom:10px}.dxp.dxp-nav-group .mega-sub-menu a{display:block;padding:8px 0;font-size:14px;line-height:24px;letter-spacing:0}.dxp.dxp-nav-group .mega-menu-icon{display:none}.dxp.dxp-nav-group .mega-menu-container .mega-menu-nav{border-top:0}\@media (min-width:992px){.dxp.dxp-nav-group.nav-level-one{margin:0 15px;padding:0;border:0;display:-ms-flexbox;display:flex;height:100%;position:static;max-width:100%;width:100%}.dxp.dxp-nav-group.nav-level-one>*{display:-ms-flexbox;display:flex}.dxp.dxp-nav-group.nav-level-one .nav-level-one-link{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer;text-transform:capitalize}.dxp.dxp-nav-group.nav-level-one.active .nav-level-one-link,.dxp.dxp-nav-group.nav-level-one:hover .nav-level-one-link{text-decoration:none;border-top:4px solid transparent;margin-bottom:0}.dxp.dxp-nav-group.nav-level-one:hover .mega-menu-container{display:block;border-top:0}.dxp.dxp-nav-group .mega-menu-container{position:absolute;z-index:1;left:0;top:100%;width:100%;padding:40px 0;display:none}.dxp.dxp-nav-group .mega-menu-container .mega-menu-nav{-ms-flex-pack:center;justify-content:center;-ms-flex-direction:row;flex-direction:row;margin:0}.dxp.dxp-nav-group .mega-menu-container .mega-menu-nav ul{position:static}.dxp.dxp-nav-group .mega-menu-container .mega-menu-nav .overview-link{display:none}.dxp.dxp-nav-group .mega-menu-container .mega-menu-link:hover,.dxp.dxp-nav-group .mega-menu-container .mega-sub-menu-link:hover{color:#cf4500}.dxp.dxp-nav-group .carrot,.dxp.dxp-nav-group .carrot-down,.dxp.dxp-nav-group .carrot-small,.dxp.dxp-nav-group .carrot-small-down{display:none}.dxp.dxp-nav-group .group-slot{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-direction:row;flex-direction:row}.dxp.dxp-nav-group dxp-nav-item{width:25%;display:-ms-flexbox;display:flex}.dxp.dxp-nav-group dxp-nav-item .dxp-nav-item{width:100%;padding-left:12px;padding-right:12px;border-right-width:0}.dxp.dxp-nav-group dxp-nav-item:first-of-type .dxp-nav-item{border-left-width:0;border-right-width:0}.dxp.dxp-nav-group .mega-menu-icon{display:block;width:100%;max-width:56px;margin-top:6px}.dxp.dxp-nav-group .mega-menu-link{font-size:24px;line-height:32px;margin-bottom:0;padding-right:0}.dxp.dxp-nav-group .mega-sub-menu{display:block;margin:0;margin-top:0}.dxp.dxp-nav-group .mega-sub-menu a{line-height:36px;font-size:14px;text-decoration:none;padding:0}}\@media (max-width:991px){.dxp.dxp-nav-group .mega-menu-container{max-height:0;-webkit-transition:max-height .2s ease,margin .1s ease-in;transition:max-height .2s ease,margin .1s ease-in;display:block;overflow:hidden}.dxp.dxp-nav-group .mega-menu-nav{padding:25px 0 25px 25px}.dxp.dxp-nav-group .mega-sub-menu{max-height:0;-webkit-transition:max-height .2s ease,margin .1s ease-in;transition:max-height .2s ease,margin .1s ease-in;display:block;overflow:hidden}.dxp.dxp-nav-group .mega-sub-menu.in{padding:0 25px}.dxp.dxp-nav-group .mega-sub-menu{margin-top:0;margin-bottom:0}.dxp.dxp-nav-group .in{-webkit-transition:max-height .6s ease,margin .2s ease-out;transition:max-height .6s ease,margin .2s ease-out;max-height:1000px}.dxp.dxp-nav-group .in.max-height-none{max-height:none}}.dxp.dxp-nav-group[dir=rtl] .nav-level-one-link{padding:24px 0 24px 20px}.dxp.dxp-nav-group[dir=rtl] a{text-align:right}.dxp.dxp-nav-group[dir=rtl] .carrot,.dxp.dxp-nav-group[dir=rtl] .carrot-down,.dxp.dxp-nav-group[dir=rtl] .carrot-small,.dxp.dxp-nav-group[dir=rtl] .carrot-small-down{left:0;right:auto;-webkit-transform:scale(-1);transform:scale(-1)}.dxp.dxp-nav-group[dir=rtl] .carrot.down:before{right:13px}.dxp.dxp-nav-group[dir=rtl] .carrot.down:after{right:4px}.dxp.dxp-nav-group[dir=rtl] .mega-menu-link{padding-right:0;padding-left:15px}.dxp.dxp-nav-group[dir=rtl] .mega-sub-menu{margin-left:0}.dxp.dxp-nav-group[dir=rtl] .mega-menu-nav{padding:25px 25px 25px 0}.dxp.dxp-nav-group[dir=rtl] .carrot-small.down:after,.dxp.dxp-nav-group[dir=rtl] .carrot-small.down:before{right:9px;top:20px}.dxp.dxp-nav-group[dir=rtl] .carrot-small.down:after{right:3px}\@media (min-width:992px){.dxp.dxp-nav-group[dir=rtl] .mega-sub-menu{margin-right:0}.dxp.dxp-nav-group[dir=rtl] dxp-nav-item .dxp-nav-item{border-right-width:0;border-left-width:1px}.dxp.dxp-nav-group[dir=rtl] dxp-nav-item:last-of-type .dxp-nav-item{border-left-width:0}.dxp.dxp-nav-group[dir=rtl] .nav-level-one-link{padding:0 12px}}\@media (min-width:1200px){.dxp.dxp-nav-group[dir=rtl] .icon-container,.dxp.dxp-nav-group[dir=rtl] .mega-menu-content{float:right}}"; },
        enumerable: true,
        configurable: true
    });
    return NavGroup;
}());
export { NavGroup as dxp_nav_group };
