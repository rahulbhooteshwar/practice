'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const xmlApi = require('./xml-api-9cf0e711.js');

const LOG_SEARCH_RESULT = 'getSearchData()';
const SearchResult = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.analyticsDataEmitter = core$1.createEvent(this, "dxp_comp", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Search', xmlApi.messages);
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
            core$1.dxp.log.debug(this.element.tagName, 'componentDidLoad()', 'Search Result Component-received the redirect page query');
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
        core$1.dxp.log.debug(this.element.tagName, 'searchTermChangedHandler()', 'Search Result Component-received the custom search term changed event: ', e.detail.searchTerm);
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
        core$1.dxp.log.info(this.element.tagName, 'analyticSearchResult()', analyticsObj);
    }
    /** Public method used in dxp-search-result-item as well */
    async setValue(item) {
        this.searchValue = item;
        if (this.searchValue.trim().length) {
            this.changeSearchResults(true)
                .then(async () => {
                core$1.dxp.log.info(this.element.tagName, 'setValue()', `in searchData`);
                await this.analyticSearchResult();
            })
                .catch(err => core$1.dxp.log.error(this.element.tagName, 'setValue()', `in searchData :${err}`));
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
            query = `(url:"${core$1.dxp.util.addEscapeCharacter(this.cfq + (this.cfqLocale.toLowerCase().trim() === 'global' ? 'global' : this.cfqLocale))}" AND (${this.sortingField}_${this.getPageLang(this.cfqLocale)}:(${core$1.dxp.util.addEscapeCharacter(this.searchValue.trim()).replace(new RegExp('\\ ', 'g'), ' AND ')})) AND tags:"${core$1.dxp.util.addEscapeCharacter(this.tags)}")`
            : query = `(url:"${core$1.dxp.util.addEscapeCharacter(this.cfq + (this.cfqLocale.toLowerCase().trim() === 'global' ? 'global' : this.cfqLocale))}" AND (${this.sortingField}_${this.getPageLang(this.cfqLocale)}:(${core$1.dxp.util.addEscapeCharacter(this.searchValue.trim()).replace(new RegExp('\\ ', 'g'), ' AND ')})))`;
        if (isIntialCall) {
            this.pageStart = 0;
            this.searchConfig['start'] = 0;
        }
        this.searchConfig['fl'] = encodeURIComponent(`termfreq(${this.sortingField}_${this.getPageLang(this.cfqLocale)},'${core$1.dxp.util.addEscapeCharacter(this.searchValue.trim())}'),${this.searchFl}`);
        this.searchConfig['sort'] = encodeURIComponent(`termfreq(${this.sortingField}_${this.getPageLang(this.cfqLocale)},'${core$1.dxp.util.addEscapeCharacter(this.searchValue.trim())}') desc,start_time asc`);
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
            core$1.dxp.log.error(this.element.tagName, 'changeSearchResults()', 'Error in dxp-search fetch service: ', error);
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
            if (xmlApi.xmlApi.request) {
                xmlApi.xmlApi.request.abort();
            }
            return xmlApi.xmlApi.fetchRequest(endPointUrl, opts)
                .then(data => {
                core$1.dxp.log.debug(this.element.tagName, LOG_SEARCH_RESULT, `xhr request success`);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                core$1.dxp.log.debug(this.element.tagName, LOG_SEARCH_RESULT, `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
        }
        catch (e) {
            core$1.dxp.log.error(this.element.tagName, LOG_SEARCH_RESULT, `fetch failed`, e);
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
                        : collectionObj.description = core$1.dxp.i18n.t('Search:skipContent');
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
            return (core$1.h("div", { class: "result-listing" }, core$1.h("div", null, core$1.h("a", { href: `${data.url}`, class: "column-item-link", innerHTML: data.title })), core$1.h("div", { class: "data-description", innerHTML: data.description })));
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
            .then(() => core$1.dxp.log.info(this.element.tagName, 'viewMore()', `in searchData`))
            .catch(err => core$1.dxp.log.error(this.element.tagName, 'viewMore()', `in searchData :${err}`));
        if (this.tempElement) {
            this.focusElement(this.tempElement);
        }
    }
    /** Render the search-result */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-search-result render() : ${"DEVELOPMENT"}`);
        if (!this.searchConfig) {
            core$1.dxp.log.debug(this.element.tagName, 'render()', `component not rendered : check suggester and search config object`);
            return;
        }
        const styles = (core$1.h("span", null, core$1.h("link", { rel: "stylesheet", href: `` }), this.theme && core$1.h("link", { rel: "stylesheet", href: `` }), this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-search-result.min.css` }), this.dtmUrl && (core$1.h("script", { src: this.dtmUrl }))));
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { id: "search-results", class: "sc-dxp-search-result search-results", role: "application" }, core$1.h("div", { class: "dxp-row" }, core$1.h("div", { class: "sc-dxp-search-result dxp-col-12 search-container" }, core$1.h("dxp-searchbox", { "suggest-collection": this.suggestCollection, cfq: this.cfq, placeholder: this.placeholder, "suggest-api-url": this.suggestApiUrl, "cfq-locale": this.cfqLocale, "suggest-count": this.suggestCount, "suggest-dictionary": this.suggestDictionary, "no-result-flag": this.noResult, "searched-text": this.searchValue, "searched-term": this.searchValue, "result-count": this.resultCount, "error-text": this.errorMessage }), core$1.h("div", { class: "sc-dxp-search-result dxp-col-lg-8 dxp-col-md-12 dxp-col-12 dxp-p-0" }, this.showPromotions && this.promotionsData && this.promotionsKeywordsArray.some(key => this.searchValue.toLowerCase() === key.toLowerCase())
            && this.searchResults && this.searchResults.response &&
            this.renderSearchResults(this.promotionsData), this.searchResults && this.searchResults.response && this.searchResults.response.docs &&
            this.renderSearchResults(this.searchResults.response.docs)))), this.searchResults && this.searchResults.response && this.searchResults.response.docs.length !== this.resultCount &&
            core$1.h("div", { class: "dxp-col-12 view-more-button" }, core$1.h("button", { "aria-label": this.viewMoreText, class: "dxp-btn dxp-btn-secondary dxp-btn-lg", onClick: () => this.viewMore() }, this.viewMoreText)))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-search-result .search-results{padding-top:5rem}div.dxp.dxp-search-result .search-results .no-result-message{list-style-type:disc;padding-left:.75rem;padding-top:.625rem}div.dxp.dxp-search-result .search-results .view-more-button{position:relative;padding:4rem 0 6.19rem 0}div.dxp.dxp-search-result .search-results .result-count-align{margin-bottom:1.625rem}div.dxp.dxp-search-result .search-results .dxp-icon-close{position:absolute;top:.9375rem;right:.9375rem;margin:0;padding:0;cursor:pointer}div.dxp.dxp-search-result .search-results .wrapper{position:relative}div.dxp.dxp-search-result .search-results .dxp-dropdown-list li{height:auto;line-height:normal}div.dxp.dxp-search-result .search-results .dxp-dropdown-list li:after{display:none}div.dxp.dxp-search-result .search-results .searchbox{height:2.5rem;padding:.68rem 2.2rem .5rem 2.5rem;border-radius:2.1875rem;margin-bottom:2.375rem}div.dxp.dxp-search-result .search-results .searchbox+.dxp-icon-search{position:absolute;cursor:pointer;left:.875rem;top:.75rem}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container{border:0;background:none;margin-top:.625rem;position:relative;top:-.0625rem}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container.dxp-show{border-top:none}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container ul{max-height:15rem;overflow-y:auto}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container li{margin-bottom:.2188rem;text-align:left;padding-left:2.5rem}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container li:after{height:3.0625rem;left:1%}div.dxp.dxp-search-result .search-results .search-terms{text-transform:uppercase;letter-spacing:.0625rem;margin-top:3.5rem}div.dxp.dxp-search-result .search-results .result-listing{padding:1.125rem 0}div.dxp.dxp-search-result .search-results .result-listing .column-item-link{margin-bottom:.1875rem;margin-top:inherit}div.dxp.dxp-search-result .search-results .result-listing .column-item-link:after,div.dxp.dxp-search-result .search-results .result-listing .column-item-link:before{background:none}div.dxp.dxp-search-result .search-results .search-box-wrapper{position:relative}div.dxp.dxp-search-result[dir=rtl] .search-results .searchbox{padding:.68rem 2.2rem .5rem 3.125rem}div.dxp.dxp-search-result[dir=rtl] .search-results .searchbox+.dxp-icon-search{right:.75rem}div.dxp.dxp-search-result[dir=rtl] .search-results .searchbox~.dxp-list-container li{padding-right:2.125rem;text-align:right}div.dxp.dxp-search-result[dir=rtl] .search-results .dxp-icon-close{left:.9375rem;right:auto}"; }
};

exports.dxp_search_result = SearchResult;
