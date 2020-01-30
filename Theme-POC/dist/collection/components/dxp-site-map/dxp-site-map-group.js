import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-site-map-group */
export class SiteMapGroup {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        const shadow = this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
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
                h("a", { class: "hyperlink disable", "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** render site-map-list-group */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-group render() ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("div", { class: "group-heading" },
                h("p", { class: "dxp-title-3" }, this.getHyperlink())),
            h("slot", null)));
    }
    static get is() { return "dxp-site-map-group"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-site-map-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-site-map-group.css"]
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
