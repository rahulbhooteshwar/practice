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
        requiredField: 'Required field'
    },
    'es': {
        requiredField: 'Campo requerido'
    }
};
var DXP_ERROR = 'dxp-error';
var DXP_NONE = 'dxp-none';
var CHECKBOX_ERROR = 'checkbox-error';
var INPUT_CONTAINER_CLASS = '.input-container';
var DISABLED_CLASS = 'dxp-disabled';
var Form = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** isSubmitApi - to hold submit API call check */
        this.isSubmitApi = false;
        /** button position */
        this.buttonPosition = 'left';
        /** type of button */
        this.buttonType = 'primary';
        this.formSubmitted = createEvent(this, "formSubmitted", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'Form', messages);
                        if (!this.formId) return [3 /*break*/, 2];
                        // API call to get form json from service through formId
                        return [4 /*yield*/, this.getService(dxp.config.get('FORM_AS_SERVICE_URL'))];
                    case 1:
                        // API call to get form json from service through formId
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!this.apiUrl) return [3 /*break*/, 4];
                        // API call to get form json from service through apiUrl
                        return [4 /*yield*/, this.getService(this.apiUrl)];
                    case 3:
                        // API call to get form json from service through apiUrl
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.formJson) {
                            if (typeof this.formJson === 'string') {
                                this.formJson = JSON.parse(this.formJson);
                            }
                            this.formSchema = this.formJson['FormSchema'] && this.formJson['FormSchema'].fields;
                            this.formEvents = this.formJson['FormSchema'] && this.formJson['FormSchema'].event;
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** form field validations */
    class_1.prototype.fieldValidations = function (element) {
        var field = this.element.querySelector("#" + element['name']);
        field.classList.add('dxp-field-error');
        var closestElement = field.closest(INPUT_CONTAINER_CLASS);
        if (closestElement) {
            if (closestElement.previousElementSibling) {
                closestElement.previousElementSibling.classList.add(DXP_ERROR);
            }
            if (closestElement.nextElementSibling) {
                closestElement.nextElementSibling.classList.remove(DXP_NONE);
            }
            if (field.nextElementSibling) {
                field.nextElementSibling.classList.remove(DXP_NONE);
            }
        }
        if (field.getAttribute('type') === 'checkbox') {
            field.nextElementSibling.classList.add(CHECKBOX_ERROR);
        }
    };
    /** if valid form then submit form */
    class_1.prototype.formSubmit = function (submitData) {
        var _this = this;
        var dataQueryString = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        };
        if (this.formEvents) {
            this.formEvents.forEach(function (event) {
                if (event.eventType === 'onSubmit') {
                    _this.isSubmitApi = true;
                    event.eventServiceInfo.forEach(function (service) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dxp.api(service.serviceUrl, dataQueryString)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
            });
        }
        // if no submit API call then emit the submit data
        if (!this.isSubmitApi) {
            dxp.log.debug(this.element.tagName, 'formSubmit()', "event emit for SPA");
            this.formSubmitted.emit({ 'formData': submitData });
        }
    };
    /** if form invalid then validate form and show error messaages */
    class_1.prototype.formValidations = function (form) {
        // check for all invalid form fields and update validataion/error message
        for (var _i = 0, _a = form.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element['name']) {
                if (!element['validity'].valid) {
                    this.fieldValidations(element);
                }
            }
        }
    };
    /** check for form field validation */
    class_1.prototype.formValidityCheck = function (form) {
        var submitData = {};
        for (var _i = 0, _a = form.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element['name']) {
                submitData[element['name']] = element['value'];
            }
        }
        if (submitData) {
            this.formSubmit(submitData);
        }
    };
    /** private method to get the data from service */
    class_1.prototype.getData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var headerObj, queryString, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!this.formId) return [3 /*break*/, 2];
                        headerObj = {};
                        headerObj['formId'] = this.formId;
                        queryString = {
                            method: 'GET',
                            headers: headerObj
                        };
                        return [4 /*yield*/, dxp.api(url, queryString)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, dxp.api(url)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_1 = _a.sent();
                        dxp.log.error(this.element.tagName, 'getData()', "fetch failed for", e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** return error message div */
    class_1.prototype.getErrorMessage = function (field) {
        return h("div", { class: DXP_NONE + " " + DXP_ERROR }, field.templateOptions.validationMessage);
    };
    /** method to call form service */
    class_1.prototype.getService = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getData(url)];
                    case 1:
                        _a.formJson = _b.sent();
                        this.formSchema = this.formJson && this.formJson['FormSchema'] && this.formJson['FormSchema'].fields;
                        this.formEvents = this.formJson['FormSchema'] && this.formJson['FormSchema'].event;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     */
    class_1.prototype.handleChange = function (event) {
        if (event.target.value) {
            event.target.classList.remove('dxp-field-error');
            var containerClass = event.target.closest(INPUT_CONTAINER_CLASS);
            if (containerClass) {
                if (containerClass.previousElementSibling) {
                    containerClass.previousElementSibling.classList.remove(DXP_ERROR);
                }
                if (containerClass.nextElementSibling) {
                    containerClass.nextElementSibling.classList.add(DXP_NONE);
                }
                if (event.target.nextElementSibling && event.target.nextElementSibling.classList) {
                    event.target.nextElementSibling.classList.add(DXP_NONE);
                }
            }
            if (event.target.getAttribute('type') === 'checkbox') {
                event.target.nextElementSibling.classList.remove(CHECKBOX_ERROR);
            }
        }
    };
    /** to prevent default submission of form */
    class_1.prototype.preventSubmit = function (e) {
        e.preventDefault();
        return false;
    };
    /** to render checkbox field */
    class_1.prototype.renderChechbox = function (field) {
        var _this = this;
        return h("div", { class: "form-checkbox form-checkbox-group " + (field.className ? field.className : '') }, h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-checkbox.min.css" }), h("p", { class: "caption", "aria-required": field.templateOptions.required ? 'true' : '', "aria-invalid": "false" }, field.templateOptions.label), field.templateOptions.options && field.templateOptions.options.map(function (item) {
            return h("div", { class: _this.theme + " dxp-checkbox-group checkbox-item " + field.templateOptions.alignment }, h("input", { type: "checkbox", id: field.key, name: field.key, required: item.required, onChange: function (ev) { return _this.handleChange(ev); }, class: "checkbox dxp-field", value: item.value, checked: item.checked, disabled: item.disabled }), h("label", { htmlFor: field.key, class: item.disabled ? DISABLED_CLASS : '' }, item.required ? h("span", { class: "dxp-required" }, "* ") : '', item.name, "\u200E"));
        }));
    };
    /** render form fields */
    class_1.prototype.renderFormFields = function (field) {
        if (field.type === 'input' && field.templateOptions.type !== 'textarea') {
            return this.renderInput(field);
        }
        if (field.type === 'input' && field.templateOptions.type === 'textarea') {
            return this.renderTextarea(field);
        }
        if (field.type === 'radio') {
            return this.renderRadio(field);
        }
        if (field.type === 'checkbox') {
            return this.renderChechbox(field);
        }
        if (field.type === 'select') {
            return this.renderSelect(field);
        }
        return undefined;
    };
    /** to render input field */
    class_1.prototype.renderInput = function (field) {
        var _this = this;
        return h("div", { class: "form-input dxp-mb-2 " + (field.className ? field.className : '') }, h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-input.min.css" }), h("label", { class: "dxp-inputbox-label " + (field.templateOptions.disabled ? DISABLED_CLASS : ''), htmlFor: field.templateOptions.label }, field.templateOptions.label, field.templateOptions.required && h("span", { class: "dxp-required" }, "* ")), h("div", { class: "input-container" }, h("input", { class: '', type: field.templateOptions.type, id: field.key, name: field.key, required: field.templateOptions.required, placeholder: field.templateOptions.placeholder, value: field.dafaultValue, minlength: field.templateOptions.minLength, maxlength: field.templateOptions.maxLength, onInput: function (event) { return _this.handleChange(event); }, readonly: field.templateOptions.readonly, disabled: field.templateOptions.disabled, autofocus: field.templateOptions.autoFocus, min: field.templateOptions.min, max: field.templateOptions.max, step: field.templateOptions.step, pattern: field.templateOptions.pattern }), h("span", { class: DXP_NONE + " input-icon icon-sprite error-circle-red" })), this.getErrorMessage(field));
    };
    /** to render radio field */
    class_1.prototype.renderRadio = function (field) {
        var _this = this;
        return h("div", { class: "form-radio dxp-mb-2 " + (field.className ? field.className : '') }, h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-radio-button.min.css" }), h("label", { class: "dxp dxp-radio-group-label", htmlFor: field.templateOptions.label }, field.templateOptions.required ?
            h("span", { class: "dxp-required" }, " ", h("span", { "aria-hidden": "true" }, "*"))
            : '', field.templateOptions.label), h("div", { class: "dxp-radio-group-items" }, field.templateOptions.options && field.templateOptions.options.map(function (item) {
            return h("div", { class: _this.theme + " form-radio-btn dxp-radio-button " + field.templateOptions.alignment }, h("input", { class: "dxp-field", onChange: function (ev) { return _this.handleChange(ev); }, id: item.code, type: "radio", key: item.code, name: field.key, value: item.code, checked: item.checked, required: field.templateOptions.required, disabled: field.templateOptions.disabled }), h("label", { htmlFor: item.code }, item.name));
        })), this.getErrorMessage(field));
    };
    /** to render select field */
    class_1.prototype.renderSelect = function (field) {
        var _this = this;
        return h("div", { class: "form-select dxp-mb-2 " + (field.className ? field.className : '') }, h("label", { class: "dxp-inputbox-label " + (field.templateOptions.disabled ? DISABLED_CLASS : ''), htmlFor: field.templateOptions.label }, field.templateOptions.label, field.templateOptions.required && h("span", { class: "dxp-required" }, "* ")), h("div", { class: "input-container" }, h("select", { class: "dxp-field", onInput: function (event) { return _this.handleChange(event); }, id: field.key, name: field.key, required: field.templateOptions.required }, field.templateOptions.options && field.templateOptions.options.map(function (item) {
            return h("option", { value: item.code, selected: item.selected, disabled: item.disabled }, " ", item.name);
        }))), this.getErrorMessage(field));
    };
    /** to render textarea field */
    class_1.prototype.renderTextarea = function (field) {
        var _this = this;
        return h("div", { class: "form-textarea dxp-mb-2 " + (field.className ? field.className : '') }, h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-textarea.min.css" }), h("label", { htmlFor: field.templateOptions.label, id: "textarea", class: "dxp-inputbox-label " + (field.templateOptions.disabled ? DISABLED_CLASS : '') }, field.templateOptions.label, field.templateOptions.required && h("span", { class: "dxp-required" }, "* ")), h("div", { class: "input-container" }, h("textarea", { id: field.key, name: field.key, "aria-labelledby": "textarea", class: (field.templateOptions.nonResizable ? 'no-resizable' : '') + " textarea form-control dxp-field", "aria-invalid": "false", "aria-multiline": "true", required: field.templateOptions.required, placeholder: field.templateOptions.placeholder, value: field.defaultValue, onInput: function (event) { return _this.handleChange(event); }, rows: field.templateOptions.rows, cols: field.templateOptions.cols, maxlength: field.templateOptions.maxLength, minlength: field.templateOptions.minLength, "aria-errormessage": "error", disabled: field.templateOptions.disabled, style: { width: field.templateOptions.width + "px" } })), this.getErrorMessage(field));
    };
    /** click listener for submit button */
    class_1.prototype.submitHandler = function () {
        // get the form refrence
        var form = this.element.querySelector('form');
        var isValidForm = form.checkValidity();
        // if form is valid, submit form data
        if (isValidForm) {
            this.formValidityCheck(form);
        }
        else {
            this.formValidations(form);
        }
    };
    /** Render the form */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-form render() : " + "DEVELOPMENT");
        if (!this.apiUrl && !this.formJson) {
            dxp.log.debug(this.element.tagName, 'render()', "component not rendered : check API URL or formJson data");
            return undefined;
        }
        var styles = [
            h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/dxp.min.css" }),
            h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-cta.min.css" }),
            h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-form.min.css" }),
            [this.theme && h("link", { rel: "stylesheet", href: "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/" + this.theme + ".min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.formJson && this.formJson['formTitle'] && h("h2", null, this.formJson['formTitle']), this.formJson && this.formJson['formSubTitle'] && h("p", { class: "dxp-lead" }, this.formJson['formSubTitle']), h("form", { id: "form", onSubmit: function (e) { _this.preventSubmit(e); } }, this.formSchema && this.formSchema.map(function (field) {
            return _this.renderFormFields(field);
        }), h("p", { class: "dxp-font-size-sm dxp-mt-6" }, "(*" + dxp.i18n.t('TagInput:requiredField') + ")"), this.formJson && this.formJson['confirmationMsg'] && h("p", { class: "dxp-font-size-sm  dxp-mt-6", innerHTML: this.formJson['confirmationMsg'] }), h("div", { class: "dxp-btn-form align-" + this.buttonPosition }, h("button", { class: " dxp-btn dxp-btn-" + this.buttonType, type: "submit", value: this.buttonText, onClick: function () { return _this.submitHandler(); } }, this.buttonText)))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-form .form-input .input-container{position:relative;width:100%}div.dxp.dxp-form .form-input .input-icon{position:absolute;right:.5rem;top:.75rem}div.dxp.dxp-form .form-textarea textarea{padding:.675rem .875rem;resize:auto}div.dxp.dxp-form .form-textarea textarea.no-resizable{resize:none}div.dxp.dxp-form .form-textarea label{display:block}div.dxp.dxp-form .form-radio{margin:16px 0}div.dxp.dxp-form .form-radio .dxp-error,div.dxp.dxp-form .form-radio .dxp-radio-group-label{display:block;margin:0 0 0 10px}div.dxp.dxp-form .form-radio .form-radio-btn{margin:10px 10px 0}div.dxp.dxp-form .form-radio .form-radio-btn.horizontal{display:-ms-inline-flexbox;display:inline-flex}div.dxp.dxp-form .form-radio .form-radio-btn.vertical{display:grid}div.dxp.dxp-form .form-radio .form-radio-btn input[type=radio]{position:absolute;opacity:0;width:0}div.dxp.dxp-form .form-radio .form-radio-btn input[type=radio]+label{padding-left:26px;position:relative;margin:0}div.dxp.dxp-form .form-radio .form-radio-btn input[type=radio]+label:before{content:\"\";width:18px;height:18px;position:absolute;top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-form .form-radio .form-radio-btn input[type=radio][disabled]{pointer-events:none}div.dxp.dxp-form .form-radio .form-radio-btn input[type=radio][disabled]+label{cursor:not-allowed}div.dxp.dxp-form .form-checkbox-group input[type=checkbox]{opacity:0;position:absolute}div.dxp.dxp-form .form-checkbox-group .caption{margin-bottom:10px}div.dxp.dxp-form .form-checkbox-group .checkbox-item{position:relative}div.dxp.dxp-form .form-checkbox-group.horizontal .checkbox-item{display:inline-block;margin-right:10px}div.dxp.dxp-form .form-checkbox-group.vertical{display:block}div.dxp.dxp-form .form-checkbox-group.vertical .checkbox-item+.dxp-error{padding-left:26px;margin:0}div.dxp.dxp-form .form-checkbox .checkbox-item{position:relative}div.dxp.dxp-form .form-checkbox .checkbox-item input[type=checkbox]{opacity:0;position:absolute}div.dxp.dxp-form .form-checkbox .checkbox-item input[type=checkbox]+label{padding-left:25px;position:relative}div.dxp.dxp-form .form-checkbox .checkbox-item input[type=checkbox]+label:before{content:\"\";display:inline-block;width:1rem;height:1rem;top:0;position:absolute;left:0;cursor:pointer}div.dxp.dxp-form .form-checkbox .checkbox-item.horizontal{display:inline-block;margin-right:10px}div.dxp.dxp-form .form-checkbox .checkbox-item.vertical input[type=checkbox]+label .dxp-required{display:table-cell}div.dxp.dxp-form .form-checkbox .checkbox-item.vertical .dxp-error{padding-left:2.5rem}div.dxp.dxp-form .dxp-btn-form.align-center{text-align:center}div.dxp.dxp-form .dxp-btn-form.align-right{text-align:right}div.dxp.dxp-form .dxp-btn-form.align-left{text-align:left}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Form as dxp_form };
