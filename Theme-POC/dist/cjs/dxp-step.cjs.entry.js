'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const Step = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** stores the status of step */
        this.status = 'unvisited';
        /** optional attribute which describes about the step */
        this.stepInfo = '';
        this.stepSelected = core$1.createEvent(this, "stepSelected", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-step render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-step-tracker.min.css` })]
        ];
        return (core$1.h("li", { class: `${this.base.componentClass()} ${this.status}`, dir: this.dir, "data-theme": this.theme }, styles, core$1.h("a", { href: "javascript:void(0)", title: this.stepInfo, onClick: () => this.emitData(this.name, this.status, this.stepInfo) }, core$1.h("span", { class: "circle", "aria-label": this.status }, this.status === 'custom' && core$1.h("img", { src: this.iconPath, "data-src": this.iconPath, alt: this.stepInfo })), core$1.h("span", { class: "label" }, this.name))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "\@charset \"UTF-8\";li.dxp.dxp-step{position:relative;width:100%;list-style-type:none}li.dxp.dxp-step.completed .circle:before{content:\"✓\";display:inline-block;height:25px;width:25px}li.dxp.dxp-step.incomplete .circle{position:relative}li.dxp.dxp-step.incomplete .circle:before{content:\"...\";top:0;left:0;right:0;bottom:0;height:100%;width:100%;font-size:26px;line-height:14px}li.dxp.dxp-step.active .circle{position:relative}li.dxp.dxp-step.active .circle:before{content:\" \";width:10px;height:10px;border-radius:50%;top:5.5px;left:5.5px}li.dxp.dxp-step.horizontal:after{position:absolute;left:25px;right:0;top:4px;-ms-flex:1;flex:1;height:2px;margin:.5rem 0 0 0;content:\" \"}li.dxp.dxp-step.vertical{padding-bottom:50px}li.dxp.dxp-step.vertical:after{position:absolute;top:25px;left:12px;width:2px;height:calc(100% - 25px);content:\" \"}li.dxp.dxp-step.vertical a{display:-ms-flexbox;display:flex}li.dxp.dxp-step.vertical .label{padding-left:15px}li.dxp.dxp-step.last-step{padding-bottom:0}li.dxp.dxp-step.last-step:after{content:none}li.dxp.dxp-step a{height:100%}li.dxp.dxp-step a span:last-child{font-size:14px;line-height:24px;display:block}li.dxp.dxp-step .circle{display:inline-block;height:25px;width:25px;border-radius:14px;-webkit-transition:-webkit-transform .2s;transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;position:relative;z-index:1}li.dxp.dxp-step .circle:before{text-align:center;display:block;position:absolute}li.dxp.dxp-step .circle:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}li.dxp.dxp-step .circle img{height:100%;width:100%}li.dxp.dxp-step[dir=rtl].horizontal:after{left:0}li.dxp.dxp-step[dir=rtl].vertical:after{left:auto;right:12px}li.dxp.dxp-step[dir=rtl].vertical .label{padding:0 15px 0 0}"; }
};

exports.dxp_step = Step;
