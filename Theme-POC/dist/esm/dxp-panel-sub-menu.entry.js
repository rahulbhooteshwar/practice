import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-6d333681.js';

const PanelSubMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** panel item status */
        this.active = false;
        /** It specifies that whether need to show progress bar or not */
        this.progressBar = false;
        /** change color of progress  (for both) */
        this.progressColor = '#000000';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'PanelMenu', messages);
    }
    /** actions to be performed after component loading */
    async componentDidLoad() {
        // when this component is rendered inside slot of dxp-panel-menu
        let host = this.element.closest('dxp-panel-menu');
        // when this component is rendered inside shadow root of dxp-panel-menu
        host = host ? host : this.element['getRootNode']()['host'];
        const hostComponentRef = host && await host.componentOnReady();
        if (hostComponentRef) {
            await hostComponentRef.registerMenu();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the panels */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-panel-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: `panel-item-content ${this.active ? 'panel-item-active' : ''}` }, this.content
            ? h("div", { innerHTML: this.content })
            : h("slot", null))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-panel-sub-menu .panel-item-content{display:none}div.dxp.dxp-panel-sub-menu .panel-item-content.panel-item-active{overflow-x:auto;display:block}"; }
};

export { PanelSubMenu as dxp_panel_sub_menu };
