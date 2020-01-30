import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import CommonUtility from './common-utility';
import messages from './messages';
/** dxp-navigation */
export class NavSubItem {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'GroupNav', messages);
        this.utility = new CommonUtility();
    }
    /** actions to perform after component load */
    componentDidLoad() {
        // get parent menu element
        const navItem = this.element.closest('dxp-nav-item');
        const links = this.element.querySelectorAll('a');
        // Update prop value as true of 'dxp-nav-item' element
        this.utility.parentMenuItem(navItem);
        this.utility.currentPageMenuLink(links);
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
        this.element.querySelector('.mega-sub-menu-link').classList.add('active');
    }
    /** Render the GroupNav */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-sub-item render() : ${process.env.MODE}`);
        return (h("li", { role: "none" },
            h("a", { title: this.linkTitle ? this.linkTitle : this.navigationTitle, "aria-label": this.accessibilityText ? this.accessibilityText : this.linkTitle, role: "menuitem", class: "mega-sub-menu-link", href: this.menuRouteLink }, this.navigationTitle)));
    }
    static get is() { return "dxp-nav-sub-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-nav-sub-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-nav-sub-item.css"]
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
        "menuIcon": {
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
            "attribute": "menu-icon",
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
