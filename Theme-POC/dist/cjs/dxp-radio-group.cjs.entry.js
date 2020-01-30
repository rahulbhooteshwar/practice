'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const RADIO_BTN = 'dxp-radio-button';
const RadioGroup = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** condition based on which error is shown */
        this.showError = false;
        /** radio button alignment */
        this.alignment = 'horizontal';
        this.radionBtnLoad = core$1.createEvent(this, "radionBtnLoad", 7);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        RadioGroup.useParentAlign = this.alignment;
        RadioGroup.radioName = this.name;
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-radio-button.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
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
        return (core$1.h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir }, core$1.h("label", { class: "dxp dxp-radio-group-label", htmlFor: this.label }, this.required ?
            core$1.h("span", { class: "dxp-required" }, " ", core$1.h("span", { "aria-hidden": "true" }, "*"))
            : '', this.label), core$1.h("div", { class: "dxp-radio-group-items" }, this.radioBtn ? (this.radioBtn.map((object) => {
            return (core$1.h("dxp-radio-button", { alignment: this.alignment, "radio-key": object.radioKey, name: this.name, "radio-value": object.radioValue, "is-disabled": this.isDisabled, checked: object.checked }));
        })) : (core$1.h("slot", null)), this.showError && !this.isDisabled && core$1.h("p", { class: "dxp-error" }, this.validationMessage))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "radioBtn": ["radioButtonChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-radio-group{margin:16px 0}div.dxp.dxp-radio-group .dxp-error,div.dxp.dxp-radio-group .dxp-radio-group-label{display:block;margin:0 0 0 10px}div.dxp.dxp-radio-group[dir=rtl] .dxp-error,div.dxp.dxp-radio-group[dir=rtl] .dxp-radio-group-label{margin:0 10px 0 0}"; }
};
/** static radio button name */
RadioGroup.radioName = 'dxp-radio';
/** static radio button alignment */
RadioGroup.useParentAlign = 'vertical';

exports.dxp_radio_group = RadioGroup;
