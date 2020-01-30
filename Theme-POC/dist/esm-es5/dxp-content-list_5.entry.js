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
var CONTENT_LIST_ITEM = 'dxp-content-list-item';
var ContentList = /** @class */ (function () {
    function ContentList(hostRef) {
        registerInstance(this, hostRef);
        /** list item alignment */
        this.orientation = 'vertical';
    }
    /** Listener that looks for content list items object to be assigned/changed externally */
    ContentList.prototype.contentItemsChangeHandler = function () {
        if (this.contentListItems) {
            this.base.createNestedMarkup(this.linksContainer, CONTENT_LIST_ITEM, this.contentListItems);
        }
    };
    /** actions to perform prior to component load */
    ContentList.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-content-list.min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** actions to perform after component load */
    ContentList.prototype.componentDidLoad = function () {
        this.contentItemsChangeHandler();
        var dxpContentListItemsWithSlot = this.element.querySelectorAll(CONTENT_LIST_ITEM).length ?
            this.element.querySelectorAll(CONTENT_LIST_ITEM)
            :
                this.element.querySelectorAll(CONTENT_LIST_ITEM);
        var ele = dxpContentListItemsWithSlot.length - 1;
        if (dxpContentListItemsWithSlot.length !== 0) {
            dxpContentListItemsWithSlot[ele].classList.add('margin-bottom-0');
            dxpContentListItemsWithSlot[ele].componentOnReady().then(function (res) {
                res.querySelector('.dxp-content-list-item').classList.add('margin-bottom-0');
            });
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    ContentList.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the content list */
    ContentList.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-content-list render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("div", { class: "header-tag" }, this.titleText && (this.href ? h("h4", { class: this.headerSize }, h("a", { href: this.href }, this.titleText)) :
            h("h4", { class: this.headerSize }, this.titleText))), h("div", { class: "dxp-content-list-items sc-dxp-content-list " + (this.orientation ? this.orientation : 'vertical'), ref: function (el) { return _this.linksContainer = el; } }, h("slot", null))));
    };
    Object.defineProperty(ContentList.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentList, "watchers", {
        get: function () {
            return {
                "contentListItems": ["contentItemsChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentList, "style", {
        get: function () { return "div.dxp.dxp-content-list .header-tag h4{margin-bottom:1.2rem}div.dxp.dxp-content-list .dxp-content-list-items.horizontal{display:-ms-flexbox;display:flex}div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item:not(:last-child) .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.horizontal ::slotted(dxp-content-list-item:not(:last-child)) .dxp-content-list-item.sc-dxp-content-list{margin-right:2rem}div.dxp.dxp-content-list .dxp-content-list-items.sc-dxp-content-list.vertical .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.sc-dxp-content-list.vertical ::slotted(dxp-content-list-item:not(:last-child)){margin-bottom:.625rem}div.dxp.dxp-content-list .dxp-content-list-items.sc-dxp-content-list.vertical .margin-bottom-0.sc-dxp-content-list{margin-bottom:0}\@media screen and (max-width:992px){div.dxp.dxp-content-list .dxp-content-list-items.horizontal{display:block}div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item{margin-right:0}div.dxp.dxp-content-list .dxp-content-list-items .dxp-content-list-item,div.dxp.dxp-content-list .dxp-content-list-items ::slotted(dxp-content-list-item:not(:last-child)){margin:0 0 .625rem 0;display:block}div.dxp.dxp-content-list .dxp-content-list-items .dxp-content-list-item.sc-dxp-content-list{margin-bottom:.625rem}div.dxp.dxp-content-list .dxp-content-list-items .margin-bottom-0.sc-dxp-content-list{margin-bottom:0}div.dxp.dxp-content-list .dxp-content-list-items{margin-right:0}div.dxp.dxp-content-list .dxp-content-list-items dxp-content-list-item:last-child .dxp-content-list-item{margin-bottom:0}}\@media screen and (min-width:993px){div.dxp.dxp-content-list .dxp-content-list-items.horizontal{display:-ms-flexbox;display:flex}div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.horizontal ::slotted(dxp-content-list-item:not(:last-child)){margin-right:2rem}div.dxp.dxp-content-list .dxp-content-list-items.vertical{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-content-list .dxp-content-list-items.vertical .dxp-content-list-item.sc-dxp-content-list:not(:last-child){margin-bottom:.75rem}}\@media (min-width:993px) and (max-width:1200px){div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.horizontal ::slotted(dxp-content-list-item:not(:last-child)){margin-right:1rem}}\@media (min-width:993px) and (max-width:1200px){div.dxp.dxp-content-list[dir=rtl] .dxp-content-list-items.horizontal .dxp-content-list-item.sc-dxp-content-list:first-child{margin-right:0}}"; },
        enumerable: true,
        configurable: true
    });
    return ContentList;
}());
var ContentListItem = /** @class */ (function () {
    function ContentListItem(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    ContentListItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to perform after component load */
    ContentListItem.prototype.componentDidLoad = function () {
        // For supporting RTE, this code will work fine for the normal text too
        if (this.element) {
            this.element.querySelector('.sub-title').innerHTML = this.subTitle;
        }
        else {
            this.element.querySelector('.sub-title').innerHTML = this.subTitle;
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    ContentListItem.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the content list items */
    ContentListItem.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-content-list-items render() : " + "DEVELOPMENT");
        return ([
            h("div", { class: this.base.componentClass() + " sc-dxp-content-list", "data-theme": this.theme }, (this.href && this.href !== '') ?
                h("a", { class: "sub-title", href: this.href, "aria-label": this.ariaLabel, target: this.target ? '_blank' : '_self' }, this.subTitle)
                : h("span", { class: "sub-title" }, this.subTitle))
        ]);
    };
    Object.defineProperty(ContentListItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentListItem, "style", {
        get: function () { return ".dxp.dxp-content-list-item a,.dxp.dxp-content-list-item span.sub-title{display:inline-block}"; },
        enumerable: true,
        configurable: true
    });
    return ContentListItem;
}());
var Copyright = /** @class */ (function () {
    function Copyright(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    Copyright.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /**
     * click listener for routing events on anchor tag
     */
    Copyright.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the copyright */
    Copyright.prototype.render = function () {
        /* istanbul ignore next */
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-copyright render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme &&
                    h("link", { rel: "stylesheet", href: "" })
            ],
            [this.theme &&
                    h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-copyright.min.css" })
            ]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.text && h("p", null, this.text), h("slot", null)));
    };
    Object.defineProperty(Copyright.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Copyright, "style", {
        get: function () { return "div.dxp.dxp-copyright p{margin-bottom:0}"; },
        enumerable: true,
        configurable: true
    });
    return Copyright;
}());
var CountryLanguageSelector = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** selected country */
        this.selectedCountry = 'United States';
        /** selected Language */
        this.selectedLanguage = 'English';
        /** target url with local */
        this.targetUrlWithLocale = 'en-us';
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.countryLanguageData = typeof (this.countryLanguageData) === 'string' ? JSON.parse(this.countryLanguageData) : this.countryLanguageData;
                        this.base = new BaseComponent(this, dxp);
                        if (!this.endPointUrl) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, dxp.api(this.endPointUrl)];
                    case 2:
                        _a.countryLanguageData = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        dxp.log.error(this.element.tagName, 'componentWillLoad()', "fetch failed for " + this.endPointUrl, err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** lifecycle hook */
    class_1.prototype.componentDidLoad = function () {
        this.initializeCountryLanguageData();
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** populate the value of href in <a> according to targetUrl */
    class_1.prototype.handleTarget = function (targetUrl) {
        return targetUrl ? targetUrl + "?locale=" + this.targetUrlWithLocale : 'javascript:void(0)';
    };
    /** initialize component data */
    class_1.prototype.initializeCountryLanguageData = function () {
        var _this = this;
        if (this.countryLanguageData && this.countryLanguageData.regions) {
            this.countryLanguageData.regions.forEach(function (region) {
                if (region && region.countries) {
                    /* tslint:disable-next-line */
                    region.countries.forEach(function (obj) {
                        /* tslint:disable-next-line */
                        obj.locales.forEach(function (loc) {
                            if (dxp.locale() === loc.locale) {
                                _this.selectedCountry = obj.country;
                                _this.selectedLanguage = loc.language;
                                _this.targetUrlWithLocale = loc.locale;
                            }
                        });
                    });
                }
            });
        }
    };
    /** Updating first char in upper case and rest in lower case of a word */
    class_1.prototype.toTitlelCase = function (str) {
        return str.split(' ').map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };
    /** Render the country-language-selector */
    class_1.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-country-language-selector render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-country-language-selector.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("a", { href: this.targetUrl ? this.handleTarget(this.targetUrl) : '#', target: "_parent" }, h("span", { class: "globe-wrapper lang-globe" }), h("span", { class: "country dxp-font-size-md" }, h("span", null, this.toTitlelCase(this.selectedCountry), " "), h("span", { "aria-hidden": "true" }, " - "), h("span", { class: "lang small" }, " ", this.toTitlelCase(this.selectedLanguage))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-country-language-selector a>span{display:table-cell}div.dxp.dxp-country-language-selector a>span:last-child{padding-left:.532rem}div.dxp.dxp-country-language-selector a:focus{outline:1px solid}\@media (min-width:993px) and (max-width:1200px){div.dxp.dxp-country-language-selector .country{width:115px}}div.dxp.dxp-country-language-selector[dir=rtl] a>span:last-child{padding:0 .532rem 0 0}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var SOCIAL_LINKS_ITEM_CLASS = '.dxp-social-links-item';
var SOCIAL_LINKS_ITEM = 'dxp-social-links-item';
var SocialLinks = /** @class */ (function () {
    function SocialLinks(hostRef) {
        registerInstance(this, hostRef);
        /** orientation of icons list (horizontal/ vertical) */
        this.orientation = 'horizontal';
    }
    /** Listener that looks for links object to be assigned/changed externally */
    SocialLinks.prototype.socialLinksChangeHandler = function () {
        var _this = this;
        if (this.selectedLinksItems) {
            var props = this.selectedLinksItems.map(function (it) { return (Object.assign(Object.assign({}, it), { socialType: _this.socialType })); });
            this.base.createNestedMarkup(this.linksContainer, SOCIAL_LINKS_ITEM_CLASS, props);
        }
    };
    /** actions to be performed prior to component loading */
    SocialLinks.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (this.socialLinksItems) {
            this.socialLinksItems = (typeof this.socialLinksItems === 'string') ? JSON.parse(this.socialLinksItems) : this.socialLinksItems;
        }
    };
    /** actions to be performed after component load */
    SocialLinks.prototype.componentDidLoad = function () {
        var _this = this;
        var socialElements = this.element.querySelectorAll(SOCIAL_LINKS_ITEM);
        if (socialElements.length > 0) {
            for (var _i = 0, socialElements_1 = socialElements; _i < socialElements_1.length; _i++) {
                var socialEle = socialElements_1[_i];
                socialEle.setAttribute('social-type', this.socialType);
            }
        }
        if (this.socialLinksItems && this.socialLinksItems.length > 0) {
            this.selectedLinksItems = [];
            this.socialLinksItems.forEach(function (socialLinksItem) {
                if (socialLinksItem['enable-sharing']) {
                    _this.selectedLinksItems.push(socialLinksItem);
                }
            });
        }
        this.socialLinksChangeHandler();
    };
    /**
     * click listener for routing events on anchor tag
     */
    SocialLinks.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** render social links */
    SocialLinks.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-social-links.min.css" })]
        ];
        this.socialItems = this.socialType === 'follow' ? this.socialLinksItems : this.selectedLinksItems;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-social-links render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir }, styles, this.socialLabel &&
            h("p", null, this.socialLabel), h("div", { class: this.orientation }, this.socialItems
            ? this.socialItems.map(function (item) { return h("dxp-social-links-item", { "social-type": _this.socialType, type: item['type'], href: item['href'], "social-title": item['social-title'], "share-content": item['share-content'], alt: item['alt'], target: item['target'] }); })
            : h("slot", null))));
    };
    Object.defineProperty(SocialLinks.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocialLinks, "watchers", {
        get: function () {
            return {
                "selectedLinksItems": ["socialLinksChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocialLinks, "style", {
        get: function () { return "div.dxp.dxp-social-links .horizontal,div.dxp.dxp-social-links .vertical{display:-ms-inline-flexbox;display:inline-flex}div.dxp.dxp-social-links .vertical{-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-social-links p:first-child{margin-bottom:8px}"; },
        enumerable: true,
        configurable: true
    });
    return SocialLinks;
}());
export { ContentList as dxp_content_list, ContentListItem as dxp_content_list_item, Copyright as dxp_copyright, CountryLanguageSelector as dxp_country_language_selector, SocialLinks as dxp_social_links };
