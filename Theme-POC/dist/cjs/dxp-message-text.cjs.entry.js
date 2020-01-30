'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const MessageText = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the message */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-message render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir }, this.text ? core$1.h("span", { class: "ui-messages-summary" }, this.text) : core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-message-text{padding:5px 60px 5px 15px}div.dxp.dxp-message-text[dir=rtl]{padding:5px 15px 5px 60px}"; }
};

exports.dxp_message_text = MessageText;
