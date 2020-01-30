'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const HAMBURGER_CLASS = '.hamburger';
const MARGIN_RIGHT = 'margin-right-auto';
const MARGIN_LEFT = 'margin-left-auto';
const NAVIGATION = 'dxp-navigation';
const HAMBURGER_BTN = 'hamburger-btn';
const Header = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        core$1.dxp.log.debug(this.element.tagName, 'componentWillLoad()', `dxp-header - componentWillLoad`);
        this.isLogoPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="logo"]'));
        this.isNavigationPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="navigation"]'));
        this.isLanguageSelectorPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="languageSelector"]'));
        this.isSearchPresent = this.base.returnBooleanValue(this.element.querySelector('[slot="search"]'));
        this.headerCTAMenu = this.base.returnBooleanValue(this.element.querySelector('[slot="headerCTAMenuWithDropdown"]'));
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        core$1.dxp.log.debug(this.element.tagName, 'componentDidLoad()', `dxp-header - componentDidLoad`);
        if (!this.isNavigationPresent) {
            if (this.element && this.element.querySelector(HAMBURGER_CLASS)) {
                this.element.querySelector(HAMBURGER_CLASS).classList.add('dxp-none');
            }
        }
    }
    /** actions to be performed prior to component is updated */
    componentWillUpdate() {
        core$1.dxp.log.debug(this.element.tagName, 'componentWillUpdate()', `dxp-header - componentWillUpdate`);
    }
    /** actions to be performed after component is updated */
    componentDidUpdate() {
        core$1.dxp.log.debug(this.element.tagName, 'componentDidUpdate()', `dxp-header - componentDidUpdate`);
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
        core$1.dxp.log.debug(this.element.tagName, 'componentDidUnload()', `dxp-header - componentDidUnload`);
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
        core$1.dxp.log.debug(this.element.tagName, 'hostData()', `dxp-header -hostData`);
        return {
            'class': 'hydrated'
        };
    }
    /** Render the header */
    __stencil_render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `dxp-header - render`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })]
        ];
        return (core$1.h("header", { class: `header-primary ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "header" }, this.isLogoPresent &&
            (core$1.h("div", { ref: el => this.headerContainer = el, role: "application", class: "logo-container" }, core$1.h("slot", { name: "logo" }))), core$1.h("div", { class: "navigation-right dxp-flex" }, this.isNavigationPresent &&
            (core$1.h("div", { class: "hamburger" }, core$1.h("button", { "aria-label": core$1.dxp.i18n.t('Navigation:closeIconTitle'), role: "button", id: "hamburger-btn", class: "hamburger-btn" }, core$1.dxp.i18n.t('Navigation:closeIconTitle')))), this.isNavigationPresent &&
            (core$1.h("div", { ref: el => this.headerContainer = el, role: "application", class: "nav-container" }, core$1.h("slot", { name: "navigation" }))), this.isSearchPresent &&
            (core$1.h("div", { ref: el => this.headerContainer = el, role: "application", class: "search-container" }, core$1.h("slot", { name: "search" }))), this.isLanguageSelectorPresent &&
            (core$1.h("div", { ref: el => this.headerContainer = el, role: "application", class: "language-container" }, core$1.h("slot", { name: "languageSelector" }))), this.headerCTAMenu &&
            (core$1.h("div", { ref: el => this.headerContainer = el, role: "application", class: "header-cta-menu-container" }, core$1.h("slot", { name: "headerCTAMenuWithDropdown" })))))));
    }
    get element() { return core$1.getElement(this); }
    render() { return core$1.h(core$1.Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ".dxp.dxp-header .header{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;z-index:998}.dxp.dxp-header .header .logo-container{width:auto;max-width:200px;-ms-flex-align:center;align-items:center}.dxp.dxp-header .header .language-container{display:-ms-flexbox;display:flex;height:100%;margin-right:0}.dxp.dxp-header .header .navigation-right{display:-ms-flexbox;display:flex}.dxp.dxp-header .header .hamburger{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;z-index:99;height:56px;-ms-flex-order:2;order:2;overflow:hidden}.dxp.dxp-header .header .hamburger,.dxp.dxp-header .header .hamburger button{cursor:pointer}.dxp.dxp-header .header .hamburger-btn{border:0;outline:0;border-top:1.5px solid;height:20px;width:28px;background:transparent;display:block;position:relative;z-index:99;overflow:hidden;text-indent:-999px;border-radius:0}.dxp.dxp-header .header .hamburger-btn:after,.dxp.dxp-header .header .hamburger-btn:before{content:\"\";display:block;border-bottom:1.5px solid;height:0;width:100%;position:absolute;top:7.5px}.dxp.dxp-header .header .hamburger-btn:after{top:16.5px}.dxp.dxp-header .header .hamburger-btn:focus{outline:0}.dxp.dxp-header .header .nav-close{border:0;outline:0;height:29px;width:29px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);background:transparent;display:block;position:relative;z-index:99;overflow:hidden;text-indent:-999px}.dxp.dxp-header .header .nav-close:after,.dxp.dxp-header .header .nav-close:before{content:\"\";display:block;border-bottom:2px solid;height:0;width:100%;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.dxp.dxp-header .header .nav-close:after{width:0;height:100%;border-bottom:0;border-left:2px solid}.dxp.dxp-header .header .nav-close:focus{outline:0}.dxp.dxp-header .header .hamburger-btn:focus,.dxp.dxp-header .header .nav-close:focus{outline-offset:.25rem;outline:.25rem auto -webkit-focus-ring-color}.dxp.dxp-header .header .logo-container{width:100%;display:-ms-flexbox;display:flex}.dxp.dxp-header .search-container{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding:0;height:56px;-ms-flex-order:1;order:1;margin-left:0;margin-right:.75rem}.dxp.dxp-header .search-container+.language-container{margin-left:auto}.dxp.dxp-header .nav-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-order:1;order:1;margin-right:0;padding:0;width:100%;position:absolute;top:100%;right:0}\@media (min-width:576px){.dxp.dxp-header .nav-container{width:66.66%}}\@media (min-width:768px){.dxp.dxp-header .nav-container{width:50%}}\@media (min-width:992px){.dxp.dxp-header .header{height:56px}.dxp.dxp-header .header .hamburger{display:none}.dxp.dxp-header .header .nav-container{-ms-flex-direction:row;flex-direction:row;margin:0;margin-left:0;padding:0;position:static;-ms-flex-order:0;order:0;height:auto;width:auto;overflow:hidden}.dxp.dxp-header .header .logo-container{width:auto}.dxp.dxp-header .header .logo-container+.nav-container{margin-left:20px}.dxp.dxp-header .header .language-container{margin-left:auto}.dxp.dxp-header .header .search-container{margin-top:0;height:56px;-ms-flex-order:inherit;order:inherit;margin-left:auto}.dxp.dxp-header .header .search-container+.language-container{margin-left:15px}}\@media (max-width:991px){.dxp.dxp-header .margin-left-auto{margin-left:auto}}\@media (min-width:1200px){.dxp.dxp-header .logo-container+.nav-container{margin-left:26px}}.dxp.dxp-header[dir=rtl] .hamburger{-ms-flex-order:1;order:1}.dxp.dxp-header[dir=rtl] .search-container+.language-container{margin-left:0;margin-right:auto}\@media (min-width:992px){.dxp.dxp-header[dir=rtl] .header .language-container{margin-left:0;margin-right:auto}.dxp.dxp-header[dir=rtl] .header .nav-container{margin-right:0}.dxp.dxp-header[dir=rtl] .header .logo-container+.nav-container{margin-left:auto;margin-right:15px}.dxp.dxp-header[dir=rtl] .header .search-container{margin-left:unset;margin-right:auto}.dxp.dxp-header[dir=rtl] .header .search-container+.language-container{margin-right:5px;margin-left:0}}\@media (max-width:991px){.dxp.dxp-header[dir=rtl] .margin-right-auto{margin-right:auto}.dxp.dxp-header[dir=rtl] .nav-container{right:auto;left:0}}"; }
};

exports.dxp_header = Header;
