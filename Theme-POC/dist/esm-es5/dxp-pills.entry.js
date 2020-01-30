import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        close: 'Close'
    },
    'es': {
        close: 'Cerrar'
    }
};
var Pills = /** @class */ (function () {
    function Pills(hostRef) {
        registerInstance(this, hostRef);
        /** property to whether show x button or now */
        this.removable = true;
        this.deleted = createEvent(this, "deleted", 7);
    }
    /** actions to be performed prior to component loading */
    Pills.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Pills', messages);
    };
    /** actions to be performed post component loading */
    Pills.prototype.componentDidLoad = function () {
        var pillsDiv;
        pillsDiv = this.base.shadowRootQuerySelector(this.element, '.pill', false);
        if (this.backgroundColor) {
            pillsDiv.style.backgroundColor = this.backgroundColor;
        }
        if (this.borderColor) {
            pillsDiv.style.border = "1px solid " + this.borderColor;
        }
        var pillsSpanDiv;
        pillsSpanDiv = this.base.shadowRootQuerySelector(this.element, '.pill-text', false);
        if (this.color) {
            pillsSpanDiv.style.color = this.color;
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    Pills.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** remove element on close */
    Pills.prototype.onDeleteHandler = function (pillValue) {
        this.deleted.emit(pillValue);
        this.element.remove();
    };
    /** Render the pills */
    Pills.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-pills render() : " + "DEVELOPMENT");
        if (!this.text) {
            dxp.log.debug(this.element.tagName, 'Component not rendered check props', "in dxp-modal render() : " + "DEVELOPMENT");
            return;
        }
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-pills.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "pill", title: this.text, tabindex: "1", "aria-label": this.text + " pills" }, h("span", { class: "pill-text", "aria-label": this.text }, this.text), this.removable && h("button", { class: "icon-close dxp-icon dxp-icon-small dxp-icon-close", "aria-label": dxp.i18n.t('Pills:close'), onClick: function () { _this.onDeleteHandler(_this.text); }, tabindex: "2" }))));
    };
    Object.defineProperty(Pills.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pills, "style", {
        get: function () { return "div.dxp.dxp-pills{display:inline-block;background-color:transparent}div.dxp.dxp-pills .pill{padding:5px 10px;border-radius:19.5px}div.dxp.dxp-pills .pill .pill-text{margin:0 5px}div.dxp.dxp-pills .pill .icon-close{margin:auto 5px;cursor:pointer;background:transparent;border:none}"; },
        enumerable: true,
        configurable: true
    });
    return Pills;
}());
export { Pills as dxp_pills };
