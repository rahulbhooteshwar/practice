import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const BREAD_CRUMB = 'dxp-breadcrumb';
const BREADCRUMB_ITEM = 'dxp-breadcrumb-item';
const HIDDEN_MD_DOWN = 'dxp-hidden-md-down';
/** dxp-breadcrumb */
export class Breadcrumb {
    constructor() {
        /** hides the current item in breadcrumb */
        this.hideCurrentPage = false;
        /** define the navigation start level */
        this.navStartLevel = 0;
        /** define the navigation root site path for sitemap service to fetch data */
        this.rootSitePath = '';
        /** show hidden navigation items which are marked as hidden */
        this.showHiddenNavItems = false;
    }
    /** watcher for breadcrumb items data */
    breadcrumbItemsChange() {
        this.dataLookup = this.breadcrumbItemsData;
        this.currentRouteUrl = this.getUrl();
        this.buildBreadcrumbItems();
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Breadcrumb', messages);
        if (document.querySelector(BREAD_CRUMB)) {
            this.childCount = document.querySelector(BREAD_CRUMB).children.length;
        }
        // fetch the data from service if items are not passed
        if (this.breadcrumbItemsData) {
            this.dataLookup = this.breadcrumbItemsData;
            this.currentRouteUrl = this.getUrl();
            this.buildBreadcrumbItems();
        }
        else if (this.apiUrl) {
            this.dataLookup = await this.getData();
            this.dataLookup = this.dataLookup.pagesData;
            this.currentRouteUrl = this.getUrl();
            this.buildBreadcrumbItems();
        }
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad() {
        this.hideItemsOnMobile();
        if (!this.breadcrumbItems) {
            const elmli = this.element.querySelectorAll(BREADCRUMB_ITEM);
            for (const i of Object.keys(elmli)) {
                const elmliItem = elmli[i].querySelector('li');
                elmliItem.style.zIndex = elmli.length - (Number(i) + 1);
            }
            elmli[elmli.length - 1] ? elmli[elmli.length - 1].querySelector('li').classList.add('current-page')
                : elmli[elmli.length - 1].querySelector('li').classList.add('current-page');
        }
        /** first child of breadcrumb item should not take left padding */
        const homeElement = this.base.shadowRootQuerySelector(this.element, BREADCRUMB_ITEM);
        if (homeElement) {
            this.base.shadowRootQuerySelector(homeElement, 'li').style.paddingLeft = '0px';
        }
    }
    /** Listen for the window resize changes */
    handleResizeEvent() {
        const windowWidth = window.innerWidth;
        if (windowWidth > 767) {
            const bredcrumbHomeIcon = this.element.querySelector(BREADCRUMB_ITEM).querySelector('li');
            bredcrumbHomeIcon.classList.remove(HIDDEN_MD_DOWN);
            const handleSlottedBIClass = this.element.querySelectorAll('.dxp-hidden-md-down');
            for (const item of handleSlottedBIClass) {
                item.classList.remove(HIDDEN_MD_DOWN);
            }
            const breadCrumbItemsdataval = this.element.querySelectorAll(BREADCRUMB_ITEM);
            for (const item of breadCrumbItemsdataval) {
                item.classList.remove(HIDDEN_MD_DOWN);
            }
        }
        else if (windowWidth < 767) {
            this.hideItemsOnMobile();
        }
    }
    /** Listen for the window url changes */
    onpopstate() {
        if (this.applicationName) {
            this.currentRouteUrl = this.getUrl();
            this.buildBreadcrumbItems();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** refresh Breadcrumb Items */
    async refreshBreadcrumbItems() {
        // refresh breadcrumbItems in case of any url change using routings on SPA
        this.currentRouteUrl = this.getUrl();
        this.buildBreadcrumbItems();
    }
    /** private method to build breadcrumb items */
    buildBreadcrumbItems() {
        this.breadcrumbItems = [];
        const routes = this.getRouteArray();
        let tempLookup = this.dataLookup;
        let routePath;
        routes.forEach((route, navIndex) => {
            if (tempLookup && tempLookup.length > 0) {
                routePath = (navIndex !== 0) ? `${routePath}/${route}` : route;
                tempLookup = this.searchAndAddItem(route.toLowerCase(), routePath, tempLookup, navIndex);
            }
        });
    }
    /** private method to get the site map data from service */
    getData() {
        try {
            return dxp.api(this.apiUrl);
        }
        catch (e) {
            dxp.log.error(this.element.tagName, 'getData()', `fetch failed for`, e);
        }
    }
    /** private method to check for # or / in url and return the array of token */
    getRouteArray() {
        let token = [];
        if (this.currentRouteUrl) {
            const index = this.currentRouteUrl.indexOf('#');
            token = index !== -1 ? this.currentRouteUrl.substr(index + 2).split('/') :
                this.currentRouteUrl.substr(1).split('/');
        }
        return token;
    }
    /** private method return the url */
    getUrl() {
        let url;
        if (location.hash.length > 0) {
            url = location.hash;
        }
        else {
            if (location.pathname.indexOf('.') !== -1) {
                url = location.pathname.split('.')[0];
            }
            else {
                url = location.pathname;
            }
        }
        return url.replace(this.rootSitePath, '');
    }
    /** For hiding breadcrumb items on mobile view */
    hideItemsOnMobile() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 767) {
            const breadCrumb = this.element.querySelectorAll(BREADCRUMB_ITEM);
            // for slotted data
            const handleSlottedBI = this.element.querySelectorAll(BREADCRUMB_ITEM);
            const breadcrumbHomeIcon = this.element.querySelector(BREADCRUMB_ITEM).querySelector('li');
            breadcrumbHomeIcon.classList.add(HIDDEN_MD_DOWN);
            for (let i = 0; i < breadCrumb.length - 2; i++) {
                breadCrumb[i].classList.add(HIDDEN_MD_DOWN);
            }
            if (handleSlottedBI) {
                for (let i = 0; i < handleSlottedBI.length - 2; i++) {
                    handleSlottedBI[i].querySelector('.dxp-breadcrumb-item').classList.add(HIDDEN_MD_DOWN);
                }
            }
        }
    }
    /** private method to search for route in lookup and add breadcrumb Item */
    searchAndAddItem(route, path, tempjson, navIndex) {
        let childNodeArray = [];
        // handle route with params
        const routeWithoutParam = route.indexOf('?') >= 0 ? route.substring(0, route.indexOf('?')) : route;
        tempjson.find(item => {
            if (item.linkId.toLowerCase() === routeWithoutParam) {
                const breadcrumbItem = {
                    link: item.link,
                    linkId: item.linkId,
                    routePath: path,
                    title: item.title,
                    showNavItem: this.showHiddenNavItems ? true : !JSON.parse(item.hideInNav)
                };
                // Navigation start level
                if (navIndex >= this.navStartLevel) {
                    this.breadcrumbItems.push(breadcrumbItem);
                }
                if (item.child) {
                    // return the child node
                    childNodeArray = item.child;
                }
                return childNodeArray;
            }
        });
        return childNodeArray;
    }
    /** Render the breadcrumb */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-breadcrumb render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-breadcrumb.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} breadcrumb-nav`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("nav", { "aria-label": dxp.i18n.t('Breadcrumb:label') },
                h("ul", { class: "dxp-breadcrumb-list sc-dxp-breadcrumb" },
                    this.breadcrumbItems &&
                        h("dxp-breadcrumb-item", { "index-val": this.breadcrumbItems.length, link: location.origin, "accessibility-text": "Home", "link-title": "Home" }),
                    this.breadcrumbItems
                        ? this.breadcrumbItems.map((item, index) => {
                            if (item.showNavItem) {
                                return (h("dxp-breadcrumb-item", { "index-val": this.breadcrumbItems.length - (index + 1), "is-current-page": index === this.breadcrumbItems.length - 1 ? true : false, link: item.link, "accessibility-text": item.title, "link-title": item.title, "hide-current-page": this.hideCurrentPage }));
                            }
                        })
                        : [this.childCount &&
                                h("dxp-breadcrumb-item", { link: "#", "accessibility-text": `${dxp.i18n.t('Breadcrumb:Home')}`, "link-title": `${dxp.i18n.t('Breadcrumb:Home')}` }),
                            h("slot", null)]))));
    }
    static get is() { return "dxp-breadcrumb"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-breadcrumb.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-breadcrumb.css"]
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
                "text": "api url"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "applicationName": {
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
                "text": "define for which site/application sitemap is required"
            },
            "attribute": "application-name",
            "reflect": false
        },
        "hideCurrentPage": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "hides the current item in breadcrumb"
            },
            "attribute": "hide-current-page",
            "reflect": false,
            "defaultValue": "false"
        },
        "navStartLevel": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "define the navigation start level"
            },
            "attribute": "nav-start-level",
            "reflect": false,
            "defaultValue": "0"
        },
        "rootSitePath": {
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
                "text": "define the navigation root site path for sitemap service to fetch data"
            },
            "attribute": "root-site-path",
            "reflect": false,
            "defaultValue": "''"
        },
        "showHiddenNavItems": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "show hidden navigation items which are marked as hidden"
            },
            "attribute": "show-hidden-nav-items",
            "reflect": false,
            "defaultValue": "false"
        },
        "breadcrumbItemsData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "checkboxes items data"
            },
            "attribute": "breadcrumb-items-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "breadcrumbItems": {},
        "dataLookup": {},
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get methods() { return {
        "refreshBreadcrumbItems": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "refresh Breadcrumb Items",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "breadcrumbItemsData",
            "methodName": "breadcrumbItemsChange"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleResizeEvent",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "popstate",
            "method": "onpopstate",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
