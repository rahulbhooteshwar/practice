import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-breadcrumb */
export class BreadcrumbItem {
    constructor() {
        /** hides the current item in breadcrumb */
        this.hideCurrentPage = false;
        /** define for current page in breadcrumb */
        this.isCurrentPage = false;
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Breadcrumb', messages);
        this.liStyle = {
            'z-index': this.indexVal
        };
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the breadcrumb */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-breadcrumb item render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-breadcrumb.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            this.isCurrentPage
                ? h("li", { style: this.liStyle, class: `dxp dxp-breadcrumb-item sc-dxp-breadcrumb ${this.hideCurrentPage ? 'breadcrumb-hide' : 'current-page'}` },
                    h("span", { class: "sc-dxp-breadcrumb", "aria-label": this.accessibilityText, tabindex: "0" },
                        " ",
                        this.linkTitle))
                : h("li", { style: this.liStyle, class: "dxp dxp-breadcrumb-item sc-dxp-breadcrumb" },
                    h("a", { href: this.link, "aria-label": this.accessibilityText, class: "sc-dxp-breadcrumb" },
                        h("span", { class: "sc-dxp-breadcrumb" }, this.linkTitle)))));
    }
    static get is() { return "dxp-breadcrumb-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-breadcrumb-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-breadcrumb-item.css"]
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
                "text": "accessibility text of the breadcrumb items"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "hideCurrentPage": {
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
                "text": "hides the current item in breadcrumb"
            },
            "attribute": "hide-current-page",
            "reflect": false,
            "defaultValue": "false"
        },
        "indexVal": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "to set the z-index value"
            },
            "attribute": "index-val",
            "reflect": false
        },
        "isCurrentPage": {
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
                "text": "define for current page in breadcrumb"
            },
            "attribute": "is-current-page",
            "reflect": false,
            "defaultValue": "false"
        },
        "link": {
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
                "text": "link of the breadcrumb item"
            },
            "attribute": "link",
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
                "text": "title of the breadcrumb items"
            },
            "attribute": "link-title",
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
