import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const ARIA_INVALID = 'aria-invalid';
/** dxp-textarea */
export class Textarea {
    constructor() {
        /** State of Field (valid or not) */
        this.isValid = true;
        /** To make textarea optional */
        this.isOptional = false;
        /** To allow maximum character in the dxp-textarea, default value is 100 */
        this.maxLength = 100;
        /** To allow maximum character in the dxp-textarea, default value is 100  */
        this.minLength = 0;
        /** textarea value - to display the value text */
        this.value = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.value && this.value.trim().length === 0) {
            this.value = this.value.trim();
        }
    }
    /** Method to handle focus on textarea */
    handleFocus() {
        this.element ?
            this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'false')
            :
                this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'false');
    }
    /** Method to handle keydown */
    handleKey(ev) {
        if (['Backspace', 'Delete'].includes(ev.key)) {
            this.isBackspace = true;
            if (!this.value) {
                if (this.required) {
                    this.isValid = false;
                    this.element ?
                        this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true')
                        :
                            this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true');
                }
            }
        }
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Method to handle change in value of textarea */
    handleChange(event) {
        if (event.key !== 'Tab') {
            this.isValid = true;
            this.element ? this.element.querySelector('textarea').setAttribute('aria-invalid', 'true')
                : this.element.querySelector('textarea').setAttribute('aria-invalid', 'true');
        }
        // emit value for other components to consume
        this.changeText.emit({ value: event.target.value });
        this.value = event.target.value;
        if (this.isBackspace) {
            if (this.value.length === 0) {
                if (!this.required) {
                    this.isValid = true;
                    this.element ?
                        this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true')
                        :
                            this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true');
                    this.isBackspace = false;
                    return;
                }
            }
        }
        if (this.value && this.value.trim().length === 0) {
            this.value = this.value.trim();
            const validationArray = [];
            validationArray.push(this.isRequiredProvided(this.value));
            this.isValid = validationArray.every(it => it);
        }
        else {
            this.isValid = this.isValidInput(this.value);
        }
    }
    /** The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text */
    isRequiredProvided(input) {
        if (this.isOptional === true) {
            return true;
        }
        if (input === '') {
            return false;
        }
        return true;
    }
    /** To validate the input value is in provided pattern or not */
    isValidInput(input) {
        if (this.minLength !== 0) {
            const minvalid = this.isValidMinLength(input);
            if (!minvalid) {
                return false;
            }
        }
        if (this.maxLength !== 0) {
            const maxvalid = this.isValidMaxLength(input);
            if (!maxvalid) {
                return false;
            }
        }
        return this.isRequiredProvided(input);
    }
    /** To validate the input is of a maximum length */
    isValidMaxLength(input) {
        return input && input !== '' && input.length <= this.maxLength;
    }
    /** To validate the input is of a minimum length */
    isValidMinLength(input) {
        return input && input !== '' && input.length >= this.minLength;
    }
    /** Render the textarea */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-textarea render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-textarea.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("label", { htmlFor: this.label, id: "textarea", class: (this.disabled ? 'dxp-disabled' : this.isValid ? '' : 'dxp-error') },
                this.label,
                this.isOptional ?
                    h("span", { class: "dxp-optional" }, " (Optional)")
                    : ''),
            h("textarea", { id: this.label, "aria-labelledby": "textarea", spellcheck: "true", class: `${this.isValid ? '' : 'has-error'} ${this.nonResizable ? 'no-resizable' : ''}
          ${!this.isValid && !this.isOptional ? 'textarea form-control dxp-field-error' : 'textarea form-control'}`, "aria-invalid": "false", "aria-multiline": "true", required: !this.isOptional, "aria-required": !this.isOptional, placeholder: this.placeholder, value: this.value, onKeyUp: event => this.handleChange(event), rows: this.rows, cols: this.cols, maxlength: this.maxLength, minlength: this.minLength, "aria-errormessage": "error", disabled: this.disabled, style: { width: `${this.width}px` } }),
            this.isValid ? '' : h("div", { class: "dxp-error", id: "error", "aria-label": this.validationMessage }, this.validationMessage)));
    }
    static get is() { return "dxp-textarea"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-textarea.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-textarea.css"]
    }; }
    static get properties() { return {
        "cols": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "textarea cols - to change the width of the textarea"
            },
            "attribute": "cols",
            "reflect": false
        },
        "disabled": {
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
                "text": "To make textarea disabled"
            },
            "attribute": "disabled",
            "reflect": false
        },
        "isOptional": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "To make textarea optional"
            },
            "attribute": "is-optional",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "textarea label - to display the label text"
            },
            "attribute": "label",
            "reflect": false
        },
        "maxLength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "To allow maximum character in the dxp-textarea, default value is 100"
            },
            "attribute": "max-length",
            "reflect": false,
            "defaultValue": "100"
        },
        "minLength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "To allow maximum character in the dxp-textarea, default value is 100"
            },
            "attribute": "min-length",
            "reflect": false,
            "defaultValue": "0"
        },
        "nonResizable": {
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
                "text": "To allow textarea resizing"
            },
            "attribute": "non-resizable",
            "reflect": false
        },
        "placeholder": {
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
                "text": "textarea placeholder - to display the place holder text when textarea is empty"
            },
            "attribute": "placeholder",
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
                "text": "textarea required - to make the field like label and value mandatory and display error message"
            },
            "attribute": "required",
            "reflect": false
        },
        "rows": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "textarea rows - to change the height of the textarea"
            },
            "attribute": "rows",
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
                "text": "textarea validationMessage - to display the validation message text"
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "textarea value - to display the value text"
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "textarea rows - to change the height of the textarea"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "isBackspace": {},
        "isValid": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "changeText",
            "name": "changeText",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event listener for any changes in textarea field"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "focus",
            "method": "handleFocus",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKey",
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
