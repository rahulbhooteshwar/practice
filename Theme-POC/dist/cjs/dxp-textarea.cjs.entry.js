'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const ARIA_INVALID = 'aria-invalid';
const Textarea = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** State of Field (valid or not) */
        this.isValid = true;
        /** To make textarea optional */
        this.isOptional = false;
        /** To allow maximum character in the dxp-textarea, default value is 100 */
        this.maxLength = 100;
        /** To allow maximum character in the dxp-textarea, default value is 100  */
        this.minLength = 0;
        /** textarea value - to display the value text */
        this.value = '';
        this.changeText = core$1.createEvent(this, "changeText", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (this.value && this.value.trim().length === 0) {
            this.value = this.value.trim();
        }
    }
    /** Method to handle focus on textarea */
    handleFocus() {
        this.element ?
            this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'false')
            :
                this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'false');
    }
    /** Method to handle keydown */
    handleKey(ev) {
        if (['Backspace', 'Delete'].includes(ev.key)) {
            this.isBackspace = true;
            if (!this.value) {
                if (this.required) {
                    this.isValid = false;
                    this.element ?
                        this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true')
                        :
                            this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true');
                }
            }
        }
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Method to handle change in value of textarea */
    handleChange(event) {
        if (event.key !== 'Tab') {
            this.isValid = true;
            this.element ? this.element.querySelector('textarea').setAttribute('aria-invalid', 'true')
                : this.element.querySelector('textarea').setAttribute('aria-invalid', 'true');
        }
        // emit value for other components to consume
        this.changeText.emit({ value: event.target.value });
        this.value = event.target.value;
        if (this.isBackspace) {
            if (this.value.length === 0) {
                if (!this.required) {
                    this.isValid = true;
                    this.element ?
                        this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true')
                        :
                            this.element.querySelector('textarea').setAttribute(ARIA_INVALID, 'true');
                    this.isBackspace = false;
                    return;
                }
            }
        }
        if (this.value && this.value.trim().length === 0) {
            this.value = this.value.trim();
            const validationArray = [];
            validationArray.push(this.isRequiredProvided(this.value));
            this.isValid = validationArray.every(it => it);
        }
        else {
            this.isValid = this.isValidInput(this.value);
        }
    }
    /** The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text */
    isRequiredProvided(input) {
        if (this.isOptional === true) {
            return true;
        }
        if (input === '') {
            return false;
        }
        return true;
    }
    /** To validate the input value is in provided pattern or not */
    isValidInput(input) {
        if (this.minLength !== 0) {
            const minvalid = this.isValidMinLength(input);
            if (!minvalid) {
                return false;
            }
        }
        if (this.maxLength !== 0) {
            const maxvalid = this.isValidMaxLength(input);
            if (!maxvalid) {
                return false;
            }
        }
        return this.isRequiredProvided(input);
    }
    /** To validate the input is of a maximum length */
    isValidMaxLength(input) {
        return input && input !== '' && input.length <= this.maxLength;
    }
    /** To validate the input is of a minimum length */
    isValidMinLength(input) {
        return input && input !== '' && input.length >= this.minLength;
    }
    /** Render the textarea */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-textarea render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-textarea.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("label", { htmlFor: this.label, id: "textarea", class: (this.disabled ? 'dxp-disabled' : this.isValid ? '' : 'dxp-error') }, this.label, this.isOptional ?
            core$1.h("span", { class: "dxp-optional" }, " (Optional)")
            : ''), core$1.h("textarea", { id: this.label, "aria-labelledby": "textarea", spellcheck: "true", class: `${this.isValid ? '' : 'has-error'} ${this.nonResizable ? 'no-resizable' : ''}
          ${!this.isValid && !this.isOptional ? 'textarea form-control dxp-field-error' : 'textarea form-control'}`, "aria-invalid": "false", "aria-multiline": "true", required: !this.isOptional, "aria-required": !this.isOptional, placeholder: this.placeholder, value: this.value, onKeyUp: event => this.handleChange(event), rows: this.rows, cols: this.cols, maxlength: this.maxLength, minlength: this.minLength, "aria-errormessage": "error", disabled: this.disabled, style: { width: `${this.width}px` } }), this.isValid ? '' : core$1.h("div", { class: "dxp-error", id: "error", "aria-label": this.validationMessage }, this.validationMessage)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-textarea textarea{padding:.675rem .875rem;resize:auto}div.dxp.dxp-textarea textarea.no-resizable{resize:none}div.dxp.dxp-textarea label{font-size:.75rem;margin-bottom:.25rem;display:block}"; }
};

exports.dxp_textarea = Textarea;
