import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const SEPARATOR_CLASS = '.separator';
/** dxp-logo */
export class Logo {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        if (this.element.querySelector('dxp-logo')) {
            if (this.element.querySelector('dxp-logo').querySelector('img') || this.element.querySelector('dxp-logo').querySelector('img')) {
                this.element.querySelector('dxp-logo').querySelector(SEPARATOR_CLASS) ?
                    this.element.querySelector('dxp-logo').querySelector(SEPARATOR_CLASS).classList.remove('dxp-none') :
                    this.element.querySelector(SEPARATOR_CLASS).classList.remove('dxp-none');
            }
        }
        if (!this.element.getAttribute('src') || !this.element.getAttribute('schema-type')) {
            return;
        }
        // creates the schema tag for SEO
        this.schemaScript();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** appending domain url to relative path */
    appendingDomain(url) {
        let domainURL;
        let arr;
        let result;
        domainURL = window.location.href;
        arr = domainURL.split('/');
        result = `${arr[0]}//${arr[2]}`;
        return result + url;
    }
    /** Emit the analytics data after clicking on dxp-logo component */
    emitAnalyticsData() {
        const obj = { 'di_comp_name': this.element.tagName, 'di_comp_title': this.logoTitle ? this.logoTitle : this.alt, 'di_comp_cta': this.href ? this.href : '' };
        this.analyticsDataEmitter.emit(obj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', obj);
    }
    /** SEO script of Schema  */
    schemaScript() {
        let hrefLink;
        let imgLink;
        if (this.src && window.screen.width > 767.9) {
            imgLink = dxp.util.checkValidUrl(this.src) ? this.src : this.appendingDomain(this.src);
        }
        else if (this.srcSm && window.screen.width < 767.9) {
            imgLink = dxp.util.checkValidUrl(this.srcSm) ? this.srcSm : this.appendingDomain(this.srcSm);
        }
        hrefLink = this.href ? dxp.util.checkValidUrl(this.href) ? this.href : this.appendingDomain(this.href) : window.location.href;
        const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': this.schemaType, 'url': hrefLink, 'logo': imgLink });
        /** created script tag to be appended on the body tag for SEO schema */
        this.base.createSeoSchema(dxp, this.element, schema);
    }
    /** Render the logo */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-logo render() : ${process.env.MODE}`);
        const imgs = [
            this.src && h("img", { src: this.src, alt: this.alt, title: this.logoTitle, class: "dxp-hidden-sm-down" }),
            (this.srcSm || this.src) && h("img", { src: this.srcSm || this.src, alt: this.alt, title: this.logoTitle, class: "dxp-hidden-md-up" })
        ];
        const styles = (h("span", null,
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && (h("link", { rel: "stylesheet", href: `` })),
            this.dtmUrl && (h("script", { src: this.dtmUrl }))));
        if (this.href && this.src) {
            return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
                styles,
                h("span", { class: "separator dxp-none" }, "|"),
                h("a", { class: "logo-img", onClick: () => this.emitAnalyticsData(), href: this.href, target: this.target ? '_blank' : '_self', "aria-label": this.ariaLabel }, this.src && imgs),
                this.src && h("slot", null)));
        }
        if (this.src) {
            return (h("div", { class: this.base.componentClass(), dir: this.dir, onClick: () => this.emitAnalyticsData() },
                h("span", { class: "separator dxp-none" }, "|"),
                h("p", null,
                    styles,
                    this.src && imgs),
                this.src && h("slot", null)));
        }
    }
    static get is() { return "dxp-logo"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-logo.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-logo.css"]
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
                "text": "alt text for logo"
            },
            "attribute": "alt",
            "reflect": false
        },
        "ariaLabel": {
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
                "text": "accessibility text for logo"
            },
            "attribute": "aria-label",
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
                "text": "url to link to when logo clicked"
            },
            "attribute": "href",
            "reflect": false
        },
        "logoTitle": {
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
                "text": "title text for logo"
            },
            "attribute": "logo-title",
            "reflect": false
        },
        "schemaType": {
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
                "text": "schema type for SEO"
            },
            "attribute": "schema-type",
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
                "text": "logo img src"
            },
            "attribute": "src",
            "reflect": false
        },
        "srcSm": {
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
                "text": "logo img src when small viewport"
            },
            "attribute": "src-sm",
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
                "text": "window to target for link"
            },
            "attribute": "target",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "dtmUrl": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
