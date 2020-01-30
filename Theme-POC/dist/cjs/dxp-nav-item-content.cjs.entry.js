'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const NavItemContent = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
    /** Render the nav */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-nav-item-container render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-nav.min.css` })]
        ];
        return (core$1.h("li", { dir: this.dir, role: "menu" }, styles, this.navigationTitle && core$1.h("a", { tabindex: "-1", class: "dxp-title-2 sub-nav-item", title: this.linkTitle, href: this.menuRouteLink, target: this.openInNewTab ? '_blank' : '_self', role: "menuitem" }, this.navigationTitle), this.description && core$1.h("span", { class: "menu-description dxp-font-size-md dxp-hidden-md-down dxp-lg-block" }, this.description), this.descriptionText && core$1.h("span", { class: "menu-description dxp-font-size-md dxp-hidden-md-down dxp-lg-block" }, this.descriptionText)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "li a{display:block}\@media (max-width:991px){li .dxp-hidden-md-down{visibility:hidden;display:none}}\@media (min-width:992px){li a{display:inline-block}li .menu-description{display:block}li .sub-nav-item{margin-bottom:0}li .sub-nav-item+.menu-description{margin-top:.41rem;padding-left:.4rem}li .dxp-lg-block{display:block;visibility:visible}}\@media (min-width:992px){li[dir=rtl] .sub-nav-item+.menu-description{padding-left:0;padding-right:.4rem}}"; }
};

exports.dxp_nav_item_content = NavItemContent;
