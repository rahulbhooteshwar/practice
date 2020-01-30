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
import { r as registerInstance, d as dxp, h, g as getElement, H as Host } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var CONTENT_ITEM = 'dxp-content-item';
var TEXT_LEFT = 'dxp-text-left';
var TEXT_RIGHT = 'dxp-text-right';
var ContentItemGrid = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** variable to hold all content item objects */
        this.contentItemsData = [];
        /** class to be applied for header alignment */
        this.headerAlignment = 'center';
        /** boolean to hide pagination when only single page is present in pagination */
        this.hidePaginationWhenSingle = true;
        /** number of content items visible in one page of pagination */
        this.itemsPerPage = 6;
        /** align pagination */
        this.paginationAlignment = 'center';
    }
    /** Watcher that looks for contentData object to be assigned/changed externally */
    class_1.prototype.contentDataChangeHandler = function () {
        this.contentItemsData = this.contentData;
        this.resetContentItemGrid();
    };
    /** Listener that looks for cta object to be assigned/changed externally */
    class_1.prototype.ctaChangeHandler = function () {
        if (this.cta) {
            this.base.createNestedMarkup(this.ctaContainer, 'dxp-cta-list', this.cta);
        }
    };
    /** method for jumping to next page */
    class_1.prototype.nextpage = function (event) {
        this.setIndexToSliceArray(event.detail.firstUnitIndex, event.detail.lastUnitIndex);
        while (this.contentItemsContainer.hasChildNodes()) {
            this.contentItemsContainer.removeChild(this.contentItemsContainer.firstChild);
        }
        this.setContentItemGrid();
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, itemContentType;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        if (!this.apiEndpoint) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, dxp.api(this.apiEndpoint)];
                    case 1:
                        _a.contentData = _b.sent();
                        _b.label = 2;
                    case 2:
                        itemContentType = [];
                        this.contentItems = this.element.querySelectorAll(CONTENT_ITEM);
                        Array.from(this.contentItems).forEach(function (node) {
                            var contentTypeValue = _this.base.returnBooleanValue(node.getAttribute('content-type') === 'content-logo');
                            itemContentType.push(contentTypeValue);
                        });
                        if (!itemContentType.includes(false)) {
                            this.isLogos = true;
                            this.gridCols = "dxp-col-6 " + this.gridCols;
                        }
                        this.colDistribution(this.column);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        this.base.createNestedMarkup(this.contentItemsContainer, CONTENT_ITEM, this.contentData);
        this.ctaChangeHandler();
        if (this.contentItems.length === 0) {
            this.contentItems = this.base.shadowRootQuerySelector(this.element, CONTENT_ITEM, true);
        }
        this.contentItemsData = Array.from(this.contentItems);
        this.resetContentItemGrid();
    };
    /**
     * Append nested markup for child elements
     * @param nestedTarget Target container where nested elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    class_1.prototype.appendNestedMarkup = function (nestedTarget, nestedSelector, data) {
        var _this = this;
        var fragment = document.createDocumentFragment();
        var appendNestedElements = [];
        if (data && nestedSelector && nestedTarget) {
            data.forEach(function (item) {
                var ref = document.createElement(nestedSelector);
                // if keys of object is in kebabcase then it should be converted into camelcase
                var formattedItem = _this.base.formatDataObjectKeys(item);
                Object.assign(ref, formattedItem);
                fragment.appendChild(ref);
                appendNestedElements.push(ref);
            });
            nestedTarget.appendChild(fragment);
        }
        return appendNestedElements;
    };
    /** Generate class for desktop, tablet and mobile to show max no of column */
    class_1.prototype.colDistribution = function (column) {
        var lg = column !== 5 ? "dxp-col-lg-" + 12 / column : 'col-lg-1-5';
        var md = "dxp-col-md-" + 12 / (column > 1 ? 2 : column);
        this.gridCols = lg + " " + md;
    };
    /** reset the content item grid to first page */
    class_1.prototype.resetContentItemGrid = function () {
        this.contentItemStartIndex = 0;
        this.contentItemEndIndex = this.enablePagination ? this.itemsPerPage : this.contentItems.length;
        while (this.contentItemsContainer.hasChildNodes()) {
            this.contentItemsContainer.removeChild(this.contentItemsContainer.firstChild);
        }
        this.setContentItemGrid();
    };
    /** set the content item grid based on page change */
    class_1.prototype.setContentItemGrid = function () {
        var _this = this;
        this.visibleContentItems = this.contentItemsData.slice(this.contentItemStartIndex, this.contentItemEndIndex);
        this.visibleContentItems.forEach(function (node, index) {
            var elem = document.createElement('div');
            elem.className = "sc-dxp-content-item-grid " + (index === 0 ? _this.highlightFirstContentItem ? 'dxp-col-lg-12 dxp-col-md-12' : _this.gridCols : _this.gridCols);
            if (index === 0 && _this.highlightFirstContentItem) {
                node.setAttribute('orientation', 'horizontal');
            }
            if (node.nodeName) {
                elem.appendChild(node);
            }
            else {
                _this.appendNestedMarkup(elem, CONTENT_ITEM, [node]);
            }
            _this.contentItemsContainer.appendChild(elem);
        });
    };
    /** Method to index get sliced array from contentItems */
    class_1.prototype.setIndexToSliceArray = function (firstUnitIndex, lastUnitIndex) {
        this.contentItemStartIndex = firstUnitIndex;
        this.contentItemEndIndex = lastUnitIndex;
    };
    /** actions to be performed after render method is called */
    class_1.prototype.hostData = function () {
        dxp.log.debug(this.element.tagName, 'hostData()', "dxp-content-item-grid -hostData");
        return {
            'class': 'hydrated'
        };
    };
    /** Render the content-item-grid */
    class_1.prototype.__stencil_render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-content-item-grid.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass() + " sc-dxp-content-item-grid", dir: this.dir, "data-theme": this.theme }, styles, this.gridEyebrowText && h("p", { class: "dxp-title-eyebrow sc-dxp-content-item-grid\n         " + (this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'), innerHTML: this.gridEyebrowText }), this.gridTitle && h("h3", { class: this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center' }, h("a", { href: this.gridTitleUrl, target: this.titleTarget ? '_blank' : '_self', innerHTML: this.gridTitle })), this.gridDescription && h("p", { class: "description " + (this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'), innerHTML: this.gridDescription }), h("div", { class: "dxp-row sc-dxp-content-item-grid", ref: function (el) { return _this.contentItemsContainer = el; } }, h("slot", null)), this.enablePagination && h("dxp-pagination", { "units-per-page": this.itemsPerPage, "total-units": this.contentItemsData.length, "hide-when-single-page": this.hidePaginationWhenSingle, position: this.paginationAlignment, "display-text": this.paginationDisplayText, "first-button-label": this.firstButtonLabel, "last-button-label": this.lastButtonLabel, "previous-button-label": this.previousButtonLabel, "next-button-label": this.nextButtonLabel, "of-text": this.ofText, "page-text": this.pageText, "and-text": this.andText, "validation-message": this.paginationValidationMessage, "input-accessibility-text": this.pageInputAccessibilityText }), h("div", { class: "cta-block", ref: function (el) { return _this.ctaContainer = el; } }, h("slot", { name: "cta-list" }))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "contentData": ["contentDataChangeHandler"],
                "cta": ["ctaChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    class_1.prototype.render = function () { return h(Host, this.hostData(), this.__stencil_render()); };
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-content-item-grid .dxp-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-content-item-grid .dxp-row:after{content:\"\";display:block;clear:both}div.dxp.dxp-content-item-grid .dxp-title-eyebrow{padding-bottom:6px}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid .dxp-title-eyebrow{padding-bottom:11px}}div.dxp.dxp-content-item-grid h3{text-align:center}div.dxp.dxp-content-item-grid p{padding-bottom:2.4rem;text-align:center;margin-bottom:0}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid p:first-of-type{font-size:.75rem}}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid p{padding-bottom:1.4rem}}div.dxp.dxp-content-item-grid .dxp-text-left{margin-left:0}div.dxp.dxp-content-item-grid .dxp-text-right{margin-right:1rem}div.dxp.dxp-content-item-grid .dxp-row .dxp-col-12,div.dxp.dxp-content-item-grid .dxp-row .sc-dxp-content-item-grid{margin-bottom:3rem}\@media (min-width:992px){div.dxp.dxp-content-item-grid .col-lg-1-5{width:20%}}\@media only screen and (max-width:767px){div.dxp.dxp-content-item-grid .dxp-row{margin-left:0;margin-right:0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { ContentItemGrid as dxp_content_item_grid };
