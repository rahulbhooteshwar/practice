import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-copyright */
export class Copyright {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the copyright */
    render() {
        /* istanbul ignore next */
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-copyright render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme &&
                    h("link", { rel: "stylesheet", href: `` })
            ],
            [this.theme &&
                    h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-copyright.min.css` })
            ]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            this.text && h("p", null, this.text),
            h("slot", null)));
    }
    static get is() { return "dxp-copyright"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-copyright.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-copyright.css"]
    }; }
    static get properties() { return {
        "text": {
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
                "text": "Prop for the copyright text"
            },
            "attribute": "text",
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
