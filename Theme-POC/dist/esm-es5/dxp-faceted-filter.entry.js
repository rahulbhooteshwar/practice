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
import { m as messages } from './messages-a7566445.js';
var FACETED_FILTER_ITEM = 'dxp-faceted-filter-item';
var FACETED_FILTER_LABEL_CLASS = '.filter-label';
var FacetedFilter = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'FacetedFilter', messages);
                        _a = this;
                        if (!this.apiEndpoint) return [3 /*break*/, 2];
                        return [4 /*yield*/, dxp.api(this.apiEndpoint)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = this.filterJson;
                        _c.label = 3;
                    case 3:
                        _a.filterItemsJson = _b;
                        this.createFilterItemsObject();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    class_1.prototype.componentDidLoad = function () {
        if (this.heading) {
            this.base.shadowRootQuerySelector(this.element, '.dxp-text-eyebrow').innerHTML = this.heading + "&lrm;";
        }
        var shadowEle = this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, true)
            && this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, true).length;
        var childElement = shadowEle ?
            this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, true)
            :
                this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM, false);
        // to get the last child of faceted-filter and add class to it
        var lastChild = childElement[childElement.length - 1];
        this.base.shadowRootQuerySelector(lastChild, FACETED_FILTER_LABEL_CLASS).classList.add('filter-bottom');
        if (childElement && childElement.length > 0) {
            this.childElementCount = childElement.length;
        }
    };
    /** action to be perform on keyup event */
    class_1.prototype.expandCollapse = function (e) {
        var filterLabelArray = this.getElementsByClass(FACETED_FILTER_LABEL_CLASS);
        var filterLabel = Array.prototype.slice.call(filterLabelArray);
        var filterContent;
        var activeElement;
        var currentFilterLabel;
        var defaultPrevent = [32, 38, 40];
        var keyCode = e.keyCode;
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
            for (var i = 0; i < currentFilterLabel.length; i++) {
                currentFilterLabel[i].classList.add('active');
                filterContent[i].classList.remove('dxp-none');
                filterContent[i].style.maxHeight = "" + filterContent[i].scrollHeight + filterContent[i].offsetHeight + "px";
            }
        }
        if (activeElement.classList.contains('collapse-all') && (keyCode === 32 || keyCode === 13)) {
            for (var i = 0; i < filterLabel.length; i++) {
                filterLabel[i].classList.remove('active');
                if (filterContent[i]) {
                    filterContent[i].removeAttribute('style');
                    currentFilterLabel[i].classList.remove('active');
                    filterContent[i].classList.add('dxp-none');
                }
            }
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** action to be perform on keyup event */
    class_1.prototype.createCategoryMarkup = function (items, isSubCategory) {
        var _this = this;
        var filterMarkUp = '';
        Object.keys(items).forEach(function (filterItem) {
            if (filterItem === 'type') {
                _this.filterType = items[filterItem];
            }
            else {
                if (isSubCategory) {
                    filterMarkUp += _this.createNestedFilter(filterItem, items[filterItem], _this.filterType).outerHTML;
                }
                else {
                    if (_this.filterType === 'checkbox') {
                        filterMarkUp += _this.populateCheckboxFilter(items[filterItem]);
                    }
                    else if (_this.filterType === 'select') {
                        filterMarkUp += _this.populateSelectFilter(items[filterItem]).outerHTML;
                    }
                }
            }
        });
        return (filterMarkUp);
    };
    /** action to be perform on keyup event */
    class_1.prototype.createFilterItemsObject = function () {
        var _this = this;
        this.filterItems = [];
        var filterContent = '';
        this.filterItemsJson.map(function (item) {
            Object.keys(item).forEach(function (key) {
                filterContent = '';
                if (item.hasOwnProperty('type')) {
                    if (key !== 'type') {
                        filterContent = _this.createCategoryMarkup(item, false);
                    }
                }
                else {
                    filterContent = _this.createSubCategoryMarkup(item);
                }
                if (key !== 'type') {
                    var filterItem = {
                        title: key.toUpperCase(),
                        description: filterContent,
                        isSubCategory: 'false'
                    };
                    _this.filterItems.push(filterItem);
                }
            });
        });
    };
    /** action to be perform on keyup event */
    class_1.prototype.createNestedFilter = function (filterItem, filterContentArr, filterType) {
        var filterData;
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
    };
    /** action to be perform on keyup event */
    class_1.prototype.createSubCategoryMarkup = function (subCatItem) {
        var _this = this;
        var filterDom = '';
        Object.keys(subCatItem).forEach(function (item) {
            subCatItem[item].map(function (subItems) {
                filterDom += _this.createCategoryMarkup(subItems, true);
            });
        });
        return (filterDom);
    };
    /** private method checks for slot or items array and accordingly fetch the faceted-filter-item element by class name */
    class_1.prototype.getElementsByClass = function (cssClassName) {
        var _this = this;
        var elements = new Array();
        var slot = this.base.shadowRootQuerySelector(this.element, 'slot');
        if (slot) {
            slot.assignedNodes().filter(function (node) {
                if (node.nodeName !== '#text') {
                    var facetedFilterItemElm = node.QuerySelector(_this.element, cssClassName);
                    elements.push(facetedFilterItemElm);
                }
            });
        }
        else {
            var facetedFilterItems = this.base.shadowRootQuerySelector(this.element, FACETED_FILTER_ITEM);
            if (facetedFilterItems && facetedFilterItems.length > 0) {
                for (var _i = 0, facetedFilterItems_1 = facetedFilterItems; _i < facetedFilterItems_1.length; _i++) {
                    var item = facetedFilterItems_1[_i];
                    elements.push(item.QuerySelector(this.element, cssClassName));
                }
            }
        }
        return elements;
    };
    /** action to be perform on keyup event */
    class_1.prototype.populateCheckboxFilter = function (filterContentArr) {
        var filterValues = '';
        if (filterContentArr && filterContentArr.length > 0) {
            filterContentArr.map(function (filterVal) {
                var filterValue;
                filterValue = document.createElement('dxp-checkbox');
                filterValue.setAttribute('name', filterVal);
                filterValue.setAttribute('value', filterVal);
                filterValues += filterValue.outerHTML;
                filterValues += '<br>';
            });
        }
        return (filterValues);
    };
    /** action to be perform on keyup event */
    class_1.prototype.populateSelectFilter = function (filterContentArr) {
        var filterValue;
        filterValue = document.createElement('select');
        filterContentArr.map(function (filterVal) {
            var filterOpt = document.createElement('option');
            filterOpt.setAttribute('value', filterVal);
            var optText = document.createTextNode(filterVal);
            filterOpt.appendChild(optText);
            filterValue.appendChild(filterOpt);
        });
        return (filterValue);
    };
    /** Render the faceted-filter */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug("in dxp-faceted-filter render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-faceted-filter.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("div", { class: "dxp-faceted-filter-container" }, styles, h("div", { class: "toggle" }, h("div", { class: "dxp-row" }, this.isHeaderRequired &&
            h("div", { class: "dxp-col-12 dxp-faceted-filter-header" }, h("p", null, h("span", { class: "dxp-text-eyebrow dxp-col-sm-6 dxp-col-12 dxp-filter-align" }), h("a", { href: "javaScript:void(0)" }, h("span", { class: "dxp-col-sm-6 dxp-col-12 dxp-text-right text-margin filter-clear dxp-closewindow-align" }, this.closeWindow, h("span", { class: "dxp-icon dxp-icon-x-small dxp-icon-close dxp-close-text" })))))), this.filterItems ? this.filterItems.map(function (item) {
            return (h("dxp-faceted-filter-item", { "item-title": item.title, "item-subtitle": item.subtitle, "item-description": item.description, "show-expanded": item.showExpanded, "is-sub-category": item.isSubCategory }));
        }) :
            h("div", { ref: function (el) { return _this.filterItemContainer = el; } }, h("slot", null))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-faceted-filter .dxp-faceted-filter-item{display:block;width:100%}div.dxp.dxp-faceted-filter .dxp-faceted-filter-container{width:19%}div.dxp.dxp-faceted-filter .dxp-faceted-filter-header{position:relative;top:10px}div.dxp.dxp-faceted-filter .text-margin{margin-top:5px}div.dxp.dxp-faceted-filter .dxp-close-filter{padding-bottom:5px}div.dxp.dxp-faceted-filter .dxp-close-text{padding-left:10px}div.dxp.dxp-faceted-filter .dxp-filter-align{padding-left:0;font-size:1.05rem}div.dxp.dxp-faceted-filter .toggle .title-wrapper{padding-bottom:1.5rem;margin-bottom:2rem;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span{padding:0}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span:last-child{text-align:right}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span:only-child{text-align:left}div.dxp.dxp-faceted-filter .toggle .expand-all{cursor:pointer}div.dxp.dxp-faceted-filter .toggle .collapse-all{cursor:pointer;margin-left:.5625rem}div.dxp.dxp-faceted-filter .pipe-separator:after{content:\"|\";padding-left:.75rem}\@media (max-width:1024px){div.dxp.dxp-faceted-filter .dxp-faceted-filter-container{width:25%}}\@media (max-width:575px){div.dxp.dxp-faceted-filter .dxp-faceted-filter-container{width:100%}div.dxp.dxp-faceted-filter .dxp-filter-align{position:relative;top:22px}div.dxp.dxp-faceted-filter .dxp-closewindow-align{position:relative;bottom:15px}div.dxp.dxp-faceted-filter .toggle .title-wrapper{border:none;margin-bottom:1rem}div.dxp.dxp-faceted-filter .toggle .title-wrapper>span:first-child{padding-bottom:2rem}}div.dxp.dxp-faceted-filter[dir=rtl] .toggle .title-wrapper>span:last-child{text-align:left}div.dxp.dxp-faceted-filter[dir=rtl] .toggle .title-wrapper>span:only-child{text-align:right}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { FacetedFilter as dxp_faceted_filter };
