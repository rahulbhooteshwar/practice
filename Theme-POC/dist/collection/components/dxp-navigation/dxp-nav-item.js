import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import CommonUtility from './common-utility';
import messages from './messages';
/** dxp-navigation */
export class NavItem {
    constructor() {
        /** Is nested menu items */
        this.isNestedMenu = false;
    }
    /** Actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'GroupNav', messages);
        this.utility = new CommonUtility();
    }
    /** Actions to perform after component load */
    componentDidLoad() {
        // get parent menu element
        const navGroup = this.element.closest('dxp-nav-group');
        const subNavItems = this.element.querySelectorAll('.mega-sub-menu-link');
        const links = this.element.querySelectorAll('a');
        // Update prop value as true of 'dxp-nav-group' element
        this.utility.parentMenuItem(navGroup);
        // Add the active class to Main menu & Sub menu link of current web page
        this.utility.currentPageMenuLink(links);
        // Set the position of level-3 menu-items and the number of menu items of accessibility compliance
        // Work for nested element implementation
        this.utility.setPosNSize(subNavItems);
    }
    /** Actions to perform after component update */
    componentDidUpdate() {
        const subNavItems = this.element.querySelectorAll('.mega-sub-menu-link');
        // Set the position of level-3 menu-items and the number of menu items of accessibility compliance
        // Work for Script JSON or service API
        this.utility.setPosNSize(subNavItems);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
        this.clickHandler();
    }
    /** will remove is-active attribute on click and will add active link function */
    clickHandler() {
        // remove active from all links
        const links = Array.from(this.element.closest('nav').querySelectorAll('a'));
        links.forEach(e => e.classList.remove('active'));
        // add active to current root link
        const parentNavGroup = this.element.closest('dxp-nav-group');
        parentNavGroup.removeAttribute('is-active');
        parentNavGroup.querySelector('.nav-level-one-link').classList.add('active');
        // add active to current link
        this.element.querySelector('.mega-menu-link').classList.add('active');
    }
    /** Render nested menu */
    renderNestedMenu() {
        return ([
            h("button", { "aria-label": dxp.i18n.t('GroupNav:ariaMenuText'), role: "button", class: "caret carrot-small" }),
            h("ul", { class: "mega-sub-menu", role: "none" },
                h("li", { class: "dxp-hidden-lg-up overview-link", role: "none" },
                    h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, "aria-haspopup": this.isNestedMenu && 'true', role: "menuitem", class: "mega-sub-menu-link", href: this.menuRouteLink }, this.navigationTitle)),
                h("ul", null,
                    h("li", null, this.child
                        ? this.child.map(childItem => h("dxp-nav-sub-item", { "link-title": childItem['linkTitle'], "navigation-title": childItem['navigationTitle'], "menu-route-link": childItem['menuRouteLink'], "accessibility-text": childItem['accessibilityText'] }))
                        : h("slot", null))))
        ]);
    }
    /** Render the GroupNav */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-item render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass() },
            h("div", { class: "icon-container dxp-hidden-md-down" }, this.src ?
                h("img", { alt: this.altText ? this.altText : this.src, src: this.src, class: "mega-menu-icon" }) : false),
            h("div", { class: "mega-menu-content" },
                h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, "aria-haspopup": this.isNestedMenu && 'true', role: "menuitem", class: "mega-menu-link", href: this.menuRouteLink }, this.navigationTitle),
                (this.isNestedMenu || (this.child && this.child.length)) &&
                    this.renderNestedMenu())));
    }
    static get is() { return "dxp-nav-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-nav-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-nav-item.css"]
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
        "altText": {
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
                "text": "Alternative text for menu icon image"
            },
            "attribute": "alt-text",
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
                "text": "Nav sub items"
            },
            "attribute": "child",
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
            "reflect": false,
            "defaultValue": "false"
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
        },
        "src": {
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
                "text": "url of menu icon image"
            },
            "attribute": "src",
            "reflect": false
        }
    }; }
    static get states() { return {
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
