'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-656d8fa0.js');

const IS_SELECTED = 'is-selected';
const DataGridFilter = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** Error msg for max pins exceeded */
        this.maxPinError = '';
        /** filter input text value */
        this.enteredValue = '';
        /** Boolean: Is column pinning disabled */
        this.isPinDisabled = false;
        /** Boolean: Is column pinned */
        this.isPinned = false;
        this.clickFilter = core$1.createEvent(this, "clickFilter", 7);
        this.filterGrid = core$1.createEvent(this, "filterGrid", 7);
        this.pinColumn = core$1.createEvent(this, "pinColumn", 7);
        this.sortGrid = core$1.createEvent(this, "sortGrid", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'DataGridFilter', messages.messages);
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
            this.maxPinError = `${core$1.dxp.i18n.t('DataGrid:maxPinExceededMsg')} ${Object.keys(this.cellOptions.pinnedColumns).length} ${core$1.dxp.i18n.t('DataGrid:columnsText')}`;
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
        return (core$1.h("div", { class: this.base.componentClass(), "data-theme": this.theme }, core$1.h("div", { class: "options-wrapper" }, core$1.h("a", { href: "javascript : void(0)", onClick: e => this.sortDataGrid(e, 'ascending'), class: `sort-btn ${this.selectedSort === 'ascending' ? IS_SELECTED : ''}` }, core$1.h("i", { class: "btn-icon asc-icon" }), core$1.dxp.i18n.t('DataGrid:sortAscText')), core$1.h("a", { href: "javascript : void(0)", onClick: e => this.sortDataGrid(e, 'descending'), class: `sort-btn ${this.selectedSort === 'descending' ? IS_SELECTED : ''}` }, core$1.h("i", { class: "btn-icon desc-icon" }), core$1.dxp.i18n.t('DataGrid:sortDescText')), core$1.h("a", { href: "javascript : void(0)", onClick: e => this.sortDataGrid(e, 'remove-sort'), class: "sort-btn" }, core$1.h("i", { class: "btn-icon cross-icon" }), core$1.dxp.i18n.t('DataGrid:removeSortText'))), core$1.h("div", { class: "options-wrapper" }, core$1.h("dxp-toggle-switch", { label: "Pin this column", description: this.maxPinError, "label-position": "left", checked: this.isPinned, disabled: this.isPinDisabled })), core$1.h("div", { class: "options-wrapper", ref: el => { this.filterElement = el; } }, core$1.h("div", { class: "option-section" }, core$1.h("div", { class: "dropdown-label" }, core$1.dxp.i18n.t('DataGrid:filterConditionText')), core$1.h("select", { class: "dropdown", onChange: event => this.handleSelect(event) }, core$1.h("option", { value: "notSelected", selected: this.selectedValue === 'notSelected' }, core$1.dxp.i18n.t('DataGrid:selectText')), core$1.h("option", { value: "isEqualTo", selected: this.selectedValue === 'isEqualTo' }, core$1.dxp.i18n.t('DataGrid:isEqualToText')), core$1.h("option", { value: "isNotEqualTo", selected: this.selectedValue === 'isNotEqualTo' }, core$1.dxp.i18n.t('DataGrid:isNotEqualToText')))), core$1.h("div", { class: "option-section" }, core$1.h("dxp-input", { type: "text", label: core$1.dxp.i18n.t('DataGrid:valueText'), value: this.enteredValue, "is-required": "true", disabled: this.selectedValue === 'notSelected' || this.selectedValue === '' || this.selectedValue === undefined, "max-length": "100", "accessibility-text": "{dxp.i18n.t('DataGrid:filterAccesibilityText')}", placeholder: core$1.dxp.i18n.t('DataGrid:searchText') })), core$1.h("dxp-cta-list", { "title-text": "", orientation: "horizontal" }, core$1.h("dxp-cta", { type: "button", "btn-id": "filterButton", disabled: (this.selectedValue === 'notSelected' || this.selectedValue === ''
                || this.selectedValue === undefined || this.enteredValue === ''), "button-type": "primary", text: core$1.dxp.i18n.t('DataGrid:filter') }), core$1.h("dxp-cta", { type: "button", "btn-id": "clearButton", "button-type": "secondary", text: core$1.dxp.i18n.t('DataGrid:clear') })))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-data-grid-filter{position:absolute;top:100%;-webkit-transform:translateY(1.25rem);transform:translateY(1.25rem);left:-.625rem;z-index:5;width:300px}div.dxp.dxp-data-grid-filter .options-wrapper{padding:1rem 1.5rem .12rem;word-break:break-word}div.dxp.dxp-data-grid-filter .options-wrapper .option-section,div.dxp.dxp-data-grid-filter .options-wrapper .sort-btn{margin-bottom:1rem}div.dxp.dxp-data-grid-filter .options-wrapper .dropdown-label{font-size:.75rem;margin-bottom:.5rem}div.dxp.dxp-data-grid-filter .options-wrapper .sort-btn{display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid-filter .options-wrapper .sort-btn .btn-icon{display:inline-block;width:1.5rem;height:1.5rem;margin-right:1rem}"; }
};

exports.dxp_data_grid_filter = DataGridFilter;
