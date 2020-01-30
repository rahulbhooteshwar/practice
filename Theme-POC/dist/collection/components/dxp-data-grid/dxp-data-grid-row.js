import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const DATA_GRID_ROW = 'data-grid-row';
/** dxp-data-grid */
export class DataGridRow {
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
        return (h("div", { class: `${this.base.componentClass()} ${isHeader} ${stackHeaderColor} ${isStackHeader} `, dir: this.dir, "data-theme": this.theme, ref: el => { this.rowElement = el; } },
            h("slot", null)));
    }
    static get is() { return "dxp-data-grid-row"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-data-grid-row.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-data-grid-row.css"]
    }; }
    static get properties() { return {
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
                "text": "attribute to pass row data"
            },
            "attribute": "data",
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
                "text": "attribute to check row and head row"
            },
            "attribute": "is-header",
            "reflect": false
        },
        "isStackHeader": {
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
                "text": "attribute to check stackheader"
            },
            "attribute": "is-stack-header",
            "reflect": false
        },
        "stackHeaderColor": {
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
                "text": "attribute to check color of stackhead"
            },
            "attribute": "stack-header-color",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
