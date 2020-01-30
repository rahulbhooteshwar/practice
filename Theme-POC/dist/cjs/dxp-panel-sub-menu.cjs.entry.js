'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-3185cff1.js');

const PanelSubMenu = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** panel item status */
        this.active = false;
        /** It specifies that whether need to show progress bar or not */
        this.progressBar = false;
        /** change color of progress  (for both) */
        this.progressColor = '#000000';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'PanelMenu', messages.messages);
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
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-panel-menu.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: `panel-item-content ${this.active ? 'panel-item-active' : ''}` }, this.content
            ? core$1.h("div", { innerHTML: this.content })
            : core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-panel-sub-menu .panel-item-content{display:none}div.dxp.dxp-panel-sub-menu .panel-item-content.panel-item-active{overflow-x:auto;display:block}"; }
};

exports.dxp_panel_sub_menu = PanelSubMenu;
