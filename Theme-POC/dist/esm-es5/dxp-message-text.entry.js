import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var MessageText = /** @class */ (function () {
    function MessageText(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    MessageText.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /**
     * click listener for routing events on anchor tag
     */
    MessageText.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the message */
    MessageText.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-message render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass(), dir: this.dir }, this.text ? h("span", { class: "ui-messages-summary" }, this.text) : h("slot", null)));
    };
    Object.defineProperty(MessageText.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageText, "style", {
        get: function () { return "div.dxp.dxp-message-text{padding:5px 60px 5px 15px}div.dxp.dxp-message-text[dir=rtl]{padding:5px 15px 5px 60px}"; },
        enumerable: true,
        configurable: true
    });
    return MessageText;
}());
export { MessageText as dxp_message_text };
