import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const CONTENT_ITEM = 'dxp-content-item';
const TEXT_LEFT = 'dxp-text-left';
const TEXT_RIGHT = 'dxp-text-right';
/** dxp-content-item-grid */
export class ContentItemGrid {
    constructor() {
        /** variable to hold all content item objects */
        this.contentItemsData = [];
        /** class to be applied for header alignment */
        this.headerAlignment = 'center';
        /** boolean to hide pagination when only single page is present in pagination */
        this.hidePaginationWhenSingle = true;
        /** number of content items visible in one page of pagination */
        this.itemsPerPage = 6;
        /** align pagination */
        this.paginationAlignment = 'center';
    }
    /** Watcher that looks for contentData object to be assigned/changed externally */
    contentDataChangeHandler() {
        this.contentItemsData = this.contentData;
        this.resetContentItemGrid();
    }
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler() {
        if (this.cta) {
            this.base.createNestedMarkup(this.ctaContainer, 'dxp-cta-list', this.cta);
        }
    }
    /** method for jumping to next page */
    nextpage(event) {
        this.setIndexToSliceArray(event.detail.firstUnitIndex, event.detail.lastUnitIndex);
        while (this.contentItemsContainer.hasChildNodes()) {
            this.contentItemsContainer.removeChild(this.contentItemsContainer.firstChild);
        }
        this.setContentItemGrid();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.apiEndpoint) {
            this.contentData = await dxp.api(this.apiEndpoint);
        }
        const itemContentType = [];
        this.contentItems = this.element.querySelectorAll(CONTENT_ITEM);
        Array.from(this.contentItems).forEach(node => {
            const contentTypeValue = this.base.returnBooleanValue(node.getAttribute('content-type') === 'content-logo');
            itemContentType.push(contentTypeValue);
        });
        if (!itemContentType.includes(false)) {
            this.isLogos = true;
            this.gridCols = `dxp-col-6 ${this.gridCols}`;
        }
        this.colDistribution(this.column);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.base.createNestedMarkup(this.contentItemsContainer, CONTENT_ITEM, this.contentData);
        this.ctaChangeHandler();
        if (this.contentItems.length === 0) {
            this.contentItems = this.base.shadowRootQuerySelector(this.element, CONTENT_ITEM, true);
        }
        this.contentItemsData = Array.from(this.contentItems);
        this.resetContentItemGrid();
    }
    /**
     * Append nested markup for child elements
     * @param nestedTarget Target container where nested elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    appendNestedMarkup(nestedTarget, nestedSelector, data) {
        const fragment = document.createDocumentFragment();
        const appendNestedElements = [];
        if (data && nestedSelector && nestedTarget) {
            data.forEach((item) => {
                const ref = document.createElement(nestedSelector);
                // if keys of object is in kebabcase then it should be converted into camelcase
                const formattedItem = this.base.formatDataObjectKeys(item);
                Object.assign(ref, formattedItem);
                fragment.appendChild(ref);
                appendNestedElements.push(ref);
            });
            nestedTarget.appendChild(fragment);
        }
        return appendNestedElements;
    }
    /** Generate class for desktop, tablet and mobile to show max no of column */
    colDistribution(column) {
        const lg = column !== 5 ? `dxp-col-lg-${12 / column}` : 'col-lg-1-5';
        const md = `dxp-col-md-${12 / (column > 1 ? 2 : column)}`;
        this.gridCols = `${lg} ${md}`;
    }
    /** reset the content item grid to first page */
    resetContentItemGrid() {
        this.contentItemStartIndex = 0;
        this.contentItemEndIndex = this.enablePagination ? this.itemsPerPage : this.contentItems.length;
        while (this.contentItemsContainer.hasChildNodes()) {
            this.contentItemsContainer.removeChild(this.contentItemsContainer.firstChild);
        }
        this.setContentItemGrid();
    }
    /** set the content item grid based on page change */
    setContentItemGrid() {
        this.visibleContentItems = this.contentItemsData.slice(this.contentItemStartIndex, this.contentItemEndIndex);
        this.visibleContentItems.forEach((node, index) => {
            const elem = document.createElement('div');
            elem.className = `sc-dxp-content-item-grid ${index === 0 ? this.highlightFirstContentItem ? 'dxp-col-lg-12 dxp-col-md-12' : this.gridCols : this.gridCols}`;
            if (index === 0 && this.highlightFirstContentItem) {
                node.setAttribute('orientation', 'horizontal');
            }
            if (node.nodeName) {
                elem.appendChild(node);
            }
            else {
                this.appendNestedMarkup(elem, CONTENT_ITEM, [node]);
            }
            this.contentItemsContainer.appendChild(elem);
        });
    }
    /** Method to index get sliced array from contentItems */
    setIndexToSliceArray(firstUnitIndex, lastUnitIndex) {
        this.contentItemStartIndex = firstUnitIndex;
        this.contentItemEndIndex = lastUnitIndex;
    }
    /** actions to be performed after render method is called */
    hostData() {
        dxp.log.debug(this.element.tagName, 'hostData()', `dxp-content-item-grid -hostData`);
        return {
            'class': 'hydrated'
        };
    }
    /** Render the content-item-grid */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-content-item-grid.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} sc-dxp-content-item-grid`, dir: this.dir, "data-theme": this.theme },
            styles,
            this.gridEyebrowText && h("p", { class: `dxp-title-eyebrow sc-dxp-content-item-grid
         ${this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'}`, innerHTML: this.gridEyebrowText }),
            this.gridTitle && h("h3", { class: this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center' },
                h("a", { href: this.gridTitleUrl, target: this.titleTarget ? '_blank' : '_self', innerHTML: this.gridTitle })),
            this.gridDescription && h("p", { class: `description ${this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'}`, innerHTML: this.gridDescription }),
            h("div", { class: "dxp-row sc-dxp-content-item-grid", ref: el => this.contentItemsContainer = el },
                h("slot", null)),
            this.enablePagination && h("dxp-pagination", { "units-per-page": this.itemsPerPage, "total-units": this.contentItemsData.length, "hide-when-single-page": this.hidePaginationWhenSingle, position: this.paginationAlignment, "display-text": this.paginationDisplayText, "first-button-label": this.firstButtonLabel, "last-button-label": this.lastButtonLabel, "previous-button-label": this.previousButtonLabel, "next-button-label": this.nextButtonLabel, "of-text": this.ofText, "page-text": this.pageText, "and-text": this.andText, "validation-message": this.paginationValidationMessage, "input-accessibility-text": this.pageInputAccessibilityText }),
            h("div", { class: "cta-block", ref: el => this.ctaContainer = el },
                h("slot", { name: "cta-list" }))));
    }
    static get is() { return "dxp-content-item-grid"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-content-item-grid.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-content-item-grid.css"]
    }; }
    static get properties() { return {
        "apiEndpoint": {
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
                "text": "api url for content items data"
            },
            "attribute": "api-endpoint",
            "reflect": false
        },
        "column": {
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
                "text": "number of columns in the grid"
            },
            "attribute": "column",
            "reflect": false
        },
        "gridDescription": {
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
                "text": "description to be shown in the header of Grid"
            },
            "attribute": "grid-description",
            "reflect": false
        },
        "gridEyebrowText": {
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
                "text": "eyebrow text to be shown in the header of Grid"
            },
            "attribute": "grid-eyebrow-text",
            "reflect": false
        },
        "gridTitle": {
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
                "text": "Title to be shown in the header of Grid"
            },
            "attribute": "grid-title",
            "reflect": false
        },
        "gridTitleUrl": {
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
                "text": "Link to destination for title"
            },
            "attribute": "grid-title-url",
            "reflect": false
        },
        "headerAlignment": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right' | 'center'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "class to be applied for header alignment"
            },
            "attribute": "header-alignment",
            "reflect": false,
            "defaultValue": "'center'"
        },
        "titleTarget": {
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
                "text": "Link to destination for title"
            },
            "attribute": "title-target",
            "reflect": false
        },
        "highlightFirstContentItem": {
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
                "text": "highlight the first column"
            },
            "attribute": "highlight-first-content-item",
            "reflect": false
        },
        "enablePagination": {
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
                "text": "boolean to enable pagination on grid"
            },
            "attribute": "enable-pagination",
            "reflect": false
        },
        "hidePaginationWhenSingle": {
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
                "text": "boolean to hide pagination when only single page is present in pagination"
            },
            "attribute": "hide-pagination-when-single",
            "reflect": false,
            "defaultValue": "true"
        },
        "itemsPerPage": {
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
                "text": "number of content items visible in one page of pagination"
            },
            "attribute": "items-per-page",
            "reflect": false,
            "defaultValue": "6"
        },
        "paginationAlignment": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right' | 'center'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "align pagination"
            },
            "attribute": "pagination-alignment",
            "reflect": false,
            "defaultValue": "'center'"
        },
        "paginationDisplayText": {
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
                "text": "pagination display caption text"
            },
            "attribute": "pagination-display-text",
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
        "paginationValidationMessage": {
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
            "attribute": "pagination-validation-message",
            "reflect": false
        },
        "pageInputAccessibilityText": {
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
            "attribute": "page-input-accessibility-text",
            "reflect": false
        },
        "contentData": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "content data for child components"
            },
            "attribute": "content-data",
            "reflect": false
        },
        "cta": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "cta data for child components"
            },
            "attribute": "cta",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {},
        "isLogos": {},
        "contentItemStartIndex": {},
        "contentItemEndIndex": {},
        "visibleContentItems": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "contentData",
            "methodName": "contentDataChangeHandler"
        }, {
            "propName": "cta",
            "methodName": "ctaChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "toPageNumber",
            "method": "nextpage",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
