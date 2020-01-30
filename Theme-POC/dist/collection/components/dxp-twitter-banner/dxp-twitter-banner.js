import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import translations from './messages';
/** dxp-twitter-banner */
export class TwitterBanner {
    constructor() {
        /** Holds the tweet index */
        this.currentTweetIndex = 0;
        /** Sets Twitter Domain URL */
        this.twitterUrl = 'https://twitter.com/';
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        let matchedHash;
        let regExp;
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'TwitterBanner', translations);
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
            dxp.log.error(this.element.tagName, 'componentWillLoad()', 'Please check entered Handle');
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
            return await dxp.api(this.tweetJsonUrl);
        }
        catch (err) {
            dxp.log.error(`fetch failed for ${this.tweetJsonUrl}`, err);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-twitter-banner render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-twitter-banner.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-row" },
                h("div", { class: "dxp-col-xl-12 twitter-carousel" },
                    h("div", { class: "dxp-col-md-12 dxp-col-sm-10 dxp-col-9" },
                        h("p", { class: "dxp-col-push-lg-1 dxp-col-lg-11 dxp-col-push-md-2 dxp-col-md-10 dxp-push-col-0 logo-wrapper" },
                            h("a", { "aria-haspopup": this.target ? 'true' : undefined, class: "twitter-logo-link", href: `${this.twitterUrl}${this.currentName ? this.currentName.replace(/\s/g, '') : ''}#`, target: this.target },
                                h("img", { title: dxp.i18n.t('TwitterBanner:alt'), class: "twitter-logo", src: this.src, alt: dxp.i18n.t('TwitterBanner:alt') })),
                            h("a", { "aria-label": `@${this.currentName}`, "aria-haspopup": this.target ? 'true' : undefined, class: "twitter-link", href: `${this.twitterUrl}${this.currentName ? this.currentName.replace(/\s/g, '') : ''}`, target: this.target },
                                "@",
                                this.currentName))),
                    h("div", { class: "dxp-col-lg-1 dxp-col-sm-2 dxp-col-3" },
                        h("p", { class: "btn-wrapper" },
                            h("button", { title: dxp.i18n.t('TwitterBanner:previousbtnlabel'), onClick: () => {
                                    this.prevTweet();
                                } },
                                h("span", { class: "prev prev-icon" })),
                            h("button", { title: dxp.i18n.t('TwitterBanner:nextbtnlabel'), onClick: () => {
                                    this.nextTweet();
                                } },
                                h("span", { class: "next next-icon" })))),
                    h("div", { class: "dxp-col-lg-11 dxp-col-md-10 dxp-col-12" },
                        h("ul", { class: "slideshow-container" }, this.tweets && this.tweets.length ? this.tweets.map(currentTweet => {
                            return h("li", { class: "slides h5 dxp-none", innerHTML: currentTweet.formattedTwitterText });
                        }) : ''))))));
    }
    static get is() { return "dxp-twitter-banner"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-twitter-banner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-twitter-banner.css"]
    }; }
    static get properties() { return {
        "handle": {
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
                "text": "sets the handle value for fetching the corresponding the tweets"
            },
            "attribute": "handle",
            "reflect": false
        },
        "handleType": {
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
                "text": "handle type can be either screen name or hash tag"
            },
            "attribute": "handle-type",
            "reflect": false
        },
        "hashtag": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sets the hash tag for fetching corresponding tweets"
            },
            "attribute": "hashtag",
            "reflect": false
        },
        "maxCount": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Sets the maximum number of tweets to be shown"
            },
            "attribute": "max-count",
            "reflect": false
        },
        "src": {
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
                "text": "Sets the image link to the twitter account"
            },
            "attribute": "src",
            "reflect": false
        },
        "target": {
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
                "text": "window to target for link"
            },
            "attribute": "target",
            "reflect": false
        },
        "twitterApiEndPoint": {
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
                "text": "Sets Twitter Tweets URL"
            },
            "attribute": "twitter-api-end-point",
            "reflect": false
        },
        "twitterUrl": {
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
                "text": "Sets Twitter Domain URL"
            },
            "attribute": "twitter-url",
            "reflect": false,
            "defaultValue": "'https://twitter.com/'"
        }
    }; }
    static get states() { return {
        "currentName": {},
        "currentTweet": {},
        "currentTweetIndex": {},
        "dir": {},
        "liElement": {},
        "theme": {},
        "tweetJsonUrl": {},
        "tweets": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
