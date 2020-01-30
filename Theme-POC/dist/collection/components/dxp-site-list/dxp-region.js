import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const ACCORDION_ITEM = 'dxp-accordion-item';
/** dxp-region */
export class DxpRegion {
    constructor() {
        /** expand region item by default */
        this.isOpen = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'CountrySelector', messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        if (this.isOpen) {
            const accItem = this.element.querySelector(ACCORDION_ITEM) ?
                this.element.querySelector(ACCORDION_ITEM).querySelector('.acc-item')
                :
                    this.element.querySelector(ACCORDION_ITEM).querySelector('.acc-item');
            if (accItem) {
                accItem.click();
            }
        }
        const dxpInLanguage = this.element.querySelectorAll('dxp-in-language');
        for (const i of Object.keys(dxpInLanguage)) {
            dxpInLanguage[i].classList.add('country-lang-selector');
        }
        const descriptionBlock = this.element.querySelector('.description');
        if (descriptionBlock) {
            descriptionBlock.innerHTML = this.description;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the region-selector */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-region render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("dxp-accordion-item", { "item-title": this.name },
                h("slot", { name: "top" }),
                this.description && (h("div", { class: "description", slot: "top" })))));
    }
    static get is() { return "dxp-region"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-region.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-region.css"]
    }; }
    static get properties() { return {
        "description": {
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
                "text": "region default site link with description"
            },
            "attribute": "description",
            "reflect": false
        },
        "isOpen": {
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
                "text": "expand region item by default"
            },
            "attribute": "is-open",
            "reflect": false,
            "defaultValue": "false"
        },
        "name": {
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
                "text": "region name"
            },
            "attribute": "name",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
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
