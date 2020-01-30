import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
const RADIO_BTN = 'dxp-radio-button';
/** dxp-radio-button */
export class RadioGroup {
    constructor() {
        /** condition based on which error is shown */
        this.showError = false;
        /** radio button alignment */
        this.alignment = 'horizontal';
    }
    /** Listener that looks for radio buttons object to be assigned/changed externally */
    radioButtonChangeHandler() {
        if (this.radioBtn) {
            const props = this.radioBtn.map(it => (Object.assign(Object.assign({}, it), { alignment: this.alignment, name: this.name })));
            this.base.createNestedMarkup(this.radioContainer, RADIO_BTN, props);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        RadioGroup.useParentAlign = this.alignment;
        RadioGroup.radioName = this.name;
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-radio-button.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        const radioElements = this.element.querySelectorAll(RADIO_BTN);
        if (radioElements.length > 0) {
            for (const radioEle of radioElements) {
                radioEle.setAttribute('name', this.name);
                radioEle.setAttribute('alignment', this.alignment);
            }
            if (this.isDisabled) {
                for (const radioEle of radioElements) {
                    radioEle.setAttribute('is-disabled', this.isDisabled);
                }
            }
        }
        this.radioButtonChangeHandler();
    }
    /** Listener for radio selection */
    radioSelectedHandler(e) {
        this.radioSelect = e.detail;
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** getCheckedStatus method adds the show-error class to radio buttons if radio button is not selected */
    async getCheckedStatus() {
        let dxpRadioGroups = this.element.querySelector(RADIO_BTN) ? this.element.querySelectorAll(RADIO_BTN) : this.element.querySelectorAll(RADIO_BTN);
        this.showError = this.radioSelect ? (this.required ? !this.radioSelect.isChecked : false) : this.required;
        dxpRadioGroups = Array.from(dxpRadioGroups);
        if (dxpRadioGroups.length > 0) {
            if (this.showError) {
                for (const dxpRadioButton of dxpRadioGroups) {
                    dxpRadioButton.setAttribute('show-error', this.showError);
                    dxpRadioButton.querySelector('label').setAttribute('class', 'dxp-error');
                }
            }
            else {
                for (const dxpRadioButton of dxpRadioGroups) {
                    dxpRadioButton.setAttribute('show-error', this.showError);
                    dxpRadioButton.querySelector('label').removeAttribute('class');
                }
            }
        }
    }
    /** Render the radio-button-group */
    render() {
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir },
            h("label", { class: "dxp dxp-radio-group-label", htmlFor: this.label },
                this.required ?
                    h("span", { class: "dxp-required" },
                        " ",
                        h("span", { "aria-hidden": "true" }, "*"))
                    : '',
                this.label),
            h("div", { class: "dxp-radio-group-items" },
                this.radioBtn ? (this.radioBtn.map((object) => {
                    return (h("dxp-radio-button", { alignment: this.alignment, "radio-key": object.radioKey, name: this.name, "radio-value": object.radioValue, "is-disabled": this.isDisabled, checked: object.checked }));
                })) : (h("slot", null)),
                this.showError && !this.isDisabled && h("p", { class: "dxp-error" }, this.validationMessage))));
    }
    static get is() { return "dxp-radio-group"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-radio-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-radio-group.css"]
    }; }
    static get properties() { return {
        "alignment": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'vertical' | 'horizontal'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "radio button alignment"
            },
            "attribute": "alignment",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "contentId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "radio button content id"
            },
            "attribute": "content-id",
            "reflect": false
        },
        "isDisabled": {
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
                "text": "Defines if the field is disabled"
            },
            "attribute": "is-disabled",
            "reflect": false
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "radio button group label"
            },
            "attribute": "label",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "radio button name"
            },
            "attribute": "name",
            "reflect": false
        },
        "required": {
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
                "text": "Defines if the field is required"
            },
            "attribute": "required",
            "reflect": false
        },
        "validationMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Error message will appear if none of radio is selected"
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "radioBtn": {
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
                "text": "object to hold multiple content list items blocks that can be passed as json array"
            },
            "attribute": "radio-btn",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "radioSelect": {},
        "showError": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "radionBtnLoad",
            "name": "radionBtnLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit custom event when radio button is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "getCheckedStatus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "getCheckedStatus method adds the show-error class to radio buttons if radio button is not selected",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "radioBtn",
            "methodName": "radioButtonChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "radioSelected",
            "method": "radioSelectedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
/** static radio button name */
RadioGroup.radioName = 'dxp-radio';
/** static radio button alignment */
RadioGroup.useParentAlign = 'vertical';
