'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        displayText: 'Displaying',
        firstButtonText: 'First',
        lastButtonText: 'Last',
        previousButtonText: 'Previous',
        nextButtonText: 'Next',
        ofText: 'of',
        pageText: 'Page',
        andText: 'and',
        validationMessage: 'Please enter a valid page number between',
        inputAccessibilityText: 'Insert page index'
    },
    'en-US': {
        displayText: 'Displaying',
        firstButtonText: 'First',
        lastButtonText: 'Last',
        previousButtonText: 'Previous',
        nextButtonText: 'Next',
        ofText: 'of',
        pageText: 'Page',
        andText: 'and',
        validationMessage: 'Please enter a valid page number between',
        inputAccessibilityText: 'Insert page index'
    },
    'es': {
        displayText: 'Displaying',
        firstButtonText: 'First',
        lastButtonText: 'Last',
        previousButtonText: 'Previous',
        nextButtonText: 'Next',
        ofText: 'of',
        pageText: 'Page',
        andText: 'and',
        validationMessage: 'Please enter a valid page number between',
        inputAccessibilityText: 'Insert page index'
    },
    'es-ES': {
        displayText: 'Displaying',
        firstButtonText: 'First',
        lastButtonText: 'Last',
        previousButtonText: 'Previous',
        nextButtonText: 'Next',
        ofText: 'of',
        pageText: 'Page',
        andText: 'and',
        validationMessage: 'Please enter a valid page number between',
        inputAccessibilityText: 'Insert page index'
    }
};

const Pagination = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** Object to hold all text strings */
        this.textGroup = {
            displayText: '',
            firstButtonLabel: '',
            lastButtonLabel: '',
            previousButtonLabel: '',
            nextButtonLabel: '',
            ofText: '',
            pageText: '',
            andText: '',
            validationMessage: '',
            inputAccessibilityText: ''
        };
        /** Flag to show/hide pagination */
        this.showPagination = true;
        /** Flag to hide pagination if single page present */
        this.hideWhenSinglePage = true;
        /** Pagination position */
        this.position = 'left';
        /** Index of currently showing page */
        this.currentPageIndex = 1;
        this.toPageNumber = core$1.createEvent(this, "toPageNumber", 7);
    }
    /** Listener that looks for totalUnits to be changed */
    currentPageIndexChangeHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.setPagination();
        }
    }
    /** Listener that looks for totalUnits to be changed */
    totalUnitsChangeHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            const pageIfRemainder = (this.totalUnits % this.unitsPerPage) > 0 ? 1 : 0;
            this.totalPages = Math.floor(this.totalUnits / this.unitsPerPage) + pageIfRemainder;
            this.currentPageIndex = 1;
            this.showPagination = !(this.hideWhenSinglePage && this.totalPages <= 1);
            this.setPagination();
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.isValidPageNumber = true;
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Pagination', messages);
        this.setTextGroup();
        const shadow = this.element ? this.element : this.element;
        let href = `${"https://asset.mastercard.com/dxp-styles/latest/css"}/dxp.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${"https://asset.mastercard.com/dxp-styles/latest/css"}/themes/${this.theme}/${this.theme}.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${"https://asset.mastercard.com/dxp-styles/latest/css"}/themes/${this.theme}/dxp-pagination.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to be performed after component loads */
    componentDidLoad() {
        const pageIfRemainder = (this.totalUnits % this.unitsPerPage) > 0 ? 1 : 0;
        this.totalPages = Math.floor(this.totalUnits / this.unitsPerPage) + pageIfRemainder;
        this.disableButtons();
        this.showPagination = !(this.hideWhenSinglePage && this.totalPages <= 1);
    }
    /** Listener to value from dxp-input component */
    inputEntered(event) {
        this.gotoPage(event);
    }
    /** method to disable/enable buttons */
    disableButtons() {
        this.disablePrev = false;
        this.disableNext = false;
        if (this.currentPageIndex <= 1) {
            this.disablePrev = true;
        }
        if (this.currentPageIndex >= this.totalPages) {
            this.disableNext = true;
        }
    }
    /** method for showing indexing of current page */
    getTextForCurrentPage() {
        if (this.currentPageIndex <= this.totalPages && this.currentPageIndex >= 1) {
            this.firstUnitIndex = ((this.currentPageIndex - 1) * this.unitsPerPage) + 1;
            this.lastUnitIndex = (this.currentPageIndex === this.totalPages) ? (this.totalUnits) : this.firstUnitIndex + this.unitsPerPage - 1;
            return `${this.textGroup.displayText} (${this.firstUnitIndex}${this.unitsPerPage > 1 ?
                `-${this.lastUnitIndex}` : ''} ${this.textGroup.ofText} ${this.totalUnits})`;
        }
    }
    /** action for switching page on navigation */
    gotoPage(e) {
        e.preventDefault();
        this.isValidPageNumber = true;
        const selectedTarget = e.target;
        if (selectedTarget.classList.contains('icon-next')) {
            if (this.currentPageIndex < 1) {
                this.currentPageIndex = 1;
            }
            else if (this.currentPageIndex < this.totalPages) {
                this.currentPageIndex++;
            }
        }
        else if (selectedTarget.classList.contains('icon-previous')) {
            if (this.currentPageIndex > this.totalPages) {
                this.currentPageIndex = this.totalPages;
            }
            else if (this.currentPageIndex > 1) {
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
            const manualEnteredText = Math.floor(Number(e.detail.value));
            this.currentPageIndex = manualEnteredText;
        }
        this.setPagination();
    }
    /** update pagination when currentPageIndex changes */
    setPagination() {
        if (!(this.currentPageIndex >= 1 && this.currentPageIndex <= this.totalPages)) {
            this.isValidPageNumber = false;
        }
        if (this.isValidPageNumber) {
            this.disableButtons();
            this.updateUnitIndex();
            this.toPageNumber.emit({ 'toPageNumber': this.currentPageIndex, 'firstUnitIndex': this.firstUnitIndex, 'lastUnitIndex': this.lastUnitIndex });
        }
    }
    /** Assign all text strings to text group variable */
    setTextGroup() {
        this.textGroup.displayText = this.displayText ? this.displayText : core$1.dxp.i18n.t('Pagination:displayText');
        this.textGroup.firstButtonLabel = this.firstButtonLabel ? this.firstButtonLabel : core$1.dxp.i18n.t('Pagination:firstButtonText');
        this.textGroup.lastButtonLabel = this.lastButtonLabel ? this.lastButtonLabel : core$1.dxp.i18n.t('Pagination:lastButtonText');
        this.textGroup.previousButtonLabel = this.previousButtonLabel ? this.previousButtonLabel : core$1.dxp.i18n.t('Pagination:previousButtonText');
        this.textGroup.nextButtonLabel = this.nextButtonLabel ? this.nextButtonLabel : core$1.dxp.i18n.t('Pagination:nextButtonText');
        this.textGroup.ofText = this.ofText ? this.ofText : core$1.dxp.i18n.t('Pagination:ofText');
        this.textGroup.pageText = this.pageText ? this.pageText : core$1.dxp.i18n.t('Pagination:pageText');
        this.textGroup.andText = this.andText ? this.andText : core$1.dxp.i18n.t('Pagination:andText');
        this.textGroup.validationMessage = this.validationMessage ? this.validationMessage : core$1.dxp.i18n.t('Pagination:validationMessage');
        this.textGroup.inputAccessibilityText = this.inputAccessibilityText ? this.inputAccessibilityText : core$1.dxp.i18n.t('Pagination:inputAccessibilityText');
    }
    /** code to fire event for updating pagination */
    updateUnitIndex() {
        this.firstUnitIndex = (this.currentPageIndex * this.unitsPerPage) - this.unitsPerPage;
        this.lastUnitIndex = (this.currentPageIndex * this.unitsPerPage);
        this.lastUnitIndex = this.totalUnits < this.lastUnitIndex ? this.totalUnits : this.lastUnitIndex;
    }
    /** Render the pagination */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-timer render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-pagination.min.css` })]
        ];
        return (core$1.h("div", { class: `${this.base.componentClass()} pagination`, dir: this.dir, "data-theme": this.theme, style: { 'width': this.width || 'auto' } }, styles, this.showPagination &&
            (core$1.h("div", { class: `paging-panel ${this.position}` }, core$1.h("span", { class: "paging-page-summary-panel" }, core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.firstButtonLabel, class: `item-icon ${this.disablePrev ?
                    'icon-first-disabled item-disabled' : 'icon-first'}`, tabindex: this.disablePrev ? '-1' : '0' }), core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.previousButtonLabel, class: `item-icon ${this.disablePrev ? 'icon-previous-disabled item-disabled' : 'icon-previous'}`, tabindex: this.disablePrev ? '-1' : '0' }), this.textGroup.pageText, " ", core$1.h("span", { class: "paging-text input" }, core$1.h("dxp-input", { type: "number", "content-id": "manual-enter-input", "is-optional": "false", min: "1", max: this.totalPages ? this.totalPages.toString() : '', label: "", "accessibility-text": this.textGroup.inputAccessibilityText, "enable-autocomplete": "off", readonly: false, value: this.currentPageIndex, disabled: this.totalPages <= 1, "validation-message": "\u00A0" })), " ", this.textGroup.ofText, " ", core$1.h("span", null, this.totalPages), core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.nextButtonLabel, class: `item-icon ${this.disableNext ? 'icon-next-disabled item-disabled' : 'icon-next'}`, tabindex: this.disableNext ? '-1' : '0' }), core$1.h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.lastButtonLabel, class: `item-icon ${this.disableNext ? 'icon-last-disabled item-disabled' : 'icon-last'}`, tabindex: this.disableNext ? '-1' : '0' })), this.isValidPageNumber ?
                (core$1.h("span", { class: "paging-page-summary-panel display-message" }, this.getTextForCurrentPage()))
                :
                    (core$1.h("span", { class: "input-error display-message" }, `${this.textGroup.validationMessage} 1 ${this.textGroup.andText} ${this.totalPages}`))))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "currentPageIndex": ["currentPageIndexChangeHandler"],
        "totalUnits": ["totalUnitsChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-pagination .paging-panel{line-height:1.4rem}\@media (max-width:993px){div.dxp.dxp-pagination .paging-panel>span{font-size:.75rem}}div.dxp.dxp-pagination .paging-panel{padding:2rem 0 .75rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-pagination .paging-panel.center{-ms-flex-pack:center;justify-content:center}div.dxp.dxp-pagination .paging-panel.right{-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-pagination .paging-panel .item-icon{display:inline-block;width:.75rem;height:1rem;margin-right:.5rem}div.dxp.dxp-pagination .paging-panel .item-icon.item-disabled{cursor:not-allowed;outline:none}div.dxp.dxp-pagination .paging-button{position:relative}div.dxp.dxp-pagination .paging-text input{width:100%}div.dxp.dxp-pagination .paging-text dxp-input{position:relative;display:-ms-inline-flexbox;display:inline-flex;bottom:1.4rem}div.dxp.dxp-pagination .paging-page-summary-panel{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}div.dxp.dxp-pagination .paging-page-summary-panel.display-message{padding:0 1rem}div.dxp.dxp-pagination .paging-page-summary-panel .paging-button{position:relative}div.dxp.dxp-pagination .paging-page-summary-panel .paging-button button{position:absolute;cursor:pointer;opacity:0;top:0;right:0;bottom:0;left:0}div.dxp.dxp-pagination .paging-page-summary-panel span{padding:0 .5rem}div.dxp.dxp-pagination .input-error{font-size:.75rem;float:right}div.dxp.dxp-pagination .input{display:inline-block;width:5rem;height:2.7rem;overflow:hidden}"; }
};

exports.dxp_pagination = Pagination;
