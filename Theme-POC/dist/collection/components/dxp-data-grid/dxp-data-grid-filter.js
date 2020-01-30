import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const IS_SELECTED = 'is-selected';
/** dxp-data-grid */
export class DataGridFilter {
    constructor() {
        /** Error msg for max pins exceeded */
        this.maxPinError = '';
        /** filter input text value */
        this.enteredValue = '';
        /** Boolean: Is column pinning disabled */
        this.isPinDisabled = false;
        /** Boolean: Is column pinned */
        this.isPinned = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'DataGridFilter', messages);
        this.setSelectedSort();
    }
    /** Listener for click filter */
    clickHandler() {
        this.clickFilter.emit('OTHER');
    }
    /** Listener for toggle switch */
    columnPinned(event) {
        this.pinColumn.emit({ cellKey: this.cellKey, status: event.detail.status });
    }
    /** Listener to value from dxp-input component */
    inputEntered(event) {
        this.enteredValue = event.detail.value;
    }
    /** click listener for cta button */
    submitHandler(e) {
        if (e.target.getAttribute('btn-id') === 'filterButton') {
            this.filterDataGrid(e, 'filtering', this.selectedValue, this.enteredValue);
        }
        else if (e.target.getAttribute('btn-id') === 'clearButton') {
            this.filterDataGrid(e, 'remove-filter');
        }
    }
    /** Filter function */
    filterDataGrid(event, filterAction, filterCondition, filterValue) {
        event.preventDefault();
        this.filterGrid.emit({ 'cellKey': this.cellKey, 'filterAction': filterAction, 'filterCondition': filterCondition, 'filterValue': filterValue });
    }
    /** to read dropdown value */
    handleSelect(event) {
        this.selectedValue = event.target.value;
    }
    /** Set selectedSort state */
    setSelectedSort() {
        if (this.cellOptions && this.cellOptions.sortOptions && this.cellOptions.sortOptions[this.cellKey]) {
            this.selectedSort = this.cellOptions.sortOptions[this.cellKey];
        }
        if (this.cellOptions.pinnedColumns && (this.cellOptions.pinnedColumns[this.cellKey] || this.cellOptions.pinnedColumns[this.cellKey] === 0)) {
            this.isPinned = true;
        }
        else if (this.cellOptions.maxPinsReached) {
            this.isPinDisabled = true;
            this.maxPinError = `${dxp.i18n.t('DataGrid:maxPinExceededMsg')} ${Object.keys(this.cellOptions.pinnedColumns).length} ${dxp.i18n.t('DataGrid:columnsText')}`;
        }
        if (this.cellOptions.filterOptions && this.cellOptions.filterOptions[this.cellKey]) {
            this.selectedValue = this.cellOptions.filterOptions[this.cellKey].filterCondition;
            this.enteredValue = this.cellOptions.filterOptions[this.cellKey].filterValue;
        }
    }
    /** Sort function */
    sortDataGrid(event, sortAction) {
        event.preventDefault();
        event.currentTarget.classList.add(IS_SELECTED);
        this.sortGrid.emit({ 'cellKey': this.cellKey, 'sortAction': sortAction });
    }
    /** Render the data grid */
    render() {
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme },
            h("div", { class: "options-wrapper" },
                h("a", { href: "javascript : void(0)", onClick: e => this.sortDataGrid(e, 'ascending'), class: `sort-btn ${this.selectedSort === 'ascending' ? IS_SELECTED : ''}` },
                    h("i", { class: "btn-icon asc-icon" }),
                    dxp.i18n.t('DataGrid:sortAscText')),
                h("a", { href: "javascript : void(0)", onClick: e => this.sortDataGrid(e, 'descending'), class: `sort-btn ${this.selectedSort === 'descending' ? IS_SELECTED : ''}` },
                    h("i", { class: "btn-icon desc-icon" }),
                    dxp.i18n.t('DataGrid:sortDescText')),
                h("a", { href: "javascript : void(0)", onClick: e => this.sortDataGrid(e, 'remove-sort'), class: "sort-btn" },
                    h("i", { class: "btn-icon cross-icon" }),
                    dxp.i18n.t('DataGrid:removeSortText'))),
            h("div", { class: "options-wrapper" },
                h("dxp-toggle-switch", { label: "Pin this column", description: this.maxPinError, "label-position": "left", checked: this.isPinned, disabled: this.isPinDisabled })),
            h("div", { class: "options-wrapper", ref: el => { this.filterElement = el; } },
                h("div", { class: "option-section" },
                    h("div", { class: "dropdown-label" }, dxp.i18n.t('DataGrid:filterConditionText')),
                    h("select", { class: "dropdown", onChange: event => this.handleSelect(event) },
                        h("option", { value: "notSelected", selected: this.selectedValue === 'notSelected' }, dxp.i18n.t('DataGrid:selectText')),
                        h("option", { value: "isEqualTo", selected: this.selectedValue === 'isEqualTo' }, dxp.i18n.t('DataGrid:isEqualToText')),
                        h("option", { value: "isNotEqualTo", selected: this.selectedValue === 'isNotEqualTo' }, dxp.i18n.t('DataGrid:isNotEqualToText')))),
                h("div", { class: "option-section" },
                    h("dxp-input", { type: "text", label: dxp.i18n.t('DataGrid:valueText'), value: this.enteredValue, "is-required": "true", disabled: this.selectedValue === 'notSelected' || this.selectedValue === '' || this.selectedValue === undefined, "max-length": "100", "accessibility-text": "{dxp.i18n.t('DataGrid:filterAccesibilityText')}", placeholder: dxp.i18n.t('DataGrid:searchText') })),
                h("dxp-cta-list", { "title-text": "", orientation: "horizontal" },
                    h("dxp-cta", { type: "button", "btn-id": "filterButton", disabled: (this.selectedValue === 'notSelected' || this.selectedValue === ''
                            || this.selectedValue === undefined || this.enteredValue === ''), "button-type": "primary", text: dxp.i18n.t('DataGrid:filter') }),
                    h("dxp-cta", { type: "button", "btn-id": "clearButton", "button-type": "secondary", text: dxp.i18n.t('DataGrid:clear') })))));
    }
    static get is() { return "dxp-data-grid-filter"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-data-grid-filter.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-data-grid-filter.css"]
    }; }
    static get properties() { return {
        "cellKey": {
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
                "text": "filter data"
            },
            "attribute": "cell-key",
            "reflect": false
        },
        "cellOptions": {
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
                "text": "cell options"
            },
            "attribute": "cell-options",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "enteredValue": {},
        "isPinDisabled": {},
        "isPinned": {},
        "locale": {},
        "selectedFilter": {},
        "selectedSort": {},
        "selectedValue": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "clickFilter",
            "name": "clickFilter",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit click events"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "filterGrid",
            "name": "filterGrid",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit filter events"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "pinColumn",
            "name": "pinColumn",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit pin events"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "sortGrid",
            "name": "sortGrid",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit sort events"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "toggleDataEmitter",
            "method": "columnPinned",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "textValue",
            "method": "inputEntered",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "ctaClickEvent",
            "method": "submitHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
