import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-data-grid */
export class DataGridCell {
    constructor() {
        /** Cell type */
        this.cellType = 'text';
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
      ${this.showFilters ? 'is-selected' : ''}`, "data-theme": this.theme, style: { 'width': this.width || '250px' }, onClick: e => (this.enableFilter) ? this.toggleFilters(e) : '' },
            h("span", { "div-id": "data-grid-cell", ref: el => { this.cellElement = el; } },
                h("slot", null)),
            this.sortIcon && h("i", { "div-id": "data-grid-cell", class: `sort-icon ${this.sortIcon}` }),
            this.filterIcon && h("i", { "div-id": "data-grid-cell", class: `filter-icon` }),
            this.isHeader && this.cellKey &&
                h("div", { class: `filter-wrapper ${this.showFilters ? 'dxp-block' : 'dxp-none'}`, ref: el => { this.filterWrapperElement = el; } })));
    }
    static get is() { return "dxp-data-grid-cell"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-data-grid-cell.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-data-grid-cell.css"]
    }; }
    static get properties() { return {
        "cellKey": {
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
                "text": "cell key"
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
                "text": "sort and filter options"
            },
            "attribute": "cell-options",
            "reflect": false
        },
        "cellType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'text' | 'cta' | 'checkbox'",
                "resolved": "\"checkbox\" | \"cta\" | \"text\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Cell type"
            },
            "attribute": "cell-type",
            "reflect": false,
            "defaultValue": "'text'"
        },
        "content": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "content inside cell of grid"
            },
            "attribute": "content",
            "reflect": true
        },
        "data": {
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
                "text": "cell data"
            },
            "attribute": "data",
            "reflect": false
        },
        "enableFilter": {
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
                "text": "enableFilter - flag to enable/disable filter dialog"
            },
            "attribute": "enable-filter",
            "reflect": false
        },
        "isHeader": {
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
                "text": "header false"
            },
            "attribute": "is-header",
            "reflect": false
        },
        "showFilters": {
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
                "text": "showFilters - flag to show/hide filter dialog"
            },
            "attribute": "show-filters",
            "reflect": false
        },
        "width": {
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
                "text": "cell width"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "filterIcon": {},
        "locale": {},
        "sortIcon": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "dxpDataGridEvents",
            "name": "dxpDataGridEvents",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit cell event"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "toggleFilterEvent",
            "name": "toggleFilterEvent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit on click header cell"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "ctaClickEvent",
            "method": "buttonClicked",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "checkboxData",
            "method": "checkboxClicked",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keypress",
            "method": "handleKeyEvents",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
