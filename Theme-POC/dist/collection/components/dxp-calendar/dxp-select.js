import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-select */
export class Select {
    constructor() {
        /** default size for fixed height select */
        this.defaultSize = 10;
        /** display fix height select */
        this.fixHeight = false;
        /** use index as value */
        this.useIndexAsValue = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.dataList && typeof this.dataList === 'string') {
            this.dataList = JSON.parse(this.dataList);
        }
    }
    /** Listen onblur of select */
    onBlurHandler(_event) {
        this.removeSize();
    }
    /** Listen keydown of select */
    onKeyDownHandler(event) {
        // toggle dropdown on 'Enter' or 'Space'
        if (event.code === 'Enter' || event.code === 'Space') {
            if (!this.size) {
                this.setSize();
            }
            else {
                this.removeSize();
            }
        }
    }
    /** Listen mousedown of select */
    onMouseDownHandler(_event) {
        this.setSize();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Handler for on select event of dropdown */
    onSelect(event) {
        this.removeSize();
        this.optionSelected.emit({ event });
    }
    /** remove size property of select */
    removeSize() {
        this.size = 0;
    }
    /** set size property of select */
    setSize() {
        this.size = this.fixHeight;
    }
    /** Render the select */
    render() {
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("select", { class: `sc-dxp-select ${this.selector} ${this.size ? 'fix-height' : ''}`, size: this.size ? this.defaultSize : 0, "aria-label": "please press spacebar or enter to toggle list", onBlur: e => this.onBlurHandler(e), onChange: e => this.onSelect(e) }, this.dataList &&
                this.dataList.map((value, index) => (h("option", { value: this.useIndexAsValue ? index : value, selected: this.selectedValue && (this.useIndexAsValue && this.selectedValue === index || this.selectedValue === value), "data-index": index, "data-value": value }, value ? value : ''))))));
    }
    static get is() { return "dxp-select"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-select.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-select.css"]
    }; }
    static get properties() { return {
        "dataList": {
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
                "text": "selector"
            },
            "attribute": "data-list",
            "reflect": false
        },
        "fixHeight": {
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
                "text": "display fix height select"
            },
            "attribute": "fix-height",
            "reflect": false,
            "defaultValue": "false"
        },
        "selectedValue": {
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
                "text": "selected index"
            },
            "attribute": "selected-value",
            "reflect": false
        },
        "selector": {
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
                "text": "selector"
            },
            "attribute": "selector",
            "reflect": false
        },
        "useIndexAsValue": {
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
                "text": "use index as value"
            },
            "attribute": "use-index-as-value",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "defaultSize": {},
        "dir": {},
        "locale": {},
        "size": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "optionSelected",
            "name": "optionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit custom event when calendar is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "onblur",
            "method": "onBlurHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "keydown",
            "method": "onKeyDownHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "mousedown",
            "method": "onMouseDownHandler",
            "target": undefined,
            "capture": true,
            "passive": true
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
