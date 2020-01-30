var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-4ed38ef5.js';
var BREAD_CRUMB = 'dxp-breadcrumb';
var BREADCRUMB_ITEM = 'dxp-breadcrumb-item';
var HIDDEN_MD_DOWN = 'dxp-hidden-md-down';
var Breadcrumb = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
    class_1.prototype.breadcrumbItemsChange = function () {
        this.dataLookup = this.breadcrumbItemsData;
        this.currentRouteUrl = this.getUrl();
        this.buildBreadcrumbItems();
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'Breadcrumb', messages);
                        if (document.querySelector(BREAD_CRUMB)) {
                            this.childCount = document.querySelector(BREAD_CRUMB).children.length;
                        }
                        if (!this.breadcrumbItemsData) return [3 /*break*/, 1];
                        this.dataLookup = this.breadcrumbItemsData;
                        this.currentRouteUrl = this.getUrl();
                        this.buildBreadcrumbItems();
                        return [3 /*break*/, 3];
                    case 1:
                        if (!this.apiUrl) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.getData()];
                    case 2:
                        _a.dataLookup = _b.sent();
                        this.dataLookup = this.dataLookup.pagesData;
                        this.currentRouteUrl = this.getUrl();
                        this.buildBreadcrumbItems();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    class_1.prototype.componentDidLoad = function () {
        this.hideItemsOnMobile();
        if (!this.breadcrumbItems) {
            var elmli = this.element.querySelectorAll(BREADCRUMB_ITEM);
            for (var _i = 0, _a = Object.keys(elmli); _i < _a.length; _i++) {
                var i = _a[_i];
                var elmliItem = elmli[i].querySelector('li');
                elmliItem.style.zIndex = elmli.length - (Number(i) + 1);
            }
            elmli[elmli.length - 1] ? elmli[elmli.length - 1].querySelector('li').classList.add('current-page')
                : elmli[elmli.length - 1].querySelector('li').classList.add('current-page');
        }
        /** first child of breadcrumb item should not take left padding */
        var homeElement = this.base.shadowRootQuerySelector(this.element, BREADCRUMB_ITEM);
        if (homeElement) {
            this.base.shadowRootQuerySelector(homeElement, 'li').style.paddingLeft = '0px';
        }
    };
    /** Listen for the window resize changes */
    class_1.prototype.handleResizeEvent = function () {
        var windowWidth = window.innerWidth;
        if (windowWidth > 767) {
            var bredcrumbHomeIcon = this.element.querySelector(BREADCRUMB_ITEM).querySelector('li');
            bredcrumbHomeIcon.classList.remove(HIDDEN_MD_DOWN);
            var handleSlottedBIClass = this.element.querySelectorAll('.dxp-hidden-md-down');
            for (var _i = 0, handleSlottedBIClass_1 = handleSlottedBIClass; _i < handleSlottedBIClass_1.length; _i++) {
                var item = handleSlottedBIClass_1[_i];
                item.classList.remove(HIDDEN_MD_DOWN);
            }
            var breadCrumbItemsdataval = this.element.querySelectorAll(BREADCRUMB_ITEM);
            for (var _a = 0, breadCrumbItemsdataval_1 = breadCrumbItemsdataval; _a < breadCrumbItemsdataval_1.length; _a++) {
                var item = breadCrumbItemsdataval_1[_a];
                item.classList.remove(HIDDEN_MD_DOWN);
            }
        }
        else if (windowWidth < 767) {
            this.hideItemsOnMobile();
        }
    };
    /** Listen for the window url changes */
    class_1.prototype.onpopstate = function () {
        if (this.applicationName) {
            this.currentRouteUrl = this.getUrl();
            this.buildBreadcrumbItems();
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** refresh Breadcrumb Items */
    class_1.prototype.refreshBreadcrumbItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // refresh breadcrumbItems in case of any url change using routings on SPA
                this.currentRouteUrl = this.getUrl();
                this.buildBreadcrumbItems();
                return [2 /*return*/];
            });
        });
    };
    /** private method to build breadcrumb items */
    class_1.prototype.buildBreadcrumbItems = function () {
        var _this = this;
        this.breadcrumbItems = [];
        var routes = this.getRouteArray();
        var tempLookup = this.dataLookup;
        var routePath;
        routes.forEach(function (route, navIndex) {
            if (tempLookup && tempLookup.length > 0) {
                routePath = (navIndex !== 0) ? routePath + "/" + route : route;
                tempLookup = _this.searchAndAddItem(route.toLowerCase(), routePath, tempLookup, navIndex);
            }
        });
    };
    /** private method to get the site map data from service */
    class_1.prototype.getData = function () {
        try {
            return dxp.api(this.apiUrl);
        }
        catch (e) {
            dxp.log.error(this.element.tagName, 'getData()', "fetch failed for", e);
        }
    };
    /** private method to check for # or / in url and return the array of token */
    class_1.prototype.getRouteArray = function () {
        var token = [];
        if (this.currentRouteUrl) {
            var index = this.currentRouteUrl.indexOf('#');
            token = index !== -1 ? this.currentRouteUrl.substr(index + 2).split('/') :
                this.currentRouteUrl.substr(1).split('/');
        }
        return token;
    };
    /** private method return the url */
    class_1.prototype.getUrl = function () {
        var url;
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
    };
    /** For hiding breadcrumb items on mobile view */
    class_1.prototype.hideItemsOnMobile = function () {
        var windowWidth = window.innerWidth;
        if (windowWidth < 767) {
            var breadCrumb = this.element.querySelectorAll(BREADCRUMB_ITEM);
            // for slotted data
            var handleSlottedBI = this.element.querySelectorAll(BREADCRUMB_ITEM);
            var breadcrumbHomeIcon = this.element.querySelector(BREADCRUMB_ITEM).querySelector('li');
            breadcrumbHomeIcon.classList.add(HIDDEN_MD_DOWN);
            for (var i = 0; i < breadCrumb.length - 2; i++) {
                breadCrumb[i].classList.add(HIDDEN_MD_DOWN);
            }
            if (handleSlottedBI) {
                for (var i = 0; i < handleSlottedBI.length - 2; i++) {
                    handleSlottedBI[i].querySelector('.dxp-breadcrumb-item').classList.add(HIDDEN_MD_DOWN);
                }
            }
        }
    };
    /** private method to search for route in lookup and add breadcrumb Item */
    class_1.prototype.searchAndAddItem = function (route, path, tempjson, navIndex) {
        var _this = this;
        var childNodeArray = [];
        // handle route with params
        var routeWithoutParam = route.indexOf('?') >= 0 ? route.substring(0, route.indexOf('?')) : route;
        tempjson.find(function (item) {
            if (item.linkId.toLowerCase() === routeWithoutParam) {
                var breadcrumbItem = {
                    link: item.link,
                    linkId: item.linkId,
                    routePath: path,
                    title: item.title,
                    showNavItem: _this.showHiddenNavItems ? true : !JSON.parse(item.hideInNav)
                };
                // Navigation start level
                if (navIndex >= _this.navStartLevel) {
                    _this.breadcrumbItems.push(breadcrumbItem);
                }
                if (item.child) {
                    // return the child node
                    childNodeArray = item.child;
                }
                return childNodeArray;
            }
        });
        return childNodeArray;
    };
    /** Render the breadcrumb */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-breadcrumb render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/dxp.min.css" }),
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/" + this.theme + ".min.css" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-breadcrumb.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass() + " breadcrumb-nav", dir: this.dir, "data-theme": this.theme }, styles, h("nav", { "aria-label": dxp.i18n.t('Breadcrumb:label') }, h("ul", { class: "dxp-breadcrumb-list sc-dxp-breadcrumb" }, this.breadcrumbItems &&
            h("dxp-breadcrumb-item", { "index-val": this.breadcrumbItems.length, link: location.origin, "accessibility-text": "Home", "link-title": "Home" }), this.breadcrumbItems
            ? this.breadcrumbItems.map(function (item, index) {
                if (item.showNavItem) {
                    return (h("dxp-breadcrumb-item", { "index-val": _this.breadcrumbItems.length - (index + 1), "is-current-page": index === _this.breadcrumbItems.length - 1 ? true : false, link: item.link, "accessibility-text": item.title, "link-title": item.title, "hide-current-page": _this.hideCurrentPage }));
                }
            })
            : [this.childCount &&
                    h("dxp-breadcrumb-item", { link: "#", "accessibility-text": "" + dxp.i18n.t('Breadcrumb:Home'), "link-title": "" + dxp.i18n.t('Breadcrumb:Home') }),
                h("slot", null)]))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "breadcrumbItemsData": ["breadcrumbItemsChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-breadcrumb{padding:30px 0 32px 0}div.dxp.dxp-breadcrumb.breadcrumb-nav .dxp-breadcrumb-list{display:-ms-flexbox;display:flex;margin:0;-ms-flex-align:center;align-items:center}div.dxp.dxp-breadcrumb.breadcrumb-nav dxp-breadcrumb-item:last-child li:hover{background:none}\@media (-ms-high-contrast:none){div.dxp.dxp-breadcrumb .dxp-breadcrumb-item.sc-dxp-breadcrumb a,div.dxp.dxp-breadcrumb .dxp-breadcrumb-item span,div.dxp.dxp-breadcrumb ::-ms-backdrop{padding-top:18px}}\@media screen and (max-width:767px){div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li{padding-left:10px}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a{position:relative}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a:after,div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a:before{content:\"\";display:block;position:relative;width:10px;height:1px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:-3px}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a:after{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:3px}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item div li a span{display:none}div.dxp.dxp-breadcrumb .dxp-breadcrumb-item.sc-dxp-breadcrumb a,div.dxp.dxp-breadcrumb .dxp-breadcrumb-item span,div.dxp.dxp-breadcrumb ::-ms-backdrop{padding-top:6px}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Breadcrumb as dxp_breadcrumb };
