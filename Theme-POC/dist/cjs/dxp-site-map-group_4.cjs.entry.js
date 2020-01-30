'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const SiteMapGroup = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        const shadow = this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
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
            core$1.h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading)
            :
                core$1.h("a", { class: "hyperlink disable", "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** render site-map-list-group */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-group render() ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("div", { class: "group-heading" }, core$1.h("p", { class: "dxp-title-3" }, this.getHyperlink())), core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp-site-map-group .group-heading{width:100%;margin-bottom:2.1875rem}div.dxp-site-map-group .disable{pointer-events:none;cursor:not-allowed}\@media (max-width:576px){div.dxp-site-map-group .group-heading p{line-height:2rem}}"; }
};

const SiteMapGroupItem = class {
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
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink() {
        return ((this.href && this.href.length !== 0) ?
            core$1.h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading) :
            core$1.h("a", { class: "hyperlink disable", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** Render site-map-list-group-item */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-group-item render() ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir }, core$1.h("div", { class: "group-item" }, core$1.h("p", { class: "dxp-title-5" }, this.getHyperlink()), core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-site-map-group-item .group-item{margin-bottom:1.1875rem}div.dxp.dxp-site-map-group-item .disable{pointer-events:none;cursor:not-allowed}"; }
};

const SiteMapList = class {
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
    /** Render site-map-list */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-list render() ${"DEVELOPMENT"}`);
        return (core$1.h("ul", { class: this.base.componentClass(), dir: this.dir }, core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "ul.dxp.dxp-site-map-list{display:block;list-style:none}[dir=ltr] ul.dxp.dxp-site-map-list{margin-left:1.5rem}[dir=rtl] ul.dxp.dxp-site-map-list{margin-right:1.5rem}"; }
};

const SiteMapListItem = class {
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
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink() {
        return ((this.href && this.href.length !== 0) ?
            core$1.h("a", { class: "hyperlink", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading)
            :
                core$1.h("a", { class: "hyperlink disable", href: this.href, "aria-label": this.accessibility, title: this.heading }, this.heading));
    }
    /** Render site-map-list-item */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map-list-item render() ${"DEVELOPMENT"}`);
        return (core$1.h("li", { class: `${this.base.componentClass()} list-item`, dir: this.dir }, this.getHyperlink(), core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "li.dxp.dxp-site-map-list-item{text-decoration:none;overflow:hidden;margin-top:1.1875rem}li.dxp.dxp-site-map-list-item .disable{pointer-events:none;cursor:not-allowed}"; }
};

exports.dxp_site_map_group = SiteMapGroup;
exports.dxp_site_map_group_item = SiteMapGroupItem;
exports.dxp_site_map_list = SiteMapList;
exports.dxp_site_map_list_item = SiteMapListItem;
