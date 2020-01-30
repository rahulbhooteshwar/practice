import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const MessageText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-message render() : ${"DEVELOPMENT"}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir }, this.text ? h("span", { class: "ui-messages-summary" }, this.text) : h("slot", null)));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-message-text{padding:5px 60px 5px 15px}div.dxp.dxp-message-text[dir=rtl]{padding:5px 15px 5px 60px}"; }
};

export { MessageText as dxp_message_text };
