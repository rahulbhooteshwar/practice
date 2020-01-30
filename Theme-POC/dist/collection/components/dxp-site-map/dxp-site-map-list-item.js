import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-site-map-list-item */
export class SiteMapListItem {
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
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink() {
        return ((this.href && this.href.length !== 0) ?
            h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading)
            :
                h("a", { class: "hyperlink disable", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** Render site-map-list-item */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-list-item render() ${process.env.MODE}`);
        return (h("li", { class: `${this.base.componentClass()} list-item`, dir: this.dir },
            this.getHyperlink(),
            h("slot", null)));
    }
    static get is() { return "dxp-site-map-list-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-site-map-list-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-site-map-list-item.css"]
    }; }
    static get properties() { return {
        "accessibility": {
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
                "text": "accessibility label"
            },
            "attribute": "accessibility",
            "reflect": false
        },
        "heading": {
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
                "text": "list item text"
            },
            "attribute": "heading",
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
                "text": "hyperlink"
            },
            "attribute": "href",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
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
