import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
import xmlApi from './xml-api';
const SEARCH = 'dxp-search';
const SEARCHBOX_CLASS = '.searchbox';
const SEARCH_BAR_CLASS = '.search-bar';
const DROPDOWN_LIST_ITEM = 'dxp-dropdown-list-item';
const SEARCH_ACCESSIBILITY_TEXT = 'Search:searchIconAccessibilityText';
const NO_BORDER_RADIUS = 'no-border-radius';
const BLOCK = ' dxp-block';
const SEARCH_CLEAR = 'Search:clear';
const SEARCH_LIST_TEXT = 'Search:listText';
const SEARCH_SELECTED_ITEM = 'Search:selectedItem';
/** dxp-search */
export class Search {
    constructor() {
        /** onEnterFocus - focus flag for accessibility */
        this.onEnterFocus = false;
        /** responseData - service response data */
        this.responseData = [];
        /** searchDataCombined - duplicates removed combined data  */
        this.searchDataCombined = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchBoxList - to show/hide the search items list */
        this.showSearchBoxList = false;
        /** suggesterData - dropdown suggester data */
        this.suggesterData = [];
        /** cfq - suggester config object Context Filter Query */
        this.cfq = '';
        /** cfqLocale - to add to cfq on locale change */
        this.cfqLocale = '';
        /** searchBoxSize - defines the height of search box */
        this.searchBoxSize = 'lg';
        /** searchType - search render type, can be advance or simple  */
        this.searchType = 'advance';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Search', messages);
        if (this.suggestApiUrl &&
            this.suggestCount &&
            this.suggestDictionary && this.suggestCollection && this.cfq) {
            this.suggestEndPoint = `${this.suggestApiUrl + this.suggestCollection}`;
            this.cfqLocale = this.cfqLocale ? this.cfqLocale : this.locale.toLowerCase().replace('_', '-');
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
        // creates the schema tag for SEO
        this.schemaScript();
        // HTML elements
        this.inputBoxSearch = this.base.shadowRootQuerySelector(this.element, SEARCHBOX_CLASS) || this.base.shadowRootQuerySelector(this.element, SEARCH_BAR_CLASS);
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate() {
        if (this.onEnterFocus) {
            const inputFocus = document.querySelector(SEARCH)
                ? document.querySelector(SEARCH).querySelector(SEARCHBOX_CLASS)
                : document.querySelector(SEARCH).querySelector(SEARCHBOX_CLASS);
            this.focusElement(inputFocus);
        }
    }
    /** for mouse click outside of  component */
    async clickEvent(e) {
        if (!e.target.classList.contains('dxp-list-container') && !e.target.classList.contains('searchbox')) {
            this.showSearchBoxList = false;
        }
        const isSearchClick = e.target.closest(SEARCH);
        if (!isSearchClick && this.searchType === 'advance') {
            await this.closeSearchBox();
        }
    }
    /** for accessibility implementation */
    async handleKeyUp(e) {
        const keycode = e.keyCode;
        const target = e.target
            ? e.target.activeElement
            : e.target;
        /** CTA Link pressed */
        if (target && target.classList.contains('cta-container')) {
            if ((keycode === 13 || keycode === 32)) {
                this.onViewAllSelection();
            }
            else if (keycode === 38) {
                target.previousElementSibling.focus();
            }
            else if (keycode === 9) {
                const inputElement = this.getInputElement();
                this.showSearchBoxList = false;
                inputElement.focus();
            }
        }
        else {
            const searchIcon = target.classList.contains('search-icon');
            const closeIcon = target.classList.contains('dxp-icon-close');
            const clearIcon = target.classList.contains('dxp-icon-clear');
            const searchBox = target.classList.contains('searchbox');
            const searchBar = target.classList.contains('search-bar');
            const inputSearch = target.classList.contains('search-text');
            const closeSearchIcon = target.classList.contains('search-wrapper-close-icon');
            const parentLi = target;
            const nextEl = target.nextElementSibling;
            const prevEl = target.previousElementSibling;
            /** on enter/space key, show/hide/search search-box */
            if ((keycode === 13 || keycode === 32)) {
                if (searchIcon) {
                    this.onEnterFocus = true;
                    this.showSearchBox = true;
                }
                /** on enter and space key, hide search box */
                if (closeIcon && !clearIcon) {
                    this.showSearchBox = false;
                    await this.clearSearchBox();
                }
                /** on enter and space, clear search box */
                if (closeIcon && clearIcon) {
                    await this.clearSearchBox();
                }
                /** on enter and space key, search for the key */
                if (inputSearch) {
                    this.searchData(e, 'keyEvent');
                }
                /** on enter and space key, select suggestions */
                if (parentLi.classList.contains(DROPDOWN_LIST_ITEM)) {
                    this.selectSuggestion(e, 'keyEvent');
                }
                if (keycode === 13 && searchBox) {
                    this.searchData(e, 'keyEvent');
                    this.showSearchBoxList = false;
                }
            }
            if (keycode === 9 && e.shiftKey && clearIcon) {
                const inputElement = this.getInputElement();
                inputElement.focus();
            }
            /** for down arrow key */
            if (keycode === 40 && searchBox && this.showSearchBoxList && this.showSuggestions) {
                const li = target.closest('div').nextElementSibling.querySelector('li');
                this.focusElement(li);
            }
            /** for down arrow key */
            if (keycode === 40 && searchBar) {
                const li = target.closest('div').nextElementSibling.querySelector('li');
                li.focus();
            }
            /** for down arrow key */
            if (keycode === 40 && parentLi.classList.contains(DROPDOWN_LIST_ITEM) && nextEl && !searchBox) {
                this.focusElement(nextEl);
            }
            /** for up arrow key */
            if (keycode === 38 && parentLi.classList.contains(DROPDOWN_LIST_ITEM) && prevEl) {
                this.focusElement(prevEl);
            }
            /** on escape key press, hide search box */
            if (keycode === 27 && (searchBox || inputSearch)) {
                this.showSearchBox = false;
                await this.clearSearchBox();
            }
            /** on tab key, hide search box list */
            if (keycode === 9 && searchBox) {
                this.onEnterFocus = false;
                this.showSearchBoxList = false;
            }
            /** on tab key, hide search box list */
            if (keycode === 9 && closeSearchIcon) {
                this.focusElement(prevEl);
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
    async clearSearchBox() {
        this.clearInputFieldValue();
        this.inputBoxSearch.focus();
    }
    /** Method to hide searchbox */
    async closeSearchBox() {
        this.showSearchBox = false;
        this.clearInputFieldValue();
    }
    /** Method to show searchbox */
    async searchBoxToggle() {
        this.showSearchBox = true;
    }
    /** Clear input box field value */
    clearInputFieldValue() {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.value = '';
            this.searchValue = '';
        }
    }
    /** disable auto-writer */
    disableAutowriter() {
        const autowriterWrapper = this.base.shadowRootQuerySelector(this.element, '.autowriter-wrapper');
        const homePageWrapper = this.base.shadowRootQuerySelector(this.element, '.wrapper-home-search');
        const autowriterTag = this.element.querySelector('dxp-autowriter');
        autowriterTag.clearAutoWriterIntervals();
        homePageWrapper.querySelector('input').focus();
        autowriterWrapper.classList.add('dxp-none');
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** Get method to fetch the service data */
    async getData(config, endPointUrl, query) {
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
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request success`);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
            this.responseData = json;
            return this.responseData;
        }
        catch (e) {
            dxp.log.error(this.element.tagName, 'getData()', `fetch failed`, e);
        }
    }
    /** method to return input element reference  */
    getInputElement() {
        return this.element
            ? this.element.querySelector(SEARCHBOX_CLASS) || this.element.querySelector(SEARCH_BAR_CLASS)
            : this.element.querySelector(SEARCHBOX_CLASS) || this.element.querySelector(SEARCH_BAR_CLASS);
    }
    /** method to return search dropdown reference  */
    getSearchListElement() {
        return this.element
            ? this.element.querySelector('.dxp-list-container')
            : this.element.getElementsByClassName('dxp-list-container')[0];
    }
    /** method to fetch the search suggester data */
    async handleChange(e) {
        const query = e.trim();
        this.searchDataCombined = [];
        this.suggesterData = [];
        if (query.length >= 3) {
            this.responseData = await this.getData(this.suggesterConfig, this.suggestEndPoint, query);
            if (this.responseData && this.responseData.suggest && this.responseData.suggest.contentSuggester[query]) {
                this.suggesterData = this.responseData.suggest.contentSuggester[query].suggestions;
            }
            for (const searchData of this.suggesterData) {
                let item = searchData.term.toLowerCase();
                const a = item.indexOf(query.toLowerCase());
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
            this.suggesterData.length > 0
                ? this.showSearchBoxList = true
                : this.showSearchBoxList = false;
        }
        else {
            this.showSearchBoxList = false;
        }
    }
    /** on li item selection emit event */
    onListItemSelection(text) {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        inputElement.value = text;
        this.showSearchBoxList = false;
        if (this.resultPageUrl && this.resultPageExtension && this.searchParamKey) {
            this.redirectPage(inputElement.value);
        }
        else {
            dxp.log.debug(this.element.tagName, 'onListItemSelection()', `event emit for SPA`);
            this.searchTermChanged.emit({ 'searchTerm': inputElement.value });
        }
    }
    /** handler method for input change */
    onTextInput(event) {
        this.searchValue = event.target.value.trim();
        if (this.showSuggestions) {
            this.handleChange(event.target.value)
                .then(() => dxp.log.info(this.element.tagName, 'onTextInput()', `in handleChange`))
                .catch(err => dxp.log.error(this.element.tagName, 'onTextInput()', `in handleChange :${err}`));
        }
    }
    /** on view item selection emit event */
    onViewAllSelection() {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        this.showSearchBoxList = false;
        if (this.resultPageUrl && this.resultPageExtension && this.searchParamKey) {
            this.redirectPage(inputElement.value);
        }
        else {
            this.searchTermChanged.emit({ 'searchTerm': inputElement.value });
        }
    }
    /** handler method for page redirection */
    redirectPage(searchText) {
        searchText = encodeURIComponent(searchText);
        const resultUrl = `${this.resultPageUrl}.${this.resultPageExtension}?${this.searchParamKey}=${searchText}`;
        window.location.href = resultUrl;
    }
    /** to remove duplicates from data */
    removeDuplicates(arr) {
        arr = arr.filter((item, pos) => {
            return arr.indexOf(item) === pos;
        });
        return Array.from(arr);
    }
    /** Render the advance search */
    renderAdvanceSearch() {
        dxp.log.debug(this.element.tagName, 'renderAdvanceSearch()', `in dxp-search render() : ${process.env.MODE}`);
        if (!this.suggesterConfig && this.showSuggestions) {
            dxp.log.debug(this.element.tagName, 'renderAdvanceSearch()', `component not rendered : check suggester and search config object`);
            return;
        }
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-search.min.css` })
        ];
        return (h("div", { role: "application", class: `${this.base.componentClass()} search-wrapper`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("section", { role: "search" },
                h("div", null,
                    h("span", { class: "dxp-icon dxp-icon-medium dxp-icon-search search-icon", tabindex: "0", "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchBoxToggle.bind(this) }),
                    h("div", { class: `${this.base.componentClass()} search-container${this.showSearchBox ? ' expand-container' : ' collapse-container'}` },
                        h("div", { class: "overlay dxp-none" }),
                        h("div", { class: "dxp-row dxp-row-rotate", tabindex: "-1" },
                            h("div", { class: "dxp-col-md-4 dxp-col-12 cta-container-mobile" },
                                h("slot", { name: "cta" })),
                            h("div", { class: "dxp-col-md-8 dxp-col-12 search-box-container" },
                                h("div", { class: "wrapper search-box-outer-container" },
                                    h("input", { type: "search", "aria-label": dxp.i18n.t('Search:customMessage'), role: "combobox", "aria-haspopup": "listbox", name: "searchbox", class: `dxp-form-control searchbox searchbox-${this.searchBoxSize} ${(this.showSearchBoxList && this.searchValue.length >= 3) ? NO_BORDER_RADIUS : ''}`, placeholder: this.placeholder, onInput: event => { this.onTextInput(event); } }),
                                    h("span", { class: "dxp-icon dxp-icon-large dxp-icon-search search-text", tabindex: "0", "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchData.bind(this) }),
                                    h("span", { class: `dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear dxp-icon-clear-${this.searchBoxSize} ${this.searchValue.length ? BLOCK : ' dxp-none'}`, "aria-label": dxp.i18n.t(SEARCH_CLEAR), tabindex: "0", onClick: () => this.clearSearchBox() })),
                                h("div", { class: `dxp-list-container ${(this.showSearchBoxList && this.searchValue.length >= 3) ? 'dxp-block' : ''}` },
                                    h("ul", { class: "dxp-suggestion-list", "aria-label": dxp.i18n.t(SEARCH_LIST_TEXT) },
                                        this.searchDataCombined && this.searchDataCombined.map(suggestTerm => h("li", { tabindex: "-1", class: "dxp-dropdown-list-item", "aria-label": dxp.i18n.t(SEARCH_SELECTED_ITEM, { item: suggestTerm }), onClick: this.selectSuggestion.bind(this) }, suggestTerm)),
                                        h("span", { tabindex: "0", class: "cta-container", onClick: () => this.onViewAllSelection() },
                                            h("dxp-cta", { type: "link", text: dxp.i18n.t('Search:ctaText') })))))),
                        h("span", { class: "dxp-icon dxp-icon-large dxp-icon-close search-wrapper-close-icon", title: dxp.i18n.t('Search:closeText'), "aria-label": dxp.i18n.t('Search:close'), role: "button", tabindex: "0", onClick: this.closeSearchBox.bind(this) }))))));
    }
    /** Render the home page search */
    renderHomePageSearch() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-search.min.css` })]
        ];
        return (h("div", { role: "application", class: `${this.base.componentClass()} search-wrapper homepage-search`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-col-12 search-box-container dxp-p-0" },
                h("div", { class: "wrapper-home-search" },
                    h("div", { class: "autowriter-wrapper", onClick: () => this.disableAutowriter() },
                        h("slot", { name: "autowriter" })),
                    h("input", { type: "search", "aria-haspopup": "listbox", name: "homepageSearch", "aria-label": this.placeholder, class: `dxp-form-control search search-bar ${(this.showSearchBoxList && this.searchValue.length >= 3) ? NO_BORDER_RADIUS : ''}`, onFocus: () => this.disableAutowriter(), onInput: event => { this.onTextInput(event); } }),
                    h("span", { class: "dxp-icon dxp-icon-medium dxp-icon-search search-text", tabIndex: 0, "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchData.bind(this) }),
                    h("span", { class: `dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear ${this.searchValue.length ? BLOCK : ' dxp-none'}`, "aria-label": dxp.i18n.t(SEARCH_CLEAR), tabIndex: 0, onClick: () => this.clearSearchBox() })),
                h("div", { class: `dxp-simple-list-container ${(this.showSearchBoxList && this.searchValue.length >= 3) ? 'dxp-block' : ''}` },
                    h("ul", { class: "dxp-suggestion-list", "aria-label": dxp.i18n.t(SEARCH_LIST_TEXT) }, this.searchDataCombined && this.searchDataCombined.map(suggestTerm => h("li", { tabIndex: -1, class: "dxp-dropdown-list-item", "aria-label": dxp.i18n.t(SEARCH_SELECTED_ITEM, { item: suggestTerm }), onClick: this.selectSuggestion.bind(this) }, suggestTerm)))))));
    }
    /** Render the simple search */
    renderSimpleSearch() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-search.min.css` })
        ];
        return (h("div", { role: "application", class: `${this.base.componentClass()} search-wrapper simple-search`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-col-12 search-box-container dxp-p-0" },
                h("div", { class: "wrapper" },
                    h("input", { type: "search", "aria-haspopup": "listbox", name: "searchbox", "aria-label": this.placeholder, class: `dxp-form-control searchbox searchbox-${this.searchBoxSize} ${(this.showSearchBoxList && this.searchValue.length >= 3) ? NO_BORDER_RADIUS : ''}`, placeholder: this.placeholder, onInput: event => { this.onTextInput(event); } }),
                    h("span", { class: "dxp-icon dxp-icon-medium dxp-icon-search search-text", tabIndex: 0, "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchData.bind(this) }),
                    h("span", { class: `dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear dxp-icon-clear-${this.searchBoxSize} ${this.searchValue.length ? BLOCK : ' dxp-none'}`, "aria-label": dxp.i18n.t(SEARCH_CLEAR), tabIndex: 0, onClick: () => this.clearSearchBox() })),
                h("div", { class: `dxp-simple-list-container ${(this.showSearchBoxList && this.searchValue.length >= 3) ? 'dxp-block' : ''}` },
                    h("ul", { class: "dxp-suggestion-list", "aria-label": dxp.i18n.t(SEARCH_LIST_TEXT) }, this.searchDataCombined && this.searchDataCombined.map(suggestTerm => h("li", { tabIndex: -1, class: "dxp-dropdown-list-item", "aria-label": dxp.i18n.t(SEARCH_SELECTED_ITEM, { item: suggestTerm }), onClick: this.selectSuggestion.bind(this) }, suggestTerm)))))));
    }
    /** SEO script of Schema  */
    schemaScript() {
        let domainURL;
        let arr;
        let result;
        domainURL = window.location.href;
        arr = domainURL.split('/');
        result = `${arr[0]}//${arr[2]}`;
        const targetUrl = `${this.resultPageUrl}.${this.resultPageExtension}?${this.searchParamKey}`;
        const schemaObj = {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            'url': result,
            'potentialAction': [{
                    '@type': 'SearchAction',
                    'target': `${result}${targetUrl}={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                }]
        };
        const schema = JSON.stringify(schemaObj);
        /** created script tag to be appended on the body tag for SEO schema */
        this.base.createSeoSchema(dxp, this.element, schema);
    }
    /** method to fetch the search data */
    searchData(e, key) {
        let shadowRootExist = false;
        shadowRootExist = this.base.returnBooleanValue(e.target);
        const inputText = key && shadowRootExist ?
            (e.target.activeElement.tagName === 'SPAN' ?
                e.target.activeElement.previousElementSibling.value.trim()
                :
                    e.target.activeElement.value.trim())
            : e.target.tagName === 'INPUT' ? e.target.value.trim() : e.target.previousElementSibling.value.trim();
        if (inputText.length >= 3) {
            if (this.resultPageUrl && this.resultPageExtension && this.searchParamKey) {
                dxp.log.debug(this.element.tagName, 'searchData()', `redirected to search result page`);
                this.redirectPage(inputText);
            }
            else {
                dxp.log.debug(this.element.tagName, 'searchData()', `event emit for SPA`);
                this.searchTermChanged.emit({ 'searchTerm': inputText });
            }
        }
    }
    /** on li selection populate on searchbox */
    selectSuggestion(e, key) {
        if (key && e.target && e.target.activeElement.tagName === 'LI') {
            this.onListItemSelection(e.target.activeElement.innerText);
        }
        else if (e.target.tagName === 'LI') {
            this.onListItemSelection(e.target.innerText);
        }
    }
    /** Render dxp-search */
    render() {
        if (this.searchType === 'simple') {
            return this.renderSimpleSearch();
        }
        if (this.searchType === 'homepage') {
            return this.renderHomePageSearch();
        }
        return this.renderAdvanceSearch();
    }
    static get is() { return "dxp-search"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-search.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-search.css"]
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
                "text": "placeholder for search input"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "resultPageExtension": {
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
                "text": "resultPageExtension - search result page extension without .(dot)"
            },
            "attribute": "result-page-extension",
            "reflect": false
        },
        "resultPageUrl": {
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
                "text": "resultPageUrl - search result page url"
            },
            "attribute": "result-page-url",
            "reflect": false
        },
        "searchBoxSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'sm' | 'md' | 'lg'",
                "resolved": "\"lg\" | \"md\" | \"sm\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "searchBoxSize - defines the height of search box"
            },
            "attribute": "search-box-size",
            "reflect": false,
            "defaultValue": "'lg'"
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
        "searchType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'simple' | 'advance' | 'homepage'",
                "resolved": "\"advance\" | \"homepage\" | \"simple\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "searchType - search render type, can be advance or simple"
            },
            "attribute": "search-type",
            "reflect": false,
            "defaultValue": "'advance'"
        },
        "showSuggestions": {
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
                "text": "showSuggestions - search url parameter key"
            },
            "attribute": "show-suggestions",
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
        "dir": {},
        "locale": {},
        "responseData": {},
        "searchDataCombined": {},
        "searchValue": {},
        "showSearchBox": {},
        "showSearchBoxList": {},
        "suggestEndPoint": {},
        "suggesterConfig": {},
        "suggesterData": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "searchTermChanged",
            "name": "searchTermChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "if search term changed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "clearSearchBox": {
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
                "text": "Method to clear the searchbox value",
                "tags": []
            }
        },
        "closeSearchBox": {
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
                "text": "Method to hide searchbox",
                "tags": []
            }
        },
        "searchBoxToggle": {
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
                "text": "Method to show searchbox",
                "tags": []
            }
        }
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
