'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        closeIconTitle: 'Close Message',
        dialogueAccessibilityTitle: 'message'
    }
};

const Message = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.closeButton = core$1.createEvent(this, "closeButton", 7);
    }
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    messageTextsChangeHandler() {
        this.base.createNestedMarkup(this.messageTextContainer, 'dxp-message-text', this.messageTexts);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Message', messages);
    }
    /** actions to be performed after component loaded */
    componentDidLoad() {
        this.messageTextsChangeHandler();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** actions to be performed on click on Close button */
    close() {
        this.element.style.display = 'none';
        this.closeButton.emit({ msgClosed: true });
        return true;
    }
    /** Method for getting icon based on severity */
    getIcon() {
        return this.THEME_CLASS[this.severity][0];
    }
    /** Method for getting theme based on severity */
    getTheme() {
        return this.base.componentClass() + this.THEME_CLASS[this.severity][1];
    }
    /** Render the message */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-message render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-message-list.min.css` })]
        ];
        return (core$1.h("div", { class: this.getTheme(), dir: this.dir, "data-theme": this.theme, role: "alertdialog", "aria-labelledby": "message-icon", "aria-describedby": "alert-message", tabindex: "0" }, styles, core$1.h("p", { class: "icon-wrapper" }, core$1.h("span", { class: this.getIcon(), "aria-label": `${this.severity} ${core$1.dxp.i18n.t('Message:dialogueAccessibilityTitle')}` })), core$1.h("p", null, core$1.h("div", { ref: el => this.messageTextContainer = el }, core$1.h("slot", null))), !this.hideCloseBtn ?
            core$1.h("span", { tabindex: "-1", class: "btn-close dxp-icon dxp-icon-close", role: "button", "aria-label": core$1.dxp.i18n.t('Message:closeIconTitle'), onClick: () => this.close() }) : ''));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "messageTexts": ["messageTextsChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-message.ui-messages{border:1px solid;display:table;margin:.5em 0;border-radius:4px;width:100%;position:relative}div.dxp.dxp-message.ui-messages p{display:table-cell;vertical-align:middle}div.dxp.dxp-message.ui-messages .icon-wrapper{border-radius:2px 0 0 2px;width:60px;position:relative;text-align:center}div.dxp.dxp-message.ui-messages .icon-wrapper+p{padding:10px 0}div.dxp.dxp-message.ui-messages .ui-messages-icon{display:inline-block;padding:0;vertical-align:middle;font-size:2em}div.dxp.dxp-message.ui-messages .dxp-icon-close{font-size:1em;position:absolute;right:15px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer}div.dxp.dxp-message.ui-messages .pi{height:40px;width:32px}div.dxp.dxp-message.ui-messages[dir=rtl] .dxp-icon-close{right:auto;left:15px}"; }
};

exports.dxp_message = Message;
