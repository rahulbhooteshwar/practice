import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-page-header */
export class PageHeader {
    constructor() {
        /** More action button list */
        this.appMenuItemsList = [];
        /** More actions items slot */
        this.hasActionItems = false;
        /** App menu available or not */
        this.hasAppMenu = false;
        /** Search box slot */
        this.hasSearchBox = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component is loaded */
    componentDidLoad() {
        this.activateLink();
    }
    /** for accessibility implementation */
    handleKeyUp(e) {
        const target = e.target
            ? e.target.activeElement.parentElement
            : e.target;
        const keycode = e.which || e.keyCode;
        const nextEl = target.nextElementSibling;
        const prevEl = target.previousElementSibling;
        /** handle keys */
        if (keycode === 37) {
            /** for left arrow key */
            if (prevEl !== null) {
                prevEl.children[0].focus();
            }
        }
        else if (keycode === 39) {
            /** for right arrow key */
            if (nextEl !== null) {
                nextEl.children[0].focus();
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /**
     * Activate Link based on the URL
     */
    activateLink(clickedLink) {
        if (!this.hasAppMenu) {
            return false;
        }
        const shadowRoot = this.element ? this.element : this.element;
        const appMenuItems = Array.from(shadowRoot.querySelectorAll('.action-menu-item'));
        if (clickedLink) {
            // tslint:disable-next-line: radix
            this.isMenuItemActive = parseInt(clickedLink.getAttribute('link-id'));
            appMenuItems.forEach((sublink) => sublink.classList.remove('active'));
        }
        else {
            if (this.appMenuItemsList && this.appMenuItemsList.length > 0) {
                return this.appMenuItemsList.filter((obj, i) => obj.active ? this.isMenuItemActive = i : obj.active);
            }
        }
        if (this.isMenuItemActive >= 0) {
            appMenuItems[this.isMenuItemActive].classList.add('active');
        }
    }
    /** show active app menu item in button */
    selectedLink(e) {
        this.isAppMenuVisible = false;
        this.activateLink(e.currentTarget);
        this.appMenuItemClick.emit({ element: e.currentTarget });
        dxp.log.info(this.element.tagName, 'selectedLink()', 'Clicked app menu item: ', e.currentTarget.href.toLowerCase().trim());
    }
    /** App menu visible in mobile or not */
    showResponsiveAppMenu() {
        this.isAppMenuVisible = !this.isAppMenuVisible;
    }
    /** Render the page-header */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-page-header render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-page-header.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-row page-header-details" },
                h("div", { class: `page-title ${(this.hasActionItems && this.hasSearchBox) ? 'dxp-col-8' : 'dxp-col-9'}` },
                    h("h1", { class: "dxp-text-truncate", title: this.pageTitle, innerHTML: this.pageTitle })),
                (this.hasSearchBox || this.hasActionItems) ?
                    h("div", { class: `action-panel ${(this.hasActionItems && this.hasSearchBox) ? 'dxp-col-4' : 'dxp-col-3'}` },
                        this.hasSearchBox &&
                            (h("div", { role: "application", class: "dxp-inline-block search-box" },
                                h("slot", { name: "searchBox" }))),
                        this.hasActionItems &&
                            (h("div", { role: "application", class: "dxp-inline-block action-items" },
                                h("slot", { name: "actionItems" })))) : ''),
            this.hasAppMenu
                ? h("div", { class: "dxp-row app-menu" },
                    h("div", { class: "dxp-col-12" },
                        this.appMenuItemsList &&
                            this.appMenuItemsList.map((sublinks, i) => i === this.isMenuItemActive &&
                                h("button", { class: "active-item dxp-hidden-md-up", "aria-expanded": "false", "aria-label": sublinks.text, onClick: () => this.showResponsiveAppMenu() },
                                    h("span", { innerHTML: sublinks.text }),
                                    h("i", { class: "icon-sprite arrow-down-xs-o" }))),
                        h("ul", { class: `${this.isAppMenuVisible ? 'dxp-block' : ''}` }, this.appMenuItemsList &&
                            this.appMenuItemsList.map((sublinks, i) => h("li", { class: i === this.isMenuItemActive ? 'dxp-hidden-sm-down' : '' },
                                h("a", { "link-id": i, href: sublinks.href, target: sublinks.openInNewTab ? '_blank' : '_self', class: `action-menu-item ${i === this.isMenuItemActive ? 'active' : ''}`, onClick: e => this.selectedLink(e), title: sublinks.text, innerHTML: sublinks.text })))),
                        h("slot", null)))
                : ''));
    }
    static get is() { return "dxp-page-header"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-page-header.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-page-header.css"]
    }; }
    static get properties() { return {
        "appMenuItemsList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "More action button list"
            },
            "defaultValue": "[]"
        },
        "hasActionItems": {
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
                "text": "More actions items slot"
            },
            "attribute": "has-action-items",
            "reflect": false,
            "defaultValue": "false"
        },
        "hasAppMenu": {
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
                "text": "App menu available or not"
            },
            "attribute": "has-app-menu",
            "reflect": false,
            "defaultValue": "false"
        },
        "hasSearchBox": {
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
                "text": "Search box slot"
            },
            "attribute": "has-search-box",
            "reflect": false,
            "defaultValue": "false"
        },
        "pageTitle": {
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
                "text": "Page title"
            },
            "attribute": "page-title",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "isAppMenuVisible": {},
        "isMenuItemActive": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "appMenuItemClick",
            "name": "appMenuItemClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Link click event. Emitted when link is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyUp",
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
