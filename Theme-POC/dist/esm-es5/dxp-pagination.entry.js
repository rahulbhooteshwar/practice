import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
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
var Pagination = /** @class */ (function () {
    function Pagination(hostRef) {
        registerInstance(this, hostRef);
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
        this.toPageNumber = createEvent(this, "toPageNumber", 7);
    }
    /** Listener that looks for totalUnits to be changed */
    Pagination.prototype.currentPageIndexChangeHandler = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.setPagination();
        }
    };
    /** Listener that looks for totalUnits to be changed */
    Pagination.prototype.totalUnitsChangeHandler = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            var pageIfRemainder = (this.totalUnits % this.unitsPerPage) > 0 ? 1 : 0;
            this.totalPages = Math.floor(this.totalUnits / this.unitsPerPage) + pageIfRemainder;
            this.currentPageIndex = 1;
            this.showPagination = !(this.hideWhenSinglePage && this.totalPages <= 1);
            this.setPagination();
        }
    };
    /** actions to be performed prior to component loading */
    Pagination.prototype.componentWillLoad = function () {
        this.isValidPageNumber = true;
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Pagination', messages);
        this.setTextGroup();
        var shadow = this.element ? this.element : this.element;
        var href = "https://asset.mastercard.com/dxp-styles/latest/css" + "/dxp.min.css";
        dxp.util.appendLinkElement(shadow, href);
        href = "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/" + this.theme + ".min.css";
        dxp.util.appendLinkElement(shadow, href);
        href = "https://asset.mastercard.com/dxp-styles/latest/css" + "/themes/" + this.theme + "/dxp-pagination.min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** actions to be performed after component loads */
    Pagination.prototype.componentDidLoad = function () {
        var pageIfRemainder = (this.totalUnits % this.unitsPerPage) > 0 ? 1 : 0;
        this.totalPages = Math.floor(this.totalUnits / this.unitsPerPage) + pageIfRemainder;
        this.disableButtons();
        this.showPagination = !(this.hideWhenSinglePage && this.totalPages <= 1);
    };
    /** Listener to value from dxp-input component */
    Pagination.prototype.inputEntered = function (event) {
        this.gotoPage(event);
    };
    /** method to disable/enable buttons */
    Pagination.prototype.disableButtons = function () {
        this.disablePrev = false;
        this.disableNext = false;
        if (this.currentPageIndex <= 1) {
            this.disablePrev = true;
        }
        if (this.currentPageIndex >= this.totalPages) {
            this.disableNext = true;
        }
    };
    /** method for showing indexing of current page */
    Pagination.prototype.getTextForCurrentPage = function () {
        if (this.currentPageIndex <= this.totalPages && this.currentPageIndex >= 1) {
            this.firstUnitIndex = ((this.currentPageIndex - 1) * this.unitsPerPage) + 1;
            this.lastUnitIndex = (this.currentPageIndex === this.totalPages) ? (this.totalUnits) : this.firstUnitIndex + this.unitsPerPage - 1;
            return this.textGroup.displayText + " (" + this.firstUnitIndex + (this.unitsPerPage > 1 ?
                "-" + this.lastUnitIndex : '') + " " + this.textGroup.ofText + " " + this.totalUnits + ")";
        }
    };
    /** action for switching page on navigation */
    Pagination.prototype.gotoPage = function (e) {
        e.preventDefault();
        this.isValidPageNumber = true;
        var selectedTarget = e.target;
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
            var manualEnteredText = Math.floor(Number(e.detail.value));
            this.currentPageIndex = manualEnteredText;
        }
        this.setPagination();
    };
    /** update pagination when currentPageIndex changes */
    Pagination.prototype.setPagination = function () {
        if (!(this.currentPageIndex >= 1 && this.currentPageIndex <= this.totalPages)) {
            this.isValidPageNumber = false;
        }
        if (this.isValidPageNumber) {
            this.disableButtons();
            this.updateUnitIndex();
            this.toPageNumber.emit({ 'toPageNumber': this.currentPageIndex, 'firstUnitIndex': this.firstUnitIndex, 'lastUnitIndex': this.lastUnitIndex });
        }
    };
    /** Assign all text strings to text group variable */
    Pagination.prototype.setTextGroup = function () {
        this.textGroup.displayText = this.displayText ? this.displayText : dxp.i18n.t('Pagination:displayText');
        this.textGroup.firstButtonLabel = this.firstButtonLabel ? this.firstButtonLabel : dxp.i18n.t('Pagination:firstButtonText');
        this.textGroup.lastButtonLabel = this.lastButtonLabel ? this.lastButtonLabel : dxp.i18n.t('Pagination:lastButtonText');
        this.textGroup.previousButtonLabel = this.previousButtonLabel ? this.previousButtonLabel : dxp.i18n.t('Pagination:previousButtonText');
        this.textGroup.nextButtonLabel = this.nextButtonLabel ? this.nextButtonLabel : dxp.i18n.t('Pagination:nextButtonText');
        this.textGroup.ofText = this.ofText ? this.ofText : dxp.i18n.t('Pagination:ofText');
        this.textGroup.pageText = this.pageText ? this.pageText : dxp.i18n.t('Pagination:pageText');
        this.textGroup.andText = this.andText ? this.andText : dxp.i18n.t('Pagination:andText');
        this.textGroup.validationMessage = this.validationMessage ? this.validationMessage : dxp.i18n.t('Pagination:validationMessage');
        this.textGroup.inputAccessibilityText = this.inputAccessibilityText ? this.inputAccessibilityText : dxp.i18n.t('Pagination:inputAccessibilityText');
    };
    /** code to fire event for updating pagination */
    Pagination.prototype.updateUnitIndex = function () {
        this.firstUnitIndex = (this.currentPageIndex * this.unitsPerPage) - this.unitsPerPage;
        this.lastUnitIndex = (this.currentPageIndex * this.unitsPerPage);
        this.lastUnitIndex = this.totalUnits < this.lastUnitIndex ? this.totalUnits : this.lastUnitIndex;
    };
    /** Render the pagination */
    Pagination.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-timer render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-pagination.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass() + " pagination", dir: this.dir, "data-theme": this.theme, style: { 'width': this.width || 'auto' } }, styles, this.showPagination &&
            (h("div", { class: "paging-panel " + this.position }, h("span", { class: "paging-page-summary-panel" }, h("a", { href: "javascript : void(0)", role: "button", onClick: function (e) { return _this.gotoPage(e); }, title: this.textGroup.firstButtonLabel, class: "item-icon " + (this.disablePrev ?
                    'icon-first-disabled item-disabled' : 'icon-first'), tabindex: this.disablePrev ? '-1' : '0' }), h("a", { href: "javascript : void(0)", role: "button", onClick: function (e) { return _this.gotoPage(e); }, title: this.textGroup.previousButtonLabel, class: "item-icon " + (this.disablePrev ? 'icon-previous-disabled item-disabled' : 'icon-previous'), tabindex: this.disablePrev ? '-1' : '0' }), this.textGroup.pageText, " ", h("span", { class: "paging-text input" }, h("dxp-input", { type: "number", "content-id": "manual-enter-input", "is-optional": "false", min: "1", max: this.totalPages ? this.totalPages.toString() : '', label: "", "accessibility-text": this.textGroup.inputAccessibilityText, "enable-autocomplete": "off", readonly: false, value: this.currentPageIndex, disabled: this.totalPages <= 1, "validation-message": "\u00A0" })), " ", this.textGroup.ofText, " ", h("span", null, this.totalPages), h("a", { href: "javascript : void(0)", role: "button", onClick: function (e) { return _this.gotoPage(e); }, title: this.textGroup.nextButtonLabel, class: "item-icon " + (this.disableNext ? 'icon-next-disabled item-disabled' : 'icon-next'), tabindex: this.disableNext ? '-1' : '0' }), h("a", { href: "javascript : void(0)", role: "button", onClick: function (e) { return _this.gotoPage(e); }, title: this.textGroup.lastButtonLabel, class: "item-icon " + (this.disableNext ? 'icon-last-disabled item-disabled' : 'icon-last'), tabindex: this.disableNext ? '-1' : '0' })), this.isValidPageNumber ?
                (h("span", { class: "paging-page-summary-panel display-message" }, this.getTextForCurrentPage()))
                :
                    (h("span", { class: "input-error display-message" }, this.textGroup.validationMessage + " 1 " + this.textGroup.andText + " " + this.totalPages))))));
    };
    Object.defineProperty(Pagination.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination, "watchers", {
        get: function () {
            return {
                "currentPageIndex": ["currentPageIndexChangeHandler"],
                "totalUnits": ["totalUnitsChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination, "style", {
        get: function () { return "div.dxp.dxp-pagination .paging-panel{line-height:1.4rem}\@media (max-width:993px){div.dxp.dxp-pagination .paging-panel>span{font-size:.75rem}}div.dxp.dxp-pagination .paging-panel{padding:2rem 0 .75rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-pagination .paging-panel.center{-ms-flex-pack:center;justify-content:center}div.dxp.dxp-pagination .paging-panel.right{-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-pagination .paging-panel .item-icon{display:inline-block;width:.75rem;height:1rem;margin-right:.5rem}div.dxp.dxp-pagination .paging-panel .item-icon.item-disabled{cursor:not-allowed;outline:none}div.dxp.dxp-pagination .paging-button{position:relative}div.dxp.dxp-pagination .paging-text input{width:100%}div.dxp.dxp-pagination .paging-text dxp-input{position:relative;display:-ms-inline-flexbox;display:inline-flex;bottom:1.4rem}div.dxp.dxp-pagination .paging-page-summary-panel{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}div.dxp.dxp-pagination .paging-page-summary-panel.display-message{padding:0 1rem}div.dxp.dxp-pagination .paging-page-summary-panel .paging-button{position:relative}div.dxp.dxp-pagination .paging-page-summary-panel .paging-button button{position:absolute;cursor:pointer;opacity:0;top:0;right:0;bottom:0;left:0}div.dxp.dxp-pagination .paging-page-summary-panel span{padding:0 .5rem}div.dxp.dxp-pagination .input-error{font-size:.75rem;float:right}div.dxp.dxp-pagination .input{display:inline-block;width:5rem;height:2.7rem;overflow:hidden}"; },
        enumerable: true,
        configurable: true
    });
    return Pagination;
}());
export { Pagination as dxp_pagination };
