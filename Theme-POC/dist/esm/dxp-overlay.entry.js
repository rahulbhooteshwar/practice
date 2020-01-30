import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

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
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Overlay', messages);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-overlay render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-overlay.min.css` })]
        ];
        return (h("div", null, this.demo ? h("button", { class: "dxp-btn dxp-btn-primary demo-button", onClick: async () => { await this.toggleState(true); } }, "Show Overlay") : '', h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "content-section" }, h("slot", null)), h("span", { class: "dxp-icon dxp-icon-close", onClick: async () => { await this.toggleState(false); }, "aria-label": dxp.i18n.t('Overlay:close') }))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-overlay{position:absolute;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;z-index:2;cursor:pointer}div.dxp.dxp-overlay.show{display:block}div.dxp.dxp-overlay .content-section{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute}div.dxp.dxp-overlay .dxp-icon-close{position:absolute}"; }
};

export { Overlay as dxp_overlay };
