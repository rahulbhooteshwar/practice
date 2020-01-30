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
var translations = {
    'en': {
        alt: 'Logo Image',
        nextbtnlabel: 'Move to next tweet',
        previousbtnlabel: 'Move to previous tweet'
    },
    'es': {
        alt: 'Logo Image',
        nextbtnlabel: 'Move to next tweet',
        previousbtnlabel: 'Move to previous tweet'
    }
};
var TwitterBanner = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** Holds the tweet index */
        this.currentTweetIndex = 0;
        /** Sets Twitter Domain URL */
        this.twitterUrl = 'https://twitter.com/';
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var matchedHash, regExp, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'TwitterBanner', translations);
                        this.tweetJsonUrl = this.getTweetUrl(this.handleType);
                        _a = this;
                        return [4 /*yield*/, this.getTweets()];
                    case 1:
                        _a.tweets = _b.sent();
                        if (!this.maxCount) {
                            this.maxCount = this.tweets && this.tweets.length;
                        }
                        if (this.tweets && this.tweets.length) {
                            if (this.maxCount > this.tweets.length) {
                                this.maxCount = this.tweets.length;
                            }
                            this.currentName = this.tweets[this.currentTweetIndex].userName;
                            this.tweets.forEach(function (tweet) {
                                matchedHash = tweet.formattedTwitterText.match(/#[a-z\d]+/ig);
                                if (matchedHash) {
                                    matchedHash.forEach(function (ele, index) {
                                        regExp = new RegExp(matchedHash[index], 'g');
                                        ele = ele.replace('#', "<span class='dxp-sr-only'>hashtag</span><span aria-hidden=\"true\">#</span>");
                                        tweet.formattedTwitterText = tweet.formattedTwitterText.replace(regExp, "" + ele);
                                    });
                                }
                            });
                        }
                        else {
                            dxp.log.error(this.element.tagName, 'componentWillLoad()', 'Please check entered Handle');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component get loaded */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.tweets && this.tweets.length) {
                    this.element ? this.element.querySelectorAll('.slides')[0].classList.remove('dxp-none')
                        : this.element.querySelectorAll('.slides')[0].classList.remove('dxp-none');
                    Array.from(this.element.querySelectorAll('.slides a')).forEach(function (element) {
                        element.classList.add('sc-dxp-twitter-banner');
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** appends hashtags */
    class_1.prototype.appendHashtags = function (tweetJsonUrl) {
        this.hashtag = this.handle.split(',');
        this.hashtag.forEach(function (element, index, arr) {
            element = element.trim();
            arr[index] = element.startsWith('#') ? element : "#" + element;
        });
        tweetJsonUrl = tweetJsonUrl + this.hashtag.join();
        return tweetJsonUrl;
    };
    /** fetch tweets */
    class_1.prototype.getTweets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.tweetJsonUrl = this.tweetJsonUrl && this.tweetJsonUrl.replace(/#/g, '');
                        return [4 /*yield*/, dxp.api(this.tweetJsonUrl)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        dxp.log.error("fetch failed for " + this.tweetJsonUrl, err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** private method to create tweet url based on handle type */
    class_1.prototype.getTweetUrl = function (handletype) {
        var tweetUrl = '';
        var type = handletype && handletype.toLowerCase();
        var handle = {
            'screenname': 'timeline?screenName=',
            'hashtag': 'hashtag?hashtag='
        };
        tweetUrl = this.twitterApiEndPoint + handle[type];
        tweetUrl = type === 'hashtag' ? this.appendHashtags(tweetUrl) : tweetUrl + this.handle;
        if (this.maxCount) {
            tweetUrl = tweetUrl + "&count=" + this.maxCount;
        }
        return tweetUrl;
    };
    /** moves to next tweet */
    class_1.prototype.nextTweet = function () {
        if (this.element && this.element) {
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.add('dxp-none');
        }
        if (this.currentTweetIndex === this.maxCount - 1) {
            this.currentTweetIndex = -1;
        }
        this.currentTweetIndex = this.currentTweetIndex + 1;
        this.setTweetAndScreenName(this.currentTweetIndex);
    };
    /** move to previous tweet */
    class_1.prototype.prevTweet = function () {
        if (this.element && this.element) {
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.add('dxp-none');
        }
        if (this.currentTweetIndex === 0) {
            this.currentTweetIndex = this.maxCount;
        }
        this.currentTweetIndex = this.currentTweetIndex - 1;
        this.setTweetAndScreenName(this.currentTweetIndex);
    };
    /** private method to set the current tweet and screen name  */
    class_1.prototype.setTweetAndScreenName = function (currentTweetIndex) {
        if (this.element && this.element) {
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.remove('dxp-none');
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.add('fade');
        }
        this.currentName = this.tweets[currentTweetIndex].userName;
        this.currentTweet = this.tweets[currentTweetIndex].formattedTwitterText;
    };
    /** Render the twitter-banner */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-twitter-banner render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-twitter-banner.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-xl-12 twitter-carousel" }, h("div", { class: "dxp-col-md-12 dxp-col-sm-10 dxp-col-9" }, h("p", { class: "dxp-col-push-lg-1 dxp-col-lg-11 dxp-col-push-md-2 dxp-col-md-10 dxp-push-col-0 logo-wrapper" }, h("a", { "aria-haspopup": this.target ? 'true' : undefined, class: "twitter-logo-link", href: "" + this.twitterUrl + (this.currentName ? this.currentName.replace(/\s/g, '') : '') + "#", target: this.target }, h("img", { title: dxp.i18n.t('TwitterBanner:alt'), class: "twitter-logo", src: this.src, alt: dxp.i18n.t('TwitterBanner:alt') })), h("a", { "aria-label": "@" + this.currentName, "aria-haspopup": this.target ? 'true' : undefined, class: "twitter-link", href: "" + this.twitterUrl + (this.currentName ? this.currentName.replace(/\s/g, '') : ''), target: this.target }, "@", this.currentName))), h("div", { class: "dxp-col-lg-1 dxp-col-sm-2 dxp-col-3" }, h("p", { class: "btn-wrapper" }, h("button", { title: dxp.i18n.t('TwitterBanner:previousbtnlabel'), onClick: function () {
                _this.prevTweet();
            } }, h("span", { class: "prev prev-icon" })), h("button", { title: dxp.i18n.t('TwitterBanner:nextbtnlabel'), onClick: function () {
                _this.nextTweet();
            } }, h("span", { class: "next next-icon" })))), h("div", { class: "dxp-col-lg-11 dxp-col-md-10 dxp-col-12" }, h("ul", { class: "slideshow-container" }, this.tweets && this.tweets.length ? this.tweets.map(function (currentTweet) {
            return h("li", { class: "slides h5 dxp-none", innerHTML: currentTweet.formattedTwitterText });
        }) : ''))))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-twitter-banner .twitter-logo-link{padding-right:0;display:block}div.dxp.dxp-twitter-banner .twitter-carousel .slides{font-size:21px;line-height:32px}div.dxp.dxp-twitter-banner .twitter-carousel .slides.fade{-webkit-animation-name:fadein;animation-name:fadein;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}div.dxp.dxp-twitter-banner .twitter-carousel .slides a{word-wrap:break-word;text-decoration:none;padding:0;margin:0;font-size:21px;line-height:32px}div.dxp.dxp-twitter-banner .twitter-carousel .slides a:after,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:before,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:hover:after,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:hover:before{background:none}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper{padding:0}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper a{-ms-flex-item-align:center;align-self:center;margin:0}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper a:last-child{display:inline-block;margin-top:16px}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper .twitter-logo{height:64px;width:64px;display:block}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper .btn-link{display:block;margin-top:16px}div.dxp.dxp-twitter-banner .twitter-carousel .next{cursor:pointer;height:32px;width:16px;background-size:100%;float:right}div.dxp.dxp-twitter-banner .twitter-carousel .prev{cursor:pointer;height:32px;width:16px;background-size:100%;float:left}div.dxp.dxp-twitter-banner .twitter-carousel .btn-wrapper{margin-top:12px;padding-right:15px}div.dxp.dxp-twitter-banner .twitter-carousel .btn-wrapper button{display:inline-block;width:50%;background-color:transparent;border:none}\@media (min-width:768px){div.dxp.dxp-twitter-banner .twitter-carousel .slides,div.dxp.dxp-twitter-banner .twitter-carousel .slides a{font-size:30px;line-height:48px}}\@media (min-width:576px){div.dxp.dxp-twitter-banner .logo-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-twitter-banner .logo-wrapper .twitter-link{padding-left:24px}div.dxp.dxp-twitter-banner .logo-wrapper a:last-child{margin-top:0}}\@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}\@keyframes fadein{0%{opacity:0}to{opacity:1}}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .prev{float:right}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .next{float:left}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .btn-wrapper{padding-right:0;padding-left:15px}div.dxp.dxp-twitter-banner[dir=rtl] .logo-wrapper .twitter-link{padding-left:32px}\@media (min-width:576px){div.dxp.dxp-twitter-banner[dir=rtl] .logo-wrapper .twitter-link{padding-right:24px;padding-left:32px}}\@media (max-width:991px){div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel>div:first-child p{left:0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { TwitterBanner as dxp_twitter_banner };
