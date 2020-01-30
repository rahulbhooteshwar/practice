'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const ROTATE_X_180 = 'rotateX(180deg)';
const ROTATE_Y_180 = 'rotateY(180deg)';
const Flipbox = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** flipping direction */
        this.flipDirection = 'horizontal';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        let mainDiv;
        mainDiv = this.element.querySelector('.flip-box');
        if (this.width) {
            mainDiv.style.width = this.width.endsWith('px') ? this.width : `${this.width}px`;
        }
        if (this.height) {
            mainDiv.style.height = this.height.endsWith('px') ? this.height : `${this.height}px`;
        }
        if (this.customStyleClass) {
            mainDiv.classList.add(this.customStyleClass);
        }
        let frontDiv;
        frontDiv = this.element.querySelector('.flip-box-front');
        if (this.borderStyleFront) {
            frontDiv.style.border = this.borderStyleFront;
        }
        if (this.backgroundColorFront) {
            frontDiv.style.backgroundColor = this.backgroundColorFront;
        }
        let backDiv;
        backDiv = this.element.querySelector('.flip-box-back');
        if (this.borderStyleBack) {
            backDiv.style.border = this.borderStyleBack;
        }
        if (this.backgroundColorBack) {
            backDiv.style.backgroundColor = this.backgroundColorBack;
        }
        let innerDiv;
        innerDiv = this.element.querySelector('.flip-box-inner');
        if (this.flipDirection.toLowerCase() === 'vertical') {
            mainDiv.style.setProperty('--c', ROTATE_X_180);
            backDiv.style.setProperty('--c', ROTATE_X_180);
            innerDiv.style.setProperty('--c', ROTATE_X_180);
        }
        else {
            mainDiv.style.setProperty('--c', ROTATE_Y_180);
            backDiv.style.setProperty('--c', ROTATE_Y_180);
            innerDiv.style.setProperty('--c', ROTATE_Y_180);
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the flip-box */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-flipbox render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "flip-box" }, core$1.h("div", { class: "flip-box-inner" }, core$1.h("div", { class: "flip-box-front" }, this.headingFront && core$1.h("span", { class: "dxp-text-eyebrow" }, this.headingFront), core$1.h("slot", { name: "front" })), core$1.h("div", { class: "flip-box-back" }, this.headingBack && core$1.h("span", { class: "dxp-text-eyebrow" }, this.headingBack), core$1.h("slot", { name: "back" }))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-flipbox{width:100%;height:100%}div.dxp.dxp-flipbox .flip-box{background-color:transparent;border:none;-webkit-perspective:1000px;perspective:1000px;width:100%;height:100%}div.dxp.dxp-flipbox .flip-box-inner{position:relative;width:100%;height:100%;text-align:center;-webkit-transition:-webkit-transform .8s;transition:-webkit-transform .8s;transition:transform .8s;transition:transform .8s,-webkit-transform .8s;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}div.dxp.dxp-flipbox .flip-box:hover .flip-box-inner{-webkit-transform:var(--c);transform:var(--c)}div.dxp.dxp-flipbox .flip-box-back,div.dxp.dxp-flipbox .flip-box-front{position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden}div.dxp.dxp-flipbox .flip-box-back{-webkit-transform:var(--c);transform:var(--c)}"; }
};

exports.dxp_flipbox = Flipbox;
