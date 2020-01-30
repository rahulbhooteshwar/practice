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
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        favorited: 'Favorited. Click to unfavorite this item',
        unfavorited: 'Unfavorited. Click to favorite this item',
        showMoreOptions: 'Show more options',
        hideMoreOptions: 'Hide more options',
        openInNewTab: 'in New Tab'
    },
    'en-US': {
        favorited: 'Favorited. Click to unfavorite this item',
        unfavorited: 'Unfavorited. Click to favorite this item',
        showMoreOptions: 'Show more options',
        hideMoreOptions: 'Hide more options',
        openInNewTab: 'in New Tab'
    },
    'es': {
        favorited: 'Haga clic para desfavorecer este artículo',
        unfavorited: 'haga clic para favoritos este artículo',
        showMoreOptions: 'Mostrar más opciones',
        hideMoreOptions: 'Ocultar más opciones',
        openInNewTab: 'en Nueva pestaña'
    },
    'es-ES': {
        favorited: 'Haga clic para desfavorecer este artículo',
        unfavorited: 'haga clic para favoritos este artículo',
        showMoreOptions: 'Mostrar más opciones',
        hideMoreOptions: 'Ocultar más opciones',
        openInNewTab: 'en Nueva pestaña'
    }
};
var Vcard = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** type of card icon */
        this.iconSprite = 'icons-sprite';
        /** More action button list */
        this.moreOptionList = [];
        this.cardClick = createEvent(this, "cardClick", 7);
        this.favoriteClick = createEvent(this, "favoriteClick", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Vcard', messages);
    };
    /** actions to be performed after component loaded */
    class_1.prototype.componentDidLoad = function () {
        this.applyCardColor();
    };
    /** actions to be performed after component updated */
    class_1.prototype.componentDidUpdate = function () {
        this.applyCardColor();
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Favorite/Unfavorite Item */
    class_1.prototype.favoriteCard = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cardFavorited = !this.cardFavorited;
                this.favoriteClick.emit(event);
                return [2 /*return*/];
            });
        });
    };
    /** Hide More Options Container on button click */
    class_1.prototype.hideMoreOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showMoreOption = false;
                return [2 /*return*/];
            });
        });
    };
    /** Open More Options Container */
    class_1.prototype.showMoreOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showMoreOption = true;
                return [2 /*return*/];
            });
        });
    };
    /** This method will apply card color */
    class_1.prototype.applyCardColor = function () {
        var shadowRoot = this.element ? this.element : this.element;
        if (this.ribbonColor) {
            var cardRibbonColor = shadowRoot.querySelector(".card-ribbon-color");
            cardRibbonColor.style.backgroundColor = this.ribbonColor;
            var icon = shadowRoot.querySelector('.icon-circle');
            if (icon) {
                icon.style.backgroundColor = this.ribbonColor;
            }
        }
    };
    /** Handler for v-card click. Emits click event */
    class_1.prototype.onClickVCardHandler = function (event) {
        this.cardClick.emit(event);
    };
    /** render card button */
    class_1.prototype.renderCardButton = function () {
        return (h("div", { class: "cta-wrapper", onClick: function (event) { event.stopPropagation(); } }, h("dxp-cta", { type: "link", "button-size": "md", "link-type": "dxp-cta-link", text: this.ctaButtonText, href: this.ctaButtonLink, "aria-label": this.ctaButtonText, disabled: !this.enableStatusText, "open-in-new-tab": "false" })));
    };
    /** render fav icon */
    class_1.prototype.renderFavIcon = function () {
        var _this = this;
        return (h("button", { class: "btn-icon btn-favorite " + (this.cardFavorited ? 'card-favorited' : ''), onClick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.stopPropagation();
                            return [4 /*yield*/, this.favoriteCard(event)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, "aria-label": "" + (this.cardFavorited ? dxp.i18n.t('Vcard:favorited') : dxp.i18n.t('Vcard:unfavorited')), title: "" + (this.cardFavorited ? dxp.i18n.t('Vcard:favorited') : dxp.i18n.t('Vcard:unfavorited')), role: "button" }, h("i", { class: this.iconSprite + " " + (this.cardFavorited ? 'favorite-o' : 'unfavorite-o') })));
    };
    /** render more options  */
    class_1.prototype.renderMoreOptions = function () {
        var _this = this;
        return (h("div", { class: "more-options-container " + (this.showMoreOption ? 'dxp-block' : '') }, h("div", { class: "list-wrapper", "aria-modal": "true", onClick: function (event) { event.stopPropagation(); } }, this.moreOptionList.length ? (h("ul", null, this.moreOptionList &&
            this.moreOptionList.map(function (action) { return h("li", null, action.type === 'link' ?
                h("dxp-cta", { type: action.type, "button-size": "md", "link-type": action.linkType, text: action.text, disabled: action.disabled, href: action.href, "aria-label": action.openInNewTab ? action.ariaLabel + " " + dxp.i18n.t('Vcard:openInNewTab') : action.ariaLabel, "open-in-new-tab": action.openInNewTab })
                : ''); }))) : (h("slot", { name: "more-options" }))), h("button", { role: "button", class: "btn-icon btn-link close-more-options", onClick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            event.stopPropagation();
                            return [4 /*yield*/, this.hideMoreOptions()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, "aria-label": dxp.i18n.t('Vcard:hideMoreOptions'), title: dxp.i18n.t('Vcard:hideMoreOptions') }, h("i", { class: this.iconSprite + " cross-sm-o" }))));
    };
    /** render the vcard */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-vcard render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-vcard.min.css" })]
        ];
        return (h("div", { onClick: function (event) { _this.onClickVCardHandler(event); }, class: this.base.componentClass() + " " + this.cardView + " " + this.cardType + " " + ((this.cardView === 'list-view' && this.showMoreOption) ? 'more-option-visible' : '') + "\n        " + (this.additionalInfo ? 'has-additional-info' : '') + " " + (this.enableCardFavIcon ? 'has-favorite-btn' : ''), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "card-ribbon-color" }), this.cardType ?
            h("p", { class: "card-type" }, h("span", { class: "icon-circle " + this.cardType }, h("i", { class: this.iconSprite + " " + this.icon })), h("span", { tabindex: "0", class: "type", innerHTML: this.cardType }))
            : '', h("h2", { tabindex: "0", title: this.cardTitle, innerHTML: this.cardTitle }), this.cardDescription ?
            h("p", { title: this.cardDescription, class: "card-description" }, this.cardDescription)
            : '', this.enableCardButton ?
            this.renderCardButton()
            : h("slot", { name: "card-button" }), this.enableCardFavIcon ?
            this.renderFavIcon()
            : '', this.enableMoreOptions ?
            h("button", { class: "btn-icon btn-more-options", onClick: function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                event.stopPropagation();
                                return [4 /*yield*/, this.showMoreOptions()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, "aria-label": dxp.i18n.t('Vcard:showMoreOptions'), title: dxp.i18n.t('Vcard:showMoreOptions'), role: "button" }, h("i", { class: this.iconSprite + " more-actions-md-o" }))
            : '', this.additionalInfo ?
            h("p", { class: "additional-info" }, this.additionalInfo)
            : '', this.enableMoreOptions ?
            this.renderMoreOptions()
            : ''));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-vcard{border:.0625rem solid transparent;border-radius:.25rem .25rem .375rem .375rem;position:relative;padding:1.1875rem 1rem 1rem;min-height:12.75rem}div.dxp.dxp-vcard .card-ribbon-color{height:.25rem;position:absolute;top:-1px;left:-1px;right:-1px;border-radius:.375rem .375rem 0 0;z-index:9}div.dxp.dxp-vcard .card-type{margin:0 0 1rem 0;letter-spacing:.113rem;text-transform:uppercase}div.dxp.dxp-vcard .card-type span{vertical-align:middle}div.dxp.dxp-vcard .card-type span.icon-circle{width:1.5rem;height:1.5rem;border-radius:50%;display:inline-block;margin-right:.5rem;padding:.1875rem}div.dxp.dxp-vcard .card-type span.type{margin-top:.0625rem;display:inline-block}div.dxp.dxp-vcard h2{margin:0;line-height:1.5rem;-webkit-line-clamp:3;height:4.5rem}div.dxp.dxp-vcard .card-description,div.dxp.dxp-vcard h2{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}div.dxp.dxp-vcard .card-description{margin-top:.9375rem;margin-bottom:4rem;-webkit-line-clamp:2;height:2.25rem}div.dxp.dxp-vcard .cta-wrapper{border:none;position:absolute;left:1rem;bottom:2.75rem}div.dxp.dxp-vcard .more-options-container{position:absolute;z-index:9;display:none;top:.5rem;left:.5rem;right:.5rem;bottom:.375rem}div.dxp.dxp-vcard .more-options-container .close-more-options{position:absolute;right:.5625rem;bottom:.625rem;cursor:pointer;border:none}div.dxp.dxp-vcard .more-options-container .list-wrapper{position:absolute;top:0;left:0;right:0;bottom:2.25rem;padding:.3125rem;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:end;align-items:flex-end;overflow-y:auto}div.dxp.dxp-vcard .more-options-container ul{margin:0;list-style:none;padding:0 .5rem;text-align:right;max-height:100%}div.dxp.dxp-vcard .more-options-container ul li{display:block;padding:.1875rem 0}div.dxp.dxp-vcard .more-options-container ul li:last-child{padding-bottom:0}div.dxp.dxp-vcard .btn-favorite,div.dxp.dxp-vcard .btn-more-options{border:none;position:absolute}div.dxp.dxp-vcard .btn-more-options{width:1.5rem;height:1.5rem;right:.875rem;bottom:.625rem}div.dxp.dxp-vcard .btn-favorite{width:1.25rem;height:1.25rem;right:.875rem;top:1rem}div.dxp.dxp-vcard .btn-icon{padding:0;min-width:1rem;min-height:1rem;cursor:pointer;background:transparent}div.dxp.dxp-vcard .additional-info{position:absolute;margin:0;bottom:.8125rem;left:1rem;max-width:6.25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\@media (min-width:993px){div.dxp.dxp-vcard.list-view{position:relative;border:none;border-bottom:.0625rem solid transparent;padding:.625rem .5rem .75rem;min-height:auto;-webkit-box-shadow:none;box-shadow:none;border-radius:0}div.dxp.dxp-vcard.list-view .card-ribbon-color{display:none}div.dxp.dxp-vcard.list-view .card-type{margin:0;display:inline-block;width:9.75rem;vertical-align:middle}div.dxp.dxp-vcard.list-view h2{display:inline-block;max-width:36%;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;height:auto}div.dxp.dxp-vcard.list-view .card-description{display:none;height:auto}div.dxp.dxp-vcard.list-view .cta-wrapper{top:.75rem;right:8.75rem;left:auto}div.dxp.dxp-vcard.list-view .btn-favorite{top:.938rem;right:4.1875rem}div.dxp.dxp-vcard.list-view .btn-more-options{right:.75rem;top:.813rem}div.dxp.dxp-vcard.list-view .more-options-container{width:50%;right:0;top:0;bottom:0;left:auto}div.dxp.dxp-vcard.list-view .more-options-container .close-more-options{width:1.25rem;height:1.25rem;position:absolute;right:.75rem;top:1rem;bottom:auto}div.dxp.dxp-vcard.list-view .more-options-container .list-wrapper{top:.75rem;left:0;bottom:auto;right:3.4375rem;border:0;padding:0}div.dxp.dxp-vcard.list-view .more-options-container ul{padding:0;text-align:right}div.dxp.dxp-vcard.list-view .more-options-container ul li{padding:0 .9375rem;display:inline-block;position:relative}div.dxp.dxp-vcard.list-view .more-options-container ul li:after{content:\"\";position:absolute;right:0;top:.25rem;bottom:.125rem;width:.0625rem}div.dxp.dxp-vcard.list-view .more-options-container ul li:first-child{padding-left:0}div.dxp.dxp-vcard.list-view .more-options-container ul li:last-child{padding-right:0}div.dxp.dxp-vcard.list-view .more-options-container ul li:last-child:after{display:none}div.dxp.dxp-vcard.list-view .additional-info{left:auto;right:4.75rem;bottom:.9375rem}div.dxp.dxp-vcard.list-view.has-favorite-btn .additional-info{right:6rem}div.dxp.dxp-vcard.list-view.has-additional-info .cta-wrapper{right:14.125rem;left:auto}}\@media (max-width:1200px){div.dxp.dxp-vcard.list-view .more-options-container{width:auto;left:0}}\@media (max-width:992px){div.dxp.dxp-vcard.list-view .more-options-container{width:auto;top:.5rem;left:.5rem;right:.5rem;bottom:.5rem}div.dxp.dxp-vcard.list-view .more-options-container .close-more-options{position:absolute;right:.5625rem;bottom:.5625rem}div.dxp.dxp-vcard.list-view .more-options-container .list-wrapper{position:absolute;top:0;left:0;right:0;bottom:2.25rem;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:end;align-items:flex-end;overflow-y:auto}div.dxp.dxp-vcard.list-view .more-options-container ul{padding:0 .5rem;list-style:none;text-align:right;max-height:100%}div.dxp.dxp-vcard.list-view .more-options-container ul li:last-child{padding-bottom:0}}div.dxp.dxp-vcard[dir=rtl] .card-type span.icon-circle{margin-left:.5rem;margin-right:0;padding-left:0;padding-right:.29rem}div.dxp.dxp-vcard[dir=rtl] .cta-wrapper{right:1rem;left:auto}div.dxp.dxp-vcard[dir=rtl] .more-options-container .close-more-options{left:.375rem;right:auto}div.dxp.dxp-vcard[dir=rtl] .more-options-container ul{text-align:left}div.dxp.dxp-vcard[dir=rtl] .btn-favorite,div.dxp.dxp-vcard[dir=rtl] .btn-more-options{left:.875rem;right:auto}div.dxp.dxp-vcard[dir=rtl] .additional-info{left:auto;right:.875rem}\@media (min-width:993px){div.dxp.dxp-vcard[dir=rtl].list-view .cta-wrapper{left:8.75rem;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .btn-favorite{left:3.625rem}div.dxp.dxp-vcard[dir=rtl].list-view .btn-more-options{left:.75rem}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container{left:0;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container .close-more-options{left:.75rem;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container .list-wrapper{right:0;left:3.4375rem}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container ul li:after{left:0;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container ul li:first-child{padding-right:0;padding-left:.9375rem}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container ul li:last-child{padding-left:0;padding-right:.9375rem}div.dxp.dxp-vcard[dir=rtl].list-view .additional-info{right:auto;left:4.75rem}div.dxp.dxp-vcard[dir=rtl].list-view.has-favorite-btn .additional-info{left:6rem;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view.has-additional-info .cta-wrapper{left:14.125rem;right:auto}}\@media (max-width:1200px){div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container{right:0}}\@media (max-width:992px){div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container .close-more-options{left:.375rem;right:auto}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Vcard as dxp_vcard };
