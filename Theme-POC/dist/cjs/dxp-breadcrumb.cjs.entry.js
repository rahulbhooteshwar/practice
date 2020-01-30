'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-57d04e27.js');

const BREAD_CRUMB = 'dxp-breadcrumb';
const BREADCRUMB_ITEM = 'dxp-breadcrumb-item';
const HIDDEN_MD_DOWN = 'dxp-hidden-md-down';
const Breadcrumb = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        this.base.i18Init(core.dxp, 'Breadcrumb', messages.messages);
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
            return core.dxp.api(this.apiUrl);
        }
        catch (e) {
            core.dxp.log.error(this.element.tagName, 'getData()', `fetch failed for`, e);
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
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-breadcrumb render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-breadcrumb.min.css` })]
        ];
        return (core.h("div", { class: `${this.base.componentClass()} breadcrumb-nav`, dir: this.dir, "data-theme": this.theme }, styles, core.h("nav", { "aria-label": core.dxp.i18n.t('Breadcrumb:label') }, core.h("ul", { class: "dxp-breadcrumb-list sc-dxp-breadcrumb" }, this.breadcrumbItems &&
            core.h("dxp-breadcrumb-item", { "index-val": this.breadcrumbItems.length, link: location.origin, "accessibility-text": "Home", "link-title": "Home" }), this.breadcrumbItems
            ? this.breadcrumbItems.map((item, index) => {
                if (item.showNavItem) {
                    return (core.h("dxp-breadcrumb-item", { "index-val": this.breadcrumbItems.length - (index + 1), "is-current-page": index === this.breadcrumbItems.length - 1 ? true : false, link: item.link, "accessibility-text": item.title, "link-title": item.title, "hide-current-page": this.hideCurrentPage }));
                }
            })
            : [this.childCount &&
                    core.h("dxp-breadcrumb-item", { link: "#", "accessibility-text": `${core.dxp.i18n.t('Breadcrumb:Home')}`, "link-title": `${core.dxp.i18n.t('Breadcrumb:Home')}` }),
                core.h("slot", null)]))));
    }
    get element() { return core.getElement(this); }
    static get watchers() { return {
        "breadcrumbItemsData": ["breadcrumbItemsChange"]
    }; }
    static get style() { return "div.dxp.dxp-breadcrumb{padding:30px 0 32px 0}div.dxp.dxp-breadcrumb.breadcrumb-nav .dxp-breadcrumb-list{display:-ms-flexbox;display:flex;margin:0;-ms-flex-align:center;align-items:center}div.dxp.dxp-breadcrumb.breadcrumb-nav dxp-breadcrumb-item:last-child li:hover{background:none}\@media (-ms-high-contrast:none){div.dxp.dxp-breadcrumb .dxp-breadcrumb-item.sc-dxp-breadcrumb a,div.dxp.dxp-breadcrumb .dxp-breadcrumb-item span,div.dxp.dxp-breadcrumb ::-ms-backdrop{padding-top:18px}}\@media screen and (max-width:767px){div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li{padding-left:10px}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a{position:relative}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a:after,div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a:before{content:\"\";display:block;position:relative;width:10px;height:1px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:-3px}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a:after{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:3px}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a span{display:none}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item.sc-dxp-breadcrumb a,div.dxp.dxp-breadcrumb .dxp-breadcrumb-item span,div.dxp.dxp-breadcrumb ::-ms-backdrop{padding-top:6px}}"; }
};

exports.dxp_breadcrumb = Breadcrumb;
