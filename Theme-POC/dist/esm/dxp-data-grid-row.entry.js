import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-dff7d435.js';

const DATA_GRID_ROW = 'data-grid-row';
const DataGridRow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'DataGridRow', messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        if (this.data) {
            this.base.createNestedMarkup(this.rowElement, 'dxp-data-grid-cell', this.data.rowStructure);
            const cellElements = this.element.querySelectorAll('dxp-data-grid-cell');
            for (let index = 0; index < cellElements.length; index++) {
                const cellEle = cellElements[index];
                const cellKey = this.data.rowStructure[index].cellKey || '';
                if (cellKey && this.data.pinnedColumns && (this.data.pinnedColumns[cellKey] || this.data.pinnedColumns[cellKey] === 0)) {
                    const leftStyle = `${this.data.pinnedColumns[cellKey]}px`;
                    cellEle.classList.add('pin-column');
                    cellEle.setAttribute('style', `left: ${this.data.pinnedColumns[cellKey] > 0 ? leftStyle : this.data.pinnedColumns[cellKey]}`);
                }
                this.handleColumnPinFeatures(cellEle, index);
            }
            const pinnedColumns = this.element.querySelectorAll('dxp-data-grid-cell.pin-column');
            if (pinnedColumns.length > 0) {
                pinnedColumns[pinnedColumns.length - 1].classList.add('last-pin-column');
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** to handle column pin features */
    handleColumnPinFeatures(cellEle, index) {
        if (this.data.rowStructure[index] && (this.data.rowStructure[index].pinned >= 0)) {
            cellEle.classList.add('pin-column');
            cellEle.setAttribute('style', `left: ${this.data.rowStructure[index].pinned > 0 ?
                `${this.data.rowStructure[index].pinned}px` : this.data.rowStructure[index].pinned}`);
        }
        if (this.isHeader) {
            cellEle.setAttribute('is-header', this.isHeader);
        }
    }
    /** Render the Row */
    render() {
        const isHeader = this.isHeader ? `${DATA_GRID_ROW} dxp-data-grid-head grid-head` : DATA_GRID_ROW;
        const stackHeaderColor = this.stackHeaderColor ? `${DATA_GRID_ROW} dxp-stack-headers has-bg-color` : DATA_GRID_ROW;
        const isStackHeader = this.isStackHeader ? `${DATA_GRID_ROW} dxp-stack-headers` : DATA_GRID_ROW;
        return (h("div", { class: `${this.base.componentClass()} ${isHeader} ${stackHeaderColor} ${isStackHeader} `, dir: this.dir, "data-theme": this.theme, ref: el => { this.rowElement = el; } }, h("slot", null)));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-data-grid-row.data-grid-row{border-top:none}\@media (max-width:1024px){div.dxp.dxp-data-grid-row.data-grid-row{width:auto}}div.dxp.dxp-data-grid-row.data-grid-row>dxp-data-grid-cell,div.dxp.dxp-data-grid-row.data-grid-row>dxp-data-grid-head{display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid-row dxp-data-grid-cell,div.dxp.dxp-data-grid-row dxp-data-grid-head{-ms-flex:1 auto;flex:1 auto}div.dxp.dxp-data-grid-row dxp-data-grid-cell.pin-column,div.dxp.dxp-data-grid-row dxp-data-grid-head.pin-column{position:-webkit-sticky;position:sticky;z-index:2;left:0}div.dxp.dxp-data-grid-row.grid-head{z-index:4}div.dxp.dxp-data-grid-row.dxp-stack-headers{text-align:center}div.dxp.dxp-data-grid-row.dxp-stack-headers .last-pin-column .grid-cell{border:none}div.dxp.dxp-data-grid-row div.dxp.dxp-data-grid-head:host{display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid-row div.dxp.dxp-data-grid-head.grid-head{display:-ms-flexbox;display:flex;text-align:left;letter-spacing:1.8px;line-height:24px}"; }
};

export { DataGridRow as dxp_data_grid_row };
