import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import CommonUtility from './common-utility';
import messages from './messages';
const NAV_ONE_LINK = '.nav-level-one-link';
/** dxp-navigation */
export class NavGroup {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'NavGroup', messages);
        this.utility = new CommonUtility();
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-navigation.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to perform after component load */
    componentDidLoad() {
        const icons = this.element.querySelectorAll('.mega-menu-icon');
        const links = this.element.querySelectorAll('a');
        const menuItems = this.element.querySelectorAll('.mega-menu-link');
        const navItems = this.element.querySelectorAll('dxp-nav-item');
        // Remove item more than 4 items in level 2
        this.utility.preventExtraMenuItems(navItems, 3);
        // Add the active class to Main menu & Sub menu link of current web page
        this.utility.currentPageMenuLink(links);
        // set the position of level-2 menu-items and the number of menu items of accessibility compliance
        // Work for nested element implementation
        this.utility.setPosNSize(menuItems);
        // Resolve the IE issue for alternative text for visible
        this.findBrokenImage(icons);
        this.activeManually();
    }
    /** Actions to perform after component update */
    componentDidUpdate() {
        const menuItems = this.element.querySelectorAll('.mega-menu-link');
        const icons = this.element.querySelectorAll('.mega-menu-icon');
        // set the position of level-2 menu-items and the number of menu items of accessibility compliance
        // Work for Script JSON or service API
        this.utility.setPosNSize(menuItems);
        // Resolve the IE issue for alternative text for visible
        this.findBrokenImage(icons);
        this.activeManually();
    }
    /** Listen screen change event */
    onWindowResize() {
        const windowWidth = window.innerWidth;
        const navOverlay = (this.element.getAttribute('is-nested-menu') === 'true') ? this.element.querySelectorAll(NAV_ONE_LINK) : '';
        const MenuItems = this.element.querySelectorAll('.mega-menu-content > .caret');
        if (windowWidth <= 992) {
            Array.prototype.slice.call(navOverlay).map(e => e.setAttribute('tabIndex', '-1'));
            Array.prototype.slice.call(MenuItems).map(e => e.previousSibling.setAttribute('tabIndex', '-1'));
        }
        else {
            Array.prototype.slice.call(navOverlay).map(e => e.removeAttribute('tabIndex'));
            Array.prototype.slice.call(MenuItems).map(e => e.previousSibling.removeAttribute('tabIndex'));
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
        this.clickHandler();
    }
    /** manually active links */
    activeManually() {
        const links = Array.from(this.element.parentElement.querySelectorAll('a'));
        const curLink = this.element.querySelector(NAV_ONE_LINK);
        if (this.isActive) {
            links.forEach(e => e.classList.remove('active'));
            curLink.classList.add('active');
            curLink.setAttribute('aria-current', 'page');
        }
        else {
            curLink.classList.remove('active');
            curLink.removeAttribute('aria-current');
            this.utility.currentPageMenuLink(links);
        }
    }
    /** will remove is-active attribute on click and will add active link function */
    clickHandler() {
        const links = Array.from(this.element.parentElement.querySelectorAll('a'));
        links.forEach(e => e.classList.remove('active'));
        Array.from(this.element.parentElement.querySelectorAll('dxp-nav-group')).forEach(e => e.removeAttribute('is-active'));
        this.element.querySelector(NAV_ONE_LINK).classList.add('active');
    }
    /** Resolve the IE issue for alternative text for visible */
    findBrokenImage(icons) {
        if (icons.length) {
            for (const i of Object.keys(icons)) {
                icons[i].onerror = () => {
                    icons[i].classList.remove('mega-menu-icon');
                    icons[i].style.width = 'auto';
                };
            }
        }
    }
    /** Render Nested Menu */
    renderNestedMenu() {
        return (h("div", { class: "group-slot" }, this.child
            ? this.child.map(childItem => h("dxp-nav-item", { src: childItem['src'], "alt-text": childItem['altText'], "link-title": childItem['linkTitle'], "navigation-title": childItem['navigationTitle'], "menu-route-link": childItem['menuRouteLink'], "accessibility-text": childItem['accessibilityText'], child: childItem['child'] }))
            : h("slot", null)));
    }
    /** Render the NavGroup */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-group render() : ${process.env.MODE}`);
        return (h("li", { dir: this.dir, "data-theme": this.theme, class: `${this.base.componentClass()} nav-level-one`, role: "none" },
            h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, "aria-haspopup": this.isNestedMenu ? 'true' : undefined, "aria-expanded": this.isNestedMenu ? 'false' : undefined, role: "menuitem", class: "nav-level-one-link", href: this.menuRouteLink }, this.navigationTitle),
            this.isNestedMenu || (this.child && this.child.length) ? h("button", { "aria-label": dxp.i18n.t('NavGroup:ariaMenuText'), role: "button", class: "caret carrot" }) : undefined,
            this.isNestedMenu || (this.child && this.child.length) ? h("div", { class: "mega-menu-container", role: "menu" },
                h("div", { class: "mega-menu-nav" },
                    h("div", { class: "dxp-hidden-lg-up overview-link" },
                        h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, role: "menuitem", class: "mega-menu-link", href: this.menuRouteLink }, this.navigationTitle)),
                    this.renderNestedMenu())) : undefined));
    }
    static get is() { return "dxp-nav-group"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-nav-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-nav-group.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
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
                "text": "Accessibility. Screen readers will red this."
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "child": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Listener that looks for content list items object to be assigned/changed externally"
            },
            "attribute": "child",
            "reflect": false
        },
        "isActive": {
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
                "text": "set active link manually (for angular route)"
            },
            "attribute": "is-active",
            "reflect": false
        },
        "isNestedMenu": {
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
                "text": "Is nested menu items"
            },
            "attribute": "is-nested-menu",
            "reflect": false
        },
        "linkTitle": {
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
                "text": "Link title (Display on mouse hover)"
            },
            "attribute": "link-title",
            "reflect": false
        },
        "menuRouteLink": {
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
                "text": "link url"
            },
            "attribute": "menu-route-link",
            "reflect": false
        },
        "navigationTitle": {
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
                "text": "Navigation text will display in browser"
            },
            "attribute": "navigation-title",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "resize",
            "method": "onWindowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "load",
            "method": "onWindowResize",
            "target": "window",
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
