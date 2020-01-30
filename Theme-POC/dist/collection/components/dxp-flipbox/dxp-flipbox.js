import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const ROTATE_X_180 = 'rotateX(180deg)';
const ROTATE_Y_180 = 'rotateY(180deg)';
/** dxp-flipbox */
export class Flipbox {
    constructor() {
        /** flipping direction */
        this.flipDirection = 'horizontal';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-flipbox render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "flip-box" },
                h("div", { class: "flip-box-inner" },
                    h("div", { class: "flip-box-front" },
                        this.headingFront && h("span", { class: "dxp-text-eyebrow" }, this.headingFront),
                        h("slot", { name: "front" })),
                    h("div", { class: "flip-box-back" },
                        this.headingBack && h("span", { class: "dxp-text-eyebrow" }, this.headingBack),
                        h("slot", { name: "back" }))))));
    }
    static get is() { return "dxp-flipbox"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-flipbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-flipbox.css"]
    }; }
    static get properties() { return {
        "backgroundColorBack": {
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
                "text": "background color for back part"
            },
            "attribute": "background-color-back",
            "reflect": false
        },
        "backgroundColorFront": {
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
                "text": "background color for front part"
            },
            "attribute": "background-color-front",
            "reflect": false
        },
        "borderStyleBack": {
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
                "text": "css styling for border of back part"
            },
            "attribute": "border-style-back",
            "reflect": false
        },
        "borderStyleFront": {
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
                "text": "css styling for border of front part"
            },
            "attribute": "border-style-front",
            "reflect": false
        },
        "customStyleClass": {
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
                "text": "css styling for border of front part"
            },
            "attribute": "custom-style-class",
            "reflect": false
        },
        "flipDirection": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'horizontal' | 'vertical'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "flipping direction"
            },
            "attribute": "flip-direction",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "headingBack": {
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
                "text": "heading for back part"
            },
            "attribute": "heading-back",
            "reflect": false
        },
        "headingFront": {
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
                "text": "heading for front part"
            },
            "attribute": "heading-front",
            "reflect": false
        },
        "height": {
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
                "text": "height of the box"
            },
            "attribute": "height",
            "reflect": false
        },
        "width": {
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
                "text": "width of the box"
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
