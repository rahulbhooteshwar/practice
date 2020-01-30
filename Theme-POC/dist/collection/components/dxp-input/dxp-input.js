import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { h } from "@stencil/core";
import { CardUtility } from './card-utility';
const VIEW_PASS_ICON = 'view-pass-icon';
/**
 * DXP Input Component is a wrapper over input tag (`<input></input>`) available in standard HTML.
 * At present it handles the following type:
 * Standard Types:
 * 1. Text
 * 2. Email
 * 3. Password
 * 4. Number
 * 5. Search
 * 6. Tel
 *
 * Custom Type:
 * 1. Card
 * @export
 * @class Input
 */
export class Input {
    constructor() {
        /**
         * temporary store of card info
         */
        this.cardInfo = [];
        /**
         * Defines listener attached to field or not
         *
         * @memberof Input
         */
        this.isListenerAttached = false;
        /**
         * Is password Field
         *
         * @memberof Input
         */
        this.isPassword = false;
        // name should be changed
        /**
         * Checks is field type is card
         */
        this.isTypeCard = false;
        /**
         * State of Field (valid or not)
         *
         * @memberof Input
         */
        this.isValid = true;
        /**
         * State of Field (validate or not)
         *
         * @memberof Input
         */
        this.isValidate = false;
        /**
         * This attribute specifies that the input field should automatically get focus when the page loads
         *
         * @memberof Input
         */
        this.autoFocus = false;
        /**
         * It specifies that the input field is disabled
         *
         * @memberof Input
         */
        this.disabled = false;
        /**
         * This attribute specifies whether a form or input field should have auto complete on or off
         *
         * @memberof Input
         */
        this.enableAutocomplete = 'off';
        /**
         * This attribute specifies that an input field must be optional before submitting the form
         * @ignore
         * @memberof Input
         */
        this.isOptional = false;
        /**
         * This attribute specifies that an input field must be filled out before submitting the form
         * @ignore
         * @memberof Input
         */
        this.isRequired = false;
        /**
         * The min attribute specify the maximum value for an input element (number, range)
         *
         * @memberof Input
         */
        this.max = '';
        /**
         * To allow maximum character in the dxp-input, default value is 100
         *
         * @memberof Input
         */
        this.maxLength = 100;
        /**
         * The min attribute specify the minimum value for an input element (number, range)
         *
         * @memberof Input
         */
        this.min = '';
        /**
         * To allow minimum character in the dxp-input, default value is 0
         *
         * @memberof Input
         */
        this.minLength = 0;
        /**
         * It specifies that the input field is read only
         *
         * @memberof Input
         */
        this.readonly = false;
        /**
         * This attribute specifies the legal number intervals for an input element
         *
         * @memberof Input
         */
        this.step = '';
        /**
         * To set the type of dxp-input
         * @requires
         * @type {*}
         * @memberof Input
         */
        this.type = 'text';
        /**
         * To define the validation message if dxp-input is set to required
         *
         * @memberof Input
         */
        this.validationMessage = '';
        /**
         * To set default value of the dxp-input
         *
         * @type {*}
         * @memberof Input
         */
        this.value = '';
        /**
         * The width attributes specify the width of an input type image element
         *
         * @memberof Input
         */
        this.width = '';
    }
    /**
     * Component Life cycle Method
     * Method loads before render() method
     * @memberof Input
     */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        // It is used for disabling the validation message provided by native behaviour of 'required' in markup
        document.addEventListener('invalid', (() => {
            return e => {
                e.preventDefault();
            };
        })(), true);
        this.type === 'password' ? this.isPassword = true : this.isPassword = false;
        if (this.type === 'card') {
            this.type = 'text';
            this.isTypeCard = true;
        }
    }
    /** Method to handle keydown of input type */
    handleBlur(ev) {
        if (!this.isValidate) {
            if (ev.key !== 'Tab') {
                this.isValidate = true;
                this.isValid = true;
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     * @memberof Input
     */
    async handleChange(event) {
        // emit value for other components to consume
        if (this.isValidate) {
            this.textValue.emit({ value: event.target.value });
            this.value = event.target.value;
            if (this.isTypeCard) {
                this.handleCard(event);
                const validationArray = [];
                if (this.value !== '') {
                    validationArray.push(this.isValid);
                }
                validationArray.push(this.isRequiredProvided(this.value));
                this.isValid = validationArray.every(it => it);
            }
            else {
                this.isValid = this.isValidInput(this.value);
            }
        }
    }
    /**
     * this method will be used to update isValid flag
     * to show/hide validation message
     * @param isValid
     */
    async updateValidationState(isValid) {
        this.isValid = isValid;
    }
    /**
     * The aim of this function is to provide the validation for card input type
     */
    handleCard(event) {
        const isNumber = isNaN(Number(event.target.value.split(' ').join('')));
        if (!isNumber) {
            const result = new CardUtility().formatCardNumber(event.target.value);
            if (result !== false) {
                this.value = result.value;
                this.cardType = result.cardType.type;
                this.maxLength = result.cardType.maxCardNumberLength;
                if (this.value.length === this.maxLength) {
                    this.isValid = true;
                    if (this.cardType === 'fake') {
                        this.isValid = false;
                    }
                }
                else {
                    this.isValid = false;
                }
            }
            else {
                this.isValid = result;
                this.cardType = '';
                this.maxLength = 16;
            }
        }
        else {
            if (this.value.length !== 0) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
            else {
                this.value = '';
            }
        }
    }
    /**
     * The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isRequiredProvided(input) {
        if (this.isOptional === true) {
            return true;
        }
        if (input === '') {
            return false;
        }
        return true;
    }
    /**
     * To validate the Card detail is valid or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidCardInput(input) {
        if (this.isTypeCard) {
            if (this.value.length !== 19) {
                if (this.cardInfo.length !== 3) {
                    this.cardInfo.push(input);
                }
                else {
                    this.value = `${this.value}-`;
                    this.cardInfo = [];
                }
                return false;
            }
            this.textValue.emit({ value: this.value.replace(/-/g, '') });
            return true;
        }
    }
    /**
     * To validate the input value is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidInput(input) {
        if (this.type === 'email') {
            if (this.pattern === undefined) {
                /* tslint:disable */
                this.pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            }
        }
        if (this.type === 'url' && this.isOptional === false) {
            return this.isValidUrlPattern(input);
        }
        if (this.type === 'password') {
            return this.isValidPassword(input);
        }
        if (this.type === 'number') {
            return this.isValidNumber(input);
        }
        if (this.minLength !== 0) {
            const minvalid = this.isValidMinLength(input);
            if (!minvalid) {
                return false;
            }
        }
        if (this.pattern !== undefined) {
            return this.isValidPattern(input);
        }
        return this.isRequiredProvided(input);
    }
    /**
     * To validate the input is of a minimum length
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidMinLength(input) {
        return input !== '' && input.length > this.minLength;
    }
    /**
     * To validate the input is in provided number range or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidNumber(input) {
        const validationArray = [];
        validationArray.push(this.isRequiredProvided(input));
        if (input === '') {
            input = 0;
        }
        if (this.min !== '') {
            validationArray.push(parseInt(this.min, 10) <= parseInt(input, 10));
        }
        if (this.max !== '') {
            validationArray.push(parseInt(this.max, 10) >= parseInt(input, 10));
        }
        validationArray.push(this.isValidPattern(input));
        return validationArray.every(it => it);
    }
    /**
     * To validate the input password is in provided length or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidPassword(input) {
        const isValidPass = this.isRequiredProvided(input);
        if (isValidPass) {
            if (input.length >= this.minLength) {
                return this.isValidPattern(input);
            }
            return false;
        }
        return false;
    }
    /**
     * To validate the input is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidPattern(input) {
        this.pattern = new RegExp(this.pattern);
        if (input !== '' && !this.pattern.test(input)) {
            return false;
        }
        return this.isRequiredProvided(input);
    }
    /**
     * To validate the input URL is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidUrlPattern(input) {
        if (this.pattern === undefined) {
            // To support various url format which native url type doesn't support
            const customUrlPattern = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
            return (input !== '' && customUrlPattern.test(input));
        }
        return this.isValidPattern(input);
    }
    /**
     * handles the password field layout
     *
     * @param {*} e
     * @memberof Input
     */
    togglePasswordIcon(e) {
        this.type = 'text';
        if (!e.target.classList.contains(VIEW_PASS_ICON)) {
            e.target.classList.remove('hide-pass-icon');
            e.target.classList.add(VIEW_PASS_ICON);
        }
        else {
            e.target.classList.remove(VIEW_PASS_ICON);
            e.target.classList.add('hide-pass-icon');
        }
    }
    /**
     *
     * Renders the component - component life cycle method
     * @returns
     * @memberof Input
     */
    render() {
        this.validationMessage = this.validationMessage === '' ? 'Please enter a valid ' + (this.label ? this.label : 'field') : this.validationMessage;
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-input.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("label", { class: (this.disabled ? 'dxp-disabled dxp-inputbox-label' : this.isValid ? 'dxp-inputbox-label' : 'dxp-inputbox-label dxp-error'), htmlFor: this.label },
                this.label,
                this.isOptional ?
                    h("span", { class: "dxp-optional" }, " (Optional)")
                    : ''),
            h("div", { class: "input-container" },
                h("input", { class: this.isValid ? '' : 'has-error', type: this.type, id: this.contentId, name: this.name, spellcheck: this.spellcheckRequired, "aria-invalid": !this.isValid, "aria-required": this.isOptional ? '' : 'true', "aria-label": this.accessibilityText, placeholder: this.placeholder, value: this.value, minlength: this.minLength, maxlength: this.maxLength, autocomplete: this.enableAutocomplete, onInput: event => this.handleChange(event), autoComplete: this.enableAutocomplete, readonly: this.readonly, disabled: this.disabled, autofocus: this.autoFocus, height: this.height, width: this.width, min: this.min, max: this.max, step: this.step, pattern: this.pattern }),
                !this.isValid && h("span", { class: "input-icon icon-sprite error-circle-red" }),
                this.isTypeCard ? h("span", { class: 'icon-inputs ' + this.cardType }) : '',
                this.isPassword ? h("span", { class: "icon-inputs view-pass-icon", onClick: e => this.togglePasswordIcon(e) }) : ''),
            this.isValid ? '' : h("div", { class: "dxp-error", id: "errMsg", "aria-label": this.validationMessage }, this.validationMessage)));
    }
    static get is() { return "dxp-input"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-input.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-input.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "define the Accessibility Text"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "ariaInvalid": {
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
                "tags": [{
                        "text": "{boolean}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "validate Aria Valid or not"
            },
            "attribute": "aria-invalid",
            "reflect": false
        },
        "ariaRequired": {
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
                "tags": [{
                        "text": "{boolean}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "Define Aria required or not"
            },
            "attribute": "aria-required",
            "reflect": false
        },
        "autoFocus": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies that the input field should automatically get focus when the page loads"
            },
            "attribute": "auto-focus",
            "reflect": false,
            "defaultValue": "false"
        },
        "contentId": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To set unique identifier to the selector"
            },
            "attribute": "content-id",
            "reflect": false
        },
        "cssClass": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "define the css classes used for this tag"
            },
            "attribute": "css-class",
            "reflect": false
        },
        "disabled": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "It specifies that the input field is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "enableAutocomplete": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies whether a form or input field should have auto complete on or off"
            },
            "attribute": "enable-autocomplete",
            "reflect": false,
            "defaultValue": "'off'"
        },
        "height": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "The height attributes specify the height of an input type image element"
            },
            "attribute": "height",
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
                "tags": [{
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies that an input field must be optional before submitting the form"
            },
            "attribute": "is-optional",
            "reflect": false,
            "defaultValue": "false"
        },
        "isRequired": {
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
                "tags": [{
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies that an input field must be filled out before submitting the form"
            },
            "attribute": "is-required",
            "reflect": false,
            "defaultValue": "false"
        },
        "label": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To set label of the dxp-input"
            },
            "attribute": "label",
            "reflect": false
        },
        "max": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "The min attribute specify the maximum value for an input element (number, range)"
            },
            "attribute": "max",
            "reflect": false,
            "defaultValue": "''"
        },
        "maxLength": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To allow maximum character in the dxp-input, default value is 100"
            },
            "attribute": "max-length",
            "reflect": false,
            "defaultValue": "100"
        },
        "min": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "The min attribute specify the minimum value for an input element (number, range)"
            },
            "attribute": "min",
            "reflect": false,
            "defaultValue": "''"
        },
        "minLength": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To allow minimum character in the dxp-input, default value is 0"
            },
            "attribute": "min-length",
            "reflect": false,
            "defaultValue": "0"
        },
        "name": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "Name of the field"
            },
            "attribute": "name",
            "reflect": false
        },
        "pattern": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To allow regular expression that the input element's value is checked"
            },
            "attribute": "pattern",
            "reflect": false
        },
        "placeholder": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies a hint that describes the expected value of an input field (a sample value or a short description of the format)."
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "readonly": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "It specifies that the input field is read only"
            },
            "attribute": "readonly",
            "reflect": false,
            "defaultValue": "false"
        },
        "spellcheckRequired": {
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
                "tags": [{
                        "text": "{boolean}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "define spell check required or not"
            },
            "attribute": "spellcheck-required",
            "reflect": false
        },
        "step": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies the legal number intervals for an input element"
            },
            "attribute": "step",
            "reflect": false,
            "defaultValue": "''"
        },
        "type": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To set the type of dxp-input"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'text'"
        },
        "validationMessage": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To define the validation message if dxp-input is set to required"
            },
            "attribute": "validation-message",
            "reflect": false,
            "defaultValue": "''"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "To set default value of the dxp-input"
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
        },
        "width": {
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
                "tags": [{
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "The width attributes specify the width of an input type image element"
            },
            "attribute": "width",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "cardType": {},
        "isValid": {},
        "isValidate": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "textValue",
            "name": "textValue",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "{EventEmitter}",
                        "name": "type"
                    }, {
                        "text": "Input",
                        "name": "memberof"
                    }],
                "text": "Event listener for any changes in input field"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "handleChange": {
            "complexType": {
                "signature": "(event: any) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "event",
                                "name": "param"
                            }],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "this method called on any change in input field\nit validates the field information",
                "tags": [{
                        "name": "param",
                        "text": "event"
                    }, {
                        "name": "memberof",
                        "text": "Input"
                    }]
            }
        },
        "updateValidationState": {
            "complexType": {
                "signature": "(isValid: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "isValid",
                                "name": "param"
                            }],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "this method will be used to update isValid flag\nto show/hide validation message",
                "tags": [{
                        "name": "param",
                        "text": "isValid"
                    }]
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleBlur",
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
