import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var LayoutItem = /** @class */ (function () {
    function LayoutItem(hostRef) {
        registerInstance(this, hostRef);
        /** this object is used to re-render the dom as we dont have any state to force re render */
        this.reRender = {};
    }
    /** actions to be performed prior to component loading */
    LayoutItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** listner for window resize/orientation change */
    LayoutItem.prototype.windowResize = function () {
        this.reRender = Object.assign({}, this.reRender);
    };
    /** actions to be performed after render method is called */
    LayoutItem.prototype.componentDidRender = function () {
        dxp.log.debug(this.element.tagName, 'componentDidRender()', "dxp-Flex layout-item");
        this.element.classList.add('hydrated');
    };
    /** calculate padding style */
    LayoutItem.prototype.setColumnStyles = function () {
        var deviceWidthType = this.base.getDeviceWidthType();
        var style = {};
        // add background property to flex-layout items
        style['background-image'] = "url(" + this.bgImage + ")";
        style['background-size'] = 'cover';
        style['background-repeat'] = 'no-repeat';
        style['background-position'] = 'center center';
        switch (deviceWidthType) {
            case 'sm':
                style['padding'] = this.paddingStyleSm || '0px';
                break;
            case 'md':
                style['padding'] = this.paddingStyleMd || this.paddingStyleSm || '0px';
                break;
            case 'lg':
                style['padding'] = this.paddingStyleLg || this.paddingStyleMd || this.paddingStyleSm || '0px';
                break;
            case 'xl':
                style['padding'] = this.paddingStyleXl || this.paddingStyleLg || this.paddingStyleMd || this.paddingStyleSm || '0px';
                break;
            default:
                style['padding'] = this.paddingStyleSm || '0px';
        }
        return style;
    };
    /** Render the layout */
    LayoutItem.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-flex-layout-item render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })]
        ];
        return (h("div", { class: this.base.componentClass() + " ", "data-theme": this.theme, style: Object.assign({}, this.setColumnStyles()) }, styles, h("slot", null)));
    };
    Object.defineProperty(LayoutItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutItem, "style", {
        get: function () { return "div.dxp.dxp-flex-layout-item{min-height:50px;height:100%}"; },
        enumerable: true,
        configurable: true
    });
    return LayoutItem;
}());
export { LayoutItem as dxp_flex_layout_item };
