import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
import CommonUtility from './overlay';
/** dxp-nav */
export class Nav {
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav render() : ${process.env.MODE}`);
        return (h("nav", { class: `${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme, role: "application" },
            h("ul", { class: "nav-ul", ref: el => this.navigationContainer = el },
                h("slot", null)),
            h("span", { role: "button", tabindex: "-1", class: `dxp-none dxp-icon dxp-icon-close`, "aria-label": dxp.i18n.t('Nav:closeIcon'), onClick: () => {
                    this.closeIconClickHandler();
                } }),
            h("div", { class: "overlay overlay-container", onClick: () => {
                    this.closeIconClickHandler();
                } },
                h("span", { class: "overlay-bg-img" }),
                h("span", { class: "overlay-bg-opacity" }))));
    }
    static get is() { return "dxp-nav"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-nav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-nav.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "api url for navigation"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "currentChild": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "the child element"
            }
        },
        "currentNav": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "HTMLElement",
                "resolved": "HTMLElement",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "identify currentNav from menu container"
            }
        },
        "overlayBgImage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "background image for menu container"
            },
            "attribute": "overlay-bg-image",
            "reflect": false
        },
        "navData": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Listener that looks for navigation item object to be assigned/changed externally"
            },
            "attribute": "nav-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "navData",
            "methodName": "navigationDataHandler"
        }]; }
    static get listeners() { return [{
            "name": "childClickEvent",
            "method": "childEventHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "documentClickEventHandler",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "keypress",
            "method": "hideMenuWithKeys",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownEventHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "navHeaderClicked",
            "method": "navHeaderHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
