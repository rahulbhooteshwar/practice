import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-step */
export class Step {
    constructor() {
        /** stores the status of step */
        this.status = 'unvisited';
        /** optional attribute which describes about the step */
        this.stepInfo = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** emits selected steps data */
    emitData(name, status, stepData) {
        const stepSelected = {
            stepName: name,
            stepStatus: status,
            stepInfo: stepData
        };
        this.stepSelected.emit(stepSelected);
    }
    /** Render the step */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-step render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-step-tracker.min.css` })]
        ];
        return (h("li", { class: `${this.base.componentClass()} ${this.status}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("a", { href: "javascript:void(0)", title: this.stepInfo, onClick: () => this.emitData(this.name, this.status, this.stepInfo) },
                h("span", { class: "circle", "aria-label": this.status }, this.status === 'custom' && h("img", { src: this.iconPath, "data-src": this.iconPath, alt: this.stepInfo })),
                h("span", { class: "label" }, this.name))));
    }
    static get is() { return "dxp-step"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-step.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-step.css"]
    }; }
    static get properties() { return {
        "iconPath": {
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
                "text": "custom icon for the step"
            },
            "attribute": "icon-path",
            "reflect": false
        },
        "name": {
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
                "text": "label of the step"
            },
            "attribute": "name",
            "reflect": false
        },
        "status": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "'unvisited' | 'active' | 'completed' | 'incomplete' | 'custom'",
                "resolved": "\"active\" | \"completed\" | \"custom\" | \"incomplete\" | \"unvisited\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "stores the status of step"
            },
            "attribute": "status",
            "reflect": true,
            "defaultValue": "'unvisited'"
        },
        "stepInfo": {
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
                "text": "optional attribute which describes about the step"
            },
            "attribute": "step-info",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "stepSelected",
            "name": "stepSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit custom event when step is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
