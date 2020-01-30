import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-message-text */
export class MessageText {
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
    /** Render the message */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-message render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir }, this.text ? h("span", { class: "ui-messages-summary" }, this.text) : h("slot", null)));
    }
    static get is() { return "dxp-message-text"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-message-text.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-message-text.css"]
    }; }
    static get properties() { return {
        "text": {
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
                "text": "summary text of the message displayed in bold"
            },
            "attribute": "text",
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
