import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const CHECKBOX = 'dxp-checkbox';
const SET_ALIGNMENT = 'set-alignment';
const CHECKBOX_MORE = 'Checkbox:more';
const CHECKBOX_LESS = 'Checkbox:less';
/** dxp-checkbox */
export class CheckboxGroup {
    constructor() {
        /** items */
        this.items = [];
        /** validation flag */
        this.flag = false;
        /** This store the value true if the checkbox is required filed */
        this.isValid = false;
        /** layout of check-box. Author can set the alignment of check-boxes horizontally / vertically */
        this.alignment = 'horizontal';
        /** Defines if the field is required */
        this.required = false;
        /** Select-all checkbox button will be present if the author set it to true */
        this.selectAll = false;
        /** separator will be shown and hidden if the property is set to true and false respectively */
        this.separatorRequired = false;
    }
    /** Listener that looks for checkbox items object to be assigned/changed externally */
    checkboxesChangeHandler() {
        this.items = this.base.createNestedMarkup(this.checkBoxContainer, CHECKBOX, this.checkboxItemsData);
    }
    /** Actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Checkbox', messages);
        const randomNumber = Math.floor(Math.random() * 100);
        this.checkboxId = `dxp-checkbox-${randomNumber}`; // generating unique checkbox id
    }
    /** Add the class on checkbox element if the dxp-checkbox-group if provide the alignment by author */
    componentDidLoad() {
        this.checkboxesChangeHandler();
        const checkboxItems = this.items.length ? this.items : this.element.querySelectorAll(CHECKBOX);
        if (checkboxItems && checkboxItems.length) {
            for (let i = 0; i < checkboxItems.length; i++) {
                checkboxItems[i].setAttribute(SET_ALIGNMENT, this.alignment);
                if (checkboxItems[i].required) {
                    checkboxItems[i].disabled = true;
                    checkboxItems[i].checked = true;
                }
                if (this.initialItemsCount && this.initialItemsCount !== 0 && i >= this.initialItemsCount) {
                    checkboxItems[i].setAttribute('style', 'display:none');
                }
            }
        }
    }
    /** Actions to be performed on click on select-all checkbox button */
    handleClickEvent(e) {
        this.base.routingEventListener(e);
        let currentElement;
        if (e.target) {
            const parent = e.composedPath()[0];
            currentElement = parent.nodeName === 'INPUT' ? parent : parent ? parent.querySelector('input') : parent.querySelector('input');
        }
        else {
            currentElement = e.target;
        }
        // Check if a browser supports shadow DOM
        if (document.head.attachShadow) {
            const selectAllCheckbox = this.element.querySelector(`#${this.checkboxId}`);
            const checkboxItems = [];
            // Get the checkbox elements in array
            this.createCheckboxArray(checkboxItems);
            this.updateCheckboxState(currentElement, checkboxItems, selectAllCheckbox);
        }
        else {
            const selectAllCheckbox = this.element.querySelector(`[id='${this.checkboxId}']`);
            const checkboxItems = this.element.querySelectorAll('.checkbox');
            this.updateCheckboxState(currentElement, checkboxItems, selectAllCheckbox);
        }
    }
    /** responsible for validation message at appropriate place */
    handleValidationEvent(e) {
        // To show error message by taking care of alignment
        this.flag = e.detail.flag;
        if (this.flag) {
            const parent = this.element.querySelector('.error-messsage-parent');
            const p = document.createElement('p');
            p.className = 'dxp-error error-message sc-dxp-checkbox-group';
            const txtNode = document.createTextNode(e.detail.message);
            p.appendChild(txtNode);
            parent.appendChild(p);
        }
        else {
            const errorMessage = this.element.querySelector('.dxp-error');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }
    /**
     * Store in an array all checkbox elements checked status (in true/false value).
     * if the element is checked/selected the value will store true otherwise false
     * (checkboxItems) - All checkbox elements
     * (checkboxState) - Array for store the checkbox checked status
     */
    checkboxCheckedStatus(checkboxItems, checkboxState) {
        for (const i of Object.keys(checkboxItems)) {
            checkboxState.push(checkboxItems[i].checked);
        }
    }
    /**
     * Data will be emitted of all selected/checked checkboxes, and can be listen through event.
     * Emitted data/values can be listen through 'checkboxItemsData' event.
     * checkboxState - array of all checkbox elements checked/unchecked status
     * checkboxItems - all checkbox elements
     */
    checkboxDataHandler(checkboxState, checkboxItems) {
        if (checkboxState.includes(true)) {
            const data = [];
            for (const i of Object.keys(checkboxItems)) {
                if (checkboxItems[i].checked) {
                    data.push({ 'label': checkboxItems[i].name, 'value': checkboxItems[i].value });
                }
            }
            this.onCheckboxSelect.emit(data);
            dxp.log.info(this.element.tagName, 'checkboxDataHandler()', data);
        }
    }
    /** for array of checkboxes */
    createCheckboxArray(checkboxItems) {
        const dxpCheckboxs = this.items.length ? this.items : this.element.querySelectorAll(CHECKBOX);
        for (const dxpCheckbox of dxpCheckboxs) {
            checkboxItems.push(dxpCheckbox.querySelector('.checkbox'));
        }
    }
    /**
     * When More or less will be visible and will be pressed this method will be used.
     * More changes into less and all the checkboxes will be shown.
     */
    handleMore(e) {
        const checkboxItems = this.items.length ? this.items : this.element.querySelectorAll(CHECKBOX);
        if (e.currentTarget.innerHTML === `${dxp.i18n.t(CHECKBOX_LESS)}<i class="icons-sprite remove-icon"></i>`) {
            e.currentTarget.innerHTML = `${dxp.i18n.t(CHECKBOX_MORE)}<i class="icons-sprite add-icon"></i>`;
            if (checkboxItems && checkboxItems.length) {
                for (let i = 0; i < checkboxItems.length; i++) {
                    if (this.alignment === 'horizontal') {
                        checkboxItems[i].setAttribute('style', 'display:inline');
                        checkboxItems[i].setAttribute(SET_ALIGNMENT, this.alignment);
                    }
                    else {
                        checkboxItems[i].setAttribute('style', 'display:block');
                        checkboxItems[i].setAttribute(SET_ALIGNMENT, this.alignment);
                    }
                    if (i >= this.initialItemsCount) {
                        checkboxItems[i].setAttribute('style', 'display:none');
                        checkboxItems[i].setAttribute(SET_ALIGNMENT, this.alignment);
                    }
                }
            }
        }
        else {
            e.currentTarget.innerHTML = `${dxp.i18n.t('Checkbox:less')}<i class="icons-sprite remove-icon"/>`;
            for (const checkboxItem of checkboxItems) {
                if (this.alignment === 'vertical') {
                    checkboxItem.setAttribute('style', 'display:block');
                    checkboxItem.setAttribute(SET_ALIGNMENT, this.alignment);
                }
                else {
                    checkboxItem.setAttribute('style', 'display:inline');
                    checkboxItem.setAttribute(SET_ALIGNMENT, this.alignment);
                }
            }
        }
    }
    /** get initial items from checkboxItemsData array */
    renderInitialItems() {
        return (this.checkboxItemsData ?
            this.initialItemsCount < this.checkboxItemsData.length ?
                h("a", { onClick: e => {
                        e.preventDefault();
                        this.handleMore(e);
                    }, href: "javascript.void(0);", class: "action-link" },
                    dxp.i18n.t(CHECKBOX_MORE),
                    "\u200E",
                    h("i", { class: "icons-sprite add-icon" }))
                : ''
            :
                this.initialItemsCount < this.element.querySelectorAll(CHECKBOX).length ?
                    h("a", { onClick: e => {
                            e.preventDefault();
                            this.handleMore(e);
                        }, href: "javascript.void(0);", class: "action-link" },
                        dxp.i18n.t(CHECKBOX_MORE),
                        "\u200E",
                        h("i", { class: "icons-sprite add-icon" }))
                    : '');
    }
    /** Render select all for checkbox */
    renderSelectAll() {
        return (this.selectAll === true ?
            h("div", { class: 'checkbox-item' },
                h("input", { type: "checkbox", name: "select-all", id: this.checkboxId, "aria-describedby": this.isValid ? 'error-message' : undefined, class: "select-all", value: "Select All" }),
                h("label", { htmlFor: this.checkboxId, class: this.isValid ? 'checkbox-error' : undefined },
                    dxp.i18n.t('Checkbox:selectAll'),
                    "\u200E")) : '');
    }
    /**
     * If "select-all" check-box is checked, all checkbox elements will become checked
     * selectAll - .select-all checkbox input
     * isChecked - checkbox checked state
     * checkboxItems - all checkbox elements
     */
    selectAllCheckboxes(selectAll, isChecked, checkboxItems) {
        if (selectAll && isChecked) {
            for (const i of Object.keys(checkboxItems)) {
                if (!checkboxItems[i].disabled) {
                    checkboxItems[i].checked = true;
                    checkboxItems[i].nextElementSibling.classList.remove('checkbox-error');
                }
            }
        }
    }
    /**
     * If user select/checked all checkbox element, the 'select-all' checkbox will automatically get selected/checked
     * isSelectAll - .select-all checkbox
     * checkboxState - Array for store the checkbox checked status
     * selectAllCheckbox - select-all checkbox element
     */
    selectAllElementChecked(isSelectAll, checkboxState, selectAllElement) {
        if (!checkboxState.includes(false) && selectAllElement) {
            selectAllElement.checked = true;
        }
        else if (!isSelectAll && selectAllElement) {
            selectAllElement.checked = false;
        }
    }
    /** show error message */
    showErrorMessage() {
        return (h("p", { class: "caption", "aria-required": this.required ? 'true' : '', "aria-invalid": "false" },
            this.caption,
            "\u200E",
            this.required ? h("span", { class: "dxp-required" },
                " ",
                h("span", { "aria-hidden": "true" }, "*")) : '',
            this.required && this.isValid && this.alignment === 'horizontal' ?
                h("p", { class: "dxp-error", id: "error-message", "aria-label": this.validationMessage }, this.validationMessage) : ''));
    }
    /**
     * If  "select-all" checkbox become unchecked,  all checkbox elements will become unchecked
     * isSelectAll - .select-all checkbox input
     * isChecked - checkbox checked state
     * checkboxItems - all checkbox elements
     */
    uncheckAllCheckboxes(isSelectAll, isChecked, checkboxItems) {
        if (isSelectAll && !isChecked) {
            for (const i of Object.keys(checkboxItems)) {
                if (!checkboxItems[i].disabled) {
                    checkboxItems[i].checked = false;
                }
            }
        }
    }
    /**
     * this execute the all function which are required in shadow DOM and without Shadow DOM
     */
    updateCheckboxState(currentElement, checkboxItems, selectAllCheckbox) {
        const checkboxState = [];
        const targetNode = currentElement ? currentElement.nodeName : false;
        const isSelectAll = currentElement ? currentElement.classList.contains('select-all') : false;
        const isChecked = currentElement ? currentElement.checked : false;
        // If "select-all" check-box is checked, all checkbox elements will become checked
        this.selectAllCheckboxes(isSelectAll, isChecked, checkboxItems);
        // If  "select-all" check-box become unchecked,  all checkbox elements will become unchecked
        this.uncheckAllCheckboxes(isSelectAll, isChecked, checkboxItems);
        // Store in an array all checkbox elements checked status (in true/false value).
        // if the element is checked/selected the value will store true otherwise false
        this.checkboxCheckedStatus(checkboxItems, checkboxState);
        // 'select-all' checkbox element will become checked if the all checkboxes are in checked state
        this.selectAllElementChecked(isSelectAll, checkboxState, selectAllCheckbox);
        // Validation message will display if all checkbox element are in unchecked in
        // the case checkbox component is required/mandatory
        if (this.required && targetNode === 'INPUT') {
            this.isValid = !checkboxState.includes(true);
        }
        // Data will be emitted of all selected/checked checkboxes, and can be listen through event.
        // Emitted data/values can be listen through 'checkboxItemsData' event.
        this.checkboxDataHandler(checkboxState, checkboxItems);
    }
    /**
     * Render the checkbox
     */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `rendering Checkbox component : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-checkbox.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} dxp-col-12 ${this.alignment}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "error-messsage-parent" },
                this.showErrorMessage(),
                this.separatorRequired ? h("dxp-line", { type: "line", height: 2, "custom-class": "checkbox-seperator" }) : '',
                this.renderSelectAll(),
                this.required && this.isValid && this.alignment === 'vertical' ?
                    h("p", { class: "dxp-error", id: "error-message", "aria-label": this.validationMessage }, this.validationMessage) : '',
                h("div", { class: "item-list", ref: el => this.checkBoxContainer = el },
                    h("slot", null)),
                !this.initialItemsCount || this.initialItemsCount === 0 ? ''
                    :
                        this.renderInitialItems())));
    }
    static get is() { return "dxp-checkbox-group"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-checkbox-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-checkbox-group.css"]
    }; }
    static get properties() { return {
        "alignment": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'horizontal' | 'vertical'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "layout of check-box. Author can set the alignment of check-boxes horizontally / vertically"
            },
            "attribute": "alignment",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "caption": {
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
                "text": "This is heading of checkbox items"
            },
            "attribute": "caption",
            "reflect": false
        },
        "initialItemsCount": {
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
                "tags": [],
                "text": "More and less will be shown and hidden based on the number of incoming items"
            },
            "attribute": "initial-items-count",
            "reflect": false
        },
        "required": {
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
                "tags": [],
                "text": "Defines if the field is required"
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "selectAll": {
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
                "tags": [],
                "text": "Select-all checkbox button will be present if the author set it to true"
            },
            "attribute": "select-all",
            "reflect": false,
            "defaultValue": "false"
        },
        "separatorRequired": {
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
                "tags": [],
                "text": "separator will be shown and hidden if the property is set to true and false respectively"
            },
            "attribute": "separator-required",
            "reflect": false,
            "defaultValue": "false"
        },
        "validationMessage": {
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
                "text": "Error message will appear if none of checkbox is checked"
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "checkboxItemsData": {
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
                "tags": [],
                "text": "checkbox items data"
            },
            "attribute": "checkbox-items-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "flag": {},
        "isValid": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "onCheckboxSelect",
            "name": "checkboxItemsData",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "This emit the selected checkbox data to listen any event listener"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "checkboxItemsData",
            "methodName": "checkboxesChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClickEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "validationEvent",
            "method": "handleValidationEvent",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
