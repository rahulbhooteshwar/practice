import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-grid-pagination */
export class GridPagination {
    constructor() {
        /** Index of currently showing page */
        this.currentPageIndex = 1;
    }
    /** Listener that looks for totalRows to be changed */
    totalRowsChangeHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            const pageIfRemainder = (this.totalRows % this.totalRowsPerPage) > 0 ? 1 : 0;
            this.totalPages = Math.floor(this.totalRows / this.totalRowsPerPage) + pageIfRemainder;
            this.currentPageIndex = 1;
            this.updateDataGridIndex();
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.isValidPageNumber = true;
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'GridPagination', messages);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-data-grid.min.css`;
        dxp.util.appendLinkElement(shadow, href);
        this.validationMessage = 'Please enter a valid page number between ';
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        const pageIfRemainder = (this.totalRows % this.totalRowsPerPage) > 0 ? 1 : 0;
        this.totalPages = Math.floor(this.totalRows / this.totalRowsPerPage) + pageIfRemainder;
    }
    /** Listener to value from dxp-input component */
    inputEntered(event) {
        this.gotoPage(event);
    }
    /** method for showing indexing of current page */
    getTextForCurrentPage() {
        if (this.currentPageIndex <= this.totalPages && this.currentPageIndex >= 1) {
            this.firstRowIndex = ((this.currentPageIndex - 1) * this.totalRowsPerPage) + 1;
            this.lastRowIndex = (this.currentPageIndex === this.totalPages) ? (this.totalRows) : this.firstRowIndex + this.totalRowsPerPage - 1;
            return `${dxp.i18n.t('GridPagination:displayingText')} (${this.firstRowIndex}-${this.lastRowIndex} ${dxp.i18n.t('GridPagination:ofTxt')} ${this.totalRows})`;
        }
    }
    /** action for switching page on navigation */
    gotoPage(e) {
        e.preventDefault();
        this.isValidPageNumber = true;
        const selectedTarget = e.target;
        if (selectedTarget.classList.contains('icon-next')) {
            if (this.currentPageIndex < this.totalPages) {
                this.currentPageIndex++;
            }
        }
        else if (selectedTarget.classList.contains('icon-previous')) {
            if (this.currentPageIndex > 1) {
                this.currentPageIndex--;
            }
        }
        else if (selectedTarget.classList.contains('icon-first')) {
            this.currentPageIndex = 1;
        }
        else if (selectedTarget.classList.contains('icon-last')) {
            this.currentPageIndex = this.totalPages;
        }
        else if (e.detail.value) {
            const manualEnteredText = Number(e.detail.value);
            if (manualEnteredText <= this.totalPages && manualEnteredText >= 1) {
                this.currentPageIndex = manualEnteredText;
            }
            else {
                this.currentPageIndex = manualEnteredText;
                this.isValidPageNumber = false;
            }
        }
        if (this.isValidPageNumber) {
            this.updateDataGridIndex();
            this.toPageNumber.emit({ 'toPageNumber': this.currentPageIndex, 'firstRowIndex': this.firstRowIndex, 'lastRowIndex': this.lastRowIndex });
        }
    }
    /** code to fire event for updating data-grid */
    updateDataGridIndex() {
        this.firstRowIndex = (this.currentPageIndex * this.totalRowsPerPage) - this.totalRowsPerPage;
        this.lastRowIndex = (this.currentPageIndex * this.totalRowsPerPage);
        this.lastRowIndex = this.totalRows < this.lastRowIndex ? this.totalRows : this.lastRowIndex;
    }
    /** Render the pagination */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-data-grid-row render() : ${process.env.MODE}`);
        return (h("div", { class: `${this.base.componentClass()} grid-pagination`, "data-theme": this.theme, style: { 'width': this.width || 'auto' } }, this.showPaginationSection &&
            (h("div", { class: "paging-panel" },
                h("span", { class: "paging-page-summary-panel" },
                    h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: dxp.i18n.t('GridPagination:firstText'), class: "item-icon icon-first" }),
                    h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: dxp.i18n.t('GridPagination:previousText'), class: "item-icon icon-previous" }),
                    dxp.i18n.t('GridPagination:pageTxt'),
                    " ",
                    h("span", { class: "paging-text input" },
                        h("dxp-input", { type: "number", "content-id": "manual-enter-input", "is-required": "false", min: "1", max: this.totalPages ? this.totalPages.toString() : '', label: "", "enable-autocomplete": "off", readonly: false, value: this.currentPageIndex, disabled: false })),
                    " ",
                    dxp.i18n.t('GridPagination:ofTxt'),
                    " ",
                    h("span", null, this.totalPages),
                    h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: dxp.i18n.t('GridPagination:nextText'), class: "item-icon icon-next" }),
                    h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: dxp.i18n.t('GridPagination:lastText'), class: "item-icon icon-last" })),
                this.isValidPageNumber ?
                    (h("span", { class: "paging-row-summary-panel" }, this.getTextForCurrentPage()))
                    :
                        (h("div", { class: "input-error", "aria-label": this.validationMessage },
                            this.validationMessage,
                            " 1 and ",
                            this.totalPages))))));
    }
    static get is() { return "dxp-grid-pagination"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-grid-pagination.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-grid-pagination.css"]
    }; }
    static get properties() { return {
        "currentPageIndex": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Index of currently showing page"
            },
            "attribute": "current-page-index",
            "reflect": true,
            "defaultValue": "1"
        },
        "showPaginationSection": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "flag to show/hide pagination"
            },
            "attribute": "show-pagination-section",
            "reflect": true
        },
        "totalRowsPerPage": {
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
                "text": "Total number of records per page"
            },
            "attribute": "total-rows-per-page",
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
                "text": "Pagination width"
            },
            "attribute": "width",
            "reflect": false
        },
        "totalRows": {
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
                "text": "Total Number of records in data grid"
            },
            "attribute": "total-rows",
            "reflect": false
        }
    }; }
    static get states() { return {
        "firstRowIndex": {},
        "isValidPageNumber": {},
        "lastRowIndex": {},
        "theme": {},
        "totalPages": {},
        "validationMessage": {}
    }; }
    static get events() { return [{
            "method": "toPageNumber",
            "name": "toPageNumber",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit when changing current page"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "totalRows",
            "methodName": "totalRowsChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "textValue",
            "method": "inputEntered",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
