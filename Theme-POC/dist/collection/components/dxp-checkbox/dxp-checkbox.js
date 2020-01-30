import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/**
 * dxp-checkbox
 */
export class Checkbox {
    constructor() {
        /** set alignment */
        this.alignment = 'horizontal';
        /** validation message */
        this.validationMessage = 'Please select required fields';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (!this.checkboxId) {
            const randomNumber = Math.floor(Math.random() * 100);
            this.checkboxId = `'dxp-checkbox-'${randomNumber}`; // generating unique checkbox id
        }
    }
    /** lifecycle hook */
    componentDidLoad() {
        const rteText = this.required ? `<span class="dxp-required">* </span><b>${this.name}</b>` : `${this.name}`;
        this.element.querySelector('label') ? this.element.querySelector('label').innerHTML = rteText : this.element.querySelector('label').innerHTML = rteText;
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Emit the checkbox value on selection the checkbox */
    async emitData(target) {
        const obj = { 'name': target.name, 'value': target.value, 'isChecked': target.checked, 'id': this.checkboxId };
        this.checkboxData.emit(obj);
        dxp.log.info(this.element.tagName, 'emitData()', obj);
        // add or remove checkbox-error class if checkbox is required
        if (this.required) {
            if (target.checked === false) {
                const parent = this.element.querySelector('.checkbox-item');
                const p = document.createElement('p');
                p.className = 'dxp-error error-message sc-dxp-checkbox-group';
                const txtNode = document.createTextNode(this.validationMessage);
                p.appendChild(txtNode);
                parent.appendChild(p);
                target.nextElementSibling.classList.add('checkbox-error');
                this.isValid = false;
            }
            else {
                target.nextElementSibling.classList.remove('checkbox-error');
                this.isValid = true;
                const errorMessage = this.element.querySelector('.dxp-error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        }
    }
    /** this reSet method is for the parent hosting element to reset the dxp-checkbox to unchecked status */
    async reset() {
        this.checkboxElement.checked = false;
    }
    /** setChecked method is for other element to check or uncheck this dxp-checkbox */
    async setChecked(isChecked) {
        this.checkboxElement.checked = isChecked;
    }
    /** Responsible for emitting an event to show error message appropriately (horizontal, vertical) */
    sendFlagToParent() {
        this.validationEvent.emit({ flag: this.isValid, message: this.validationMessage });
    }
    /** Render the checkbox */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-checkbox render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-checkbox.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: `${this.base.componentClass()} checkbox-item  ${this.alignment}`, "data-theme": this.theme },
            styles,
            h("input", { ref: element => this.checkboxElement = element, type: "checkbox", name: this.name, id: this.checkboxId, "aria-describedby": this.isValid ? 'error-message' : undefined, onChange: ev => this.emitData(ev.target), class: "checkbox", value: this.value, checked: this.checked, disabled: this.disabled }),
            h("label", { htmlFor: this.checkboxId, class: this.disabled ? 'dxp-disabled' : '' },
                this.required ? h("span", { class: "dxp-required" }, "* ") : '',
                this.name,
                "\u200E"),
            this.required ? this.alignment === 'horizontal' ? this.sendFlagToParent() :
                this.isValid ? h("p", { class: "dxp-error", id: "errMsg" }, this.validationMessage) : '' : undefined));
    }
    static get is() { return "dxp-checkbox"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-checkbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-checkbox.css"]
    }; }
    static get properties() { return {
        "alignment": {
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
                "text": "set alignment"
            },
            "attribute": "alignment",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "checkboxId": {
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
                "text": "checkbox id"
            },
            "attribute": "checkbox-id",
            "reflect": false
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
                "text": "checkbox checked"
            },
            "attribute": "checked",
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
                "text": "checkbox disabled"
            },
            "attribute": "disabled",
            "reflect": false
        },
        "name": {
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
                "text": "actions to be performed prior to component loading"
            },
            "attribute": "name",
            "reflect": false
        },
        "required": {
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
                "text": "require property"
            },
            "attribute": "required",
            "reflect": false
        },
        "validationMessage": {
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
                "text": "validation message"
            },
            "attribute": "validation-message",
            "reflect": false,
            "defaultValue": "'Please select required fields'"
        },
        "value": {
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
                "text": "add the value in checkbox value attribute"
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "checkboxData",
            "name": "checkboxData",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit the value of checked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "validationEvent",
            "name": "validationEvent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "used for emitting an event to acknowledge alignment to the group"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "emitData": {
            "complexType": {
                "signature": "(target: any) => Promise<void>",
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
                "text": "Emit the checkbox value on selection the checkbox",
                "tags": []
            }
        },
        "reset": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLInputElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "this reSet method is for the parent hosting element to reset the dxp-checkbox to unchecked status",
                "tags": []
            }
        },
        "setChecked": {
            "complexType": {
                "signature": "(isChecked: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLInputElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "setChecked method is for other element to check or uncheck this dxp-checkbox",
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
