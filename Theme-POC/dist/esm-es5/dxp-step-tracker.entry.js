import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var StepTracker = /** @class */ (function () {
    function StepTracker(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    StepTracker.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (this.steps) {
            this.steps = (typeof this.steps === 'string') ? JSON.parse(this.steps) : this.steps;
        }
    };
    /** actions to be performed after component load */
    StepTracker.prototype.componentDidLoad = function () {
        var _this = this;
        this.findLastStep();
        var stepsInSlot = this.element.querySelectorAll('dxp-step').length ? this.element.querySelectorAll('dxp-step') : this.element.querySelectorAll('dxp-step');
        var lastEle = stepsInSlot.length - 1;
        Array.from(stepsInSlot).forEach(function (node, _i) {
            if (node) {
                _this.verticalAlign ? node.querySelector('li').classList.add('vertical') : node.querySelector('li').classList.add('horizontal');
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
    };
    /**
     * click listener for routing events on anchor tag
     */
    StepTracker.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** find the last step */
    StepTracker.prototype.findLastStep = function () {
        var stepsList = this.element ? this.element.querySelectorAll('dxp-step') : this.element.querySelectorAll('dxp-step');
        var lastStep = stepsList[stepsList.length - 1];
        if (lastStep && lastStep.length > 0) {
            var lastStepItem = lastStep.querySelectorAll('.dxp-step') ? lastStep.querySelectorAll('.dxp-step') : lastStep.querySelectorAll('.dxp-step');
            lastStepItem[0].classList.add('last-step');
        }
    };
    /** Render the step-tracker */
    StepTracker.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-step-tracker render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" })
        ];
        return (h("ul", { class: this.base.componentClass() + " " + (this.verticalAlign ? 'vertical' : 'horizontal'), dir: this.dir, "data-theme": this.theme }, styles, this.steps ? this.steps.map(function (step) { return h("dxp-step", { name: step['name'], status: step['status'], "step-info": step['step-info'], "icon-path": step['icon-path'] }); }) : h("slot", null)));
    };
    Object.defineProperty(StepTracker.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepTracker, "style", {
        get: function () { return "ul.dxp.dxp-step-tracker{padding:2px}ul.dxp.dxp-step-tracker.horizontal{display:-ms-flexbox;display:flex}ul.dxp.dxp-step-tracker.horizontal ::slotted(dxp-step),ul.dxp.dxp-step-tracker.horizontal dxp-step{-ms-flex:1;flex:1}ul.dxp.dxp-step-tracker.horizontal ::slotted(dxp-step:last-child),ul.dxp.dxp-step-tracker.horizontal dxp-step:last-child{-ms-flex:unset;flex:unset}ul.dxp.dxp-step-tracker dxp-step{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center}ul.dxp.dxp-step-tracker dxp-step:last-child{-ms-flex:unset;flex:unset}"; },
        enumerable: true,
        configurable: true
    });
    return StepTracker;
}());
export { StepTracker as dxp_step_tracker };
