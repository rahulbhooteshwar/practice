import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var NavItemContent = /** @class */ (function () {
    function NavItemContent(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    NavItemContent.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /**
     * click listener for routing events on anchor tag
     */
    NavItemContent.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the nav */
    NavItemContent.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-nav-item-container render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-nav.min.css" })]
        ];
        return (h("li", { dir: this.dir, role: "menu" }, styles, this.navigationTitle && h("a", { tabindex: "-1", class: "dxp-title-2 sub-nav-item", title: this.linkTitle, href: this.menuRouteLink, target: this.openInNewTab ? '_blank' : '_self', role: "menuitem" }, this.navigationTitle), this.description && h("span", { class: "menu-description dxp-font-size-md dxp-hidden-md-down dxp-lg-block" }, this.description), this.descriptionText && h("span", { class: "menu-description dxp-font-size-md dxp-hidden-md-down dxp-lg-block" }, this.descriptionText)));
    };
    Object.defineProperty(NavItemContent.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavItemContent, "style", {
        get: function () { return "li a{display:block}\@media (max-width:991px){li .dxp-hidden-md-down{visibility:hidden;display:none}}\@media (min-width:992px){li a{display:inline-block}li .menu-description{display:block}li .sub-nav-item{margin-bottom:0}li .sub-nav-item+.menu-description{margin-top:.41rem;padding-left:.4rem}li .dxp-lg-block{display:block;visibility:visible}}\@media (min-width:992px){li[dir=rtl] .sub-nav-item+.menu-description{padding-left:0;padding-right:.4rem}}"; },
        enumerable: true,
        configurable: true
    });
    return NavItemContent;
}());
export { NavItemContent as dxp_nav_item_content };
