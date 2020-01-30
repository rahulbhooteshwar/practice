import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var Select = /** @class */ (function () {
    function Select(hostRef) {
        registerInstance(this, hostRef);
        /** default size for fixed height select */
        this.defaultSize = 10;
        /** display fix height select */
        this.fixHeight = false;
        /** use index as value */
        this.useIndexAsValue = false;
        this.optionSelected = createEvent(this, "optionSelected", 7);
    }
    /** actions to be performed prior to component loading */
    Select.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (this.dataList && typeof this.dataList === 'string') {
            this.dataList = JSON.parse(this.dataList);
        }
    };
    /** Listen onblur of select */
    Select.prototype.onBlurHandler = function (_event) {
        this.removeSize();
    };
    /** Listen keydown of select */
    Select.prototype.onKeyDownHandler = function (event) {
        // toggle dropdown on 'Enter' or 'Space'
        if (event.code === 'Enter' || event.code === 'Space') {
            if (!this.size) {
                this.setSize();
            }
            else {
                this.removeSize();
            }
        }
    };
    /** Listen mousedown of select */
    Select.prototype.onMouseDownHandler = function (_event) {
        this.setSize();
    };
    /**
     * click listener for routing events on anchor tag
     */
    Select.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Handler for on select event of dropdown */
    Select.prototype.onSelect = function (event) {
        this.removeSize();
        this.optionSelected.emit({ event: event });
    };
    /** remove size property of select */
    Select.prototype.removeSize = function () {
        this.size = 0;
    };
    /** set size property of select */
    Select.prototype.setSize = function () {
        this.size = this.fixHeight;
    };
    /** Render the select */
    Select.prototype.render = function () {
        var _this = this;
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("select", { class: "sc-dxp-select " + this.selector + " " + (this.size ? 'fix-height' : ''), size: this.size ? this.defaultSize : 0, "aria-label": "please press spacebar or enter to toggle list", onBlur: function (e) { return _this.onBlurHandler(e); }, onChange: function (e) { return _this.onSelect(e); } }, this.dataList &&
            this.dataList.map(function (value, index) { return (h("option", { value: _this.useIndexAsValue ? index : value, selected: _this.selectedValue && (_this.useIndexAsValue && _this.selectedValue === index || _this.selectedValue === value), "data-index": index, "data-value": value }, value ? value : '')); }))));
    };
    Object.defineProperty(Select.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select, "style", {
        get: function () { return "div.dxp.dxp-select select{border-radius:0;outline:0;height:26px;background-position:calc(100% - 10px) calc(1em + 2px),calc(100% - 5px) calc(1em + 2px);background-position-y:center;padding:0 5px;font-size:1rem;font-weight:500}div.dxp.dxp-select select:focus{border:1px solid;border-radius:0}div.dxp.dxp-select select.fix-height{height:auto;background-image:none;border:.5px solid;border-radius:0;outline:0}div.dxp.dxp-select[dir=rtl] select:focus{padding-right:9px}div.dxp.dxp-select[dir=rtl] select.month-list-select{background-position:calc(100% - 100px) calc(1em + -4px),calc(100% - 95px) calc(1em + -4px)}div.dxp.dxp-select[dir=rtl] select.year-list-select{background-position:calc(100% - 60px) calc(1em + -4px),calc(100% - 55px) calc(1em + -4px)}"; },
        enumerable: true,
        configurable: true
    });
    return Select;
}());
export { Select as dxp_select };
