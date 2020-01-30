import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-step-tracker */
export class StepTracker {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.steps) {
            this.steps = (typeof this.steps === 'string') ? JSON.parse(this.steps) : this.steps;
        }
    }
    /** actions to be performed after component load */
    componentDidLoad() {
        this.findLastStep();
        const stepsInSlot = this.element.querySelectorAll('dxp-step').length ? this.element.querySelectorAll('dxp-step') : this.element.querySelectorAll('dxp-step');
        const lastEle = stepsInSlot.length - 1;
        Array.from(stepsInSlot).forEach((node, _i) => {
            if (node) {
                this.verticalAlign ? node.querySelector('li').classList.add('vertical') : node.querySelector('li').classList.add('horizontal');
            }
            node.classList.add('sc-dxp-step-tracker');
        });
        if (stepsInSlot.length !== 0) {
            if (stepsInSlot[lastEle] && stepsInSlot[lastEle].querySelector('.dxp-step')) {
                stepsInSlot[lastEle].querySelector('.dxp-step').classList.add('last-step');
            }
            else if (stepsInSlot[lastEle].querySelector('.dxp-step')) {
                stepsInSlot[lastEle].querySelector('.dxp-step').classList.add('last-step');
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** find the last step */
    findLastStep() {
        const stepsList = this.element ? this.element.querySelectorAll('dxp-step') : this.element.querySelectorAll('dxp-step');
        const lastStep = stepsList[stepsList.length - 1];
        if (lastStep && lastStep.length > 0) {
            const lastStepItem = lastStep.querySelectorAll('.dxp-step') ? lastStep.querySelectorAll('.dxp-step') : lastStep.querySelectorAll('.dxp-step');
            lastStepItem[0].classList.add('last-step');
        }
    }
    /** Render the step-tracker */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-step-tracker render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` })
        ];
        return (h("ul", { class: `${this.base.componentClass()} ${this.verticalAlign ? 'vertical' : 'horizontal'}`, dir: this.dir, "data-theme": this.theme },
            styles,
            this.steps ? this.steps.map(step => h("dxp-step", { name: step['name'], status: step['status'], "step-info": step['step-info'], "icon-path": step['icon-path'] })) : h("slot", null)));
    }
    static get is() { return "dxp-step-tracker"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-step-tracker.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-step-tracker.css"]
    }; }
    static get properties() { return {
        "steps": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Steps - to be utilized by DXP framework"
            },
            "attribute": "steps",
            "reflect": false
        },
        "verticalAlign": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "alignment of step tracker based on value. true and false will render vertical and horizontal step tracker respectively"
            },
            "attribute": "vertical-align",
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
