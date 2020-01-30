import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
const HAMBURGER_CLASS = '.hamburger';
const MARGIN_RIGHT = 'margin-right-auto';
const MARGIN_LEFT = 'margin-left-auto';
const NAVIGATION = 'dxp-navigation';
const HAMBURGER_BTN = 'hamburger-btn';
/** dxp-header */
export class Header {
    constructor() {
        /** headerCTAMenu : this will be used to make a menu link and a dropdown over any supporting SPA (MCC specific) can be handled via SPA using JS and CSS */
        this.headerCTAMenu = false;
        /** isLanguageSelectorPresent Present */
        this.isLanguageSelectorPresent = false;
        /** isLogo Present */
        this.isLogoPresent = false;
        /** isNavigationPresent Present */
        this.isNavigationPresent = false;
        /** isSearchPresent Present */
        this.isSearchPresent = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        dxp.log.debug(this.element.tagName, 'componentWillLoad()', `dxp-header - componentWillLoad`);
        this.isLogoPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="logo"]'));
        this.isNavigationPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="navigation"]'));
        this.isLanguageSelectorPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="languageSelector"]'));
        this.isSearchPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="search"]'));
        this.headerCTAMenu = this.base.returnBooleanValue(this.element.querySelector('[slot="headerCTAMenuWithDropdown"]'));
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        dxp.log.debug(this.element.tagName, 'componentDidLoad()', `dxp-header - componentDidLoad`);
        if (!this.isNavigationPresent) {
            if (this.element && this.element.querySelector(HAMBURGER_CLASS)) {
                this.element.querySelector(HAMBURGER_CLASS).classList.add('dxp-none');
            }
        }
    }
    /** actions to be performed prior to component is updated */
    componentWillUpdate() {
        dxp.log.debug(this.element.tagName, 'componentWillUpdate()', `dxp-header - componentWillUpdate`);
    }
    /** actions to be performed after component is updated */
    componentDidUpdate() {
        dxp.log.debug(this.element.tagName, 'componentDidUpdate()', `dxp-header - componentDidUpdate`);
        // Add classes to components when logo is not present
        if (!this.isLogoPresent) {
            const langugeSelectorContainer = this.element ? this.element.querySelector('.language-container') : this.element.querySelector('.language-container');
            const navContainer = this.element ? this.element.querySelector(HAMBURGER_CLASS) : this.element.querySelector(HAMBURGER_CLASS);
            const searchContainer = this.element ? this.element.querySelector('.search-container') : this.element.querySelector('.search-container');
            if (this.dir.toUpperCase() === 'RTL') {
                this.handleRtl(langugeSelectorContainer, navContainer, searchContainer);
            }
            else {
                this.handleLtr(langugeSelectorContainer, navContainer, searchContainer);
            }
        }
    }
    /** actions to be performed after component is unloaded */
    componentDidUnload() {
        dxp.log.debug(this.element.tagName, 'componentDidUnload()', `dxp-header - componentDidUnload`);
    }
    /** Click events */
    handleClickEvent(e) {
        this.base.routingEventListener(e);
        if (this.element.querySelector(NAVIGATION)) {
            const dxpNavigation = this.element.querySelector(NAVIGATION);
            const nav = this.element.querySelector(NAVIGATION) ? dxpNavigation.querySelector('.nav-primary') : this.element.querySelector('.nav-primary');
            const target = e.target ? e.composedPath()[0] : e.target;
            const expandedItems = document.querySelectorAll('.down');
            const hamburger = target.id ? target.id === HAMBURGER_BTN : undefined;
            const isClose = target.classList ? target.classList.contains('nav-close') : undefined;
            // Expand/Collapse navigation in mobile with hamburger button
            this.showHideNav(hamburger, isClose, nav, target, expandedItems);
        }
    }
    /** Document click event handler */
    handleDocumentClick(e) {
        if (this.element.querySelector(NAVIGATION)) {
            const target = e.target ? e.composedPath()[0] : e.target;
            const nav = this.element.querySelector(NAVIGATION).querySelector('.dxp-navigation') ?
                this.element.querySelector(NAVIGATION).querySelector('.dxp-navigation')
                :
                    this.element.querySelector('dxp-navigation .dxp-navigation');
            const hamburger = this.element ? this.element.querySelector('#hamburger-btn') : this.element.querySelector('#hamburger-btn');
            const expandedItems = this.element.querySelectorAll('.down') ? this.element.querySelectorAll('.down') : this.element.querySelectorAll('.down');
            const dxpNav = e.target.closest(NAVIGATION);
            // Collapse expanded menu item on click in web page anywhere
            if (target.id !== HAMBURGER_BTN && !dxpNav) {
                this.hideNav(nav, hamburger, expandedItems);
            }
        }
    }
    /** On navigation mouse hover close opened component */
    async hoverEvent(e) {
        const isNavigationClick = e.target.closest(NAVIGATION);
        if (isNavigationClick) {
            const dxpSearch = this.element.querySelector('dxp-search');
            if (dxpSearch) {
                await dxpSearch.closeSearchBox();
            }
        }
    }
    /** Collapse all level menu items */
    collapseAllMenus(expandedItems) {
        for (const i of Object.keys(expandedItems)) {
            // Prevent the set time out execution
            clearTimeout(this.clearSetTimeout);
            expandedItems[i].classList.remove('down');
            expandedItems[i].previousElementSibling.classList.remove('active-link');
            expandedItems[i].nextElementSibling.classList.remove('in');
            expandedItems[i].nextElementSibling.classList.remove('max-height-none');
        }
    }
    /** Collapse expanded menu item on click in web page anywhere */
    collapseExpandedNav(dxpNav, ariaExpanded, expandedMenus) {
        if (!dxpNav && expandedMenus) {
            ariaExpanded.setAttribute('aria-expanded', 'false');
            expandedMenus.classList.remove('dxp-block');
        }
    }
    /** to handle LTR for components */
    handleLtr(langugeSelectorContainer, navContainer, searchContainer) {
        // If language selector component
        if (this.isLanguageSelectorPresent) {
            langugeSelectorContainer.classList.add(MARGIN_LEFT);
        }
        else if (this.isNavigationPresent && this.isSearchPresent) {
            // Navigation and not Language component
            searchContainer.classList.add(MARGIN_LEFT);
        }
        else if (this.isNavigationPresent && !this.isLanguageSelectorPresent && !this.isSearchPresent) {
            // Navigation and not Language component
            navContainer.classList.add(MARGIN_LEFT);
        }
        else if (this.isSearchPresent) {
            // only  search component
            searchContainer.classList.add(MARGIN_LEFT);
        }
    }
    /** to handle RTL for components */
    handleRtl(langugeSelectorContainer, navContainer, searchContainer) {
        // If language selector component
        if (this.isLanguageSelectorPresent) {
            langugeSelectorContainer.classList.add(MARGIN_RIGHT);
        }
        else if (this.isNavigationPresent) {
            // Navigation and not Language component
            navContainer.classList.add(MARGIN_RIGHT);
        }
        else if (this.isSearchPresent) {
            // only  search component
            searchContainer.classList.add(MARGIN_RIGHT);
        }
    }
    /** Hide entire navigation in mobile with hamburger (close button) */
    hideNav(nav, target, expandedItems) {
        const overlay = document.querySelector('.nav-overlay');
        nav.classList.remove('nav-height');
        nav.classList.remove('overflow-y-auto');
        target.classList.remove('nav-close');
        target.classList.add(HAMBURGER_BTN);
        // Collapse all expanded menu items
        this.collapseAllMenus(expandedItems);
        // Remove navigation overlay background
        if (overlay) {
            setTimeout(() => {
                overlay.remove();
            }, 200);
        }
    }
    /** Expand/Collapse navigation in mobile with hamburger button */
    showHideNav(hamburger, isClose, nav, target, expandedItems) {
        if (target && hamburger) {
            // Expand navigation vertically
            if (!isClose) {
                let navOverlay;
                nav.classList.add('nav-height');
                target.classList.remove(HAMBURGER_BTN);
                target.classList.add('nav-close');
                target.classList.add('sc-dxp-navigation');
                navOverlay = document.createElement('div');
                navOverlay.className = 'nav-overlay dxp-hidden-lg-up';
                navOverlay.style.cssText = 'display: block; background: #141413;position: fixed;top: 0;left: 0;right: 0;bottom: 0;';
                this.element.parentElement.appendChild(navOverlay);
                this.clearSetTimeout = setTimeout(() => {
                    nav.classList.add('overflow-y-auto');
                }, 600);
            }
            else {
                this.hideNav(nav, target, expandedItems);
            }
        }
    }
    /** actions to be performed after render method is called */
    hostData() {
        dxp.log.debug(this.element.tagName, 'hostData()', `dxp-header -hostData`);
        return {
            'class': 'hydrated'
        };
    }
    /** Render the header */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `dxp-header - render`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("header", { class: `header-primary ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "header" },
                this.isLogoPresent &&
                    (h("div", { ref: el => this.headerContainer = el, role: "application", class: "logo-container" },
                        h("slot", { name: "logo" }))),
                h("div", { class: "navigation-right dxp-flex" },
                    this.isNavigationPresent &&
                        (h("div", { class: "hamburger" },
                            h("button", { "aria-label": dxp.i18n.t('Navigation:closeIconTitle'), role: "button", id: "hamburger-btn", class: "hamburger-btn" }, dxp.i18n.t('Navigation:closeIconTitle')))),
                    this.isNavigationPresent &&
                        (h("div", { ref: el => this.headerContainer = el, role: "application", class: "nav-container" },
                            h("slot", { name: "navigation" }))),
                    this.isSearchPresent &&
                        (h("div", { ref: el => this.headerContainer = el, role: "application", class: "search-container" },
                            h("slot", { name: "search" }))),
                    this.isLanguageSelectorPresent &&
                        (h("div", { ref: el => this.headerContainer = el, role: "application", class: "language-container" },
                            h("slot", { name: "languageSelector" }))),
                    this.headerCTAMenu &&
                        (h("div", { ref: el => this.headerContainer = el, role: "application", class: "header-cta-menu-container" },
                            h("slot", { name: "headerCTAMenuWithDropdown" })))))));
    }
    static get is() { return "dxp-header"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-header.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-header.css"]
    }; }
    static get properties() { return {
        "containerFluid": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Enable disable out of the box padding & margin around component"
            },
            "attribute": "container-fluid",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "headerCTAMenu": {},
        "isLanguageSelectorPresent": {},
        "isLogoPresent": {},
        "isNavigationPresent": {},
        "isSearchPresent": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClickEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "handleDocumentClick",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "mouseover",
            "method": "hoverEvent",
            "target": "document",
            "capture": false,
            "passive": true
        }]; }
}
