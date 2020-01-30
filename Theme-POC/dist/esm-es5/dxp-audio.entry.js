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
var messages = {
    'en': {
        hello: 'Hello World!'
    },
    'en-US': {
        hello: 'Hello World! en-US'
    },
    'es': {
        hello: 'Hola Mundo!'
    },
    'es-ES': {
        hello: 'Hola Mundo! es-ES'
    }
};
var Audio = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** audio state */
        this.audioState = { playing: false };
        /** host style object */
        this.hostStyle = {};
        /** audio auto play property */
        this.autoplay = false;
        /** audio default control property */
        this.defaultControls = true;
        /** hide audio play pause control */
        this.hidePlayPauseControl = false;
        /** holds boolean value of looping audio */
        this.loop = false;
        /** audio mute unmute control property */
        this.muted = false;
        /** audio preload property */
        this.preload = 'auto';
        /** holds type of audio format */
        this.type = 'mpeg';
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Audio', messages);
        if (this.autoplay) {
            this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: true });
        }
    };
    /** actions to be performed after component loading */
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        this.audioRef.addEventListener('ended', function () {
            _this.audioState = Object.assign(Object.assign({}, _this.audioState), { playing: false });
        });
        this.updateTopPosition();
    };
    /** listener for window resize/orientation change */
    class_1.prototype.windowResize = function () {
        this.updateTopPosition();
    };
    /**
     * toggle audio play/pause state
     */
    class_1.prototype.toggleAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.audioState.playing) return [3 /*break*/, 1];
                        this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: false });
                        this.audioRef.pause();
                        return [3 /*break*/, 3];
                    case 1:
                        this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: true });
                        return [4 /*yield*/, this.audioRef.play()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * toggle audio mute/unmute state
     */
    class_1.prototype.toggleMute = function () {
        this.muted = !this.muted;
    };
    /** update top position of floating audio */
    class_1.prototype.updateTopPosition = function () {
        var _this = this;
        if (this.position && this.position.startsWith('top')) {
            var availableHeader_1 = document.querySelector('dxp-header');
            availableHeader_1 = availableHeader_1 ? availableHeader_1 : document.querySelector('dxp-header-rich');
            if (availableHeader_1) {
                availableHeader_1.componentOnReady().then(function (hederRef) {
                    var headerElement = availableHeader_1.tagName.toLowerCase() === 'dxp-header' ?
                        _this.base.shadowRootQuerySelector(hederRef, 'header', false)
                        : _this.base.shadowRootQuerySelector(hederRef, '.header', false);
                    if (headerElement) {
                        _this.hostStyle = Object.assign(Object.assign({}, _this.hostStyle), { top: headerElement.offsetHeight + 5 + "px" });
                    }
                });
            }
            else if (document.querySelector('header')) {
                this.hostStyle = Object.assign(Object.assign({}, this.hostStyle), { top: document.querySelector('header').offsetHeight + 5 + "px" });
            }
        }
    };
    /** Render the audio */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-audio render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/dxp.min.css" }),
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/" + this.theme + ".min.css" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-audio.min.css" })]
        ];
        return (h("div", { style: this.hostStyle, class: this.base.componentClass() + " " + this.position, dir: this.dir, "data-theme": this.theme }, styles, h("audio", { autoplay: this.autoplay, muted: this.muted, ref: function (el) { _this.audioRef = el; }, controls: true, class: this.defaultControls ? ' ' : 'hide-default', loop: this.loop }, h("source", { src: this.src, type: "audio/" + this.type })), !this.defaultControls ?
            h("div", null, !this.hidePlayPauseControl ?
                h("a", { role: "button", href: "javascript:void(0)", onClick: function () { _this.toggleAudio(); }, "aria-label": this.ariaLabelPlayPause, class: "audio-control" }, h("i", { class: "" + (this.audioState.playing ? 'pause-icon' : 'play-icon') }))
                : '', this.hidePlayPauseControl && !this.autoplay ?
                h("a", { role: "button", href: "javascript:void(0)", onClick: function () { _this.toggleAudio(); }, "aria-label": this.ariaLabelPlayPause, class: "audio-control" }, h("i", { class: "" + (this.audioState.playing ? 'unmute-icon' : 'mute-icon') }))
                :
                    h("a", { role: "button", href: "javascript:void(0)", onClick: function () { _this.toggleMute(); }, "aria-label": this.ariaLabelMuteUnmute, class: "audio-control" }, h("i", { class: "" + (this.muted ? 'mute-icon' : 'unmute-icon') })))
            : ''));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-audio{background-color:transparent;z-index:100}div.dxp.dxp-audio .audio-control{cursor:pointer;bottom:.9375rem;right:.9375rem;margin:.125rem;border-radius:50%;overflow:hidden;background-color:rgba(60,60,60,.35);-webkit-backdrop-filter:blur(1.25rem);backdrop-filter:blur(1.25rem)}div.dxp.dxp-audio .audio-control,div.dxp.dxp-audio .audio-control i{display:inline-block;height:2.5rem;width:2.5rem}div.dxp.dxp-audio.top-left{position:fixed;top:10px;left:10px}div.dxp.dxp-audio.top-right{position:fixed;top:10px;right:10px}div.dxp.dxp-audio.bottom-left{position:fixed;bottom:10px;left:10px}div.dxp.dxp-audio.bottom-right{position:fixed;bottom:10px;right:10px}div.dxp.dxp-audio .hide-default{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Audio as dxp_audio };
