import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const RADIO_BTN = 'dxp-radio-button';
const RadioGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** condition based on which error is shown */
        this.showError = false;
        /** radio button alignment */
        this.alignment = 'horizontal';
        this.radionBtnLoad = createEvent(this, "radionBtnLoad", 7);
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
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir }, h("label", { class: "dxp dxp-radio-group-label", htmlFor: this.label }, this.required ?
            h("span", { class: "dxp-required" }, " ", h("span", { "aria-hidden": "true" }, "*"))
            : '', this.label), h("div", { class: "dxp-radio-group-items" }, this.radioBtn ? (this.radioBtn.map((object) => {
            return (h("dxp-radio-button", { alignment: this.alignment, "radio-key": object.radioKey, name: this.name, "radio-value": object.radioValue, "is-disabled": this.isDisabled, checked: object.checked }));
        })) : (h("slot", null)), this.showError && !this.isDisabled && h("p", { class: "dxp-error" }, this.validationMessage))));
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "radioBtn": ["radioButtonChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-radio-group{margin:16px 0}div.dxp.dxp-radio-group .dxp-error,div.dxp.dxp-radio-group .dxp-radio-group-label{display:block;margin:0 0 0 10px}div.dxp.dxp-radio-group[dir=rtl] .dxp-error,div.dxp.dxp-radio-group[dir=rtl] .dxp-radio-group-label{margin:0 10px 0 0}"; }
};
/** static radio button name */
RadioGroup.radioName = 'dxp-radio';
/** static radio button alignment */
RadioGroup.useParentAlign = 'vertical';

export { RadioGroup as dxp_radio_group };
