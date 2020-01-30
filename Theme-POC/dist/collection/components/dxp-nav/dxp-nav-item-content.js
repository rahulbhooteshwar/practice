import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-nav */
export class NavItemContent {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the nav */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-item-container render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-nav.min.css` })]
        ];
        return (h("li", { dir: this.dir, role: "menu" },
            styles,
            this.navigationTitle && h("a", { tabindex: "-1", class: "dxp-title-2 sub-nav-item", title: this.linkTitle, href: this.menuRouteLink, target: this.openInNewTab ? '_blank' : '_self', role: "menuitem" }, this.navigationTitle),
            this.description && h("span", { class: "menu-description dxp-font-size-md dxp-hidden-md-down dxp-lg-block" }, this.description),
            this.descriptionText && h("span", { class: "menu-description dxp-font-size-md dxp-hidden-md-down dxp-lg-block" }, this.descriptionText)));
    }
    static get is() { return "dxp-nav-item-content"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-nav-item-content.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-nav-item-content.css"]
    }; }
    static get properties() { return {
        "description": {
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
                "text": "description from API"
            },
            "attribute": "description",
            "reflect": false
        },
        "descriptionText": {
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
                "text": "description while authoring"
            },
            "attribute": "description-text",
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
                "text": "link title properties"
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
                "text": "menu route link properties"
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
                "text": "navigation title properties"
            },
            "attribute": "navigation-title",
            "reflect": false
        },
        "openInNewTab": {
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
                "text": "prop to configure link target"
            },
            "attribute": "open-in-new-tab",
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
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
