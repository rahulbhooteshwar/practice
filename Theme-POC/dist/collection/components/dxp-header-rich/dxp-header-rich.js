import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-header-rich */
export class HeaderRich {
    constructor() {
        /** background color on active header */
        this.isHeaderActive = false;
        /** isLogo Present */
        this.isLogoPresent = false;
        /** Is Nav present */
        this.isNavPresent = false;
        /** Search present */
        this.isNavSearch = false;
        /** Change the I18 message as per menu state (Expand/Collapse) */
        this.menuState = dxp.i18n.t('HeaderRich:hamburger');
        /** window scroll initial value */
        this.windowScrollBefore = 0;
        /** Prop to display header background either transparent or solid */
        this.backgroundType = 'transparent';
        /** Prop to display fixed header */
        this.isHeaderSticky = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'HeaderRich', messages);
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
                    if (dxp.is.ipad()) {
                        this.body.style.position = 'relative';
                    }
                }
                else {
                    this.isHeaderActive = true;
                    this.body.style.overflow = 'hidden';
                    if (dxp.is.ipad()) {
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
                if (dxp.is.ipad()) {
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
                this.menuState = dxp.i18n.t('HeaderRich:hamburger');
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
                this.menuState = dxp.i18n.t('HeaderRich:closeMenu');
                this.body.style.overflow = 'hidden';
                break;
            default:
                // close search box container on click on header row
                if ((target.classList.contains('header') || target.classList.contains('header-container')) && this.isHeaderActive) {
                    this.deactivateheader();
                }
                dxp.log.error('No child element found');
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
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-header-rich.min.css` })]
        ];
        return (h("header", { class: `transparent-bg ${this.backgroundType === 'solid' ? 'solid' : ''} ${this.base.componentClass()} ${this.isHeaderActive ? ' active' : ''}
        ${this.isHeaderSticky ? ' dxp-header-sticky' : ''}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: `dxp-content-main ${this.backgroundType === 'transparent' ? 'transparent' : ''} header-container` },
                h("div", { class: `dxp-row` },
                    h("div", { class: "dxp-col-12" },
                        h("div", { class: "header" },
                            this.isLogoPresent &&
                                (h("div", { ref: el => this.headerContainer = el, class: "logo-container" },
                                    h("slot", { name: "logo" }))),
                            (this.isNavPresent || this.isNavSearch) &&
                                ([
                                    h("div", { ref: el => this.headerContainer = el, class: "nav-search-container" },
                                        h("div", { class: "nav-wrapper" },
                                            h("slot", { name: "nav" })),
                                        h("div", { class: "search-wapper" },
                                            h("slot", { name: "search" }))),
                                    h("div", { id: "hamburger-btn", class: "hamburger-btn hamburger", "aria-label": dxp.i18n.t(`HeaderRich:${this.menuState}`), tabindex: "0", role: "button" },
                                        h("span", null))
                                ])))))));
    }
    static get is() { return "dxp-header-rich"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-header-rich.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-header-rich.css"]
    }; }
    static get properties() { return {
        "backgroundType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'transparent' | 'solid'",
                "resolved": "\"solid\" | \"transparent\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Prop to display header background either transparent or solid"
            },
            "attribute": "background-type",
            "reflect": false,
            "defaultValue": "'transparent'"
        },
        "isHeaderSticky": {
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
                "text": "Prop to display fixed header"
            },
            "attribute": "is-header-sticky",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "dir": {},
        "isHeaderActive": {},
        "isLogoPresent": {},
        "isNavPresent": {},
        "isNavSearch": {},
        "menuState": {},
        "theme": {},
        "windowScrollBefore": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickEventHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "scroll",
            "method": "handleScroll",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
