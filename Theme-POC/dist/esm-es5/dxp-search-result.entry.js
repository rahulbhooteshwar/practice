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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages, x as xmlApi } from './xml-api-01fae573.js';
var LOG_SEARCH_RESULT = 'getSearchData()';
var SearchResult = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
        this.analyticsDataEmitter = createEvent(this, "dxp_comp", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Search', messages);
        if (this.searchApiUrl &&
            this.searchFl && this.searchCollection &&
            this.highlightFields && this.sortingField) {
            this.cfqLocale = this.cfqLocale ? this.cfqLocale : this.locale.toLowerCase().replace('_', '-');
            this.searchEndPoint = "" + (this.searchApiUrl + this.searchCollection);
            var strHighlight = this.highlightFields.split(',');
            var highlightFl = '';
            for (var _i = 0, strHighlight_1 = strHighlight; _i < strHighlight_1.length; _i++) {
                var str = strHighlight_1[_i];
                highlightFl = "" + highlightFl + str + "_" + this.getPageLang(this.cfqLocale) + ",";
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
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(window.location.href.indexOf(this.searchParamKey) > -1)) return [3 /*break*/, 2];
                        dxp.log.debug(this.element.tagName, 'componentDidLoad()', 'Search Result Component-received the redirect page query');
                        str = [];
                        str = window.location.href.split(this.searchParamKey + "=");
                        this.searchValue = decodeURIComponent(str[1].trim());
                        return [4 /*yield*/, this.setValue(this.searchValue)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** accessibility implementation for key events */
    class_1.prototype.handleKeyUp = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var target, searchBox, inputSearch, viewMore, parentLi, keycode, lis, resultsElements, temp, searchInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = e.target
                            ? e.target.activeElement
                            : e.target;
                        searchBox = target.classList.contains('searchbox');
                        inputSearch = target.classList.contains('dxp-icon-search');
                        viewMore = target.classList.contains('dxp-btn-secondary');
                        parentLi = target;
                        keycode = e.keyCode;
                        if (keycode === 38 || keycode === 40) {
                            e.preventDefault();
                        }
                        if (!(keycode === 13 || keycode === 32)) return [3 /*break*/, 7];
                        if (!(inputSearch && target.previousElementSibling.value.trim().length >= 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setValue(target.previousElementSibling.value)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!parentLi.classList.contains('list-element')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setValue(target.innerText)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(keycode === 13 && searchBox && target.value.trim().length >= 3)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.setValue(target.value)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        // on viewmore enter click, set focus to last result row
                        if (keycode === 13 && viewMore) {
                            resultsElements = target.closest('.sc-dxp-search-result').querySelectorAll('.result-listing');
                            if (resultsElements) {
                                temp = this.searchConfig['start'] + this.rows;
                                this.tempElement = resultsElements[temp - 1].querySelector('a');
                            }
                        }
                        _a.label = 7;
                    case 7:
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
                                searchInput = this.getInputElement();
                                this.focusElement(searchInput);
                            }
                        }
                        if (keycode === 40 && target.closest('.dxp-dropdown-list') && target.nextElementSibling) {
                            this.focusElement(target.nextElementSibling);
                        }
                        if (keycode === 38 && target.closest('.dxp-dropdown-list') && target.previousElementSibling) {
                            this.focusElement(target.previousElementSibling);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** on search term changed */
    class_1.prototype.searchTermChangedHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dxp.log.debug(this.element.tagName, 'searchTermChangedHandler()', 'Search Result Component-received the custom search term changed event: ', e.detail.searchTerm);
                        this.searchValue = e.detail.searchTerm;
                        return [4 /*yield*/, this.setValue(this.searchValue)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Method to emit the analytics data after performing search */
    class_1.prototype.analyticSearchResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var analyticsObj;
            return __generator(this, function (_a) {
                analyticsObj = {
                    'di_comp_name': this.element.tagName,
                    'di_comp_searchfound': this.resultCount ? 'true' : 'false',
                    'di_comp_searchterm': this.searchValue,
                    'di_comp_searchresults': this.resultCount,
                    'di_comp_searchCollection': this.suggestCollection
                };
                this.analyticsDataEmitter.emit(analyticsObj);
                dxp.log.info(this.element.tagName, 'analyticSearchResult()', analyticsObj);
                return [2 /*return*/];
            });
        });
    };
    /** Public method used in dxp-search-result-item as well */
    class_1.prototype.setValue = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.searchValue = item;
                if (this.searchValue.trim().length) {
                    this.changeSearchResults(true)
                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    dxp.log.info(this.element.tagName, 'setValue()', "in searchData");
                                    return [4 /*yield*/, this.analyticSearchResult()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (err) { return dxp.log.error(_this.element.tagName, 'setValue()', "in searchData :" + err); });
                }
                return [2 /*return*/];
            });
        });
    };
    /** Method used to change in search result if search text changes */
    class_1.prototype.changeSearchResults = function (isIntialCall) {
        return __awaiter(this, void 0, void 0, function () {
            var inputElement, query, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.element
                            ? this.element.querySelector('.dxp-list-container').classList.remove('dxp-show')
                            : this.element.querySelector('.dxp-list-container').classList.remove('dxp-show');
                        inputElement = this.getInputElement();
                        inputElement.value = this.searchValue;
                        this.tags ?
                            query = "(url:\"" + dxp.util.addEscapeCharacter(this.cfq + (this.cfqLocale.toLowerCase().trim() === 'global' ? 'global' : this.cfqLocale)) + "\" AND (" + this.sortingField + "_" + this.getPageLang(this.cfqLocale) + ":(" + dxp.util.addEscapeCharacter(this.searchValue.trim()).replace(new RegExp('\\ ', 'g'), ' AND ') + ")) AND tags:\"" + dxp.util.addEscapeCharacter(this.tags) + "\")"
                            : query = "(url:\"" + dxp.util.addEscapeCharacter(this.cfq + (this.cfqLocale.toLowerCase().trim() === 'global' ? 'global' : this.cfqLocale)) + "\" AND (" + this.sortingField + "_" + this.getPageLang(this.cfqLocale) + ":(" + dxp.util.addEscapeCharacter(this.searchValue.trim()).replace(new RegExp('\\ ', 'g'), ' AND ') + ")))";
                        if (isIntialCall) {
                            this.pageStart = 0;
                            this.searchConfig['start'] = 0;
                        }
                        this.searchConfig['fl'] = encodeURIComponent("termfreq(" + this.sortingField + "_" + this.getPageLang(this.cfqLocale) + ",'" + dxp.util.addEscapeCharacter(this.searchValue.trim()) + "')," + this.searchFl);
                        this.searchConfig['sort'] = encodeURIComponent("termfreq(" + this.sortingField + "_" + this.getPageLang(this.cfqLocale) + ",'" + dxp.util.addEscapeCharacter(this.searchValue.trim()) + "') desc,start_time asc");
                        _a = this;
                        return [4 /*yield*/, this.getSearchData(this.searchConfig, this.searchEndPoint, query)
                                .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                var tempHighlightData;
                                return __generator(this, function (_a) {
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
                                            this.searchResults.response.docs = __spreadArrays(this.tempResultsData, tempHighlightData);
                                            this.tempResultsData = this.searchResults.response.docs;
                                        }
                                    }
                                    else {
                                        this.searchResults = [];
                                        this.resultCount = 0;
                                    }
                                    return [2 /*return*/];
                                });
                            }); })
                                .catch(function (error) {
                                dxp.log.error(_this.element.tagName, 'changeSearchResults()', 'Error in dxp-search fetch service: ', error);
                            })];
                    case 1:
                        _a.responseData = _b.sent();
                        this.resultCount === 0 || (this.searchResults && this.searchResults.status === 500)
                            ? this.noResult = 'noresult'
                            : this.noResult = 'result';
                        return [2 /*return*/];
                }
            });
        });
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** method to return input element reference  */
    class_1.prototype.getInputElement = function () {
        return this.element
            ? this.element.querySelector('.searchbox')
            : this.element.querySelector('.searchbox');
    };
    /** Method to get the locale of the page */
    class_1.prototype.getPageLang = function (locale) {
        locale = locale.toLowerCase().trim() === 'global' ? this.locale.toLowerCase().replace('_', '-') : locale;
        var lang = locale && locale.substring(0, 2);
        if ((lang.indexOf('zh') === 0 || lang.indexOf('ko') === 0)) {
            lang = 'cjk';
        }
        return lang;
    };
    /** Get method to fetch the service data */
    class_1.prototype.getSearchData = function (config, endPointUrl, query) {
        var _this = this;
        var configJson;
        configJson = config;
        if (endPointUrl.indexOf('search') > -1) {
            configJson['q'] = encodeURIComponent(query);
        }
        var bodyData = Object.keys(configJson).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(configJson[key]);
        }).join('&');
        var opts = {
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
                .then(function (data) {
                dxp.log.debug(_this.element.tagName, LOG_SEARCH_RESULT, "xhr request success");
                return JSON.parse(data['response']);
            })
                .catch(function (error) {
                dxp.log.debug(_this.element.tagName, LOG_SEARCH_RESULT, "xhr request cancelled/failed : " + JSON.stringify(error));
            });
        }
        catch (e) {
            dxp.log.error(this.element.tagName, LOG_SEARCH_RESULT, "fetch failed", e);
        }
    };
    /** method to highlight the text in search result */
    class_1.prototype.highlightSearchKeyword = function (collection, highlight) {
        var contentStr;
        var titleStr;
        var contentLocale;
        var titleLocale;
        var spreadString = '...';
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var collectionObj = collection_1[_i];
            if (collectionObj.title) {
                var colId = collectionObj.id;
                titleStr = '';
                contentStr = '';
                var pageLang = "_" + this.getPageLang(this.cfqLocale);
                contentLocale = "content" + (this.getPageLang(this.cfqLocale) ? pageLang : '');
                titleLocale = "title" + (this.getPageLang(this.cfqLocale) ? pageLang : '');
                if (highlight[colId][titleLocale]) {
                    for (var _a = 0, _b = highlight[colId][titleLocale]; _a < _b.length; _a++) {
                        var title = _b[_a];
                        titleStr = titleStr + title;
                    }
                }
                else {
                    titleStr = collectionObj.title;
                }
                if (titleStr.length > this.titleLength) {
                    titleStr = titleStr.substring(0, this.titleLength);
                    titleStr = titleStr.substring(0, titleStr.lastIndexOf(' ')) + " " + spreadString;
                }
                if (highlight[colId][contentLocale]) {
                    contentStr = '...';
                    for (var _c = 0, _d = highlight[colId][contentLocale]; _c < _d.length; _c++) {
                        var content = _d[_c];
                        contentStr = contentStr + " " + content + " " + spreadString + " ";
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
                        contentStr = contentStr + " " + spreadString;
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
    };
    /** render search results */
    class_1.prototype.renderSearchResults = function (searchResults) {
        return searchResults.map(function (data) {
            return (h("div", { class: "result-listing" }, h("div", null, h("a", { href: "" + data.url, class: "column-item-link", innerHTML: data.title })), h("div", { class: "data-description", innerHTML: data.description })));
        });
    };
    /** used to scroll to top on pagination click */
    class_1.prototype.scrollToTop = function () {
        var element = this.getInputElement();
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    };
    /** check visibility of the next button */
    class_1.prototype.viewMore = function () {
        var _this = this;
        this.pageStart = this.pageStart + 1;
        this.searchConfig['start'] = this.rows * this.pageStart;
        this.changeSearchResults(false)
            .then(function () { return dxp.log.info(_this.element.tagName, 'viewMore()', "in searchData"); })
            .catch(function (err) { return dxp.log.error(_this.element.tagName, 'viewMore()', "in searchData :" + err); });
        if (this.tempElement) {
            this.focusElement(this.tempElement);
        }
    };
    /** Render the search-result */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-search-result render() : " + "DEVELOPMENT");
        if (!this.searchConfig) {
            dxp.log.debug(this.element.tagName, 'render()', "component not rendered : check suggester and search config object");
            return;
        }
        var styles = (h("span", null, h("link", { rel: "stylesheet", href: "" }), this.theme && h("link", { rel: "stylesheet", href: "" }), this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-search-result.min.css" }), this.dtmUrl && (h("script", { src: this.dtmUrl }))));
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { id: "search-results", class: "sc-dxp-search-result search-results", role: "application" }, h("div", { class: "dxp-row" }, h("div", { class: "sc-dxp-search-result dxp-col-12 search-container" }, h("dxp-searchbox", { "suggest-collection": this.suggestCollection, cfq: this.cfq, placeholder: this.placeholder, "suggest-api-url": this.suggestApiUrl, "cfq-locale": this.cfqLocale, "suggest-count": this.suggestCount, "suggest-dictionary": this.suggestDictionary, "no-result-flag": this.noResult, "searched-text": this.searchValue, "searched-term": this.searchValue, "result-count": this.resultCount, "error-text": this.errorMessage }), h("div", { class: "sc-dxp-search-result dxp-col-lg-8 dxp-col-md-12 dxp-col-12 dxp-p-0" }, this.showPromotions && this.promotionsData && this.promotionsKeywordsArray.some(function (key) { return _this.searchValue.toLowerCase() === key.toLowerCase(); })
            && this.searchResults && this.searchResults.response &&
            this.renderSearchResults(this.promotionsData), this.searchResults && this.searchResults.response && this.searchResults.response.docs &&
            this.renderSearchResults(this.searchResults.response.docs)))), this.searchResults && this.searchResults.response && this.searchResults.response.docs.length !== this.resultCount &&
            h("div", { class: "dxp-col-12 view-more-button" }, h("button", { "aria-label": this.viewMoreText, class: "dxp-btn dxp-btn-secondary dxp-btn-lg", onClick: function () { return _this.viewMore(); } }, this.viewMoreText)))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-search-result .search-results{padding-top:5rem}div.dxp.dxp-search-result .search-results .no-result-message{list-style-type:disc;padding-left:.75rem;padding-top:.625rem}div.dxp.dxp-search-result .search-results .view-more-button{position:relative;padding:4rem 0 6.19rem 0}div.dxp.dxp-search-result .search-results .result-count-align{margin-bottom:1.625rem}div.dxp.dxp-search-result .search-results .dxp-icon-close{position:absolute;top:.9375rem;right:.9375rem;margin:0;padding:0;cursor:pointer}div.dxp.dxp-search-result .search-results .wrapper{position:relative}div.dxp.dxp-search-result .search-results .dxp-dropdown-list li{height:auto;line-height:normal}div.dxp.dxp-search-result .search-results .dxp-dropdown-list li:after{display:none}div.dxp.dxp-search-result .search-results .searchbox{height:2.5rem;padding:.68rem 2.2rem .5rem 2.5rem;border-radius:2.1875rem;margin-bottom:2.375rem}div.dxp.dxp-search-result .search-results .searchbox+.dxp-icon-search{position:absolute;cursor:pointer;left:.875rem;top:.75rem}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container{border:0;background:none;margin-top:.625rem;position:relative;top:-.0625rem}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container.dxp-show{border-top:none}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container ul{max-height:15rem;overflow-y:auto}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container li{margin-bottom:.2188rem;text-align:left;padding-left:2.5rem}div.dxp.dxp-search-result .search-results .searchbox~.dxp-list-container li:after{height:3.0625rem;left:1%}div.dxp.dxp-search-result .search-results .search-terms{text-transform:uppercase;letter-spacing:.0625rem;margin-top:3.5rem}div.dxp.dxp-search-result .search-results .result-listing{padding:1.125rem 0}div.dxp.dxp-search-result .search-results .result-listing .column-item-link{margin-bottom:.1875rem;margin-top:inherit}div.dxp.dxp-search-result .search-results .result-listing .column-item-link:after,div.dxp.dxp-search-result .search-results .result-listing .column-item-link:before{background:none}div.dxp.dxp-search-result .search-results .search-box-wrapper{position:relative}div.dxp.dxp-search-result[dir=rtl] .search-results .searchbox{padding:.68rem 2.2rem .5rem 3.125rem}div.dxp.dxp-search-result[dir=rtl] .search-results .searchbox+.dxp-icon-search{right:.75rem}div.dxp.dxp-search-result[dir=rtl] .search-results .searchbox~.dxp-list-container li{padding-right:2.125rem;text-align:right}div.dxp.dxp-search-result[dir=rtl] .search-results .dxp-icon-close{left:.9375rem;right:auto}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { SearchResult as dxp_search_result };
