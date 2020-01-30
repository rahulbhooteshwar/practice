'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const translations = {
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

const TwitterBanner = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** Holds the tweet index */
        this.currentTweetIndex = 0;
        /** Sets Twitter Domain URL */
        this.twitterUrl = 'https://twitter.com/';
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        let matchedHash;
        let regExp;
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        this.base.i18Init(core.dxp, 'TwitterBanner', translations);
        this.tweetJsonUrl = this.getTweetUrl(this.handleType);
        this.tweets = await this.getTweets();
        if (!this.maxCount) {
            this.maxCount = this.tweets && this.tweets.length;
        }
        if (this.tweets && this.tweets.length) {
            if (this.maxCount > this.tweets.length) {
                this.maxCount = this.tweets.length;
            }
            this.currentName = this.tweets[this.currentTweetIndex].userName;
            this.tweets.forEach(tweet => {
                matchedHash = tweet.formattedTwitterText.match(/#[a-z\d]+/ig);
                if (matchedHash) {
                    matchedHash.forEach((ele, index) => {
                        regExp = new RegExp(matchedHash[index], 'g');
                        ele = ele.replace('#', `<span class='dxp-sr-only'>hashtag</span><span aria-hidden="true">#</span>`);
                        tweet.formattedTwitterText = tweet.formattedTwitterText.replace(regExp, `${ele}`);
                    });
                }
            });
        }
        else {
            core.dxp.log.error(this.element.tagName, 'componentWillLoad()', 'Please check entered Handle');
        }
    }
    /** actions to be performed after component get loaded */
    async componentDidLoad() {
        if (this.tweets && this.tweets.length) {
            this.element ? this.element.querySelectorAll('.slides')[0].classList.remove('dxp-none')
                : this.element.querySelectorAll('.slides')[0].classList.remove('dxp-none');
            Array.from(this.element.querySelectorAll('.slides a')).forEach(element => {
                element.classList.add('sc-dxp-twitter-banner');
            });
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** appends hashtags */
    appendHashtags(tweetJsonUrl) {
        this.hashtag = this.handle.split(',');
        this.hashtag.forEach((element, index, arr) => {
            element = element.trim();
            arr[index] = element.startsWith('#') ? element : `#${element}`;
        });
        tweetJsonUrl = tweetJsonUrl + this.hashtag.join();
        return tweetJsonUrl;
    }
    /** fetch tweets */
    async getTweets() {
        try {
            this.tweetJsonUrl = this.tweetJsonUrl && this.tweetJsonUrl.replace(/#/g, '');
            return await core.dxp.api(this.tweetJsonUrl);
        }
        catch (err) {
            core.dxp.log.error(`fetch failed for ${this.tweetJsonUrl}`, err);
        }
    }
    /** private method to create tweet url based on handle type */
    getTweetUrl(handletype) {
        let tweetUrl = '';
        const type = handletype && handletype.toLowerCase();
        const handle = {
            'screenname': 'timeline?screenName=',
            'hashtag': 'hashtag?hashtag='
        };
        tweetUrl = this.twitterApiEndPoint + handle[type];
        tweetUrl = type === 'hashtag' ? this.appendHashtags(tweetUrl) : tweetUrl + this.handle;
        if (this.maxCount) {
            tweetUrl = `${tweetUrl}&count=${this.maxCount}`;
        }
        return tweetUrl;
    }
    /** moves to next tweet */
    nextTweet() {
        if (this.element && this.element) {
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.add('dxp-none');
        }
        if (this.currentTweetIndex === this.maxCount - 1) {
            this.currentTweetIndex = -1;
        }
        this.currentTweetIndex = this.currentTweetIndex + 1;
        this.setTweetAndScreenName(this.currentTweetIndex);
    }
    /** move to previous tweet */
    prevTweet() {
        if (this.element && this.element) {
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.add('dxp-none');
        }
        if (this.currentTweetIndex === 0) {
            this.currentTweetIndex = this.maxCount;
        }
        this.currentTweetIndex = this.currentTweetIndex - 1;
        this.setTweetAndScreenName(this.currentTweetIndex);
    }
    /** private method to set the current tweet and screen name  */
    setTweetAndScreenName(currentTweetIndex) {
        if (this.element && this.element) {
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.remove('dxp-none');
            this.element.querySelectorAll('.slides')[this.currentTweetIndex].classList.add('fade');
        }
        this.currentName = this.tweets[currentTweetIndex].userName;
        this.currentTweet = this.tweets[currentTweetIndex].formattedTwitterText;
    }
    /** Render the twitter-banner */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-twitter-banner render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-twitter-banner.min.css` })]
        ];
        return (core.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core.h("div", { class: "dxp-row" }, core.h("div", { class: "dxp-col-xl-12 twitter-carousel" }, core.h("div", { class: "dxp-col-md-12 dxp-col-sm-10 dxp-col-9" }, core.h("p", { class: "dxp-col-push-lg-1 dxp-col-lg-11 dxp-col-push-md-2 dxp-col-md-10 dxp-push-col-0 logo-wrapper" }, core.h("a", { "aria-haspopup": this.target ? 'true' : undefined, class: "twitter-logo-link", href: `${this.twitterUrl}${this.currentName ? this.currentName.replace(/\s/g, '') : ''}#`, target: this.target }, core.h("img", { title: core.dxp.i18n.t('TwitterBanner:alt'), class: "twitter-logo", src: this.src, alt: core.dxp.i18n.t('TwitterBanner:alt') })), core.h("a", { "aria-label": `@${this.currentName}`, "aria-haspopup": this.target ? 'true' : undefined, class: "twitter-link", href: `${this.twitterUrl}${this.currentName ? this.currentName.replace(/\s/g, '') : ''}`, target: this.target }, "@", this.currentName))), core.h("div", { class: "dxp-col-lg-1 dxp-col-sm-2 dxp-col-3" }, core.h("p", { class: "btn-wrapper" }, core.h("button", { title: core.dxp.i18n.t('TwitterBanner:previousbtnlabel'), onClick: () => {
                this.prevTweet();
            } }, core.h("span", { class: "prev prev-icon" })), core.h("button", { title: core.dxp.i18n.t('TwitterBanner:nextbtnlabel'), onClick: () => {
                this.nextTweet();
            } }, core.h("span", { class: "next next-icon" })))), core.h("div", { class: "dxp-col-lg-11 dxp-col-md-10 dxp-col-12" }, core.h("ul", { class: "slideshow-container" }, this.tweets && this.tweets.length ? this.tweets.map(currentTweet => {
            return core.h("li", { class: "slides h5 dxp-none", innerHTML: currentTweet.formattedTwitterText });
        }) : ''))))));
    }
    get element() { return core.getElement(this); }
    static get style() { return "div.dxp.dxp-twitter-banner .twitter-logo-link{padding-right:0;display:block}div.dxp.dxp-twitter-banner .twitter-carousel .slides{font-size:21px;line-height:32px}div.dxp.dxp-twitter-banner .twitter-carousel .slides.fade{-webkit-animation-name:fadein;animation-name:fadein;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}div.dxp.dxp-twitter-banner .twitter-carousel .slides a{word-wrap:break-word;text-decoration:none;padding:0;margin:0;font-size:21px;line-height:32px}div.dxp.dxp-twitter-banner .twitter-carousel .slides a:after,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:before,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:hover:after,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:hover:before{background:none}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper{padding:0}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper a{-ms-flex-item-align:center;align-self:center;margin:0}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper a:last-child{display:inline-block;margin-top:16px}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper .twitter-logo{height:64px;width:64px;display:block}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper .btn-link{display:block;margin-top:16px}div.dxp.dxp-twitter-banner .twitter-carousel .next{cursor:pointer;height:32px;width:16px;background-size:100%;float:right}div.dxp.dxp-twitter-banner .twitter-carousel .prev{cursor:pointer;height:32px;width:16px;background-size:100%;float:left}div.dxp.dxp-twitter-banner .twitter-carousel .btn-wrapper{margin-top:12px;padding-right:15px}div.dxp.dxp-twitter-banner .twitter-carousel .btn-wrapper button{display:inline-block;width:50%;background-color:transparent;border:none}\@media (min-width:768px){div.dxp.dxp-twitter-banner .twitter-carousel .slides,div.dxp.dxp-twitter-banner .twitter-carousel .slides a{font-size:30px;line-height:48px}}\@media (min-width:576px){div.dxp.dxp-twitter-banner .logo-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-twitter-banner .logo-wrapper .twitter-link{padding-left:24px}div.dxp.dxp-twitter-banner .logo-wrapper a:last-child{margin-top:0}}\@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}\@keyframes fadein{0%{opacity:0}to{opacity:1}}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .prev{float:right}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .next{float:left}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .btn-wrapper{padding-right:0;padding-left:15px}div.dxp.dxp-twitter-banner[dir=rtl] .logo-wrapper .twitter-link{padding-left:32px}\@media (min-width:576px){div.dxp.dxp-twitter-banner[dir=rtl] .logo-wrapper .twitter-link{padding-right:24px;padding-left:32px}}\@media (max-width:991px){div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel>div:first-child p{left:0}}"; }
};

exports.dxp_twitter_banner = TwitterBanner;
