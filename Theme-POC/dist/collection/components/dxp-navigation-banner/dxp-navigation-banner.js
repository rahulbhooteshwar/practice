import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const CTA_LIST = 'dxp-cta-list';
/** dxp-navigation-banner */
export class NavigationBanner {
    /** Watcher that looks for cta object to be assigned/changed externally */
    ctaDataChangeHandler() {
        // secondary button disable on page load
        if (this.ctaData && this.ctaData[0] && this.ctaData[0].ctaList[0]['button-type'] === 'secondary') {
            if (this.dropDownData && this.dropDownData.length) {
                this.ctaData[0].ctaList[0].disabled = 'true';
            }
        }
        this.base.createNestedMarkup(this.ctaContainer, CTA_LIST, this.ctaData);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'NavigationBanner', messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.navBannerClass = this.verticalContentBanner ? 'vertical-content' : '';
        this.ctaDataChangeHandler();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** change button link according to drop down option */
    changeSecondaryCtaLink(e) {
        const selectedValue = e.target.value;
        const secondaryBtn = this.element.querySelector(CTA_LIST) ?
            this.element.querySelector(CTA_LIST).querySelector('dxp-cta')
            :
                this.element.querySelector(CTA_LIST).querySelector('dxp-cta');
        if (selectedValue) {
            secondaryBtn.href = selectedValue;
            secondaryBtn.disabled = false;
        }
        else {
            secondaryBtn.disabled = true;
        }
    }
    /** Render the navigation-banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-navigation-banner render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-navigation-banner.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "navigation-banner" },
                h("div", { class: `navigation-banner-content ${this.navBannerClass}` },
                    h("div", { class: `navigation-banner-state ${this.applyIndentation ? 'apply-indentation' : ''}` },
                        h("div", { class: "banner-container" },
                            this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }),
                            this.navTitle && h("h2", { innerHTML: this.navTitle })),
                        h("div", { class: "banner-with-dropdown-container" },
                            this.subTitle && h("p", { class: `dxp-lead ${this.dropDownData && this.dropDownData.length > 0 ? 'add-dropdown' : ''}`, innerHTML: this.subTitle }),
                            this.dropDownData && this.dropDownData.length > 0 &&
                                h("div", { class: "dropdown-block" },
                                    h("label", { class: "dxp-sr-only" }),
                                    h("select", { onChange: e => this.changeSecondaryCtaLink(e) },
                                        h("option", { value: "", selected: true }, this.placeholder),
                                        this.dropDownData.map(item => (h("option", { value: item.value }, item.label))))),
                            h("div", { class: "cta-block", ref: el => this.ctaContainer = el },
                                h("slot", null))))))));
    }
    static get is() { return "dxp-navigation-banner"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-navigation-banner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-navigation-banner.css"]
    }; }
    static get properties() { return {
        "applyIndentation": {
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
                "text": "apply default indentation for navigation banner"
            },
            "attribute": "apply-indentation",
            "reflect": false
        },
        "dropDownData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "dropdown data"
            },
            "attribute": "drop-down-data",
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
        "navTitle": {
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
                "text": "navigation title"
            },
            "attribute": "nav-title",
            "reflect": false
        },
        "placeholder": {
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
                "text": "dropdown placeholder"
            },
            "attribute": "placeholder",
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
                "text": "navigation sub title"
            },
            "attribute": "sub-title",
            "reflect": false
        },
        "verticalContentBanner": {
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
                "text": "navigation banner class for half width"
            },
            "attribute": "vertical-content-banner",
            "reflect": false
        },
        "ctaData": {
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
                "text": "cta data for child components"
            },
            "attribute": "cta-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "navBannerClass": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "ctaData",
            "methodName": "ctaDataChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
