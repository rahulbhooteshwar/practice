import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-progressspinner */
export class Progressspinner {
    constructor() {
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-progressspinner render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("div", { class: "ui-progress-spinner" },
                h("svg", { class: "ui-progress-spinner-svg", viewBox: "25 25 50 50", style: this.styleString },
                    h("circle", { style: this.circle, cx: "50", cy: "50", r: this.radius, fill: this.fill, "stroke-width": this.strokeWidth, "stroke-miterlimit": "10" })))));
    }
    static get is() { return "dxp-progressspinner"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-progressspinner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-progressspinner.css"]
    }; }
    static get properties() { return {
        "animationDuration": {
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
                "text": "Prop for animationDuration"
            },
            "attribute": "animation-duration",
            "reflect": false,
            "defaultValue": "1"
        },
        "fill": {
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
                "text": "Prop for fill"
            },
            "attribute": "fill",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "radius": {
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
                "text": "Prop for fill radius"
            },
            "attribute": "radius",
            "reflect": false,
            "defaultValue": "20"
        },
        "strokeColor": {
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
                "text": "Prop for strokeColor"
            },
            "attribute": "stroke-color",
            "reflect": false
        },
        "strokeWidth": {
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
                "text": "Prop for strokeWidth"
            },
            "attribute": "stroke-width",
            "reflect": false,
            "defaultValue": "2"
        }
    }; }
    static get states() { return {
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
