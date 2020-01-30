import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-site-map */
export class SiteMap {
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
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
                this.siteMapData = await dxp.api(this.apiUrl, opts);
            }
            catch (error) {
                dxp.log.error(`in dxp-site-map web service error: ${error}`);
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
            return (h("dxp-site-map-list", null,
                " ",
                sublistItem.map(item => {
                    if (item.hideInNav !== 'true') {
                        return (h("dxp-site-map-list-item", { heading: item.title, href: item.link, accessibility: `${item.title} link under ${title}` }, item.child ? this.getListItem(item.child, item.title) : ''));
                    }
                })));
        }
    }
    /** get site map groups */
    getSiteMapGroup() {
        return this.siteMapData.pagesData.map(siteMapGroup => {
            if (siteMapGroup.hideInNav !== 'true') {
                return (h("dxp-site-map-group", { heading: siteMapGroup.title, href: siteMapGroup.link, accessibility: siteMapGroup.title }, siteMapGroup.child ? siteMapGroup.child.map(siteMapGroupItem => {
                    return this.getSiteMapGroupItem(siteMapGroupItem);
                }) : ''));
            }
        });
    }
    /** get site map group Item */
    getSiteMapGroupItem(siteMapGroupItem) {
        if (siteMapGroupItem.hideInNav !== 'true') {
            return (h("dxp-site-map-group-item", { heading: siteMapGroupItem.title, href: siteMapGroupItem.link, accessibility: siteMapGroupItem.title },
                h("dxp-site-map-list", null, siteMapGroupItem.child ? siteMapGroupItem.child.map(siteMapGroupListItem => {
                    if (siteMapGroupListItem.hideInNav !== 'true') {
                        return (h("dxp-site-map-list-item", { heading: siteMapGroupListItem.title, href: siteMapGroupListItem.link, accessibility: `${siteMapGroupListItem.title} link under ${siteMapGroupItem.title}` }, (siteMapGroupListItem.child && siteMapGroupListItem.child.length !== 0) ?
                            this.getListItem(siteMapGroupListItem.child, siteMapGroupListItem.title)
                            : ''));
                    }
                }) : '')));
        }
    }
    /** render the site-map */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site-map render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-map.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "site-map" },
                h("div", { class: "heading-wrapper" },
                    h("p", { class: "title dxp-title-6" }, this.eyebrow),
                    h("p", { class: "dxp-title-1 heading" }, this.heading)),
                h("div", { class: "column-wrapper" }, (this.siteMapData && this.siteMapData.pagesData.length !== 0) ? this.getSiteMapGroup() : h("slot", null)))));
    }
    static get is() { return "dxp-site-map"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-site-map.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-site-map.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "API URL"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "eyebrow": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Eyebrow title"
            },
            "attribute": "eyebrow",
            "reflect": false
        },
        "heading": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "heading of site map"
            },
            "attribute": "heading",
            "reflect": false
        },
        "siteMapData": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "hold multiple group items block that can be passed as json array"
            },
            "attribute": "site-map-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
