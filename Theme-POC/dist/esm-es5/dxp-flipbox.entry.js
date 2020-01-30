import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var ROTATE_X_180 = 'rotateX(180deg)';
var ROTATE_Y_180 = 'rotateY(180deg)';
var Flipbox = /** @class */ (function () {
    function Flipbox(hostRef) {
        registerInstance(this, hostRef);
        /** flipping direction */
        this.flipDirection = 'horizontal';
    }
    /** actions to be performed prior to component loading */
    Flipbox.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed after component loading */
    Flipbox.prototype.componentDidLoad = function () {
        var mainDiv;
        mainDiv = this.element.querySelector('.flip-box');
        if (this.width) {
            mainDiv.style.width = this.width.endsWith('px') ? this.width : this.width + "px";
        }
        if (this.height) {
            mainDiv.style.height = this.height.endsWith('px') ? this.height : this.height + "px";
        }
        if (this.customStyleClass) {
            mainDiv.classList.add(this.customStyleClass);
        }
        var frontDiv;
        frontDiv = this.element.querySelector('.flip-box-front');
        if (this.borderStyleFront) {
            frontDiv.style.border = this.borderStyleFront;
        }
        if (this.backgroundColorFront) {
            frontDiv.style.backgroundColor = this.backgroundColorFront;
        }
        var backDiv;
        backDiv = this.element.querySelector('.flip-box-back');
        if (this.borderStyleBack) {
            backDiv.style.border = this.borderStyleBack;
        }
        if (this.backgroundColorBack) {
            backDiv.style.backgroundColor = this.backgroundColorBack;
        }
        var innerDiv;
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
    };
    /**
     * click listener for routing events on anchor tag
     */
    Flipbox.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the flip-box */
    Flipbox.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-flipbox render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + ".min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "flip-box" }, h("div", { class: "flip-box-inner" }, h("div", { class: "flip-box-front" }, this.headingFront && h("span", { class: "dxp-text-eyebrow" }, this.headingFront), h("slot", { name: "front" })), h("div", { class: "flip-box-back" }, this.headingBack && h("span", { class: "dxp-text-eyebrow" }, this.headingBack), h("slot", { name: "back" }))))));
    };
    Object.defineProperty(Flipbox.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flipbox, "style", {
        get: function () { return "div.dxp.dxp-flipbox{width:100%;height:100%}div.dxp.dxp-flipbox .flip-box{background-color:transparent;border:none;-webkit-perspective:1000px;perspective:1000px;width:100%;height:100%}div.dxp.dxp-flipbox .flip-box-inner{position:relative;width:100%;height:100%;text-align:center;-webkit-transition:-webkit-transform .8s;transition:-webkit-transform .8s;transition:transform .8s;transition:transform .8s,-webkit-transform .8s;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}div.dxp.dxp-flipbox .flip-box:hover .flip-box-inner{-webkit-transform:var(--c);transform:var(--c)}div.dxp.dxp-flipbox .flip-box-back,div.dxp.dxp-flipbox .flip-box-front{position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden}div.dxp.dxp-flipbox .flip-box-back{-webkit-transform:var(--c);transform:var(--c)}"; },
        enumerable: true,
        configurable: true
    });
    return Flipbox;
}());
export { Flipbox as dxp_flipbox };
