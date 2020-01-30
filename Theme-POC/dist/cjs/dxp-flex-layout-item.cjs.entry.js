'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const LayoutItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** this object is used to re-render the dom as we dont have any state to force re render */
        this.reRender = {};
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** listner for window resize/orientation change */
    windowResize() {
        this.reRender = Object.assign({}, this.reRender);
    }
    /** actions to be performed after render method is called */
    componentDidRender() {
        core$1.dxp.log.debug(this.element.tagName, 'componentDidRender()', `dxp-Flex layout-item`);
        this.element.classList.add('hydrated');
    }
    /** calculate padding style */
    setColumnStyles() {
        const deviceWidthType = this.base.getDeviceWidthType();
        const style = {};
        // add background property to flex-layout items
        style['background-image'] = `url(${this.bgImage})`;
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
    }
    /** Render the layout */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-flex-layout-item render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })]
        ];
        return (core$1.h("div", { class: `${this.base.componentClass()} `, "data-theme": this.theme, style: Object.assign({}, this.setColumnStyles()) }, styles, core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-flex-layout-item{min-height:50px;height:100%}"; }
};

exports.dxp_flex_layout_item = LayoutItem;
