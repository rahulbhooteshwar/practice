'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const FlexLayout = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** Nested layout items */
        this.layoutItems = [];
        /** this object is used to re-render the dom as we dont have any state to force re render */
        this.reRender = {};
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.layoutItems = Array.from(this.getLayoutItems());
    }
    /** listner for window resize/orientation change */
    windowResize() {
        this.reRender = Object.assign({}, this.reRender);
    }
    /** actions to be performed after render method is called */
    componentDidRender() {
        core$1.dxp.log.debug(this.element.tagName, 'componentDidRender()', `dxp-Flex-layout`);
        this.element.classList.add('hydrated');
    }
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /**
     * Function to return column class based on provided column width
     */
    getColumnClass(item) {
        let columnClass = 'dxp-col-12';
        if (item['columnWidthSm']) {
            columnClass += ` dxp-col-sm-${item['columnWidthSm']}`;
        }
        if (item['columnWidthMd']) {
            columnClass += ` dxp-col-md-${item['columnWidthMd']}`;
        }
        if (item['columnWidthLg']) {
            columnClass += ` dxp-col-lg-${item['columnWidthLg']}`;
        }
        if (item['columnWidthXl']) {
            columnClass += ` dxp-col-xl-${item['columnWidthXl']}`;
        }
        return columnClass;
    }
    /** get array of rendered child tab elements */
    getLayoutItems() {
        // search for slotted items (childNodes)
        return this.getArrayFromNodeList(this.element.childNodes).filter(child => {
            return child['tagName'] && child['tagName'].toLowerCase() === 'dxp-flex-layout-item';
        });
    }
    /** apply column reverse as per condition */
    isColumnReverseApplicable() {
        const deviceWidthType = this.base.getDeviceWidthType();
        return (deviceWidthType === 'sm' || deviceWidthType === 'md') && this.columnReverse;
    }
    /** Render the layout */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-flex-layout render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })]
        ];
        return (core$1.h("div", { class: `${this.base.componentClass()}`, "data-theme": this.theme }, styles, core$1.h("div", { style: { border: this.borderStyle }, class: `dxp-row ${this.isColumnReverseApplicable() ? 'dxp-flex-column-reverse' : ''}` }, this.layoutItems.map((item, index) => core$1.h("div", { style: { border: item['borderStyle'] }, class: `${this.getColumnClass(item)}` }, core$1.h("slot", { name: `column-${index + 1}` }))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-flex-layout .dxp-row,div.dxp.dxp-flex-layout [class*=dxp-col-]{margin:0;padding:0}\@media screen and (max-width:992px){div.dxp.dxp-flex-layout .layout-flex-column-reverse{-ms-flex-direction:column-reverse;flex-direction:column-reverse}}"; }
};

exports.dxp_flex_layout = FlexLayout;
