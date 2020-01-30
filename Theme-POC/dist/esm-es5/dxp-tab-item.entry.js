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
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { a as animator } from './animation.utility-b70cc14f.js';
import { m as messages } from './messages-0abf6702.js';
var TabItem = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** animation status */
        this.animationStatus = '';
        this.closeTabContent = createEvent(this, "closeTabContent", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Tabs', messages);
        this.setOrientation();
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var host, hostComponentRef, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        host = this.element.closest('dxp-tabs');
                        // when this component is rendered inside shadow root of dxp-tabs
                        host = host ? host : this.element['getRootNode']()['host'];
                        _a = host;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, host.componentOnReady()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        hostComponentRef = _a;
                        if (!hostComponentRef) return [3 /*break*/, 4];
                        return [4 /*yield*/, hostComponentRef.registerTab()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** window resize event */
    class_1.prototype.windowResize = function () {
        this.setOrientation();
    };
    /** close tab content */
    class_1.prototype.closeTabContentHandler = function (_e) {
        this.closeTabContent.emit(this.element);
    };
    /** set orientation */
    class_1.prototype.setOrientation = function () {
        // orientation vertical for view other than desktop
        this.orientationVertical = window.innerWidth < 992;
    };
    /** Render the tabs */
    class_1.prototype.render = function () {
        var _this = this;
        // set animator status
        animator.setStatus(this.animationStatus);
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-tabs.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, (this.orientationVertical && this.verticalAlign && this.verticalContentPosition === 'accordion') ?
            h("dxp-tab-list", { active: this.active, "fixed-width": this.fixedWidth, "tab-icon-src": this.tabIconSrc, alt: this.alt, "tab-title": this.tabTitle, "vertical-align": this.verticalAlign, "icon-only-sm": this.iconOnlySm, "arrow-orientation": this.arrowOrientation }) : '', h("div", { tabindex: "-1", class: (this.verticalAlign ? 'vertical' : 'horizontal') + "\n        " + ((this.isDefaultView && this.verticalContentPosition !== 'accordion') ? 'default-view' : 'content-view') + "\n        tab-item-content " + (this.active || (this.enableAnimation && this.isDefaultView && this.verticalContentPosition !== 'accordion') ? 'tab-item-active' : '') + "\n        " + ((this.isDefault && this.verticalContentPosition !== 'accordion') ? 'tab-item-default' : '') + "\n        " + ((this.isDefaultViewOn && this.verticalContentPosition !== 'accordion') ? 'default-view-on' : 'default-view-off') + "\n        " + (this.orientationVertical && this.verticalAlign && this.verticalContentPosition === 'accordion' ? 'accordion-innerHeight' : '') }, h("div", { tabindex: "" + (this.active ? 0 : -1), class: "" + (this.enableAnimation ? animator.getClass() : 'content-wrapper') }, this.content
            ? h("div", { class: (this.verticalAlign ? 'dxp-scrollable-container' : 'scrollable-container-horizontal') + " " + (this.isDefault ? 'default-scrollable-container' : '') + "\n              " + (this.verticalContentPosition === 'accordion' ? 'accordion-scrollable-container' : '') }, h("div", { class: (this.verticalAlign ? 'dxp-scrollable' : 'scrollable-horizontal') + " " + (this.isDefault ? 'default-scrollable' : ''), innerHTML: this.content }))
            : h("div", { class: (this.verticalAlign ? 'dxp-scrollable-container' : 'scrollable-container-horizontal') + " " + (this.isDefault ? 'default-scrollable-container' : '') + "\n          " + (this.verticalContentPosition === 'accordion' ? 'accordion-scrollable-container' : '') }, h("div", { class: (this.verticalAlign ? 'dxp-scrollable' : 'scrollable-horizontal') + " " + (this.isDefault ? 'default-scrollable' : '') }, h("slot", null))), !this.isDefaultView && this.verticalContentPosition !== 'accordion' &&
            h("button", { class: "button-container dxp-icon dxp-icon-close " + (this.enableClose ? 'show' : 'hide'), onClick: function (e) { _this.closeTabContentHandler(e); } }), !this.isDefaultView && this.verticalContentPosition !== 'accordion' &&
            h("div", { tabindex: "-1", class: "button-container bottom " + (this.enableClose ? 'show' : 'hide') })))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-tab-item .horizontal .scrollable-horizontal{overflow:auto}div.dxp.dxp-tab-item .horizontal .content-wrapper{width:100%;height:100%;overflow:hidden}div.dxp.dxp-tab-item .horizontal .default-view{position:relative;width:100%;height:100%}div.dxp.dxp-tab-item .horizontal.tab-item-content{height:100%;width:100%;display:none}div.dxp.dxp-tab-item .horizontal.tab-item-content .content-wrapper{position:relative;padding:50px 0}div.dxp.dxp-tab-item .horizontal.tab-item-content .button-container{cursor:pointer;position:absolute;top:16px;right:0}div.dxp.dxp-tab-item .horizontal.tab-item-content.tab-item-active{overflow-x:auto;display:block}div.dxp.dxp-tab-item .horizontal.tab-item-content.tab-item-active.tab-item-default{position:relative}div.dxp.dxp-tab-item .horizontal.tab-item-content.tab-item-active.tab-item-default .button-container{display:none}div.dxp.dxp-tab-item .horizontal.tab-item-content.tab-item-active.tab-item-default .content-overlay{position:absolute}div.dxp.dxp-tab-item .vertical .default-view>div{position:relative;width:100%;height:100%;left:0;top:0}div.dxp.dxp-tab-item .vertical .content-overlay{position:relative;top:0;right:-100%;width:100%;height:100%;min-height:100%;background:#fff;padding:0;overflow:hidden}div.dxp.dxp-tab-item .vertical.tab-item-content{height:100%;width:100%}div.dxp.dxp-tab-item .vertical.tab-item-content.pos-relative{position:relative}div.dxp.dxp-tab-item .vertical.tab-item-content.pos-absolute{position:absolute}div.dxp.dxp-tab-item .vertical.tab-item-content .button-container{cursor:pointer;position:absolute;top:48px;right:46px}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active.tab-item-default{position:relative;top:0;left:0}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active.tab-item-default .button-container{display:none}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active.tab-item-default.pos-relative{position:relative}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active.tab-item-default.pos-absolute{position:absolute}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active.content-view .content-overlay{z-index:20}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-default .sc-dxp-tab-item.content-overlay{position:static}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-default .content-overlay{position:unset;padding:0;background:none;visibility:visible}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-default .content-overlay.initabsolute{position:absolute}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-default .content-overlay.hide{visibility:hidden;position:absolute}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-default.pos-relative{position:relative}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-default.pos-absolute{position:absolute}div.dxp.dxp-tab-item .vertical.tab-item-content:not(.tab-item-default) .content-overlay.left-fix{right:0}div.dxp.dxp-tab-item .vertical.tab-item-content:not(.tab-item-default) .content-overlay.fade-in{-webkit-animation:fadein 3s;-moz-animation:fadein 3s;-ms-animation:fadein 3s;-o-animation:fadein 3s;animation:fadein 3s}div.dxp.dxp-tab-item .vertical.tab-item-content:not(.tab-item-default) .content-overlay.fade-out{-webkit-animation:fadeout 2s;-moz-animation:fadeout 2s;-ms-animation:fadeout 2s;-o-animation:fadeout 2s;animation:fadeout 2s}div.dxp.dxp-tab-item .vertical.tab-item-content:not(.tab-item-default) .content-overlay.left-to-right-animation{-webkit-animation:slideout 2s;-webkit-animation-fill-mode:forwards;animation:slideout 2s;animation-fill-mode:forwards}div.dxp.dxp-tab-item .vertical.tab-item-content:not(.tab-item-default) .content-overlay.right-to-left-animation{-webkit-animation:slidein 2s;-webkit-animation-fill-mode:forwards;animation:slidein 2s;animation-fill-mode:forwards}\@keyframes slidein{0%{right:-100%}to{right:0}}\@-webkit-keyframes slidein{0%{right:-100%}to{right:0}}\@keyframes slideout{0%{right:0}to{right:-100%}}\@-webkit-keyframes slideout{0%{right:0}to{right:-100%}}\@keyframes fadein{0%{opacity:0}to{opacity:1}}\@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}\@keyframes fadeout{0%{opacity:1}to{opacity:0}}\@-webkit-keyframes fadeout{0%{opacity:1}to{opacity:0}}\@media (max-width:991px){div.dxp.dxp-tab-item .vertical .tab-wrapper-vertical{z-index:1}div.dxp.dxp-tab-item .vertical.content-view.tab-item-active .content-overlay{position:fixed;overflow:hidden;height:100%;z-index:1;padding:0}div.dxp.dxp-tab-item .vertical.content-view.tab-item-active .tab-wrapper-vertical{z-index:-1}div.dxp.dxp-tab-item .vertical.content-view.tab-item-active.tab-item-default,div.dxp.dxp-tab-item .vertical.content-view.tab-item-active.tab-item-default.pos-relative{position:relative}div.dxp.dxp-tab-item .vertical.content-view.tab-item-active.tab-item-default.pos-absolute{position:absolute}div.dxp.dxp-tab-item .vertical.default-view .content-overlay{position:relative}}\@media (max-width:767px){div.dxp.dxp-tab-item .vertical .tab-wrapper-vertical{z-index:1}div.dxp.dxp-tab-item .vertical .content-overlay{padding:48px}div.dxp.dxp-tab-item .vertical.content-view.tab-item-active .content-overlay{padding:16px}div.dxp.dxp-tab-item .vertical.tab-item-content .button-container{top:16px;right:16px}}\@media (min-width:767px){div.dxp.dxp-tab-item .vertical.content-view.tab-item-active .content-overlay{padding:40px 35px 35px}div.dxp.dxp-tab-item .vertical.tab-item-content .button-container{top:40px}}\@media (min-width:992px){div.dxp.dxp-tab-item .vertical.content-view.tab-item-active .content-overlay{padding:0}div.dxp.dxp-tab-item .vertical.tab-item-content .button-container{top:0;right:15px}}div.dxp.dxp-tab-item .button-container.hide{display:none}div.dxp.dxp-tab-item .button-container.show{display:block}div.dxp.dxp-tab-item.horizontal .tab-item-content{display:none}div.dxp.dxp-tab-item.horizontal .tab-item-content.tab-item-active{overflow-x:auto;display:block}div.dxp.dxp-tab-item.horizontal .tab-item-content.tab-item-active.default-view .content-wrapper{padding:0}\@media (max-width:991px){div.dxp.dxp-tab-item.horizontal .tab-item-content.content-view{position:absolute;top:0;left:0}div.dxp.dxp-tab-item.horizontal .tab-item-content.content-view .content-wrapper{padding:35px}}div.dxp.dxp-tab-item .vertical.tab-item-content{display:none}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active{overflow-x:auto;display:block}\@media (min-width:992px) and (orientation:landscape){div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active{overflow:hidden}}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active.default-view .content-wrapper{padding:0}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active .content-wrapper{padding:0;overflow-x:hidden}div.dxp.dxp-tab-item .vertical.tab-item-content.accordion-innerHeight{max-height:65vh}div.dxp.dxp-tab-item .vertical .dxp-scrollable-container{overflow:auto;height:100%;width:100%;margin-top:30px}div.dxp.dxp-tab-item .vertical .dxp-scrollable{height:100%;width:100%}\@media (min-width:992px){div.dxp.dxp-tab-item .vertical.default-view .dxp-scrollable-container{max-height:100vh;overflow:hidden}div.dxp.dxp-tab-item .vertical.default-view .dxp-scrollable{max-height:85vh;padding-right:0;padding-bottom:0}div.dxp.dxp-tab-item .vertical .dxp-scrollable{padding-right:0}div.dxp.dxp-tab-item .vertical.content-view .content-overlay,div.dxp.dxp-tab-item .vertical.content-view .dxp-scrollable,div.dxp.dxp-tab-item .vertical.content-view .dxp-scrollable-container{max-height:calc(100vh - 176px)}div.dxp.dxp-tab-item .vertical.content-view .default-scrollable,div.dxp.dxp-tab-item .vertical.content-view .default-scrollable-container{max-height:100vh}}\@media (max-width:991px){div.dxp.dxp-tab-item .vertical.default-view .dxp-scrollable-container{max-height:85vh}div.dxp.dxp-tab-item .vertical.content-view .dxp-scrollable-container{max-height:calc(85vh - 176px)}div.dxp.dxp-tab-item .vertical.tab-item-content.tab-item-active .content-wrapper{padding:35px}div.dxp.dxp-tab-item .vertical.tab-item-content.content-view{position:relative;top:0;left:0}}\@media (max-width:991px) and (orientation:portrait){div.dxp.dxp-tab-item .vertical.tab-item-content.content-view{position:relative}}\@media (max-width:812px){div.dxp.dxp-tab-item .vertical.tab-item-content.content-view{position:relative}div.dxp.dxp-tab-item .vertical.tab-item-content.content-view .dxp-scrollable-container{max-height:90vh;padding-top:0;margin-top:30px}div.dxp.dxp-tab-item .vertical.tab-item-content.content-view .accordion-scrollable-container{max-height:90vh;padding-top:0}div.dxp.dxp-tab-item .vertical.content-view .dxp-scrollable-container{max-height:90vh}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { TabItem as dxp_tab_item };
