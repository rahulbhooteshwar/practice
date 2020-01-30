'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-3a95dde2.js');

const TABLE_ROW = 'dxp-tbl-row';
const Table = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** responsible for heading data which needs to be visible in table head */
        this.heading = [];
        /** responsible for number of rows and data which needs to be visible in table rows head */
        this.rows = [];
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        this.base.i18Init(core.dxp, 'Table', messages.messages);
        if (this.data) {
            this.heading = this.data.heading ? this.data.heading : [];
            this.rows = this.data.rows ? this.data.rows : [];
        }
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core.dxp.util.appendLinkElement(shadow, href);
        href = `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-table.min.css`;
        core.dxp.util.appendLinkElement(shadow, href);
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
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-table render() : ${"DEVELOPMENT"}`);
        return (core.h("div", { class: "dxp table-container", role: "application" }, core.h("div", { class: `${this.base.componentClass()} table`, dir: this.dir, "data-theme": this.theme, role: "table", "aria-label": this.accessibilityText }, this.heading.length ? core.h("dxp-tbl-row", null, " ", (this.heading.map((item) => {
            return (core.h("dxp-head", { content: item.content }));
        })), " ") : core.h("slot", null), this.rows.length ?
            (this.rows.map((item) => {
                return (core.h("dxp-tbl-row", null, item.values.map((value) => {
                    return (core.h("dxp-cell", { content: value.content }));
                })));
            }))
            : core.h("slot", null))));
    }
    get element() { return core.getElement(this); }
    static get style() { return "div.dxp.dxp-table.table{display:table;width:100%}div.dxp.dxp-table ::slotted(dxp-tbl-row){display:-ms-flexbox;display:flex;width:100%}div.dxp.dxp-table dxp-tbl-row:nth-child(2n){display:block}.dxp.table-container{max-width:100%;overflow:auto}"; }
};

exports.dxp_table = Table;
