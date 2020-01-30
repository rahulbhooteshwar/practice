import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-message */
export class Message {
    constructor() {
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
    }
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    messageTextsChangeHandler() {
        this.base.createNestedMarkup(this.messageTextContainer, 'dxp-message-text', this.messageTexts);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Message', messages);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-message render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-message-list.min.css` })]
        ];
        return (h("div", { class: this.getTheme(), dir: this.dir, "data-theme": this.theme, role: "alertdialog", "aria-labelledby": "message-icon", "aria-describedby": "alert-message", tabindex: "0" },
            styles,
            h("p", { class: "icon-wrapper" },
                h("span", { class: this.getIcon(), "aria-label": `${this.severity} ${dxp.i18n.t('Message:dialogueAccessibilityTitle')}` })),
            h("p", null,
                h("div", { ref: el => this.messageTextContainer = el },
                    h("slot", null))),
            !this.hideCloseBtn ?
                h("span", { tabindex: "-1", class: "btn-close dxp-icon dxp-icon-close", role: "button", "aria-label": dxp.i18n.t('Message:closeIconTitle'), onClick: () => this.close() }) : ''));
    }
    static get is() { return "dxp-message"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-message.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-message.css"]
    }; }
    static get properties() { return {
        "hideCloseBtn": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "show/hide close botton flag"
            },
            "attribute": "hide-close-btn",
            "reflect": false,
            "defaultValue": "false"
        },
        "severity": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'warn' | 'info' | 'error' | 'success' | 'general'",
                "resolved": "\"error\" | \"general\" | \"info\" | \"success\" | \"warn\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "severity of the message - warn, info, error, success, general"
            },
            "attribute": "severity",
            "reflect": false,
            "defaultValue": "'general'"
        },
        "messageTexts": {
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
                "text": "object to hold multiple message texts that can be passed as json array"
            },
            "attribute": "message-texts",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "closeButton",
            "name": "closeButton",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit event on click of Close button"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "messageTexts",
            "methodName": "messageTextsChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
