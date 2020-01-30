import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const MessageList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-message-list render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-message-list.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12" }, h("div", { ref: el => this.messageContainer = el }, h("slot", null))))));
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "messages": ["messagesChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-message-list .dxp-row{overflow:hidden}"; }
};

export { MessageList as dxp_message_list };
