import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const FACETED_FILTER_ITEM = 'dxp-faceted-filter-item';
const FACETED_FILTER_LABEL_CLASS = '.filter-label';
/** dxp-faceted-filter */
export class FacetedFilter {
    constructor() {
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
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'FacetedFilter', messages);
        this.filterItemsJson = this.apiEndpoint ? await dxp.api(this.apiEndpoint) : this.filterJson;
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
        dxp.log.debug(`in dxp-faceted-filter render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-faceted-filter.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("div", { class: "dxp-faceted-filter-container" },
                styles,
                h("div", { class: "toggle" },
                    h("div", { class: "dxp-row" }, this.isHeaderRequired &&
                        h("div", { class: "dxp-col-12 dxp-faceted-filter-header" },
                            h("p", null,
                                h("span", { class: "dxp-text-eyebrow dxp-col-sm-6 dxp-col-12 dxp-filter-align" }),
                                h("a", { href: "javaScript:void(0)" },
                                    h("span", { class: "dxp-col-sm-6 dxp-col-12 dxp-text-right text-margin filter-clear dxp-closewindow-align" },
                                        this.closeWindow,
                                        h("span", { class: "dxp-icon dxp-icon-x-small dxp-icon-close dxp-close-text" })))))),
                    this.filterItems ? this.filterItems.map((item) => {
                        return (h("dxp-faceted-filter-item", { "item-title": item.title, "item-subtitle": item.subtitle, "item-description": item.description, "show-expanded": item.showExpanded, "is-sub-category": item.isSubCategory }));
                    }) :
                        h("div", { ref: el => this.filterItemContainer = el },
                            h("slot", null))))));
    }
    static get is() { return "dxp-faceted-filter"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-faceted-filter.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-faceted-filter.css"]
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
                "text": "sets the api-endpoint for filter properties"
            },
            "attribute": "api-endpoint",
            "reflect": false,
            "defaultValue": "''"
        },
        "closeWindow": {
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
                "text": "sets the close window for search filter"
            },
            "attribute": "close-window",
            "reflect": false,
            "defaultValue": "''"
        },
        "filterItems": {
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
                "text": "holds the content to be used to create individual filter"
            },
            "attribute": "filter-items",
            "reflect": false
        },
        "filterItemsJson": {
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
                "text": "holds the content data used to create filter"
            },
            "attribute": "filter-items-json",
            "reflect": false,
            "defaultValue": "[]"
        },
        "filterJson": {
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
                "text": "sets the content data used to create filter"
            },
            "attribute": "filter-json",
            "reflect": false,
            "defaultValue": "[]"
        },
        "filterType": {
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
                "text": "sets the type of filter to be created"
            },
            "attribute": "filter-type",
            "reflect": false
        },
        "heading": {
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
                "text": "sets the search-filter heading"
            },
            "attribute": "heading",
            "reflect": false,
            "defaultValue": "''"
        },
        "isHeaderRequired": {
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
                "text": "sets whether header is required"
            },
            "attribute": "is-header-required",
            "reflect": false,
            "defaultValue": "true"
        },
        "isSubCategory": {
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
                "text": "sets whether filter has a subcategory"
            },
            "attribute": "is-sub-category",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "childElementCount": {},
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keyup",
            "method": "expandCollapse",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
