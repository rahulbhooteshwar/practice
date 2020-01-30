import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-dff7d435.js';
var IS_SELECTED = 'is-selected';
var DataGridFilter = /** @class */ (function () {
    function DataGridFilter(hostRef) {
        registerInstance(this, hostRef);
        /** Error msg for max pins exceeded */
        this.maxPinError = '';
        /** filter input text value */
        this.enteredValue = '';
        /** Boolean: Is column pinning disabled */
        this.isPinDisabled = false;
        /** Boolean: Is column pinned */
        this.isPinned = false;
        this.clickFilter = createEvent(this, "clickFilter", 7);
        this.filterGrid = createEvent(this, "filterGrid", 7);
        this.pinColumn = createEvent(this, "pinColumn", 7);
        this.sortGrid = createEvent(this, "sortGrid", 7);
    }
    /** actions to be performed prior to component loading */
    DataGridFilter.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'DataGridFilter', messages);
        this.setSelectedSort();
    };
    /** Listener for click filter */
    DataGridFilter.prototype.clickHandler = function () {
        this.clickFilter.emit('OTHER');
    };
    /** Listener for toggle switch */
    DataGridFilter.prototype.columnPinned = function (event) {
        this.pinColumn.emit({ cellKey: this.cellKey, status: event.detail.status });
    };
    /** Listener to value from dxp-input component */
    DataGridFilter.prototype.inputEntered = function (event) {
        this.enteredValue = event.detail.value;
    };
    /** click listener for cta button */
    DataGridFilter.prototype.submitHandler = function (e) {
        if (e.target.getAttribute('btn-id') === 'filterButton') {
            this.filterDataGrid(e, 'filtering', this.selectedValue, this.enteredValue);
        }
        else if (e.target.getAttribute('btn-id') === 'clearButton') {
            this.filterDataGrid(e, 'remove-filter');
        }
    };
    /** Filter function */
    DataGridFilter.prototype.filterDataGrid = function (event, filterAction, filterCondition, filterValue) {
        event.preventDefault();
        this.filterGrid.emit({ 'cellKey': this.cellKey, 'filterAction': filterAction, 'filterCondition': filterCondition, 'filterValue': filterValue });
    };
    /** to read dropdown value */
    DataGridFilter.prototype.handleSelect = function (event) {
        this.selectedValue = event.target.value;
    };
    /** Set selectedSort state */
    DataGridFilter.prototype.setSelectedSort = function () {
        if (this.cellOptions && this.cellOptions.sortOptions && this.cellOptions.sortOptions[this.cellKey]) {
            this.selectedSort = this.cellOptions.sortOptions[this.cellKey];
        }
        if (this.cellOptions.pinnedColumns && (this.cellOptions.pinnedColumns[this.cellKey] || this.cellOptions.pinnedColumns[this.cellKey] === 0)) {
            this.isPinned = true;
        }
        else if (this.cellOptions.maxPinsReached) {
            this.isPinDisabled = true;
            this.maxPinError = dxp.i18n.t('DataGrid:maxPinExceededMsg') + " " + Object.keys(this.cellOptions.pinnedColumns).length + " " + dxp.i18n.t('DataGrid:columnsText');
        }
        if (this.cellOptions.filterOptions && this.cellOptions.filterOptions[this.cellKey]) {
            this.selectedValue = this.cellOptions.filterOptions[this.cellKey].filterCondition;
            this.enteredValue = this.cellOptions.filterOptions[this.cellKey].filterValue;
        }
    };
    /** Sort function */
    DataGridFilter.prototype.sortDataGrid = function (event, sortAction) {
        event.preventDefault();
        event.currentTarget.classList.add(IS_SELECTED);
        this.sortGrid.emit({ 'cellKey': this.cellKey, 'sortAction': sortAction });
    };
    /** Render the data grid */
    DataGridFilter.prototype.render = function () {
        var _this = this;
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, h("div", { class: "options-wrapper" }, h("a", { href: "javascript : void(0)", onClick: function (e) { return _this.sortDataGrid(e, 'ascending'); }, class: "sort-btn " + (this.selectedSort === 'ascending' ? IS_SELECTED : '') }, h("i", { class: "btn-icon asc-icon" }), dxp.i18n.t('DataGrid:sortAscText')), h("a", { href: "javascript : void(0)", onClick: function (e) { return _this.sortDataGrid(e, 'descending'); }, class: "sort-btn " + (this.selectedSort === 'descending' ? IS_SELECTED : '') }, h("i", { class: "btn-icon desc-icon" }), dxp.i18n.t('DataGrid:sortDescText')), h("a", { href: "javascript : void(0)", onClick: function (e) { return _this.sortDataGrid(e, 'remove-sort'); }, class: "sort-btn" }, h("i", { class: "btn-icon cross-icon" }), dxp.i18n.t('DataGrid:removeSortText'))), h("div", { class: "options-wrapper" }, h("dxp-toggle-switch", { label: "Pin this column", description: this.maxPinError, "label-position": "left", checked: this.isPinned, disabled: this.isPinDisabled })), h("div", { class: "options-wrapper", ref: function (el) { _this.filterElement = el; } }, h("div", { class: "option-section" }, h("div", { class: "dropdown-label" }, dxp.i18n.t('DataGrid:filterConditionText')), h("select", { class: "dropdown", onChange: function (event) { return _this.handleSelect(event); } }, h("option", { value: "notSelected", selected: this.selectedValue === 'notSelected' }, dxp.i18n.t('DataGrid:selectText')), h("option", { value: "isEqualTo", selected: this.selectedValue === 'isEqualTo' }, dxp.i18n.t('DataGrid:isEqualToText')), h("option", { value: "isNotEqualTo", selected: this.selectedValue === 'isNotEqualTo' }, dxp.i18n.t('DataGrid:isNotEqualToText')))), h("div", { class: "option-section" }, h("dxp-input", { type: "text", label: dxp.i18n.t('DataGrid:valueText'), value: this.enteredValue, "is-required": "true", disabled: this.selectedValue === 'notSelected' || this.selectedValue === '' || this.selectedValue === undefined, "max-length": "100", "accessibility-text": "{dxp.i18n.t('DataGrid:filterAccesibilityText')}", placeholder: dxp.i18n.t('DataGrid:searchText') })), h("dxp-cta-list", { "title-text": "", orientation: "horizontal" }, h("dxp-cta", { type: "button", "btn-id": "filterButton", disabled: (this.selectedValue === 'notSelected' || this.selectedValue === ''
                || this.selectedValue === undefined || this.enteredValue === ''), "button-type": "primary", text: dxp.i18n.t('DataGrid:filter') }), h("dxp-cta", { type: "button", "btn-id": "clearButton", "button-type": "secondary", text: dxp.i18n.t('DataGrid:clear') })))));
    };
    Object.defineProperty(DataGridFilter.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataGridFilter, "style", {
        get: function () { return "div.dxp.dxp-data-grid-filter{position:absolute;top:100%;-webkit-transform:translateY(1.25rem);transform:translateY(1.25rem);left:-.625rem;z-index:5;width:300px}div.dxp.dxp-data-grid-filter .options-wrapper{padding:1rem 1.5rem .12rem;word-break:break-word}div.dxp.dxp-data-grid-filter .options-wrapper .option-section,div.dxp.dxp-data-grid-filter .options-wrapper .sort-btn{margin-bottom:1rem}div.dxp.dxp-data-grid-filter .options-wrapper .dropdown-label{font-size:.75rem;margin-bottom:.5rem}div.dxp.dxp-data-grid-filter .options-wrapper .sort-btn{display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid-filter .options-wrapper .sort-btn .btn-icon{display:inline-block;width:1.5rem;height:1.5rem;margin-right:1rem}"; },
        enumerable: true,
        configurable: true
    });
    return DataGridFilter;
}());
export { DataGridFilter as dxp_data_grid_filter };
