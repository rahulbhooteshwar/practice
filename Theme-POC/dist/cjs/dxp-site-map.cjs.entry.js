'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const SiteMap = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        if (this.apiUrl) {
            const opts = {
                mode: 'cors',
                method: 'get',
                headers: {
                    'Content-Type': 'text/plain'
                }
            };
            try {
                /** Need changes in api.ts to support relative and absolute URL */
                this.siteMapData = await core$1.dxp.api(this.apiUrl, opts);
            }
            catch (error) {
                core$1.dxp.log.error(`in dxp-site-map web service error: ${error}`);
            }
        }
    }
    /** actions to perform after component load */
    componentDidLoad() {
        let dxpSiteMapGroups = this.element.querySelectorAll('dxp-site-map-group');
        dxpSiteMapGroups = Array.from(dxpSiteMapGroups); // converting from node list to array
        if (dxpSiteMapGroups.length > 0) {
            dxpSiteMapGroups = dxpSiteMapGroups.slice(1, dxpSiteMapGroups.length); // considering group items expect first one for adding hr tag between group
            for (const dxpSiteMapGroup of dxpSiteMapGroups) {
                dxpSiteMapGroup.setAttribute('show-line-between-groups', true);
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** get nested list item */
    getListItem(sublistItem, title) {
        if (sublistItem) {
            return (core$1.h("dxp-site-map-list", null, " ", sublistItem.map(item => {
                if (item.hideInNav !== 'true') {
                    return (core$1.h("dxp-site-map-list-item", { heading: item.title, href: item.link, accessibility: `${item.title} link under ${title}` }, item.child ? this.getListItem(item.child, item.title) : ''));
                }
            })));
        }
    }
    /** get site map groups */
    getSiteMapGroup() {
        return this.siteMapData.pagesData.map(siteMapGroup => {
            if (siteMapGroup.hideInNav !== 'true') {
                return (core$1.h("dxp-site-map-group", { heading: siteMapGroup.title, href: siteMapGroup.link, accessibility: siteMapGroup.title }, siteMapGroup.child ? siteMapGroup.child.map(siteMapGroupItem => {
                    return this.getSiteMapGroupItem(siteMapGroupItem);
                }) : ''));
            }
        });
    }
    /** get site map group Item */
    getSiteMapGroupItem(siteMapGroupItem) {
        if (siteMapGroupItem.hideInNav !== 'true') {
            return (core$1.h("dxp-site-map-group-item", { heading: siteMapGroupItem.title, href: siteMapGroupItem.link, accessibility: siteMapGroupItem.title }, core$1.h("dxp-site-map-list", null, siteMapGroupItem.child ? siteMapGroupItem.child.map(siteMapGroupListItem => {
                if (siteMapGroupListItem.hideInNav !== 'true') {
                    return (core$1.h("dxp-site-map-list-item", { heading: siteMapGroupListItem.title, href: siteMapGroupListItem.link, accessibility: `${siteMapGroupListItem.title} link under ${siteMapGroupItem.title}` }, (siteMapGroupListItem.child && siteMapGroupListItem.child.length !== 0) ?
                        this.getListItem(siteMapGroupListItem.child, siteMapGroupListItem.title)
                        : ''));
                }
            }) : '')));
        }
    }
    /** render the site-map */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-map.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "site-map" }, core$1.h("div", { class: "heading-wrapper" }, core$1.h("p", { class: "title dxp-title-6" }, this.eyebrow), core$1.h("p", { class: "dxp-title-1 heading" }, this.heading)), core$1.h("div", { class: "column-wrapper" }, (this.siteMapData && this.siteMapData.pagesData.length !== 0) ? this.getSiteMapGroup() : core$1.h("slot", null)))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-site-map .heading-wrapper{width:100%;margin-bottom:5.75rem}div.dxp.dxp-site-map .column-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-site-map .title{margin-bottom:.5625rem;letter-spacing:.1125rem}\@media (max-width:576px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}div.dxp.dxp-site-map .heading-wrapper{margin-bottom:3rem}}\@media (min-width:768px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}}\@media (min-width:992px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 33%;flex:0 0 33%;max-width:33%}}\@media (min-width:1200px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 33%;flex:0 0 33%;max-width:33%}}"; }
};

exports.dxp_site_map = SiteMap;
