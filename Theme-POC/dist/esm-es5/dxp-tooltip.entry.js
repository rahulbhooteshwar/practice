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
var SHOW_TOOLTIP = 'dxp-show-tooltip';
var SLOT_TOOLTIP_CONTENT = '[slot="tooltip-content"]';
var HIDE_TOOLTIP = 'dxp-hide-tooltip';
var INSIDE_SHADOW = 'inside-shadow';
var SELECTOR_ID = 'selector-id';
var Tooltip = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** placement of tooltip */
        this.placement = 'bottom';
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTooltip()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component is updated */
    class_1.prototype.componentDidUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createTooltip()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component is unloaded */
    class_1.prototype.componentDidUnload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.destroyTooltip()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
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
    /** Create tooltip */
    class_1.prototype.createTooltip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentElement, selectorElement, parent, triggerArray, _i, triggerArray_1, eventName, iDiv, toolTipContainer, arrow, toolTipcontent, contentData, contentSlot, linkTheme, offsetParent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentElement = this.element ? this.element : this.element;
                        selectorElement = document.getElementById(this.element.getAttribute(SELECTOR_ID));
                        if (this.element.hasAttribute(INSIDE_SHADOW) && selectorElement === null) {
                            parent = this.element.parentElement;
                            selectorElement = parent.querySelector("#" + this.element.getAttribute(SELECTOR_ID));
                        }
                        if (selectorElement && this.trigger) {
                            triggerArray = this.trigger.split(',');
                            for (_i = 0, triggerArray_1 = triggerArray; _i < triggerArray_1.length; _i++) {
                                eventName = triggerArray_1[_i];
                                selectorElement.addEventListener(eventName.trim(), this.eventHandler);
                            }
                        }
                        if (!(selectorElement && document.getElementById("tooltip-" + selectorElement.id))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.destroyTooltip()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        iDiv = document.createElement('div');
                        iDiv.id = "tooltip-" + selectorElement.id;
                        iDiv.className += [this.base.componentClass(), 'tool-tip', this.placement, HIDE_TOOLTIP].join(' ');
                        iDiv.setAttribute('dir', this.dir);
                        iDiv.setAttribute('data-theme', this.theme);
                        iDiv.setAttribute('placement', this.placement);
                        iDiv.setAttribute('role', 'tooltip');
                        iDiv.setAttribute('aria-hidden', 'true');
                        if (this.element.hasAttribute(INSIDE_SHADOW)) {
                            iDiv.setAttribute(INSIDE_SHADOW, "" + this.element.hasAttribute(INSIDE_SHADOW));
                        }
                        toolTipContainer = document.createElement('div');
                        toolTipContainer.id = "tooltip-container-" + selectorElement.id;
                        toolTipContainer.className += ['dxp-tooltip-container'].join(' ');
                        toolTipContainer.setAttribute('dir', this.dir);
                        arrow = document.createElement('div');
                        arrow.id = "tooltip-arrow-'" + selectorElement.id;
                        arrow.className += ['arrow', 'shadow', this.placement].join(' ');
                        iDiv.appendChild(arrow);
                        this.setTooltipHeader(selectorElement, toolTipContainer);
                        toolTipcontent = document.createElement('div');
                        toolTipcontent.id = "tooltip-content-" + selectorElement.id;
                        toolTipcontent.className += ['tooltip-content'].join(' ');
                        toolTipcontent.setAttribute('dir', this.dir);
                        toolTipcontent.setAttribute('placement', this.placement);
                        // Find Content in slot
                        if (this.content) {
                            contentData = currentElement.querySelector('.tooltip-content').innerHTML;
                            toolTipcontent.innerHTML = contentData;
                            toolTipContainer.appendChild(toolTipcontent);
                        }
                        else {
                            contentSlot = this.element.querySelector(SLOT_TOOLTIP_CONTENT) ?
                                this.element.querySelector(SLOT_TOOLTIP_CONTENT).cloneNode(true)
                                :
                                    undefined;
                            if (contentSlot) {
                                toolTipcontent.appendChild(contentSlot);
                                toolTipContainer.appendChild(toolTipcontent);
                            }
                        }
                        linkTheme = document.createElement('link');
                        linkTheme.rel = 'stylesheet';
                        linkTheme.type = 'text/css';
                        linkTheme.href = "";
                        iDiv.appendChild(linkTheme);
                        linkTheme.href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-tooltip.min.css";
                        iDiv.appendChild(linkTheme);
                        iDiv.appendChild(toolTipContainer);
                        offsetParent = this.getOffsetParent(selectorElement);
                        if (offsetParent === null) {
                            offsetParent = selectorElement.ownerDocument.getElementById('body')[0];
                            // document.getElementsByTagName('body')[0].appendChild(iDiv) // For Future reference
                        }
                        // append vTooltip to offset parent to calculate correct position
                        offsetParent.appendChild(iDiv);
                        // Hide tooltip element's content
                        if (!currentElement.querySelector('.dxp-tooltip-container').classList.contains(HIDE_TOOLTIP)) {
                            currentElement.querySelector('.dxp-tooltip-container').classList.add(HIDE_TOOLTIP);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Set tooltip header */
    class_1.prototype.setTooltipHeader = function (selectorElement, toolTipContainer) {
        var currentElement = this.element ? this.element : this.element;
        var toolTipHeader = document.createElement('div');
        toolTipHeader.id = "tooltip-container-" + selectorElement.id;
        toolTipHeader.className += ['tooltip-header'].join(' ');
        toolTipHeader.setAttribute('dir', this.dir);
        // Find Header Content in slot
        if (this.tooltipTitle) {
            // copy inner html
            var headerData = currentElement.querySelector('.tooltip-header').innerHTML;
            toolTipHeader.innerHTML = headerData;
            toolTipContainer.appendChild(toolTipHeader);
        }
        else {
            // Find and copy Slot content
            var headerSlot = this.element.querySelector('[slot="tooltip-title"]') ?
                this.element.querySelector('[slot="tooltip-title"]').cloneNode(true)
                :
                    undefined; // don't use current Element
            if (headerSlot) {
                toolTipHeader.appendChild(headerSlot);
                toolTipContainer.appendChild(toolTipHeader);
            }
        }
    };
    /** Destroy tooltip */
    class_1.prototype.destroyTooltip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vTooltipId, vToolTip;
            return __generator(this, function (_a) {
                vTooltipId = "tooltip-" + this.element.getAttribute(SELECTOR_ID);
                vToolTip = document.getElementById(vTooltipId);
                vToolTip.parentNode.removeChild(vToolTip);
                return [2 /*return*/];
            });
        });
    };
    /** Method to open modal */
    class_1.prototype.hideTooltip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.actionEventHandler();
                return [2 /*return*/];
            });
        });
    };
    /** Method to open modal */
    class_1.prototype.showTooltip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.actionEventHandler();
                return [2 /*return*/];
            });
        });
    };
    /** Method to open modal */
    class_1.prototype.toggleTooltip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.actionEventHandler();
                return [2 /*return*/];
            });
        });
    };
    /** call event handler on action */
    class_1.prototype.actionEventHandler = function () {
        var selectorElement = document.getElementById(this.element.getAttribute(SELECTOR_ID));
        var event = {
            'target': selectorElement
        };
        this.eventHandler(event);
    };
    /** Click Handler */
    class_1.prototype.eventHandler = function (event) {
        var selectorEl = event.target;
        var vTooltipId = "tooltip-" + selectorEl.id;
        if (!selectorEl.id) {
            return;
        } // return if selector Id is not found
        var vToolTip = document.getElementById(vTooltipId);
        var toolTip = document.querySelector("[selector-id=" + selectorEl.id + "]");
        if (vToolTip && vToolTip.hasAttribute(INSIDE_SHADOW) && toolTip === null) {
            toolTip = selectorEl.parentElement.querySelector("[selector-id=" + selectorEl.id + "]");
        }
        if (vToolTip.classList.contains(SHOW_TOOLTIP)) {
            // copy back tooltip content to slot
            selectorEl.removeAttribute('aria-describedby', vTooltipId);
            var vTooltipContent = vToolTip.querySelector(SLOT_TOOLTIP_CONTENT);
            if (vTooltipContent) {
                // tslint:disable-next-lines
                var toolTipContent = toolTip.querySelector(SLOT_TOOLTIP_CONTENT);
                // replace element
                if (toolTipContent) {
                    toolTipContent.parentNode.replaceChild(vTooltipContent.cloneNode(true), toolTipContent);
                }
            }
            vToolTip.classList.remove(SHOW_TOOLTIP);
            vToolTip.classList.add(HIDE_TOOLTIP);
            vToolTip.removeAttribute('style');
        }
        else {
            /* tslint:disable */
            vToolTip.classList.remove(HIDE_TOOLTIP); // IMP To calculate and get offsetHeight/width
            var placement = vToolTip.getAttribute('placement') === null ? 'right' : vToolTip.getAttribute('placement');
            // Set top and left to 0,0
            // compute centerX and centerY to calculate transform params
            var translateX = void 0;
            var translateY = void 0;
            var translateZ = 100; // 3-D
            var offsetValue = 10;
            var arrowStyle = void 0;
            var vToolTipH = parseFloat(window.getComputedStyle(vToolTip).getPropertyValue('height'));
            var vToolTipW = parseFloat(window.getComputedStyle(vToolTip).getPropertyValue('width'));
            var arrowH = parseFloat(window.getComputedStyle(vToolTip.getElementsByClassName('arrow')[0]).getPropertyValue('height'));
            var arrowW = parseFloat(window.getComputedStyle(vToolTip.getElementsByClassName('arrow')[0]).getPropertyValue('width'));
            switch (placement.toLowerCase()) {
                case 'top':
                    arrowStyle = {
                        'left': (vToolTipW / 2) - (arrowW / 2) + "px",
                        'bottom': "-" + arrowW / 2 + "px"
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth / 2) - (vToolTip.offsetWidth / 2);
                    translateY = selectorEl.offsetTop - vToolTip.offsetHeight - offsetValue;
                    break;
                case 'top-left':
                    arrowStyle = {
                        'right': arrowW / 2 + (offsetValue / 2) + "px",
                        'bottom': "-" + arrowW / 2 + "px"
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth) - (vToolTip.offsetWidth);
                    translateY = selectorEl.offsetTop - vToolTip.offsetHeight - offsetValue;
                    break;
                case 'top-right':
                    arrowStyle = {
                        'left': arrowW / 2 + (offsetValue / 2) + "px",
                        'bottom': "-" + arrowW / 2 + "px"
                    };
                    translateX = (selectorEl.offsetLeft);
                    translateY = selectorEl.offsetTop - vToolTip.offsetHeight - offsetValue;
                    break;
                case 'right':
                    arrowStyle = {
                        'top': (vToolTipH / 2) - (arrowH / 2) + "px",
                        'left': "-" + arrowW / 2 + "px"
                    };
                    translateX = selectorEl.offsetLeft + selectorEl.offsetWidth + offsetValue;
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight / 2)) - (vToolTip.offsetHeight / 2);
                    break;
                case 'right-top':
                    arrowStyle = {
                        'bottom': (arrowH / 2) + (offsetValue / 2) + "px",
                        'left': "-" + arrowW / 2 + "px"
                    };
                    translateX = selectorEl.offsetLeft + selectorEl.offsetWidth + offsetValue;
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight)) - (vToolTip.offsetHeight);
                    break;
                case 'right-bottom':
                    arrowStyle = {
                        'top': (arrowH / 2) + (offsetValue / 2) + "px",
                        'left': "-" + arrowW / 2 + "px"
                    };
                    translateX = selectorEl.offsetLeft + selectorEl.offsetWidth + offsetValue;
                    translateY = (selectorEl.offsetTop);
                    break;
                case 'left':
                    arrowStyle = {
                        'top': (vToolTipH / 2) - (arrowH / 2) + "px",
                        'right': "-" + arrowW / 2 + "px"
                    };
                    translateX = Math.sign(selectorEl.offsetLeft - vToolTip.offsetWidth) === -1 ?
                        ((-vToolTip.offsetWidth + selectorEl.offsetLeft) - offsetValue) : ((selectorEl.offsetLeft - vToolTip.offsetWidth) - offsetValue);
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight / 2)) - (vToolTip.offsetHeight / 2);
                    break;
                case 'left-top':
                    arrowStyle = {
                        'bottom': (arrowH / 2) + (offsetValue / 2) + "px",
                        'right': "-" + arrowW / 2 + "px"
                    };
                    translateX = Math.sign(selectorEl.offsetLeft - vToolTip.offsetWidth) === -1 ?
                        ((-vToolTip.offsetWidth + selectorEl.offsetLeft) - offsetValue) : ((selectorEl.offsetLeft - vToolTip.offsetWidth) - offsetValue);
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight)) - (vToolTip.offsetHeight);
                    break;
                case 'left-bottom':
                    arrowStyle = {
                        'top': (arrowH / 2) + (offsetValue / 2) + "px",
                        'right': "-" + arrowW / 2 + "px"
                    };
                    translateX = Math.sign(selectorEl.offsetLeft - vToolTip.offsetWidth) === -1 ?
                        ((-vToolTip.offsetWidth + selectorEl.offsetLeft) - offsetValue) : ((selectorEl.offsetLeft - vToolTip.offsetWidth) - offsetValue);
                    translateY = (selectorEl.offsetTop);
                    break;
                case 'bottom':
                    arrowStyle = {
                        'left': (vToolTipW / 2) - (arrowW / 2) + "px",
                        'top': "-" + arrowW / 2 + "px"
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth / 2) - (vToolTip.offsetWidth / 2);
                    translateY = selectorEl.offsetTop + selectorEl.offsetHeight + offsetValue;
                    break;
                case 'bottom-left':
                    arrowStyle = {
                        'right': 0 + (arrowW / 2) + (offsetValue / 2) + "px",
                        'top': "-" + arrowW / 2 + "px"
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth) - (vToolTip.offsetWidth);
                    translateY = selectorEl.offsetTop + selectorEl.offsetHeight + offsetValue;
                    break;
                case 'bottom-right':
                    arrowStyle = {
                        'left': 0 + (arrowW / 2) + (offsetValue / 2) + "px",
                        'top': "-" + arrowW / 2 + "px"
                    };
                    translateX = (selectorEl.offsetLeft);
                    translateY = selectorEl.offsetTop + selectorEl.offsetHeight + offsetValue;
                    break;
            }
            var style = {
                'will-change': 'transform',
                'top': '0px',
                'left': '0px',
                'position': 'absolute',
                'visibility': 'visible',
                'transform': "translate3d(" + translateX + "px, " + translateY + "px, " + translateZ + "px)",
            };
            /** convert style json to style string */
            function getStyleString(styleJson) {
                /* tslint:disable */
                return Object.entries(styleJson).reduce(function (styleString, _a) {
                    var propName = _a[0], propValue = _a[1];
                    return "" + styleString + propName + ":" + propValue + ";";
                }, '');
            }
            vToolTip.classList.add(SHOW_TOOLTIP);
            vToolTip.classList.remove(HIDE_TOOLTIP);
            vToolTip.setAttribute('aria-hidden', 'false');
            vToolTip.setAttribute('style', getStyleString(style));
            vToolTip.querySelector('.arrow').setAttribute('style', getStyleString(arrowStyle));
            selectorEl.setAttribute('aria-describedby', vTooltipId);
        }
    };
    /** getOffsetParent */
    class_1.prototype.getOffsetParent = function (element) {
        if (!element) {
            return document.documentElement;
        }
        // tslint:disable-next-line
        var noOffsetParent = null;
        // NOTE: 1 DOM access here
        // tslint:disable-next-line
        var offsetParent = element.offsetParent || null;
        // Skip hidden elements which don't have an offsetParent
        while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
        }
        var nodeName = offsetParent && offsetParent.nodeName;
        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element ? element.ownerDocument.documentElement : document.documentElement;
        }
        // .offsetParent will return the closest TH, TD or TABLE in case
        // no offsetParent is present, I hate this job...
        if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
            this.getStyleComputedProperty(offsetParent, 'position') === 'static') {
            return this.getOffsetParent(offsetParent);
        }
        return offsetParent;
    };
    /** getStyleComputedProperty out of style */
    class_1.prototype.getStyleComputedProperty = function (element, property) {
        if (element.nodeType !== 1) {
            return [];
        }
        // NOTE: 1 DOM access here
        var window = element.ownerDocument.defaultView;
        // tslint:disable-next-line
        var css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    };
    /** Insert DOM element after referenceNode */
    class_1.prototype.insertAfter = function (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    };
    /** Insert DOM element Before referenceNode */
    class_1.prototype.insertBefore = function (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode);
    };
    /** Render the tooltip */
    class_1.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-tooltip render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-tooltip.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { role: "tooltip", class: "dxp-tooltip-container" }, h("div", { class: "tooltip-header" }, this.tooltipTitle !== undefined ?
            h("h3", { class: "text", innerHTML: this.tooltipTitle }) :
            h("slot", { name: "tooltip-title" })), h("div", { class: "tooltip-content" }, this.content !== undefined ?
            h("p", { class: "text", innerHTML: this.content }) :
            h("slot", { name: "tooltip-content" })))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Tooltip as dxp_tooltip };
