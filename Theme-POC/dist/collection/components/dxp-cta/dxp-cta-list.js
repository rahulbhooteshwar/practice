import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-cta-list */
export class CtaList {
    constructor() {
        /** orientation of icons list (horizontal/ vertical) */
        this.orientation = 'horizontal';
    }
    /** Listener that looks for CTA object to be assigned/changed externally */
    ctaChangeHandler() {
        this.base.createNestedMarkup(this.ctaContainer, 'dxp-cta', this.ctaList);
    }
    /** action performed before the component has loaded */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component load */
    componentDidLoad() {
        this.ctaChangeHandler();
        const ctaButtons = this.element ? this.element.querySelectorAll('dxp-cta') : this.element.querySelectorAll('dxp-cta');
        for (const cta of ctaButtons) {
            cta.classList.add('sc-dxp-cta-list');
        }
    }
    /** listens to window resize event and applies vertical orientation on mobile devices */
    handleCTAResize() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 767) {
            this.orientation = 'vertical';
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /**
     * method that returns class name based on type
     * of titleStyle applied
     */
    getClassName() {
        switch (this.titleStyle) {
            case 'dxp-title-xl': {
                return 'dxp-title-1';
            }
            case 'dxp-title-lg': {
                return 'dxp-title-2';
            }
            case 'dxp-title-md': {
                return 'dxp-title-3';
            }
            case 'dxp-title-sm': {
                return 'dxp-title-4';
            }
            default: {
                return 'dxp-title-1';
            }
        }
    }
    /** listen to window resize events and change the orientation of list */
    /** Render the cta-list */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-cta-list render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-cta.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} sc-dxp-cta-list`, dir: this.dir, "data-theme": this.theme },
            styles,
            this.titleText && h("p", { class: this.getClassName(), innerHTML: this.titleText }),
            h("div", { class: `${this.orientation.toLowerCase()} sc-dxp-cta-list`, ref: el => this.ctaContainer = el },
                h("slot", null))));
    }
    static get is() { return "dxp-cta-list"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-cta-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-cta-list.css"]
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
            "reflect": true,
            "defaultValue": "'horizontal'"
        },
        "titleStyle": {
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
                "text": "title style property"
            },
            "attribute": "title-style",
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
                "text": "title text property"
            },
            "attribute": "title-text",
            "reflect": false
        },
        "ctaList": {
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
                "text": "object to hold multiple CTA blocks that can be passed as json array"
            },
            "attribute": "cta-list",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "ctaList",
            "methodName": "ctaChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleCTAResize",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
