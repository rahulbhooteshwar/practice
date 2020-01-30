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
/**
 * Based on input value
 * CardUtility class is used to find the card type and formating the card details.
 * @export
 * @class CardUtility
 */
var CardUtility = /** @class */ (function () {
    function CardUtility() {
        /**
         * Default CVC Length
         *
         * @memberof CardUtility
         */
        this.DEFAULT_CVC_LENGTH = 3;
        /**
         * Default Zipcode value
         *
         * @memberof CardUtility
         */
        this.DEFAULT_ZIP_LENGTH = 5;
        /**
         * Default Card Format
         *
         * @memberof CardUtility
         */
        this.DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
        /**
         * Different Card Types Used.
         *
         * @memberof CardUtility
         */
        this.CARD_TYPES = [
            {
                type: 'amex',
                format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
                startPattern: /^3[47]/,
                maxCardNumberLength: 17,
                cvcLength: 4
            },
            {
                type: 'dankort',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^5019/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'hipercard',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'dinersclub',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(36|38|30[0-5])/,
                maxCardNumberLength: 14,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'discover',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(6011|65|64[4-9]|622)/,
                maxCardNumberLength: 16,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'jcb',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^35/,
                maxCardNumberLength: 16,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'laser',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(6706|6771|6709)/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'maestro',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'mastercard',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'unionpay',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^62/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH,
                luhn: false
            },
            {
                type: 'visaelectron',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^4(026|17500|405|508|844|91[37])/,
                maxCardNumberLength: 16,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'elo',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
                maxCardNumberLength: 16,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'visa',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^4/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            },
            {
                type: 'fake',
                format: this.DEFAULT_CARD_FORMAT,
                startPattern: /^[0-9]/,
                maxCardNumberLength: 19,
                cvcLength: this.DEFAULT_CVC_LENGTH
            }
        ];
    }
    /**
     * getCardTypeByValue
     * based on input get the Card type
     * @param {*} value
     * @returns
     * @memberof CardUtility
     */
    CardUtility.prototype.getCardTypeByValue = function (value) {
        return this.CARD_TYPES.filter(function (cardType) { return cardType.startPattern.test(value); })[0];
    };
    // This function is used for formatting card number and identifying card type
    /**
     * formatCardNumber
     * Formats the display of card detail
     * @param {*} cardNumber
     * @returns
     * @memberof CardUtility
     */
    CardUtility.prototype.formatCardNumber = function (cardNumber) {
        var cardType = this.getCardTypeByValue(cardNumber);
        if (!cardType) {
            return false;
        }
        var format = cardType.format;
        if (format.global) {
            return { 'value': cardNumber.match(format).join(' '), 'cardType': cardType };
        }
        var execResult = format.exec(cardNumber.split(' ').join(''));
        if (execResult) {
            return { 'value': execResult.splice(1, 3).filter(function (x) { return x; }).join(' '), 'cardType': cardType };
        }
        return cardNumber;
    };
    return CardUtility;
}());
var VIEW_PASS_ICON = 'view-pass-icon';
var Input = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
        this.textValue = createEvent(this, "textValue", 7);
    }
    /**
     * Component Life cycle Method
     * Method loads before render() method
     * @memberof Input
     */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        // It is used for disabling the validation message provided by native behaviour of 'required' in markup
        document.addEventListener('invalid', (function () {
            return function (e) {
                e.preventDefault();
            };
        })(), true);
        this.type === 'password' ? this.isPassword = true : this.isPassword = false;
        if (this.type === 'card') {
            this.type = 'text';
            this.isTypeCard = true;
        }
    };
    /** Method to handle keydown of input type */
    class_1.prototype.handleBlur = function (ev) {
        if (!this.isValidate) {
            if (ev.key !== 'Tab') {
                this.isValidate = true;
                this.isValid = true;
            }
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     * @memberof Input
     */
    class_1.prototype.handleChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var validationArray;
            return __generator(this, function (_a) {
                // emit value for other components to consume
                if (this.isValidate) {
                    this.textValue.emit({ value: event.target.value });
                    this.value = event.target.value;
                    if (this.isTypeCard) {
                        this.handleCard(event);
                        validationArray = [];
                        if (this.value !== '') {
                            validationArray.push(this.isValid);
                        }
                        validationArray.push(this.isRequiredProvided(this.value));
                        this.isValid = validationArray.every(function (it) { return it; });
                    }
                    else {
                        this.isValid = this.isValidInput(this.value);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * this method will be used to update isValid flag
     * to show/hide validation message
     * @param isValid
     */
    class_1.prototype.updateValidationState = function (isValid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isValid = isValid;
                return [2 /*return*/];
            });
        });
    };
    /**
     * The aim of this function is to provide the validation for card input type
     */
    class_1.prototype.handleCard = function (event) {
        var isNumber = isNaN(Number(event.target.value.split(' ').join('')));
        if (!isNumber) {
            var result = new CardUtility().formatCardNumber(event.target.value);
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
    };
    /**
     * The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isRequiredProvided = function (input) {
        if (this.isOptional === true) {
            return true;
        }
        if (input === '') {
            return false;
        }
        return true;
    };
    /**
     * To validate the Card detail is valid or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidCardInput = function (input) {
        if (this.isTypeCard) {
            if (this.value.length !== 19) {
                if (this.cardInfo.length !== 3) {
                    this.cardInfo.push(input);
                }
                else {
                    this.value = this.value + "-";
                    this.cardInfo = [];
                }
                return false;
            }
            this.textValue.emit({ value: this.value.replace(/-/g, '') });
            return true;
        }
    };
    /**
     * To validate the input value is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidInput = function (input) {
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
            var minvalid = this.isValidMinLength(input);
            if (!minvalid) {
                return false;
            }
        }
        if (this.pattern !== undefined) {
            return this.isValidPattern(input);
        }
        return this.isRequiredProvided(input);
    };
    /**
     * To validate the input is of a minimum length
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidMinLength = function (input) {
        return input !== '' && input.length > this.minLength;
    };
    /**
     * To validate the input is in provided number range or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidNumber = function (input) {
        var validationArray = [];
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
        return validationArray.every(function (it) { return it; });
    };
    /**
     * To validate the input password is in provided length or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidPassword = function (input) {
        var isValidPass = this.isRequiredProvided(input);
        if (isValidPass) {
            if (input.length >= this.minLength) {
                return this.isValidPattern(input);
            }
            return false;
        }
        return false;
    };
    /**
     * To validate the input is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidPattern = function (input) {
        this.pattern = new RegExp(this.pattern);
        if (input !== '' && !this.pattern.test(input)) {
            return false;
        }
        return this.isRequiredProvided(input);
    };
    /**
     * To validate the input URL is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    class_1.prototype.isValidUrlPattern = function (input) {
        if (this.pattern === undefined) {
            // To support various url format which native url type doesn't support
            var customUrlPattern = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
            return (input !== '' && customUrlPattern.test(input));
        }
        return this.isValidPattern(input);
    };
    /**
     * handles the password field layout
     *
     * @param {*} e
     * @memberof Input
     */
    class_1.prototype.togglePasswordIcon = function (e) {
        this.type = 'text';
        if (!e.target.classList.contains(VIEW_PASS_ICON)) {
            e.target.classList.remove('hide-pass-icon');
            e.target.classList.add(VIEW_PASS_ICON);
        }
        else {
            e.target.classList.remove(VIEW_PASS_ICON);
            e.target.classList.add('hide-pass-icon');
        }
    };
    /**
     *
     * Renders the component - component life cycle method
     * @returns
     * @memberof Input
     */
    class_1.prototype.render = function () {
        var _this = this;
        this.validationMessage = this.validationMessage === '' ? 'Please enter a valid ' + (this.label ? this.label : 'field') : this.validationMessage;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-input.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, h("label", { class: (this.disabled ? 'dxp-disabled dxp-inputbox-label' : this.isValid ? 'dxp-inputbox-label' : 'dxp-inputbox-label dxp-error'), htmlFor: this.label }, this.label, this.isOptional ?
            h("span", { class: "dxp-optional" }, " (Optional)")
            : ''), h("div", { class: "input-container" }, h("input", { class: this.isValid ? '' : 'has-error', type: this.type, id: this.contentId, name: this.name, spellcheck: this.spellcheckRequired, "aria-invalid": !this.isValid, "aria-required": this.isOptional ? '' : 'true', "aria-label": this.accessibilityText, placeholder: this.placeholder, value: this.value, minlength: this.minLength, maxlength: this.maxLength, autocomplete: this.enableAutocomplete, onInput: function (event) { return _this.handleChange(event); }, autoComplete: this.enableAutocomplete, readonly: this.readonly, disabled: this.disabled, autofocus: this.autoFocus, height: this.height, width: this.width, min: this.min, max: this.max, step: this.step, pattern: this.pattern }), !this.isValid && h("span", { class: "input-icon icon-sprite error-circle-red" }), this.isTypeCard ? h("span", { class: 'icon-inputs ' + this.cardType }) : '', this.isPassword ? h("span", { class: "icon-inputs view-pass-icon", onClick: function (e) { return _this.togglePasswordIcon(e); } }) : ''), this.isValid ? '' : h("div", { class: "dxp-error", id: "errMsg", "aria-label": this.validationMessage }, this.validationMessage)));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-input .input-container{position:relative;width:100%}div.dxp.dxp-input .dxp-inputbox-label{font-size:12px;margin-bottom:.25rem}div.dxp.dxp-input .input-icon{position:absolute;right:.5rem;top:.75rem}div.dxp.dxp-input .icon-inputs{background:transparent url(process.env.DXP_COMPONENT_ASSET_PATH/dxp-input/card-icons-sprite.svg) no-repeat;background-size:650%;background-position-y:5px;display:none;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:5px;width:30px;height:30px}div.dxp.dxp-input.amex,div.dxp.dxp-input.discover,div.dxp.dxp-input.hide-pass-icon,div.dxp.dxp-input.jcp,div.dxp.dxp-input.unionpay,div.dxp.dxp-input.view-pass-icon,div.dxp.dxp-input.visa{display:block}div.dxp.dxp-input .mastercard{background-position-x:0}div.dxp.dxp-input .visa{background-position-x:-32px}div.dxp.dxp-input .amex{background-position-x:-100px}div.dxp.dxp-input .unionpay{background-position-x:-65px}div.dxp.dxp-input .discover{background-position-x:-165px}div.dxp.dxp-input .jcb{background-position-x:-132px}div.dxp.dxp-input .hide-pass-icon{background:transparent url(process.env.DXP_COMPONENT_ASSET_PATH/dxp-input/hide-pass.svg) 2px 9px no-repeat}div.dxp.dxp-input .view-pass-icon{background:transparent url(process.env.DXP_COMPONENT_ASSET_PATH/dxp-input/show-pass.svg) 2px 9px no-repeat}div.dxp.dxp-input [dir=rtl] .hide-pass-mask,div.dxp.dxp-input [dir=rtl] .view-pass-mask{right:auto;left:5px}div.dxp.dxp-input .input-box{display:block;width:100%;height:2.5rem;padding:.625rem 3.25rem .625rem 1rem;font-size:.875rem;line-height:1.25rem}div.dxp.dxp-input .input-box::-ms-clear{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Input as dxp_input };
