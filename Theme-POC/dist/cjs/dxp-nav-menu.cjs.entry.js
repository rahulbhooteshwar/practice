'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const overlay = require('./overlay-ee7023b0.js');

const CTA_LIST = 'dxp-cta-list';
const SUB_NAV_ITEM_CLASS = '.sub-nav-item';
const NavMenu = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        this.navHeaderClicked = core$1.createEvent(this, "navHeaderClicked", 7);
        this.childClickEvent = core$1.createEvent(this, "childClickEvent", 7);
    }
    /** watch for navigation data change  */
    navGroupHandler() {
        this.base.createNestedMarkup(this.navGroupContainer, 'dxp-nav-item-content', this.child);
    }
    /** watch for navigation data change  */
    quickLinksHandler() {
        if (this.quickLinks.length > 0) {
            for (const item of this.quickLinks) {
                if (item.quickLinkDescription) {
                    item['title-text'] = item.quickLinkDescription;
                    item['orientation'] = 'vertical';
                    for (const prop of item.ctaList) {
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
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.utility = new overlay.CommonUtility();
    }
    /** actions to be performed prior to component loading */
    async componentDidLoad() {
        if (this.quickLinks) {
            this.quickLinksHandler();
        }
        if (this.child) {
            this.navGroupHandler();
        }
        await this.defaultActionOnFocus();
    }
    /** actions to be performed after component loading */
    async componentDidUpdate() {
        // On addition of data through API
        await this.defaultActionOnFocus();
    }
    /** default actions */
    async defaultActionOnFocus() {
        const primaryMenuList = [];
        const navListItem = this.element.parentElement.querySelectorAll('dxp-nav-menu');
        const ctaList = this.element.querySelector(CTA_LIST);
        let dxpCtas;
        if (ctaList) {
            await ctaList.componentOnReady().then(res => {
                if (res) {
                    // hide dxp-cta-list title for md and small devices
                    const ctaListTitle = res ? res.querySelector('p') : res.querySelector('p');
                    ctaListTitle.classList.add('dxp-hidden-md-down');
                    ctaListTitle.classList.add('dxp-lg-block');
                    dxpCtas = res.querySelector('dxp-cta') ? res.querySelectorAll('dxp-cta') : res.querySelectorAll('dxp-cta');
                }
            });
            // Preventing by-default behaviour of selection feature with tabindex="-1".
            if (dxpCtas && dxpCtas.length) {
                for (const dxpCta of dxpCtas) {
                    await dxpCta.componentOnReady().then(res => {
                        const link = res ? res.querySelector('a') : res.querySelector('a');
                        link.setAttribute('tabindex', '-1');
                    });
                }
            }
        }
        for (const item of navListItem) {
            const navItem = item.querySelector('li.nav-item-li');
            primaryMenuList.push(navItem);
        }
        this.utility.setPosNSize(primaryMenuList);
    }
    /** nav click - opens overlay */
    parentNavHandler() {
        const listItem = this.element.querySelector('li') ? this.element.querySelector('li') : this.element.querySelector('li');
        if (this.overlayBgImage) {
            this.utility.openOverlay(listItem, this.overlayBgImage);
        }
        else {
            this.utility.openOverlay(listItem);
        }
        this.navHeaderClicked.emit(listItem);
    }
    /** Prevent scrolling the web page with space-bar and all up/down/left/right arrow keys */
    preventDefaultBehaviour(keycode, e) {
        const preventDefaultKyes = [32, 37, 38, 39, 40];
        if (preventDefaultKyes.indexOf(keycode) !== -1) {
            e.preventDefault();
        }
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /**  click event handler  */
    clickEventHandler(event) {
        // click listener for routing events on anchor tag
        this.base.routingEventListener(event);
        // show and hide overlay
        this.childClickEvent.emit(event.target);
    }
    /** show and hide overlay */
    showHideMenuWithKeyDown(e) {
        const target = e.target ? e.composedPath()[0] : e.target;
        const isNavitem = target.classList.contains('nav-item');
        const parentDxpNav = target.getRootNode && target.getRootNode().host ? target.getRootNode().host.closest('dxp-nav') : target.closest('dxp-nav');
        const closeIcon = parentDxpNav && parentDxpNav ? parentDxpNav.querySelector('.dxp-icon-close')
            : parentDxpNav && parentDxpNav.querySelector('.dxp-icon-close');
        const ariaExpandedNavItem = target.getAttribute('aria-expanded');
        const dxpCtaList = this.element.querySelector(CTA_LIST);
        const parentDxpCta = target.closest('dxp-cta');
        const nextElmDxpCta = (parentDxpCta && parentDxpCta.nextElementSibling)
            || (target.getRootNode && target.getRootNode().host && target.getRootNode().host.nodeName === 'DXP-CTA' && target.getRootNode().host.nextElementSibling);
        const prevElmDxpCta = (parentDxpCta && parentDxpCta.previousElementSibling)
            || (target.getRootNode && target.getRootNode().host && target.getRootNode().host.nodeName === 'DXP-CTA') && target.getRootNode().host.previousElementSibling;
        const lastElmDxpCta = (parentDxpCta && !parentDxpCta.nextElementSibling)
            || (target.getRootNode && target.getRootNode().host && target.getRootNode().host.nodeName === 'DXP-CTA' && !target.getRootNode().host.nextElementSibling);
        const isSubNavItem = target.classList.contains('sub-nav-item');
        const subNavItem = this.element.querySelector(SUB_NAV_ITEM_CLASS);
        const parentDxpNavItemContent = target.closest('dxp-nav-item-content');
        const nextDxpNavItemContent = parentDxpNavItemContent && parentDxpNavItemContent.nextElementSibling;
        const prevDxpNavItemContent = parentDxpNavItemContent && parentDxpNavItemContent.previousElementSibling;
        const keycode = e.keyCode;
        const isCta = target.closest('.dxp-cta');
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
            let dxpCta;
            let link;
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
            const link = nextElmDxpCta ? nextElmDxpCta.querySelector('a') : nextElmDxpCta.querySelector('a');
            if (link) {
                this.focusElement(link);
                return;
            }
        }
        // Navigate through quick links (Up arrow)
        if (keycode === 38 && prevElmDxpCta) {
            let link;
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
            const currentSubNavItem = this.subNavChildContainer.querySelector(SUB_NAV_ITEM_CLASS);
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
            const currentSubNavItem = nextDxpNavItemContent.querySelector(SUB_NAV_ITEM_CLASS);
            if (currentSubNavItem) {
                this.focusElement(currentSubNavItem);
            }
        }
        // Navigate through sub menus items (Up arrow)
        if (target && isSubNavItem && prevDxpNavItemContent && keycode === 38) {
            const currentSubNavItem = prevDxpNavItemContent.querySelector(SUB_NAV_ITEM_CLASS);
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
                const currentDxpCtaList = this.subNavChildContainer.querySelector(CTA_LIST);
                const dxpCta = currentDxpCtaList && currentDxpCtaList.querySelector('dxp-cta') ?
                    currentDxpCtaList.querySelectorAll('dxp-cta')
                    :
                        currentDxpCtaList.querySelectorAll('dxp-cta');
                const link = dxpCta && dxpCta[dxpCta.length - 1] ?
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
    }
    /** Render the nav */
    render() {
        core$1.dxp.log.debug(`in dxp-nav-menu render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-nav.min.css` })]
        ];
        return (core$1.h("li", { class: `nav-item-li ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme, role: "menu" }, styles, core$1.h("span", { class: "nav-item h5", tabindex: "0", onClick: () => { this.parentNavHandler(); }, role: "menuitem", "aria-haspopup": "true", "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle }, this.navigationTitle), core$1.h("div", { class: "sub-nav-child-container", ref: el => this.subNavChildContainer = el }, core$1.h("div", { class: "quick-links-container dxp-col-lg-3", ref: el => this.quickLinksContainer = el }, core$1.h("slot", null), "\u00A0"), this.child &&
            core$1.h("div", { ref: el => this.groupContainer = el, class: "group-container dxp-col-lg-4 dxp-col-offset-lg-1" }, core$1.h("dxp-nav-item-container", null, core$1.h("div", { class: "dxp-scrollable-container" }, core$1.h("div", { class: "dxp-scrollable" }, core$1.h("ul", { ref: el => this.navGroupContainer = el }, core$1.h("slot", null)))))), !this.child &&
            core$1.h("div", { ref: el => this.groupContainer = el, class: "group-container dxp-col-lg-4 dxp-col-offset-lg-1" }, core$1.h("div", { class: "dxp-scrollable-container" }, core$1.h("div", { class: "dxp-scrollable" }, core$1.h("ul", null, core$1.h("slot", { name: "group-content" }))))))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "child": ["navGroupHandler"],
        "quickLinks": ["quickLinksHandler"]
    }; }
    static get style() { return "li.dxp.dxp-nav-menu{background:none;padding:.8rem 0}li.dxp.dxp-nav-menu>a,li.dxp.dxp-nav-menu>span{margin:0}li.dxp.dxp-nav-menu .sub-nav-child-container{margin-top:1.125rem;display:none;-ms-flex-direction:column-reverse;flex-direction:column-reverse}li.dxp.dxp-nav-menu.in+li{padding-top:0}li.dxp.dxp-nav-menu .nav-item{display:block;width:100%;height:auto;position:relative;padding:0;cursor:pointer}li.dxp.dxp-nav-menu .nav-item:before{content:\"\";display:block;position:absolute}\@media (min-width:992px){li.dxp.dxp-nav-menu{display:inline-block;padding:0}li.dxp.dxp-nav-menu:not(:first-of-type){margin-left:3.5rem}li.dxp.dxp-nav-menu dxp-nav-item-content{display:block}li.dxp.dxp-nav-menu dxp-nav-item-content:not(:last-child){margin-bottom:2.2rem}li.dxp.dxp-nav-menu.in .nav-item:focus{border:.0625rem solid transparent}li.dxp.dxp-nav-menu .nav-item:after{content:\"\";display:block;height:.0625rem;width:calc(100% + 1.3125rem)}li.dxp.dxp-nav-menu .sub-nav-child-container{position:absolute;width:100%;left:0;display:none;margin-top:7.375rem;opacity:0;-webkit-transition:opacity .3s;transition:opacity .3s;pointer-events:none}li.dxp.dxp-nav-menu .sub-nav-child-container.show{display:block}li.dxp.dxp-nav-menu .sub-nav-child-container.expanded{opacity:1;pointer-events:all}li.dxp.dxp-nav-menu .sub-nav-child-container .sub-nav-item{margin:0}li.dxp.dxp-nav-menu .dxp-scrollable{max-height:calc(100vh - 11.3rem)}li.dxp.dxp-nav-menu .dxp-scrollable ul{margin-bottom:0}}\@media screen and (min-width:992px) and (min-width:0\\0){li.dxp.dxp-nav-menu .dxp-scrollable{max-height:calc(100vh - 102px)}}\@media (max-width:991px){li.dxp.dxp-nav-menu.in .sub-nav-child-container{display:-ms-flexbox;display:flex;padding-left:16px}}\@media (max-width:767px){li.dxp.dxp-nav-menu.in .sub-nav-child-container{padding-left:8px}}li.dxp.dxp-nav-menu[dir=rtl].in .nav-item:before,li.dxp.dxp-nav-menu[dir=rtl] .nav-item:before{right:auto;left:0}\@media (min-width:992px){li.dxp.dxp-nav-menu[dir=rtl].in .nav-item:before,li.dxp.dxp-nav-menu[dir=rtl] .nav-item:before{right:auto;left:1.2rem}}\@media (max-width:991px){li.dxp.dxp-nav-menu[dir=rtl].in .sub-nav-child-container{display:-ms-flexbox;display:flex;padding-right:16px}}\@media (max-width:767px){li.dxp.dxp-nav-menu[dir=rtl].in .sub-nav-child-container{padding-right:8px}}"; }
};

exports.dxp_nav_menu = NavMenu;
