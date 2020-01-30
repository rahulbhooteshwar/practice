'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        passwordCriteria: 'Password criteria: ',
        passwordStrength: 'Password strength: ',
        good: 'Good',
        medium: 'Medium',
        weak: 'Weak'
    }
};

const InputPassword = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.passwordValue = core$1.createEvent(this, "passwordValue", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'InputPassword', messages);
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
            case core$1.dxp.i18n.t('InputPassword:weak'):
                this.statusColor = this.weakPasswordColor ? this.weakPasswordColor : '#cf4500';
                break;
            case core$1.dxp.i18n.t('InputPassword:medium'):
                this.statusColor = this.mediumPasswordColor ? this.mediumPasswordColor : '#ffc61e';
                break;
            case core$1.dxp.i18n.t('InputPassword:good'):
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
            this.passwordStrength = core$1.dxp.i18n.t('InputPassword:good');
        }
        else if (input !== '' && this.mediumPasswordPattern && this.mediumPasswordPattern.test(input)) {
            this.passwordStrength = core$1.dxp.i18n.t('InputPassword:medium');
        }
        else {
            this.passwordStrength = core$1.dxp.i18n.t('InputPassword:weak');
        }
    }
    /** Render progress bar */
    renderProgressbar() {
        return ([!this.isValid && core$1.h("div", { class: "dxp-error", "aria-label": this.validationMessage }, this.validationMessage),
            this.progressBar &&
                core$1.h("div", { class: "progress" }, core$1.h("dxp-progressbar", { "current-value": (this.passwordStrength) ? this.validCount : '0', "progress-color": this.statusColor, height: "5px", "max-value": this.passwordCriteria.length, type: "linear", "have-description": "false" })),
            this.progressBar && this.passwordStrength && this.isValid &&
                core$1.h("div", { class: "password-stength" }, core$1.h("p", { class: "strength-text", "aria-label": core$1.dxp.i18n.t('InputPassword:passwordStrength') }, core$1.dxp.i18n.t('InputPassword:passwordStrength'), core$1.h("strong", null, core$1.h("span", { "aria-label": this.passwordStrength }, this.passwordStrength)))),
            this.passwordCriteria && this.iconType !== 'success' && this.showCriteria &&
                core$1.h("ul", { class: "criteria-list" }, core$1.h("span", { class: "password-criteria", "aria-label": core$1.dxp.i18n.t('InputPassword:passwordCriteria') }, " ", core$1.dxp.i18n.t('InputPassword:passwordCriteria')), this.passwordCriteria.map((key) => core$1.h("li", null, core$1.h("p", { "aria-label": key.valid === true ?
                        `${this.instructionText} ${key.criteria} criteria meets the expectation` : `${this.instructionText} ${key.criteria} criteria not meets the expectation` }, core$1.h("i", { class: key.valid ? 'icon-sprite success-circle-green' : 'icon-sprite dot-g' }), core$1.h("span", null, key.criteria)))))
        ]);
    }
    /** Render Validation Error */
    renderValidationError() {
        return ([!this.isValid &&
                core$1.h("span", { class: "tooltip", onClick: () => this.errorIconClick() }, core$1.h("span", { class: `input-icon icon-sprite error-circle-red ${this.disabled ? 'disabled' : ''}`, id: "passwordErrorIcon", "aria-label": this.errorIconAccessibilityText }), this.errorIconText &&
                    core$1.h("span", { class: `tooltip-text ${this.showTooltip ? 'show-tooltip' : ''}`, id: "passwordErrorText", "aria-label": this.errorIconText, innerHTML: this.errorIconText })),
            this.iconType === 'help' && this.isValid &&
                core$1.h("span", { class: "tooltip", onClick: () => this.helpIconClick() }, core$1.h("span", { class: `input-icon icon-sprite help-g ${this.disabled ? 'disabled' : ''}`, tabindex: "0", id: "passwordHelpIcon", "aria-label": this.helpIconAccessibilityText }), this.helpIconText &&
                    core$1.h("span", { class: `tooltip-text ${this.showTooltip && !this.disabled ? 'show-tooltip' : ''}`, id: "passwordHelpText", "aria-label": this.helpIconText, innerHTML: this.helpIconText })),
            this.iconType === 'success' && this.isValid &&
                core$1.h("span", null, core$1.h("span", { class: `input-icon icon-sprite success-circle-green ${this.disabled ? 'disabled' : ''}`, id: "passwordSuccessIcon", "aria-label": this.successIconAccessibilityText }))
        ]);
    }
    /** Render the input-password */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-input-password render() : ${"DEVELOPMENT"}`);
        this.validationMessage = this.validationMessage === '' ? 'Please enter valid password' : this.validationMessage;
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-input-password.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, (this.label && this.label.trim() !== '') &&
            core$1.h("label", { "aria-label": this.label, class: (this.disabled ?
                    'dxp-disabled dxp-inputbox-label' : this.isValid ? 'dxp-inputbox-label' : 'dxp-inputbox-label dxp-error'), htmlFor: this.label }, this.label, this.isOptional && core$1.h("span", null, " (optional)"), this.isRequired && core$1.h("span", { class: "dxp-required" }, core$1.h("span", { "aria-hidden": "true" }, "*"))), core$1.h("div", { class: "input-container" }, core$1.h("input", { type: this.unmaskValue ? 'text' : 'password', id: this.contentId, class: `input-box ${this.isValid ? '' : 'has-error'} ${!this.isValid || this.iconType !== 'none' ? 'input-with-icon' : ''}`, "aria-invalid": !this.isValid, "aria-label": this.accessibilityText, placeholder: this.placeholder, onInput: event => this.handleChange(event), disabled: this.disabled, autofocus: this.autoFocus, autocomplete: "off", onBlur: () => this.handleBlur() }), this.renderValidationError()), this.renderProgressbar()));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-input-password .input-container{position:relative;width:100%}div.dxp.dxp-input-password .dxp-inputbox-label{margin-bottom:.25rem}div.dxp.dxp-input-password .input-box{display:block;width:100%;height:2.5rem;padding:.5rem .75rem;border-radius:.25rem}div.dxp.dxp-input-password .input-box::-ms-clear{display:none}div.dxp.dxp-input-password .input-box.input-with-icon{padding-right:2.5rem}div.dxp.dxp-input-password .input-box:disabled{cursor:not-allowed}div.dxp.dxp-input-password .progress{margin:.625rem 0 .3125rem 0}div.dxp.dxp-input-password .password-stength .strength-text{margin-bottom:1.25rem;margin-top:0;line-height:1}div.dxp.dxp-input-password .input-icon{position:absolute;right:.5rem;top:.75rem}div.dxp.dxp-input-password .input-icon.disabled{pointer-events:none;opacity:.5}div.dxp.dxp-input-password .criteria-list{margin-bottom:.875rem}div.dxp.dxp-input-password .criteria-list .password-criteria{margin-bottom:.75rem;display:block}div.dxp.dxp-input-password .criteria-list li{display:block}div.dxp.dxp-input-password .criteria-list li p{position:relative;padding-left:1.5625rem;margin:0}div.dxp.dxp-input-password .criteria-list li p i{position:absolute;left:0;top:.09375rem}div.dxp.dxp-input-password .criteria-list li+li{margin-top:.625rem}div.dxp.dxp-input-password .tooltip .tooltip-text{display:block;border-radius:.3125rem;visibility:hidden;width:16.25rem;text-align:left;padding:.9375rem 1.0625rem;bottom:2rem;right:-.2rem;position:absolute;z-index:9}div.dxp.dxp-input-password .tooltip .tooltip-text:before{content:\"\";display:inline-block;width:.75rem;height:.75rem;position:absolute;bottom:-.3125rem;-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:-1}div.dxp.dxp-input-password .tooltip .tooltip-text.password-tooltip{right:auto;left:calc(100% + .625rem);bottom:auto;top:-.9375rem}div.dxp.dxp-input-password .tooltip .tooltip-text.password-tooltip:before{right:auto;left:-.3125rem;bottom:auto;top:1.0625rem}div.dxp.dxp-input-password .tooltip .show-tooltip{visibility:visible}div.dxp.dxp-input-password[dir=rtl] .input-icon{left:.75rem;right:auto}div.dxp.dxp-input-password[dir=rtl] .input-box.input-with-icon{padding-left:2.5rem;padding-right:.75rem}div.dxp.dxp-input-password[dir=rtl] .criteria-list li p{padding-right:1.5625rem;margin-left:0}div.dxp.dxp-input-password[dir=rtl] .criteria-list li p i{right:0;left:auto}div.dxp.dxp-input-password[dir=rtl] .password-stength .strength-text{direction:rtl}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text{left:-.2rem;right:auto;text-align:right}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text:before{right:auto;left:1.125rem}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text.password-tooltip{left:auto;right:calc(100% + .625rem)}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text.password-tooltip:before{left:auto;right:-.3125rem}"; }
};

exports.dxp_input_password = InputPassword;
