import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const messages = {
    'en': {
        hello: 'Hello World!'
    },
    'en-US': {
        hello: 'Hello World! en-US'
    },
    'es': {
        hello: 'Hola Mundo!'
    },
    'es-ES': {
        hello: 'Hola Mundo! es-ES'
    }
};

const ToggleSwitch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** label orientation for toggle */
        this.labelPosition = 'left';
        this.analyticsDataEmitter = createEvent(this, "dxp_comp", 7);
        this.clickHandler = createEvent(this, "clickHandler", 7);
        this.toggleDataEmitter = createEvent(this, "toggleDataEmitter", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'ToggleSwitch', messages);
        this.labelClass = this.labelPosition === 'left' ? 'toggle-content toggle-container-left' : 'toggle-content toggle-container-right';
        this.componentClass = this.labelPosition === 'left' ? 'toggle-content toggle-container-right' : 'toggle-content toggle-container-left';
    }
    /** Method to handle click event for button */
    onClick(event) {
        this.clickHandler.emit(event);
        this.base.routingEventListener(event);
    }
    /** emit analytic data */
    emitAnalyticsData() {
        let el;
        el = this.element.querySelector('[type=checkbox]');
        const analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_label': this.label,
            'di_comp_value': el && el.value,
            'di_comp_status': el && el.checked
        };
        this.analyticsDataEmitter.emit(analyticsInfoObj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
    }
    /** emit toggle data */
    emitData() {
        let el;
        el = this.element.querySelector('[type=checkbox]');
        const dataObj = {
            'value': el && el.value,
            'status': el && el.checked,
            'disabled': el && el.disabled
        };
        this.emitAnalyticsData();
        this.toggleDataEmitter.emit(dataObj);
    }
    /** Render the toggle-switch */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-toggle-switch render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-toggle-switch.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "toggle-container" }, h("div", { class: this.labelClass }, this.label && h("p", null, this.label, this.description && h("br", null), this.description && h("span", { class: "dxp-font-size-sm" }, this.description, "\u200E")), h("slot", null)), h("div", { class: this.componentClass }, h("label", { class: "switch" }, h("input", { type: "checkbox", key: this.label, name: this.label, value: this.value, "aria-label": this.label, checked: this.checked, disabled: this.disabled, onClick: () => this.emitData() }), h("span", { class: "slider round" }))))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-toggle-switch .switch{position:relative;display:inline-block;width:40.3px;height:24px;border-radius:1px}div.dxp.dxp-toggle-switch .switch input{opacity:0;width:0;height:0}div.dxp.dxp-toggle-switch .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;-webkit-transition:.4s;transition:.4s}div.dxp.dxp-toggle-switch .slider:before{position:absolute;content:\"\";height:20px;width:20px;left:1px;bottom:1px;right:1px;top:1px;-webkit-transition:.4s;transition:.4s}div.dxp.dxp-toggle-switch input:disabled+.slider{opacity:.5}div.dxp.dxp-toggle-switch input:disabled:checked+.slider{background-color:#f38b00;opacity:.5}div.dxp.dxp-toggle-switch input:disabled+.slider:before{opacity:.5}div.dxp.dxp-toggle-switch input:checked+.slider:before{-webkit-transform:translateX(16px);-ms-transform:translateX(16px);transform:translateX(16px)}div.dxp.dxp-toggle-switch[dir=rtl] input:checked+.slider:before{-webkit-transform:translateX(-16px);-ms-transform:translateX(-16px);transform:translateX(-16px)}div.dxp.dxp-toggle-switch .slider.round{border-radius:24px;border:1px solid}div.dxp.dxp-toggle-switch .slider.round:before{border-radius:50%}div.dxp.dxp-toggle-switch .toggle-container{display:-ms-flexbox;display:flex}div.dxp.dxp-toggle-switch .toggle-content{margin:0 15px;word-wrap:break-word}div.dxp.dxp-toggle-switch .toggle-container-left{-ms-flex-order:1;order:1}div.dxp.dxp-toggle-switch .toggle-container-right{-ms-flex-order:2;order:2}"; }
};

export { ToggleSwitch as dxp_toggle_switch };
