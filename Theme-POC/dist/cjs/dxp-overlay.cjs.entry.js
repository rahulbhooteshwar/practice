'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        close: 'click this icon to close overlay'
    },
    'en-US': {
        close: 'click this icon to close overlay'
    }
};

const Overlay = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Overlay', messages);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** to switch the state of overlay */
    async toggleState(state) {
        const shadowRoot = this.element ? this.element : this.element;
        const target = shadowRoot.querySelector('.dxp-overlay');
        state ? target.classList.add('show') : target.classList.remove('show');
    }
    /** Render the overlay */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-overlay render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-overlay.min.css` })]
        ];
        return (core$1.h("div", null, this.demo ? core$1.h("button", { class: "dxp-btn dxp-btn-primary demo-button", onClick: async () => { await this.toggleState(true); } }, "Show Overlay") : '', core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "content-section" }, core$1.h("slot", null)), core$1.h("span", { class: "dxp-icon dxp-icon-close", onClick: async () => { await this.toggleState(false); }, "aria-label": core$1.dxp.i18n.t('Overlay:close') }))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-overlay{position:absolute;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;z-index:2;cursor:pointer}div.dxp.dxp-overlay.show{display:block}div.dxp.dxp-overlay .content-section{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute}div.dxp.dxp-overlay .dxp-icon-close{position:absolute}"; }
};

exports.dxp_overlay = Overlay;
