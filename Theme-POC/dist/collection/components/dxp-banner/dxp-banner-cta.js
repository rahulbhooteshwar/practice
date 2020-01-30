import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner */
export class BannerCta {
    constructor() {
        /** 'with-overlay' css class will be store in this variable */
        this.withOverlay = '';
        /** button style for cta */
        this.bannerSize = '';
        /** banner type for cta */
        this.bannerType = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.linkType === 'email-link') {
            this.linkUrl = ['mailto:', this.emailId, '?subject=', this.emailSubject, '&body=', this.emailBody ? this.emailBody.replace('\n', '%0D%0A') : this.emailBody].join(' ');
        }
        // cta buttons will display in-line if image banner is enabled with overlay
        if (this.enableOverlay === 'true') {
            this.withOverlay = 'with-overlay';
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-cta render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: `${this.base.componentClass()} dxp-cta-block-${this.bannerType} ${this.bannerSize} ${this.withOverlay}`, "data-theme": this.theme },
            styles,
            h("p", { class: "dxp-cta-links" },
                h("a", { href: this.linkUrl, 
                    // @ts-ignore
                    target: this.openInNewTab === 'true' ? '_target' : '_self', "aria-label": this.visuallyImpairedText, class: this.buttonStyle === 'true' ? 'dxp-btn dxp-btn-cta dxp-btn-primary' : 'visit-link', download: this.linkType === 'download-link' ? this.downloadFile : undefined }, this.linkText))));
    }
    static get is() { return "dxp-banner-cta"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-cta.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-cta.css"]
    }; }
    static get properties() { return {
        "bannerSize": {
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
                "text": "button style for cta"
            },
            "attribute": "banner-size",
            "reflect": false,
            "defaultValue": "''"
        },
        "bannerType": {
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
                "text": "banner type for cta"
            },
            "attribute": "banner-type",
            "reflect": false,
            "defaultValue": "''"
        },
        "buttonStyle": {
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
                "text": "button style for cta"
            },
            "attribute": "button-style",
            "reflect": false
        },
        "downloadFile": {
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
                "text": "download file name for cta"
            },
            "attribute": "download-file",
            "reflect": false
        },
        "emailBody": {
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
                "text": "email body for cta"
            },
            "attribute": "email-body",
            "reflect": false
        },
        "emailId": {
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
                "text": "email id for cta type email"
            },
            "attribute": "email-id",
            "reflect": false
        },
        "emailSubject": {
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
                "text": "email subject for cta"
            },
            "attribute": "email-subject",
            "reflect": false
        },
        "enableOverlay": {
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
                "text": "prop value is true when overlay is enabled on 'image banner'"
            },
            "attribute": "enable-overlay",
            "reflect": false
        },
        "linkText": {
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
                "text": "link text for cta"
            },
            "attribute": "link-text",
            "reflect": false
        },
        "linkType": {
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
                "text": "link type for cta"
            },
            "attribute": "link-type",
            "reflect": false
        },
        "linkUrl": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "link url for cta"
            },
            "attribute": "link-url",
            "reflect": false
        },
        "openInNewTab": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'false'",
                "resolved": "\"false\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "open link in new tab for cta"
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "visuallyImpairedText": {
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
                "text": "Text for visually impaired for cta"
            },
            "attribute": "visually-impaired-text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
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
