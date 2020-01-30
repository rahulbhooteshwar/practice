import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const TABLE_ROW = 'dxp-tbl-row';
/** dxp-table */
export class Table {
    constructor() {
        /** responsible for heading data which needs to be visible in table head */
        this.heading = [];
        /** responsible for number of rows and data which needs to be visible in table rows head */
        this.rows = [];
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Table', messages);
        if (this.data) {
            this.heading = this.data.heading ? this.data.heading : [];
            this.rows = this.data.rows ? this.data.rows : [];
        }
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-table.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** lifeCycle hook */
    componentDidLoad() {
        const rows = this.element.querySelectorAll(TABLE_ROW).length ? this.element.querySelectorAll(TABLE_ROW) : this.element.querySelectorAll(TABLE_ROW);
        let i;
        if (rows.length) {
            for (i of Object.keys(rows)) {
                if (i % 2 === 0) {
                    rows[i].querySelector('.dxp-tbl-row').classList.add('even');
                }
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the table */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-table render() : ${process.env.MODE}`);
        return (h("div", { class: "dxp table-container", role: "application" },
            h("div", { class: `${this.base.componentClass()} table`, dir: this.dir, "data-theme": this.theme, role: "table", "aria-label": this.accessibilityText },
                this.heading.length ? h("dxp-tbl-row", null,
                    " ",
                    (this.heading.map((item) => {
                        return (h("dxp-head", { content: item.content }));
                    })),
                    " ") : h("slot", null),
                this.rows.length ?
                    (this.rows.map((item) => {
                        return (h("dxp-tbl-row", null, item.values.map((value) => {
                            return (h("dxp-cell", { content: value.content }));
                        })));
                    }))
                    : h("slot", null))));
    }
    static get is() { return "dxp-table"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-table.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-table.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
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
                "text": "accessibility text for table"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "data": {
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
                "text": "to facilitate object support in component"
            },
            "attribute": "data",
            "reflect": false
        },
        "heading": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "responsible for heading data which needs to be visible in table head"
            },
            "defaultValue": "[]"
        },
        "rows": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "responsible for number of rows and data which needs to be visible in table rows head"
            },
            "defaultValue": "[]"
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
