import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-f17494bc.js';
var SidebarMenuItem = /** @class */ (function () {
    function SidebarMenuItem(hostRef) {
        registerInstance(this, hostRef);
    }
    /** life cycle hook runs before loading the component */
    SidebarMenuItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Sidebar-Menu-Item', messages);
    };
    /** render dxp-accordion item(s) */
    SidebarMenuItem.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-sidebar-menu-item render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-sidebar-menu.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("a", { tabindex: "0", "aria-label": this.subMenuTitle, href: this.subMenuHref, target: this.openInNewTab ? '_blank' : '_self', title: this.subMenuTitle, class: "sub-menu-item", role: "sub-menu" }, h("span", { class: "sub-item-icon dxp-flex" }, h("img", { src: this.subMenuSrc, alt: this.subMenuAlt })), h("span", { class: "sub-item-label" }, this.subMenuTitle))));
    };
    Object.defineProperty(SidebarMenuItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarMenuItem, "style", {
        get: function () { return "div.dxp.dxp-sidebar-menu-item{z-index:10}div.dxp.dxp-sidebar-menu-item .sub-menu-item{padding:.75rem 1.2rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-sidebar-menu-item .sub-menu-item .sub-item-icon{width:1rem;background-size:contain}div.dxp.dxp-sidebar-menu-item .sub-menu-item .sub-item-icon img{width:100%}div.dxp.dxp-sidebar-menu-item .sub-menu-item .sub-item-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}"; },
        enumerable: true,
        configurable: true
    });
    return SidebarMenuItem;
}());
export { SidebarMenuItem as dxp_sidebar_menu_item };
