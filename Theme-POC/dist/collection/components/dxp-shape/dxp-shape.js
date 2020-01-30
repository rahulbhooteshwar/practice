import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const TRIANGLE_UP = 'triangle-up';
const TRIANGLE_DOWN = 'triangle-down';
const TRIANGLE_LEFT = 'triangle-left';
const TRIANGLE_RIGHT = 'triangle-right';
const SOLID_TRANSPARENT_PX = 'px solid transparent';
/** dxp-shape */
export class Shape {
    constructor() {
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
        this.base = new BaseComponent(this, dxp);
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
            div.style.backgroundColor = dxp.util.hexToRgba(this.backgroundColor, this.opacity ? this.opacity : 1);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-shape render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { id: "div-shape", class: this.getShapeClass() },
                h("slot", null))));
    }
    static get is() { return "dxp-shape"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-shape.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-shape.css"]
    }; }
    static get properties() { return {
        "align": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right' | 'center'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "horizontal alignment of content in shape"
            },
            "attribute": "align",
            "reflect": false,
            "defaultValue": "'center'"
        },
        "backgroundColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "background color as hexcode of shape"
            },
            "attribute": "background-color",
            "reflect": false
        },
        "backgroundImage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "background image to be used in shape"
            },
            "attribute": "background-image",
            "reflect": false
        },
        "borderColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "border color of shape"
            },
            "attribute": "border-color",
            "reflect": false
        },
        "borderStyle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'none' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'",
                "resolved": "\"dashed\" | \"dotted\" | \"double\" | \"groove\" | \"inset\" | \"none\" | \"outset\" | \"ridge\" | \"solid\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "border style of shape"
            },
            "attribute": "border-style",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "borderWidth": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "border width of shape"
            },
            "attribute": "border-width",
            "reflect": false
        },
        "customClass": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "custom external css class for shape"
            },
            "attribute": "custom-class",
            "reflect": false
        },
        "height": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "height of shape"
            },
            "attribute": "height",
            "reflect": false
        },
        "opacity": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "opacity of background of shape as 0-1 value where 1 is opaque and 0 is full transparent"
            },
            "attribute": "opacity",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'rectangle' | 'round' | 'parallelogram' | 'triangle-up' | 'triangle-down' | 'triangle-left' | 'triangle-right'",
                "resolved": "\"parallelogram\" | \"rectangle\" | \"round\" | \"triangle-down\" | \"triangle-left\" | \"triangle-right\" | \"triangle-up\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of shape"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'rectangle'"
        },
        "verticalAlign": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top' | 'bottom' | 'middle'",
                "resolved": "\"bottom\" | \"middle\" | \"top\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "vertical alignment of content in shape"
            },
            "attribute": "vertical-align",
            "reflect": false,
            "defaultValue": "'middle'"
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "width of shape"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
