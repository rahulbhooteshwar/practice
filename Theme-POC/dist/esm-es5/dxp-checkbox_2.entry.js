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
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-a7566445.js';
var Checkbox = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** set alignment */
        this.alignment = 'horizontal';
        /** validation message */
        this.validationMessage = 'Please select required fields';
        this.checkboxData = createEvent(this, "checkboxData", 7);
        this.validationEvent = createEvent(this, "validationEvent", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (!this.checkboxId) {
            var randomNumber = Math.floor(Math.random() * 100);
            this.checkboxId = "'dxp-checkbox-'" + randomNumber; // generating unique checkbox id
        }
    };
    /** lifecycle hook */
    class_1.prototype.componentDidLoad = function () {
        var rteText = this.required ? "<span class=\"dxp-required\">* </span><b>" + this.name + "</b>" : "" + this.name;
        this.element.querySelector('label') ? this.element.querySelector('label').innerHTML = rteText : this.element.querySelector('label').innerHTML = rteText;
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Emit the checkbox value on selection the checkbox */
    class_1.prototype.emitData = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, parent, p, txtNode, errorMessage;
            return __generator(this, function (_a) {
                obj = { 'name': target.name, 'value': target.value, 'isChecked': target.checked, 'id': this.checkboxId };
                this.checkboxData.emit(obj);
                dxp.log.info(this.element.tagName, 'emitData()', obj);
                // add or remove checkbox-error class if checkbox is required
                if (this.required) {
                    if (target.checked === false) {
                        parent = this.element.querySelector('.checkbox-item');
                        p = document.createElement('p');
                        p.className = 'dxp-error error-message sc-dxp-checkbox-group';
                        txtNode = document.createTextNode(this.validationMessage);
                        p.appendChild(txtNode);
                        parent.appendChild(p);
                        target.nextElementSibling.classList.add('checkbox-error');
                        this.isValid = false;
                    }
                    else {
                        target.nextElementSibling.classList.remove('checkbox-error');
                        this.isValid = true;
                        errorMessage = this.element.querySelector('.dxp-error');
                        if (errorMessage) {
                            errorMessage.remove();
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /** this reSet method is for the parent hosting element to reset the dxp-checkbox to unchecked status */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkboxElement.checked = false;
                return [2 /*return*/];
            });
        });
    };
    /** setChecked method is for other element to check or uncheck this dxp-checkbox */
    class_1.prototype.setChecked = function (isChecked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.checkboxElement.checked = isChecked;
                return [2 /*return*/];
            });
        });
    };
    /** Responsible for emitting an event to show error message appropriately (horizontal, vertical) */
    class_1.prototype.sendFlagToParent = function () {
        this.validationEvent.emit({ flag: this.isValid, message: this.validationMessage });
    };
    /** Render the checkbox */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-checkbox render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-checkbox.min.css" })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass() + " checkbox-item  " + this.alignment, "data-theme": this.theme }, styles, h("input", { ref: function (element) { return _this.checkboxElement = element; }, type: "checkbox", name: this.name, id: this.checkboxId, "aria-describedby": this.isValid ? 'error-message' : undefined, onChange: function (ev) { return _this.emitData(ev.target); }, class: "checkbox", value: this.value, checked: this.checked, disabled: this.disabled }), h("label", { htmlFor: this.checkboxId, class: this.disabled ? 'dxp-disabled' : '' }, this.required ? h("span", { class: "dxp-required" }, "* ") : '', this.name, "\u200E"), this.required ? this.alignment === 'horizontal' ? this.sendFlagToParent() :
            this.isValid ? h("p", { class: "dxp-error", id: "errMsg" }, this.validationMessage) : '' : undefined));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-checkbox{position:relative}div.dxp.dxp-checkbox.horizontal{display:inline-block;margin-right:.625rem}div.dxp.dxp-checkbox .checkbox-txt{margin-bottom:1.25rem}div.dxp.dxp-checkbox.vertical .select-all+label{left:1.625rem}div.dxp.dxp-checkbox.vertical input[type=checkbox]+label .dxp-required{display:inline-block}div.dxp.dxp-checkbox.vertical .dxp-error{padding-left:2.5rem}div.dxp.dxp-checkbox input[type=checkbox]{opacity:0;position:absolute;top:.375rem}div.dxp.dxp-checkbox input[type=checkbox]+label{padding-left:1.5rem;position:relative}div.dxp.dxp-checkbox input[type=checkbox]+label:before{content:\"\";display:inline-block;width:1rem;height:1rem;top:.0625rem;position:absolute;left:0;cursor:pointer}div.dxp.dxp-checkbox[dir=rtl].horizontal,div.dxp.dxp-checkbox[dir=rtl].horizontal .checkbox-item{margin-right:0;margin-left:.625rem}div.dxp.dxp-checkbox[dir=rtl].vertical+label{left:inherit;right:1.625rem}div.dxp.dxp-checkbox[dir=rtl] input[type=checkbox]+label{padding-left:0;padding-right:1.5rem}div.dxp.dxp-checkbox[dir=rtl] input[type=checkbox]+label:before{left:inherit;right:0}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var FacetedFilterItem = /** @class */ (function () {
    function FacetedFilterItem(hostRef) {
        registerInstance(this, hostRef);
        /** checkbox to expand the filter item description */
        this.isSubCategory = false;
        /** checkbox to expand the filter item description */
        this.showExpanded = false;
    }
    /** actions to be performed prior to component loading */
    FacetedFilterItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Faceted-Filter-Item', messages);
    };
    /** actions to be performed after component loading */
    FacetedFilterItem.prototype.componentDidLoad = function () {
        var filterLabelArray = this.element.querySelectorAll('.filter-item');
        // For supporting RTE, this code will work fine for the normal text too
        this.element.querySelector('.item-title').innerHTML = this.itemTitle + "&lrm;";
        if (this.itemSubtitle) {
            this.element.querySelector('.item-subtitle').innerHTML = this.itemSubtitle + "&lrm;";
        }
        if (this.itemDescription) {
            this.element.querySelector('.item-description').innerHTML = this.itemDescription + "&lrm;";
        }
        var filterLabel = Array.prototype.slice.call(filterLabelArray);
        this.expandAndCollapse(this.element, filterLabel);
        if (this.showExpanded) {
            var expandItem = this.element.querySelector('.item-title');
            expandItem.click();
        }
    };
    /** expand and collapse */
    FacetedFilterItem.prototype.expandCollapse = function (e) {
        var keyCode = e.keyCode;
        var defaultPrevent = [32, 38, 40];
        var activeElement = e.target ? e.target.activeElement : e.target;
        if (defaultPrevent.indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if (keyCode === 9) {
            e.target.classList.remove('dxp-no-outline');
        }
        if ((keyCode === 13 || keyCode === 32) && activeElement.classList.contains('filter-label')) {
            this.toggleList(activeElement);
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    FacetedFilterItem.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Attaching click listener to the block for expanding and collapsing action */
    FacetedFilterItem.prototype.expandAndCollapse = function (element, filterLabel) {
        var _this = this;
        // toggle component script
        if (element) {
            filterLabel.forEach(function (ele) {
                ele.addEventListener('click', function (e) {
                    // toggle only for the elements which are in the title label
                    var targetElementsList = e.target.classList.contains('item-title') || e.target.classList.contains('item-subtitle')
                        || e.target.classList.contains('filter-label') || e.target.parentElement.classList.contains('item-title');
                    if (targetElementsList) {
                        _this.toggleList(e.target);
                    }
                }, true);
            });
        }
        else {
            return undefined;
        }
    };
    /** get parent element of any dom element */
    FacetedFilterItem.prototype.getParentOfClass = function (el, cls) {
        var parent = el.parentElement;
        if (parent) {
            while (parent && !parent.classList.contains(cls)) {
                parent = parent.parentElement;
            }
            return parent;
        }
        return false;
    };
    /** handle mouse enter */
    FacetedFilterItem.prototype.onmouseenter = function () {
        var labelEle = this.element.querySelectorAll('label')[0];
        labelEle.classList.add('filter-hover');
    };
    /** handle mouse leave */
    FacetedFilterItem.prototype.onmouseleave = function () {
        var labelEle = this.element.querySelectorAll('label')[0];
        labelEle.classList.remove('filter-hover');
    };
    /** toggle list */
    FacetedFilterItem.prototype.toggleList = function (target) {
        var parent = this.getParentOfClass(target, 'faceted-filter');
        var filterContent = parent.querySelector('.filter-content');
        var label = parent.querySelector('.filter-label');
        label.classList.toggle('active');
        label.classList.add('dxp-no-outline');
        if (filterContent.style.maxHeight) {
            filterContent.removeAttribute('style');
            filterContent.parentElement.classList.remove('filter-item-select');
            filterContent.classList.remove('filter-top');
            filterContent.classList.add('dxp-none');
            label.setAttribute('aria-pressed', 'false');
        }
        else {
            filterContent.parentElement.classList.add('filter-item-select');
            filterContent.classList.add('filter-top');
            filterContent.classList.remove('dxp-none');
            label.setAttribute('aria-pressed', 'true');
            filterContent.style.maxHeight = "" + filterContent.scrollHeight + filterContent.offsetHeight + "px";
        }
    };
    /** render dxp-faceted-filter item(s) */
    FacetedFilterItem.prototype.render = function () {
        dxp.log.debug("in dxp-faceted-filter-item render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("link", { rel: "stylesheet", href: "" }), this.theme && h("link", { rel: "stylesheet", href: "" }), h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12" }, h("div", { class: "faceted-filter" }, h("div", { class: "filter-item" }, h("label", { class: "filter-label no-outline " + (this.isSubCategory === true ? 'sub-category' : ''), role: "button", "aria-pressed": "false", tabindex: "0", onMouseEnter: this.onmouseenter.bind(this), onMouseLeave: this.onmouseleave.bind(this) }, h("span", { class: "item-title" }), this.itemSubtitle && h("span", { class: "item-subtitle" })), h("div", { class: "filter-content dxp-none" }, h("slot", { name: "top" }), this.itemDescription && h("p", { class: "item-description" }), h("slot", { name: "bottom" }), h("slot", null))))))));
    };
    Object.defineProperty(FacetedFilterItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FacetedFilterItem, "style", {
        get: function () { return "div.dxp.dxp-faceted-filter-item ol,div.dxp.dxp-faceted-filter-item ul{padding-left:.75rem}div.dxp.dxp-faceted-filter-item .filter-label,div.dxp.dxp-faceted-filter-item .filter-label .item-subtitle{display:block;cursor:pointer;position:relative;margin-bottom:0}div.dxp.dxp-faceted-filter-item .filter-label .item-subtitle{margin-top:.625rem;line-height:1.25rem;padding-right:1.25rem}div.dxp.dxp-faceted-filter-item .filter-label span{display:block;line-height:1.5rem;padding-right:1.25rem}div.dxp.dxp-faceted-filter-item .filter-label.active.filter-hover:before,div.dxp.dxp-faceted-filter-item .filter-label.active:before{-webkit-transform:rotate(90deg);transform:rotate(90deg);top:1.25rem;width:.09375rem}div.dxp.dxp-faceted-filter-item .filter-label.active.filter-hover:after,div.dxp.dxp-faceted-filter-item .filter-label.active:after{-webkit-transform:rotate(180deg);transform:rotate(180deg);top:1.84375rem;height:.09375rem}div.dxp.dxp-faceted-filter-item .filter-label:first-child{margin-top:0}div.dxp.dxp-faceted-filter-item .filter-label:after,div.dxp.dxp-faceted-filter-item .filter-label:before{content:\"\";position:absolute;-webkit-transition:-webkit-transform .25s ease-out;transition:-webkit-transform .25s ease-out;transition:transform .25s ease-out;transition:transform .25s ease-out,-webkit-transform .25s ease-out}div.dxp.dxp-faceted-filter-item .filter-label:before{top:1.5rem;right:1.9375rem;width:.125rem;height:1rem;margin-left:-.125rem}div.dxp.dxp-faceted-filter-item .filter-label:after{top:2.085rem;right:1.5rem;width:1rem;height:.09375rem;margin-top:-.125rem}div.dxp.dxp-faceted-filter-item .filter-bottom:after{top:2.085rem;right:1.5rem;width:1rem;height:.125rem;margin-top:-.125rem}div.dxp.dxp-faceted-filter-item .filter-bottom.active{border-bottom:none}div.dxp.dxp-faceted-filter-item .filter-content{max-height:0;overflow:hidden;-webkit-transition:max-height .2s ease-out;-o-transition:max-height .2s ease-out;transition:max-height .2s ease-out}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label{padding:2rem 0}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label:after{left:.375rem;right:auto}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label:before{left:.96875rem;right:auto}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label span{padding-left:2.5rem;padding-right:0}\@media (min-width:992px){div.dxp.dxp-faceted-filter-item .filter-label{padding:1rem 6.5rem 1rem 0}div.dxp.dxp-faceted-filter-item .filter-top{margin-top:.4375rem}div.dxp.dxp-faceted-filter-item .filter-item-select{margin-bottom:2.5rem}div.dxp.dxp-faceted-filter-item .filter-content p{padding:.5rem 1.85rem .5rem 0;margin-bottom:0}}\@media (max-width:575.9px){div.dxp.dxp-faceted-filter-item .filter-top{margin-top:1rem}div.dxp.dxp-faceted-filter-item .filter-label{padding:2rem 3.5rem 2rem 0;margin-bottom:0}div.dxp.dxp-faceted-filter-item .filter-label.active+div{padding-bottom:1rem}div.dxp.dxp-faceted-filter-item .filter-label:after{right:1.5rem}div.dxp.dxp-faceted-filter-item .filter-content{padding:0}}"; },
        enumerable: true,
        configurable: true
    });
    return FacetedFilterItem;
}());
export { Checkbox as dxp_checkbox, FacetedFilterItem as dxp_faceted_filter_item };
