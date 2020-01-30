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
var messages = {
    'en': {
        listText: 'Select search item from list',
        selectedItem: 'Current selected {{item}}',
        close: 'Press delete or backspace to remove selected item',
        closeText: 'Close'
    },
    'es': {
        listText: 'Seleccione el elemento de búsqueda de la lista',
        selectedItem: 'Seleccionado actualmente {{item}}',
        close: 'Presione eliminar o retroceder para eliminar el elemento seleccionado',
        closeText: 'Cerrar'
    }
};
/** common XMLHttpRequest for handling fetch request */
// currently using this XMLHttpRequest in search component to fetch the data
var xmlApi;
// Create the XHR request
var request = new XMLHttpRequest();
var fetchRequest = function (url, params) {
    // Return it as a Promise
    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4) {
                return;
            }
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            }
            else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        // If error
        request.onerror = function () {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };
        // Setup our HTTP request
        request.open(params.method, url, true);
        // Setup our HTTP request headers
        if (params.headers) {
            Object.keys(params.headers).forEach(function (key) {
                request.setRequestHeader(key, params.headers[key]);
            });
        }
        // Send the request
        request.send(params.body);
    });
};
xmlApi = {
    // exporting XMLHttpRequest object to use in search component to abort the previous fetch calls
    request: request,
    fetchRequest: fetchRequest
};
var xmlApi$1 = xmlApi;
var LIST_CLASS = 'dxp-dropdown-list-item';
var LOG_EMIT = 'tag items changed event emit: ';
var TagInput = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** keysArray - key fields to display in dropdown */
        this.keysArray = [];
        /** responseData - service response data */
        this.responseData = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchBoxList - to show/hide the search items list */
        this.showSearchBoxList = false;
        /** suggestData - dropdown suggester data */
        this.suggestData = [];
        /** tagsArray - tagsArray data to display as pills/tags */
        this.tagsArray = [];
        /** tagsTempArray - tagsTempArray data to display as pills/tags */
        this.tagsTempArray = [];
        this.tagItemsChanged = createEvent(this, "tagItemsChanged", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'TagInput', messages);
        if (this.keysToDisplay) {
            this.keysArray = this.keysToDisplay.split(',');
        }
        if (this.tagsData && typeof this.tagsData === 'string') {
            this.tagsData = JSON.parse(this.tagsData);
        }
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    class_1.prototype.componentDidUpdate = function () {
        /* to dynamically set the position of dropdown list*/
        var list = this.element
            ? this.element.querySelector('.dxp-list-container')
            : this.element.querySelector('.dxp-list-container');
        if (this.clientHeight() >= 66) {
            list['style'].setProperty('top', '68px');
        }
        else if (this.clientHeight() === 64) {
            list['style'].setProperty('top', '66px');
        }
        else if (this.clientHeight() <= 40) {
            list['style'].setProperty('top', '42px');
        }
    };
    /** for mouse click outside of  component */
    class_1.prototype.clickEvent = function (e) {
        if (!e.target.classList.contains('dxp-list-container')) {
            this.showSearchBoxList = false;
        }
    };
    /** for accessibility implementation */
    class_1.prototype.handleKeyUp = function (e) {
        var target = e.target
            ? e.target.activeElement
            : e.target;
        var searchBox = target.classList.contains('searchbox');
        var parentLi = target.classList.contains(LIST_CLASS);
        var nextEl = target.nextElementSibling;
        var prevEl = target.previousElementSibling;
        var keycode = e.keyCode;
        var targetDiv = target.closest('div');
        var nextSibling = targetDiv.nextElementSibling;
        var prevSibling = targetDiv.previousElementSibling;
        var tags = target.classList.contains('tags');
        /** handle keys */
        if (keycode === 8) {
            /** on backspace key, remove last selected pills/tag */
            this.OnBackspaceKey(target, searchBox, tags);
        }
        else if (keycode === 40) {
            /** for down arrow key */
            this.onDownArrowKey(e, searchBox, nextSibling, parentLi, nextEl);
        }
        else if (keycode === 38) {
            /** for up arrow key */
            this.onUpArrowKey(e, prevSibling, parentLi, prevEl);
        }
        else if ((keycode === 13 || keycode === 32)) {
            /** on enter and space key, select suggestions */
            this.OnEnterAndSpaceKey(target, parentLi);
        }
        else if (keycode === 37) {
            /** for left arrow key */
            this.onLeftArrowKey(target, searchBox, tags, prevEl);
        }
        else if (keycode === 39) {
            /** for right arrow key */
            this.onRightArrowKey(tags, nextEl);
        }
        else if (keycode === 46) {
            /** for delete key */
            this.onDeleteKey(target, tags);
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** on tags remove clear item from tags list */
    class_1.prototype.clearItem = function (id) {
        var tagsTempArray = this.tagsArray;
        var filteredArray = tagsTempArray.filter(function (item) {
            return item.id !== id;
        });
        this.tagsArray = filteredArray;
        this.showSearchBoxList = false;
        this.focusInput();
        this.tagItemsChanged.emit({ 'tagItems': this.tagsArray });
        dxp.log.debug(this.element.tagName, 'clearItem()', LOG_EMIT, this.tagsArray);
    };
    /** method to calculate client height */
    class_1.prototype.clientHeight = function () {
        var ele = this.element
            ? this.element.querySelector('.tag-div')
            : this.element.querySelector('.tag-div');
        return ele.clientHeight;
    };
    /** method to filter tags data based on user type string  */
    class_1.prototype.filterTagsData = function (query) {
        var _this = this;
        var lowSearch = query.toLowerCase();
        return this.responseData[this.dataKey].filter(function (item) {
            return _this.keysArray.some(function (key) {
                return item[key].toLowerCase().includes(lowSearch);
            });
        });
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** method to return input element reference  */
    class_1.prototype.focusInput = function () {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        var inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.focus();
            inputElement.style.minWidth = 'auto';
        }
    };
    /** Get method to fetch the service data */
    class_1.prototype.getData = function (apiUrl, query) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, json;
            var _this = this;
            return __generator(this, function (_a) {
                opts = {
                    method: 'GET',
                    headers: this.apiHeaders ? JSON.parse(this.apiHeaders) : { 'Content-Type': 'application/json' }
                };
                try {
                    // aborting the previous xhr request call
                    if (xmlApi$1.request) {
                        xmlApi$1.request.abort();
                    }
                    json = xmlApi$1.fetchRequest(apiUrl + query, opts)
                        .then(function (data) {
                        dxp.log.debug(_this.element.tagName, 'getData()', "xhr request success");
                        return JSON.parse(data['response']);
                    })
                        .catch(function (error) {
                        dxp.log.debug(_this.element.tagName, 'getData()', "xhr request cancelled/failed : " + JSON.stringify(error));
                    });
                    this.responseData = json;
                    return [2 /*return*/, this.responseData];
                }
                catch (e) {
                    dxp.log.error(this.element.tagName, 'getData()', "fetch failed", e);
                }
                return [2 /*return*/];
            });
        });
    };
    /** method to return input element reference  */
    class_1.prototype.getInputElement = function () {
        return this.element
            ? this.element.querySelector('.searchbox')
            : this.element.querySelector('.searchbox');
    };
    /** method to return search dropdown reference  */
    class_1.prototype.getSearchListElement = function () {
        return this.element
            ? this.element.querySelector("." + LIST_CLASS)
            : this.element.getElementsByClassName(LIST_CLASS)[0];
    };
    /** Group the data by groupByField */
    class_1.prototype.groupDataByField = function () {
        var _this = this;
        this.suggestData = this.suggestData.reduce(function (r, a) {
            r[a[_this.groupByField]] = r[a[_this.groupByField]] || [];
            r[a[_this.groupByField]].push(a);
            return r;
        }, Object.create({}));
        if (this.tagsArray.length) {
            // remove already added item from suggestion list
            var idsArray_1 = [];
            this.tagsArray.forEach(function (item) { return idsArray_1.push(item.id); });
            Object.keys(this.suggestData).forEach(function (key) {
                _this.suggestData[key] = _this.suggestData[key].filter(function (itemObj) {
                    return idsArray_1.indexOf(itemObj.id) === -1;
                });
            });
        }
    };
    /** Grouping of search suggester data */
    class_1.prototype.groupSearchSuggestData = function () {
        if (this.tagsArray.length) {
            var idsArray_2 = [];
            this.tagsArray.forEach(function (item) { return idsArray_2.push(item.id); });
            this.suggestData = this.suggestData.filter(function (itemObj) {
                return idsArray_2.indexOf(itemObj.id) === -1;
            });
        }
    };
    /** method to fetch the search suggester data */
    class_1.prototype.handleChange = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = e.trim();
                        this.searchValue = e.trim();
                        this.suggestData = [];
                        this.responseData = [];
                        if (!(query.length >= 3)) return [3 /*break*/, 4];
                        if (!this.apiUrl) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, this.getData(this.apiUrl, query)];
                    case 1:
                        _a = _b.responseData = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this.responseData = this.tagsData;
                        _c.label = 3;
                    case 3:
                        _a;
                        if (this.responseData) {
                            this.responseData = this.apiUrl ? this.responseData[this.dataKey]
                                : this.filterTagsData(query);
                            this.suggestData = this.responseData;
                            this.suggestData = dxp.util.removeDuplicates(this.suggestData);
                            if (this.groupByField) {
                                // to group the data by groupByField
                                this.groupDataByField();
                            }
                            else {
                                this.groupSearchSuggestData();
                            }
                        }
                        this.responseData && this.responseData.length > 0
                            ? this.showSearchBoxList = true
                            : this.showSearchBoxList = false;
                        return [3 /*break*/, 5];
                    case 4:
                        this.showSearchBoxList = false;
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** method to check the suggester data */
    class_1.prototype.isSuggestData = function () {
        var isData = false;
        for (var _i = 0, _a = Object.keys(this.suggestData); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.suggestData[key].length) {
                isData = true;
            }
        }
        return isData;
    };
    /** Handle on backspace key */
    class_1.prototype.OnBackspaceKey = function (target, searchBox, tags) {
        if (searchBox && this.tagsArray.length && (target.selectionStart === 0)) {
            this.tagsTempArray = this.tagsArray.pop();
            this.tagItemsChanged.emit({ 'tagItems': this.tagsArray });
            dxp.log.debug(this.element.tagName, 'handleKeyUp()', LOG_EMIT, this.tagsArray);
        }
        else if (tags) {
            var id = target.id;
            this.clearItem(id);
        }
    };
    /** Handle on delete key */
    class_1.prototype.onDeleteKey = function (target, tags) {
        if (tags) {
            var id = target.id;
            this.clearItem(id);
        }
    };
    /** Handle on down arrow key */
    class_1.prototype.onDownArrowKey = function (e, searchBox, nextSibling, parentLi, nextEl) {
        e.preventDefault();
        if (searchBox) {
            var nextLi = nextSibling.querySelector('li');
            if (nextLi) {
                this.focusElement(nextLi);
            }
        }
        else if (parentLi) {
            if (nextEl && !searchBox) {
                this.focusElement(nextEl);
            }
            else if (nextSibling && !nextEl && !searchBox) {
                var nextLi = nextSibling.querySelector('li');
                if (nextLi) {
                    this.focusElement(nextLi);
                }
            }
        }
    };
    /** Handle on enter and space key */
    class_1.prototype.OnEnterAndSpaceKey = function (target, parentLi) {
        if (parentLi) {
            /**
             * HTMLInputElement : To make the element as HTMLInputElement and  provides special properties
             * and methods for manipulating the layout and presentation of input elements
             */
            {
                target.click();
            }
        }
    };
    /** Handle on left arrow key */
    class_1.prototype.onLeftArrowKey = function (target, searchBox, tags, prevEl) {
        if (searchBox && (target.selectionStart === 0)) {
            if (prevEl && prevEl.nodeName === 'SPAN') {
                this.showSearchBoxList = false;
                this.focusElement(prevEl);
            }
        }
        else if (tags) {
            if (prevEl && prevEl.nodeName === 'SPAN') {
                this.focusElement(prevEl);
            }
        }
    };
    /** on suggestion item selection emit event */
    class_1.prototype.onListItemSelection = function (item) {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        var inputElement = this.getInputElement();
        inputElement.value = '';
        this.showSearchBoxList = false;
        this.tagsArray = __spreadArrays(this.tagsArray, [
            item
        ]);
        this.tagItemsChanged.emit({ 'tagItems': this.tagsArray });
        dxp.log.debug(this.element.tagName, 'onListItemSelection()', LOG_EMIT, this.tagsArray);
    };
    /** Handle on right arrow key */
    class_1.prototype.onRightArrowKey = function (tags, nextEl) {
        if (tags) {
            if (nextEl && nextEl.nodeName === 'SPAN') {
                this.focusElement(nextEl);
            }
            else if (nextEl && nextEl.nodeName === 'INPUT') {
                this.focusElement(nextEl);
            }
        }
    };
    /** handler method for input change */
    class_1.prototype.onTextInput = function (event) {
        var _this = this;
        event.target.style.minWidth = ((event.target.value.length + 1) * 7) + "px";
        this.handleChange(event.target.value)
            .then(function () { return dxp.log.info(_this.element.tagName, 'onTextInput()', "in handleChange"); })
            .catch(function (err) { return dxp.log.error(_this.element.tagName, 'onTextInput()', "in handleChange :" + err); });
    };
    /** Handle on up arrow key */
    class_1.prototype.onUpArrowKey = function (e, prevSibling, parentLi, prevEl) {
        e.preventDefault();
        if (parentLi && prevEl && prevEl.nodeName !== 'SPAN') {
            this.focusElement(prevEl);
        }
        else if (prevSibling && parentLi && prevEl.nodeName === 'SPAN') {
            var li = prevSibling.querySelectorAll('li');
            this.focusElement(li[li.length - 1]);
        }
    };
    /** Render suggestion data */
    class_1.prototype.renderSuggestionData = function (key) {
        var _this = this;
        return (h("div", null, this.suggestData[key].length ? h("span", { class: "title-font list-element " + LIST_CLASS }, key) : undefined, this.suggestData[key].map(function (data) {
            return (h("li", { tabindex: "0", class: "list-element " + LIST_CLASS, "aria-label": dxp.i18n.t('TagInput:selectedItem', { item: data[_this.keysArray[0]] }), onClick: function () { return _this.selectSuggestion(data); } }, h("span", null, data[_this.keysArray[0]]), _this.keysArray[1] && h("span", { class: "subtitle" }, data[_this.keysArray[1]])));
        })));
    };
    /** on li selection populate on searchbox */
    class_1.prototype.selectSuggestion = function (item) {
        this.onListItemSelection(item);
        this.focusInput();
    };
    /** Render the tag-input */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-tag-input render() : " + "DEVELOPMENT");
        if ((!this.apiUrl && !this.tagsData) || !this.keysToDisplay || !this.dataKey) {
            dxp.log.debug(this.element.tagName, 'render()', "component not rendered : check mandatory fields");
            return;
        }
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-tag-input.min.css" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-input.min.css" })]
        ];
        var showContainer = ((this.suggestData.length || this.isSuggestData()) && this.showSearchBoxList && this.searchValue.length >= 3);
        return (h("div", { class: this.base.componentClass() + " search-container ", dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "tag-div", onClick: function () { return _this.focusInput(); } }, this.tagsArray.map(function (item) { return h("span", { class: "tags", tabindex: "0", id: item.id }, item[_this.keysArray[0]], " ", h("a", { class: "dxp-icon dxp-icon-small dxp-icon-close icon-close", title: dxp.i18n.t('TagInput:closeText'), "aria-label": dxp.i18n.t('TagInput:close'), onClick: function () { return _this.clearItem(item.id); } })); }), h("input", { type: "text", "aria-haspopup": "listbox", name: "searchbox", "aria-label": this.placeholder, id: "tagInput", class: 'dxp-form-control searchbox ', placeholder: !this.tagsArray.length && this.placeholder, onInput: function (event) { _this.onTextInput(event); } })), h("div", { class: "dxp-list-container " + (showContainer ? 'dxp-block' : '') }, h("ul", { class: "dxp-dropdown-list", id: "transactioncurrency", "aria-label": dxp.i18n.t('TagInput:listText') }, this.groupByField ?
            Object.keys(this.suggestData).map(function (key) {
                return _this.renderSuggestionData(key);
            })
            :
                h("div", null, this.suggestData.map(function (data) {
                    return (h("li", { tabindex: "0", class: "list-element " + LIST_CLASS, "aria-label": dxp.i18n.t('TagInput:selectedItem', { item: data[_this.keysArray[0]] }), onClick: function () { return _this.selectSuggestion(data); } }, h("span", { class: "title-font" }, data[_this.keysArray[0]]), _this.keysArray[1] && h("span", { class: "subtitle" }, data[_this.keysArray[1]])));
                }))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-tag-input{position:relative}div.dxp.dxp-tag-input input.searchbox{padding:0;height:auto;width:auto;display:inline-block;border:none}div.dxp.dxp-tag-input input.searchbox:focus{-webkit-box-shadow:none;box-shadow:none}div.dxp.dxp-tag-input .tag-div{min-height:40px;max-height:68px;border-radius:4px;padding:7px 10px;overflow-y:auto;overflow-x:hidden}div.dxp.dxp-tag-input .tag-div .tag-block{display:inline-block}div.dxp.dxp-tag-input .tags{padding:3px 30px 3px 11px;border-radius:19.5px;position:relative;display:inline-block;margin-right:5px}div.dxp.dxp-tag-input .tags .icon-close{position:absolute;top:7px;right:5px;cursor:pointer}div.dxp.dxp-tag-input .dxp-list-container{border-radius:5px;border:none;margin:auto;top:42px;left:0;right:0}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list{margin:0;padding:8px 0 20px 0}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list .dxp-dropdown-list-item span{display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list div>span:first-of-type{padding-left:17px;cursor:default}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list li{height:auto;line-height:normal;padding:4.5px 34px 7.5px 19px;margin-top:6px}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list li:after{border-top:none;border-bottom:none}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list .group-title{padding-left:17px;cursor:default}div.dxp.dxp-tag-input[dir=rtl] .dxp-list-container .dxp-dropdown-list li{padding:4px 19px 5px 34px}div.dxp.dxp-tag-input[dir=rtl] .dxp-list-container .dxp-dropdown-list div>span:first-of-type{padding-left:0;padding-right:17px;cursor:default}div.dxp.dxp-tag-input[dir=rtl] .tags{padding:3px 11px 3px 30px}div.dxp.dxp-tag-input[dir=rtl] .tags .icon-close{right:auto;left:5px}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { TagInput as dxp_tag_input };
