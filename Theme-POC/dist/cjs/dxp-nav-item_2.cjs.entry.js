'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-8de93c7c.js');

const NavItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** Is nested menu items */
        this.isNestedMenu = false;
    }
    /** Actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'GroupNav', messages.messages);
        this.utility = new messages.CommonUtility();
    }
    /** Actions to perform after component load */
    componentDidLoad() {
        // get parent menu element
        const navGroup = this.element.closest('dxp-nav-group');
        const subNavItems = this.element.querySelectorAll('.mega-sub-menu-link');
        const links = this.element.querySelectorAll('a');
        // Update prop value as true of 'dxp-nav-group' element
        this.utility.parentMenuItem(navGroup);
        // Add the active class to Main menu & Sub menu link of current web page
        this.utility.currentPageMenuLink(links);
        // Set the position of level-3 menu-items and the number of menu items of accessibility compliance
        // Work for nested element implementation
        this.utility.setPosNSize(subNavItems);
    }
    /** Actions to perform after component update */
    componentDidUpdate() {
        const subNavItems = this.element.querySelectorAll('.mega-sub-menu-link');
        // Set the position of level-3 menu-items and the number of menu items of accessibility compliance
        // Work for Script JSON or service API
        this.utility.setPosNSize(subNavItems);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
        this.clickHandler();
    }
    /** will remove is-active attribute on click and will add active link function */
    clickHandler() {
        // remove active from all links
        const links = Array.from(this.element.closest('nav').querySelectorAll('a'));
        links.forEach(e => e.classList.remove('active'));
        // add active to current root link
        const parentNavGroup = this.element.closest('dxp-nav-group');
        parentNavGroup.removeAttribute('is-active');
        parentNavGroup.querySelector('.nav-level-one-link').classList.add('active');
        // add active to current link
        this.element.querySelector('.mega-menu-link').classList.add('active');
    }
    /** Render nested menu */
    renderNestedMenu() {
        return ([
            core$1.h("button", { "aria-label": core$1.dxp.i18n.t('GroupNav:ariaMenuText'), role: "button", class: "caret carrot-small" }),
            core$1.h("ul", { class: "mega-sub-menu", role: "none" }, core$1.h("li", { class: "dxp-hidden-lg-up overview-link", role: "none" }, core$1.h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, "aria-haspopup": this.isNestedMenu && 'true', role: "menuitem", class: "mega-sub-menu-link", href: this.menuRouteLink }, this.navigationTitle)), core$1.h("ul", null, core$1.h("li", null, this.child
                ? this.child.map(childItem => core$1.h("dxp-nav-sub-item", { "link-title": childItem['linkTitle'], "navigation-title": childItem['navigationTitle'], "menu-route-link": childItem['menuRouteLink'], "accessibility-text": childItem['accessibilityText'] }))
                : core$1.h("slot", null))))
        ]);
    }
    /** Render the GroupNav */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-item render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass() }, core$1.h("div", { class: "icon-container dxp-hidden-md-down" }, this.src ?
            core$1.h("img", { alt: this.altText ? this.altText : this.src, src: this.src, class: "mega-menu-icon" }) : false), core$1.h("div", { class: "mega-menu-content" }, core$1.h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, "aria-haspopup": this.isNestedMenu && 'true', role: "menuitem", class: "mega-menu-link", href: this.menuRouteLink }, this.navigationTitle), (this.isNestedMenu || (this.child && this.child.length)) &&
            this.renderNestedMenu())));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return ".dxp.dxp-nav-item .mega-menu-content{width:100%;position:relative}\@media (min-width:992px){.dxp.dxp-nav-item .icon-container{width:33.33333%}}\@media (min-width:1200px){.dxp.dxp-nav-item .icon-container{padding-right:12px;padding-left:12px;min-width:95px;max-width:95px;min-height:1px;float:left}.dxp.dxp-nav-item .mega-menu-content{width:66.66667%;padding-left:0;float:left}}"; }
};

const NavSubItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'GroupNav', messages.messages);
        this.utility = new messages.CommonUtility();
    }
    /** actions to perform after component load */
    componentDidLoad() {
        // get parent menu element
        const navItem = this.element.closest('dxp-nav-item');
        const links = this.element.querySelectorAll('a');
        // Update prop value as true of 'dxp-nav-item' element
        this.utility.parentMenuItem(navItem);
        this.utility.currentPageMenuLink(links);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
        this.clickHandler();
    }
    /** will remove is-active attribute on click and will add active link function */
    clickHandler() {
        // remove active from all links
        const links = Array.from(this.element.closest('nav').querySelectorAll('a'));
        links.forEach(e => e.classList.remove('active'));
        // add active to current root link
        const parentNavGroup = this.element.closest('dxp-nav-group');
        parentNavGroup.removeAttribute('is-active');
        parentNavGroup.querySelector('.nav-level-one-link').classList.add('active');
        // add active to current link
        this.element.querySelector('.mega-sub-menu-link').classList.add('active');
    }
    /** Render the GroupNav */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-sub-item render() : ${"DEVELOPMENT"}`);
        return (core$1.h("li", { role: "none" }, core$1.h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, role: "menuitem", class: "mega-sub-menu-link", href: this.menuRouteLink }, this.navigationTitle)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return ".dxp.dxp-nav-sub-item{background:transparent}\@media (min-width:1200px){.dxp.dxp-nav-sub-item .dxp-col-lg-4{padding-left:24px}}\@media (min-width:1200px){.dxp.dxp-nav-sub-item [dir=rtl] .dxp-col-lg-4{padding-right:24px;padding-left:0}}"; }
};

exports.dxp_nav_item = NavItem;
exports.dxp_nav_sub_item = NavSubItem;
