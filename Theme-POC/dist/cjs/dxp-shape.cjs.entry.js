'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const TRIANGLE_UP = 'triangle-up';
const TRIANGLE_DOWN = 'triangle-down';
const TRIANGLE_LEFT = 'triangle-left';
const TRIANGLE_RIGHT = 'triangle-right';
const SOLID_TRANSPARENT_PX = 'px solid transparent';
const Shape = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** css classes for different shape types */
        this.SHAPE_CLASS = Object.freeze({
            'round': 'round',
            'trapezoid': 'trapezoid',
            'rectangle': 'rectangle',
            'parallelogram': 'parallelogram',
            'triangle-up': 'triangle',
            'triangle-down': 'triangle',
            'triangle-left': 'triangle',
            'triangle-right': 'triangle'
        });
        /** css classes for vertical alignment */
        this.VERTICAL_ALIGN_CLASS = Object.freeze({
            'top': 'vertical-align-top',
            'middle': 'vertical-align-middle',
            'bottom': 'vertical-align-bottom'
        });
        /** horizontal alignment of content in shape */
        this.align = 'center';
        /** border style of shape */
        this.borderStyle = 'none';
        /** type of shape */
        this.type = 'rectangle';
        /** vertical alignment of content in shape */
        this.verticalAlign = 'middle';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed prior to component loading */
    componentDidLoad() {
        let div;
        div = this.element.querySelector('[id=div-shape]');
        if (this.width) {
            div.style.width = `${this.width}px`;
        }
        if (this.height) {
            div.style.height = `${this.height}px`;
        }
        if (this.backgroundColor) {
            div.style.backgroundColor = core$1.dxp.util.hexToRgba(this.backgroundColor, this.opacity ? this.opacity : 1);
        }
        if (this.borderWidth) {
            div.style.borderWidth = `${this.borderWidth}px`;
        }
        if (this.borderStyle) {
            div.style.borderStyle = this.borderStyle;
        }
        if (this.borderColor) {
            div.style.borderColor = this.borderColor;
        }
        if (this.backgroundImage) {
            div.style.backgroundImage = `url(' ${this.backgroundImage}')`;
            div.style.backgroundSize = '100% 100%';
            div.style.backgroundRepeat = 'no-repeat';
        }
        if (this.align) {
            div.style.justifyContent = this.align;
        }
        if (this.getShapeClass() === 'triangle') {
            this.renderTriangle(div);
        }
        if (this.verticalAlign) {
            div.classList.add('vertical-align');
            div.classList.add(this.getVerticalAlignmentClass());
        }
        if (this.customClass) {
            div.classList.add(this.customClass);
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Method for getting css class based on type of shape */
    getShapeClass() {
        return this.SHAPE_CLASS[this.type.toLowerCase()];
    }
    /** Method for getting css class based on vertical alignment */
    getVerticalAlignmentClass() {
        return this.VERTICAL_ALIGN_CLASS[this.verticalAlign.toLowerCase()];
    }
    /** Method to render triangle */
    renderTriangle(div) {
        div.style.width = '0px';
        div.style.height = '0px';
        div.style.backgroundColor = '';
        const triangleType = this.type.toLowerCase();
        if (triangleType === TRIANGLE_UP) {
            div.style.borderLeft = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderRight = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderBottom = `${this.height}px solid ${this.backgroundColor}`;
        }
        if (triangleType === TRIANGLE_DOWN) {
            div.style.borderLeft = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderRight = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderTop = `${this.height}px solid ${this.backgroundColor}`;
        }
        if (triangleType === TRIANGLE_LEFT) {
            div.style.borderTop = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderBottom = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderRight = `${this.height}px solid ${this.backgroundColor}`;
        }
        if (triangleType === TRIANGLE_RIGHT) {
            div.style.borderTop = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderBottom = this.width + SOLID_TRANSPARENT_PX;
            div.style.borderLeft = `${this.height}px solid ${this.backgroundColor}`;
        }
    }
    /** Render the shape */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-shape render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { id: "div-shape", class: this.getShapeClass() }, core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-shape{background:transparent;display:inline-block}div.dxp.dxp-shape .round{border-radius:50%}div.dxp.dxp-shape .parallelogram{-webkit-transform:skew(20deg);transform:skew(20deg)}div.dxp.dxp-shape .vertical-align{display:table-cell}div.dxp.dxp-shape .vertical-align-top{vertical-align:top}div.dxp.dxp-shape .vertical-align-middle{vertical-align:middle}div.dxp.dxp-shape .vertical-align-bottom{vertical-align:bottom}"; }
};

exports.dxp_shape = Shape;
