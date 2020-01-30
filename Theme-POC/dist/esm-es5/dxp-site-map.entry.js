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
var SiteMap = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shadow, href, opts, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        shadow = this.element ? this.element : this.element;
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        if (!this.apiUrl) return [3 /*break*/, 4];
                        opts = {
                            mode: 'cors',
                            method: 'get',
                            headers: {
                                'Content-Type': 'text/plain'
                            }
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        /** Need changes in api.ts to support relative and absolute URL */
                        _a = this;
                        return [4 /*yield*/, dxp.api(this.apiUrl, opts)];
                    case 2:
                        /** Need changes in api.ts to support relative and absolute URL */
                        _a.siteMapData = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        dxp.log.error("in dxp-site-map web service error: " + error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** actions to perform after component load */
    class_1.prototype.componentDidLoad = function () {
        var dxpSiteMapGroups = this.element.querySelectorAll('dxp-site-map-group');
        dxpSiteMapGroups = Array.from(dxpSiteMapGroups); // converting from node list to array
        if (dxpSiteMapGroups.length > 0) {
            dxpSiteMapGroups = dxpSiteMapGroups.slice(1, dxpSiteMapGroups.length); // considering group items expect first one for adding hr tag between group
            for (var _i = 0, dxpSiteMapGroups_1 = dxpSiteMapGroups; _i < dxpSiteMapGroups_1.length; _i++) {
                var dxpSiteMapGroup = dxpSiteMapGroups_1[_i];
                dxpSiteMapGroup.setAttribute('show-line-between-groups', true);
            }
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** get nested list item */
    class_1.prototype.getListItem = function (sublistItem, title) {
        var _this = this;
        if (sublistItem) {
            return (h("dxp-site-map-list", null, " ", sublistItem.map(function (item) {
                if (item.hideInNav !== 'true') {
                    return (h("dxp-site-map-list-item", { heading: item.title, href: item.link, accessibility: item.title + " link under " + title }, item.child ? _this.getListItem(item.child, item.title) : ''));
                }
            })));
        }
    };
    /** get site map groups */
    class_1.prototype.getSiteMapGroup = function () {
        var _this = this;
        return this.siteMapData.pagesData.map(function (siteMapGroup) {
            if (siteMapGroup.hideInNav !== 'true') {
                return (h("dxp-site-map-group", { heading: siteMapGroup.title, href: siteMapGroup.link, accessibility: siteMapGroup.title }, siteMapGroup.child ? siteMapGroup.child.map(function (siteMapGroupItem) {
                    return _this.getSiteMapGroupItem(siteMapGroupItem);
                }) : ''));
            }
        });
    };
    /** get site map group Item */
    class_1.prototype.getSiteMapGroupItem = function (siteMapGroupItem) {
        var _this = this;
        if (siteMapGroupItem.hideInNav !== 'true') {
            return (h("dxp-site-map-group-item", { heading: siteMapGroupItem.title, href: siteMapGroupItem.link, accessibility: siteMapGroupItem.title }, h("dxp-site-map-list", null, siteMapGroupItem.child ? siteMapGroupItem.child.map(function (siteMapGroupListItem) {
                if (siteMapGroupListItem.hideInNav !== 'true') {
                    return (h("dxp-site-map-list-item", { heading: siteMapGroupListItem.title, href: siteMapGroupListItem.link, accessibility: siteMapGroupListItem.title + " link under " + siteMapGroupItem.title }, (siteMapGroupListItem.child && siteMapGroupListItem.child.length !== 0) ?
                        _this.getListItem(siteMapGroupListItem.child, siteMapGroupListItem.title)
                        : ''));
                }
            }) : '')));
        }
    };
    /** render the site-map */
    class_1.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-site-map render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-site-map.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "site-map" }, h("div", { class: "heading-wrapper" }, h("p", { class: "title dxp-title-6" }, this.eyebrow), h("p", { class: "dxp-title-1 heading" }, this.heading)), h("div", { class: "column-wrapper" }, (this.siteMapData && this.siteMapData.pagesData.length !== 0) ? this.getSiteMapGroup() : h("slot", null)))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-site-map .heading-wrapper{width:100%;margin-bottom:5.75rem}div.dxp.dxp-site-map .column-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-site-map .title{margin-bottom:.5625rem;letter-spacing:.1125rem}\@media (max-width:576px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}div.dxp.dxp-site-map .heading-wrapper{margin-bottom:3rem}}\@media (min-width:768px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}}\@media (min-width:992px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 33%;flex:0 0 33%;max-width:33%}}\@media (min-width:1200px){div.dxp.dxp-site-map dxp-site-map-group{-webkit-box-flex:0;-ms-flex:0 0 33%;flex:0 0 33%;max-width:33%}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { SiteMap as dxp_site_map };
