'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const CONTENT_ITEM = 'dxp-content-item';
const TEXT_LEFT = 'dxp-text-left';
const TEXT_RIGHT = 'dxp-text-right';
const ContentItemGrid = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (this.apiEndpoint) {
            this.contentData = await core$1.dxp.api(this.apiEndpoint);
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
        core$1.dxp.log.debug(this.element.tagName, 'hostData()', `dxp-content-item-grid -hostData`);
        return {
            'class': 'hydrated'
        };
    }
    /** Render the content-item-grid */
    __stencil_render() {
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-content-item-grid.min.css` })]
        ];
        return (core$1.h("div", { class: `${this.base.componentClass()} sc-dxp-content-item-grid`, dir: this.dir, "data-theme": this.theme }, styles, this.gridEyebrowText && core$1.h("p", { class: `dxp-title-eyebrow sc-dxp-content-item-grid
         ${this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'}`, innerHTML: this.gridEyebrowText }), this.gridTitle && core$1.h("h3", { class: this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center' }, core$1.h("a", { href: this.gridTitleUrl, target: this.titleTarget ? '_blank' : '_self', innerHTML: this.gridTitle })), this.gridDescription && core$1.h("p", { class: `description ${this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'}`, innerHTML: this.gridDescription }), core$1.h("div", { class: "dxp-row sc-dxp-content-item-grid", ref: el => this.contentItemsContainer = el }, core$1.h("slot", null)), this.enablePagination && core$1.h("dxp-pagination", { "units-per-page": this.itemsPerPage, "total-units": this.contentItemsData.length, "hide-when-single-page": this.hidePaginationWhenSingle, position: this.paginationAlignment, "display-text": this.paginationDisplayText, "first-button-label": this.firstButtonLabel, "last-button-label": this.lastButtonLabel, "previous-button-label": this.previousButtonLabel, "next-button-label": this.nextButtonLabel, "of-text": this.ofText, "page-text": this.pageText, "and-text": this.andText, "validation-message": this.paginationValidationMessage, "input-accessibility-text": this.pageInputAccessibilityText }), core$1.h("div", { class: "cta-block", ref: el => this.ctaContainer = el }, core$1.h("slot", { name: "cta-list" }))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "contentData": ["contentDataChangeHandler"],
        "cta": ["ctaChangeHandler"]
    }; }
    render() { return core$1.h(core$1.Host, this.hostData(), this.__stencil_render()); }
    static get style() { return "div.dxp.dxp-content-item-grid .dxp-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-content-item-grid .dxp-row:after{content:\"\";display:block;clear:both}div.dxp.dxp-content-item-grid .dxp-title-eyebrow{padding-bottom:6px}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid .dxp-title-eyebrow{padding-bottom:11px}}div.dxp.dxp-content-item-grid h3{text-align:center}div.dxp.dxp-content-item-grid p{padding-bottom:2.4rem;text-align:center;margin-bottom:0}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid p:first-of-type{font-size:.75rem}}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid p{padding-bottom:1.4rem}}div.dxp.dxp-content-item-grid .dxp-text-left{margin-left:0}div.dxp.dxp-content-item-grid .dxp-text-right{margin-right:1rem}div.dxp.dxp-content-item-grid .dxp-row .dxp-col-12,div.dxp.dxp-content-item-grid .dxp-row .sc-dxp-content-item-grid{margin-bottom:3rem}\@media (min-width:992px){div.dxp.dxp-content-item-grid .col-lg-1-5{width:20%}}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid .dxp-row{margin-left:0;margin-right:0}}"; }
};

exports.dxp_content_item_grid = ContentItemGrid;
