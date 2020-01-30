import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const Progressspinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** styling for circle. added support for IE */
        this.circle = {
            'stroke-dasharray': '89,200',
            'stroke-dashoffset': '0',
            'stroke': '#d62d20',
            'animation': '',
            'stroke-linecap': 'round'
        };
        /** spinnerColor class */
        this.spinnerColor = 'ui-progress-spinner-color 6s ease-in-out infinite';
        /** spinnerDash class */
        this.spinnerDash = 'ui-progress-spinner-dash 1.5s ease-in-out infinite';
        /** local style string */
        this.styleString = {
            'animation-duration': ''
        };
        /** Prop for animationDuration */
        this.animationDuration = 1;
        /** Prop for fill */
        this.fill = 'none';
        /** Prop for fill radius */
        this.radius = 20;
        /** Prop for strokeWidth */
        this.strokeWidth = 2;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        if (this.radius < 15) {
            this.radius = 15;
        }
        if (this.radius > 20) {
            this.radius = 20;
        }
        if (this.strokeWidth < 1) {
            this.strokeWidth = 1;
        }
        if (this.strokeWidth > 5) {
            this.strokeWidth = 5;
        }
        if (!this.fill) {
            this.fill = 'none';
        }
        if (!this.animationDuration || this.animationDuration < 1) {
            this.animationDuration = 1;
        }
        this.styleString['animation-duration'] = `${this.animationDuration}s`;
        if (this.strokeColor) {
            this.circle.stroke = this.strokeColor;
            this.circle.animation = `${this.spinnerDash}`;
        }
        else {
            this.circle.animation = `${this.spinnerDash}, ${this.spinnerColor}`;
        }
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the progressspinner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-progressspinner render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, h("div", { class: "ui-progress-spinner" }, h("svg", { class: "ui-progress-spinner-svg", viewBox: "25 25 50 50", style: this.styleString }, h("circle", { style: this.circle, cx: "50", cy: "50", r: this.radius, fill: this.fill, "stroke-width": this.strokeWidth, "stroke-miterlimit": "10" })))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-progressspinner div.ui-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}div.dxp.dxp-progressspinner div.ui-progress-spinner:before{content:\"\";display:block;padding-top:100%}div.dxp.dxp-progressspinner div.ui-progress-spinner [dir=rtl]{text-align:right}div.dxp.dxp-progressspinner svg.ui-progress-spinner-svg{-webkit-animation:ui-progress-spinner-rotate 2s linear infinite;animation:ui-progress-spinner-rotate 2s linear infinite;height:100%;-webkit-transform-origin:center center;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}\@-webkit-keyframes ui-progress-spinner-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes ui-progress-spinner-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes ui-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}\@keyframes ui-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}\@-webkit-keyframes ui-progress-spinner-color{0%,to{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\@keyframes ui-progress-spinner-color{0%,to{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}"; }
};

export { Progressspinner as dxp_progressspinner };
