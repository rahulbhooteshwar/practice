import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-table */
export class Cell {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Table', messages);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the table */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-cell render() : ${process.env.MODE}`);
        return (h("div", { class: `${this.base.componentClass()} table-cell`, dir: this.dir, "data-theme": this.theme, role: "cell" }, this.content ? h("span", { tabindex: "0", class: "cell-content", innerHTML: this.content }) : h("slot", null)));
    }
    static get is() { return "dxp-cell"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-cell.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-cell.css"]
    }; }
    static get properties() { return {
        "content": {
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
                "text": "content inside cell of table"
            },
            "attribute": "content",
            "reflect": true
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
