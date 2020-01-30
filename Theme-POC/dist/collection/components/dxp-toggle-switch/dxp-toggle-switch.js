import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-toggle-switch */
export class ToggleSwitch {
    constructor() {
        /** label orientation for toggle */
        this.labelPosition = 'left';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'ToggleSwitch', messages);
        this.labelClass = this.labelPosition === 'left' ? 'toggle-content toggle-container-left' : 'toggle-content toggle-container-right';
        this.componentClass = this.labelPosition === 'left' ? 'toggle-content toggle-container-right' : 'toggle-content toggle-container-left';
    }
    /** Method to handle click event for button */
    onClick(event) {
        this.clickHandler.emit(event);
        this.base.routingEventListener(event);
    }
    /** emit analytic data */
    emitAnalyticsData() {
        let el;
        el = this.element.querySelector('[type=checkbox]');
        const analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_label': this.label,
            'di_comp_value': el && el.value,
            'di_comp_status': el && el.checked
        };
        this.analyticsDataEmitter.emit(analyticsInfoObj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
    }
    /** emit toggle data */
    emitData() {
        let el;
        el = this.element.querySelector('[type=checkbox]');
        const dataObj = {
            'value': el && el.value,
            'status': el && el.checked,
            'disabled': el && el.disabled
        };
        this.emitAnalyticsData();
        this.toggleDataEmitter.emit(dataObj);
    }
    /** Render the toggle-switch */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-toggle-switch render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-toggle-switch.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "toggle-container" },
                h("div", { class: this.labelClass },
                    this.label && h("p", null,
                        this.label,
                        this.description && h("br", null),
                        this.description && h("span", { class: "dxp-font-size-sm" },
                            this.description,
                            "\u200E")),
                    h("slot", null)),
                h("div", { class: this.componentClass },
                    h("label", { class: "switch" },
                        h("input", { type: "checkbox", key: this.label, name: this.label, value: this.value, "aria-label": this.label, checked: this.checked, disabled: this.disabled, onClick: () => this.emitData() }),
                        h("span", { class: "slider round" }))))));
    }
    static get is() { return "dxp-toggle-switch"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-toggle-switch.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-toggle-switch.css"]
    }; }
    static get properties() { return {
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
                "text": "toggle on/off status"
            },
            "attribute": "checked",
            "reflect": false
        },
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
                "text": "description text for toggle"
            },
            "attribute": "description",
            "reflect": false
        },
        "disabled": {
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
                "text": "toggle active/inactive status"
            },
            "attribute": "disabled",
            "reflect": false
        },
        "label": {
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
                "text": "label for toggle"
            },
            "attribute": "label",
            "reflect": false
        },
        "labelPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right'",
                "resolved": "\"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "label orientation for toggle"
            },
            "attribute": "label-position",
            "reflect": false,
            "defaultValue": "'left'"
        },
        "value": {
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
                "text": "value for toggle"
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "componentClass": {},
        "dir": {},
        "labelClass": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickHandler",
            "name": "clickHandler",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "click event. Emitted when clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "toggleDataEmitter",
            "name": "toggleDataEmitter",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "click event. Emitted when clicked"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
