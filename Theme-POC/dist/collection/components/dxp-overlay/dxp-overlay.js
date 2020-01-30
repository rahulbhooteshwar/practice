import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-overlay */
export class Overlay {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Overlay', messages);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** to switch the state of overlay */
    async toggleState(state) {
        const shadowRoot = this.element ? this.element : this.element;
        const target = shadowRoot.querySelector('.dxp-overlay');
        state ? target.classList.add('show') : target.classList.remove('show');
    }
    /** Render the overlay */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-overlay render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-overlay.min.css` })]
        ];
        return (h("div", null,
            this.demo ? h("button", { class: "dxp-btn dxp-btn-primary demo-button", onClick: async () => { await this.toggleState(true); } }, "Show Overlay") : '',
            h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
                styles,
                h("div", { class: "content-section" },
                    h("slot", null)),
                h("span", { class: "dxp-icon dxp-icon-close", onClick: async () => { await this.toggleState(false); }, "aria-label": dxp.i18n.t('Overlay:close') }))));
    }
    static get is() { return "dxp-overlay"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-overlay.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-overlay.css"]
    }; }
    static get properties() { return {
        "demo": {
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
                "text": "to show demo for modal"
            },
            "attribute": "demo",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get methods() { return {
        "toggleState": {
            "complexType": {
                "signature": "(state: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "to switch the state of overlay",
                "tags": []
            }
        }
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
