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
var CTA_LIST = 'dxp-cta-list';
var TEXT_PARA_PAD = 'text-para-pad';
var PullQuote = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** whether image should use its size or be responsive */
        this.responsive = true;
    }
    /** Listener that looks for pullQuote object to be assigned/changed externally */
    class_1.prototype.pullQuoteDataChangeHandler = function () {
        if (!this.pullQuoteData) {
            return;
        }
        if (this.pullQuoteData.imageField) {
            this.base.createNestedMarkup(this.imageContainer, 'dxp-image', this.pullQuoteData.imageField);
        }
        if (this.pullQuoteData.quickLinks) {
            this.base.createNestedMarkup(this.ctaContainer, CTA_LIST, this.pullQuoteData.quickLinks);
        }
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (this.pullQuoteData) {
            this.pullQuoteData = (typeof this.pullQuoteData === 'string') ? JSON.parse(this.pullQuoteData) : this.pullQuoteData;
        }
        this.withImage = this.src || (this.pullQuoteData && this.pullQuoteData.imageField) ? 'with-image' : undefined;
    };
    /** actions to be performed after the component loading */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pullQuoteDataChangeHandler();
                        return [4 /*yield*/, this.checkCTAListOrientation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
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
    /** check cta list orientation */
    class_1.prototype.checkCTAListOrientation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dxpCTAList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dxpCTAList = this.element.querySelector(CTA_LIST);
                        dxpCTAList = dxpCTAList ? dxpCTAList : this.element.querySelector(CTA_LIST); // check cta-list is present
                        if (!dxpCTAList) return [3 /*break*/, 2];
                        return [4 /*yield*/, dxpCTAList.componentOnReady().then(function (res) {
                                if (res.orientation === 'horizontal') {
                                    var CTABlock = _this.element.querySelector('.cta-block');
                                    CTABlock = CTABlock ? CTABlock : _this.element.querySelector('.cta-block');
                                    if (CTABlock) {
                                        CTABlock.classList.add('cta-block-container');
                                    }
                                }
                            }).catch(function (error) {
                                dxp.log.error(_this.element.tagName, 'checkCTAListOrientation()', 'Error message: fail to fetch cta list - ', error);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** check CTA present */
    class_1.prototype.checkCTAPresent = function () {
        var dxpCTAList = this.element.querySelector(CTA_LIST);
        dxpCTAList = dxpCTAList ? dxpCTAList : this.element.querySelector(CTA_LIST); // check cta-list is present
        var dxpCTA = this.element.querySelector('dxp-cta');
        dxpCTA = dxpCTA ? dxpCTA : this.element.querySelector('dxp-cta'); // check cta is present
        return (this.base.returnBooleanValue((this.pullQuoteData && this.pullQuoteData.quickLinks) || dxpCTA || dxpCTAList));
    };
    /** render cta */
    class_1.prototype.renderCta = function () {
        var _this = this;
        return (h("div", { class: ((this.titleText || (this.pullQuoteData && this.pullQuoteData.titleText)) ? 'cta-pad' : '') + " cta-block", ref: function (el) { return _this.ctaContainer = el; } }, h("slot", { name: "ctalist" })));
    };
    /** render eyebrow tiltle */
    class_1.prototype.renderEyebrowTitle = function () {
        return (this.eyebrowTitle ?
            h("p", { class: (this.titleText ? 'eyebrow-margin' : '') + " dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle })
            :
                (this.pullQuoteData && this.pullQuoteData.eyebrowTitle)
                    && h("p", { class: (this.pullQuoteData.titleText ? 'eyebrow-margin' : '') + " dxp-title-eyebrow dxp-font-size-sm ", innerHTML: this.pullQuoteData.eyebrowTitle }));
    };
    /** render the quote text */
    class_1.prototype.renderQuoteText = function () {
        return (this.quote ?
            h("div", { class: (this.titleText ? TEXT_PARA_PAD : '') + " dxp-pull-quote-description dxp-font-size-sm", innerHTML: this.quote })
            :
                (this.pullQuoteData && this.pullQuoteData.quote) &&
                    h("div", { class: (this.pullQuoteData.titleText ? TEXT_PARA_PAD : '') + " dxp-pull-quote-description dxp-font-size-sm", innerHTML: this.pullQuoteData.quote }));
    };
    /** render text paragraphs */
    class_1.prototype.renderTextPara = function () {
        return (h("div", { class: "text-para" }, this.author ?
            h("p", { class: (this.titleText ? TEXT_PARA_PAD : '') + " dxp-pull-quote-name dxp-font-size-lg", innerHTML: this.author })
            :
                (this.pullQuoteData && this.pullQuoteData.author) &&
                    h("p", { class: (this.pullQuoteData.titleText ? TEXT_PARA_PAD : '') + " dxp-pull-quote-name dxp-font-size-lg ", innerHTML: this.pullQuoteData.author }), this.profile ?
            h("p", { class: (this.titleText ? TEXT_PARA_PAD : '') + " dxp-pull-quote-details dxp-font-size-md", innerHTML: this.profile })
            :
                (this.pullQuoteData && this.pullQuoteData.profile) &&
                    h("p", { class: (this.pullQuoteData.titleText ? TEXT_PARA_PAD : '') + " dxp-pull-quote-details dxp-font-size-md", innerHTML: this.pullQuoteData.profile }), this.renderQuoteText()));
    };
    /** Render the pull-quote */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-pull-quote render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-pull-quote.min.css" })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, h("div", { class: "pull-quote-content" }, h("div", { class: "pull-quote-state " + this.withImage }, h("div", { class: "content-wrap" }, this.renderEyebrowTitle(), this.titleText ?
            h("h2", { class: "dxp-pull-quote-heading", innerHTML: this.titleText })
            :
                (this.pullQuoteData && this.pullQuoteData.titleText) && h("h2", { class: "dxp-pull-quote-heading", innerHTML: this.pullQuoteData.titleText }), (this.author || this.profile || this.quote || (this.pullQuoteData && (this.pullQuoteData.author || this.pullQuoteData.profile || this.pullQuoteData.quote))) ?
            this.renderTextPara()
            : '', this.checkCTAPresent() ?
            this.renderCta()
            : '')), this.withImage && h("div", { class: "img-wrap", ref: function (el) { return _this.imageContainer = el; } }, h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "aria-label": this.ariaLabel, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive })))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "pullQuoteData": ["pullQuoteDataChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-pull-quote{width:100%}div.dxp.dxp-pull-quote h2{quotes:inherit}div.dxp.dxp-pull-quote .pull-quote-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;position:relative}div.dxp.dxp-pull-quote .pull-quote-state{width:100%;position:inherit}div.dxp.dxp-pull-quote .content-wrap{width:100%;margin-left:0;margin-right:0}div.dxp.dxp-pull-quote .img-wrap{height:100%;width:100%;margin-bottom:2.5rem;overflow:hidden}div.dxp.dxp-pull-quote .eyebrow-margin{margin-left:22px}div.dxp.dxp-pull-quote .text-para{padding-top:.125rem}div.dxp.dxp-pull-quote .text-para-pad{padding-left:22px;line-height:18px}div.dxp.dxp-pull-quote .dxp-pull-quote-name{margin-bottom:16px;line-height:26px}div.dxp.dxp-pull-quote .dxp-pull-quote-details{margin-bottom:16px;line-height:18px}div.dxp.dxp-pull-quote .dxp-pull-quote-heading{padding-left:16px}div.dxp.dxp-pull-quote .dxp-pull-quote-description{text-decoration:underline}div.dxp.dxp-pull-quote .cta-pad{padding-left:22px;margin-top:2.5rem}\@media (min-width:768px){div.dxp.dxp-pull-quote .content-wrap .dxp-title-eyebrow{margin-bottom:24px}div.dxp.dxp-pull-quote .content-wrap .dxp-pull-quote-heading{margin-bottom:32px}div.dxp.dxp-pull-quote .img-wrap{height:768px}}\@media (min-width:992px){div.dxp.dxp-pull-quote .pull-quote-content{-ms-flex-direction:row;flex-direction:row}div.dxp.dxp-pull-quote .pull-quote-state{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:40px 0}div.dxp.dxp-pull-quote .pull-quote-state.with-image{width:50%}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-title-eyebrow{margin-bottom:32px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .eyebrow-margin{margin-left:30px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-pull-quote-heading{padding-left:24px;margin-bottom:40px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap h2:before{content:open-quote}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap h2:after{content:close-quote}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .cta-pad,div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .text-para-pad{padding-left:30px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-pull-quote-description{line-height:18px}div.dxp.dxp-pull-quote .pull-quote-state .content-wrap .dxp-pull-quote-description p{margin-bottom:0}div.dxp.dxp-pull-quote .img-wrap{height:708px;width:50%;margin-bottom:0}}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .eyebrow-margin{margin-right:22px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .text-para-pad{padding-right:22px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .dxp-pull-quote-heading{padding-right:16px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .cta-pad{padding-right:22px}\@media (min-width:992px){div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .dxp-pull-quote-heading{padding-right:24px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .text-para-pad{padding-right:30px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .eyebrow-margin{margin-right:30px}div.dxp.dxp-pull-quote[dir=rtl] .content-wrap .cta-pad{padding-right:30px}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { PullQuote as dxp_pull_quote };
