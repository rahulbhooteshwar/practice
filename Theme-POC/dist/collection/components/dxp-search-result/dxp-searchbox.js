import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
import xmlApi from './xml-api';
const LOG_SUGGEST_DATA = 'getSuggestData()';
/** dxp-search-result */
export class SearchBox {
    constructor() {
        /** count - to hold count */
        this.count = -1;
        /** contentSuggesterData - response data */
        this.contentSuggesterData = [];
        /** responseData - service response data */
        this.responseData = [];
        /** searchDataCombined - duplicates removed combined data  */
        this.searchDataCombined = [];
        /** searchFilteredData - filtered data */
        this.searchFilteredData = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchDropdown - boolean value */
        this.showSearchDropdown = false;
        /** cfq - suggester config object Context Filter Query */
        this.cfq = '';
        /** cfqLocale - to add to cfq on locale change */
        this.cfqLocale = '';
        /** searchedTerm - to hold the search value */
        this.searchedTerm = '';
        /** searchValue - to hold the search value */
        this.searchedText = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Search', messages);
        if (this.suggestApiUrl &&
            this.suggestCount && this.suggestDictionary && this.suggestCollection && this.cfq) {
            this.cfqLocale = this.cfqLocale ? this.cfqLocale : this.locale.toLowerCase().replace('_', '-');
            this.suggestEndPoint = `${this.suggestApiUrl + this.suggestCollection}`;
            this.suggesterConfig = {
                'suggest.count': this.suggestCount,
                'suggest.dictionary': this.suggestDictionary,
                'suggest': 'true',
                'suggest.cfq': encodeURIComponent(dxp.util.addEscapeCharacter(`${this.cfq}${this.cfqLocale}*`))
            };
        }
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        // HTML elements
        this.inputBoxSearch = this.element.querySelector('.searchbox');
    }
    /** actions to be performed after component loading */
    componentWillUpdate() {
        this.searchValue = this.searchedTerm ? this.searchedTerm : this.searchValue;
    }
    /** for mouse click outside of component */
    clickEvent(e) {
        /** close search dropdown list on mouse click outside of search */
        if (!e.target.classList.contains('dxp-list-container') && !e.target.classList.contains('searchbox')) {
            this.showSearchDropdown = false;
        }
    }
    /** accessibility implementation for key events */
    handleKeyUp(e) {
        const target = e.target
            ? e.target.activeElement
            : e.target;
        const parentLi = target;
        const keycode = e.keyCode;
        const searchBox = target.classList.contains('searchbox');
        const inputSearch = target.classList.contains('dxp-icon-search');
        const clearIcon = target.classList.contains('dxp-icon-clear');
        if ((keycode === 13 || keycode === 32)) {
            /** on enter/space key, select dropdown value */
            if (parentLi.classList.contains('list-element')) {
                this.searchValue = target.innerText;
                this.showSearchDropdown = false;
            }
            /** on enter key, hide dropdown */
            if (inputSearch || (keycode === 13 && searchBox)) {
                this.showSearchDropdown = false;
            }
            /** clear icon pressed */
            if (clearIcon) {
                this.clearSearchBox();
                this.inputBoxSearch.focus();
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Method to clear the searchbox value */
    clearSearchBox() {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.value = '';
            this.searchValue = this.searchedTerm = '';
        }
    }
    /** method to return input element reference  */
    getInputElement() {
        return this.element.querySelector('.searchbox');
    }
    /** Get method to fetch the service data */
    async getSuggestData(config, endPointUrl, query) {
        let configJson;
        configJson = config;
        if (endPointUrl.indexOf('suggest') > -1) {
            configJson['suggest.q'] = encodeURIComponent(query);
        }
        const bodyData = Object.keys(configJson).map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(configJson[key])}`;
        }).join('&');
        const opts = {
            method: 'POST',
            body: bodyData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        try {
            // aborting the previous xhr request call
            if (xmlApi.request) {
                xmlApi.request.abort();
            }
            const json = xmlApi.fetchRequest(endPointUrl, opts)
                .then(data => {
                dxp.log.debug(this.element.tagName, LOG_SUGGEST_DATA, `xhr request success`);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                dxp.log.debug(this.element.tagName, LOG_SUGGEST_DATA, `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
            this.responseData = json;
            return this.responseData;
        }
        catch (e) {
            dxp.log.error(this.element.tagName, LOG_SUGGEST_DATA, `fetch failed`, e);
        }
    }
    /** method to fetch the service data */
    async handleChange(val) {
        let searchQuerry;
        this.count = -1;
        this.searchDataCombined = [];
        this.contentSuggesterData = [];
        this.searchFilteredData = [];
        this.searchValue = val;
        searchQuerry = this.searchValue.trim();
        if (searchQuerry.length >= 3) {
            this.responseData = await this.getSuggestData(this.suggesterConfig, this.suggestEndPoint, searchQuerry);
            if (this.responseData && this.responseData.suggest) {
                this.contentSuggesterData = this.responseData.suggest.contentSuggester;
            }
            if (this.contentSuggesterData[searchQuerry]) {
                this.searchFilteredData = this.contentSuggesterData[searchQuerry].suggestions;
            }
            for (const searchData of this.searchFilteredData) {
                let item = searchData.term.toLowerCase();
                const a = item.indexOf(searchQuerry.toLowerCase());
                item = item.substr(a, item.length);
                const tokens = item.split(' ');
                const tokenslength = tokens.length;
                item = '';
                for (let i = 0; i < tokenslength && i < 5; i++) {
                    item += tokens[i];
                    item += ' ';
                }
                this.searchDataCombined.push(item);
            }
            this.searchDataCombined = this.removeDuplicates(this.searchDataCombined);
            this.searchDataCombined.length > 0 ? this.showSearchDropdown = true : this.showSearchDropdown = false;
        }
    }
    /** handler method for input change */
    onTextInput(event) {
        this.searchedTerm = '';
        this.handleChange(event.target.value)
            .then(() => dxp.log.info(this.element.tagName, 'onTextInput()', `in handleChange`))
            .catch(err => dxp.log.error(this.element.tagName, 'onTextInput()', `in handleChange :${err}`));
    }
    /** to remove duplicates from data */
    removeDuplicates(arr) {
        arr = arr.filter((item, pos) => {
            return arr.indexOf(item) === pos;
        });
        return Array.from(arr);
    }
    /** called when search icon click */
    setSearchValue(searchResultComponent) {
        this.showSearchDropdown = false;
        if (this.searchValue.trim().length >= 3) {
            searchResultComponent.setValue(this.searchValue);
        }
    }
    /** Render the search-result */
    render() {
        const searchResultComponent = document.querySelector('dxp-search-result');
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-searchbox render() : ${process.env.MODE}`);
        return ([
            h("div", { class: "sc-dxp-search-result dxp-col-12 dxp-col-lg-6 search-box-wrapper dxp-p-0" },
                h("div", { class: "sc-dxp-search-result" },
                    h("div", { class: "sc-dxp-search-result dxp-search-info" }, this.searchedText
                        ? [h("span", { class: "sc-dxp-search-result" }, dxp.i18n.t('Search:searchMessage')), h("span", { class: "search-keywords" },
                                ` ${this.searchedText}`,
                                " ")] : ''),
                    h("div", { class: "sc-dxp-search-result dxp-search-count result-count-align" }, this.noResultFlag === 'noresult' && this.searchedText ?
                        h("span", null, dxp.i18n.t('Search:noResultFound'))
                        : this.searchedText === '' ? '' : this.resultCount ? h("span", null,
                            `${this.resultCount} `,
                            dxp.i18n.t('Search:searchFound')) : '')),
                h("div", { role: "application", class: "sc-dxp-search-result wrapper" },
                    h("input", { type: "text", role: "combobox", "aria-haspopup": "listbox", name: "searchbox", "aria-label": dxp.i18n.t('Search:customMessage'), value: this.searchValue || this.searchedTerm, onInput: event => { this.onTextInput(event); }, class: `sc-dxp-search-result dxp-form-control searchbox${(this.showSearchDropdown && this.searchValue.length >= 3) ? ' no-border-radius' : ''}`, placeholder: this.placeholder }),
                    h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Search:searchIconAccessibilityText'), class: "sc-dxp-search-result dxp-icon dxp-icon-medium dxp-icon-search", onClick: () => this.setSearchValue(searchResultComponent) }),
                    h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Search:clear'), class: `sc-dxp-search-result dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear${(this.searchValue.length ? ' dxp-block' : ' dxp-none')}`, onClick: () => this.clearSearchBox() }),
                    h("div", { class: `dxp-list-container sc-dxp-search-result ${(this.showSearchDropdown && this.searchValue.length >= 3) ? 'dxp-block' : ''}` },
                        h("ul", { class: "dxp-dropdown-list sc-dxp-search-result", "aria-label": dxp.i18n.t('Search:listText') }, this.searchDataCombined && this.searchDataCombined.map((item, index) => (h("li", { class: "list-element sc-dxp-search-result", id: `opt-${(index + 1)}`, "aria-label": dxp.i18n.t('Search:selectedItem', { item }), onClick: async () => {
                                this.searchValue = item;
                                await searchResultComponent.setValue(item);
                            }, tabindex: "-1" },
                            item,
                            " "))))))),
            h("div", { class: "sc-dxp-search-result dxp-col-12 dxp-bold" }, this.noResultFlag === 'noresult' && this.searchedText ? h("div", { class: "sc-dxp-search-result search-terms", innerHTML: this.errorText }) : '')
        ]);
    }
    static get is() { return "dxp-searchbox"; }
    static get properties() { return {
        "cfq": {
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
                "text": "cfq - suggester config object Context Filter Query"
            },
            "attribute": "cfq",
            "reflect": false,
            "defaultValue": "''"
        },
        "cfqLocale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "cfqLocale - to add to cfq on locale change"
            },
            "attribute": "cfq-locale",
            "reflect": false,
            "defaultValue": "''"
        },
        "errorText": {
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
                "text": "errorText - contains error message to display at bottom"
            },
            "attribute": "error-text",
            "reflect": false
        },
        "noResultFlag": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "noResultFlag - to hold value, in no search results"
            },
            "attribute": "no-result-flag",
            "reflect": false
        },
        "placeholder": {
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
                "text": "placeholder text for search box"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "resultCount": {
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
                "text": "holds total result"
            },
            "attribute": "result-count",
            "reflect": false
        },
        "searchedTerm": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "searchedTerm - to hold the search value"
            },
            "attribute": "searched-term",
            "reflect": false,
            "defaultValue": "''"
        },
        "searchedText": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "searchValue - to hold the search value"
            },
            "attribute": "searched-text",
            "reflect": false,
            "defaultValue": "''"
        },
        "suggestApiUrl": {
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
                "text": "suggestApiUrl - API for suggest collection"
            },
            "attribute": "suggest-api-url",
            "reflect": false
        },
        "suggestCollection": {
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
                "text": "suggestCollection - suggest collection name"
            },
            "attribute": "suggest-collection",
            "reflect": false
        },
        "suggestCount": {
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
                "text": "suggestCount - suggester config object count"
            },
            "attribute": "suggest-count",
            "reflect": false
        },
        "suggestDictionary": {
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
                "text": "suggestDictionary - suggester config object dictionary"
            },
            "attribute": "suggest-dictionary",
            "reflect": false
        }
    }; }
    static get states() { return {
        "contentSuggesterData": {},
        "locale": {},
        "responseData": {},
        "searchDataCombined": {},
        "searchFilteredData": {},
        "searchValue": {},
        "showSearchDropdown": {},
        "suggestEndPoint": {},
        "suggesterConfig": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickEvent",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyUp",
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
