'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-57d04e27.js');

const BreadcrumbItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** hides the current item in breadcrumb */
        this.hideCurrentPage = false;
        /** define for current page in breadcrumb */
        this.isCurrentPage = false;
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Breadcrumb', messages.messages);
        this.liStyle = {
            'z-index': this.indexVal
        };
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the breadcrumb */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-breadcrumb item render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-breadcrumb.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, this.isCurrentPage
            ? core$1.h("li", { style: this.liStyle, class: `dxp dxp-breadcrumb-item sc-dxp-breadcrumb ${this.hideCurrentPage ? 'breadcrumb-hide' : 'current-page'}` }, core$1.h("span", { class: "sc-dxp-breadcrumb", "aria-label": this.accessibilityText, tabindex: "0" }, " ", this.linkTitle))
            : core$1.h("li", { style: this.liStyle, class: "dxp dxp-breadcrumb-item sc-dxp-breadcrumb" }, core$1.h("a", { href: this.link, "aria-label": this.accessibilityText, class: "sc-dxp-breadcrumb" }, core$1.h("span", { class: "sc-dxp-breadcrumb" }, this.linkTitle)))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-breadcrumb-item li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:relative;padding-left:30px;padding-right:10px}div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{content:\"\";width:10px;height:10px;position:absolute;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:-10px}div.dxp.dxp-breadcrumb-item li:after{right:-9px}div.dxp.dxp-breadcrumb-item li.current-page:after,div.dxp.dxp-breadcrumb-item li.current-page:before{background:transparent}\@media (min-width:768px) and (max-width:1366px){div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{top:10px}}\@media screen and (max-width:767px){div.dxp.dxp-breadcrumb-item li{padding-left:.563rem}div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{display:none}div.dxp.dxp-breadcrumb-item li a{outline:0;position:relative;display:inline-block;height:20px;width:10px}div.dxp.dxp-breadcrumb-item li a:after,div.dxp.dxp-breadcrumb-item li a:before{content:\"\";display:block;position:absolute;width:12px;height:1px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);left:0;top:4px}div.dxp.dxp-breadcrumb-item li a:after{top:12px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}div.dxp.dxp-breadcrumb-item li a span{display:none}}[dir=rtl] dxp-breadcrumb-item li{padding-right:30px;padding-left:10px}[dir=rtl] dxp-breadcrumb-item li:after,[dir=rtl] dxp-breadcrumb-item li:before{left:-10px;right:auto}[dir=rtl] dxp-breadcrumb-item li:after{left:-9px;right:auto}"; }
};

exports.dxp_breadcrumb_item = BreadcrumbItem;
