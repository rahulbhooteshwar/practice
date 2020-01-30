import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
import xmlApi from './xml-api';
const LOG_SEARCH_RESULT = 'getSearchData()';
/** dxp-search-result */
export class SearchResult {
    constructor() {
        /** count - to hold count */
        this.count = -1;
        /** highlightLines - text of title/description to highlight */
        this.highlightLines = [];
        /** to hold page start number */
        this.pageStart = 0;
        /** to hold temporary search results data */
        this.tempResultsData = [];
        /** descHighlighter - title/description to highlight */
        this.highlighter = [];
        /** noResult - to hold the boolean value when no search result found  */
        this.noResult = '';
        /** responseData - service response data */
        this.responseData = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** cfq - suggester config object Context Filter Query */
        this.cfq = '';
        /** cfqLocale - to add to cfq on locale change */
        this.cfqLocale = '';
        /** descriptionLength - search result description character length  */
        this.descriptionLength = 200;
        /** titleLength - search result title character length  */
        this.titleLength = 65;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Search', messages);
        if (this.searchApiUrl &&
            this.searchFl && this.searchCollection &&
            this.highlightFields && this.sortingField) {
            this.cfqLocale = this.cfqLocale ? this.cfqLocale : this.locale.toLowerCase().replace('_', '-');
            this.searchEndPoint = `${this.searchApiUrl + this.searchCollection}`;
            const strHighlight = this.highlightFields.split(',');
            let highlightFl = '';
            for (const str of strHighlight) {
                highlightFl = `${highlightFl}${str}_${this.getPageLang(this.cfqLocale)},`;
            }
            highlightFl = highlightFl.substring(0, highlightFl.length - 1);
            this.searchConfig = {
                'rows': this.rows,
                'start': this.start,
                'hl': true,
                'hl.fl': highlightFl,
                'hl.fragsize': 80,
                'hl.simple.pre': encodeURIComponent('<b>'),
                'hl.simple.post': encodeURIComponent('</b>'),
                'hl.snippets': 8,
                'hl.usePhraseHighlighter': true,
                'wt': 'json'
            };
            if (this.promotionsData && typeof this.promotionsData === 'string') {
                this.promotionsData = JSON.parse(this.promotionsData);
            }
            if (this.promotionsKeywords) {
                this.promotionsKeywordsArray = this.promotionsKeywords.split(',');
            }
        }
    }
    /** actions to be performed after component loading */
    async componentDidLoad() {
        if (window.location.href.indexOf(this.searchParamKey) > -1) {
            dxp.log.debug(this.element.tagName, 'componentDidLoad()', 'Search Result Component-received the redirect page query');
            let str = [];
            str = window.location.href.split(`${this.searchParamKey}=`);
            this.searchValue = decodeURIComponent(str[1].trim());
            await this.setValue(this.searchValue);
        }
    }
    /** accessibility implementation for key events */
    async handleKeyUp(e) {
        const target = e.target
            ? e.target.activeElement
            : e.target;
        const searchBox = target.classList.contains('searchbox');
        const inputSearch = target.classList.contains('dxp-icon-search');
        const viewMore = target.classList.contains('dxp-btn-secondary');
        const parentLi = target;
        const keycode = e.keyCode;
        let lis;
        if (keycode === 38 || keycode === 40) {
            e.preventDefault();
        }
        /** on enter/space key */
        if ((keycode === 13 || keycode === 32)) {
            /** on enter and space key, search for the input */
            if (inputSearch && target.previousElementSibling.value.trim().length >= 3) {
                await this.setValue(target.previousElementSibling.value);
            }
            /** on enter and space key of dropdown item, search for the item */
            if (parentLi.classList.contains('list-element')) {
                await this.setValue(target.innerText);
            }
            /** on enter, search for the text */
            if (keycode === 13 && searchBox && target.value.trim().length >= 3) {
                await this.setValue(target.value);
            }
            // on viewmore enter click, set focus to last result row
            if (keycode === 13 && viewMore) {
                const resultsElements = target.closest('.sc-dxp-search-result').querySelectorAll('.result-listing');
                if (resultsElements) {
                    const temp = this.searchConfig['start'] + this.rows;
                    this.tempElement = resultsElements[temp - 1].querySelector('a');
                }
            }
        }
        /** for down arrow key */
        if (keycode === 40 && searchBox) {
            lis = target.closest('div').querySelectorAll('li');
            if (lis[0]) {
                this.focusElement(lis[0]);
            }
        }
        /** for up arrow key, on first list element */
        if (keycode === 38 && parentLi.classList.contains('list-element')) {
            lis = target.closest('div').querySelectorAll('li');
            if (lis[0]) {
                const searchInput = this.getInputElement();
                this.focusElement(searchInput);
            }
        }
        if (keycode === 40 && target.closest('.dxp-dropdown-list') && target.nextElementSibling) {
            this.focusElement(target.nextElementSibling);
        }
        if (keycode === 38 && target.closest('.dxp-dropdown-list') && target.previousElementSibling) {
            this.focusElement(target.previousElementSibling);
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** on search term changed */
    async searchTermChangedHandler(e) {
        dxp.log.debug(this.element.tagName, 'searchTermChangedHandler()', 'Search Result Component-received the custom search term changed event: ', e.detail.searchTerm);
        this.searchValue = e.detail.searchTerm;
        await this.setValue(this.searchValue);
    }
    /** Method to emit the analytics data after performing search */
    async analyticSearchResult() {
        const analyticsObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_searchfound': this.resultCount ? 'true' : 'false',
            'di_comp_searchterm': this.searchValue,
            'di_comp_searchresults': this.resultCount,
            'di_comp_searchCollection': this.suggestCollection
        };
        this.analyticsDataEmitter.emit(analyticsObj);
        dxp.log.info(this.element.tagName, 'analyticSearchResult()', analyticsObj);
    }
    /** Public method used in dxp-search-result-item as well */
    async setValue(item) {
        this.searchValue = item;
        if (this.searchValue.trim().length) {
            this.changeSearchResults(true)
                .then(async () => {
                dxp.log.info(this.element.tagName, 'setValue()', `in searchData`);
                await this.analyticSearchResult();
            })
                .catch(err => dxp.log.error(this.element.tagName, 'setValue()', `in searchData :${err}`));
        }
    }
    /** Method used to change in search result if search text changes */
    async changeSearchResults(isIntialCall) {
        this.element
            ? this.element.querySelector('.dxp-list-container').classList.remove('dxp-show')
            : this.element.querySelector('.dxp-list-container').classList.remove('dxp-show');
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        inputElement.value = this.searchValue;
        let query;
        this.tags ?
            query = `(url:"${dxp.util.addEscapeCharacter(this.cfq + (this.cfqLocale.toLowerCase().trim() === 'global' ? 'global' : this.cfqLocale))}" AND (${this.sortingField}_${this.getPageLang(this.cfqLocale)}:(${dxp.util.addEscapeCharacter(this.searchValue.trim()).replace(new RegExp('\\ ', 'g'), ' AND ')})) AND tags:"${dxp.util.addEscapeCharacter(this.tags)}")`
            : query = `(url:"${dxp.util.addEscapeCharacter(this.cfq + (this.cfqLocale.toLowerCase().trim() === 'global' ? 'global' : this.cfqLocale))}" AND (${this.sortingField}_${this.getPageLang(this.cfqLocale)}:(${dxp.util.addEscapeCharacter(this.searchValue.trim()).replace(new RegExp('\\ ', 'g'), ' AND ')})))`;
        if (isIntialCall) {
            this.pageStart = 0;
            this.searchConfig['start'] = 0;
        }
        this.searchConfig['fl'] = encodeURIComponent(`termfreq(${this.sortingField}_${this.getPageLang(this.cfqLocale)},'${dxp.util.addEscapeCharacter(this.searchValue.trim())}'),${this.searchFl}`);
        this.searchConfig['sort'] = encodeURIComponent(`termfreq(${this.sortingField}_${this.getPageLang(this.cfqLocale)},'${dxp.util.addEscapeCharacter(this.searchValue.trim())}') desc,start_time asc`);
        this.responseData = await this.getSearchData(this.searchConfig, this.searchEndPoint, query)
            .then(async (data) => {
            let tempHighlightData;
            this.responseData = data;
            this.searchResults = this.responseData;
            if (this.searchResults && this.searchResults.response) {
                this.resultCount = this.responseData.response.numFound;
                tempHighlightData = this.highlightSearchKeyword(this.responseData.response.docs, this.responseData.highlighting);
                if (isIntialCall) {
                    this.searchResults.response.docs = tempHighlightData;
                    this.tempResultsData = this.searchResults.response.docs;
                }
                else {
                    this.searchResults.response.docs = [...this.tempResultsData, ...tempHighlightData];
                    this.tempResultsData = this.searchResults.response.docs;
                }
            }
            else {
                this.searchResults = [];
                this.resultCount = 0;
            }
        })
            .catch(error => {
            dxp.log.error(this.element.tagName, 'changeSearchResults()', 'Error in dxp-search fetch service: ', error);
        });
        this.resultCount === 0 || (this.searchResults && this.searchResults.status === 500)
            ? this.noResult = 'noresult'
            : this.noResult = 'result';
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** method to return input element reference  */
    getInputElement() {
        return this.element
            ? this.element.querySelector('.searchbox')
            : this.element.querySelector('.searchbox');
    }
    /** Method to get the locale of the page */
    getPageLang(locale) {
        locale = locale.toLowerCase().trim() === 'global' ? this.locale.toLowerCase().replace('_', '-') : locale;
        let lang = locale && locale.substring(0, 2);
        if ((lang.indexOf('zh') === 0 || lang.indexOf('ko') === 0)) {
            lang = 'cjk';
        }
        return lang;
    }
    /** Get method to fetch the service data */
    getSearchData(config, endPointUrl, query) {
        let configJson;
        configJson = config;
        if (endPointUrl.indexOf('search') > -1) {
            configJson['q'] = encodeURIComponent(query);
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
            return xmlApi.fetchRequest(endPointUrl, opts)
                .then(data => {
                dxp.log.debug(this.element.tagName, LOG_SEARCH_RESULT, `xhr request success`);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                dxp.log.debug(this.element.tagName, LOG_SEARCH_RESULT, `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
        }
        catch (e) {
            dxp.log.error(this.element.tagName, LOG_SEARCH_RESULT, `fetch failed`, e);
        }
    }
    /** method to highlight the text in search result */
    highlightSearchKeyword(collection, highlight) {
        let contentStr;
        let titleStr;
        let contentLocale;
        let titleLocale;
        const spreadString = '...';
        for (const collectionObj of collection) {
            if (collectionObj.title) {
                const colId = collectionObj.id;
                titleStr = '';
                contentStr = '';
                const pageLang = `_${this.getPageLang(this.cfqLocale)}`;
                contentLocale = `content${this.getPageLang(this.cfqLocale) ? pageLang : ''}`;
                titleLocale = `title${this.getPageLang(this.cfqLocale) ? pageLang : ''}`;
                if (highlight[colId][titleLocale]) {
                    for (const title of highlight[colId][titleLocale]) {
                        titleStr = titleStr + title;
                    }
                }
                else {
                    titleStr = collectionObj.title;
                }
                if (titleStr.length > this.titleLength) {
                    titleStr = titleStr.substring(0, this.titleLength);
                    titleStr = `${titleStr.substring(0, titleStr.lastIndexOf(' '))} ${spreadString}`;
                }
                if (highlight[colId][contentLocale]) {
                    contentStr = '...';
                    for (const content of highlight[colId][contentLocale]) {
                        contentStr = `${contentStr} ${content} ${spreadString} `;
                    }
                }
                else if (collectionObj.description) {
                    contentStr = collectionObj.description;
                }
                if (contentStr.length > this.descriptionLength) {
                    contentStr = contentStr.substring(0, this.descriptionLength);
                    contentStr = contentStr.substring(0, contentStr.lastIndexOf(' '));
                    if (contentStr.lastIndexOf('... ') !== contentStr.length - 5
                        && contentStr.lastIndexOf(' ...') !== contentStr.length - 5
                        && contentStr.lastIndexOf('...') !== contentStr.length - 3) {
                        contentStr = `${contentStr} ${spreadString}`;
                    }
                }
                if (titleStr) {
                    collectionObj.title = titleStr;
                    contentStr
                        ? collectionObj.description = contentStr
                        : collectionObj.description = dxp.i18n.t('Search:skipContent');
                }
            }
            else {
                this.resultCount = 0;
                collection.length = 0;
            }
        }
        return collection;
    }
    /** render search results */
    renderSearchResults(searchResults) {
        return searchResults.map(data => {
            return (h("div", { class: "result-listing" },
                h("div", null,
                    h("a", { href: `${data.url}`, class: "column-item-link", innerHTML: data.title })),
                h("div", { class: "data-description", innerHTML: data.description })));
        });
    }
    /** used to scroll to top on pagination click */
    scrollToTop() {
        const element = this.getInputElement();
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
    /** check visibility of the next button */
    viewMore() {
        this.pageStart = this.pageStart + 1;
        this.searchConfig['start'] = this.rows * this.pageStart;
        this.changeSearchResults(false)
            .then(() => dxp.log.info(this.element.tagName, 'viewMore()', `in searchData`))
            .catch(err => dxp.log.error(this.element.tagName, 'viewMore()', `in searchData :${err}`));
        if (this.tempElement) {
            this.focusElement(this.tempElement);
        }
    }
    /** Render the search-result */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-search-result render() : ${process.env.MODE}`);
        if (!this.searchConfig) {
            dxp.log.debug(this.element.tagName, 'render()', `component not rendered : check suggester and search config object`);
            return;
        }
        const styles = (h("span", null,
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-search-result.min.css` }),
            this.dtmUrl && (h("script", { src: this.dtmUrl }))));
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { id: "search-results", class: "sc-dxp-search-result search-results", role: "application" },
                h("div", { class: "dxp-row" },
                    h("div", { class: "sc-dxp-search-result dxp-col-12 search-container" },
                        h("dxp-searchbox", { "suggest-collection": this.suggestCollection, cfq: this.cfq, placeholder: this.placeholder, "suggest-api-url": this.suggestApiUrl, "cfq-locale": this.cfqLocale, "suggest-count": this.suggestCount, "suggest-dictionary": this.suggestDictionary, "no-result-flag": this.noResult, "searched-text": this.searchValue, "searched-term": this.searchValue, "result-count": this.resultCount, "error-text": this.errorMessage }),
                        h("div", { class: "sc-dxp-search-result dxp-col-lg-8 dxp-col-md-12 dxp-col-12 dxp-p-0" },
                            this.showPromotions && this.promotionsData && this.promotionsKeywordsArray.some(key => this.searchValue.toLowerCase() === key.toLowerCase())
                                && this.searchResults && this.searchResults.response &&
                                this.renderSearchResults(this.promotionsData),
                            this.searchResults && this.searchResults.response && this.searchResults.response.docs &&
                                this.renderSearchResults(this.searchResults.response.docs)))),
                this.searchResults && this.searchResults.response && this.searchResults.response.docs.length !== this.resultCount &&
                    h("div", { class: "dxp-col-12 view-more-button" },
                        h("button", { "aria-label": this.viewMoreText, class: "dxp-btn dxp-btn-secondary dxp-btn-lg", onClick: () => this.viewMore() }, this.viewMoreText)))));
    }
    static get is() { return "dxp-search-result"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-search-result.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-search-result.css"]
    }; }
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
        "descriptionLength": {
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
                "text": "descriptionLength - search result description character length"
            },
            "attribute": "description-length",
            "reflect": false,
            "defaultValue": "200"
        },
        "errorMessage": {
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
                "text": "Error Message"
            },
            "attribute": "error-message",
            "reflect": false
        },
        "highlightFields": {
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
                "text": "highlightFields - search config object highlighting field"
            },
            "attribute": "highlight-fields",
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
        "promotionsData": {
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
                "text": "promotionsData - to display promotions links"
            },
            "attribute": "promotions-data",
            "reflect": false
        },
        "promotionsKeywords": {
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
                "text": "promotionsKeywords - to display promotions links based on promotions keywords"
            },
            "attribute": "promotions-keywords",
            "reflect": false
        },
        "rows": {
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
                "text": "rows - search config object rows"
            },
            "attribute": "rows",
            "reflect": false
        },
        "searchApiUrl": {
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
                "text": "searchApiUrl - API for search"
            },
            "attribute": "search-api-url",
            "reflect": false
        },
        "searchCollection": {
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
                "text": "searchCollection - search collection name"
            },
            "attribute": "search-collection",
            "reflect": false
        },
        "searchFl": {
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
                "text": "searchFl - search config object fl"
            },
            "attribute": "search-fl",
            "reflect": false
        },
        "searchParamKey": {
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
                "text": "searchParamKey - search url parameter key"
            },
            "attribute": "search-param-key",
            "reflect": false
        },
        "showPromotions": {
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
                "text": "showPromotions - to show promotions links before search results"
            },
            "attribute": "show-promotions",
            "reflect": false
        },
        "sortingField": {
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
                "text": "sortingField - search config object sorting field"
            },
            "attribute": "sorting-field",
            "reflect": false
        },
        "start": {
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
                "text": "start - search config object start page"
            },
            "attribute": "start",
            "reflect": false
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
        },
        "tags": {
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
                "text": "tags - to filter search results data based on specific tags"
            },
            "attribute": "tags",
            "reflect": false
        },
        "titleLength": {
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
                "text": "titleLength - search result title character length"
            },
            "attribute": "title-length",
            "reflect": false,
            "defaultValue": "65"
        },
        "viewMoreText": {
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
                "text": "text to be shown on view more button"
            },
            "attribute": "view-more-text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "dtmUrl": {},
        "highlighter": {},
        "locale": {},
        "noResult": {},
        "promotionsKeywordsArray": {},
        "responseData": {},
        "resultCount": {},
        "searchConfig": {},
        "searchEndPoint": {},
        "searchResults": {},
        "searchValue": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "analyticSearchResult": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method to emit the analytics data after performing search",
                "tags": []
            }
        },
        "setValue": {
            "complexType": {
                "signature": "(item: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Public method used in dxp-search-result-item as well",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
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
        }, {
            "name": "searchTermChanged",
            "method": "searchTermChangedHandler",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
