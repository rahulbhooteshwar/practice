'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const MessageList = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** Listener that looks for messageBlocks object to be assigned/changed externally */
    messagesChangeHandler() {
        this.base.createNestedMarkup(this.messageContainer, 'dxp-message', this.messages);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-message-list render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-message-list.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "dxp-row" }, core$1.h("div", { class: "dxp-col-12" }, core$1.h("div", { ref: el => this.messageContainer = el }, core$1.h("slot", null))))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "messages": ["messagesChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-message-list .dxp-row{overflow:hidden}"; }
};

exports.dxp_message_list = MessageList;
