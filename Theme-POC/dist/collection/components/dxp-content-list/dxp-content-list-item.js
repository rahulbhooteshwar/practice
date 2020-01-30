import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-content-list-item- */
export class ContentListItem {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to perform after component load */
    componentDidLoad() {
        // For supporting RTE, this code will work fine for the normal text too
        if (this.element) {
            this.element.querySelector('.sub-title').innerHTML = this.subTitle;
        }
        else {
            this.element.querySelector('.sub-title').innerHTML = this.subTitle;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the content list items */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-content-list-items render() : ${process.env.MODE}`);
        return ([
            h("div", { class: `${this.base.componentClass()} sc-dxp-content-list`, "data-theme": this.theme }, (this.href && this.href !== '') ?
                h("a", { class: "sub-title", href: this.href, "aria-label": this.ariaLabel, target: this.target ? '_blank' : '_self' }, this.subTitle)
                : h("span", { class: "sub-title" }, this.subTitle))
        ]);
    }
    static get is() { return "dxp-content-list-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-content-list-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-content-list-item.css"]
    }; }
    static get properties() { return {
        "ariaLabel": {
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
                "text": "content title accessibility"
            },
            "attribute": "aria-label",
            "reflect": false
        },
        "href": {
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
                "text": "content href"
            },
            "attribute": "href",
            "reflect": false
        },
        "subTitle": {
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
                "text": "content sub title"
            },
            "attribute": "sub-title",
            "reflect": false
        },
        "target": {
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
                "text": "content target"
            },
            "attribute": "target",
            "reflect": false
        }
    }; }
    static get states() { return {
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
