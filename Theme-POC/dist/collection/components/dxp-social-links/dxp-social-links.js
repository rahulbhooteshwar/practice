import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
const SOCIAL_LINKS_ITEM_CLASS = '.dxp-social-links-item';
const SOCIAL_LINKS_ITEM = 'dxp-social-links-item';
/** dxp-social-links */
export class SocialLinks {
    constructor() {
        /** orientation of icons list (horizontal/ vertical) */
        this.orientation = 'horizontal';
    }
    /** Listener that looks for links object to be assigned/changed externally */
    socialLinksChangeHandler() {
        if (this.selectedLinksItems) {
            const props = this.selectedLinksItems.map(it => (Object.assign(Object.assign({}, it), { socialType: this.socialType })));
            this.base.createNestedMarkup(this.linksContainer, SOCIAL_LINKS_ITEM_CLASS, props);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.socialLinksItems) {
            this.socialLinksItems = (typeof this.socialLinksItems === 'string') ? JSON.parse(this.socialLinksItems) : this.socialLinksItems;
        }
    }
    /** actions to be performed after component load */
    componentDidLoad() {
        const socialElements = this.element.querySelectorAll(SOCIAL_LINKS_ITEM);
        if (socialElements.length > 0) {
            for (const socialEle of socialElements) {
                socialEle.setAttribute('social-type', this.socialType);
            }
        }
        if (this.socialLinksItems && this.socialLinksItems.length > 0) {
            this.selectedLinksItems = [];
            this.socialLinksItems.forEach(socialLinksItem => {
                if (socialLinksItem['enable-sharing']) {
                    this.selectedLinksItems.push(socialLinksItem);
                }
            });
        }
        this.socialLinksChangeHandler();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** render social links */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-social-links.min.css` })]
        ];
        this.socialItems = this.socialType === 'follow' ? this.socialLinksItems : this.selectedLinksItems;
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-social-links render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir },
            styles,
            this.socialLabel &&
                h("p", null, this.socialLabel),
            h("div", { class: this.orientation }, this.socialItems
                ? this.socialItems.map(item => h("dxp-social-links-item", { "social-type": this.socialType, type: item['type'], href: item['href'], "social-title": item['social-title'], "share-content": item['share-content'], alt: item['alt'], target: item['target'] }))
                : h("slot", null))));
    }
    static get is() { return "dxp-social-links"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-social-links.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-social-links.css"]
    }; }
    static get properties() { return {
        "orientation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'horizontal' | 'vertical'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "orientation of icons list (horizontal/ vertical)"
            },
            "attribute": "orientation",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "socialLabel": {
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
                "text": "text for heading of icons list"
            },
            "attribute": "social-label",
            "reflect": false
        },
        "socialLinksItemList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "get list of all media platforms"
            }
        },
        "socialLinksItems": {
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
                "text": "Social links items - to be utilized by DXP framework"
            },
            "attribute": "social-links-items",
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
        }
    }; }
    static get states() { return {
        "dir": {},
        "socialItems": {},
        "theme": {},
        "selectedLinksItems": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "selectedLinksItems",
            "methodName": "socialLinksChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
