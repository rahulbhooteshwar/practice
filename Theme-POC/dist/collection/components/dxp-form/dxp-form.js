import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const DXP_ERROR = 'dxp-error';
const DXP_NONE = 'dxp-none';
const CHECKBOX_ERROR = 'checkbox-error';
const INPUT_CONTAINER_CLASS = '.input-container';
const DISABLED_CLASS = 'dxp-disabled';
/** dxp-form */
export class Form {
    constructor() {
        /** isSubmitApi - to hold submit API call check */
        this.isSubmitApi = false;
        /** button position */
        this.buttonPosition = 'left';
        /** type of button */
        this.buttonType = 'primary';
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Form', messages);
        // fetch the data from service
        if (this.formId) {
            // API call to get form json from service through formId
            await this.getService(dxp.config.get('FORM_AS_SERVICE_URL'));
        }
        else if (this.apiUrl) {
            // API call to get form json from service through apiUrl
            await this.getService(this.apiUrl);
        }
        else if (this.formJson) {
            if (typeof this.formJson === 'string') {
                this.formJson = JSON.parse(this.formJson);
            }
            this.formSchema = this.formJson['FormSchema'] && this.formJson['FormSchema'].fields;
            this.formEvents = this.formJson['FormSchema'] && this.formJson['FormSchema'].event;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** form field validations */
    fieldValidations(element) {
        const field = this.element.querySelector(`#${element['name']}`);
        field.classList.add('dxp-field-error');
        const closestElement = field.closest(INPUT_CONTAINER_CLASS);
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
    }
    /** if valid form then submit form */
    formSubmit(submitData) {
        const dataQueryString = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        };
        if (this.formEvents) {
            this.formEvents.forEach(event => {
                if (event.eventType === 'onSubmit') {
                    this.isSubmitApi = true;
                    event.eventServiceInfo.forEach(async (service) => {
                        await dxp.api(service.serviceUrl, dataQueryString);
                    });
                }
            });
        }
        // if no submit API call then emit the submit data
        if (!this.isSubmitApi) {
            dxp.log.debug(this.element.tagName, 'formSubmit()', `event emit for SPA`);
            this.formSubmitted.emit({ 'formData': submitData });
        }
    }
    /** if form invalid then validate form and show error messaages */
    formValidations(form) {
        // check for all invalid form fields and update validataion/error message
        for (const element of form.elements) {
            if (element['name']) {
                if (!element['validity'].valid) {
                    this.fieldValidations(element);
                }
            }
        }
    }
    /** check for form field validation */
    formValidityCheck(form) {
        const submitData = {};
        for (const element of form.elements) {
            if (element['name']) {
                submitData[element['name']] = element['value'];
            }
        }
        if (submitData) {
            this.formSubmit(submitData);
        }
    }
    /** private method to get the data from service */
    async getData(url) {
        try {
            if (this.formId) {
                const headerObj = {};
                headerObj['formId'] = this.formId;
                const queryString = {
                    method: 'GET',
                    headers: headerObj
                };
                return await dxp.api(url, queryString);
            }
            return await dxp.api(url);
        }
        catch (e) {
            dxp.log.error(this.element.tagName, 'getData()', `fetch failed for`, e);
        }
    }
    /** return error message div */
    getErrorMessage(field) {
        return h("div", { class: `${DXP_NONE} ${DXP_ERROR}` }, field.templateOptions.validationMessage);
    }
    /** method to call form service */
    async getService(url) {
        this.formJson = await this.getData(url);
        this.formSchema = this.formJson && this.formJson['FormSchema'] && this.formJson['FormSchema'].fields;
        this.formEvents = this.formJson['FormSchema'] && this.formJson['FormSchema'].event;
    }
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     */
    handleChange(event) {
        if (event.target.value) {
            event.target.classList.remove('dxp-field-error');
            const containerClass = event.target.closest(INPUT_CONTAINER_CLASS);
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
    }
    /** to prevent default submission of form */
    preventSubmit(e) {
        e.preventDefault();
        return false;
    }
    /** to render checkbox field */
    renderChechbox(field) {
        return h("div", { class: `form-checkbox form-checkbox-group ${field.className ? field.className : ''}` },
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-checkbox.min.css` }),
            h("p", { class: "caption", "aria-required": field.templateOptions.required ? 'true' : '', "aria-invalid": "false" }, field.templateOptions.label),
            field.templateOptions.options && field.templateOptions.options.map(item => {
                return h("div", { class: `${this.theme} dxp-checkbox-group checkbox-item ${field.templateOptions.alignment}` },
                    h("input", { type: "checkbox", id: field.key, name: field.key, required: item.required, onChange: ev => this.handleChange(ev), class: "checkbox dxp-field", value: item.value, checked: item.checked, disabled: item.disabled }),
                    h("label", { htmlFor: field.key, class: item.disabled ? DISABLED_CLASS : '' },
                        item.required ? h("span", { class: "dxp-required" }, "* ") : '',
                        item.name,
                        "\u200E"));
            }));
    }
    /** render form fields */
    renderFormFields(field) {
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
    }
    /** to render input field */
    renderInput(field) {
        return h("div", { class: `form-input dxp-mb-2 ${field.className ? field.className : ''}` },
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-input.min.css` }),
            h("label", { class: `dxp-inputbox-label ${field.templateOptions.disabled ? DISABLED_CLASS : ''}`, htmlFor: field.templateOptions.label },
                field.templateOptions.label,
                field.templateOptions.required && h("span", { class: "dxp-required" }, "* ")),
            h("div", { class: "input-container" },
                h("input", { class: '', type: field.templateOptions.type, id: field.key, name: field.key, required: field.templateOptions.required, placeholder: field.templateOptions.placeholder, value: field.dafaultValue, minlength: field.templateOptions.minLength, maxlength: field.templateOptions.maxLength, onInput: event => this.handleChange(event), readonly: field.templateOptions.readonly, disabled: field.templateOptions.disabled, autofocus: field.templateOptions.autoFocus, min: field.templateOptions.min, max: field.templateOptions.max, step: field.templateOptions.step, pattern: field.templateOptions.pattern }),
                h("span", { class: `${DXP_NONE} input-icon icon-sprite error-circle-red` })),
            this.getErrorMessage(field));
    }
    /** to render radio field */
    renderRadio(field) {
        return h("div", { class: `form-radio dxp-mb-2 ${field.className ? field.className : ''}` },
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-radio-button.min.css` }),
            h("label", { class: "dxp dxp-radio-group-label", htmlFor: field.templateOptions.label },
                field.templateOptions.required ?
                    h("span", { class: "dxp-required" },
                        " ",
                        h("span", { "aria-hidden": "true" }, "*"))
                    : '',
                field.templateOptions.label),
            h("div", { class: "dxp-radio-group-items" }, field.templateOptions.options && field.templateOptions.options.map(item => {
                return h("div", { class: `${this.theme} form-radio-btn dxp-radio-button ${field.templateOptions.alignment}` },
                    h("input", { class: "dxp-field", onChange: ev => this.handleChange(ev), id: item.code, type: "radio", key: item.code, name: field.key, value: item.code, checked: item.checked, required: field.templateOptions.required, disabled: field.templateOptions.disabled }),
                    h("label", { htmlFor: item.code }, item.name));
            })),
            this.getErrorMessage(field));
    }
    /** to render select field */
    renderSelect(field) {
        return h("div", { class: `form-select dxp-mb-2 ${field.className ? field.className : ''}` },
            h("label", { class: `dxp-inputbox-label ${field.templateOptions.disabled ? DISABLED_CLASS : ''}`, htmlFor: field.templateOptions.label },
                field.templateOptions.label,
                field.templateOptions.required && h("span", { class: "dxp-required" }, "* ")),
            h("div", { class: "input-container" },
                h("select", { class: "dxp-field", onInput: event => this.handleChange(event), id: field.key, name: field.key, required: field.templateOptions.required }, field.templateOptions.options && field.templateOptions.options.map(item => {
                    return h("option", { value: item.code, selected: item.selected, disabled: item.disabled },
                        " ",
                        item.name);
                }))),
            this.getErrorMessage(field));
    }
    /** to render textarea field */
    renderTextarea(field) {
        return h("div", { class: `form-textarea dxp-mb-2 ${field.className ? field.className : ''}` },
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-textarea.min.css` }),
            h("label", { htmlFor: field.templateOptions.label, id: "textarea", class: `dxp-inputbox-label ${field.templateOptions.disabled ? DISABLED_CLASS : ''}` },
                field.templateOptions.label,
                field.templateOptions.required && h("span", { class: "dxp-required" }, "* ")),
            h("div", { class: "input-container" },
                h("textarea", { id: field.key, name: field.key, "aria-labelledby": "textarea", class: `${field.templateOptions.nonResizable ? 'no-resizable' : ''} textarea form-control dxp-field`, "aria-invalid": "false", "aria-multiline": "true", required: field.templateOptions.required, placeholder: field.templateOptions.placeholder, value: field.defaultValue, onInput: event => this.handleChange(event), rows: field.templateOptions.rows, cols: field.templateOptions.cols, maxlength: field.templateOptions.maxLength, minlength: field.templateOptions.minLength, "aria-errormessage": "error", disabled: field.templateOptions.disabled, style: { width: `${field.templateOptions.width}px` } })),
            this.getErrorMessage(field));
    }
    /** click listener for submit button */
    submitHandler() {
        // get the form refrence
        const form = this.element.querySelector('form');
        const isValidForm = form.checkValidity();
        // if form is valid, submit form data
        if (isValidForm) {
            this.formValidityCheck(form);
        }
        else {
            this.formValidations(form);
        }
    }
    /** Render the form */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-form render() : ${process.env.MODE}`);
        if (!this.apiUrl && !this.formJson) {
            dxp.log.debug(this.element.tagName, 'render()', `component not rendered : check API URL or formJson data`);
            return undefined;
        }
        const styles = [
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/dxp.min.css` }),
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-cta.min.css` }),
            h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-form.min.css` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/${this.theme}.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            this.formJson && this.formJson['formTitle'] && h("h2", null, this.formJson['formTitle']),
            this.formJson && this.formJson['formSubTitle'] && h("p", { class: "dxp-lead" }, this.formJson['formSubTitle']),
            h("form", { id: "form", onSubmit: e => { this.preventSubmit(e); } },
                this.formSchema && this.formSchema.map(field => {
                    return this.renderFormFields(field);
                }),
                h("p", { class: "dxp-font-size-sm dxp-mt-6" }, `(*${dxp.i18n.t('TagInput:requiredField')})`),
                this.formJson && this.formJson['confirmationMsg'] && h("p", { class: `dxp-font-size-sm  dxp-mt-6`, innerHTML: this.formJson['confirmationMsg'] }),
                h("div", { class: `dxp-btn-form align-${this.buttonPosition}` },
                    h("button", { class: ` dxp-btn dxp-btn-${this.buttonType}`, type: "submit", value: this.buttonText, onClick: () => this.submitHandler() }, this.buttonText)))));
    }
    static get is() { return "dxp-form"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-form.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-form.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
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
                "text": "holds api end point path"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "buttonPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right' | 'center'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "button position"
            },
            "attribute": "button-position",
            "reflect": false,
            "defaultValue": "'left'"
        },
        "buttonText": {
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
                "text": "btn-with-text"
            },
            "attribute": "button-text",
            "reflect": false
        },
        "buttonType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'primary' | 'secondary' | 'branded'",
                "resolved": "\"branded\" | \"primary\" | \"secondary\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of button"
            },
            "attribute": "button-type",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "formId": {
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
                "text": "formId - to get the form JSON using formID"
            },
            "attribute": "form-id",
            "reflect": false
        },
        "formJson": {
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
                "tags": [],
                "text": "formJson - to pass json and render form based on the json data"
            },
            "attribute": "form-json",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "isSubmitApi": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "formSubmitted",
            "name": "formSubmitted",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "if form submit called"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
