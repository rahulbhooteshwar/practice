'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const StepTracker = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-step-tracker render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` })
        ];
        return (core$1.h("ul", { class: `${this.base.componentClass()} ${this.verticalAlign ? 'vertical' : 'horizontal'}`, dir: this.dir, "data-theme": this.theme }, styles, this.steps ? this.steps.map(step => core$1.h("dxp-step", { name: step['name'], status: step['status'], "step-info": step['step-info'], "icon-path": step['icon-path'] })) : core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "ul.dxp.dxp-step-tracker{padding:2px}ul.dxp.dxp-step-tracker.horizontal{display:-ms-flexbox;display:flex}ul.dxp.dxp-step-tracker.horizontal ::slotted(dxp-step),ul.dxp.dxp-step-tracker.horizontal dxp-step{-ms-flex:1;flex:1}ul.dxp.dxp-step-tracker.horizontal ::slotted(dxp-step:last-child),ul.dxp.dxp-step-tracker.horizontal dxp-step:last-child{-ms-flex:unset;flex:unset}ul.dxp.dxp-step-tracker dxp-step{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center}ul.dxp.dxp-step-tracker dxp-step:last-child{-ms-flex:unset;flex:unset}"; }
};

exports.dxp_step_tracker = StepTracker;
