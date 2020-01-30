import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var MessageList = /** @class */ (function () {
    function MessageList(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Listener that looks for messageBlocks object to be assigned/changed externally */
    MessageList.prototype.messagesChangeHandler = function () {
        this.base.createNestedMarkup(this.messageContainer, 'dxp-message', this.messages);
    };
    /** actions to be performed prior to component loading */
    MessageList.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed after component loaded */
    MessageList.prototype.componentDidLoad = function () {
        this.messagesChangeHandler();
    };
    /**
     * click listener for routing events on anchor tag
     */
    MessageList.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the message */
    MessageList.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-message-list render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-message-list.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12" }, h("div", { ref: function (el) { return _this.messageContainer = el; } }, h("slot", null))))));
    };
    Object.defineProperty(MessageList.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageList, "watchers", {
        get: function () {
            return {
                "messages": ["messagesChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageList, "style", {
        get: function () { return "div.dxp.dxp-message-list .dxp-row{overflow:hidden}"; },
        enumerable: true,
        configurable: true
    });
    return MessageList;
}());
export { MessageList as dxp_message_list };
