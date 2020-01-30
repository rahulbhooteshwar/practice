import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-4ed38ef5.js';

const BreadcrumbItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** hides the current item in breadcrumb */
        this.hideCurrentPage = false;
        /** define for current page in breadcrumb */
        this.isCurrentPage = false;
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Breadcrumb', messages);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-breadcrumb item render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-breadcrumb.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, this.isCurrentPage
            ? h("li", { style: this.liStyle, class: `dxp dxp-breadcrumb-item sc-dxp-breadcrumb ${this.hideCurrentPage ? 'breadcrumb-hide' : 'current-page'}` }, h("span", { class: "sc-dxp-breadcrumb", "aria-label": this.accessibilityText, tabindex: "0" }, " ", this.linkTitle))
            : h("li", { style: this.liStyle, class: "dxp dxp-breadcrumb-item sc-dxp-breadcrumb" }, h("a", { href: this.link, "aria-label": this.accessibilityText, class: "sc-dxp-breadcrumb" }, h("span", { class: "sc-dxp-breadcrumb" }, this.linkTitle)))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-breadcrumb-item li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:relative;padding-left:30px;padding-right:10px}div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{content:\"\";width:10px;height:10px;position:absolute;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:-10px}div.dxp.dxp-breadcrumb-item li:after{right:-9px}div.dxp.dxp-breadcrumb-item li.current-page:after,div.dxp.dxp-breadcrumb-item li.current-page:before{background:transparent}\@media (min-width:768px) and (max-width:1366px){div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{top:10px}}\@media screen and (max-width:767px){div.dxp.dxp-breadcrumb-item li{padding-left:.563rem}div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{display:none}div.dxp.dxp-breadcrumb-item li a{outline:0;position:relative;display:inline-block;height:20px;width:10px}div.dxp.dxp-breadcrumb-item li a:after,div.dxp.dxp-breadcrumb-item li a:before{content:\"\";display:block;position:absolute;width:12px;height:1px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);left:0;top:4px}div.dxp.dxp-breadcrumb-item li a:after{top:12px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}div.dxp.dxp-breadcrumb-item li a span{display:none}}[dir=rtl] dxp-breadcrumb-item li{padding-right:30px;padding-left:10px}[dir=rtl] dxp-breadcrumb-item li:after,[dir=rtl] dxp-breadcrumb-item li:before{left:-10px;right:auto}[dir=rtl] dxp-breadcrumb-item li:after{left:-9px;right:auto}"; }
};

export { BreadcrumbItem as dxp_breadcrumb_item };
