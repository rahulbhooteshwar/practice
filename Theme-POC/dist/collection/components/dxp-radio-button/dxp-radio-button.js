import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-radio-button */
export class RadioButton {
    constructor() {
        /** radiobutton alignment  */
        this.alignment = 'horizontal';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** lifecycle hook */
    componentDidLoad() {
        this.element.querySelector('label').innerHTML = this.radioKey;
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** emits event on state change of radio button */
    handleChange(event) {
        this.radioSelected.emit({ 'name': event.target.getAttribute('name'), 'value': event.target.getAttribute('value'), 'isChecked': event.target.checked });
    }
    /** Render the radio-button */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-radio-button.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} ${this.alignment}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("input", { onChange: ev => this.handleChange(ev), id: this.radioKey, type: "radio", key: this.radioKey, name: this.name, value: this.radioValue, checked: this.checked, disabled: this.isDisabled }),
            h("label", { htmlFor: this.radioKey }, this.radioKey)));
    }
    static get is() { return "dxp-radio-button"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-radio-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-radio-button.css"]
    }; }
    static get properties() { return {
        "alignment": {
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
                "text": "radiobutton alignment"
            },
            "attribute": "alignment",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "checked": {
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
                "text": "radiobutton checked"
            },
            "attribute": "checked",
            "reflect": false
        },
        "isDisabled": {
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
                "text": "radiobutton checked"
            },
            "attribute": "is-disabled",
            "reflect": false
        },
        "name": {
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
                "text": "radiobutton group name"
            },
            "attribute": "name",
            "reflect": false
        },
        "radioKey": {
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
                "text": "radio-button key"
            },
            "attribute": "radio-key",
            "reflect": false
        },
        "radioValue": {
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
                "text": "radiobutton value"
            },
            "attribute": "radio-value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "parentAlignment": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "radioSelected",
            "name": "radioSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "radiobutton even emitted"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
