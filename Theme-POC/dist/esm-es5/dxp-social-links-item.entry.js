import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var SocialLinksItem = /** @class */ (function () {
    function SocialLinksItem(hostRef) {
        registerInstance(this, hostRef);
        /** set style for new window on share */
        this.windowStyle = { width: 600, height: 600 };
    }
    /** actions to be performed prior to component loading */
    SocialLinksItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** Did load */
    SocialLinksItem.prototype.componentDidLoad = function () {
        var _this = this;
        var item = this.element && this.element.querySelector('dxp-cta');
        if (item) {
            item.addEventListener('mouseenter', function (e) {
                var target = e.target;
                target.setAttribute('title', _this.socialTitle);
            });
            item.addEventListener('mouseleave', function (e) {
                var target = e.target;
                target.removeAttribute('title');
            });
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    SocialLinksItem.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** post content on selected media platform */
    SocialLinksItem.prototype.sharePost = function (content) {
        this.openWindowAs = this.target ? '_blank' : '_self';
        content = content && content.length > 0 ? content : window.location.href;
        switch (this.type) {
            case 'linkedin':
                this.postUrl = "" + dxp.config.get('SOCIAL_SHARE_LINKEDIN_URL') + content;
                break;
            case 'facebook':
                this.postUrl = "" + dxp.config.get('SOCIAL_SHARE_FACEBOOK_URL') + content;
                break;
            case 'twitter':
                this.postUrl = "" + dxp.config.get('SOCIAL_SHARE_TWITTER_URL') + content;
            default:
                break;
        }
        window.open(this.postUrl, this.openWindowAs, "width=" + this.windowStyle.width + ",height=" + this.windowStyle.height);
    };
    /** render social links item */
    SocialLinksItem.prototype.render = function () {
        var _this = this;
        if (!this.type) {
            dxp.log.debug("component not rendered : check prop values");
            return;
        }
        return ([
            this.theme && h("link", { rel: "stylesheet", href: "" }),
            this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-social-links.min.css" }),
            this.socialType === 'share' ?
                h("div", { class: "" + this.base.componentClass() }, h("dxp-cta", { type: "icon", class: this.base.componentClass() + " " + this.type + "-icon", "aria-label": this.alt, "open-in-new-tab": this.target, onClick: function () { return _this.sharePost(_this.shareContent); } })) :
                h("div", { class: "" + this.base.componentClass() }, h("dxp-cta", { type: "icon", class: this.base.componentClass() + " " + this.type + "-icon", "aria-label": this.alt, href: this.href, "open-in-new-tab": this.target }))
        ]);
    };
    Object.defineProperty(SocialLinksItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocialLinksItem, "style", {
        get: function () { return "div.dxp-social-links-item{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:.5rem;cursor:pointer;overflow:hidden}\@media (min-width:993px) and (max-width:1200px){div.dxp-social-links-item{margin-right:16px}}"; },
        enumerable: true,
        configurable: true
    });
    return SocialLinksItem;
}());
export { SocialLinksItem as dxp_social_links_item };
