'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const PageHeader = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** More action button list */
        this.appMenuItemsList = [];
        /** More actions items slot */
        this.hasActionItems = false;
        /** App menu available or not */
        this.hasAppMenu = false;
        /** Search box slot */
        this.hasSearchBox = false;
        this.appMenuItemClick = core$1.createEvent(this, "appMenuItemClick", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed after component is loaded */
    componentDidLoad() {
        this.activateLink();
    }
    /** for accessibility implementation */
    handleKeyUp(e) {
        const target = e.target
            ? e.target.activeElement.parentElement
            : e.target;
        const keycode = e.which || e.keyCode;
        const nextEl = target.nextElementSibling;
        const prevEl = target.previousElementSibling;
        /** handle keys */
        if (keycode === 37) {
            /** for left arrow key */
            if (prevEl !== null) {
                prevEl.children[0].focus();
            }
        }
        else if (keycode === 39) {
            /** for right arrow key */
            if (nextEl !== null) {
                nextEl.children[0].focus();
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /**
     * Activate Link based on the URL
     */
    activateLink(clickedLink) {
        if (!this.hasAppMenu) {
            return false;
        }
        const shadowRoot = this.element ? this.element : this.element;
        const appMenuItems = Array.from(shadowRoot.querySelectorAll('.action-menu-item'));
        if (clickedLink) {
            // tslint:disable-next-line: radix
            this.isMenuItemActive = parseInt(clickedLink.getAttribute('link-id'));
            appMenuItems.forEach((sublink) => sublink.classList.remove('active'));
        }
        else {
            if (this.appMenuItemsList && this.appMenuItemsList.length > 0) {
                return this.appMenuItemsList.filter((obj, i) => obj.active ? this.isMenuItemActive = i : obj.active);
            }
        }
        if (this.isMenuItemActive >= 0) {
            appMenuItems[this.isMenuItemActive].classList.add('active');
        }
    }
    /** show active app menu item in button */
    selectedLink(e) {
        this.isAppMenuVisible = false;
        this.activateLink(e.currentTarget);
        this.appMenuItemClick.emit({ element: e.currentTarget });
        core$1.dxp.log.info(this.element.tagName, 'selectedLink()', 'Clicked app menu item: ', e.currentTarget.href.toLowerCase().trim());
    }
    /** App menu visible in mobile or not */
    showResponsiveAppMenu() {
        this.isAppMenuVisible = !this.isAppMenuVisible;
    }
    /** Render the page-header */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-page-header render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-page-header.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "dxp-row page-header-details" }, core$1.h("div", { class: `page-title ${(this.hasActionItems && this.hasSearchBox) ? 'dxp-col-8' : 'dxp-col-9'}` }, core$1.h("h1", { class: "dxp-text-truncate", title: this.pageTitle, innerHTML: this.pageTitle })), (this.hasSearchBox || this.hasActionItems) ?
            core$1.h("div", { class: `action-panel ${(this.hasActionItems && this.hasSearchBox) ? 'dxp-col-4' : 'dxp-col-3'}` }, this.hasSearchBox &&
                (core$1.h("div", { role: "application", class: "dxp-inline-block search-box" }, core$1.h("slot", { name: "searchBox" }))), this.hasActionItems &&
                (core$1.h("div", { role: "application", class: "dxp-inline-block action-items" }, core$1.h("slot", { name: "actionItems" })))) : ''), this.hasAppMenu
            ? core$1.h("div", { class: "dxp-row app-menu" }, core$1.h("div", { class: "dxp-col-12" }, this.appMenuItemsList &&
                this.appMenuItemsList.map((sublinks, i) => i === this.isMenuItemActive &&
                    core$1.h("button", { class: "active-item dxp-hidden-md-up", "aria-expanded": "false", "aria-label": sublinks.text, onClick: () => this.showResponsiveAppMenu() }, core$1.h("span", { innerHTML: sublinks.text }), core$1.h("i", { class: "icon-sprite arrow-down-xs-o" }))), core$1.h("ul", { class: `${this.isAppMenuVisible ? 'dxp-block' : ''}` }, this.appMenuItemsList &&
                this.appMenuItemsList.map((sublinks, i) => core$1.h("li", { class: i === this.isMenuItemActive ? 'dxp-hidden-sm-down' : '' }, core$1.h("a", { "link-id": i, href: sublinks.href, target: sublinks.openInNewTab ? '_blank' : '_self', class: `action-menu-item ${i === this.isMenuItemActive ? 'active' : ''}`, onClick: e => this.selectedLink(e), title: sublinks.text, innerHTML: sublinks.text })))), core$1.h("slot", null)))
            : ''));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-page-header .page-header-details{height:4rem}div.dxp.dxp-page-header .page-header-details .page-title h1{vertical-align:middle;margin:0;padding-top:1.188rem}div.dxp.dxp-page-header .page-header-details .action-panel{text-align:left}\@media (min-width:768px){div.dxp.dxp-page-header .page-header-details .action-panel{text-align:right}}div.dxp.dxp-page-header .page-header-details .action-panel .action-items{float:right}\@media (min-width:768px){div.dxp.dxp-page-header .page-header-details .action-panel .action-items{float:none}}\@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){div.dxp.dxp-page-header .page-header-details{height:4rem}div.dxp.dxp-page-header .page-header-details .page-title h1{padding-top:1.438rem}}div.dxp.dxp-page-header .app-menu .active-item{cursor:pointer;background:transparent;border:none;margin:.625rem 0;border-radius:0;position:relative}div.dxp.dxp-page-header .app-menu .active-item i{vertical-align:middle;margin-left:.5rem}div.dxp.dxp-page-header .app-menu ul{margin:0;display:none;margin-bottom:15px}div.dxp.dxp-page-header .app-menu ul li{display:block;padding:.3125rem 0}div.dxp.dxp-page-header .app-menu ul li a{border-bottom:1px solid transparent}\@media (min-width:768px){div.dxp.dxp-page-header .app-menu ul{display:block;margin:0}div.dxp.dxp-page-header .app-menu ul li{padding:0;display:inline-block}div.dxp.dxp-page-header .app-menu ul li+li{margin-left:2rem}div.dxp.dxp-page-header .app-menu ul li a{display:inline-block;padding:.4375rem 0 .375rem;border-bottom:3px solid transparent}}div.dxp.dxp-page-header[dir=rtl] .action-panel{text-align:right}\@media (min-width:768px){div.dxp.dxp-page-header[dir=rtl] .action-panel{text-align:left}}div.dxp.dxp-page-header[dir=rtl] .action-panel .action-items{float:left}\@media (min-width:768px){div.dxp.dxp-page-header[dir=rtl] .action-panel .action-items{float:none}}div.dxp.dxp-page-header[dir=rtl] .app-menu .active-item i{margin-left:0;margin-right:.5rem}\@media (min-width:768px){div.dxp.dxp-page-header[dir=rtl] .app-menu ul li+li{margin-left:0;margin-right:2rem}}"; }
};

exports.dxp_page_header = PageHeader;
