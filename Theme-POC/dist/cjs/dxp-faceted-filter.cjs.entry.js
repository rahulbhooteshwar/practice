'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-e49f982c.js');

const FACETED_FILTER_ITEM = 'dxp-faceted-filter-item';
const FACETED_FILTER_LABEL_CLASS = '.filter-label';
const FacetedFilter = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** holds the child element count */
        this.childElementCount = 0;
        /** sets the api-endpoint for filter properties */
        this.apiEndpoint = '';
        /** sets the close window for search filter */
        this.closeWindow = '';
        /** holds the content data used to create filter */
        this.filterItemsJson = [];
        /** sets the content data used to create filter */
        this.filterJson = [];
        /** sets the search-filter heading */
        this.heading = '';
        /** sets whether header is required */
        this.isHeaderRequired = true;
        /** sets whether filter has a subcategory */
        this.isSubCategory = '';
    }
    /** actions to perform before component load */
    async componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'FacetedFilter', messages.messages);
        this.filterItemsJson = this.apiEndpoint ? await core$1.dxp.api(this.apiEndpoint) : this.filterJson;
        this.createFilterItemsObject();
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad() {
        if (this.heading) {
            this.base.shadowRootQuerySelector(this.element, '.dxp-text-eyebrow').innerHTML = `${this.heading}&lrm;`;
        }
        const shadowEle = this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, true)
            && this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, true).length;
        const childElement = shadowEle ?
            this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, true)
            :
                this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, false);
        // to get the last child of faceted-filter and add class to it
        const lastChild = childElement[childElement.length - 1];
        this.base.shadowRootQuerySelector(lastChild, FACETED_FILTER_LABEL_CLASS).classList.add('filter-bottom');
        if (childElement && childElement.length > 0) {
            this.childElementCount = childElement.length;
        }
    }
    /** action to be perform on keyup event */
    expandCollapse(e) {
        const filterLabelArray = this.getElementsByClass(FACETED_FILTER_LABEL_CLASS);
        const filterLabel = Array.prototype.slice.call(filterLabelArray);
        let filterContent;
        let activeElement;
        let currentFilterLabel;
        const defaultPrevent = [32, 38, 40];
        const keyCode = e.keyCode;
        activeElement = e.target ? e.target.activeElement : e.target;
        /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
        if (defaultPrevent.indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if (keyCode === 9) {
            activeElement.classList.remove('no-outline');
        }
        filterContent = this.getElementsByClass('.filter-content');
        currentFilterLabel = this.getElementsByClass(FACETED_FILTER_LABEL_CLASS);
        // expand all child elements
        if (activeElement.classList.contains('expand-all') && (keyCode === 32 || keyCode === 13)) {
            for (let i = 0; i < currentFilterLabel.length; i++) {
                currentFilterLabel[i].classList.add('active');
                filterContent[i].classList.remove('dxp-none');
                filterContent[i].style.maxHeight = `${filterContent[i].scrollHeight}${filterContent[i].offsetHeight}px`;
            }
        }
        if (activeElement.classList.contains('collapse-all') && (keyCode === 32 || keyCode === 13)) {
            for (let i = 0; i < filterLabel.length; i++) {
                filterLabel[i].classList.remove('active');
                if (filterContent[i]) {
                    filterContent[i].removeAttribute('style');
                    currentFilterLabel[i].classList.remove('active');
                    filterContent[i].classList.add('dxp-none');
                }
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** action to be perform on keyup event */
    createCategoryMarkup(items, isSubCategory) {
        let filterMarkUp = '';
        Object.keys(items).forEach(filterItem => {
            if (filterItem === 'type') {
                this.filterType = items[filterItem];
            }
            else {
                if (isSubCategory) {
                    filterMarkUp += this.createNestedFilter(filterItem, items[filterItem], this.filterType).outerHTML;
                }
                else {
                    if (this.filterType === 'checkbox') {
                        filterMarkUp += this.populateCheckboxFilter(items[filterItem]);
                    }
                    else if (this.filterType === 'select') {
                        filterMarkUp += this.populateSelectFilter(items[filterItem]).outerHTML;
                    }
                }
            }
        });
        return (filterMarkUp);
    }
    /** action to be perform on keyup event */
    createFilterItemsObject() {
        this.filterItems = [];
        let filterContent = '';
        this.filterItemsJson.map((item) => {
            Object.keys(item).forEach(key => {
                filterContent = '';
                if (item.hasOwnProperty('type')) {
                    if (key !== 'type') {
                        filterContent = this.createCategoryMarkup(item, false);
                    }
                }
                else {
                    filterContent = this.createSubCategoryMarkup(item);
                }
                if (key !== 'type') {
                    const filterItem = {
                        title: key.toUpperCase(),
                        description: filterContent,
                        isSubCategory: 'false'
                    };
                    this.filterItems.push(filterItem);
                }
            });
        });
    }
    /** action to be perform on keyup event */
    createNestedFilter(filterItem, filterContentArr, filterType) {
        let filterData;
        filterData = document.createElement(FACETED_FILTER_ITEM);
        filterData.setAttribute('item-title', filterItem);
        filterData.setAttribute('is-sub-category', 'true');
        if (filterType === 'checkbox') {
            filterData.setAttribute('item-description', this.populateCheckboxFilter(filterContentArr));
        }
        else if (filterType === 'select') {
            filterData.setAttribute('item-description', this.populateSelectFilter(filterContentArr).outerHTML);
        }
        return (filterData);
    }
    /** action to be perform on keyup event */
    createSubCategoryMarkup(subCatItem) {
        let filterDom = '';
        Object.keys(subCatItem).forEach(item => {
            subCatItem[item].map((subItems) => {
                filterDom += this.createCategoryMarkup(subItems, true);
            });
        });
        return (filterDom);
    }
    /** private method checks for slot or items array and accordingly fetch the faceted-filter-item element by class name */
    getElementsByClass(cssClassName) {
        const elements = new Array();
        const slot = this.base.shadowRootQuerySelector(this.element, 'slot');
        if (slot) {
            slot.assignedNodes().filter(node => {
                if (node.nodeName !== '#text') {
                    const facetedFilterItemElm = node.QuerySelector(this.element, cssClassName);
                    elements.push(facetedFilterItemElm);
                }
            });
        }
        else {
            const facetedFilterItems = this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM);
            if (facetedFilterItems && facetedFilterItems.length > 0) {
                for (const item of facetedFilterItems) {
                    elements.push(item.QuerySelector(this.element, cssClassName));
                }
            }
        }
        return elements;
    }
    /** action to be perform on keyup event */
    populateCheckboxFilter(filterContentArr) {
        let filterValues = '';
        if (filterContentArr && filterContentArr.length > 0) {
            filterContentArr.map((filterVal) => {
                let filterValue;
                filterValue = document.createElement('dxp-checkbox');
                filterValue.setAttribute('name', filterVal);
                filterValue.setAttribute('value', filterVal);
                filterValues += filterValue.outerHTML;
                filterValues += '<br>';
            });
        }
        return (filterValues);
    }
    /** action to be perform on keyup event */
    populateSelectFilter(filterContentArr) {
        let filterValue;
        filterValue = document.createElement('select');
        filterContentArr.map((filterVal) => {
            const filterOpt = document.createElement('option');
            filterOpt.setAttribute('value', filterVal);
            const optText = document.createTextNode(filterVal);
            filterOpt.appendChild(optText);
            filterValue.appendChild(filterOpt);
        });
        return (filterValue);
    }
    /** Render the faceted-filter */
    render() {
        core$1.dxp.log.debug(`in dxp-faceted-filter render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-faceted-filter.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("div", { class: "dxp-faceted-filter-container" }, styles, core$1.h("div", { class: "toggle" }, core$1.h("div", { class: "dxp-row" }, this.isHeaderRequired &&
            core$1.h("div", { class: "dxp-col-12 dxp-faceted-filter-header" }, core$1.h("p", null, core$1.h("span", { class: "dxp-text-eyebrow dxp-col-sm-6 dxp-col-12 dxp-filter-align" }), core$1.h("a", { href: "javaScript:void(0)" }, core$1.h("span", { class: "dxp-col-sm-6 dxp-col-12 dxp-text-right text-margin filter-clear dxp-closewindow-align" }, this.closeWindow, core$1.h("span", { class: "dxp-icon dxp-icon-x-small dxp-icon-close dxp-close-text" })))))), this.filterItems ? this.filterItems.map((item) => {
            return (core$1.h("dxp-faceted-filter-item", { "item-title": item.title, "item-subtitle": item.subtitle, "item-description": item.description, "show-expanded": item.showExpanded, "is-sub-category": item.isSubCategory }));
        }) :
            core$1.h("div", { ref: el => this.filterItemContainer = el }, core$1.h("slot", null))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-faceted-filter .dxp-faceted-filter-item{display:block;width:100%}div.dxp.dxp-faceted-filter .dxp-faceted-filter-container{width:19%}div.dxp.dxp-faceted-filter .dxp-faceted-filter-header{position:relative;top:10px}div.dxp.dxp-faceted-filter .text-margin{margin-top:5px}div.dxp.dxp-faceted-filter .dxp-close-filter{padding-bottom:5px}div.dxp.dxp-faceted-filter .dxp-close-text{padding-left:10px}div.dxp.dxp-faceted-filter .dxp-filter-align{padding-left:0;font-size:1.05rem}div.dxp.dxp-faceted-filter .toggle .title-wrapper{padding-bottom:1.5rem;margin-bottom:2rem;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span{padding:0}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span:last-child{text-align:right}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span:only-child{text-align:left}div.dxp.dxp-faceted-filter .toggle .expand-all{cursor:pointer}div.dxp.dxp-faceted-filter .toggle .collapse-all{cursor:pointer;margin-left:.5625rem}div.dxp.dxp-faceted-filter .pipe-separator:after{content:\"|\";padding-left:.75rem}\@media (max-width:1024px){div.dxp.dxp-faceted-filter .dxp-faceted-filter-container{width:25%}}\@media (max-width:575px){div.dxp.dxp-faceted-filter .dxp-faceted-filter-container{width:100%}div.dxp.dxp-faceted-filter .dxp-filter-align{position:relative;top:22px}div.dxp.dxp-faceted-filter .dxp-closewindow-align{position:relative;bottom:15px}div.dxp.dxp-faceted-filter .toggle .title-wrapper{border:none;margin-bottom:1rem}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span:first-child{padding-bottom:2rem}}div.dxp.dxp-faceted-filter[dir=rtl] .toggle .title-wrapper>span:last-child{text-align:left}div.dxp.dxp-faceted-filter[dir=rtl] .toggle .title-wrapper>span:only-child{text-align:right}"; }
};

exports.dxp_faceted_filter = FacetedFilter;
