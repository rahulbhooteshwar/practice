'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        close: 'Close'
    },
    'es': {
        close: 'Cerrar'
    }
};

const Pills = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** property to whether show x button or now */
        this.removable = true;
        this.deleted = core$1.createEvent(this, "deleted", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Pills', messages);
    }
    /** actions to be performed post component loading */
    componentDidLoad() {
        let pillsDiv;
        pillsDiv = this.base.shadowRootQuerySelector(this.element, '.pill', false);
        if (this.backgroundColor) {
            pillsDiv.style.backgroundColor = this.backgroundColor;
        }
        if (this.borderColor) {
            pillsDiv.style.border = `1px solid ${this.borderColor}`;
        }
        let pillsSpanDiv;
        pillsSpanDiv = this.base.shadowRootQuerySelector(this.element, '.pill-text', false);
        if (this.color) {
            pillsSpanDiv.style.color = this.color;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** remove element on close */
    onDeleteHandler(pillValue) {
        this.deleted.emit(pillValue);
        this.element.remove();
    }
    /** Render the pills */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-pills render() : ${"DEVELOPMENT"}`);
        if (!this.text) {
            core$1.dxp.log.debug(this.element.tagName, 'Component not rendered check props', `in dxp-modal render() : ${"DEVELOPMENT"}`);
            return;
        }
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-pills.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "pill", title: this.text, tabindex: "1", "aria-label": `${this.text} pills` }, core$1.h("span", { class: "pill-text", "aria-label": this.text }, this.text), this.removable && core$1.h("button", { class: "icon-close dxp-icon dxp-icon-small dxp-icon-close", "aria-label": core$1.dxp.i18n.t('Pills:close'), onClick: () => { this.onDeleteHandler(this.text); }, tabindex: "2" }))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-pills{display:inline-block;background-color:transparent}div.dxp.dxp-pills .pill{padding:5px 10px;border-radius:19.5px}div.dxp.dxp-pills .pill .pill-text{margin:0 5px}div.dxp.dxp-pills .pill .icon-close{margin:auto 5px;cursor:pointer;background:transparent;border:none}"; }
};

exports.dxp_pills = Pills;
