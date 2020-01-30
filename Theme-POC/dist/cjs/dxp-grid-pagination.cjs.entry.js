'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-656d8fa0.js');

const GridPagination = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** Index of currently showing page */
        this.currentPageIndex = 1;
        this.toPageNumber = core$1.createEvent(this, "toPageNumber", 7);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'GridPagination', messages.messages);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-data-grid.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
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
            return `${core$1.dxp.i18n.t('GridPagination:displayingText')} (${this.firstRowIndex}-${this.lastRowIndex} ${core$1.dxp.i18n.t('GridPagination:ofTxt')} ${this.totalRows})`;
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-data-grid-row render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: `${this.base.componentClass()} grid-pagination`, "data-theme": this.theme, style: { 'width': this.width || 'auto' } }, this.showPaginationSection &&
            (core$1.h("div", { class: "paging-panel" }, core$1.h("span", { class: "paging-page-summary-panel" }, core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: core$1.dxp.i18n.t('GridPagination:firstText'), class: "item-icon icon-first" }), core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: core$1.dxp.i18n.t('GridPagination:previousText'), class: "item-icon icon-previous" }), core$1.dxp.i18n.t('GridPagination:pageTxt'), " ", core$1.h("span", { class: "paging-text input" }, core$1.h("dxp-input", { type: "number", "content-id": "manual-enter-input", "is-required": "false", min: "1", max: this.totalPages ? this.totalPages.toString() : '', label: "", "enable-autocomplete": "off", readonly: false, value: this.currentPageIndex, disabled: false })), " ", core$1.dxp.i18n.t('GridPagination:ofTxt'), " ", core$1.h("span", null, this.totalPages), core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: core$1.dxp.i18n.t('GridPagination:nextText'), class: "item-icon icon-next" }), core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: core$1.dxp.i18n.t('GridPagination:lastText'), class: "item-icon icon-last" })), this.isValidPageNumber ?
                (core$1.h("span", { class: "paging-row-summary-panel" }, this.getTextForCurrentPage()))
                :
                    (core$1.h("div", { class: "input-error", "aria-label": this.validationMessage }, this.validationMessage, " 1 and ", this.totalPages))))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "totalRows": ["totalRowsChangeHandler"]
    }; }
    static get style() { return ".paging-panel{line-height:1.4rem}\@media (max-width:993px){.paging-panel>span{font-size:.75rem}}.paging-panel{padding:2rem 0 .75rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}.paging-panel>span{margin-right:1rem}.paging-panel .item-icon{display:inline-block;width:.75rem;height:1rem;margin-right:.5rem}.paging-button{position:relative}.paging-text input{width:100%}.paging-text dxp-input{position:relative;display:-ms-inline-flexbox;display:inline-flex;bottom:1.4rem}.paging-page-summary-panel{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.paging-page-summary-panel .paging-button{position:relative}.paging-page-summary-panel .paging-button button{position:absolute;cursor:pointer;opacity:0;top:0;right:0;bottom:0;left:0}.paging-page-summary-panel span{margin:0 .25rem}.input-error{color:#d02d35;padding:.625rem 0 0;font-size:.75rem;float:right}.input{display:inline-block;width:4rem;height:2.7rem}"; }
};

exports.dxp_grid_pagination = GridPagination;
