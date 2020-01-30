import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-message-list */
export class MessageList {
    /** Listener that looks for messageBlocks object to be assigned/changed externally */
    messagesChangeHandler() {
        this.base.createNestedMarkup(this.messageContainer, 'dxp-message', this.messages);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component loaded */
    componentDidLoad() {
        this.messagesChangeHandler();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the message */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-message-list render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-message-list.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-row" },
                h("div", { class: "dxp-col-12" },
                    h("div", { ref: el => this.messageContainer = el },
                        h("slot", null))))));
    }
    static get is() { return "dxp-message-list"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-message-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-message-list.css"]
    }; }
    static get properties() { return {
        "messages": {
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
                "text": "object to hold multiple message blocks that can be passed as json array"
            },
            "attribute": "messages",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "messages",
            "methodName": "messagesChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
