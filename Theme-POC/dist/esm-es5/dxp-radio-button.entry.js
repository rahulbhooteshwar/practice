import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var RadioButton = /** @class */ (function () {
    function RadioButton(hostRef) {
        registerInstance(this, hostRef);
        /** radiobutton alignment  */
        this.alignment = 'horizontal';
        this.radioSelected = createEvent(this, "radioSelected", 7);
    }
    /** actions to be performed prior to component loading */
    RadioButton.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** lifecycle hook */
    RadioButton.prototype.componentDidLoad = function () {
        this.element.querySelector('label').innerHTML = this.radioKey;
    };
    /**
     * click listener for routing events on anchor tag
     */
    RadioButton.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** emits event on state change of radio button */
    RadioButton.prototype.handleChange = function (event) {
        this.radioSelected.emit({ 'name': event.target.getAttribute('name'), 'value': event.target.getAttribute('value'), 'isChecked': event.target.checked });
    };
    /** Render the radio-button */
    RadioButton.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-radio-button.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass() + " " + this.alignment, dir: this.dir, "data-theme": this.theme }, styles, h("input", { onChange: function (ev) { return _this.handleChange(ev); }, id: this.radioKey, type: "radio", key: this.radioKey, name: this.name, value: this.radioValue, checked: this.checked, disabled: this.isDisabled }), h("label", { htmlFor: this.radioKey }, this.radioKey)));
    };
    Object.defineProperty(RadioButton.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton, "style", {
        get: function () { return "div.dxp.dxp-radio-button{margin:10px 10px 0}div.dxp.dxp-radio-button.horizontal{display:-ms-inline-flexbox;display:inline-flex}div.dxp.dxp-radio-button.vertical{display:grid}div.dxp.dxp-radio-button input[type=radio]{position:absolute;opacity:0;width:0}div.dxp.dxp-radio-button input[type=radio]+label{padding-left:26px;position:relative;margin:0}div.dxp.dxp-radio-button input[type=radio]+label:before{content:\"\";width:18px;height:18px;position:absolute;top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-radio-button input[type=radio][disabled]{pointer-events:none}div.dxp.dxp-radio-button input[type=radio][disabled]+label{cursor:not-allowed}div.dxp.dxp-radio-button[dir=rtl] input[type=radio]+label{padding-left:0;padding-right:26px}div.dxp.dxp-radio-button[dir=rtl] input[type=radio]+label:before{left:auto;right:0}"; },
        enumerable: true,
        configurable: true
    });
    return RadioButton;
}());
export { RadioButton as dxp_radio_button };
