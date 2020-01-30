import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
/** dxp-social-links-item component */
export class SocialLinksItem {
    constructor() {
        /** set style for new window on share */
        this.windowStyle = { width: 600, height: 600 };
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
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
                this.postUrl = `${dxp.config.get('SOCIAL_SHARE_LINKEDIN_URL')}${content}`;
                break;
            case 'facebook':
                this.postUrl = `${dxp.config.get('SOCIAL_SHARE_FACEBOOK_URL')}${content}`;
                break;
            case 'twitter':
                this.postUrl = `${dxp.config.get('SOCIAL_SHARE_TWITTER_URL')}${content}`;
            default:
                break;
        }
        window.open(this.postUrl, this.openWindowAs, `width=${this.windowStyle.width},height=${this.windowStyle.height}`);
    }
    /** render social links item */
    render() {
        if (!this.type) {
            dxp.log.debug(`component not rendered : check prop values`);
            return;
        }
        return ([
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-social-links.min.css` }),
            this.socialType === 'share' ?
                h("div", { class: `${this.base.componentClass()}` },
                    h("dxp-cta", { type: "icon", class: `${this.base.componentClass()} ${this.type}-icon`, "aria-label": this.alt, "open-in-new-tab": this.target, onClick: () => this.sharePost(this.shareContent) })) :
                h("div", { class: `${this.base.componentClass()}` },
                    h("dxp-cta", { type: "icon", class: `${this.base.componentClass()} ${this.type}-icon`, "aria-label": this.alt, href: this.href, "open-in-new-tab": this.target }))
        ]);
    }
    static get is() { return "dxp-social-links-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-social-links-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-social-links-item.css"]
    }; }
    static get properties() { return {
        "alt": {
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
                "text": "accessibility text"
            },
            "attribute": "alt",
            "reflect": false
        },
        "href": {
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
                "text": "link to target for icon"
            },
            "attribute": "href",
            "reflect": false
        },
        "openWindowAs": {
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
                "text": "set target for social share window"
            },
            "attribute": "open-window-as",
            "reflect": false
        },
        "shareContent": {
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
                "text": "get content to share"
            },
            "attribute": "share-content",
            "reflect": false
        },
        "socialTitle": {
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
                "text": "title of the icon"
            },
            "attribute": "social-title",
            "reflect": false
        },
        "socialType": {
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
                "text": "Type of social link"
            },
            "attribute": "social-type",
            "reflect": false
        },
        "target": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "link in new tab?"
            },
            "attribute": "target",
            "reflect": false
        },
        "type": {
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
                "text": "type of social links icon"
            },
            "attribute": "type",
            "reflect": false
        }
    }; }
    static get states() { return {
        "postUrl": {},
        "theme": {}
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
