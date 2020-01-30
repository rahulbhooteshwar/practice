'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-cb9d4a75.js');

const SIDEBAR_MENU_GROUP = 'dxp-sidebar-menu-group';
const SIDEBAR_EXPANDED = 'sidebar-expanded';
const SIDEBAR_COLLAPSED = 'sidebar-collapsed';
const SidebarMenu = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** To display collapse in header/footer */
        this.expandCollapseIconPosition = 'footer';
        this.collapsed = core$1.createEvent(this, "collapsed", 7);
        this.expanded = core$1.createEvent(this, "expanded", 7);
    }
    /** Listener that looks for menu items object to be assigned/changed externally */
    menuChangeHandler() {
        this.base.createNestedMarkup(this.menuContainer, SIDEBAR_MENU_GROUP, this.menuItems);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'SidebarMenu', messages.messages);
        if (this.expandOnHover) {
            this.showExpanded = false;
        }
    }
    /** actions to be performed after component loaded */
    async componentDidLoad() {
        this.menuChangeHandler();
        if (!this.showExpanded) {
            await this.collapse();
        }
        else {
            await this.expand();
        }
    }
    /** Listener for action to perform for keyup event */
    async handleKeyEvents(event) {
        const keys = [32, 37, 38, 39, 40];
        const eventKey = event.key || event.keyCode;
        const target = event.target ? event.composedPath()[0] : event.target;
        // collapse/expand sidebar menu panel
        if (target.classList.contains('collapse-icon')) {
            if ((eventKey === 32 || eventKey === 13)) {
                await this.collapseExpandSidebar();
            }
        }
        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
        this.preventDefaultAction(event, keys);
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** function to collapse sidebar */
    async collapse() {
        const parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
        parentContainer.classList.add(SIDEBAR_COLLAPSED);
        parentContainer.classList.remove(SIDEBAR_EXPANDED);
        this.setAndCollapse(true);
        this.collapsed.emit({ action: 'collapsed' });
    }
    /** To collapse/expand sidebar menu panel */
    async collapseExpandSidebar() {
        const parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
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
    }
    /**  function to expnd sidebar */
    async expand() {
        const parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
        parentContainer.classList.add(SIDEBAR_EXPANDED);
        parentContainer.classList.remove(SIDEBAR_COLLAPSED);
        this.setAndCollapse(false);
        this.expanded.emit({ action: 'expanded' });
    }
    /** to return all sidebar menu group elements */
    getAllMenuGroupElements() {
        const menuGroups = this.base.shadowRootQuerySelector(this.element, SIDEBAR_MENU_GROUP, true);
        return menuGroups && menuGroups.length > 0 ? menuGroups : this.element.querySelectorAll(SIDEBAR_MENU_GROUP);
    }
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event, keys) {
        const eventKey = event.key || event.keyCode;
        if (keys.indexOf(eventKey) > -1) {
            event.preventDefault();
        }
    }
    /** collapsing all opened sidebar menu groups on collapse/expand of sidebar menu panel */
    setAndCollapse(shouldShowView) {
        const elem = this.getAllMenuGroupElements();
        for (const i of Object.keys(elem)) {
            elem[i].viewPopup = shouldShowView;
            this.showExpanded = shouldShowView;
            elem[i].collapse();
        }
    }
    /** Render the sidebar-menu */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-sidebar-menu render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sidebar-menu.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("nav", { class: `${this.expandCollapseIconPosition === 'footer' ? 'column-reverse' : ''}`, role: "navigation" }, !this.expandOnHover && this.showExpandCollapseIcon && core$1.h("div", { class: "expand-collapse-icon" }, core$1.h("a", { class: "collapse-nav" }, core$1.h("span", { tabindex: "0", class: "collapse-icon tooltip-on-hover", onClick: async () => { await this.collapseExpandSidebar(); } }, core$1.h("span", { class: "tooltip" }, core$1.h("span", { class: "caret-icon" }), core$1.h("div", { class: "sub-menu-wrapper" }, core$1.h("span", { class: "dxp-flex icon-heading" }, this.showExpanded ? core$1.dxp.i18n.t('SidebarMenu:expandTxt') : core$1.dxp.i18n.t('SidebarMenu:collapseTxt'))))))), core$1.h("div", { class: "menu-wrapper" }, core$1.h("header", { class: 'header-order-one' }, core$1.h("slot", { name: "header" })), core$1.h("div", { class: "sidebar", onMouseEnter: () => this.expandOnHover && this.expand(), onMouseLeave: () => this.expandOnHover && this.collapse() }, core$1.h("div", { class: "nav nav-sidebar", ref: el => this.menuContainer = el }, core$1.h("slot", null)))))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "menuItems": ["menuChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-sidebar-menu{height:100%;position:-webkit-sticky;position:sticky;z-index:99}div.dxp.dxp-sidebar-menu .column-reverse{display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse}div.dxp.dxp-sidebar-menu nav{position:-webkit-sticky;position:sticky;display:-ms-flexbox;display:flex;height:100%;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-sidebar-menu nav .menu-wrapper{-ms-flex:1 1 auto;flex:1 1 auto}div.dxp.dxp-sidebar-menu nav .header-order-one{-ms-flex-order:1;order:1}div.dxp.dxp-sidebar-menu nav .default-header-order{-ms-flex-order:0;order:0}div.dxp.dxp-sidebar-menu nav .tooltip{display:none;left:100%;position:absolute;display:inline-block;padding-left:1rem;-webkit-transition:all .2s ease-in;transition:all .2s ease-in;opacity:0}div.dxp.dxp-sidebar-menu nav .tooltip .caret-icon{position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);padding-left:.7rem}div.dxp.dxp-sidebar-menu nav .tooltip .sub-menu-wrapper{padding:.3rem .5rem;display:inline-block;min-width:4rem}div.dxp.dxp-sidebar-menu nav .tooltip .sub-menu-wrapper .icon-heading{-ms-flex-pack:center;justify-content:center}div.dxp.dxp-sidebar-menu header{padding:.7rem}div.dxp.dxp-sidebar-menu .tooltip-on-hover{position:relative}div.dxp.dxp-sidebar-menu .tooltip-on-hover:hover .tooltip{display:-ms-flexbox;display:flex;opacity:1}div.dxp.dxp-sidebar-menu .sidebar{-ms-flex:1 1 auto;flex:1 1 auto;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-sidebar-menu .nav-sidebar{-ms-flex:1 1 auto;flex:1 1 auto;list-style-type:none;margin:0;padding:0}div.dxp.dxp-sidebar-menu .sidebar-collapsed{min-width:4rem;display:-ms-inline-flexbox;display:inline-flex;-webkit-transition:.24s;transition:.24s}div.dxp.dxp-sidebar-menu .sidebar-expanded{min-width:16.25rem;display:-ms-inline-flexbox;display:inline-flex;-webkit-transition:.24s;transition:.24s;width:260px}div.dxp.dxp-sidebar-menu .collapse-nav{display:-ms-flexbox;display:flex;padding:.32rem 1rem;-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-sidebar-menu .collapse-icon{display:inline-block;width:1.5rem;height:1.5rem;border-radius:.18rem}"; }
};

exports.dxp_sidebar_menu = SidebarMenu;
