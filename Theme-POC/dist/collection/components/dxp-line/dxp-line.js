import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-line */
export class Line {
    constructor() {
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-line render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass() },
            h("link", { rel: "stylesheet", href: `` }),
            h("hr", { style: this.styleString, class: this.className })));
    }
    static get is() { return "dxp-line"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-line.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-line.css"]
    }; }
    static get properties() { return {
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
                "text": "Prop for backgroundColor"
            },
            "attribute": "background-color",
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
                "text": "Prop for borderColor"
            },
            "attribute": "border-color",
            "reflect": false
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
                "text": "Prop for borderWidth"
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
                "text": "Prop for customClass"
            },
            "attribute": "custom-class",
            "reflect": false
        },
        "height": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "height for line"
            },
            "attribute": "height",
            "reflect": false
        },
        "heightLg": {
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
                "text": "Prop for height for lg device"
            },
            "attribute": "height-lg",
            "reflect": false
        },
        "heightMd": {
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
                "text": "Prop for height md device"
            },
            "attribute": "height-md",
            "reflect": false
        },
        "heightSm": {
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
                "text": "Prop for height for sm device"
            },
            "attribute": "height-sm",
            "reflect": false
        },
        "heightXl": {
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
                "text": "Prop for height for xl device"
            },
            "attribute": "height-xl",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Prop for line-type"
            },
            "attribute": "type",
            "reflect": false
        }
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
