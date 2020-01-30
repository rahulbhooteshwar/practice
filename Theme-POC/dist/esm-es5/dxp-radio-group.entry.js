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
var RADIO_BTN = 'dxp-radio-button';
var RadioGroup = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** condition based on which error is shown */
        this.showError = false;
        /** radio button alignment */
        this.alignment = 'horizontal';
        this.radionBtnLoad = createEvent(this, "radionBtnLoad", 7);
    }
    /** Listener that looks for radio buttons object to be assigned/changed externally */
    class_1.prototype.radioButtonChangeHandler = function () {
        var _this = this;
        if (this.radioBtn) {
            var props = this.radioBtn.map(function (it) { return (Object.assign(Object.assign({}, it), { alignment: _this.alignment, name: _this.name })); });
            this.base.createNestedMarkup(this.radioContainer, RADIO_BTN, props);
        }
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        RadioGroup.useParentAlign = this.alignment;
        RadioGroup.radioName = this.name;
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-radio-button.min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        var radioElements = this.element.querySelectorAll(RADIO_BTN);
        if (radioElements.length > 0) {
            for (var _i = 0, radioElements_1 = radioElements; _i < radioElements_1.length; _i++) {
                var radioEle = radioElements_1[_i];
                radioEle.setAttribute('name', this.name);
                radioEle.setAttribute('alignment', this.alignment);
            }
            if (this.isDisabled) {
                for (var _a = 0, radioElements_2 = radioElements; _a < radioElements_2.length; _a++) {
                    var radioEle = radioElements_2[_a];
                    radioEle.setAttribute('is-disabled', this.isDisabled);
                }
            }
        }
        this.radioButtonChangeHandler();
    };
    /** Listener for radio selection */
    class_1.prototype.radioSelectedHandler = function (e) {
        this.radioSelect = e.detail;
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** getCheckedStatus method adds the show-error class to radio buttons if radio button is not selected */
    class_1.prototype.getCheckedStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dxpRadioGroups, _i, dxpRadioGroups_1, dxpRadioButton, _a, dxpRadioGroups_2, dxpRadioButton;
            return __generator(this, function (_b) {
                dxpRadioGroups = this.element.querySelector(RADIO_BTN) ? this.element.querySelectorAll(RADIO_BTN) : this.element.querySelectorAll(RADIO_BTN);
                this.showError = this.radioSelect ? (this.required ? !this.radioSelect.isChecked : false) : this.required;
                dxpRadioGroups = Array.from(dxpRadioGroups);
                if (dxpRadioGroups.length > 0) {
                    if (this.showError) {
                        for (_i = 0, dxpRadioGroups_1 = dxpRadioGroups; _i < dxpRadioGroups_1.length; _i++) {
                            dxpRadioButton = dxpRadioGroups_1[_i];
                            dxpRadioButton.setAttribute('show-error', this.showError);
                            dxpRadioButton.querySelector('label').setAttribute('class', 'dxp-error');
                        }
                    }
                    else {
                        for (_a = 0, dxpRadioGroups_2 = dxpRadioGroups; _a < dxpRadioGroups_2.length; _a++) {
                            dxpRadioButton = dxpRadioGroups_2[_a];
                            dxpRadioButton.setAttribute('show-error', this.showError);
                            dxpRadioButton.querySelector('label').removeAttribute('class');
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /** Render the radio-button-group */
    class_1.prototype.render = function () {
        var _this = this;
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir }, h("label", { class: "dxp dxp-radio-group-label", htmlFor: this.label }, this.required ?
            h("span", { class: "dxp-required" }, " ", h("span", { "aria-hidden": "true" }, "*"))
            : '', this.label), h("div", { class: "dxp-radio-group-items" }, this.radioBtn ? (this.radioBtn.map(function (object) {
            return (h("dxp-radio-button", { alignment: _this.alignment, "radio-key": object.radioKey, name: _this.name, "radio-value": object.radioValue, "is-disabled": _this.isDisabled, checked: object.checked }));
        })) : (h("slot", null)), this.showError && !this.isDisabled && h("p", { class: "dxp-error" }, this.validationMessage))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "radioBtn": ["radioButtonChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-radio-group{margin:16px 0}div.dxp.dxp-radio-group .dxp-error,div.dxp.dxp-radio-group .dxp-radio-group-label{display:block;margin:0 0 0 10px}div.dxp.dxp-radio-group[dir=rtl] .dxp-error,div.dxp.dxp-radio-group[dir=rtl] .dxp-radio-group-label{margin:0 10px 0 0}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
/** static radio button name */
RadioGroup.radioName = 'dxp-radio';
/** static radio button alignment */
RadioGroup.useParentAlign = 'vertical';
export { RadioGroup as dxp_radio_group };
