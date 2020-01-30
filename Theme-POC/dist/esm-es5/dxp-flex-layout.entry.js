import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var FlexLayout = /** @class */ (function () {
    function FlexLayout(hostRef) {
        registerInstance(this, hostRef);
        /** Nested layout items */
        this.layoutItems = [];
        /** this object is used to re-render the dom as we dont have any state to force re render */
        this.reRender = {};
    }
    /** actions to be performed prior to component loading */
    FlexLayout.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed after component loading */
    FlexLayout.prototype.componentDidLoad = function () {
        this.layoutItems = Array.from(this.getLayoutItems());
    };
    /** listner for window resize/orientation change */
    FlexLayout.prototype.windowResize = function () {
        this.reRender = Object.assign({}, this.reRender);
    };
    /** actions to be performed after render method is called */
    FlexLayout.prototype.componentDidRender = function () {
        dxp.log.debug(this.element.tagName, 'componentDidRender()', "dxp-Flex-layout");
        this.element.classList.add('hydrated');
    };
    /** convert nodelist to array */
    FlexLayout.prototype.getArrayFromNodeList = function (nodeList) {
        return [].slice.call(nodeList);
    };
    /**
     * Function to return column class based on provided column width
     */
    FlexLayout.prototype.getColumnClass = function (item) {
        var columnClass = 'dxp-col-12';
        if (item['columnWidthSm']) {
            columnClass += " dxp-col-sm-" + item['columnWidthSm'];
        }
        if (item['columnWidthMd']) {
            columnClass += " dxp-col-md-" + item['columnWidthMd'];
        }
        if (item['columnWidthLg']) {
            columnClass += " dxp-col-lg-" + item['columnWidthLg'];
        }
        if (item['columnWidthXl']) {
            columnClass += " dxp-col-xl-" + item['columnWidthXl'];
        }
        return columnClass;
    };
    /** get array of rendered child tab elements */
    FlexLayout.prototype.getLayoutItems = function () {
        // search for slotted items (childNodes)
        return this.getArrayFromNodeList(this.element.childNodes).filter(function (child) {
            return child['tagName'] && child['tagName'].toLowerCase() === 'dxp-flex-layout-item';
        });
    };
    /** apply column reverse as per condition */
    FlexLayout.prototype.isColumnReverseApplicable = function () {
        var deviceWidthType = this.base.getDeviceWidthType();
        return (deviceWidthType === 'sm' || deviceWidthType === 'md') && this.columnReverse;
    };
    /** Render the layout */
    FlexLayout.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-flex-layout render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })]
        ];
        return (h("div", { class: "" + this.base.componentClass(), "data-theme": this.theme }, styles, h("div", { style: { border: this.borderStyle }, class: "dxp-row " + (this.isColumnReverseApplicable() ? 'dxp-flex-column-reverse' : '') }, this.layoutItems.map(function (item, index) { return h("div", { style: { border: item['borderStyle'] }, class: "" + _this.getColumnClass(item) }, h("slot", { name: "column-" + (index + 1) })); }))));
    };
    Object.defineProperty(FlexLayout.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexLayout, "style", {
        get: function () { return "div.dxp.dxp-flex-layout .dxp-row,div.dxp.dxp-flex-layout [class*=dxp-col-]{margin:0;padding:0}\@media screen and (max-width:992px){div.dxp.dxp-flex-layout .layout-flex-column-reverse{-ms-flex-direction:column-reverse;flex-direction:column-reverse}}"; },
        enumerable: true,
        configurable: true
    });
    return FlexLayout;
}());
export { FlexLayout as dxp_flex_layout };
