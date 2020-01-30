import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-pagination */
export class Pagination {
    constructor() {
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
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Pagination', messages);
        this.setTextGroup();
        const shadow = this.element ? this.element : this.element;
        let href = `${process.env.DXP_STYLE_BASE_URL}/dxp.min.css`;
        dxp.util.appendLinkElement(shadow, href);
        href = `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/${this.theme}.min.css`;
        dxp.util.appendLinkElement(shadow, href);
        href = `${process.env.DXP_STYLE_BASE_URL}/themes/${this.theme}/dxp-pagination.min.css`;
        dxp.util.appendLinkElement(shadow, href);
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
    }
    /** code to fire event for updating pagination */
    updateUnitIndex() {
        this.firstUnitIndex = (this.currentPageIndex * this.unitsPerPage) - this.unitsPerPage;
        this.lastUnitIndex = (this.currentPageIndex * this.unitsPerPage);
        this.lastUnitIndex = this.totalUnits < this.lastUnitIndex ? this.totalUnits : this.lastUnitIndex;
    }
    /** Render the pagination */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-timer render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-pagination.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} pagination`, dir: this.dir, "data-theme": this.theme, style: { 'width': this.width || 'auto' } },
            styles,
            this.showPagination &&
                (h("div", { class: `paging-panel ${this.position}` },
                    h("span", { class: "paging-page-summary-panel" },
                        h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.firstButtonLabel, class: `item-icon ${this.disablePrev ?
                                'icon-first-disabled item-disabled' : 'icon-first'}`, tabindex: this.disablePrev ? '-1' : '0' }),
                        h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.previousButtonLabel, class: `item-icon ${this.disablePrev ? 'icon-previous-disabled item-disabled' : 'icon-previous'}`, tabindex: this.disablePrev ? '-1' : '0' }),
                        this.textGroup.pageText,
                        " ",
                        h("span", { class: "paging-text input" },
                            h("dxp-input", { type: "number", "content-id": "manual-enter-input", "is-optional": "false", min: "1", max: this.totalPages ? this.totalPages.toString() : '', label: "", "accessibility-text": this.textGroup.inputAccessibilityText, "enable-autocomplete": "off", readonly: false, value: this.currentPageIndex, disabled: this.totalPages <= 1, "validation-message": "\u00A0" })),
                        " ",
                        this.textGroup.ofText,
                        " ",
                        h("span", null, this.totalPages),
                        h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.nextButtonLabel, class: `item-icon ${this.disableNext ? 'icon-next-disabled item-disabled' : 'icon-next'}`, tabindex: this.disableNext ? '-1' : '0' }),
                        h("a", { href: "javascript : void(0)", role: "button", onClick: e => this.gotoPage(e), title: this.textGroup.lastButtonLabel, class: `item-icon ${this.disableNext ? 'icon-last-disabled item-disabled' : 'icon-last'}`, tabindex: this.disableNext ? '-1' : '0' })),
                    this.isValidPageNumber ?
                        (h("span", { class: "paging-page-summary-panel display-message" }, this.getTextForCurrentPage()))
                        :
                            (h("span", { class: "input-error display-message" }, `${this.textGroup.validationMessage} 1 ${this.textGroup.andText} ${this.totalPages}`))))));
    }
    static get is() { return "dxp-pagination"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-pagination.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-pagination.css"]
    }; }
    static get properties() { return {
        "hideWhenSinglePage": {
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
                "text": "Flag to hide pagination if single page present"
            },
            "attribute": "hide-when-single-page",
            "reflect": false,
            "defaultValue": "true"
        },
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'center' | 'right'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Pagination position"
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "'left'"
        },
        "unitsPerPage": {
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
                "text": "Number of records per page"
            },
            "attribute": "units-per-page",
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
        "displayText": {
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
                "text": "display caption text"
            },
            "attribute": "display-text",
            "reflect": false
        },
        "firstButtonLabel": {
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
                "text": "first button label"
            },
            "attribute": "first-button-label",
            "reflect": false
        },
        "lastButtonLabel": {
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
                "text": "last button label"
            },
            "attribute": "last-button-label",
            "reflect": false
        },
        "previousButtonLabel": {
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
                "text": "previous button label"
            },
            "attribute": "previous-button-label",
            "reflect": false
        },
        "nextButtonLabel": {
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
                "text": "next button label"
            },
            "attribute": "next-button-label",
            "reflect": false
        },
        "ofText": {
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
                "text": "of text"
            },
            "attribute": "of-text",
            "reflect": false
        },
        "pageText": {
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
                "text": "page text"
            },
            "attribute": "page-text",
            "reflect": false
        },
        "andText": {
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
                "text": "and text"
            },
            "attribute": "and-text",
            "reflect": false
        },
        "validationMessage": {
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
                "text": "Pagination input validation message"
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "inputAccessibilityText": {
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
                "text": "Accessibility text for pagination input"
            },
            "attribute": "input-accessibility-text",
            "reflect": false
        },
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
        "totalUnits": {
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
                "text": "Total number of records"
            },
            "attribute": "total-units",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "disableNext": {},
        "disablePrev": {},
        "firstUnitIndex": {},
        "isValidPageNumber": {},
        "lastUnitIndex": {},
        "showPagination": {},
        "theme": {},
        "totalPages": {}
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
            "propName": "currentPageIndex",
            "methodName": "currentPageIndexChangeHandler"
        }, {
            "propName": "totalUnits",
            "methodName": "totalUnitsChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "textValue",
            "method": "inputEntered",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
