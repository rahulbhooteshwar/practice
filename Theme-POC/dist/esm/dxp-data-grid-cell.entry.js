import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-dff7d435.js';

const DataGridCell = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Cell type */
        this.cellType = 'text';
        this.dxpDataGridEvents = createEvent(this, "dxpDataGridEvents", 7);
        this.toggleFilterEvent = createEvent(this, "toggleFilterEvent", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'DataGridCell', messages);
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        if (this.cellType === 'cta') {
            let ctadata = this.data.celldata.cta;
            const ctaListdata = this.data.celldata.cta.ctaList;
            const rowData = this.data.row;
            const ctaListdataArray = ctaListdata.map(it => Object.entries(it));
            const updatedValues = ctaListdataArray.map(item => item.reduce((result, next) => {
                const nextValue = next[1];
                const nextKey = next[0];
                let returnJson = {};
                if (nextValue) {
                    const dynamicKeys = ['src', 'text', 'disabled'];
                    const cellValue = dynamicKeys.includes(nextKey) ? rowData[nextValue] : nextValue;
                    returnJson = (Object.assign(Object.assign({}, result), { [nextKey]: cellValue }));
                }
                else {
                    returnJson = result;
                }
                return returnJson;
            }, {}));
            ctadata = Object.assign(Object.assign({}, ctadata), { ctaList: updatedValues });
            this.base.createNestedMarkup(this.cellElement, 'dxp-cta-list', [ctadata]);
        }
        else if (this.cellType === 'text') {
            if (this.content) {
                this.cellElement.innerHTML = this.content;
            }
        }
        else if (this.cellType === 'checkbox') {
            this.cellTypeCheckBox();
        }
        if (this.isHeader && this.cellKey) {
            this.base.createNestedMarkup(this.filterWrapperElement, 'dxp-data-grid-filter', [{ cellKey: this.cellKey, cellOptions: this.cellOptions }]);
            this.setSortFilterIcon();
            // set tabindex for headers
            this.element.children[0].querySelector('span[div-id=\"data-grid-cell\"]').setAttribute('tabindex', '0');
            this.element.children[0].querySelector('span[div-id=\"data-grid-cell\"]').setAttribute('role', 'button');
        }
    }
    /** Listener to value from dxp-cta component */
    buttonClicked(event) {
        if (event.target.getAttribute('btn-id') === 'filterButton') {
            return false;
        }
        const emitJSON = { actionName: this.data.header['column_action'] || 'ctaClickEvent', row: this.data.row, details: event.detail };
        this.dxpDataGridEvents.emit(emitJSON);
    }
    /** click listener for checkbox */
    checkboxClicked(event) {
        const emitJSON = { actionName: this.data.header['column_action'] || 'checkboxData', row: this.data.row, details: event.detail };
        this.dxpDataGridEvents.emit(emitJSON);
    }
    /** Listener for action to perform toggle filter on key press event */
    handleKeyEvents(event) {
        if (this.enableFilter) {
            this.toggleFilters(event);
        }
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** when cell type is checkbox */
    cellTypeCheckBox() {
        const checkboxList = this.base.createNestedMarkup(this.cellElement, 'dxp-checkbox', [this.data.celldata]);
        checkboxList[0]['componentOnReady']().then((checkboxElement) => {
            const checkboxDiv = checkboxElement ? checkboxElement.querySelector('.dxp-checkbox') : checkboxElement.querySelector('.dxp-checkbox');
            checkboxDiv.style.background = 'transparent';
            const COL_KEY = this.data.header['column_key'];
            const COL_KEY_VALUE = typeof COL_KEY === 'function' ? COL_KEY(this.data.row) : COL_KEY;
            if (COL_KEY !== undefined) {
                const checked = typeof COL_KEY_VALUE === 'boolean' ? COL_KEY_VALUE : this.data.row[COL_KEY_VALUE];
                checkboxElement['setChecked'](checked);
            }
            if (this.data.celldata.value === 'select') {
                checkboxElement.setAttribute('dxpgrid', 'select');
            }
            if (this.data.celldata.value === 'selectall') {
                checkboxElement.setAttribute('dxpgrid', 'selectall');
                checkboxElement.setChecked(this.data.celldata.selected);
            }
        });
    }
    /** set sort icon ascending or descending */
    setSortFilterIcon() {
        if (this.cellOptions && this.cellOptions.sortOptions && this.cellOptions.sortOptions[this.cellKey]) {
            this.sortIcon = this.cellOptions.sortOptions[this.cellKey];
        }
        if (this.cellOptions.filterOptions && this.cellOptions.filterOptions[this.cellKey]) {
            this.filterIcon = this.cellOptions.filterOptions[this.cellKey].filterAction;
        }
    }
    /** Shows or Hides the filter dialog */
    toggleFilters(e) {
        if (this.cellKey && e.target.getAttribute('div-id') === 'data-grid-cell' && this.isHeader && !this.showFilters) {
            this.toggleFilterEvent.emit(this.cellKey);
        }
    }
    /** Render the data grid */
    render() {
        return (h("div", { "div-id": "data-grid-cell", class: `${this.base.componentClass()} grid-cell ${this.enableFilter && this.isHeader && this.cellKey ? 'is-clickable' : ''}
      ${this.showFilters ? 'is-selected' : ''}`, "data-theme": this.theme, style: { 'width': this.width || '250px' }, onClick: e => (this.enableFilter) ? this.toggleFilters(e) : '' }, h("span", { "div-id": "data-grid-cell", ref: el => { this.cellElement = el; } }, h("slot", null)), this.sortIcon && h("i", { "div-id": "data-grid-cell", class: `sort-icon ${this.sortIcon}` }), this.filterIcon && h("i", { "div-id": "data-grid-cell", class: `filter-icon` }), this.isHeader && this.cellKey &&
            h("div", { class: `filter-wrapper ${this.showFilters ? 'dxp-block' : 'dxp-none'}`, ref: el => { this.filterWrapperElement = el; } })));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-data-grid-cell{background:none;word-break:break-word;word-wrap:break-word;padding:1rem 0 1rem .625rem;display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid-cell.data-grid-cell{text-align:left;line-height:26px}div.dxp.dxp-data-grid-cell .filter-wrapper{position:relative;left:-100%}div.dxp.dxp-data-grid-cell span{padding-right:.625rem;-ms-flex:1;flex:1;max-width:100%}div.dxp.dxp-data-grid-cell .filter-icon,div.dxp.dxp-data-grid-cell .sort-icon{height:1.5rem;width:1rem;margin-right:.5rem}"; }
};

export { DataGridCell as dxp_data_grid_cell };
