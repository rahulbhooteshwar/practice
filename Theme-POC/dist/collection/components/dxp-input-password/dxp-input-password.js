import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-input-password */
export class InputPassword {
    constructor() {
        /**
         * State of Field (valid or not)
         *
         * @memberof Input-password
         */
        this.isValid = true;
        /**
         * State of Field (validate or not)
         *
         * @memberof Input-password
         */
        this.isValidate = false;
        /**
         * This attribute specifies that the input field should automatically get focus when the page loads
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.autoFocus = false;
        /**
         * It specifies that the input field is disabled
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.disabled = false;
        /**
         * This attribute specifies that an input field need the icon or not
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.iconType = 'none';
        /**
         * To store icon type value for further use
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.iconTypeInfo = 'none';
        /**
         * To define the support text for password criterias to make more understandable
         * @requires
         * @ignore
         * @memberof Input-input
         */
        this.instructionText = '';
        /**
         * This attribute specifies that an input field is optional
         * @requires
         * @ignore
         * @memberof Input-input
         */
        this.isOptional = false;
        /**
         * This attribute specifies that an input field must be filled out before submitting the form
         * @requires
         * @ignore
         * @memberof Input-input
         */
        this.isRequired = false;
        /**
         * To allow minimum character in the dxp-input-password, default value is 0
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.minLength = 0;
        /**
         * It specifies that whether need to show progress bar or not
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.progressBar = false;
        /**
         * It specifies that whether need to show progress bar or not
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.showCriteria = false;
        /**
         * It specifies the  tooltip visibility(show or hide)
         *
         * @memberof Input-password
         */
        this.showTooltip = false;
        /**
         * To define the validation message if dxp-input is set to required
         * @requires
         * @type {*}
         * @memberof Input-password
         */
        this.unmaskValue = false;
        /**
         * To unmask password value in dxp-input
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.validationMessage = '';
        /**
         * valid count of the password criteria
         * @requires
         * ignore
         * @memberof Input-password
         */
        this.validCount = 0;
        /**
         * Value of the password
         * @requires
         * @ignore
         * @memberof Input-password
         */
        this.value = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'InputPassword', messages);
        this.iconTypeInfo = this.iconType;
        this.colorChoose();
    }
    /** To update the progress bar width after component update */
    componentDidUpdate() {
        this.colorChoose();
    }
    /**
     * click listener for routing events on anchor tag
     */
    // @Listen('click', { capture: true })
    // routingHandler (event) {
    //   // this.base.routingEventListener(event)
    // }
    /** for mouse click outside of  component */
    async clickEvent(e) {
        let element = e.target;
        if (e.target) {
            element = e.target.activeElement;
        }
        if (element && !element.classList.contains('tooltip-text') && !element.classList.contains('input-icon')) {
            this.showTooltip = false;
        }
    }
    /** Method to handle blur of password */
    handleBlur() {
        this.showCriteria = false;
        this.isOptional ? this.isValid = true : this.isValid = this.isRequiredProvided(this.value);
    }
    /** Method to handle focus on password */
    handleFocus() {
        this.showCriteria = true;
    }
    /** Method to handle keydown of input password */
    handleKeyDown(ev) {
        const target = ev.target && ev.target ? ev.composedPath()[0] : ev.target;
        if (!this.isValidate) {
            if (ev.key !== 'Tab') {
                this.isValidate = true;
                this.isValid = true;
            }
        }
        if (target && target.classList && (ev.which === 13 || ev.which === 32)) {
            if (target.classList.contains('error-circle-red') || target.classList.contains('help-g')) {
                this.showTooltip = !this.showTooltip;
            }
        }
        if (ev.which === 9) {
            this.showTooltip = false;
        }
    }
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     * @memberof Input-password
     */
    async handleChange(event) {
        // emit value for other components to consume
        if (this.isValidate) {
            this.passwordValue.emit({ value: event.target.value });
            this.value = event.target.value;
            if (this.value === '' && this.passwordCriteria) {
                this.passwordStrength = undefined;
                if (this.isOptional) {
                    this.isValid = true;
                }
                for (const criteria of this.passwordCriteria) {
                    criteria.valid = false;
                }
            }
            else {
                this.isValidPassword(this.value);
            }
        }
    }
    /**
     * Check password criteria
     * @param input
     */
    checkPasswordCriteria(input) {
        let validCount = 0;
        for (const criteria of this.passwordCriteria) {
            const pattern = new RegExp(criteria.pattern);
            if (input.search(pattern) < 0) {
                criteria.valid = false;
            }
            else {
                validCount++;
                criteria.valid = true;
            }
        }
        this.validCount = validCount;
        if (validCount === this.passwordCriteria.length) {
            const helpTooltip = this.getCurrentElement();
            this.iconType = 'success';
            if (helpTooltip && helpTooltip.querySelector('.tooltip-text')) {
                if (this.iconTypeInfo === 'help') {
                    helpTooltip.querySelector('.tooltip-text').removeAttribute('style');
                }
            }
        }
        else {
            const helpTooltip = this.getCurrentElement();
            if (helpTooltip) {
                this.iconTypeInfo === 'help' ? this.iconType = 'help' : this.iconType = 'none';
            }
        }
    }
    /** to choose color as per strength */
    colorChoose() {
        switch (this.passwordStrength) {
            case dxp.i18n.t('InputPassword:weak'):
                this.statusColor = this.weakPasswordColor ? this.weakPasswordColor : '#cf4500';
                break;
            case dxp.i18n.t('InputPassword:medium'):
                this.statusColor = this.mediumPasswordColor ? this.mediumPasswordColor : '#ffc61e';
                break;
            case dxp.i18n.t('InputPassword:good'):
                this.statusColor = this.goodPasswordColor ? this.goodPasswordColor : '#628020';
                break;
            default:
                this.statusColor = this.weakPasswordColor ? this.weakPasswordColor : '#cf4500';
        }
    }
    /**
     * handles the error icon click event
     * @param {*}
     * @memberof Input-password
     */
    errorIconClick() {
        this.showTooltip = !this.showTooltip;
    }
    /**
     * returns the current element
     * @memberof Input-password
     */
    getCurrentElement() {
        return this.element ? this.element : this.element;
    }
    /**
     *  handles the help icon click event
     * @param {*}
     * @memberof Input-password
     */
    helpIconClick() {
        this.showTooltip = !this.showTooltip;
    }
    /**
     * The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    isRequiredProvided(input) {
        if (input === '' || input.length <= this.minLength) {
            return false;
        }
        return true;
    }
    /**
     * To validate the input password
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    isValidPassword(input) {
        if (input !== '') {
            this.isValidPattern(input);
        }
    }
    /**
     * To validate the input is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    isValidPattern(input) {
        this.strongPasswordPattern = this.strongPasswordPattern ? new RegExp(this.strongPasswordPattern) : undefined;
        this.mediumPasswordPattern = this.mediumPasswordPattern ? new RegExp(this.mediumPasswordPattern) : undefined;
        if (input.length > this.minLength) {
            this.isValid = true;
        }
        if (this.passwordCriteria) {
            this.checkPasswordCriteria(input);
        }
        if (input !== '' && this.strongPasswordPattern && this.strongPasswordPattern.test(input)) {
            this.passwordStrength = dxp.i18n.t('InputPassword:good');
        }
        else if (input !== '' && this.mediumPasswordPattern && this.mediumPasswordPattern.test(input)) {
            this.passwordStrength = dxp.i18n.t('InputPassword:medium');
        }
        else {
            this.passwordStrength = dxp.i18n.t('InputPassword:weak');
        }
    }
    /** Render progress bar */
    renderProgressbar() {
        return ([!this.isValid && h("div", { class: "dxp-error", "aria-label": this.validationMessage }, this.validationMessage),
            this.progressBar &&
                h("div", { class: "progress" },
                    h("dxp-progressbar", { "current-value": (this.passwordStrength) ? this.validCount : '0', "progress-color": this.statusColor, height: "5px", "max-value": this.passwordCriteria.length, type: "linear", "have-description": "false" })),
            this.progressBar && this.passwordStrength && this.isValid &&
                h("div", { class: "password-stength" },
                    h("p", { class: "strength-text", "aria-label": dxp.i18n.t('InputPassword:passwordStrength') },
                        dxp.i18n.t('InputPassword:passwordStrength'),
                        h("strong", null,
                            h("span", { "aria-label": this.passwordStrength }, this.passwordStrength)))),
            this.passwordCriteria && this.iconType !== 'success' && this.showCriteria &&
                h("ul", { class: "criteria-list" },
                    h("span", { class: "password-criteria", "aria-label": dxp.i18n.t('InputPassword:passwordCriteria') },
                        " ",
                        dxp.i18n.t('InputPassword:passwordCriteria')),
                    this.passwordCriteria.map((key) => h("li", null,
                        h("p", { "aria-label": key.valid === true ?
                                `${this.instructionText} ${key.criteria} criteria meets the expectation` : `${this.instructionText} ${key.criteria} criteria not meets the expectation` },
                            h("i", { class: key.valid ? 'icon-sprite success-circle-green' : 'icon-sprite dot-g' }),
                            h("span", null, key.criteria)))))
        ]);
    }
    /** Render Validation Error */
    renderValidationError() {
        return ([!this.isValid &&
                h("span", { class: "tooltip", onClick: () => this.errorIconClick() },
                    h("span", { class: `input-icon icon-sprite error-circle-red ${this.disabled ? 'disabled' : ''}`, id: "passwordErrorIcon", "aria-label": this.errorIconAccessibilityText }),
                    this.errorIconText &&
                        h("span", { class: `tooltip-text ${this.showTooltip ? 'show-tooltip' : ''}`, id: "passwordErrorText", "aria-label": this.errorIconText, innerHTML: this.errorIconText })),
            this.iconType === 'help' && this.isValid &&
                h("span", { class: "tooltip", onClick: () => this.helpIconClick() },
                    h("span", { class: `input-icon icon-sprite help-g ${this.disabled ? 'disabled' : ''}`, tabindex: "0", id: "passwordHelpIcon", "aria-label": this.helpIconAccessibilityText }),
                    this.helpIconText &&
                        h("span", { class: `tooltip-text ${this.showTooltip && !this.disabled ? 'show-tooltip' : ''}`, id: "passwordHelpText", "aria-label": this.helpIconText, innerHTML: this.helpIconText })),
            this.iconType === 'success' && this.isValid &&
                h("span", null,
                    h("span", { class: `input-icon icon-sprite success-circle-green ${this.disabled ? 'disabled' : ''}`, id: "passwordSuccessIcon", "aria-label": this.successIconAccessibilityText }))
        ]);
    }
    /** Render the input-password */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-input-password render() : ${process.env.MODE}`);
        this.validationMessage = this.validationMessage === '' ? 'Please enter valid password' : this.validationMessage;
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-input-password.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            (this.label && this.label.trim() !== '') &&
                h("label", { "aria-label": this.label, class: (this.disabled ?
                        'dxp-disabled dxp-inputbox-label' : this.isValid ? 'dxp-inputbox-label' : 'dxp-inputbox-label dxp-error'), htmlFor: this.label },
                    this.label,
                    this.isOptional && h("span", null, " (optional)"),
                    this.isRequired && h("span", { class: "dxp-required" },
                        h("span", { "aria-hidden": "true" }, "*"))),
            h("div", { class: "input-container" },
                h("input", { type: this.unmaskValue ? 'text' : 'password', id: this.contentId, class: `input-box ${this.isValid ? '' : 'has-error'} ${!this.isValid || this.iconType !== 'none' ? 'input-with-icon' : ''}`, "aria-invalid": !this.isValid, "aria-label": this.accessibilityText, placeholder: this.placeholder, onInput: event => this.handleChange(event), disabled: this.disabled, autofocus: this.autoFocus, autocomplete: "off", onBlur: () => this.handleBlur() }),
                this.renderValidationError()),
            this.renderProgressbar()));
    }
    static get is() { return "dxp-input-password"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-input-password.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-input-password.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "define the Accessibility Text"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "autoFocus": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
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
            "mutable": false,
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
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To set unique identifier to the selector"
            },
            "attribute": "content-id",
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "It specifies that the input field is disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "errorIconAccessibilityText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To define the accessibility text when foucs is on error icon"
            },
            "attribute": "error-icon-accessibility-text",
            "reflect": false
        },
        "errorIconText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To show the tooltip text on error icon click"
            },
            "attribute": "error-icon-text",
            "reflect": false
        },
        "goodPasswordColor": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To Specifie the color if password strength is good"
            },
            "attribute": "good-password-color",
            "reflect": false
        },
        "helpIconAccessibilityText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To define the accessibility text when foucs is on help icon"
            },
            "attribute": "help-icon-accessibility-text",
            "reflect": false
        },
        "helpIconText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To show the tooltip text on help icon click"
            },
            "attribute": "help-icon-text",
            "reflect": false
        },
        "iconType": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "'error' | 'help' | 'success' | 'none'",
                "resolved": "\"error\" | \"help\" | \"none\" | \"success\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies that an input field need the icon or not"
            },
            "attribute": "icon-type",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "iconTypeInfo": {
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
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To store icon type value for further use"
            },
            "attribute": "icon-type-info",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "instructionText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-input",
                        "name": "memberof"
                    }],
                "text": "To define the support text for password criterias to make more understandable"
            },
            "attribute": "instruction-text",
            "reflect": false,
            "defaultValue": "''"
        },
        "isOptional": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-input",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies that an input field is optional"
            },
            "attribute": "is-optional",
            "reflect": false,
            "defaultValue": "false"
        },
        "isRequired": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-input",
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
            "mutable": false,
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
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To set label of the dxp-input"
            },
            "attribute": "label",
            "reflect": false
        },
        "mediumPasswordColor": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To Specifie the color if password strength is medium"
            },
            "attribute": "medium-password-color",
            "reflect": false
        },
        "mediumPasswordPattern": {
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
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To allow the regular expression of medium password"
            },
            "attribute": "medium-password-pattern",
            "reflect": false
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To allow minimum character in the dxp-input-password, default value is 0"
            },
            "attribute": "min-length",
            "reflect": false,
            "defaultValue": "0"
        },
        "passwordCriteria": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To allow regular expression for the password criteria"
            },
            "attribute": "password-criteria",
            "reflect": false
        },
        "passwordStrength": {
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
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "It specifies that strength of the password"
            },
            "attribute": "password-strength",
            "reflect": false
        },
        "placeholder": {
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
                "tags": [{
                        "text": undefined,
                        "name": "required"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "This attribute specifies a hint that describes the expected value of an input field (a sample value or a short description of the format)."
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "progressBar": {
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
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "It specifies that whether need to show progress bar or not"
            },
            "attribute": "progress-bar",
            "reflect": false,
            "defaultValue": "false"
        },
        "showCriteria": {
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
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "It specifies that whether need to show progress bar or not"
            },
            "attribute": "show-criteria",
            "reflect": false,
            "defaultValue": "false"
        },
        "showTooltip": {
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
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "It specifies the  tooltip visibility(show or hide)"
            },
            "attribute": "show-tooltip",
            "reflect": false,
            "defaultValue": "false"
        },
        "statusColor": {
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
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "color code for password strength"
            },
            "attribute": "status-color",
            "reflect": false
        },
        "strongPasswordPattern": {
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
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To allow the regular expression of strong password"
            },
            "attribute": "strong-password-pattern",
            "reflect": false
        },
        "successIconAccessibilityText": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To define the accessibility text when foucs is on success icon"
            },
            "attribute": "success-icon-accessibility-text",
            "reflect": false
        },
        "unmaskValue": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": "{*}",
                        "name": "type"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To define the validation message if dxp-input is set to required"
            },
            "attribute": "unmask-value",
            "reflect": false,
            "defaultValue": "false"
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
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To unmask password value in dxp-input"
            },
            "attribute": "validation-message",
            "reflect": false,
            "defaultValue": "''"
        },
        "validCount": {
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
                        "text": "ignore",
                        "name": "requires"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "valid count of the password criteria"
            },
            "attribute": "valid-count",
            "reflect": false,
            "defaultValue": "0"
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "Value of the password"
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
        },
        "weakPasswordColor": {
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
                "tags": [{
                        "text": undefined,
                        "name": "requires"
                    }, {
                        "text": undefined,
                        "name": "ignore"
                    }, {
                        "text": "Input-password",
                        "name": "memberof"
                    }],
                "text": "To Specifie the color if password strength is weak"
            },
            "attribute": "weak-password-color",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "isValid": {},
        "isValidate": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "passwordValue",
            "name": "passwordValue",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "{EventEmitter}",
                        "name": "type"
                    }, {
                        "text": "Input-password",
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
                        "text": "Input-password"
                    }]
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickEvent",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "onblur",
            "method": "handleBlur",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "focus",
            "method": "handleFocus",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
