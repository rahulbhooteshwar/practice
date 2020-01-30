'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-cb9d4a75.js');

const SidebarMenuItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** life cycle hook runs before loading the component */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Sidebar-Menu-Item', messages.messages);
    }
    /** render dxp-accordion item(s) */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-sidebar-menu-item render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sidebar-menu.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("a", { tabindex: "0", "aria-label": this.subMenuTitle, href: this.subMenuHref, target: this.openInNewTab ? '_blank' : '_self', title: this.subMenuTitle, class: "sub-menu-item", role: "sub-menu" }, core$1.h("span", { class: "sub-item-icon dxp-flex" }, core$1.h("img", { src: this.subMenuSrc, alt: this.subMenuAlt })), core$1.h("span", { class: "sub-item-label" }, this.subMenuTitle))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-sidebar-menu-item{z-index:10}div.dxp.dxp-sidebar-menu-item .sub-menu-item{padding:.75rem 1.2rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-sidebar-menu-item .sub-menu-item .sub-item-icon{width:1rem;background-size:contain}div.dxp.dxp-sidebar-menu-item .sub-menu-item .sub-item-icon img{width:100%}div.dxp.dxp-sidebar-menu-item .sub-menu-item .sub-item-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}"; }
};

exports.dxp_sidebar_menu_item = SidebarMenuItem;
