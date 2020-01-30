import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-solid-background */
export class BannerSolidBackground {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['dxp-cta-banner', 'js-fontsize', this.theme, this.bannerSize].join(' ');
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-solid-background render() : ${process.env.MODE}`);
        this.overlayClass = ['overlay-content', this.overlayPosition].join(' ');
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("div", { id: "cta-banner", class: this.cssClass },
                h("div", { class: this.overlayClass },
                    h("p", { class: "dxp-title-eyebrow" }, this.eyebrowTitle),
                    this.titleText ? h("h1", null, this.titleText) : '',
                    h("p", { class: "lead dxp-hidden-sm-down" }, this.subTitle),
                    h("slot", null)))));
    }
    static get is() { return "dxp-banner-solid-background"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-solid-background.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-solid-background.css"]
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
                "text": "banner size"
            },
            "attribute": "banner-size",
            "reflect": false
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
                "text": "banner type"
            },
            "attribute": "banner-type",
            "reflect": false
        },
        "cta": {
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
                "text": "cta attributes"
            },
            "attribute": "cta",
            "reflect": false
        },
        "eyebrowTitle": {
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
                "text": "eyebrow title"
            },
            "attribute": "eyebrow-title",
            "reflect": false
        },
        "overlayPosition": {
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
                "text": "overlay Position"
            },
            "attribute": "overlay-position",
            "reflect": false
        },
        "subTitle": {
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
                "text": "subtitle"
            },
            "attribute": "sub-title",
            "reflect": false
        },
        "titleText": {
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
                "text": "title text"
            },
            "attribute": "title-text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "cssClass": {},
        "dir": {},
        "overlayClass": {},
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
