var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages, x as xmlApi } from './xml-api-01fae573.js';
var LOG_SUGGEST_DATA = 'getSuggestData()';
var SearchBox = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Search', messages);
        if (this.suggestApiUrl &&
            this.suggestCount && this.suggestDictionary && this.suggestCollection && this.cfq) {
            this.cfqLocale = this.cfqLocale ? this.cfqLocale : this.locale.toLowerCase().replace('_', '-');
            this.suggestEndPoint = "" + (this.suggestApiUrl + this.suggestCollection);
            this.suggesterConfig = {
                'suggest.count': this.suggestCount,
                'suggest.dictionary': this.suggestDictionary,
                'suggest': 'true',
                'suggest.cfq': encodeURIComponent(dxp.util.addEscapeCharacter("" + this.cfq + this.cfqLocale + "*"))
            };
        }
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        // HTML elements
        this.inputBoxSearch = this.element.querySelector('.searchbox');
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentWillUpdate = function () {
        this.searchValue = this.searchedTerm ? this.searchedTerm : this.searchValue;
    };
    /** for mouse click outside of component */
    class_1.prototype.clickEvent = function (e) {
        /** close search dropdown list on mouse click outside of search */
        if (!e.target.classList.contains('dxp-list-container') && !e.target.classList.contains('searchbox')) {
            this.showSearchDropdown = false;
        }
    };
    /** accessibility implementation for key events */
    class_1.prototype.handleKeyUp = function (e) {
        var target = e.target
            ? e.target.activeElement
            : e.target;
        var parentLi = target;
        var keycode = e.keyCode;
        var searchBox = target.classList.contains('searchbox');
        var inputSearch = target.classList.contains('dxp-icon-search');
        var clearIcon = target.classList.contains('dxp-icon-clear');
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
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Method to clear the searchbox value */
    class_1.prototype.clearSearchBox = function () {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        var inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.value = '';
            this.searchValue = this.searchedTerm = '';
        }
    };
    /** method to return input element reference  */
    class_1.prototype.getInputElement = function () {
        return this.element.querySelector('.searchbox');
    };
    /** Get method to fetch the service data */
    class_1.prototype.getSuggestData = function (config, endPointUrl, query) {
        return __awaiter(this, void 0, void 0, function () {
            var configJson, bodyData, opts, json;
            var _this = this;
            return __generator(this, function (_a) {
                configJson = config;
                if (endPointUrl.indexOf('suggest') > -1) {
                    configJson['suggest.q'] = encodeURIComponent(query);
                }
                bodyData = Object.keys(configJson).map(function (key) {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(configJson[key]);
                }).join('&');
                opts = {
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
                    json = xmlApi.fetchRequest(endPointUrl, opts)
                        .then(function (data) {
                        dxp.log.debug(_this.element.tagName, LOG_SUGGEST_DATA, "xhr request success");
                        return JSON.parse(data['response']);
                    })
                        .catch(function (error) {
                        dxp.log.debug(_this.element.tagName, LOG_SUGGEST_DATA, "xhr request cancelled/failed : " + JSON.stringify(error));
                    });
                    this.responseData = json;
                    return [2 /*return*/, this.responseData];
                }
                catch (e) {
                    dxp.log.error(this.element.tagName, LOG_SUGGEST_DATA, "fetch failed", e);
                }
                return [2 /*return*/];
            });
        });
    };
    /** method to fetch the service data */
    class_1.prototype.handleChange = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            var searchQuerry, _a, _i, _b, searchData, item, a, tokens, tokenslength, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.count = -1;
                        this.searchDataCombined = [];
                        this.contentSuggesterData = [];
                        this.searchFilteredData = [];
                        this.searchValue = val;
                        searchQuerry = this.searchValue.trim();
                        if (!(searchQuerry.length >= 3)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getSuggestData(this.suggesterConfig, this.suggestEndPoint, searchQuerry)];
                    case 1:
                        _a.responseData = _c.sent();
                        if (this.responseData && this.responseData.suggest) {
                            this.contentSuggesterData = this.responseData.suggest.contentSuggester;
                        }
                        if (this.contentSuggesterData[searchQuerry]) {
                            this.searchFilteredData = this.contentSuggesterData[searchQuerry].suggestions;
                        }
                        for (_i = 0, _b = this.searchFilteredData; _i < _b.length; _i++) {
                            searchData = _b[_i];
                            item = searchData.term.toLowerCase();
                            a = item.indexOf(searchQuerry.toLowerCase());
                            item = item.substr(a, item.length);
                            tokens = item.split(' ');
                            tokenslength = tokens.length;
                            item = '';
                            for (i = 0; i < tokenslength && i < 5; i++) {
                                item += tokens[i];
                                item += ' ';
                            }
                            this.searchDataCombined.push(item);
                        }
                        this.searchDataCombined = this.removeDuplicates(this.searchDataCombined);
                        this.searchDataCombined.length > 0 ? this.showSearchDropdown = true : this.showSearchDropdown = false;
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** handler method for input change */
    class_1.prototype.onTextInput = function (event) {
        var _this = this;
        this.searchedTerm = '';
        this.handleChange(event.target.value)
            .then(function () { return dxp.log.info(_this.element.tagName, 'onTextInput()', "in handleChange"); })
            .catch(function (err) { return dxp.log.error(_this.element.tagName, 'onTextInput()', "in handleChange :" + err); });
    };
    /** to remove duplicates from data */
    class_1.prototype.removeDuplicates = function (arr) {
        arr = arr.filter(function (item, pos) {
            return arr.indexOf(item) === pos;
        });
        return Array.from(arr);
    };
    /** called when search icon click */
    class_1.prototype.setSearchValue = function (searchResultComponent) {
        this.showSearchDropdown = false;
        if (this.searchValue.trim().length >= 3) {
            searchResultComponent.setValue(this.searchValue);
        }
    };
    /** Render the search-result */
    class_1.prototype.render = function () {
        var _this = this;
        var searchResultComponent = document.querySelector('dxp-search-result');
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-searchbox render() : " + "DEVELOPMENT");
        return ([
            h("div", { class: "sc-dxp-search-result dxp-col-12 dxp-col-lg-6 search-box-wrapper dxp-p-0" }, h("div", { class: "sc-dxp-search-result" }, h("div", { class: "sc-dxp-search-result dxp-search-info" }, this.searchedText
                ? [h("span", { class: "sc-dxp-search-result" }, dxp.i18n.t('Search:searchMessage')), h("span", { class: "search-keywords" }, " " + this.searchedText, " ")] : ''), h("div", { class: "sc-dxp-search-result dxp-search-count result-count-align" }, this.noResultFlag === 'noresult' && this.searchedText ?
                h("span", null, dxp.i18n.t('Search:noResultFound'))
                : this.searchedText === '' ? '' : this.resultCount ? h("span", null, this.resultCount + " ", dxp.i18n.t('Search:searchFound')) : '')), h("div", { role: "application", class: "sc-dxp-search-result wrapper" }, h("input", { type: "text", role: "combobox", "aria-haspopup": "listbox", name: "searchbox", "aria-label": dxp.i18n.t('Search:customMessage'), value: this.searchValue || this.searchedTerm, onInput: function (event) { _this.onTextInput(event); }, class: "sc-dxp-search-result dxp-form-control searchbox" + ((this.showSearchDropdown && this.searchValue.length >= 3) ? ' no-border-radius' : ''), placeholder: this.placeholder }), h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Search:searchIconAccessibilityText'), class: "sc-dxp-search-result dxp-icon dxp-icon-medium dxp-icon-search", onClick: function () { return _this.setSearchValue(searchResultComponent); } }), h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Search:clear'), class: "sc-dxp-search-result dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear" + (this.searchValue.length ? ' dxp-block' : ' dxp-none'), onClick: function () { return _this.clearSearchBox(); } }), h("div", { class: "dxp-list-container sc-dxp-search-result " + ((this.showSearchDropdown && this.searchValue.length >= 3) ? 'dxp-block' : '') }, h("ul", { class: "dxp-dropdown-list sc-dxp-search-result", "aria-label": dxp.i18n.t('Search:listText') }, this.searchDataCombined && this.searchDataCombined.map(function (item, index) { return (h("li", { class: "list-element sc-dxp-search-result", id: "opt-" + (index + 1), "aria-label": dxp.i18n.t('Search:selectedItem', { item: item }), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.searchValue = item;
                                return [4 /*yield*/, searchResultComponent.setValue(item)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, tabindex: "-1" }, item, " ")); }))))),
            h("div", { class: "sc-dxp-search-result dxp-col-12 dxp-bold" }, this.noResultFlag === 'noresult' && this.searchedText ? h("div", { class: "sc-dxp-search-result search-terms", innerHTML: this.errorText }) : '')
        ]);
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { SearchBox as dxp_searchbox };
