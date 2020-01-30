'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const Select = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** default size for fixed height select */
        this.defaultSize = 10;
        /** display fix height select */
        this.fixHeight = false;
        /** use index as value */
        this.useIndexAsValue = false;
        this.optionSelected = core$1.createEvent(this, "optionSelected", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (this.dataList && typeof this.dataList === 'string') {
            this.dataList = JSON.parse(this.dataList);
        }
    }
    /** Listen onblur of select */
    onBlurHandler(_event) {
        this.removeSize();
    }
    /** Listen keydown of select */
    onKeyDownHandler(event) {
        // toggle dropdown on 'Enter' or 'Space'
        if (event.code === 'Enter' || event.code === 'Space') {
            if (!this.size) {
                this.setSize();
            }
            else {
                this.removeSize();
            }
        }
    }
    /** Listen mousedown of select */
    onMouseDownHandler(_event) {
        this.setSize();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Handler for on select event of dropdown */
    onSelect(event) {
        this.removeSize();
        this.optionSelected.emit({ event });
    }
    /** remove size property of select */
    removeSize() {
        this.size = 0;
    }
    /** set size property of select */
    setSize() {
        this.size = this.fixHeight;
    }
    /** Render the select */
    render() {
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("select", { class: `sc-dxp-select ${this.selector} ${this.size ? 'fix-height' : ''}`, size: this.size ? this.defaultSize : 0, "aria-label": "please press spacebar or enter to toggle list", onBlur: e => this.onBlurHandler(e), onChange: e => this.onSelect(e) }, this.dataList &&
            this.dataList.map((value, index) => (core$1.h("option", { value: this.useIndexAsValue ? index : value, selected: this.selectedValue && (this.useIndexAsValue && this.selectedValue === index || this.selectedValue === value), "data-index": index, "data-value": value }, value ? value : ''))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-select select{border-radius:0;outline:0;height:26px;background-position:calc(100% - 10px) calc(1em + 2px),calc(100% - 5px) calc(1em + 2px);background-position-y:center;padding:0 5px;font-size:1rem;font-weight:500}div.dxp.dxp-select select:focus{border:1px solid;border-radius:0}div.dxp.dxp-select select.fix-height{height:auto;background-image:none;border:.5px solid;border-radius:0;outline:0}div.dxp.dxp-select[dir=rtl] select:focus{padding-right:9px}div.dxp.dxp-select[dir=rtl] select.month-list-select{background-position:calc(100% - 100px) calc(1em + -4px),calc(100% - 95px) calc(1em + -4px)}div.dxp.dxp-select[dir=rtl] select.year-list-select{background-position:calc(100% - 60px) calc(1em + -4px),calc(100% - 55px) calc(1em + -4px)}"; }
};

exports.dxp_select = Select;
