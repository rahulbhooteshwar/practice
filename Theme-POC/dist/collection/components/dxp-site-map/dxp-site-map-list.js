import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-site-map-list */
export class SiteMapList {
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
    /** Render site-map-list */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-list render() ${process.env.MODE}`);
        return (h("ul", { class: this.base.componentClass(), dir: this.dir },
            h("slot", null)));
    }
    static get is() { return "dxp-site-map-list"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-site-map-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-site-map-list.css"]
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
