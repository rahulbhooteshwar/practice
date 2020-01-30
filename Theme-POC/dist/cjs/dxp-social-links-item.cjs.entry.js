'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const SocialLinksItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** set style for new window on share */
        this.windowStyle = { width: 600, height: 600 };
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** Did load */
    componentDidLoad() {
        const item = this.element && this.element.querySelector('dxp-cta');
        if (item) {
            item.addEventListener('mouseenter', e => {
                const target = e.target;
                target.setAttribute('title', this.socialTitle);
            });
            item.addEventListener('mouseleave', e => {
                const target = e.target;
                target.removeAttribute('title');
            });
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** post content on selected media platform */
    sharePost(content) {
        this.openWindowAs = this.target ? '_blank' : '_self';
        content = content && content.length > 0 ? content : window.location.href;
        switch (this.type) {
            case 'linkedin':
                this.postUrl = `${core$1.dxp.config.get('SOCIAL_SHARE_LINKEDIN_URL')}${content}`;
                break;
            case 'facebook':
                this.postUrl = `${core$1.dxp.config.get('SOCIAL_SHARE_FACEBOOK_URL')}${content}`;
                break;
            case 'twitter':
                this.postUrl = `${core$1.dxp.config.get('SOCIAL_SHARE_TWITTER_URL')}${content}`;
            default:
                break;
        }
        window.open(this.postUrl, this.openWindowAs, `width=${this.windowStyle.width},height=${this.windowStyle.height}`);
    }
    /** render social links item */
    render() {
        if (!this.type) {
            core$1.dxp.log.debug(`component not rendered : check prop values`);
            return;
        }
        return ([
            this.theme && core$1.h("link", { rel: "stylesheet", href: `` }),
            this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-social-links.min.css` }),
            this.socialType === 'share' ?
                core$1.h("div", { class: `${this.base.componentClass()}` }, core$1.h("dxp-cta", { type: "icon", class: `${this.base.componentClass()} ${this.type}-icon`, "aria-label": this.alt, "open-in-new-tab": this.target, onClick: () => this.sharePost(this.shareContent) })) :
                core$1.h("div", { class: `${this.base.componentClass()}` }, core$1.h("dxp-cta", { type: "icon", class: `${this.base.componentClass()} ${this.type}-icon`, "aria-label": this.alt, href: this.href, "open-in-new-tab": this.target }))
        ]);
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp-social-links-item{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:.5rem;cursor:pointer;overflow:hidden}\@media (min-width:993px) and (max-width:1200px){div.dxp-social-links-item{margin-right:16px}}"; }
};

exports.dxp_social_links_item = SocialLinksItem;
