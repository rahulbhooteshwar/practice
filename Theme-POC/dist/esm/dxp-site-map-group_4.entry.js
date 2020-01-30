import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const SiteMapGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        const shadow = this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink() {
        return ((this.href && this.href.length !== 0) ?
            h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading)
            :
                h("a", { class: "hyperlink disable", "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** render site-map-list-group */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-group render() ${"DEVELOPMENT"}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("div", { class: "group-heading" }, h("p", { class: "dxp-title-3" }, this.getHyperlink())), h("slot", null)));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp-site-map-group .group-heading{width:100%;margin-bottom:2.1875rem}div.dxp-site-map-group .disable{pointer-events:none;cursor:not-allowed}\@media (max-width:576px){div.dxp-site-map-group .group-heading p{line-height:2rem}}"; }
};

const SiteMapGroupItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink() {
        return ((this.href && this.href.length !== 0) ?
            h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading) :
            h("a", { class: "hyperlink disable", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** Render site-map-list-group-item */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-group-item render() ${"DEVELOPMENT"}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir }, h("div", { class: "group-item" }, h("p", { class: "dxp-title-5" }, this.getHyperlink()), h("slot", null))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-site-map-group-item .group-item{margin-bottom:1.1875rem}div.dxp.dxp-site-map-group-item .disable{pointer-events:none;cursor:not-allowed}"; }
};

const SiteMapList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render site-map-list */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-list render() ${"DEVELOPMENT"}`);
        return (h("ul", { class: this.base.componentClass(), dir: this.dir }, h("slot", null)));
    }
    get element() { return getElement(this); }
    static get style() { return "ul.dxp.dxp-site-map-list{display:block;list-style:none}[dir=ltr] ul.dxp.dxp-site-map-list{margin-left:1.5rem}[dir=rtl] ul.dxp.dxp-site-map-list{margin-right:1.5rem}"; }
};

const SiteMapListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink() {
        return ((this.href && this.href.length !== 0) ?
            h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading)
            :
                h("a", { class: "hyperlink disable", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** Render site-map-list-item */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-list-item render() ${"DEVELOPMENT"}`);
        return (h("li", { class: `${this.base.componentClass()} list-item`, dir: this.dir }, this.getHyperlink(), h("slot", null)));
    }
    get element() { return getElement(this); }
    static get style() { return "li.dxp.dxp-site-map-list-item{text-decoration:none;overflow:hidden;margin-top:1.1875rem}li.dxp.dxp-site-map-list-item .disable{pointer-events:none;cursor:not-allowed}"; }
};

export { SiteMapGroup as dxp_site_map_group, SiteMapGroupItem as dxp_site_map_group_item, SiteMapList as dxp_site_map_list, SiteMapListItem as dxp_site_map_list_item };
