'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        hamburger: 'Open menu',
        closeMenu: 'Collapse menu'
    },
    'en-US': {
        hamburger: 'Open menu',
        closeMenu: 'Collapse menu'
    },
    'es': {
        hamburger: 'Open menu',
        closeMenu: 'Collapse menu'
    },
    'es-ES': {
        hamburger: 'Open menu',
        closeMenu: 'Collapse menu'
    }
};

const HeaderRich = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** background color on active header */
        this.isHeaderActive = false;
        /** isLogo Present */
        this.isLogoPresent = false;
        /** Is Nav present */
        this.isNavPresent = false;
        /** Search present */
        this.isNavSearch = false;
        /** Change the I18 message as per menu state (Expand/Collapse) */
        this.menuState = core$1.dxp.i18n.t('HeaderRich:hamburger');
        /** window scroll initial value */
        this.windowScrollBefore = 0;
        /** Prop to display header background either transparent or solid */
        this.backgroundType = 'transparent';
        /** Prop to display fixed header */
        this.isHeaderSticky = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'HeaderRich', messages);
        this.isLogoPresent = this.base.returnBooleanValue(this.element && this.element.querySelector('[slot="logo"]'));
        this.isNavPresent = this.base.returnBooleanValue(this.element && this.element.querySelector('[slot="nav"]'));
        this.isNavSearch = this.base.returnBooleanValue(this.element && this.element.querySelector('[slot="search"]'));
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        this.body = this.element.closest('body');
        if (this.isLogoPresent) {
            const dxpLogo = this.element.querySelector('dxp-logo');
            if (dxpLogo) {
                const dxplogo = dxpLogo ? dxpLogo.querySelector('.dxp-logo') : dxpLogo.querySelector('.dxp-logo');
                dxplogo.style.background = 'none';
            }
        }
        if (this.isNavSearch) {
            this.alignNavSearch();
        }
    }
    /**  click listener for routing events on anchor tag  */
    clickEventHandler(event) {
        const target = event.target ? event.composedPath()[0] : event.target;
        const dxpSearch = this.element.querySelector('dxp-search');
        const navSearchContainer = this.element ? this.element.querySelector('.nav-search-container') : this.element.querySelector('.nav-search-container');
        const header = this.element ? this.element.querySelector('header') : this.element.querySelector('header');
        const searchWrapper = this.element ? this.element.querySelector('.search-wapper') : this.element.querySelector('.search-wapper');
        const classListItems = target.classList;
        const dxpCTAListItems = Array.from(this.element.querySelectorAll('dxp-cta-list'));
        let searchContainer;
        let searchIcon;
        let searchWrapperCloseIcon;
        if (dxpSearch) {
            searchContainer = dxpSearch ? dxpSearch.querySelector('.search-container') : dxpSearch.querySelector('.search-container');
            searchIcon = dxpSearch ? dxpSearch.querySelector('.search-icon') : dxpSearch.querySelector('.search-icon');
            searchWrapperCloseIcon = dxpSearch ? dxpSearch.querySelector('.search-wrapper-close-icon') : dxpSearch.querySelector('.search-wrapper-close-icon');
        }
        const elementClassList = ['overlay', 'sub-nav-child-container', 'dxp-icon-close', 'search-wrapper-close-icon'];
        switch (true) {
            case classListItems.contains('nav-item'):
                if ((this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg') && target && target.parentElement.classList.contains('in')) {
                    this.isHeaderActive = false;
                    this.body.style.overflow = 'inherit';
                    if (core$1.dxp.is.ipad()) {
                        this.body.style.position = 'relative';
                    }
                }
                else {
                    this.isHeaderActive = true;
                    this.body.style.overflow = 'hidden';
                    if (core$1.dxp.is.ipad()) {
                        this.body.style.position = 'fixed';
                    }
                }
                break;
            case (elementClassList.some(r => classListItems.contains(r))):
                const parentElement = target.parentElement;
                const searchBoxOuterContainer = parentElement.classList.contains('search-box-outer-container');
                const isDXPSearch = (parentElement.classList.contains('dxp-search') || searchBoxOuterContainer);
                // closed search box container only on click close icon
                if (!isDXPSearch || (!searchBoxOuterContainer && classListItems.contains('dxp-icon-close') || classListItems.contains('search-wrapper-close-icon'))) {
                    this.deactivateheader();
                }
                break;
            case classListItems.contains('dxp-icon-search'):
                // Prevent web page form scrolling while overlay is visible
                this.body.style.overflow = 'hidden';
                if (core$1.dxp.is.ipad()) {
                    this.body.style.position = 'fixed';
                }
                this.isHeaderActive = true; // active header on click on search icon
                /** show overlay block on click on search icon */
                if (searchContainer) {
                    const overlayBlock = searchContainer.querySelector('.overlay');
                    overlayBlock.classList.remove('dxp-none');
                    overlayBlock.classList.add('dxp-block');
                }
                break;
            case (classListItems.contains('open') && classListItems.contains('hamburger-btn')):
                /** hide navigation and search container on click on hamburger */
                classListItems.remove('open');
                header.classList.add('transparent-bg');
                this.isHeaderActive = false;
                // navSearchContainer.classList.remove('dxp-block')
                navSearchContainer.classList.remove('show');
                searchWrapper.style.display = 'none';
                this.menuState = core$1.dxp.i18n.t('HeaderRich:hamburger');
                this.body.style.overflow = 'inherit';
                break;
            case classListItems.contains('hamburger-btn'):
                /** show navigation and search container on click on hamburger */
                classListItems.add('open');
                header.classList.remove('transparent-bg');
                this.isHeaderActive = true;
                navSearchContainer.classList.add('show');
                if (searchContainer) {
                    searchContainer.classList.add('expand-container');
                    searchContainer.classList.remove('collapse-container');
                }
                /** hide title text of CTA list on tablet/mobile */
                if (dxpCTAListItems) {
                    dxpCTAListItems.map(dxpCTAList => {
                        const ctaTitleText = dxpCTAList ? dxpCTAList.querySelector('p') : dxpCTAList.querySelector('p');
                        if (ctaTitleText) {
                            ctaTitleText.classList.add('dxp-none');
                        }
                    });
                }
                if (searchWrapper) {
                    searchWrapper.classList.add('dxp-block');
                }
                this.changesInSearchComponent(searchContainer, searchIcon, searchWrapperCloseIcon);
                this.menuState = core$1.dxp.i18n.t('HeaderRich:closeMenu');
                this.body.style.overflow = 'hidden';
                break;
            default:
                // close search box container on click on header row
                if ((target.classList.contains('header') || target.classList.contains('header-container')) && this.isHeaderActive) {
                    this.deactivateheader();
                }
                core$1.dxp.log.error('No child element found');
        }
    }
    /** listen to window scroll event */
    handleScroll() {
        if (this.isHeaderSticky) {
            const dxpHeader = this.element ? this.element.querySelector('.dxp-header-sticky') : this.element.querySelector('.dxp-header-sticky');
            const elHeight = dxpHeader.offsetHeight;
            const bodyHeight = document.body.offsetHeight;
            const windowHeight = window.innerHeight;
            const windowScrollCurrent = window.pageYOffset;
            const windowScrollDiff = this.windowScrollBefore - windowScrollCurrent;
            let elTop = parseInt(window.getComputedStyle(dxpHeader).getPropertyValue('top'), 10) + windowScrollDiff;
            if (windowScrollCurrent <= 0) { // scrolled to the very top; element sticks to the top
                dxpHeader.style.top = '0px';
            }
            else if (windowScrollDiff > 0) { // scrolled up; element slides in
                dxpHeader.style.top = `${(elTop > 0 ? 0 : elTop)}px`;
            }
            else if (windowScrollDiff < 0) { // scrolled down or scrolled to the very bottom; element slides in
                if (windowScrollCurrent + windowHeight >= bodyHeight - elHeight) {
                    elTop = windowScrollCurrent + windowHeight - bodyHeight;
                    dxpHeader.style.top = `${(elTop < 0 ? elTop : 0)}px`;
                }
                else {
                    dxpHeader.style.top = `${(Math.abs(elTop) > elHeight ? -elHeight : elTop)}px`; // scrolled down; element slides out
                }
            }
            this.windowScrollBefore = windowScrollCurrent;
        }
    }
    /** align nav search if available */
    alignNavSearch() {
        const dxpSearch = this.element.querySelector('dxp-search');
        dxpSearch.componentOnReady().then(res => {
            if (res) {
                const dxpsearch = res ? res.querySelector('.dxp-search') : res.querySelector('.dxp-search');
                if (dxpsearch) {
                    dxpsearch.style.background = 'none';
                }
            }
        });
    }
    /** hide search and close icon of search container in mobile/tablet device. */
    changesInSearchComponent(searchContainer, searchIcon, searchWrapperCloseIcon) {
        if (searchContainer) {
            searchContainer.classList.remove('dxp-none');
            const overlayBlock = searchContainer.querySelector('.overlay');
            overlayBlock.classList.remove('dxp-none');
            overlayBlock.classList.add('dxp-block');
            searchContainer.classList.add('search-container-changes-header');
        }
        if (searchIcon) {
            searchIcon.classList.add('dxp-none');
        }
        if (searchWrapperCloseIcon) {
            searchWrapperCloseIcon.classList.add('dxp-none');
        }
    }
    /** close header on-click on close icon */
    deactivateheader() {
        const deviceWidth = this.base.returnBooleanValue(this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg');
        this.isHeaderActive = !deviceWidth; // de-active header on click on close icon
        // Release web page
        if (this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg') {
            this.body.removeAttribute('style');
        }
    }
    /** Render the header */
    render() {
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-header-rich.min.css` })]
        ];
        return (core$1.h("header", { class: `transparent-bg ${this.backgroundType === 'solid' ? 'solid' : ''} ${this.base.componentClass()} ${this.isHeaderActive ? ' active' : ''}
        ${this.isHeaderSticky ? ' dxp-header-sticky' : ''}`, dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: `dxp-content-main ${this.backgroundType === 'transparent' ? 'transparent' : ''} header-container` }, core$1.h("div", { class: `dxp-row` }, core$1.h("div", { class: "dxp-col-12" }, core$1.h("div", { class: "header" }, this.isLogoPresent &&
            (core$1.h("div", { ref: el => this.headerContainer = el, class: "logo-container" }, core$1.h("slot", { name: "logo" }))), (this.isNavPresent || this.isNavSearch) &&
            ([
                core$1.h("div", { ref: el => this.headerContainer = el, class: "nav-search-container" }, core$1.h("div", { class: "nav-wrapper" }, core$1.h("slot", { name: "nav" })), core$1.h("div", { class: "search-wapper" }, core$1.h("slot", { name: "search" }))),
                core$1.h("div", { id: "hamburger-btn", class: "hamburger-btn hamburger", "aria-label": core$1.dxp.i18n.t(`HeaderRich:${this.menuState}`), tabindex: "0", role: "button" }, core$1.h("span", null))
            ])))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "header.dxp.dxp-header-rich{position:absolute;z-index:999;top:0;background:none;width:100%}header.dxp.dxp-header-rich .header{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-align:center;align-items:center;z-index:1;height:3.5rem}header.dxp.dxp-header-rich .header .logo-container{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}header.dxp.dxp-header-rich .header .hamburger{height:.833rem;width:1.5rem;position:absolute;top:1.5rem;right:36px;cursor:pointer;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.1s ease-in-out;-moz-transition:.1s ease-in-out;-o-transition:.1s ease-in-out;transition:.1s ease-in-out}\@media (max-width:991px){header.dxp.dxp-header-rich .header .hamburger{right:36px}}\@media (max-width:767px){header.dxp.dxp-header-rich .header .hamburger{right:16px}}header.dxp.dxp-header-rich .hamburger-btn span{content:\"\";display:block;position:absolute;width:100%;left:0;pointer-events:none;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}header.dxp.dxp-header-rich .hamburger-btn span:after,header.dxp.dxp-header-rich .hamburger-btn span:before{content:\"\";display:block;width:100%;position:absolute;top:.375rem;left:0}header.dxp.dxp-header-rich .hamburger-btn span:after{top:.75rem}header.dxp.dxp-header-rich .hamburger-btn.open span{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:.375rem}header.dxp.dxp-header-rich .hamburger-btn.open span:before{-webkit-transform:rotate(-90deg);transform:rotate(-90deg);top:0}header.dxp.dxp-header-rich .hamburger-btn.open span:after{border:0}\@media (min-width:992px){header.dxp.dxp-header-rich .header{height:6.5rem}header.dxp.dxp-header-rich .header .logo-container{width:auto}header.dxp.dxp-header-rich .header .logo-container+.nav-container{margin-left:1.25rem}header.dxp.dxp-header-rich .header .hamburger{display:none}header.dxp.dxp-header-rich .nav-search-container{-ms-flex-align:center;align-items:center;margin-left:auto;display:-ms-flexbox;display:flex}}\@media (max-width:991px){header.dxp.dxp-header-rich.transparent-bg{background:none}header.dxp.dxp-header-rich .header{display:block;padding:15px 0;position:relative}header.dxp.dxp-header-rich .header .search-wapper{display:none}header.dxp.dxp-header-rich .nav-search-container{width:100%;min-height:calc(100vh - 3.5rem);overflow-y:auto;opacity:0;-webkit-transition:opacity 1s ease-out;transition:opacity 1s ease-out;pointer-events:none}header.dxp.dxp-header-rich .nav-search-container.show{pointer-events:all}header.dxp.dxp-header-rich .nav-search-container .nav-wrapper{position:relative;z-index:1}header.dxp.dxp-header-rich .nav-search-container .search-wapper{position:relative;z-index:0}header.dxp.dxp-header-rich .nav-search-container.show{opacity:1}}\@media (max-width:767px){header.dxp.dxp-header-rich .dxp-col-12{padding:0}header.dxp.dxp-header-rich .dxp-row{margin:0}header.dxp.dxp-header-rich .logo-container{padding:0 16px}header.dxp.dxp-header-rich .nav-wrapper{padding:12px 0 16px 16px}}\@media (min-width:768px) and (max-width:991px){header.dxp.dxp-header-rich .dxp-col-12{padding:0}header.dxp.dxp-header-rich .dxp-row{margin:0}header.dxp.dxp-header-rich .logo-container{padding:0 36px}header.dxp.dxp-header-rich .nav-wrapper{padding:32px 34px 16px 36px}header.dxp.dxp-header-rich .search-wapper{margin:0 20px}}header.dxp.dxp-header-rich.solid{position:relative}header.dxp.dxp-header-rich.dxp-header-sticky{position:fixed}header.dxp.dxp-header-rich[dir=rtl] .hamburger{right:auto;left:36px}\@media (max-width:767px){header.dxp.dxp-header-rich[dir=rtl] .hamburger{left:16px}}\@media (min-width:992px){header.dxp.dxp-header-rich[dir=rtl] .header .logo-container+.nav-container{margin-left:auto;margin-right:.9375rem}header.dxp.dxp-header-rich[dir=rtl] .header .nav-search-container{margin-right:auto;margin-left:inherit}header.dxp.dxp-header-rich[dir=rtl] .header .nav-search-container .nav-wrapper{padding:12px 16px 16px 0}}\@media (max-width:767px){header.dxp.dxp-header-rich[dir=rtl] .search-wapper{margin-left:12px}header.dxp.dxp-header-rich[dir=rtl] .dxp-col-12{padding:0 16px}}"; }
};

exports.dxp_header_rich = HeaderRich;
