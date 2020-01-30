import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-table */
export class TableRow {
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-table render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-table.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} tbl-row`, dir: this.dir, "data-theme": this.theme, role: "row" },
            styles,
            h("slot", null)));
    }
    static get is() { return "dxp-tbl-row"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-tbl-row.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-tbl-row.css"]
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
