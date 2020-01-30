import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const Line = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** String for className for the line */
        this.className = '';
        /** String set for border and background color */
        this.styleString = {
            'border-color': '',
            'background-color': ''
        };
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.className = this.getClassName(this.type);
        if (this.customClass) {
            this.className = `${this.customClass} ${this.className}`;
        }
        if (this.borderColor) {
            this.styleString['border-color'] = this.borderColor;
        }
        if (this.backgroundColor) {
            this.styleString['background-color'] = this.backgroundColor;
        }
        if (this.height || this.heightXl || this.heightMd || this.heightXl || this.heightSm) {
            this.getCalHeight();
            this.styleString['height'] = `${this.height}px`;
        }
        if (this.borderWidth) {
            this.styleString['border-width'] = `${this.borderWidth}px`;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** returnCalHeight */
    getCalHeight() {
        switch (this.base.getDeviceWidthType()) {
            case 'xl':
                this.height = this.heightXl || this.heightLg || this.heightMd || this.heightSm || this.height || 0;
                break;
            case 'lg':
                this.height = this.heightLg || this.heightMd || this.heightSm || this.height || 0;
                break;
            case 'md':
                this.height = this.heightMd || this.heightSm || this.height || 0;
                break;
            default:
                this.height = this.heightSm || this.height || 0;
        }
    }
    /** Method for getting class name based on type */
    getClassName(type) {
        const className = {
            'double': 'double',
            'box': 'box',
            'box-dash': 'box box-dash',
            'double-topdash': 'double double-topdash',
            'double-bottomdash': 'double double-bottomdash'
        };
        return className[type] || 'solid';
    }
    /** Render the line */
    render() {
        /* istanbul ignore next */
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-line render() : ${"DEVELOPMENT"}`);
        return (h("div", { class: this.base.componentClass() }, h("link", { rel: "stylesheet", href: `` }), h("hr", { style: this.styleString, class: this.className })));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-line hr{padding:0;clear:both;margin:0}div.dxp.dxp-line hr.solid{border:.1px solid;height:1px}div.dxp.dxp-line hr.double{border:none;background-color:transparent;border-top:1px solid;border-bottom:1px solid;height:4px}div.dxp.dxp-line hr.double-topdash{border-top:1px dashed;border-bottom:1px solid}div.dxp.dxp-line hr.double-bottomdash{border-top:1px solid;border-bottom:1px dashed}div.dxp.dxp-line hr.box{border:1px solid;background-color:transparent;height:10px}div.dxp.dxp-line hr.box-dash{border:1px dashed}"; }
};

export { Line as dxp_line };
