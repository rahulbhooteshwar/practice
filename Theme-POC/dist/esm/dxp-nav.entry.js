import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { C as CommonUtility } from './overlay-7417567e.js';

const messages = {
    'en': {
        closeIcon: 'Close navigation Menu'
    },
    'en-US': {
        closeIcon: 'Close navigation Menu'
    },
    'es': {
        closeIcon: 'Hola Mundo'
    },
    'es-ES': {
        closeIcon: 'Hola Mundo'
    }
};

const Nav = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** watch for navigation data change  */
    navigationDataHandler() {
        this.base.createNestedMarkup(this.navigationContainer, 'dxp-nav-menu', this.navData.navigationData);
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        // Data form api url
        if (this.apiUrl) {
            try {
                this.navData = await dxp.api(this.apiUrl);
            }
            catch (err) {
                dxp.log.error(this.element.tagName, 'componentWillLoad()', `fetch failed for ${this.apiUrl}`, err);
            }
        }
        this.utility = new CommonUtility();
        this.base.i18Init(dxp, 'Nav', messages);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-nav.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.base = new BaseComponent(this, dxp);
        this.nav = this.element ? this.element.querySelector('nav') : this.element.querySelector('nav');
        this.overlay = this.element ? this.element.querySelector('.overlay') : this.element.querySelector('.overlay');
        if (this.navData) {
            this.navigationDataHandler();
        }
    }
    /** close overlay click */
    childEventHandler(e) {
        this.currentChild = e.detail;
        this.closeOverlayHandler();
    }
    /** click event on document level  */
    documentClickEventHandler(e) {
        const expandedMenuItem = this.element.querySelector('.in') ? this.element.querySelector('.in') : this.element.querySelector('.in');
        if (expandedMenuItem && !e.target.closest('dxp-nav')) {
            this.utility.closeOverlay(expandedMenuItem, this.element);
        }
    }
    /** hide expanded sub menu items with close button */
    hideMenuWithKeys(e) {
        const target = e.target ? e.composedPath()[0] : e.target;
        if (target.classList.contains('dxp-icon-close')) {
            if (e.keyCode === 32 || e.keyCode === 40 || e.keyCode === 13) {
                this.utility.closeOverlay(this.currentNav, this.element);
            }
        }
    }
    /** Listen key down events */
    keyDownEventHandler(e) {
        const keycode = e.keyCode;
        const target = e.target ? e.composedPath()[0] : e.target;
        if (target && target.classList.contains('dxp-icon-close')) {
            const expandedSubNav = this.element.querySelector('.expanded') ? this.element.querySelector('.expanded') : this.element.querySelector('.expanded');
            const dxpNavItemContent = expandedSubNav.querySelectorAll('dxp-nav-item-content');
            let dxpCtas = expandedSubNav.querySelectorAll('dxp-cta');
            if (!dxpCtas.length) {
                const dxpCtaList = expandedSubNav.querySelector('dxp-cta-list');
                dxpCtas = dxpCtaList && dxpCtaList ? dxpCtaList.querySelectorAll('dxp-cta') : dxpCtaList && dxpCtaList.querySelectorAll('dxp-cta');
            }
            e.preventDefault();
            if (keycode === 38 || keycode === 37) {
                // Select last sub menu item from close button (with Up key)
                if (dxpNavItemContent && dxpNavItemContent.length > 0) {
                    const subNavItem = dxpNavItemContent[dxpNavItemContent.length - 1].querySelector('.sub-nav-item');
                    this.focusElement(subNavItem);
                    return;
                }
                // Select last Quick link element from close button (with Up key)
                if (dxpCtas && dxpCtas.length > 0) {
                    const link = dxpCtas[dxpCtas.length - 1] ? dxpCtas[dxpCtas.length - 1].querySelector('a') : dxpCtas[dxpCtas.length - 1].querySelector('a');
                    this.focusElement(link);
                }
            }
            if (keycode === 9 || keycode === 40 || keycode === 39) {
                // Select first Quick link element from close button (with Down Arrow/Tab key)
                if (dxpCtas && dxpCtas.length > 0) {
                    const link = dxpCtas[0] ? dxpCtas[0].querySelector('a') : dxpCtas[0].querySelector('a');
                    this.focusElement(link);
                    return;
                }
                // Select first sub menu item from close button (with Down Arrow/Tab key)
                if (dxpNavItemContent && dxpNavItemContent.length > 0) {
                    const subNavItem = dxpNavItemContent[0].querySelector('.sub-nav-item');
                    this.focusElement(subNavItem);
                    return;
                }
            }
            // Close the expaned nav
            if (keycode === 32 || keycode === 13) {
                this.closeIconClickHandler();
            }
        }
    }
    /** close overlay click */
    navHeaderHandler(e) {
        this.currentNav = e.detail;
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** crossIcon handler */
    closeIconClickHandler() {
        if (this.overlay) {
            this.utility.closeOverlay(this.currentNav, this.element);
        }
    }
    /** click handler nav */
    closeOverlayHandler() {
        if (this.currentChild.classList.contains('nav-item') || this.currentChild.nodeName === 'DXP-CTA-LIST'
            || this.currentChild.closest('dxp-cta-list') || this.currentNav.closest('.nav-item-li')) {
            return false;
            /** on click of sub-nav it should close the overlay handled here */
        }
        if (this.currentChild.parentElement.parentElement.classList.contains('quick-links-container') ||
            this.currentChild.parentElement.parentElement.parentElement.parentElement.classList.contains('group-container')) {
            return false;
        }
        this.utility.closeOverlay(this.currentNav, this.element);
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** Render the nav */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav render() : ${"DEVELOPMENT"}`);
        return (h("nav", { class: `${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme, role: "application" }, h("ul", { class: "nav-ul", ref: el => this.navigationContainer = el }, h("slot", null)), h("span", { role: "button", tabindex: "-1", class: `dxp-none dxp-icon dxp-icon-close`, "aria-label": dxp.i18n.t('Nav:closeIcon'), onClick: () => {
                this.closeIconClickHandler();
            } }), h("div", { class: "overlay overlay-container", onClick: () => {
                this.closeIconClickHandler();
            } }, h("span", { class: "overlay-bg-img" }), h("span", { class: "overlay-bg-opacity" }))));
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "navData": ["navigationDataHandler"]
    }; }
    static get style() { return "nav.dxp.dxp-nav{display:block;margin:0;padding:0;background:none}nav.dxp.dxp-nav .overlay-container{opacity:0;z-index:-1}nav.dxp.dxp-nav .overlay,nav.dxp.dxp-nav .overlay-bg-img,nav.dxp.dxp-nav .overlay-bg-opacity,nav.dxp.dxp-nav .overlay-container{position:fixed;height:100vh;top:0;right:0;bottom:0;left:0;pointer-events:none}nav.dxp.dxp-nav .overlay-bg-img{background-size:cover;background-repeat:no-repeat;background-position:50%}nav.dxp.dxp-nav .expanded{opacity:1;height:auto;pointer-events:all;visibility:visible}nav.dxp.dxp-nav .nav-ul{width:100%;left:0;margin-bottom:0}\@media (min-width:992px){nav.dxp.dxp-nav .dxp-icon-close{position:absolute;cursor:pointer;padding:.4375rem;border:.0625rem solid transparent;margin-top:5.4rem}nav.dxp.dxp-nav .nav-ul{width:auto;margin-top:0}nav.dxp.dxp-nav ::slotted(dxp-nav-menu){margin-right:1.6rem}nav.dxp.dxp-nav .dxp-nav-menu{margin-right:1.87rem}}\@media (max-width:767px){nav.dxp.dxp-nav .nav-ul{padding:12px 12px 16px 0}}\@media (max-width:991px){nav.dxp.dxp-nav .dxp-icon-close,nav.dxp.dxp-nav .overlay-container{display:none}}\@media (max-width:767px){nav.dxp.dxp-nav[dir=rtl] .nav-ul{padding:12px 0 16px 12px}}"; }
};

export { Nav as dxp_nav };
