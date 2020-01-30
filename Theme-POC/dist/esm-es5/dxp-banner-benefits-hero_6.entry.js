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
import { r as registerInstance, d as dxp, h, g as getElement, c as createEvent } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var XL_BANNER = 'extra-long';
var BANNER_BENEFITS_HERO = '.dxp-banner-benefits-hero';
var FULL_HEIGHT_BANNER = 'full-height-banner';
var BannerBenefitsHero = /** @class */ (function () {
    function BannerBenefitsHero(hostRef) {
        registerInstance(this, hostRef);
        /** to give custom id to banner */
        this.customId = 'benefits-hero';
    }
    /** actions to be performed prior to component loading */
    BannerBenefitsHero.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['benefits-hero', 'js-fontsize', this.theme].join(' ');
        var sizeAndWidthCheck = ([XL_BANNER, 'long'].includes(this.bannerSize)) && (window.innerWidth >= 992);
        this.responsive = !this.base.returnBooleanValue(sizeAndWidthCheck);
    };
    /** Actions to perform after component load */
    BannerBenefitsHero.prototype.componentDidLoad = function () {
        var _this = this;
        this.applyWindowHeight();
        window.addEventListener('orientationchange', function () {
            dxp.log.debug(_this.element.tagName, 'componentDidLoad()', "inside orientationchange");
            setTimeout(function () {
                var sizeAndWidthCheck = ([XL_BANNER, 'long'].includes(_this.bannerSize)) && (window.innerWidth >= 992);
                _this.responsive = !_this.base.returnBooleanValue(sizeAndWidthCheck);
                _this.applyWindowHeight();
            }, 200);
        });
        this.applyContentHeight();
    };
    /**
     * click listener for routing events on anchor tag
     */
    BannerBenefitsHero.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** apply height to banner - sm,lg,md */
    BannerBenefitsHero.prototype.applyBannerHeight = function (contentWrapper, imageWrapper, bannerMaxHeight, bannerStateSize) {
        if (contentWrapper && imageWrapper && this.clientHeight(contentWrapper) > bannerMaxHeight.substr(0, bannerMaxHeight.length - 2)) {
            contentWrapper.style.paddingBottom = '10px';
            imageWrapper.style.height = this.clientHeight(contentWrapper) + "px";
            bannerStateSize.style.maxHeight = 'none';
        }
    };
    /** Apply content height for dynamic content */
    BannerBenefitsHero.prototype.applyContentHeight = function () {
        var _this = this;
        var imgRoot = this.element ? this.element.querySelector('dxp-image') : this.element.querySelector('dxp-image');
        var imgLoad = imgRoot ? imgRoot.querySelector('img') : imgRoot.querySelector('img');
        if (imgLoad) {
            imgLoad.addEventListener('load', function () {
                if (_this.base.getDeviceWidthType() === 'xl' || _this.base.getDeviceWidthType() === 'lg') {
                    _this.calculateBannerHeight();
                }
            });
        }
    };
    /** Apply window height to banner */
    BannerBenefitsHero.prototype.applyWindowHeight = function () {
        var windowHeight = window.innerHeight;
        var extraLong = this.element ? this.element.querySelector('.extra-long') : this.element.querySelector('.extra-long');
        var benefitsHeroContainer = this.element ?
            this.element.querySelector(BANNER_BENEFITS_HERO)
            :
                this.element.querySelector(BANNER_BENEFITS_HERO);
        if (window.innerWidth >= 992 && extraLong && benefitsHeroContainer) {
            benefitsHeroContainer.style.height = windowHeight + "px";
            benefitsHeroContainer.classList.add(FULL_HEIGHT_BANNER);
        }
        else if (window.innerWidth < 992 && extraLong && benefitsHeroContainer) {
            dxp.log.debug(this.element.tagName, 'applyWindowHeight()', "inside applyWindowHeight in else block");
            benefitsHeroContainer.classList.remove(FULL_HEIGHT_BANNER);
            benefitsHeroContainer.removeAttribute('style');
        }
    };
    /** apply height to extra-long banner */
    BannerBenefitsHero.prototype.applyXLBannerHeight = function (contentWrapper, imageWrapper) {
        if (contentWrapper && this.clientHeight(contentWrapper) > window.innerHeight) {
            contentWrapper.style.paddingTop = '10px';
            imageWrapper.style.height = this.clientHeight(contentWrapper) + "px";
            imageWrapper.style.maxHeight = 'none';
            var benefitsHeroContainer = this.element ?
                this.element.querySelector(BANNER_BENEFITS_HERO)
                :
                    this.element.querySelector(BANNER_BENEFITS_HERO);
            benefitsHeroContainer.classList.remove(FULL_HEIGHT_BANNER);
        }
    };
    /** calculate height for large content */
    BannerBenefitsHero.prototype.calculateBannerHeight = function () {
        var contentWrapper = this.base.shadowRootQuerySelector(this.element, '.content-wrapper', false);
        var imageWrapper = this.base.shadowRootQuerySelector(this.element, '.img-wrapper', false);
        var bannerStateSize = this.base.shadowRootQuerySelector(this.element, "." + this.bannerSize, false);
        var bannerMaxHeight = window.getComputedStyle(bannerStateSize).maxHeight;
        if (this.bannerSize === 'extra-long') {
            this.applyXLBannerHeight(contentWrapper, imageWrapper);
        }
        else {
            this.applyBannerHeight(contentWrapper, imageWrapper, bannerMaxHeight, bannerStateSize);
        }
    };
    /** method to calculate client height */
    BannerBenefitsHero.prototype.clientHeight = function (elem) {
        return elem.clientHeight;
    };
    /** to generate dynamic styles */
    BannerBenefitsHero.prototype.renderStyles = function () {
        var bgColor = this.cardColor ? "background-color: " + this.cardColor + ";" : '';
        var txtColor = this.textColor ? "color: " + this.textColor + ";" : '';
        return (this.textColor || this.cardColor) ?
            "#" + this.customId + " .banner-state{\n            " + bgColor + " " + txtColor + "\n          }\n          #" + this.customId + " .banner-state .dxp-title-eyebrow,\n          #" + this.customId + " .banner-state .dxp-lead,\n          #" + this.customId + " .banner-state h1, h2{\n            color: inherit;\n          }" : '';
    };
    /** Render the banner */
    BannerBenefitsHero.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-banner-benefits-hero render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-banner.min.css" })],
            h("style", null, this.renderStyles())
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, h("div", { id: this.customId, class: this.cssClass }, h("div", { class: "benefits-hero-content" }, h("div", { class: "banner-state " + this.positionOfImageClass + " " + this.bannerSize }, h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "data-theme": this.theme, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "open-in-new-tab": this.openInNewTab, responsive: this.responsive })), h("div", { class: "content-wrapper" }, h("div", { class: "text-container" }, this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }), this.titleText &&
            (this.bannerSize === XL_BANNER) ?
            h("h2", { class: this.titleText && 'dxp-header-text', innerHTML: this.titleText }) :
            h("h1", { class: this.titleText && 'dxp-header-text', innerHTML: this.titleText }), this.subTitle && h("p", { class: "dxp-lead", innerHTML: this.subTitle })), h("slot", null)))))));
    };
    Object.defineProperty(BannerBenefitsHero.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerBenefitsHero, "style", {
        get: function () { return "div.dxp-banner-benefits-hero .banner-small,div.dxp-banner-benefits-hero .benefits-hero{position:relative}div.dxp-banner-benefits-hero .banner-small-content,div.dxp-banner-benefits-hero .benefits-hero-content{position:relative;width:100%;margin:auto}div.dxp-banner-benefits-hero .banner-small-content .banner-state,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-order:2;order:2}div.dxp-banner-benefits-hero .banner-small-content .banner-state .img-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .img-wrapper{float:left}div.dxp-banner-benefits-hero .banner-small-content .banner-state .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper{float:left;position:absolute;right:0;top:51%;-webkit-transform:translateY(-51%);transform:translateY(-51%);white-space:normal}\@media (min-width:1440px){div.dxp-banner-benefits-hero .banner-small-content .banner-state .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper{padding-right:calc((100% - 1440px) / 2);padding-left:8rem}}\@media (min-width:1440px) and (max-width:1656px){div.dxp-banner-benefits-hero .banner-small-content .banner-state .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper{padding-right:108px}}div.dxp-banner-benefits-hero .banner-small-content .banner-state .content-wrapper .dxp-title-eyebrow,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper .dxp-title-eyebrow{margin-bottom:.875rem}div.dxp-banner-benefits-hero .banner-small-content .banner-state .content-wrapper h2,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper h2{margin-bottom:1.125rem}div.dxp-banner-benefits-hero .banner-small-content .banner-state .content-wrapper .dxp-lead,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper .dxp-lead{margin-bottom:1.5rem}div.dxp-banner-benefits-hero .banner-small-content .banner-state.reverse,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;padding-right:0;padding-left:0}div.dxp-banner-benefits-hero .banner-small-content .banner-state.reverse .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.reverse .content-wrapper{left:24px;right:auto;float:right}\@media (min-width:992px){div.dxp-banner-benefits-hero .banner-small-content .banner-state.reverse .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.reverse .content-wrapper{left:0}}\@media (min-width:1440px){div.dxp-banner-benefits-hero .banner-small-content .banner-state.reverse .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.reverse .content-wrapper{left:calc((100% - 1440px) / 2);width:calc(50% - calc((100% - 1440px) / 2));padding-left:0}}\@media (min-width:1440px) and (max-width:1656px){div.dxp-banner-benefits-hero .banner-small-content .banner-state.reverse .content-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.reverse .content-wrapper{padding-left:108px;padding-right:128px;left:0}}div.dxp-banner-benefits-hero.full-height-banner{max-height:100%;overflow:hidden}div.dxp-banner-benefits-hero .banner-state,div.dxp-banner-benefits-hero .img-wrapper{overflow:hidden}div.dxp-banner-benefits-hero .banner-state .img-wrapper{margin-left:0;margin-right:0;overflow:hidden}div.dxp-banner-benefits-hero .banner-state .content-wrapper{padding-right:108px;padding-left:128px}div.dxp-banner-benefits-hero .banner-state .content-wrapper,div.dxp-banner-benefits-hero .banner-state .img-wrapper{width:50%}div.dxp-banner-benefits-hero .banner-state.extra-long .img-wrapper{height:100vh;max-height:100vh}div.dxp-banner-benefits-hero .banner-state.long{max-height:650px}div.dxp-banner-benefits-hero .banner-state.long .img-wrapper{height:650px}div.dxp-banner-benefits-hero .banner-state.medium{max-height:450px}div.dxp-banner-benefits-hero .banner-state.short{max-height:350px}div.dxp-banner-benefits-hero .banner-state.extra-long .content-wrapper .dxp-title-eyebrow,div.dxp-banner-benefits-hero .banner-state.long .content-wrapper .dxp-title-eyebrow{margin-bottom:0}div.dxp-banner-benefits-hero .banner-state.extra-long .content-wrapper .dxp-title-eyebrow+.dxp-header-text,div.dxp-banner-benefits-hero .banner-state.long .content-wrapper .dxp-title-eyebrow+.dxp-header-text{margin-top:22px;margin-bottom:0}div.dxp-banner-benefits-hero .banner-state.extra-long .content-wrapper .dxp-title-eyebrow+.dxp-header-text+.dxp-lead,div.dxp-banner-benefits-hero .banner-state.extra-long .content-wrapper .dxp-title-eyebrow+.dxp-lead,div.dxp-banner-benefits-hero .banner-state.long .content-wrapper .dxp-title-eyebrow+.dxp-header-text+.dxp-lead,div.dxp-banner-benefits-hero .banner-state.long .content-wrapper .dxp-title-eyebrow+.dxp-lead{margin-top:1rem}div.dxp-banner-benefits-hero .banner-state.extra-long .content-wrapper .dxp-lead,div.dxp-banner-benefits-hero .banner-state.long .content-wrapper .dxp-lead,div.dxp-banner-benefits-hero .banner-state.medium .content-wrapper .dxp-title-eyebrow,div.dxp-banner-benefits-hero .banner-state.short .content-wrapper .dxp-title-eyebrow{margin-bottom:0}div.dxp-banner-benefits-hero .banner-state.medium .content-wrapper .dxp-title-eyebrow+h1,div.dxp-banner-benefits-hero .banner-state.short .content-wrapper .dxp-title-eyebrow+h1{margin-top:11px;margin-bottom:0}div.dxp-banner-benefits-hero .banner-state.medium .content-wrapper .dxp-title-eyebrow+.dxp-lead,div.dxp-banner-benefits-hero .banner-state.short .content-wrapper .dxp-title-eyebrow+.dxp-lead{margin-top:13px}div.dxp-banner-benefits-hero .banner-state.medium .content-wrapper h1,div.dxp-banner-benefits-hero .banner-state.short .content-wrapper h1{margin-bottom:0}div.dxp-banner-benefits-hero .banner-state.medium .content-wrapper h1+.dxp-lead,div.dxp-banner-benefits-hero .banner-state.short .content-wrapper h1+.dxp-lead{margin-top:13px}div.dxp-banner-benefits-hero .banner-state.medium .content-wrapper .dxp-lead,div.dxp-banner-benefits-hero .banner-state.short .content-wrapper .dxp-lead{margin-bottom:0}div.dxp-banner-benefits-hero .banner-state.reverse .img-wrapper{margin-left:0;margin-right:0;overflow:hidden}div.dxp-banner-benefits-hero .banner-state.reverse .content-wrapper{padding-right:108px;padding-left:128px;padding-left:108px;padding-right:128px}\@media (max-width:991px){div.dxp-banner-benefits-hero .benefits-hero .banner-state{overflow:inherit;max-height:inherit}div.dxp-banner-benefits-hero .benefits-hero .banner-state .img-wrapper{width:100%;float:none;margin-left:0;margin-right:0}div.dxp-banner-benefits-hero .benefits-hero .banner-state.extra-long .img-wrapper,div.dxp-banner-benefits-hero .benefits-hero .banner-state.long .img-wrapper{margin-bottom:44px;height:auto}div.dxp-banner-benefits-hero .benefits-hero .banner-state.medium .img-wrapper,div.dxp-banner-benefits-hero .benefits-hero .banner-state.short .img-wrapper{margin-bottom:40px}div.dxp-banner-benefits-hero .benefits-hero .banner-state .content-wrapper{width:100%;top:auto;-webkit-transform:none;transform:none;position:inherit;float:left;padding-left:36px;padding-bottom:40px}div.dxp-banner-benefits-hero .benefits-hero .banner-state .content-wrapper .dxp-title-eyebrow{margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero .banner-state .content-wrapper .dxp-title-eyebrow+h2{margin-top:14px;margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero .banner-state .content-wrapper .dxp-title-eyebrow+.dxp-lead{margin-top:1rem;margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero .banner-state.reverse .img-wrapper{margin-left:0;margin-right:0}div.dxp-banner-benefits-hero .benefits-hero .banner-state.reverse .content-wrapper{float:left}}\@media (max-width:767px){div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .img-wrapper{margin-bottom:1.6875rem}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.extra-long .img-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.long .img-wrapper{height:auto}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.extra-long .content-wrapper .dxp-title-eyebrow,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.long .content-wrapper .dxp-title-eyebrow{margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.extra-long .content-wrapper .dxp-title-eyebrow+h2,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.long .content-wrapper .dxp-title-eyebrow+h2{margin-top:12px}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .content-wrapper .dxp-title-eyebrow,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .content-wrapper .dxp-title-eyebrow{margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .content-wrapper .dxp-title-eyebrow+.dxp-header-text,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .content-wrapper .dxp-title-eyebrow+.dxp-lead,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .content-wrapper .dxp-title-eyebrow+.dxp-header-text,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .content-wrapper .dxp-title-eyebrow+.dxp-lead{margin-top:5px}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .content-wrapper .dxp-header-text,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .content-wrapper .dxp-header-text{margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .content-wrapper .dxp-header-text+.dxp-lead,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .content-wrapper .dxp-header-text+.dxp-lead{margin-top:8px}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .content-wrapper .dxp-lead,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .content-wrapper .dxp-lead{margin-bottom:0}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.medium .img-wrapper,div.dxp-banner-benefits-hero .benefits-hero-content .banner-state.short .img-wrapper{margin-bottom:28px}div.dxp-banner-benefits-hero .benefits-hero-content .banner-state .content-wrapper{width:100%;margin:0 0 23px 0;padding:0 1rem}}div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{left:24px;right:auto;float:right}\@media (min-width:992px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{left:0}}\@media (min-width:1440px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{left:calc((100% - 1440px) / 2);width:calc(50% - calc((100% - 1440px) / 2));padding-left:0}}div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{padding-right:0;padding-left:8rem}\@media (min-width:1440px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{width:50%;padding-right:128px;padding-left:calc((100% - 1440px) / 2);left:0}}\@media (min-width:1440px) and (max-width:1656px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{padding-left:108px}}div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state.reverse .content-wrapper{padding-right:0;padding-left:8rem}\@media (min-width:1440px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state.reverse .content-wrapper{width:50%;padding-right:128px;padding-left:calc((100% - 1440px) / 2);left:0}}\@media (min-width:1440px) and (max-width:1656px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state.reverse .content-wrapper{padding-left:108px}}div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state.reverse .content-wrapper{padding-left:128px;padding-right:calc((100% - 1440px) / 2);right:0}\@media (max-width:1656px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state.reverse .content-wrapper{padding-right:108px}}\@media (max-width:991px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper,div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state.reverse .content-wrapper{padding-right:2.25rem}}\@media (max-width:767px){div.dxp-banner-benefits-hero[dir=rtl] .benefits-hero-content .banner-state .content-wrapper{padding:0 16px}}"; },
        enumerable: true,
        configurable: true
    });
    return BannerBenefitsHero;
}());
var messages = {
    'en': {
        videoPlayBtnText: 'Video play button',
        videoPlayBtnAltText: 'Video play button',
        pageScrollDown: 'Scroll page down'
    },
    'en-US': {
        videoPlayBtnText: 'Video play button',
        videoPlayBtnAltText: 'Video play button',
        pageScrollDown: 'Scroll page down'
    }
};
var IMAGE_BACKGROUND_TYPE = 'image-background';
var VIDEO_BACKGROUND_TYPE = 'video-background';
var SOLID_BACKGROUND_TYPE = 'solid-background';
var BANNER_VIDEO = 'banner-with-video';
var XL_VIDEO = 'extra-long';
var BannerImageOverlay = /** @class */ (function () {
    function BannerImageOverlay(hostRef) {
        registerInstance(this, hostRef);
        /** display video on full height */
        this.displayVideoOnFullHeight = true;
        /** show the video on condition */
        this.isVideoShow = false;
        /** add circle design over banner */
        this.addCircle = false;
        /** animation for overlay content and CTA */
        this.animation = false;
        /** custom mute button in case of disabled controls for HTML5 video */
        this.customMuteButton = false;
        /** custom mute button position */
        this.customMuteButtonPosition = 'top-right';
        /** Video mute option */
        this.muted = true;
        /** show/hide text contents over image overlay banner */
        this.showContentSm = false;
    }
    /** actions to be performed prior to component loading */
    BannerImageOverlay.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'BannerImageOverlay', messages);
        /** banner size is by default extra long for 'banner-with-video' banner type */
        if (this.bannerType === BANNER_VIDEO) {
            this.bannerSize = XL_VIDEO;
        }
        this.cssClass = [((this.enableOverlay === 'true') ? 'sub-feature-bg-block' : 'sub-feature-image'), 'js-fontsize', this.bannerSize, this.backgroundType,
            ((this.addCircle === true && this.backgroundType === SOLID_BACKGROUND_TYPE) ? 'css-circle-banner' : '')].join(' ');
        this.overlayClass = ['overlay-content', ((this.enableOverlay === 'true') ? this.overlayPosition + " white-block" : ''),
            ((this.showContentSm && this.enableOverlay === 'true') ? 'display-text' : '')].join(' ');
        this.imagePresentClass = ['img-parent', ((this.bannerType === BANNER_VIDEO) ? 'full-width-of-img' : '')].join(' ');
        if (this.bannerSize === 'medium' && this.enableOverlay === 'false' && window.innerWidth < 768) {
            this.responsive = true;
        }
    };
    /** Actions to perform after component load */
    BannerImageOverlay.prototype.componentDidLoad = function () {
        var _this = this;
        this.applyWindowHeight();
        window.addEventListener('orientationchange', function () {
            dxp.log.debug(_this.element.tagName, 'componentDidLoad()', "inside orientationchange");
            setTimeout(function () {
                _this.responsive = _this.base.returnBooleanValue(_this.bannerSize === 'medium' && _this.enableOverlay === 'false' && window.innerWidth < 768);
                _this.applyWindowHeight();
            }, 200);
        });
    };
    /** mouse click events */
    BannerImageOverlay.prototype.handleClickEvents = function (event) {
        this.scrollWebPage(event);
        this.base.routingEventListener(event);
    };
    /** keyboard event */
    BannerImageOverlay.prototype.handleKeypressEvents = function (e) {
        if (e.keyCode === 13) {
            this.scrollWebPage(e);
        }
    };
    /** key up events */
    BannerImageOverlay.prototype.handleUpkeyEvents = function (e) {
        if (e.keyCode === 27 && this.isVideoShow) {
            this.isVideoShow = false;
        }
    };
    /** height for solid background */
    BannerImageOverlay.prototype.applyHeightsolidBackground = function (subFeatureImg) {
        var windowHeight = window.innerHeight;
        var extraLong = this.element ? this.element.querySelector('.extra-long') : this.element.querySelector('.extra-long');
        if (window.innerWidth >= 992 && extraLong && subFeatureImg) {
            subFeatureImg.style.height = windowHeight + "px";
            subFeatureImg.style.maxHeight = '100%';
        }
        else if (window.innerWidth < 992 && extraLong && subFeatureImg) {
            dxp.log.debug(this.element.tagName, 'applyWindowHeight()', "inside applyWindowHeight in else block");
            subFeatureImg.removeAttribute('style');
        }
        if (this.addCircle && this.backgroundType === SOLID_BACKGROUND_TYPE && extraLong && subFeatureImg) {
            this.designCircle(windowHeight, subFeatureImg);
        }
    };
    /** Apply window height to banner */
    BannerImageOverlay.prototype.applyWindowHeight = function () {
        var subFeatureImg = this.element ? this.element.querySelector('.sub-feature-image') : this.element.querySelector('.sub-feature-image');
        var imgPresent = this.element ? this.element.querySelector('.img-parent') : this.element.querySelector('.img-parent');
        switch (this.backgroundType) {
            case VIDEO_BACKGROUND_TYPE: {
                if (this.bannerSize === XL_VIDEO) {
                    subFeatureImg.style.maxHeight = '100%';
                    imgPresent.style.height = '100vh';
                }
                break;
            }
            case IMAGE_BACKGROUND_TYPE:
            case SOLID_BACKGROUND_TYPE: {
                this.applyHeightsolidBackground(subFeatureImg);
                break;
            }
            default: dxp.log.error('Invalid background type');
        }
    };
    /** Check the current position of the banner button. The remains visible portion will scroll up to hide the banner completely  */
    BannerImageOverlay.prototype.currentPos = function (target) {
        var currentButtonPos = target.parentElement.getClientRects()[0].bottom;
        if (currentButtonPos > 0) {
            window.scrollBy(0, currentButtonPos);
        }
    };
    /** design css circle as per window height for extra-long banner */
    BannerImageOverlay.prototype.designCircle = function (windowHeight, subFeatureImg) {
        var subFeatureImgAfter = subFeatureImg.querySelector('.after-span');
        var subFeatureImgBefore = subFeatureImg.querySelector('.before-span');
        if (window.innerWidth >= 992) {
            subFeatureImgBefore.style.cssText = "width:" + (windowHeight + 647) + "px;height:" + (windowHeight + 647) + "px;";
            subFeatureImgAfter.style.cssText = "width:" + (windowHeight + 465) + "px;height:" + (windowHeight + 465) + "px;";
        }
        else if (window.innerWidth >= 768) {
            subFeatureImgAfter.style.cssText = "width:" + (windowHeight + 558) + "px;height:" + (windowHeight + 558) + "px;";
        }
        else {
            subFeatureImgBefore.style.cssText = "width:" + (windowHeight + 162) + "px;height:" + (windowHeight + 162) + "px;";
            subFeatureImgAfter.style.cssText = "width:" + (windowHeight + 128) + "px;height:" + (windowHeight + 128) + "px;";
        }
    };
    /** Render Baner image overlay */
    BannerImageOverlay.prototype.renderBanerImageOverlay = function () {
        var _this = this;
        return (h("div", { class: this.overlayClass }, h("div", { class: this.animation && 'overlay-content-animation' }, (this.bannerType === BANNER_VIDEO) &&
            h("a", { "aria-label": dxp.i18n.t('BannerImageOverlay:videoPlayBtnText'), onClick: function (ev) { return _this.toggleVideo(true, ev); }, href: "" }, h("img", { class: "play-icon", alt: dxp.i18n.t('BannerImageOverlay:videoPlayBtnAltText'), src: (this.srcVideoPlayImage && this.srcVideoPlayImage.length !== 0) ?
                    this.srcVideoPlayImage
                    :
                        "https://asset.mastercard.com/dxp-ui/assets" + "/dxp-banner/play-icon-" + this.iconType + ".png" })), this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }), this.titleText &&
            h("h1", { class: (this.bannerSize === XL_VIDEO || this.bannerSize === 'long') && this.enableOverlay !== 'true' ? 'dxp-heading-lg' : undefined, innerHTML: this.titleText }), this.subTitle && h("p", { class: "lead block-with-text", innerHTML: this.subTitle })), this.animation ?
            h("div", { class: "slot-wrapper" }, h("slot", null)) : h("slot", null)));
    };
    /** Render solid background */
    BannerImageOverlay.prototype.renderSolidBackground = function () {
        return (h("div", { class: this.imagePresentClass }, this.backgroundType === IMAGE_BACKGROUND_TYPE &&
            h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive }), this.backgroundType === VIDEO_BACKGROUND_TYPE && this.bannerSize !== 'short' &&
            h("dxp-video", { type: this.videoType, "full-height": this.displayVideoOnFullHeight, "src-video": this.srcVideo, autoplay: this.autoPlay, "disable-controls": this.disableControls, "src-poster": this.srcPoster, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate, muted: this.muted })));
    };
    /** Scroll web page with down arrow button */
    BannerImageOverlay.prototype.scrollWebPage = function (e) {
        var _this = this;
        var target = e.target ? e.composedPath()[0] : e.target;
        if (target.classList.contains('dxp-down-arrow')) {
            var bottom_1 = e.target.parentElement.getClientRects()[0].bottom + 3;
            var scrollStep_1 = 10;
            var sum_1 = 0;
            var scrollInterval_1 = setInterval(function () {
                sum_1 += scrollStep_1;
                if (bottom_1 >= sum_1) {
                    window.scrollBy(0, scrollStep_1);
                }
                else {
                    clearInterval(scrollInterval_1);
                    _this.currentPos(target);
                }
            }, 0);
        }
    };
    /** Show/hide the video */
    BannerImageOverlay.prototype.toggleVideo = function (displayVideo, ev) {
        ev.preventDefault();
        this.isVideoShow = displayVideo;
    };
    /** Render the banner */
    BannerImageOverlay.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-banner-image-overlay render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-banner.min.css" })],
        ];
        if (this.bannerType === 'image-overlay' || this.bannerType === BANNER_VIDEO) {
            return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, this.isVideoShow &&
                h("div", { class: "overlay-video-block" }, h("span", { role: "button", class: "btn-close", id: "closeBtn", onClick: function (ev) { return _this.toggleVideo(false, ev); } }, h("span", { class: "dxp-icon dxp-icon-close white-cross-icon" })), h("div", { class: "align-middle" }, h("dxp-video", { type: this.videoType, "src-video": this.srcVideo, "icon-type": this.iconType, "disable-controls": this.disableControls, autoplay: this.autoPlay, "src-poster": this.srcPoster, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate, muted: this.muted }))), h("div", { dir: this.dir, id: "sub-feature-image", class: this.cssClass }, this.addCircle ? h("span", { class: "before-span" }) : '', this.categoryTag ? h("p", { class: "category-tags" }, this.categoryTag) : '', (this.backgroundType !== SOLID_BACKGROUND_TYPE) &&
                this.renderSolidBackground(), this.renderBanerImageOverlay(), this.pageScrollDownArrow && (this.bannerSize === XL_VIDEO || this.bannerSize === 'long') ?
                h("span", { tabindex: "0", class: "dxp-down-arrow", role: "button", "aria-label": dxp.i18n.t('BannerImageOverlay:pageScrollDown') })
                : '', this.addCircle ? h("span", { class: "after-span" }) : '')));
        }
    };
    Object.defineProperty(BannerImageOverlay.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerImageOverlay, "style", {
        get: function () { return "\@charset \"UTF-8\";\@keyframes fadeUp{0%{transform:translateY(100px);-webkit-transform:translateY(100px)}to{transform:translateY(0);-webkit-transform:translateY(0)}}\@-webkit-keyframes fadeUp{0%{transform:translateY(100px);-webkit-transform:translateY(100px)}to{transform:translateY(0);-webkit-transform:translateY(0)}}\@keyframes fadeIn{0%{opacity:0}to{opacity:1}}\@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}div.dxp.dxp-banner-image-overlay .overlay-content-animation{animation:fadeIn 5s forwards,fadeUp 2s normal;-webkit-animation:fadeIn 5s forwards,fadeUp 2s normal}\@keyframes fadeInVisibility{0%{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}\@-webkit-keyframes fadeInVisibility{0%{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}div.dxp.dxp-banner-image-overlay .slot-wrapper{animation:fadeInVisibility;animation-delay:2s;animation-duration:3s;animation-fill-mode:forwards;-webkit-animation:fadeInVisibility;-webkit-animation-delay:2s;-webkit-animation-duration:3s;-webkit-animation-fill-mode:forwards;visibility:hidden}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block{position:relative}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block img{width:100%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .play-icon{width:80px;height:80px;margin-bottom:20px;cursor:pointer}div.dxp.dxp-banner-image-overlay .long.sub-feature-bg-block{max-height:592px;overflow:hidden}div.dxp.dxp-banner-image-overlay .medium.sub-feature-bg-block{max-height:431px;overflow:hidden}div.dxp.dxp-banner-image-overlay .short.sub-feature-bg-block{max-height:304px;overflow:hidden}\@media (max-width:1199px){div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{bottom:64px;top:auto;margin-left:24px;width:54.6%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner-image-overlay .long.sub-feature-bg-block{max-height:536px;overflow:hidden}div.dxp.dxp-banner-image-overlay .medium.sub-feature-bg-block{max-height:392px;overflow:hidden}div.dxp.dxp-banner-image-overlay .short.sub-feature-bg-block{max-height:288px;overflow:hidden}}\@media (max-width:991px){div.dxp.dxp-banner-image-overlay .long.sub-feature-bg-block{max-height:600px;overflow:hidden}div.dxp.dxp-banner-image-overlay .medium.sub-feature-bg-block{max-height:440px;overflow:hidden}div.dxp.dxp-banner-image-overlay .short.sub-feature-bg-block{max-height:320px;overflow:hidden}}\@media (max-width:767px){div.dxp.dxp-banner-image-overlay .long.sub-feature-bg-block{max-height:336px;overflow:hidden}div.dxp.dxp-banner-image-overlay .medium.sub-feature-bg-block{height:248px;overflow:hidden}div.dxp.dxp-banner-image-overlay .short.sub-feature-bg-block{max-height:200px;overflow:hidden;height:200px}}\@media (max-width:575px){div.dxp.dxp-banner-image-overlay .sub-feature-bg-block{padding-bottom:64px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(2),div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .img-parent{display:none}div.dxp.dxp-banner-image-overlay .primary-dark.sub-feature-bg-block img{opacity:1}div.dxp.dxp-banner-image-overlay .long.sub-feature-bg-block{max-height:400px;overflow:hidden}div.dxp.dxp-banner-image-overlay .short.sub-feature-bg-block{max-height:288px;overflow:hidden;height:288px}}\@media (min-width:768px){div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content,div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:61.5%}div.dxp.dxp-banner-image-overlay .cta-banner,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block,div.dxp.dxp-banner-image-overlay .sub-feature-default,div.dxp.dxp-banner-image-overlay .sub-feature-image{max-height:800px;overflow:hidden;position:relative}}\@media (min-width:992px){div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content,div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:54.6%}div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner-image-overlay .cta-banner,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block,div.dxp.dxp-banner-image-overlay .sub-feature-default,div.dxp.dxp-banner-image-overlay .sub-feature-image{max-height:720px;overflow:hidden;position:relative}}\@media (min-width:1200px){div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content,div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content p:last-child,div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner-image-overlay .cta-banner,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block,div.dxp.dxp-banner-image-overlay .sub-feature-default,div.dxp.dxp-banner-image-overlay .sub-feature-image{max-height:784px;overflow:hidden;position:relative}}\@media (max-width:575px){div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content,div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-image-overlay .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content :nth-last-child(2),div.dxp.dxp-banner-image-overlay .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .cta-links{display:block}div.dxp.dxp-banner-image-overlay .cta-links .visit-link:first-child{margin-right:0}div.dxp.dxp-banner-image-overlay .cta-banner,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block,div.dxp.dxp-banner-image-overlay .sub-feature-default,div.dxp.dxp-banner-image-overlay .sub-feature-image{max-height:614px;overflow:hidden}}div.dxp.dxp-banner-image-overlay .btn-close{position:absolute;right:5%;top:30px;border:none;cursor:pointer;margin:5px 5px 0 0;font-size:30px}div.dxp.dxp-banner-image-overlay .img-parent,div.dxp.dxp-banner-image-overlay .img-wrapper{overflow:hidden}div.dxp.dxp-banner-image-overlay .overlay-video-block{-webkit-transition:opacity .3s ease-in;transition:opacity .3s ease-in;position:fixed;top:0;left:0;width:100%;min-height:100vh;z-index:998}div.dxp.dxp-banner-image-overlay .align-middle{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:80vw;padding:88px 5%}div.dxp.dxp-banner-image-overlay .sub-feature-image{max-height:568px;position:relative}div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.image-background .img-parent{height:100vh;max-height:100vh}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content{padding:0 16px;position:absolute;bottom:auto;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content .cta-links{margin-top:0}div.dxp.dxp-banner-image-overlay .sub-feature-image h1{margin-bottom:auto}div.dxp.dxp-banner-image-overlay .sub-feature-image h1+.lead{margin-top:16px}div.dxp.dxp-banner-image-overlay .sub-feature-image h1+slot{margin-top:5px;display:block}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-title-eyebrow+h1{margin-top:12px}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-title-eyebrow+.lead{margin-top:22px}div.dxp.dxp-banner-image-overlay .sub-feature-image .lead{margin-bottom:2px;font-size:20px}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-down-arrow{bottom:24px}div.dxp.dxp-banner-image-overlay .sub-feature-image .cta-links .btn-cta{margin-top:16px}div.dxp.dxp-banner-image-overlay .sub-feature-image .cta-links .btn-cta:first-child{margin-right:70px}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-dropdown-container{position:absolute;bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-down-arrow{height:28px;width:28px;background-size:1.5rem;position:absolute;bottom:16px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);cursor:pointer;-webkit-animation-name:down-arrow-animation;animation-name:down-arrow-animation;-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}\@-webkit-keyframes down-arrow-animation{0%,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(5px);transform:translateY(5px)}60%{-webkit-transform:translateY(3px);transform:translateY(3px)}}\@keyframes down-arrow-animation{0%,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(5px);transform:translateY(5px)}60%{-webkit-transform:translateY(3px);transform:translateY(3px)}}div.dxp.dxp-banner-image-overlay .sub-feature-image.css-circle-banner{overflow:hidden}div.dxp.dxp-banner-image-overlay .sub-feature-image.css-circle-banner .before-span{content:\"\";position:absolute;width:1369px;height:1369px;background:transparent;z-index:3;border-radius:50%}div.dxp.dxp-banner-image-overlay .sub-feature-image.css-circle-banner .after-span{content:\"\";position:absolute;width:1187px;height:1187px;z-index:2;border-radius:50%}div.dxp.dxp-banner-image-overlay .sub-feature-image.css-circle-banner .overlay-content{z-index:4}div.dxp.dxp-banner-image-overlay .sub-feature-image.css-circle-banner .dxp-down-arrow{z-index:5}div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.css-circle-banner .before-span{right:352px;top:-33.5%}div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.css-circle-banner .after-span{bottom:112px;left:35%}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.css-circle-banner .before-span{top:-350px;right:352px}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.css-circle-banner .after-span{bottom:112px;left:calc(100% - 940px)}div.dxp.dxp-banner-image-overlay .sub-feature-image.long .img-parent{height:568px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay .sub-feature-image.short.css-circle-banner .before-span{width:1369px;height:1369px;right:-637px;top:-845px;-webkit-transform:rotate(-218deg);transform:rotate(-218deg)}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.css-circle-banner .after-span,div.dxp.dxp-banner-image-overlay .sub-feature-image.short.css-circle-banner .after-span{display:none}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.css-circle-banner .before-span{width:1250px;height:1250px;right:-480px}\@media (min-width:768px){div.dxp.dxp-banner-image-overlay .sub-feature-image.long{max-height:650px}div.dxp.dxp-banner-image-overlay .sub-feature-image.long .img-parent,div.dxp.dxp-banner-image-overlay .sub-feature-image.long.solid-background{height:650px;max-height:650px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium{max-height:450px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .img-parent,div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.solid-background{height:450px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short{max-height:350px;height:350px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.image-background .img-parent{height:350px}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content{width:576px;margin-left:36px;padding:0}div.dxp.dxp-banner-image-overlay .sub-feature-image h1{margin-bottom:auto}div.dxp.dxp-banner-image-overlay .sub-feature-image h1+.lead{margin-top:.4375rem}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-title-eyebrow+h1{margin-top:17px;margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-title-eyebrow+.lead{margin-top:17px}div.dxp.dxp-banner-image-overlay .sub-feature-image h1{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image h1+.lead{margin-top:12px}div.dxp.dxp-banner-image-overlay .sub-feature-image .lead,div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .dxp-title-eyebrow,div.dxp.dxp-banner-image-overlay .sub-feature-image.short .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .dxp-title-eyebrow+h1,div.dxp.dxp-banner-image-overlay .sub-feature-image.short .dxp-title-eyebrow+h1{margin-top:19px;margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .dxp-down-arrow{bottom:24px}}\@media (min-width:992px){div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content{width:600px;margin-left:108px}}\@media (min-width:1200px){div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long{overflow:hidden}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .overlay-content,div.dxp.dxp-banner-image-overlay .sub-feature-image.short .overlay-content{width:600px}}\@media (min-width:1440px){div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content{width:600px;margin-left:calc(((100% - 1440px) / 2))}}\@media (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content{margin-left:108px}}\@media (min-width:992px) and (max-width:1199px){div.dxp.dxp-banner-image-overlay .sub-feature-image .cta-links .visit-link:first-child{margin-right:70px}}\@media (min-width:768px) and (max-width:991px){div.dxp.dxp-banner-image-overlay .sub-feature-image .align-middle{padding:88px 2%}div.dxp.dxp-banner-image-overlay .sub-feature-image .cta-links .visit-link:first-child{margin-right:70px}div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.solid-background.extra-long{height:100vh;max-height:100vh}div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.solid-background.long{height:650px;max-height:650px}div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.solid-background.medium{height:450px;max-height:450px}div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.solid-background.short{height:350px;max-height:350px}div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.css-circle-banner.extra-long .img-parent{height:100vh;max-height:100vh}div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay .sub-feature-image.long.css-circle-banner .before-span{right:12.75%;top:calc(100% - 1185px)}div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.css-circle-banner .after-span,div.dxp.dxp-banner-image-overlay .sub-feature-image.long.css-circle-banner .after-span{width:1280px;height:1280px;bottom:19.15%;left:20.5%}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.css-circle-banner .before-span{top:calc(100% - 1000px)}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.css-circle-banner .after-span{bottom:155px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay .sub-feature-image.short.css-circle-banner .before-span{width:1026px;height:1026px;left:calc(100% - 285px);top:-629px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.css-circle-banner .before-span{top:-660px}}\@media (max-width:991px){div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.extra-long,div.dxp.dxp-banner-image-overlay .sub-feature-image.sub-feature-image.extra-long .img-parent{height:100vh;max-height:100vh}}\@media (min-width:576px) and (max-width:767px){div.dxp.dxp-banner-image-overlay .sub-feature-image .cta-links .visit-link{margin-top:16px}div.dxp.dxp-banner-image-overlay .sub-feature-image .cta-links .visit-link:first-child{margin-right:70px}}\@media (max-width:991px){div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content h1{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content h1+.lead{margin-top:8px;margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content .lead{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.image-background,div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.video-background,div.dxp.dxp-banner-image-overlay .sub-feature-image.short.image-background,div.dxp.dxp-banner-image-overlay .sub-feature-image.short.video-background{max-height:100%}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .overlay-content .dxp-title-eyebrow+.lead,div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .overlay-content .dxp-title-eyebrow+h1,div.dxp.dxp-banner-image-overlay .sub-feature-image.short .overlay-content .dxp-title-eyebrow+.lead,div.dxp.dxp-banner-image-overlay .sub-feature-image.short .overlay-content .dxp-title-eyebrow+h1{margin-top:18px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .overlay-content .dxp-title-eyebrow h1+.lead,div.dxp.dxp-banner-image-overlay .sub-feature-image.short .overlay-content .dxp-title-eyebrow h1+.lead{margin-top:12px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.image-background{height:550px;padding-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.image-background .overlay-content{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);position:absolute}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.image-background .img-parent{height:550px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.solid-background .overlay-content{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}}\@media (max-width:767px){div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.css-circle-banner .before-span{right:-50px;top:-82px}div.dxp.dxp-banner-image-overlay .sub-feature-image.extra-long.css-circle-banner .after-span{bottom:250px;left:calc(100% - 400px)}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.solid-background{height:568px;max-height:568px}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.solid-background .before-span{width:730px;height:730px;top:-80px;right:-55px}div.dxp.dxp-banner-image-overlay .sub-feature-image.long.solid-background .after-span{width:696px;height:696px;bottom:185px;left:calc(100% - 350px)}div.dxp.dxp-banner-image-overlay .sub-feature-image.long .overlay-content .lead{margin-bottom:16px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.image-background .overlay-content,div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.video-background .overlay-content{padding-top:28px;padding-bottom:20px;-webkit-transform:none;transform:none;top:auto;position:inherit}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.solid-background{height:456px;max-height:456px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay .sub-feature-image.short.css-circle-banner .before-span{width:900px;height:900px;left:16px;top:-456px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.solid-background{max-height:350px;height:350px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short.solid-background.css-circle-banner .before-span{top:-540px;left:4px}div.dxp.dxp-banner-image-overlay .sub-feature-image.short .img-parent{display:none}div.dxp.dxp-banner-image-overlay .sub-feature-image.video-background.medium .img-parent{height:320px;position:inherit}div.dxp.dxp-banner-image-overlay .sub-feature-image.video-background.short{height:350px}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content .dxp-title-eyebrow+h1{margin-bottom:0;margin-top:14px}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content .dxp-title-eyebrow+.lead{margin-bottom:0;margin-top:8px}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content h1{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content h1+.lead{margin-top:8px}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium .overlay-content .dxp-title-eyebrow+h1{margin-bottom:0;margin-top:12px}}\@media (max-width:575px){div.dxp.dxp-banner-image-overlay .sub-feature-image .play-icon{position:absolute;top:-100px}div.dxp.dxp-banner-image-overlay .sub-feature-image .align-middle{width:90vw;padding:88px 2%}div.dxp.dxp-banner-image-overlay .sub-feature-image .full-width-of-img{border-bottom-left-radius:0}div.dxp.dxp-banner-image-overlay .sub-feature-image .img-parent,div.dxp.dxp-banner-image-overlay .sub-feature-image .overlay-content .cta-links{display:block}div.dxp.dxp-banner-image-overlay .sub-feature-image.medium :not(.solid-background) .overlay-content{-webkit-transform:none;transform:none}div.dxp.dxp-banner-image-overlay .sub-feature-image.short .img-parent{display:none}}\@media (min-width:576px) and (max-width:767px){div.dxp.dxp-banner-image-overlay .sub-feature-image[dir=rtl] .cta-links .visit-link:first-child{margin-left:70px}}\@media (min-width:768px){div.dxp.dxp-banner-image-overlay .sub-feature-image[dir=rtl] .overlay-content{margin-left:0;margin-right:36px}}\@media (min-width:992px){div.dxp.dxp-banner-image-overlay .sub-feature-image[dir=rtl] .overlay-content{margin-right:108px}}\@media (min-width:1200px){div.dxp.dxp-banner-image-overlay .sub-feature-image[dir=rtl] .overlay-content{margin-left:0;margin-right:108px}}\@media (min-width:1440px){div.dxp.dxp-banner-image-overlay .sub-feature-image[dir=rtl] .overlay-content{margin-right:calc(((100% - 1440px) / 2))}}\@media (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-image-overlay .sub-feature-image[dir=rtl] .overlay-content{margin-right:108px}}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.extra-long .overlay-content{max-height:656px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.extra-long .img-parent{max-height:784px;height:784px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .overlay-content{padding-top:64px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .img-parent{max-height:650px;height:650px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .dxp-title-eyebrow{display:none}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .display-text .dxp-title-eyebrow{display:block}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .img-parent{max-height:431px;height:431px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content{bottom:0;padding-top:56px;top:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.align-right{right:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.align-left{left:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content .dxp-title-eyebrow,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content .lead{display:none}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.display-text .dxp-title-eyebrow,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.display-text .lead{display:block}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .img-parent{max-height:304px;height:304px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short.display-text .dxp-title-eyebrow,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short.display-text .lead{display:block}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .dxp-title-eyebrow{letter-spacing:1.8px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{position:absolute;bottom:64px;padding:64px 8.1%;margin-left:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .dxp-title-eyebrow+.lead,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .dxp-title-eyebrow+h1{margin-top:19px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content h1{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content h1+.lead{margin-top:13px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .lead{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-right{left:auto;right:1.9%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-left{right:auto;left:1.9%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-center{right:0;left:0;margin:0 auto}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-bottom{bottom:0;padding:24px;border-radius:3px 3px 0 0;margin-left:24px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .btn-cta{margin-right:70px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .cta-links{margin-top:16px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .cta-links:last-child .btn-cta{margin-right:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .visit-link{margin-top:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .dxp-down-arrow{display: none}div.dxp.dxp-banner-image-overlay .category-tags{display:inline-block;font-size:14px;margin:0;letter-spacing:2.1px;padding:5px 25px;position:absolute;top:0;z-index:1}\@media (min-width:992px){div.dxp.dxp-banner-image-overlay .short .overlay-content.white-block{width:48.8%;top:0}}\@media (max-width:1199px){div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content:nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .btn-cta{margin-right:40px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .cta-links:last-child .btn-cta{margin-right:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .overlay-content.white-block{padding-top:24px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.white-block{padding:48px 8.2% 56px;width:48.8%;top:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short h1{margin-bottom:10px}}\@media (max-width:991px){div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{top:auto}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-left,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-right{left:3.1%;right:3.1%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.white-block{width:93.8%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .overlay-content.white-block{padding-top:56px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.white-block{padding:64px 8.2% 72px;width:48.4%;left:auto}}\@media (min-width:992px) and (max-width:1199px){div.dxp.dxp-banner-image-overlay .cta-links .visit-link:first-child{margin-right:42px}}\@media (min-width:768px) and (max-width:991px){div.dxp.dxp-banner-image-overlay .cta-links .visit-link:first-child{margin-right:45px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .overlay-content{padding-top:56px}}\@media (min-width:576px) and (max-width:767px){div.dxp.dxp-banner-image-overlay .cta-links .visit-link{margin-top:0}div.dxp.dxp-banner-image-overlay .cta-links .visit-link:first-child{margin-right:40px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .block-with-text{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.extra-long .img-parent,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .img-parent,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .img-parent{display:none}}\@media (max-width:767px){div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long{height:336px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{top:0;position:relative;padding-top:40px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-left,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-right{left:24px;right:24px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.white-block{width:91.7%;padding-left:0;padding-right:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .dxp-title-eyebrow+.lead,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .dxp-title-eyebrow+h1{margin-top:11px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content h1+.lead{margin-top:7px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .lead{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .cta-links,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .cta-links:last-child{margin-top:16px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long-feature .overlay-content{padding-top:40px;top:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .overlay-content.white-block{width:100%;padding:56px 24px 64px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.short .img-parent{display:none}}\@media (max-width:575px){div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content{padding-top:41.5px;top:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-left,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.align-right{left:16px;right:16px}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content.white-block{background:none;width:90%}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content h1{margin-bottom:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block .overlay-content .visit-link{margin-top:0}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.extra-long .img-parent{display:block;border-bottom-left-radius:100%;position:relative;max-height:285px;overflow:hidden}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.extra-long .overlay-content .lead,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .overlay-content .lead,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .overlay-content .lead{display:none}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.extra-long .overlay-content.display-text .lead,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .overlay-content.display-text .lead,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long img,div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .overlay-content.display-text .lead{display:block}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.long .overlay-content{position:relative}div.dxp.dxp-banner-image-overlay .sub-feature-bg-block.medium .overlay-content{position:relative;padding-top:96px}}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .overlay-content{margin:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .overlay-content.align-center{right:0;left:0;margin:0 auto}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .btn-cta{margin-left:70px;margin-right:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links:last-child .btn-cta:last-child,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links:last-child .visit-link:first-child{margin-left:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links .visit-link{margin-top:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block.medium .overlay-content{padding-right:24px}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block.short .cta-links .visit-link{margin-top:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.extra-long.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.long.css-circle-banner .before-span{left:352px;right:auto}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.extra-long.css-circle-banner .after-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.long.css-circle-banner .after-span{right:35%}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.medium.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.short.css-circle-banner .before-span{transform:rotate(-135deg);-webkit-transform:rotate(-135deg);right:calc(100% - 285px);left:auto}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.short.css-circle-banner .before-span{left:calc(100% - 285px)}\@media (min-width:992px) and (max-width:1199px){div.dxp.dxp-banner-image-overlay[dir=rtl] .cta-links .visit-link:first-child{margin-left:70px;margin-right:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .cta-links .cta-links:last-child .visit-link:first-child{margin-left:0}}\@media (min-width:768px) and (max-width:991px){div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.extra-long.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.long.css-circle-banner .before-span{left:12.75%;right:auto}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.long.css-circle-banner .before-span{top:-360px}}\@media (min-width:576px) and (max-width:767px){div.dxp.dxp-banner-image-overlay[dir=rtl] .cta-links .visit-link:first-child{margin-left:45px;margin-right:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .cta-links .cta-links:last-child .visit-link:first-child{margin-left:0}}\@media (max-width:1199px){div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .btn-cta,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .btn-cta:first-child{margin-left:40px;margin-right:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links{margin-left:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links .visit-link:first-child{margin-left:42px;margin-right:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links .cta-links:last-child .visit-link:first-child,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .cta-links:last-child .btn-cta{margin-left:0}}\@media (max-width:767px){div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.extra-long.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.long.css-circle-banner .before-span{left:-50px;right:auto}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.extra-long.css-circle-banner .after-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.long.css-circle-banner .after-span{right:calc(100% - 400px)}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.medium.css-circle-banner .before-span,div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image.short.css-circle-banner .before-span{right:16px}}\@media (max-width:575px){div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-bg-block .visit-link{margin-top:0}div.dxp.dxp-banner-image-overlay[dir=rtl] .sub-feature-image .overlay-content{padding-left:0;right:0;margin-right:0}}"; },
        enumerable: true,
        configurable: true
    });
    return BannerImageOverlay;
}());
var IMAGE_BACKGROUND_TYPE$1 = 'image-background';
var VIDEO_BACKGROUND_TYPE$1 = 'video-background';
var SOLID_BACKGROUND_TYPE$1 = 'solid-background';
var BannerRegular = /** @class */ (function () {
    function BannerRegular(hostRef) {
        registerInstance(this, hostRef);
        /** add circle design over banner */
        this.addCircle = false;
        /** animation for overlay content and CTA */
        this.animation = false;
        /** custom mute button in case of disabled controls for HTML5 video */
        this.customMuteButton = false;
        /** custom mute button position */
        this.customMuteButtonPosition = 'top-right';
    }
    /** actions to be performed prior to component loading */
    BannerRegular.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['regular-banner-container', 'js-fontsize', this.theme, this.backgroundType,
            ((this.addCircle && this.backgroundType === SOLID_BACKGROUND_TYPE$1) ? 'css-circle-banner' : ''),
            (this.overlayPosition + "-container")].join(' ');
    };
    /**
     * click listener for routing events on anchor tag
     */
    BannerRegular.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** window resize event */
    BannerRegular.prototype.windowResize = function () {
        this.responsive = this.base.returnBooleanValue(window.innerWidth < 768);
    };
    /** Render the regular banner */
    BannerRegular.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-banner-regular render() : " + "DEVELOPMENT");
        this.containerPositionClass = ['overlay-content', this.overlayPosition].join(' ');
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-banner.min.css" })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass() + " " + this.backgroundType + "-container", "data-theme": this.theme }, styles, h("div", { dir: this.dir, class: this.cssClass }, this.backgroundType === IMAGE_BACKGROUND_TYPE$1 && (h("div", { class: "media-container" }, h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive }))), this.backgroundType === VIDEO_BACKGROUND_TYPE$1 && (h("div", { class: "media-container" }, h("dxp-video", { type: this.videoType, "src-video": this.srcVideo, "disable-controls": this.disableControls, autoplay: this.autoPlay, "src-poster": this.srcPoster, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }))), h("div", { class: "overlay-content " + this.overlayPosition }, h("div", { class: this.animation ? 'text-container overlay-content-animation' : 'text-container' }, this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }), this.titleText && h("h2", { innerHTML: this.titleText }), this.subTitle && h("p", { class: "dxp-lead", innerHTML: this.subTitle })), this.animation ?
            h("div", { class: "slot-wrapper" }, h("slot", null)) : h("slot", null)))));
    };
    Object.defineProperty(BannerRegular.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerRegular, "style", {
        get: function () { return "div.dxp.dxp-banner-regular{overflow:hidden}div.dxp.dxp-banner-regular .regular-banner-container{position:relative}div.dxp.dxp-banner-regular .regular-banner-container.solid-background{height:550px}div.dxp.dxp-banner-regular .regular-banner-container .img-wrapper{overflow:hidden}div.dxp.dxp-banner-regular .regular-banner-container.css-circle-banner:before{content:\"\";position:absolute;width:1133px;height:1057px;top:-630px;z-index:2;border-radius:50%}div.dxp.dxp-banner-regular .regular-banner-container.css-circle-banner:after{content:\"\";position:absolute;width:672px;height:1023px;background-color:transparent;right:275px;top:-243px;z-index:3;border-radius:50%}div.dxp.dxp-banner-regular .regular-banner-container.align-left-container:before{right:-170px}div.dxp.dxp-banner-regular .regular-banner-container.align-right-container:before{right:auto;left:-170px}div.dxp.dxp-banner-regular .regular-banner-container.align-right-container:after{right:auto;left:275px}div.dxp.dxp-banner-regular .regular-banner-container.image-background,div.dxp.dxp-banner-regular .regular-banner-container.video-background{max-height:550px;overflow:hidden}div.dxp.dxp-banner-regular .regular-banner-container.image-background .media-container{height:550px}\@keyframes fadeUp{0%{transform:translateY(100px);-webkit-transform:translateY(100px)}to{transform:translateY(0);-webkit-transform:translateY(0)}}\@-webkit-keyframes fadeUp{0%{transform:translateY(100px);-webkit-transform:translateY(100px)}to{transform:translateY(0);-webkit-transform:translateY(0)}}\@keyframes fadeIn{0%{opacity:0}to{opacity:1}}\@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content-animation{animation:fadeIn 5s forwards,fadeUp 2s normal;-webkit-animation:fadeIn 5s forwards,fadeUp 2s normal}\@keyframes fadeInVisibility{0%{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}\@-webkit-keyframes fadeInVisibility{0%{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}div.dxp.dxp-banner-regular .regular-banner-container .slot-wrapper{animation:fadeInVisibility;animation-delay:2s;animation-duration:3s;animation-fill-mode:forwards;-webkit-animation:fadeInVisibility;-webkit-animation-delay:2s;-webkit-animation-duration:3s;-webkit-animation-fill-mode:forwards;visibility:hidden}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content{position:absolute;margin-left:6.75rem;top:51%;z-index:4;-webkit-transform:translateY(-51%);transform:translateY(-51%);width:600px}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-title-eyebrow+h2{margin-top:.875rem}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-title-eyebrow+.dxp-lead{margin-top:1rem}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content h2{margin-bottom:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content h2+.dxp-lead{margin-top:1rem}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-lead{margin-bottom:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content.align-right{right:0;margin-right:108px}\@media (min-width:1440px){div.dxp.dxp-banner-regular .regular-banner-container .overlay-content.align-right.overlay-content{margin-right:calc(((100% - 1440px) / 2))}}\@media (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-regular .regular-banner-container .overlay-content.align-right.overlay-content{margin-right:108px}}\@media (min-width:1440px){div.dxp.dxp-banner-regular .regular-banner-container .overlay-content{margin-left:calc(((100% - 1440px) / 2))}}\@media (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-regular .regular-banner-container .overlay-content{margin-left:108px}}\@media (max-width:991px){div.dxp.dxp-banner-regular .regular-banner-container.css-circle-banner:before{width:994px;height:1282px;top:-730px;right:-322px;-webkit-transform:rotate(131deg);transform:rotate(131deg)}div.dxp.dxp-banner-regular .regular-banner-container.css-circle-banner:after{width:435px;height:752px;right:134px;top:-68px}div.dxp.dxp-banner-regular .regular-banner-container.align-right-container:before{top:-720px;-webkit-transform:rotate(48deg);transform:rotate(48deg);left:-300px;right:auto}div.dxp.dxp-banner-regular .regular-banner-container.align-right-container:after{left:134px}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content{margin-left:2.25rem;width:67.1%;z-index:4}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content.align-right{margin-left:2.25rem;margin-right:auto;right:auto}}\@media (max-width:767px){div.dxp.dxp-banner-regular .regular-banner-container.css-circle-banner:before{width:569px;height:614px;left:-17px;top:-256px;-webkit-transform:rotate(-50deg);transform:rotate(-50deg)}div.dxp.dxp-banner-regular .regular-banner-container.css-circle-banner:after{width:1382px;height:976px;right:-52px;top:-192px}div.dxp.dxp-banner-regular .regular-banner-container.align-right-container:before{left:-212px;top:-277px;-webkit-transform:rotate(-14deg);transform:rotate(14deg)}div.dxp.dxp-banner-regular .regular-banner-container.align-right-container:after{left:-52px}div.dxp.dxp-banner-regular .regular-banner-container.image-background .overlay-content,div.dxp.dxp-banner-regular .regular-banner-container.video-background .overlay-content{top:auto;-webkit-transform:none;transform:none;position:inherit}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content{float:left;width:100%;margin-left:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content.align-right{margin-left:0;margin-right:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-title-eyebrow+.dxp-lead,div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-title-eyebrow+h2{margin-top:.3125rem}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content h2{margin-bottom:0}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content h2+.dxp-lead{margin-top:.625rem}div.dxp.dxp-banner-regular .regular-banner-container .overlay-content .dxp-lead{margin-bottom:0}div.dxp.dxp-banner-regular.image-background-container .image-background{padding:2rem 1rem 1rem;max-height:inherit}div.dxp.dxp-banner-regular.image-background-container .image-background .media-container{margin-bottom:1.8125rem;height:auto}div.dxp.dxp-banner-regular.solid-background-container{padding:0 1rem}div.dxp.dxp-banner-regular.video-background-container .video-background{padding:2rem 1rem 1rem;max-height:inherit}div.dxp.dxp-banner-regular.video-background-container .video-background .media-container{margin-bottom:1.8125rem}}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container.align-left-container:before{right:-170px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container.align-left-container:after{right:230px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container .overlay-content.align-left{left:0}\@media (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container .overlay-content{margin-left:108px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container .overlay-content.align-right{margin-right:108px}}\@media (max-width:991px){div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container.align-left-container:after{right:170px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container .overlay-content{margin-right:2.25rem}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container .overlay-content.align-right{margin-left:0}}\@media (max-width:767px){div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container.align-left-container:after{right:-42px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container.align-right-container:before{left:-17px;top:-267px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container.align-right-container:after{right:auto;left:-46px}div.dxp.dxp-banner-regular[dir=rtl] .regular-banner-container .overlay-content{margin-right:0}}"; },
        enumerable: true,
        configurable: true
    });
    return BannerRegular;
}());
var BannerSmallImage = /** @class */ (function () {
    function BannerSmallImage(hostRef) {
        registerInstance(this, hostRef);
        /** to give custom id to banner */
        this.customId = 'banner-small';
        /** whether image should use its size or be responsive */
        this.responsive = true;
    }
    /** actions to be performed prior to component loading */
    BannerSmallImage.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['banner-small', 'js-fontsize', this.theme].join(' ');
        this.responsive = (this.base.getDeviceWidthType() === 'sm' || this.base.getDeviceWidthType() === 'md');
    };
    /** Actions to perform after component load */
    BannerSmallImage.prototype.componentDidLoad = function () {
        if (this.base.getDeviceWidthType() === 'xl' || this.base.getDeviceWidthType() === 'lg') {
            var contentWrapper = this.base.shadowRootQuerySelector(this.element, '.content-wrapper', false);
            var imageWrapper = this.base.shadowRootQuerySelector(this.element, '.img-wrapper', false);
            if (contentWrapper && imageWrapper) {
                imageWrapper.style.height = contentWrapper.clientHeight + "px";
            }
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    BannerSmallImage.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** to generate dynamic styles */
    BannerSmallImage.prototype.renderStyles = function () {
        var bgColor = this.cardColor ? "background-color: " + this.cardColor + ";" : '';
        var txtColor = this.textColor ? "color: " + this.textColor + ";" : '';
        return (this.textColor || this.cardColor) ?
            "#" + this.customId + " .banner-state{\n            " + bgColor + " " + txtColor + "\n          }\n          #" + this.customId + " .banner-state .dxp-title-eyebrow,\n          #" + this.customId + " .banner-state .dxp-lead,\n          #" + this.customId + " .banner-state h2{\n            color: inherit;\n          }" : '';
    };
    /** Render the banner */
    BannerSmallImage.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-banner-small render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-banner.min.css" })],
            h("style", null, this.renderStyles())
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, h("div", { id: this.customId, class: this.cssClass }, h("div", { class: "banner-large banner-small-content" }, h("div", { class: "banner-state " + this.positionOfImageClass }, h("div", { class: "img-wrapper" }, h("dxp-image", { "data-theme": this.theme, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "open-in-new-tab": this.openInNewTab, responsive: this.responsive })), h("div", { class: "content-wrapper" }, h("div", { class: "text-container" }, this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }), this.titleText && h("h2", { innerHTML: this.titleText }), this.subTitle && h("p", { class: "dxp-lead", innerHTML: this.subTitle })), h("slot", null)))))));
    };
    Object.defineProperty(BannerSmallImage.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerSmallImage, "style", {
        get: function () { return "div.dxp.dxp-banner-small-image .img-wrapper{overflow:hidden}div.dxp.dxp-banner-small-image .banner-small-content{position:relative;width:100%;margin:auto;min-height:415px;overflow:hidden;border-radius:4px}div.dxp.dxp-banner-small-image .banner-small-content .dxp-title-eyebrow{font-size:1rem;margin-bottom:1.5625rem}div.dxp.dxp-banner-small-image .banner-small-content h2{font-size:2rem;margin-bottom:.625rem;line-height:1.2}div.dxp.dxp-banner-small-image .banner-small-content .dxp-lead{font-size:1rem;line-height:1.5rem;margin-bottom:1.5rem}div.dxp.dxp-banner-small-image .banner-small-content .img-wrapper{width:50%;position:relative}\@media (min-width:992px){div.dxp.dxp-banner-small-image .banner-small-content .img-wrapper{min-height:415px}}div.dxp.dxp-banner-small-image .banner-small-content .content-wrapper{width:50%;height:100%;padding:2.5rem 2.5rem 6rem 2.5rem;word-break:break-word;white-space:pre-wrap;white-space:normal}div.dxp.dxp-banner-small-image .banner-small-content .banner-state{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}div.dxp.dxp-banner-small-image .banner-small-content .banner-state.reverse{-ms-flex-direction:row-reverse;flex-direction:row-reverse}\@media (max-width:991px){div.dxp.dxp-banner-small-image .banner-small-content{-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-banner-small-image .banner-small-content .content-wrapper,div.dxp.dxp-banner-small-image .banner-small-content .img-wrapper{width:100%}}"; },
        enumerable: true,
        configurable: true
    });
    return BannerSmallImage;
}());
var BannerSolidBackground = /** @class */ (function () {
    function BannerSolidBackground(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    BannerSolidBackground.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['dxp-cta-banner', 'js-fontsize', this.theme, this.bannerSize].join(' ');
    };
    /**
     * click listener for routing events on anchor tag
     */
    BannerSolidBackground.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the banner */
    BannerSolidBackground.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-banner-solid-background render() : " + "DEVELOPMENT");
        this.overlayClass = ['overlay-content', this.overlayPosition].join(' ');
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-banner.min.css" })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, h("div", { id: "cta-banner", class: this.cssClass }, h("div", { class: this.overlayClass }, h("p", { class: "dxp-title-eyebrow" }, this.eyebrowTitle), this.titleText ? h("h1", null, this.titleText) : '', h("p", { class: "lead dxp-hidden-sm-down" }, this.subTitle), h("slot", null)))));
    };
    Object.defineProperty(BannerSolidBackground.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerSolidBackground, "style", {
        get: function () { return "\@media (min-width:576px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:36px;width:61.5%}div.dxp.dxp-banner-solid-background .dxp-cta-banner,div.dxp.dxp-banner-solid-background .sub-feature-bg-block,div.dxp.dxp-banner-solid-background .sub-feature-default,div.dxp.dxp-banner-solid-background .sub-feature-image{max-height:800px;overflow:hidden;position:relative}}\@media (min-width:992px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:108px;width:54.6%}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner-solid-background .dxp-cta-banner,div.dxp.dxp-banner-solid-background .sub-feature-bg-block,div.dxp.dxp-banner-solid-background .sub-feature-default,div.dxp.dxp-banner-solid-background .sub-feature-image{max-height:720px;overflow:hidden;position:relative}}\@media (min-width:1200px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content p:last-child,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px) and (min-width:1200px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{margin-left:108px}}\@media (min-width:1200px) and (min-width:1440px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{margin-left:calc(((100% - 1440px) / 2))}}\@media (min-width:1200px) and (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{margin-left:108px}}\@media (min-width:1200px){div.dxp.dxp-banner-solid-background .dxp-cta-banner,div.dxp.dxp-banner-solid-background .sub-feature-bg-block,div.dxp.dxp-banner-solid-background .sub-feature-default,div.dxp.dxp-banner-solid-background .sub-feature-image{max-height:784px;overflow:hidden;position:relative}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-links{display:block}div.dxp.dxp-banner-solid-background .cta-links .visit-link:first-child{margin-right:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner,div.dxp.dxp-banner-solid-background .sub-feature-bg-block,div.dxp.dxp-banner-solid-background .sub-feature-default,div.dxp.dxp-banner-solid-background .sub-feature-image{max-height:614px;overflow:hidden}}div.dxp.dxp-banner-solid-background .long{height:592px;position:relative;overflow:hidden}div.dxp.dxp-banner-solid-background .long .dxp-title-eyebrow{letter-spacing:1.8px}div.dxp.dxp-banner-solid-background .long .overlay-content .lead{line-height:32px;margin-bottom:0}div.dxp.dxp-banner-solid-background .long .overlay-content h1:last-child{margin-bottom:0}div.dxp.dxp-banner-solid-background .long.cta-banner,div.dxp.dxp-banner-solid-background .long.sub-feature-bg-block,div.dxp.dxp-banner-solid-background .long.sub-feature-default,div.dxp.dxp-banner-solid-background .long.sub-feature-image{max-height:592px;overflow:hidden;position:relative}\@media (min-width:576px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:36px;width:61.5%}}\@media (min-width:992px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:108px;width:54.6%}div.dxp.dxp-banner-solid-background .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner-solid-background .cta-banner .overlay-content p:last-child,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner-solid-background .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px) and (min-width:1200px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{margin-left:108px}}\@media (min-width:1200px) and (min-width:1440px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{margin-left:calc(((100% - 1440px) / 2))}}\@media (min-width:1200px) and (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{margin-left:108px}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner-solid-background .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}}\@media (max-width:1199px){div.dxp.dxp-banner-solid-background .long.cta-banner,div.dxp.dxp-banner-solid-background .long.sub-feature-bg-block,div.dxp.dxp-banner-solid-background .long.sub-feature-default,div.dxp.dxp-banner-solid-background .long.sub-feature-image{max-height:536px;overflow:hidden}}\@media (max-width:991px){div.dxp.dxp-banner-solid-background .long.cta-banner,div.dxp.dxp-banner-solid-background .long.sub-feature-bg-block,div.dxp.dxp-banner-solid-background .long.sub-feature-default,div.dxp.dxp-banner-solid-background .long.sub-feature-image{max-height:600px;overflow:hidden}}\@media (max-width:767px){div.dxp.dxp-banner-solid-background .long.cta-banner,div.dxp.dxp-banner-solid-background .long.sub-feature-bg-block,div.dxp.dxp-banner-solid-background .long.sub-feature-default,div.dxp.dxp-banner-solid-background .long.sub-feature-image{max-height:336px;overflow:hidden}div.dxp.dxp-banner-solid-background .long.sub-feature-bg-block .overlay-content{position:absolute}div.dxp.dxp-banner-solid-background .long.sub-feature-image .overlay-content .cta-links{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .long.cta-banner,div.dxp.dxp-banner-solid-background .long.sub-feature-bg-block,div.dxp.dxp-banner-solid-background .long.sub-feature-default,div.dxp.dxp-banner-solid-background .long.sub-feature-image{max-height:400px;overflow:hidden}div.dxp.dxp-banner-solid-background .long.sub-feature-image .overlay-content{top:0;padding-top:64px}}div.dxp.dxp-banner-solid-background .medium{max-height:432px;overflow:hidden}div.dxp.dxp-banner-solid-background .medium img{position:relative}\@media (max-width:1199px){div.dxp.dxp-banner-solid-background .medium{max-height:392px}}\@media (max-width:991px){div.dxp.dxp-banner-solid-background .medium{max-height:440px}div.dxp.dxp-banner-solid-background .medium.cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .medium.sub-feature-bg-block .overlay-content{padding:0 16px}}\@media (max-width:767px){div.dxp.dxp-banner-solid-background .medium{max-height:248px}div.dxp.dxp-banner-solid-background .medium.sub-feature-bg-block .overlay-content{position:relative;padding-left:24px;left:auto;right:auto}div.dxp.dxp-banner-solid-background .medium.sub-feature-bg-block .overlay-content.white-block{padding-top:0;bottom:auto;top:40px}div.dxp.dxp-banner-solid-background .medium.sub-feature-image .overlay-content .cta-links{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .medium{max-height:320px}}\@media (min-width:576px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:36px;width:61.5%}}\@media (min-width:992px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:108px;width:54.6%}div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content p:last-child,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px) and (min-width:1200px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{margin-left:108px}}\@media (min-width:1200px) and (min-width:1440px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{margin-left:calc(((100% - 1440px) / 2))}}\@media (min-width:1200px) and (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{margin-left:108px}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .cta-banner.medium .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default.medium .overlay-content :nth-last-child(n+3){width:100%}}div.dxp.dxp-banner-solid-background .short{max-height:304px;overflow:hidden}div.dxp.dxp-banner-solid-background .short img{position:relative}div.dxp.dxp-banner-solid-background .short.sub-feature-bg-block .overlay-content{padding-top:56px;top:0;bottom:0}div.dxp.dxp-banner-solid-background .short.sub-feature-bg-block .overlay-content.align-left{left:auto}div.dxp.dxp-banner-solid-background .short.sub-feature-bg-block .cta-links{display:block}\@media (min-width:576px) and (max-width:991px){div.dxp.dxp-banner-solid-background .short.cta-banner h1,div.dxp.dxp-banner-solid-background .short.sub-feature-image h1{margin-bottom:0}}\@media (max-width:1199px){div.dxp.dxp-banner-solid-background .short{max-height:288px}}\@media (max-width:991px){div.dxp.dxp-banner-solid-background .short{max-height:320px}}\@media (max-width:767px){div.dxp.dxp-banner-solid-background .short{max-height:200px}div.dxp.dxp-banner-solid-background .short.sub-feature-bg-block .overlay-content .cta-links,div.dxp.dxp-banner-solid-background .short.sub-feature-image .overlay-content .cta-links{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .short{max-height:288px}div.dxp.dxp-banner-solid-background .short .overlay-content{top:64px;padding-bottom:64px}}\@media (min-width:576px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:36px;width:61.5%}}\@media (min-width:992px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:108px;width:54.6%}div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content p:last-child,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px) and (min-width:1200px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{margin-left:108px}}\@media (min-width:1200px) and (min-width:1440px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{margin-left:calc(((100% - 1440px) / 2))}}\@media (min-width:1200px) and (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{margin-left:108px}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .cta-banner.short .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner-solid-background .sub-feature-default.short .overlay-content :nth-last-child(n+3){width:100%}}div.dxp.dxp-banner-solid-background .dxp-cta-banner{position:relative}div.dxp.dxp-banner-solid-background .dxp-cta-banner .title-eyebrow{letter-spacing:1.8px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long .overlay-content,div.dxp.dxp-banner-solid-background .dxp-cta-banner.long .overlay-content,div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .overlay-content{position:absolute}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long .overlay-content.align-right,div.dxp.dxp-banner-solid-background .dxp-cta-banner.long .overlay-content.align-right,div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content.align-right,div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .overlay-content.align-right{left:auto;right:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long .overlay-content.align-left,div.dxp.dxp-banner-solid-background .dxp-cta-banner.long .overlay-content.align-left,div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content.align-left,div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .overlay-content.align-left{right:auto;left:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long .overlay-content.align-center,div.dxp.dxp-banner-solid-background .dxp-cta-banner.long .overlay-content.align-center,div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content.align-center,div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .overlay-content.align-center{left:0;right:0;margin:0 auto}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long{height:784px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.long{height:592px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium{height:433px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short{height:304px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .dxp-title-eyebrow{display:none}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content .lead{line-height:32px;margin-bottom:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner .overlay-content h1:last-child{margin-bottom:0}div.dxp.dxp-banner-solid-background .dxp-cta-links{margin:10px 0 0 0;display:inline-block}div.dxp.dxp-banner-solid-background .dxp-cta-links .btn-cta:first-child,div.dxp.dxp-banner-solid-background .dxp-cta-links .visit-link:first-child{margin-right:70px}div.dxp.dxp-banner-solid-background .dxp-cta-links:last-child .btn-cta:last-child,div.dxp.dxp-banner-solid-background .dxp-cta-links:last-child .visit-link:first-child{margin-right:0}\@media (min-width:576px){div.dxp.dxp-banner-solid-background{margin-right:24px}}\@media (min-width:768px){div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content{margin:0;margin-left:24px;margin-right:24px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .lead{margin-bottom:6px}}\@media (max-width:1199px){div.dxp.dxp-banner-solid-background .dxp-cta-banner .dxp-cta-links .visit-link:first-child{margin-right:70px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long{height:720px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.long{height:536px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium{height:392px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short{height:288px}}\@media (min-width:768px) and (max-width:991px){div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long{height:800px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long .lead{margin-bottom:28px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.long{height:600px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium{height:440px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short{height:320px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .overlay-content{width:53.4%}div.dxp.dxp-banner-solid-background .dxp-cta-banner .dxp-cta-links .visit-link:first-child{margin-right:70px}}\@media (max-width:991px){div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .lead{display:none}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content{width:95.8%}}\@media (min-width:576px) and (max-width:767px){div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long{height:448px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.long{height:336px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium{height:248px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short{height:200px}div.dxp.dxp-banner-solid-background .dxp-cta-banner .dxp-cta-links .visit-link{margin-top:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner .dxp-cta-links .visit-link:first-child{margin-right:70px}}\@media (max-width:767px){div.dxp.dxp-banner-solid-background .dxp-cta-banner h1{margin-bottom:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner .dxp-cta-links{margin-top:0}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long{height:528px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.long{height:400px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium{height:320px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.short{height:288px}div.dxp.dxp-banner-solid-background .dxp-cta-banner.extra-long .overlay-content,div.dxp.dxp-banner-solid-background .dxp-cta-banner.long .overlay-content,div.dxp.dxp-banner-solid-background .dxp-cta-banner.medium .overlay-content,div.dxp.dxp-banner-solid-background .dxp-cta-banner.short .overlay-content{top:64px}div.dxp.dxp-banner-solid-background .dxp-cta-banner h1{margin-bottom:0}div.dxp.dxp-banner-solid-background .dxp-cta-banner .dxp-cta-links{margin-top:16px}}div.dxp.dxp-banner-solid-background [dir=rtl] .overlay-content{margin:0 24px 0 24px;right:0}div.dxp.dxp-banner-solid-background [dir=rtl] .dxp-cta-links .visit-link:first-child{margin-right:0;margin-left:70px}div.dxp.dxp-banner-solid-background [dir=rtl] .dxp-cta-links:last-child .visit-link:first-child{margin-left:0}div.dxp.dxp-banner-solid-background [dir=rtl] .dxp-cta-links .visit-link:first-child{margin-right:70px}div.dxp.dxp-banner-solid-background [dir=rtl] .dxp-cta-links .dxp-cta-banner .dxp-cta-links .visit-link:first-child{margin-left:70px;margin-right:0}div.dxp.dxp-banner-solid-background [dir=rtl] .dxp-cta-links .dxp-cta-banner .dxp-cta-links .cta-links:last-child .visit-link:first-child{margin-left:0}div.dxp.dxp-banner-solid-background [dir=rtl] .dxp-cta-links .dxp-cta-banner.short .visit-link{margin-top:0}\@media (max-width:767px){div.dxp.dxp-banner-solid-background [dir=rtl] .overlay-content{margin-top:0}}\@media (max-width:575px){div.dxp.dxp-banner-solid-background [dir=rtl] .overlay-content{margin-right:0}}\@media (min-width:576px){div.dxp.dxp-banner-solid-background .cta-banner .overlay-content,div.dxp.dxp-banner-solid-background .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}div.dxp.dxp-banner-solid-background .cta-banner,div.dxp.dxp-banner-solid-background .sub-feature-bg-block,div.dxp.dxp-banner-solid-background .sub-feature-default,div.dxp.dxp-banner-solid-background .sub-feature-image{max-height:448px;overflow:hidden;position:relative}}\@media (min-width:1440px){div.dxp.dxp-banner-solid-background .overlay-content{margin-right:calc(((100% - 1440px) / 2));margin-left:0}}\@media (min-width:1440px) and (max-width:1656px){div.dxp.dxp-banner-solid-background .overlay-content{margin-right:108px}}"; },
        enumerable: true,
        configurable: true
    });
    return BannerSolidBackground;
}());
var messages$1 = {
    'en': {
        placeholder: 'Search',
        searchIconAccessibilityText: 'Click search icon',
        listText: 'Select search item from list',
        selectedItem: 'Current selected {{item}}',
        clear: 'Click to clear search box',
        close: 'Click to close search popup',
        clearText: 'Clear',
        closeText: 'Close',
        ctaText: 'View all results',
        customMessage: 'Please enter search keyword. Autosuggestions will be shown after 3 characters'
    },
    'es': {
        placeholder: 'Buscar',
        searchIconAccessibilityText: 'Haga clic en el icono de búsqueda',
        listText: 'Seleccione el elemento de búsqueda de la lista',
        selectedItem: 'Seleccionado actualmente {{item}}',
        close: 'Haga clic para cerrar la ventana emergente de búsqueda',
        closeText: 'Cerrar',
        clear: 'Haga clic para borrar el cuadro de búsqueda',
        clearText: 'Claro',
        ctaText: 'Ver todos los resultados',
        customMessage: 'Por favor introduzca la palabra clave de búsqueda. Se mostrarán autosugestiones después de 3 caracteres'
    }
};
/** common XMLHttpRequest for handling fetch request */
// currently using this XMLHttpRequest in search component to fetch the data
var xmlApi;
// Create the XHR request
var request = new XMLHttpRequest();
var fetchRequest = function (url, params) {
    // Return it as a Promise
    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4) {
                return;
            }
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            }
            else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        // If error
        request.onerror = function () {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };
        // Setup our HTTP request
        request.open(params.method, url, true);
        // Setup our HTTP request headers
        if (params.headers) {
            Object.keys(params.headers).forEach(function (key) {
                request.setRequestHeader(key, params.headers[key]);
            });
        }
        // Send the request
        request.send(params.body);
    });
};
xmlApi = {
    // exporting XMLHttpRequest object to use in search component to abort the previous fetch calls
    request: request,
    fetchRequest: fetchRequest
};
var xmlApi$1 = xmlApi;
var SEARCH = 'dxp-search';
var SEARCHBOX_CLASS = '.searchbox';
var SEARCH_BAR_CLASS = '.search-bar';
var DROPDOWN_LIST_ITEM = 'dxp-dropdown-list-item';
var SEARCH_ACCESSIBILITY_TEXT = 'Search:searchIconAccessibilityText';
var NO_BORDER_RADIUS = 'no-border-radius';
var BLOCK = ' dxp-block';
var SEARCH_CLEAR = 'Search:clear';
var SEARCH_LIST_TEXT = 'Search:listText';
var SEARCH_SELECTED_ITEM = 'Search:selectedItem';
var Search = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** onEnterFocus - focus flag for accessibility */
        this.onEnterFocus = false;
        /** responseData - service response data */
        this.responseData = [];
        /** searchDataCombined - duplicates removed combined data  */
        this.searchDataCombined = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchBoxList - to show/hide the search items list */
        this.showSearchBoxList = false;
        /** suggesterData - dropdown suggester data */
        this.suggesterData = [];
        /** cfq - suggester config object Context Filter Query */
        this.cfq = '';
        /** cfqLocale - to add to cfq on locale change */
        this.cfqLocale = '';
        /** searchBoxSize - defines the height of search box */
        this.searchBoxSize = 'lg';
        /** searchType - search render type, can be advance or simple  */
        this.searchType = 'advance';
        this.searchTermChanged = createEvent(this, "searchTermChanged", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Search', messages$1);
        if (this.suggestApiUrl &&
            this.suggestCount &&
            this.suggestDictionary && this.suggestCollection && this.cfq) {
            this.suggestEndPoint = "" + (this.suggestApiUrl + this.suggestCollection);
            this.cfqLocale = this.cfqLocale ? this.cfqLocale : this.locale.toLowerCase().replace('_', '-');
            this.suggesterConfig = {
                'suggest.count': this.suggestCount,
                'suggest.dictionary': this.suggestDictionary,
                'suggest': 'true',
                'suggest.cfq': encodeURIComponent(dxp.util.addEscapeCharacter("" + this.cfq + this.cfqLocale + "*"))
            };
        }
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        // creates the schema tag for SEO
        this.schemaScript();
        // HTML elements
        this.inputBoxSearch = this.base.shadowRootQuerySelector(this.element, SEARCHBOX_CLASS) || this.base.shadowRootQuerySelector(this.element, SEARCH_BAR_CLASS);
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    class_1.prototype.componentDidUpdate = function () {
        if (this.onEnterFocus) {
            var inputFocus = document.querySelector(SEARCH)
                ? document.querySelector(SEARCH).querySelector(SEARCHBOX_CLASS)
                : document.querySelector(SEARCH).querySelector(SEARCHBOX_CLASS);
            this.focusElement(inputFocus);
        }
    };
    /** for mouse click outside of  component */
    class_1.prototype.clickEvent = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var isSearchClick;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!e.target.classList.contains('dxp-list-container') && !e.target.classList.contains('searchbox')) {
                            this.showSearchBoxList = false;
                        }
                        isSearchClick = e.target.closest(SEARCH);
                        if (!(!isSearchClick && this.searchType === 'advance')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.closeSearchBox()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** for accessibility implementation */
    class_1.prototype.handleKeyUp = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var keycode, target, inputElement, searchIcon, closeIcon, clearIcon, searchBox, searchBar, inputSearch, closeSearchIcon, parentLi, nextEl, prevEl, inputElement, li, li;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keycode = e.keyCode;
                        target = e.target
                            ? e.target.activeElement
                            : e.target;
                        if (!(target && target.classList.contains('cta-container'))) return [3 /*break*/, 1];
                        if ((keycode === 13 || keycode === 32)) {
                            this.onViewAllSelection();
                        }
                        else if (keycode === 38) {
                            target.previousElementSibling.focus();
                        }
                        else if (keycode === 9) {
                            inputElement = this.getInputElement();
                            this.showSearchBoxList = false;
                            inputElement.focus();
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        searchIcon = target.classList.contains('search-icon');
                        closeIcon = target.classList.contains('dxp-icon-close');
                        clearIcon = target.classList.contains('dxp-icon-clear');
                        searchBox = target.classList.contains('searchbox');
                        searchBar = target.classList.contains('search-bar');
                        inputSearch = target.classList.contains('search-text');
                        closeSearchIcon = target.classList.contains('search-wrapper-close-icon');
                        parentLi = target;
                        nextEl = target.nextElementSibling;
                        prevEl = target.previousElementSibling;
                        if (!(keycode === 13 || keycode === 32)) return [3 /*break*/, 6];
                        if (searchIcon) {
                            this.onEnterFocus = true;
                            this.showSearchBox = true;
                        }
                        if (!(closeIcon && !clearIcon)) return [3 /*break*/, 3];
                        this.showSearchBox = false;
                        return [4 /*yield*/, this.clearSearchBox()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(closeIcon && clearIcon)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.clearSearchBox()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        /** on enter and space key, search for the key */
                        if (inputSearch) {
                            this.searchData(e, 'keyEvent');
                        }
                        /** on enter and space key, select suggestions */
                        if (parentLi.classList.contains(DROPDOWN_LIST_ITEM)) {
                            this.selectSuggestion(e, 'keyEvent');
                        }
                        if (keycode === 13 && searchBox) {
                            this.searchData(e, 'keyEvent');
                            this.showSearchBoxList = false;
                        }
                        _a.label = 6;
                    case 6:
                        if (keycode === 9 && e.shiftKey && clearIcon) {
                            inputElement = this.getInputElement();
                            inputElement.focus();
                        }
                        /** for down arrow key */
                        if (keycode === 40 && searchBox && this.showSearchBoxList && this.showSuggestions) {
                            li = target.closest('div').nextElementSibling.querySelector('li');
                            this.focusElement(li);
                        }
                        /** for down arrow key */
                        if (keycode === 40 && searchBar) {
                            li = target.closest('div').nextElementSibling.querySelector('li');
                            li.focus();
                        }
                        /** for down arrow key */
                        if (keycode === 40 && parentLi.classList.contains(DROPDOWN_LIST_ITEM) && nextEl && !searchBox) {
                            this.focusElement(nextEl);
                        }
                        /** for up arrow key */
                        if (keycode === 38 && parentLi.classList.contains(DROPDOWN_LIST_ITEM) && prevEl) {
                            this.focusElement(prevEl);
                        }
                        if (!(keycode === 27 && (searchBox || inputSearch))) return [3 /*break*/, 8];
                        this.showSearchBox = false;
                        return [4 /*yield*/, this.clearSearchBox()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        /** on tab key, hide search box list */
                        if (keycode === 9 && searchBox) {
                            this.onEnterFocus = false;
                            this.showSearchBoxList = false;
                        }
                        /** on tab key, hide search box list */
                        if (keycode === 9 && closeSearchIcon) {
                            this.focusElement(prevEl);
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Method to clear the searchbox value */
    class_1.prototype.clearSearchBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.clearInputFieldValue();
                this.inputBoxSearch.focus();
                return [2 /*return*/];
            });
        });
    };
    /** Method to hide searchbox */
    class_1.prototype.closeSearchBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showSearchBox = false;
                this.clearInputFieldValue();
                return [2 /*return*/];
            });
        });
    };
    /** Method to show searchbox */
    class_1.prototype.searchBoxToggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.showSearchBox = true;
                return [2 /*return*/];
            });
        });
    };
    /** Clear input box field value */
    class_1.prototype.clearInputFieldValue = function () {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        var inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.value = '';
            this.searchValue = '';
        }
    };
    /** disable auto-writer */
    class_1.prototype.disableAutowriter = function () {
        var autowriterWrapper = this.base.shadowRootQuerySelector(this.element, '.autowriter-wrapper');
        var homePageWrapper = this.base.shadowRootQuerySelector(this.element, '.wrapper-home-search');
        var autowriterTag = this.element.querySelector('dxp-autowriter');
        autowriterTag.clearAutoWriterIntervals();
        homePageWrapper.querySelector('input').focus();
        autowriterWrapper.classList.add('dxp-none');
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** Get method to fetch the service data */
    class_1.prototype.getData = function (config, endPointUrl, query) {
        return __awaiter(this, void 0, void 0, function () {
            var configJson, bodyData, opts, json;
            var _this = this;
            return __generator(this, function (_a) {
                configJson = config;
                if (endPointUrl.indexOf('suggest') > -1) {
                    configJson['suggest.q'] = encodeURIComponent(query);
                }
                bodyData = Object.keys(configJson).map(function (key) {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(configJson[key]);
                }).join('&');
                opts = {
                    method: 'POST',
                    body: bodyData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                };
                try {
                    // aborting the previous xhr request call
                    if (xmlApi$1.request) {
                        xmlApi$1.request.abort();
                    }
                    json = xmlApi$1.fetchRequest(endPointUrl, opts)
                        .then(function (data) {
                        dxp.log.debug(_this.element.tagName, 'getData()', "xhr request success");
                        return JSON.parse(data['response']);
                    })
                        .catch(function (error) {
                        dxp.log.debug(_this.element.tagName, 'getData()', "xhr request cancelled/failed : " + JSON.stringify(error));
                    });
                    this.responseData = json;
                    return [2 /*return*/, this.responseData];
                }
                catch (e) {
                    dxp.log.error(this.element.tagName, 'getData()', "fetch failed", e);
                }
                return [2 /*return*/];
            });
        });
    };
    /** method to return input element reference  */
    class_1.prototype.getInputElement = function () {
        return this.element
            ? this.element.querySelector(SEARCHBOX_CLASS) || this.element.querySelector(SEARCH_BAR_CLASS)
            : this.element.querySelector(SEARCHBOX_CLASS) || this.element.querySelector(SEARCH_BAR_CLASS);
    };
    /** method to return search dropdown reference  */
    class_1.prototype.getSearchListElement = function () {
        return this.element
            ? this.element.querySelector('.dxp-list-container')
            : this.element.getElementsByClassName('dxp-list-container')[0];
    };
    /** method to fetch the search suggester data */
    class_1.prototype.handleChange = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, _i, _b, searchData, item, a, tokens, tokenslength, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = e.trim();
                        this.searchDataCombined = [];
                        this.suggesterData = [];
                        if (!(query.length >= 3)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getData(this.suggesterConfig, this.suggestEndPoint, query)];
                    case 1:
                        _a.responseData = _c.sent();
                        if (this.responseData && this.responseData.suggest && this.responseData.suggest.contentSuggester[query]) {
                            this.suggesterData = this.responseData.suggest.contentSuggester[query].suggestions;
                        }
                        for (_i = 0, _b = this.suggesterData; _i < _b.length; _i++) {
                            searchData = _b[_i];
                            item = searchData.term.toLowerCase();
                            a = item.indexOf(query.toLowerCase());
                            item = item.substr(a, item.length);
                            tokens = item.split(' ');
                            tokenslength = tokens.length;
                            item = '';
                            for (i = 0; i < tokenslength && i < 5; i++) {
                                item += tokens[i];
                                item += ' ';
                            }
                            this.searchDataCombined.push(item);
                        }
                        this.searchDataCombined = this.removeDuplicates(this.searchDataCombined);
                        this.suggesterData.length > 0
                            ? this.showSearchBoxList = true
                            : this.showSearchBoxList = false;
                        return [3 /*break*/, 3];
                    case 2:
                        this.showSearchBoxList = false;
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** on li item selection emit event */
    class_1.prototype.onListItemSelection = function (text) {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        var inputElement = this.getInputElement();
        inputElement.value = text;
        this.showSearchBoxList = false;
        if (this.resultPageUrl && this.resultPageExtension && this.searchParamKey) {
            this.redirectPage(inputElement.value);
        }
        else {
            dxp.log.debug(this.element.tagName, 'onListItemSelection()', "event emit for SPA");
            this.searchTermChanged.emit({ 'searchTerm': inputElement.value });
        }
    };
    /** handler method for input change */
    class_1.prototype.onTextInput = function (event) {
        var _this = this;
        this.searchValue = event.target.value.trim();
        if (this.showSuggestions) {
            this.handleChange(event.target.value)
                .then(function () { return dxp.log.info(_this.element.tagName, 'onTextInput()', "in handleChange"); })
                .catch(function (err) { return dxp.log.error(_this.element.tagName, 'onTextInput()', "in handleChange :" + err); });
        }
    };
    /** on view item selection emit event */
    class_1.prototype.onViewAllSelection = function () {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        var inputElement = this.getInputElement();
        this.showSearchBoxList = false;
        if (this.resultPageUrl && this.resultPageExtension && this.searchParamKey) {
            this.redirectPage(inputElement.value);
        }
        else {
            this.searchTermChanged.emit({ 'searchTerm': inputElement.value });
        }
    };
    /** handler method for page redirection */
    class_1.prototype.redirectPage = function (searchText) {
        searchText = encodeURIComponent(searchText);
        var resultUrl = this.resultPageUrl + "." + this.resultPageExtension + "?" + this.searchParamKey + "=" + searchText;
        window.location.href = resultUrl;
    };
    /** to remove duplicates from data */
    class_1.prototype.removeDuplicates = function (arr) {
        arr = arr.filter(function (item, pos) {
            return arr.indexOf(item) === pos;
        });
        return Array.from(arr);
    };
    /** Render the advance search */
    class_1.prototype.renderAdvanceSearch = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'renderAdvanceSearch()', "in dxp-search render() : " + "DEVELOPMENT");
        if (!this.suggesterConfig && this.showSuggestions) {
            dxp.log.debug(this.element.tagName, 'renderAdvanceSearch()', "component not rendered : check suggester and search config object");
            return;
        }
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            this.theme && h("link", { rel: "stylesheet", href: "" }),
            this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-search.min.css" })
        ];
        return (h("div", { role: "application", class: this.base.componentClass() + " search-wrapper", dir: this.dir, "data-theme": this.theme }, styles, h("section", { role: "search" }, h("div", null, h("span", { class: "dxp-icon dxp-icon-medium dxp-icon-search search-icon", tabindex: "0", "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchBoxToggle.bind(this) }), h("div", { class: this.base.componentClass() + " search-container" + (this.showSearchBox ? ' expand-container' : ' collapse-container') }, h("div", { class: "overlay dxp-none" }), h("div", { class: "dxp-row dxp-row-rotate", tabindex: "-1" }, h("div", { class: "dxp-col-md-4 dxp-col-12 cta-container-mobile" }, h("slot", { name: "cta" })), h("div", { class: "dxp-col-md-8 dxp-col-12 search-box-container" }, h("div", { class: "wrapper search-box-outer-container" }, h("input", { type: "search", "aria-label": dxp.i18n.t('Search:customMessage'), role: "combobox", "aria-haspopup": "listbox", name: "searchbox", class: "dxp-form-control searchbox searchbox-" + this.searchBoxSize + " " + ((this.showSearchBoxList && this.searchValue.length >= 3) ? NO_BORDER_RADIUS : ''), placeholder: this.placeholder, onInput: function (event) { _this.onTextInput(event); } }), h("span", { class: "dxp-icon dxp-icon-large dxp-icon-search search-text", tabindex: "0", "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchData.bind(this) }), h("span", { class: "dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear dxp-icon-clear-" + this.searchBoxSize + " " + (this.searchValue.length ? BLOCK : ' dxp-none'), "aria-label": dxp.i18n.t(SEARCH_CLEAR), tabindex: "0", onClick: function () { return _this.clearSearchBox(); } })), h("div", { class: "dxp-list-container " + ((this.showSearchBoxList && this.searchValue.length >= 3) ? 'dxp-block' : '') }, h("ul", { class: "dxp-suggestion-list", "aria-label": dxp.i18n.t(SEARCH_LIST_TEXT) }, this.searchDataCombined && this.searchDataCombined.map(function (suggestTerm) { return h("li", { tabindex: "-1", class: "dxp-dropdown-list-item", "aria-label": dxp.i18n.t(SEARCH_SELECTED_ITEM, { item: suggestTerm }), onClick: _this.selectSuggestion.bind(_this) }, suggestTerm); }), h("span", { tabindex: "0", class: "cta-container", onClick: function () { return _this.onViewAllSelection(); } }, h("dxp-cta", { type: "link", text: dxp.i18n.t('Search:ctaText') })))))), h("span", { class: "dxp-icon dxp-icon-large dxp-icon-close search-wrapper-close-icon", title: dxp.i18n.t('Search:closeText'), "aria-label": dxp.i18n.t('Search:close'), role: "button", tabindex: "0", onClick: this.closeSearchBox.bind(this) }))))));
    };
    /** Render the home page search */
    class_1.prototype.renderHomePageSearch = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-search.min.css" })]
        ];
        return (h("div", { role: "application", class: this.base.componentClass() + " search-wrapper homepage-search", dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-col-12 search-box-container dxp-p-0" }, h("div", { class: "wrapper-home-search" }, h("div", { class: "autowriter-wrapper", onClick: function () { return _this.disableAutowriter(); } }, h("slot", { name: "autowriter" })), h("input", { type: "search", "aria-haspopup": "listbox", name: "homepageSearch", "aria-label": this.placeholder, class: "dxp-form-control search search-bar " + ((this.showSearchBoxList && this.searchValue.length >= 3) ? NO_BORDER_RADIUS : ''), onFocus: function () { return _this.disableAutowriter(); }, onInput: function (event) { _this.onTextInput(event); } }), h("span", { class: "dxp-icon dxp-icon-medium dxp-icon-search search-text", tabIndex: 0, "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchData.bind(this) }), h("span", { class: "dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear " + (this.searchValue.length ? BLOCK : ' dxp-none'), "aria-label": dxp.i18n.t(SEARCH_CLEAR), tabIndex: 0, onClick: function () { return _this.clearSearchBox(); } })), h("div", { class: "dxp-simple-list-container " + ((this.showSearchBoxList && this.searchValue.length >= 3) ? 'dxp-block' : '') }, h("ul", { class: "dxp-suggestion-list", "aria-label": dxp.i18n.t(SEARCH_LIST_TEXT) }, this.searchDataCombined && this.searchDataCombined.map(function (suggestTerm) { return h("li", { tabIndex: -1, class: "dxp-dropdown-list-item", "aria-label": dxp.i18n.t(SEARCH_SELECTED_ITEM, { item: suggestTerm }), onClick: _this.selectSuggestion.bind(_this) }, suggestTerm); }))))));
    };
    /** Render the simple search */
    class_1.prototype.renderSimpleSearch = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            this.theme && h("link", { rel: "stylesheet", href: "" }),
            this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-search.min.css" })
        ];
        return (h("div", { role: "application", class: this.base.componentClass() + " search-wrapper simple-search", dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-col-12 search-box-container dxp-p-0" }, h("div", { class: "wrapper" }, h("input", { type: "search", "aria-haspopup": "listbox", name: "searchbox", "aria-label": this.placeholder, class: "dxp-form-control searchbox searchbox-" + this.searchBoxSize + " " + ((this.showSearchBoxList && this.searchValue.length >= 3) ? NO_BORDER_RADIUS : ''), placeholder: this.placeholder, onInput: function (event) { _this.onTextInput(event); } }), h("span", { class: "dxp-icon dxp-icon-medium dxp-icon-search search-text", tabIndex: 0, "aria-label": dxp.i18n.t(SEARCH_ACCESSIBILITY_TEXT), onClick: this.searchData.bind(this) }), h("span", { class: "dxp-icon dxp-icon-small dxp-icon-close dxp-icon-clear dxp-icon-clear-" + this.searchBoxSize + " " + (this.searchValue.length ? BLOCK : ' dxp-none'), "aria-label": dxp.i18n.t(SEARCH_CLEAR), tabIndex: 0, onClick: function () { return _this.clearSearchBox(); } })), h("div", { class: "dxp-simple-list-container " + ((this.showSearchBoxList && this.searchValue.length >= 3) ? 'dxp-block' : '') }, h("ul", { class: "dxp-suggestion-list", "aria-label": dxp.i18n.t(SEARCH_LIST_TEXT) }, this.searchDataCombined && this.searchDataCombined.map(function (suggestTerm) { return h("li", { tabIndex: -1, class: "dxp-dropdown-list-item", "aria-label": dxp.i18n.t(SEARCH_SELECTED_ITEM, { item: suggestTerm }), onClick: _this.selectSuggestion.bind(_this) }, suggestTerm); }))))));
    };
    /** SEO script of Schema  */
    class_1.prototype.schemaScript = function () {
        var domainURL;
        var arr;
        var result;
        domainURL = window.location.href;
        arr = domainURL.split('/');
        result = arr[0] + "//" + arr[2];
        var targetUrl = this.resultPageUrl + "." + this.resultPageExtension + "?" + this.searchParamKey;
        var schemaObj = {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            'url': result,
            'potentialAction': [{
                    '@type': 'SearchAction',
                    'target': "" + result + targetUrl + "={search_term_string}",
                    'query-input': 'required name=search_term_string'
                }]
        };
        var schema = JSON.stringify(schemaObj);
        /** created script tag to be appended on the body tag for SEO schema */
        this.base.createSeoSchema(dxp, this.element, schema);
    };
    /** method to fetch the search data */
    class_1.prototype.searchData = function (e, key) {
        var shadowRootExist = false;
        shadowRootExist = this.base.returnBooleanValue(e.target);
        var inputText = key && shadowRootExist ?
            (e.target.activeElement.tagName === 'SPAN' ?
                e.target.activeElement.previousElementSibling.value.trim()
                :
                    e.target.activeElement.value.trim())
            : e.target.tagName === 'INPUT' ? e.target.value.trim() : e.target.previousElementSibling.value.trim();
        if (inputText.length >= 3) {
            if (this.resultPageUrl && this.resultPageExtension && this.searchParamKey) {
                dxp.log.debug(this.element.tagName, 'searchData()', "redirected to search result page");
                this.redirectPage(inputText);
            }
            else {
                dxp.log.debug(this.element.tagName, 'searchData()', "event emit for SPA");
                this.searchTermChanged.emit({ 'searchTerm': inputText });
            }
        }
    };
    /** on li selection populate on searchbox */
    class_1.prototype.selectSuggestion = function (e, key) {
        if (key && e.target && e.target.activeElement.tagName === 'LI') {
            this.onListItemSelection(e.target.activeElement.innerText);
        }
        else if (e.target.tagName === 'LI') {
            this.onListItemSelection(e.target.innerText);
        }
    };
    /** Render dxp-search */
    class_1.prototype.render = function () {
        if (this.searchType === 'simple') {
            return this.renderSimpleSearch();
        }
        if (this.searchType === 'homepage') {
            return this.renderHomePageSearch();
        }
        return this.renderAdvanceSearch();
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-search.search-wrapper{padding:0;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-search.search-wrapper.simple-search{background-color:transparent;width:100%}div.dxp.dxp-search.search-wrapper input{line-height:2rem;padding:.5rem 4.1rem .5rem 3.8rem}div.dxp.dxp-search.search-wrapper .dxp-icon-search{margin:24px 0;cursor:pointer}div.dxp.dxp-search.search-wrapper .dxp-icon-search:before{vertical-align:middle}div.dxp.dxp-search.search-wrapper.homepage-search{display:-ms-flexbox;display:flex}div.dxp.dxp-search.search-wrapper.homepage-search .wrapper-home-search input{padding:.5rem 4.1rem .5rem 3.5rem;border-radius:0}div.dxp.dxp-search.search-wrapper.homepage-search .autowriter-wrapper{position:absolute;left:40px;width:80%;top:0}div.dxp.dxp-search.search-wrapper.homepage-search .dxp-icon-search{position:absolute;margin:0;top:24px;z-index:100}div.dxp.dxp-search.search-wrapper.homepage-search .dxp-icon-clear{top:30px}div.dxp.dxp-search.search-wrapper .search-icon{width:18px;height:18px;font-size:18px;margin-left:40px}div.dxp.dxp-search.search-wrapper .dxp-icon-close{position:absolute;top:56px;right:5px;margin:0;padding:0;display:block;cursor:pointer}div.dxp.dxp-search.search-wrapper .dxp-icon-clear{top:14px;height:32px;width:32px;text-align:center;right:29px}div.dxp.dxp-search.search-wrapper .dxp-icon-clear-lg{top:19px}div.dxp.dxp-search.search-wrapper .dxp-icon-clear-md{top:16px}div.dxp.dxp-search.search-wrapper .dxp-icon-clear-sm{top:8px}div.dxp.dxp-search.search-wrapper .dxp-icon-clear:before{vertical-align:middle}div.dxp.dxp-search.search-wrapper .close-icon-align{margin-top:16px}div.dxp.dxp-search.search-wrapper .search-container{height:calc(100vh - 104px);width:100%;padding:88px 0 20px;position:absolute;left:0;top:104px;z-index:99}div.dxp.dxp-search.search-wrapper .search-container .overlay{position:fixed;top:104px;right:0;bottom:0;left:0;z-index:-1}div.dxp.dxp-search.search-wrapper .search-container .search-box-container{position:relative;padding:0 -12px}div.dxp.dxp-search.search-wrapper .search-container .wrapper{position:relative;width:62.1%}div.dxp.dxp-search.search-wrapper .search-container .search-wrapper-close-icon{width:35px;height:35px;font-size:35px}div.dxp.dxp-search.search-wrapper .expand-container{visibility:visible;opacity:1}div.dxp.dxp-search.search-wrapper .expand-container .search-box-container{display:block}div.dxp.dxp-search.search-wrapper .collapse-container{visibility:hidden;opacity:0}div.dxp.dxp-search.search-wrapper .collapse-container .search-box-container{display:none}div.dxp.dxp-search.search-wrapper .searchbox-lg,div.dxp.dxp-search.search-wrapper .searchbox-md,div.dxp.dxp-search.search-wrapper .searchbox-sm{border-radius:32px;height:52px}div.dxp.dxp-search.search-wrapper .searchbox-lg+.dxp-icon-search,div.dxp.dxp-search.search-wrapper .searchbox-md+.dxp-icon-search,div.dxp.dxp-search.search-wrapper .searchbox-sm+.dxp-icon-search{position:absolute;left:18px;top:14px;margin:0;text-align:center}div.dxp.dxp-search.search-wrapper .searchbox-lg{height:64px}div.dxp.dxp-search.search-wrapper .searchbox-lg+.dxp-icon-search{top:19px}div.dxp.dxp-search.search-wrapper .searchbox-sm{height:40px}div.dxp.dxp-search.search-wrapper .searchbox-sm+.dxp-icon-search{top:8px}div.dxp.dxp-search.search-wrapper .dxp-list-container{border:0;background:none;margin-top:16px;position:relative;top:-1px;width:62.1%;display:none}div.dxp.dxp-search.search-wrapper .dxp-list-container.dxp-block{border-top:none}div.dxp.dxp-search.search-wrapper .dxp-list-container .dxp-suggestion-list li{cursor:pointer}div.dxp.dxp-search.search-wrapper .dxp-list-container ul{height:195px;max-height:240px;overflow-y:auto}div.dxp.dxp-search.search-wrapper .dxp-list-container li{margin-bottom:3.5px;text-align:left;padding-left:63px}div.dxp.dxp-search.search-wrapper .dxp-list-container li:after{height:49px;left:1%}div.dxp.dxp-search.search-wrapper .dxp-list-container .dxp-dropdown-list{margin-bottom:0}div.dxp.dxp-search.search-wrapper .dxp-simple-list-container{border:0;margin-top:10px;position:relative;top:-1px;width:100%;display:none}div.dxp.dxp-search.search-wrapper .dxp-simple-list-container.dxp-block{border-top:none}div.dxp.dxp-search.search-wrapper .dxp-simple-list-container ul{max-height:240px;overflow-y:auto}div.dxp.dxp-search.search-wrapper .dxp-simple-list-container li{margin-bottom:3.5px;text-align:left;padding-left:63px}div.dxp.dxp-search.search-wrapper .dxp-simple-list-container li:after{height:49px;left:1%}div.dxp.dxp-search.search-wrapper .dxp-simple-list-container .dxp-dropdown-list{margin-bottom:0}div.dxp.dxp-search.search-wrapper .searchbox:focus{-webkit-box-shadow:none;box-shadow:none}div.dxp.dxp-search.search-wrapper .cta-container{margin-left:56px;margin-top:10px;display:inline-block}div.dxp.dxp-search.search-wrapper .icon-inactive{opacity:.2;cursor:default;pointer-events:none;outline:none}div.dxp.dxp-search.search-wrapper.simple-search .searchbox-lg,div.dxp.dxp-search.search-wrapper.simple-search .searchbox-md,div.dxp.dxp-search.search-wrapper.simple-search .searchbox-sm{border-radius:20px}div.dxp.dxp-search.search-wrapper.simple-search .searchbox-lg+.dxp-icon-search,div.dxp.dxp-search.search-wrapper.simple-search .searchbox-md+.dxp-icon-search,div.dxp.dxp-search.search-wrapper.simple-search .searchbox-sm+.dxp-icon-search{left:9px}div.dxp.dxp-search.search-wrapper.simple-search input{padding:.5rem 4.1rem .5625rem 2.5rem;border:none}\@media (max-width:992px){div.dxp.dxp-search.search-wrapper.homepage-search .autowriter-wrapper{left:12px;width:59%}}\@media (max-width:768px){div.dxp.dxp-search.search-wrapper.homepage-search .autowriter-wrapper{left:24px;width:90%}div.dxp.dxp-search.search-wrapper.homepage-search .wrapper-home-search input{padding:.5rem 4.1rem .5rem 2.5rem}}\@media (max-width:992px){div.dxp.dxp-search.search-wrapper{margin-top:0}div.dxp.dxp-search.search-wrapper .cta-container-mobile{margin-top:24px}div.dxp.dxp-search.search-wrapper .dxp-list-container{width:100%}div.dxp.dxp-search.search-wrapper .dxp-list-container ul{margin-bottom:0}div.dxp.dxp-search.search-wrapper .search-container{top:70px;height:calc(100vh - 70px)}div.dxp.dxp-search.search-wrapper .search-container .overlay{top:54px}div.dxp.dxp-search.search-wrapper .search-container-changes-header{top:0;height:auto}}\@media (max-width:991px){div.dxp.dxp-search.search-wrapper .dxp-icon-clear{top:12px;right:16px}div.dxp.dxp-search.search-wrapper .dxp-list-container li{margin-bottom:12px;padding-left:37px}div.dxp.dxp-search.search-wrapper .cta-container{margin-left:31px}div.dxp.dxp-search.search-wrapper .dxp-row-rotate{-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-align:start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}div.dxp.dxp-search.search-wrapper input{padding:.8rem 1.75rem .5rem 2.25rem}div.dxp.dxp-search.search-wrapper input.sc-dxp-search{padding:.4rem 1.75rem .4rem 2.25rem}div.dxp.dxp-search.search-wrapper .searchbox-sm+.dxp-icon-search{top:8px;left:16px}div.dxp.dxp-search.search-wrapper .searchbox-lg+.dxp-icon-search,div.dxp.dxp-search.search-wrapper .searchbox-md+.dxp-icon-search{top:8px;left:7.96px}div.dxp.dxp-search.search-wrapper .searchbox{width:100%;height:2.5rem}div.dxp.dxp-search.search-wrapper .search-container .search-box-container{width:100%}div.dxp.dxp-search.search-wrapper .search-container .wrapper{width:100%;margin:0 auto}div.dxp.dxp-search.search-wrapper .search-container .wrapper .dxp-icon-close{top:14px}div.dxp.dxp-search.search-wrapper .search-container .dxp-icon-close{padding-left:0}div.dxp.dxp-search.search-wrapper .search-container .search-wrapper-close-icon{font-size:22px}div.dxp.dxp-search.search-wrapper .search-container-changes-header{padding:24px 16px 20px}}\@media (max-width:576px){div.dxp.dxp-search.search-wrapper input{padding-left:2.4rem}div.dxp.dxp-search.search-wrapper .cta-container-mobile{padding:0 16px}div.dxp.dxp-search.search-wrapper .search-box-container{padding:0}div.dxp.dxp-search.search-wrapper .dxp-list-container{width:100%}div.dxp.dxp-search.search-wrapper .dxp-list-container li{margin-bottom:12px;padding-left:51px}div.dxp.dxp-search.search-wrapper .cta-container{margin-left:45px}div.dxp.dxp-search.search-wrapper .search-container .wrapper{width:95%}}div.dxp.dxp-search[dir=rtl]{margin:0 0 0 10px}div.dxp.dxp-search[dir=rtl].homepage-search .autowriter-wrapper{right:40px}div.dxp.dxp-search[dir=rtl] .dxp-icon-close{left:20px;right:auto}div.dxp.dxp-search[dir=rtl] .searchbox{padding:.5rem 4rem .5rem 3.5rem}div.dxp.dxp-search[dir=rtl] .searchbox+.dxp-icon-search{right:29px;left:auto}div.dxp.dxp-search[dir=rtl] .search-icon{margin-left:auto;margin-right:40px}div.dxp.dxp-search[dir=rtl] .dxp-list-container .cta-container{margin-right:52px}div.dxp.dxp-search[dir=rtl] .dxp-list-container li{text-align:right;padding-right:57px}div.dxp.dxp-search[dir=rtl] .dxp-list-container li:after{left:auto;right:1%}div.dxp.dxp-search[dir=rtl] .search-container .wrapper .dxp-icon-close{right:unset}\@media (max-width:768.9px){div.dxp.dxp-search[dir=rtl] .searchbox{padding:.8rem 3.6rem .5rem 3.5rem}div.dxp.dxp-search[dir=rtl] .search-wrapper-close-icon{left:0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { BannerBenefitsHero as dxp_banner_benefits_hero, BannerImageOverlay as dxp_banner_image_overlay, BannerRegular as dxp_banner_regular, BannerSmallImage as dxp_banner_small_image, BannerSolidBackground as dxp_banner_solid_background, Search as dxp_search };
