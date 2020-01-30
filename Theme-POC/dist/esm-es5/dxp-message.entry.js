import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        closeIconTitle: 'Close Message',
        dialogueAccessibilityTitle: 'message'
    }
};
var Message = /** @class */ (function () {
    function Message(hostRef) {
        registerInstance(this, hostRef);
        /** theme/icon classes for different severity */
        this.THEME_CLASS = {
            'success': ['ui-messages-icon pi pi-success', ' ui-messages ui-messages-success'],
            'info': ['ui-messages-icon pi pi-info', ' ui-messages ui-messages-info'],
            'error': ['ui-messages-icon pi pi-error', ' ui-messages ui-messages-error'],
            'warn': ['ui-messages-icon pi pi-warn', ' ui-messages ui-messages-warn'],
            'general': ['ui-messages-icon pi pi-general', ' ui-messages ui-messages-general']
        };
        /** show/hide close botton flag */
        this.hideCloseBtn = false;
        /** severity of the message - warn, info, error, success, general */
        this.severity = 'general';
        this.closeButton = createEvent(this, "closeButton", 7);
    }
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    Message.prototype.messageTextsChangeHandler = function () {
        this.base.createNestedMarkup(this.messageTextContainer, 'dxp-message-text', this.messageTexts);
    };
    /** actions to be performed prior to component loading */
    Message.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Message', messages);
    };
    /** actions to be performed after component loaded */
    Message.prototype.componentDidLoad = function () {
        this.messageTextsChangeHandler();
    };
    /**
     * click listener for routing events on anchor tag
     */
    Message.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** actions to be performed on click on Close button */
    Message.prototype.close = function () {
        this.element.style.display = 'none';
        this.closeButton.emit({ msgClosed: true });
        return true;
    };
    /** Method for getting icon based on severity */
    Message.prototype.getIcon = function () {
        return this.THEME_CLASS[this.severity][0];
    };
    /** Method for getting theme based on severity */
    Message.prototype.getTheme = function () {
        return this.base.componentClass() + this.THEME_CLASS[this.severity][1];
    };
    /** Render the message */
    Message.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-message render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-message-list.min.css" })]
        ];
        return (h("div", { class: this.getTheme(), dir: this.dir, "data-theme": this.theme, role: "alertdialog", "aria-labelledby": "message-icon", "aria-describedby": "alert-message", tabindex: "0" }, styles, h("p", { class: "icon-wrapper" }, h("span", { class: this.getIcon(), "aria-label": this.severity + " " + dxp.i18n.t('Message:dialogueAccessibilityTitle') })), h("p", null, h("div", { ref: function (el) { return _this.messageTextContainer = el; } }, h("slot", null))), !this.hideCloseBtn ?
            h("span", { tabindex: "-1", class: "btn-close dxp-icon dxp-icon-close", role: "button", "aria-label": dxp.i18n.t('Message:closeIconTitle'), onClick: function () { return _this.close(); } }) : ''));
    };
    Object.defineProperty(Message.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message, "watchers", {
        get: function () {
            return {
                "messageTexts": ["messageTextsChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message, "style", {
        get: function () { return "div.dxp.dxp-message.ui-messages{border:1px solid;display:table;margin:.5em 0;border-radius:4px;width:100%;position:relative}div.dxp.dxp-message.ui-messages p{display:table-cell;vertical-align:middle}div.dxp.dxp-message.ui-messages .icon-wrapper{border-radius:2px 0 0 2px;width:60px;position:relative;text-align:center}div.dxp.dxp-message.ui-messages .icon-wrapper+p{padding:10px 0}div.dxp.dxp-message.ui-messages .ui-messages-icon{display:inline-block;padding:0;vertical-align:middle;font-size:2em}div.dxp.dxp-message.ui-messages .dxp-icon-close{font-size:1em;position:absolute;right:15px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer}div.dxp.dxp-message.ui-messages .pi{height:40px;width:32px}div.dxp.dxp-message.ui-messages[dir=rtl] .dxp-icon-close{right:auto;left:15px}"; },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
export { Message as dxp_message };
