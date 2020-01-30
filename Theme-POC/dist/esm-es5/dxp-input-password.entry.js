var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        passwordCriteria: 'Password criteria: ',
        passwordStrength: 'Password strength: ',
        good: 'Good',
        medium: 'Medium',
        weak: 'Weak'
    }
};
var InputPassword = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
        this.passwordValue = createEvent(this, "passwordValue", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'InputPassword', messages);
        this.iconTypeInfo = this.iconType;
        this.colorChoose();
    };
    /** To update the progress bar width after component update */
    class_1.prototype.componentDidUpdate = function () {
        this.colorChoose();
    };
    /**
     * click listener for routing events on anchor tag
     */
    // @Listen('click', { capture: true })
    // routingHandler (event) {
    //   // this.base.routingEventListener(event)
    // }
    /** for mouse click outside of  component */
    class_1.prototype.clickEvent = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                element = e.target;
                if (e.target) {
                    element = e.target.activeElement;
                }
                if (element && !element.classList.contains('tooltip-text') && !element.classList.contains('input-icon')) {
                    this.showTooltip = false;
                }
                return [2 /*return*/];
            });
        });
    };
    /** Method to handle blur of password */
    class_1.prototype.handleBlur = function () {
        this.showCriteria = false;
        this.isOptional ? this.isValid = true : this.isValid = this.isRequiredProvided(this.value);
    };
    /** Method to handle focus on password */
    class_1.prototype.handleFocus = function () {
        this.showCriteria = true;
    };
    /** Method to handle keydown of input password */
    class_1.prototype.handleKeyDown = function (ev) {
        var target = ev.target && ev.target ? ev.composedPath()[0] : ev.target;
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
    };
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     * @memberof Input-password
     */
    class_1.prototype.handleChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, criteria;
            return __generator(this, function (_b) {
                // emit value for other components to consume
                if (this.isValidate) {
                    this.passwordValue.emit({ value: event.target.value });
                    this.value = event.target.value;
                    if (this.value === '' && this.passwordCriteria) {
                        this.passwordStrength = undefined;
                        if (this.isOptional) {
                            this.isValid = true;
                        }
                        for (_i = 0, _a = this.passwordCriteria; _i < _a.length; _i++) {
                            criteria = _a[_i];
                            criteria.valid = false;
                        }
                    }
                    else {
                        this.isValidPassword(this.value);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Check password criteria
     * @param input
     */
    class_1.prototype.checkPasswordCriteria = function (input) {
        var validCount = 0;
        for (var _i = 0, _a = this.passwordCriteria; _i < _a.length; _i++) {
            var criteria = _a[_i];
            var pattern = new RegExp(criteria.pattern);
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
            var helpTooltip = this.getCurrentElement();
            this.iconType = 'success';
            if (helpTooltip && helpTooltip.querySelector('.tooltip-text')) {
                if (this.iconTypeInfo === 'help') {
                    helpTooltip.querySelector('.tooltip-text').removeAttribute('style');
                }
            }
        }
        else {
            var helpTooltip = this.getCurrentElement();
            if (helpTooltip) {
                this.iconTypeInfo === 'help' ? this.iconType = 'help' : this.iconType = 'none';
            }
        }
    };
    /** to choose color as per strength */
    class_1.prototype.colorChoose = function () {
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
    };
    /**
     * handles the error icon click event
     * @param {*}
     * @memberof Input-password
     */
    class_1.prototype.errorIconClick = function () {
        this.showTooltip = !this.showTooltip;
    };
    /**
     * returns the current element
     * @memberof Input-password
     */
    class_1.prototype.getCurrentElement = function () {
        return this.element ? this.element : this.element;
    };
    /**
     *  handles the help icon click event
     * @param {*}
     * @memberof Input-password
     */
    class_1.prototype.helpIconClick = function () {
        this.showTooltip = !this.showTooltip;
    };
    /**
     * The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    class_1.prototype.isRequiredProvided = function (input) {
        if (input === '' || input.length <= this.minLength) {
            return false;
        }
        return true;
    };
    /**
     * To validate the input password
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    class_1.prototype.isValidPassword = function (input) {
        if (input !== '') {
            this.isValidPattern(input);
        }
    };
    /**
     * To validate the input is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    class_1.prototype.isValidPattern = function (input) {
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
    };
    /** Render progress bar */
    class_1.prototype.renderProgressbar = function () {
        var _this = this;
        return ([!this.isValid && h("div", { class: "dxp-error", "aria-label": this.validationMessage }, this.validationMessage),
            this.progressBar &&
                h("div", { class: "progress" }, h("dxp-progressbar", { "current-value": (this.passwordStrength) ? this.validCount : '0', "progress-color": this.statusColor, height: "5px", "max-value": this.passwordCriteria.length, type: "linear", "have-description": "false" })),
            this.progressBar && this.passwordStrength && this.isValid &&
                h("div", { class: "password-stength" }, h("p", { class: "strength-text", "aria-label": dxp.i18n.t('InputPassword:passwordStrength') }, dxp.i18n.t('InputPassword:passwordStrength'), h("strong", null, h("span", { "aria-label": this.passwordStrength }, this.passwordStrength)))),
            this.passwordCriteria && this.iconType !== 'success' && this.showCriteria &&
                h("ul", { class: "criteria-list" }, h("span", { class: "password-criteria", "aria-label": dxp.i18n.t('InputPassword:passwordCriteria') }, " ", dxp.i18n.t('InputPassword:passwordCriteria')), this.passwordCriteria.map(function (key) { return h("li", null, h("p", { "aria-label": key.valid === true ?
                        _this.instructionText + " " + key.criteria + " criteria meets the expectation" : _this.instructionText + " " + key.criteria + " criteria not meets the expectation" }, h("i", { class: key.valid ? 'icon-sprite success-circle-green' : 'icon-sprite dot-g' }), h("span", null, key.criteria))); }))
        ]);
    };
    /** Render Validation Error */
    class_1.prototype.renderValidationError = function () {
        var _this = this;
        return ([!this.isValid &&
                h("span", { class: "tooltip", onClick: function () { return _this.errorIconClick(); } }, h("span", { class: "input-icon icon-sprite error-circle-red " + (this.disabled ? 'disabled' : ''), id: "passwordErrorIcon", "aria-label": this.errorIconAccessibilityText }), this.errorIconText &&
                    h("span", { class: "tooltip-text " + (this.showTooltip ? 'show-tooltip' : ''), id: "passwordErrorText", "aria-label": this.errorIconText, innerHTML: this.errorIconText })),
            this.iconType === 'help' && this.isValid &&
                h("span", { class: "tooltip", onClick: function () { return _this.helpIconClick(); } }, h("span", { class: "input-icon icon-sprite help-g " + (this.disabled ? 'disabled' : ''), tabindex: "0", id: "passwordHelpIcon", "aria-label": this.helpIconAccessibilityText }), this.helpIconText &&
                    h("span", { class: "tooltip-text " + (this.showTooltip && !this.disabled ? 'show-tooltip' : ''), id: "passwordHelpText", "aria-label": this.helpIconText, innerHTML: this.helpIconText })),
            this.iconType === 'success' && this.isValid &&
                h("span", null, h("span", { class: "input-icon icon-sprite success-circle-green " + (this.disabled ? 'disabled' : ''), id: "passwordSuccessIcon", "aria-label": this.successIconAccessibilityText }))
        ]);
    };
    /** Render the input-password */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-input-password render() : " + "DEVELOPMENT");
        this.validationMessage = this.validationMessage === '' ? 'Please enter valid password' : this.validationMessage;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-input-password.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, (this.label && this.label.trim() !== '') &&
            h("label", { "aria-label": this.label, class: (this.disabled ?
                    'dxp-disabled dxp-inputbox-label' : this.isValid ? 'dxp-inputbox-label' : 'dxp-inputbox-label dxp-error'), htmlFor: this.label }, this.label, this.isOptional && h("span", null, " (optional)"), this.isRequired && h("span", { class: "dxp-required" }, h("span", { "aria-hidden": "true" }, "*"))), h("div", { class: "input-container" }, h("input", { type: this.unmaskValue ? 'text' : 'password', id: this.contentId, class: "input-box " + (this.isValid ? '' : 'has-error') + " " + (!this.isValid || this.iconType !== 'none' ? 'input-with-icon' : ''), "aria-invalid": !this.isValid, "aria-label": this.accessibilityText, placeholder: this.placeholder, onInput: function (event) { return _this.handleChange(event); }, disabled: this.disabled, autofocus: this.autoFocus, autocomplete: "off", onBlur: function () { return _this.handleBlur(); } }), this.renderValidationError()), this.renderProgressbar()));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-input-password .input-container{position:relative;width:100%}div.dxp.dxp-input-password .dxp-inputbox-label{margin-bottom:.25rem}div.dxp.dxp-input-password .input-box{display:block;width:100%;height:2.5rem;padding:.5rem .75rem;border-radius:.25rem}div.dxp.dxp-input-password .input-box::-ms-clear{display:none}div.dxp.dxp-input-password .input-box.input-with-icon{padding-right:2.5rem}div.dxp.dxp-input-password .input-box:disabled{cursor:not-allowed}div.dxp.dxp-input-password .progress{margin:.625rem 0 .3125rem 0}div.dxp.dxp-input-password .password-stength .strength-text{margin-bottom:1.25rem;margin-top:0;line-height:1}div.dxp.dxp-input-password .input-icon{position:absolute;right:.5rem;top:.75rem}div.dxp.dxp-input-password .input-icon.disabled{pointer-events:none;opacity:.5}div.dxp.dxp-input-password .criteria-list{margin-bottom:.875rem}div.dxp.dxp-input-password .criteria-list .password-criteria{margin-bottom:.75rem;display:block}div.dxp.dxp-input-password .criteria-list li{display:block}div.dxp.dxp-input-password .criteria-list li p{position:relative;padding-left:1.5625rem;margin:0}div.dxp.dxp-input-password .criteria-list li p i{position:absolute;left:0;top:.09375rem}div.dxp.dxp-input-password .criteria-list li+li{margin-top:.625rem}div.dxp.dxp-input-password .tooltip .tooltip-text{display:block;border-radius:.3125rem;visibility:hidden;width:16.25rem;text-align:left;padding:.9375rem 1.0625rem;bottom:2rem;right:-.2rem;position:absolute;z-index:9}div.dxp.dxp-input-password .tooltip .tooltip-text:before{content:\"\";display:inline-block;width:.75rem;height:.75rem;position:absolute;bottom:-.3125rem;-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:-1}div.dxp.dxp-input-password .tooltip .tooltip-text.password-tooltip{right:auto;left:calc(100% + .625rem);bottom:auto;top:-.9375rem}div.dxp.dxp-input-password .tooltip .tooltip-text.password-tooltip:before{right:auto;left:-.3125rem;bottom:auto;top:1.0625rem}div.dxp.dxp-input-password .tooltip .show-tooltip{visibility:visible}div.dxp.dxp-input-password[dir=rtl] .input-icon{left:.75rem;right:auto}div.dxp.dxp-input-password[dir=rtl] .input-box.input-with-icon{padding-left:2.5rem;padding-right:.75rem}div.dxp.dxp-input-password[dir=rtl] .criteria-list li p{padding-right:1.5625rem;margin-left:0}div.dxp.dxp-input-password[dir=rtl] .criteria-list li p i{right:0;left:auto}div.dxp.dxp-input-password[dir=rtl] .password-stength .strength-text{direction:rtl}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text{left:-.2rem;right:auto;text-align:right}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text:before{right:auto;left:1.125rem}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text.password-tooltip{left:auto;right:calc(100% + .625rem)}div.dxp.dxp-input-password[dir=rtl] .tooltip .tooltip-text.password-tooltip:before{left:auto;right:-.3125rem}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { InputPassword as dxp_input_password };
