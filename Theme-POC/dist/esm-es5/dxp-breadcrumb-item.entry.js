var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-4ed38ef5.js';
var BreadcrumbItem = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** hides the current item in breadcrumb */
        this.hideCurrentPage = false;
        /** define for current page in breadcrumb */
        this.isCurrentPage = false;
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.base = new BaseComponent(this, dxp);
                this.base.i18Init(dxp, 'Breadcrumb', messages);
                this.liStyle = {
                    'z-index': this.indexVal
                };
                return [2 /*return*/];
            });
        });
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the breadcrumb */
    class_1.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-breadcrumb item render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/dxp.min.css" }),
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/" + this.theme + ".min.css" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-breadcrumb.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, this.isCurrentPage
            ? h("li", { style: this.liStyle, class: "dxp dxp-breadcrumb-item sc-dxp-breadcrumb " + (this.hideCurrentPage ? 'breadcrumb-hide' : 'current-page') }, h("span", { class: "sc-dxp-breadcrumb", "aria-label": this.accessibilityText, tabindex: "0" }, " ", this.linkTitle))
            : h("li", { style: this.liStyle, class: "dxp dxp-breadcrumb-item sc-dxp-breadcrumb" }, h("a", { href: this.link, "aria-label": this.accessibilityText, class: "sc-dxp-breadcrumb" }, h("span", { class: "sc-dxp-breadcrumb" }, this.linkTitle)))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-breadcrumb-item li{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:relative;padding-left:30px;padding-right:10px}div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{content:\"\";width:10px;height:10px;position:absolute;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:-10px}div.dxp.dxp-breadcrumb-item li:after{right:-9px}div.dxp.dxp-breadcrumb-item li.current-page:after,div.dxp.dxp-breadcrumb-item li.current-page:before{background:transparent}\@media (min-width:768px) and (max-width:1366px){div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{top:10px}}\@media screen and (max-width:767px){div.dxp.dxp-breadcrumb-item li{padding-left:.563rem}div.dxp.dxp-breadcrumb-item li:after,div.dxp.dxp-breadcrumb-item li:before{display:none}div.dxp.dxp-breadcrumb-item li a{outline:0;position:relative;display:inline-block;height:20px;width:10px}div.dxp.dxp-breadcrumb-item li a:after,div.dxp.dxp-breadcrumb-item li a:before{content:\"\";display:block;position:absolute;width:12px;height:1px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);left:0;top:4px}div.dxp.dxp-breadcrumb-item li a:after{top:12px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}div.dxp.dxp-breadcrumb-item li a span{display:none}}[dir=rtl] dxp-breadcrumb-item li{padding-right:30px;padding-left:10px}[dir=rtl] dxp-breadcrumb-item li:after,[dir=rtl] dxp-breadcrumb-item li:before{left:-10px;right:auto}[dir=rtl] dxp-breadcrumb-item li:after{left:-9px;right:auto}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { BreadcrumbItem as dxp_breadcrumb_item };
