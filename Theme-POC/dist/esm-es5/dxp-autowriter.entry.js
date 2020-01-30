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
var Autowriter = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** variable for array objects */
        this.count = 0;
        /** variable text that gets displayed in loop as innerHTML */
        this.displayText = '';
        /** speed in milliseconds for interval to display next character */
        this.speed = 100;
        /** array text that needs to be displayed */
        this.textList = [];
    }
    /** calls function when value assigned to textList */
    class_1.prototype.textChange = function () {
        dxp.log.debug('Inside textChange');
        this.assignPlaceholderText();
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (this.textList.length > 0) {
            this.assignPlaceholderText();
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** method to clear intervals */
    class_1.prototype.clearAutoWriterIntervals = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                clearInterval(this._interval);
                clearInterval(this.interval);
                return [2 /*return*/];
            });
        });
    };
    /** reverse the direction of autowriter */
    class_1.prototype.alternatingWriterText = function () {
        var _this = this;
        // clear the interval of autowriter text
        clearInterval(this._interval);
        var counter2 = this.text.length;
        this.interval = setInterval(function () {
            counter2--;
            _this._count = counter2;
            _this.displayText = _this.displayText.substring(0, _this._count);
            if (_this._count === -1) {
                _this.assignPlaceholderText();
            }
        }, this.speed);
    };
    /** to assign all the objects of array */
    class_1.prototype.assignPlaceholderText = function () {
        if (this.count >= this.textList.length) {
            this.count = 0;
        }
        this.text = this.textList[this.count].text;
        this.count++;
        this.autowriterText();
    };
    /** to display the normal autowriter text */
    class_1.prototype.autowriterText = function () {
        var _this = this;
        // clear the interval of alternating text
        clearInterval(this.interval);
        this.counter = 0;
        this._interval = setInterval(function () {
            _this.displayText += _this.text.charAt(_this.counter);
            _this.counter++;
            // to display alternating text
            if (_this.counter === _this.text.length) {
                _this.alternatingWriterText();
            }
        }, this.speed);
    };
    /** method to return autowriter dom with fix or moving cursor */
    class_1.prototype.renderAutowriter = function () {
        if (this.fixCursor) {
            return [
                h("span", { class: "blinking-cursor" }),
                h("span", { class: "display-text " + (this.customStyleClass ? this.customStyleClass : '') }, this.displayText)
            ];
        }
        return [
            h("span", { class: "display-text " + (this.customStyleClass ? this.customStyleClass : '') }, this.displayText),
            h("span", { class: "blinking-cursor" })
        ];
    };
    /** Render the autowriter */
    class_1.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-autowriter render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-autowriter.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.textList.length > 0 && this.renderAutowriter()));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "textList": ["textChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-autowriter .blinking-cursor{-webkit-animation:blink 1s step-end infinite;-moz-animation:1s blink step-end infinite;-ms-animation:1s blink step-end infinite;-o-animation:1s blink step-end infinite;animation:blink 1s step-end infinite;margin-right:-14px}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Autowriter as dxp_autowriter };
