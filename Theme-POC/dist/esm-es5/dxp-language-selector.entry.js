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
var LANGUAGE_SELECTOR = 'dxp-language-selector';
var SELECTED_LANGUAGE = 'selected-language';
var SHOW_LANGUAGE_LIST = 'show-lang-list';
var LanguageSelector = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** Country code */
        this.cCode = '';
        /** condition to show the language */
        this.showLanguage = false;
    }
    /** Listener that looks for languageLocales object to be assigned/changed externally */
    class_1.prototype.languageHandler = function () {
        if (this.languageLocales && this.apiUrl) { // sorting language list in case fetch from API
            this.languageLocales = this.sortByLanguageName(this.languageLocales);
        }
        this.base.createNestedMarkup(this.languageContainer, 'dxp-language-item', this.languageLocales);
        if (this.languageLocales && this.languageContainer) {
            this.parentChildLen = this.languageContainer.children.length;
            for (var _i = 0, _a = Object.keys(this.languageContainer.children); _i < _a.length; _i++) { // set active language on load
                var i = _a[_i];
                if (this.locale) { // in case active locale is set and matches, set the respective language as active
                    var activeLocale = this.languageLocales[i].locale.toLowerCase().replace('_', '-') === this.locale.replace('_', '-') ? 'true' : 'false';
                    this.languageContainer.children[i].setAttribute(SELECTED_LANGUAGE, activeLocale);
                }
                else { // for all other cases, making first one as active by default
                    this.languageContainer.children[i].setAttribute(SELECTED_LANGUAGE, i === '0' ? 'true' : 'false');
                }
            }
        }
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shadow, href, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'LanguageSelector', '');
                        this.isLanguageItemPresent = this.base.returnBooleanValue(this.element.querySelector('dxp-language-item'));
                        shadow = this.element ? this.element : this.element;
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = "";
                        dxp.util.appendLinkElement(shadow, href);
                        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-language-selector.min.css";
                        dxp.util.appendLinkElement(shadow, href);
                        this.parentChildLen = document.querySelector(LANGUAGE_SELECTOR) ? document.querySelector(LANGUAGE_SELECTOR).children.length : 0;
                        this.count = 0;
                        if (!this.apiUrl) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.fetchAPI()];
                    case 1:
                        _a.languageData = _b.sent();
                        this.fetchLocales(this.languageData);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component loaded */
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        // Language list will be collapse on mouse hovering on any link if present in document
        document.addEventListener('mouseenter', function (e) {
            var target = e.target;
            if (target.nodeName !== '#document' && target.nodeName === 'A' && !target.closest(LANGUAGE_SELECTOR)) {
                _this.showLanguage = false;
            }
        }, true);
        this.languageHandler();
    };
    /** for mouse click outside of component */
    class_1.prototype.clickEvent = function (e) {
        if (e.target && e.composedPath()[0]) {
            this.showLanguage = e.composedPath()[0].className === SHOW_LANGUAGE_LIST || e.composedPath()[0].classList.contains('sel-lang') ? this.showLanguage : false;
        }
        else if (e.target.classList.contains('sc-dxp-language-selector')) { // for IE and Edge
            this.showLanguage = this.showLanguage;
        }
        else {
            this.showLanguage = false;
        }
        this.count = 0;
    };
    /** for accessibility */
    class_1.prototype.handleKeyDown = function (e) {
        if (e.keyCode === 9) {
            this.count = 0;
            this.showLanguage = false;
        }
        if (e.keyCode === 32) {
            e.preventDefault();
        }
    };
    /** for accessibility */
    class_1.prototype.handleKeyUp = function (ev) {
        var keycode = ev.keyCode;
        var target = ev.target ? ev.composedPath()[0] : ev.target;
        if ((ev.target.localName === LANGUAGE_SELECTOR || ev.target.localName === 'li' || ev.target.parentElement.classList.contains(SHOW_LANGUAGE_LIST)
            || ev.target.classList.contains(SHOW_LANGUAGE_LIST)) && (keycode === 13 || keycode === 32)) {
            // on enter and space key, show dropdown
            if (target.classList.contains('langElement')) {
                target.parentElement.parentElement.handleChange();
            }
            else {
                this.count = 0;
            }
            this.showLanguage = !this.showLanguage;
        }
        if (keycode === 40 && this.count < this.parentChildLen) { // for down arrow key
            this.accessibilityFocus(ev, this.count, 'down');
            this.count++;
        }
        if (keycode === 38) { // for up arrow key
            this.count--;
            if (this.count > 0) {
                this.accessibilityFocus(ev, this.count - 1, 'up');
            }
            else {
                this.count = 1;
            }
        }
        // on escape key press, hide dropdown
        if (keycode === 27) {
            this.count = 0;
            this.showLanguage = false;
        }
        // on tab key press, hide dropdown
        if (keycode === 9) {
            this.count = 0;
            this.showLanguage = false;
        }
    };
    /** for accessibility */
    class_1.prototype.languageChangedHandler = function (e) {
        this.showLanguage = !this.showLanguage;
        for (var _i = 0, _a = Object.keys(e.target.parentElement.children); _i < _a.length; _i++) {
            var i = _a[_i];
            e.target.parentElement.children[i].setAttribute(SELECTED_LANGUAGE, 'false');
        }
        e.target.setAttribute(SELECTED_LANGUAGE, 'true');
        dxp.log.debug(this.element.tagName, 'languageChangeHandler()', 'Received the custom languageChanged event: ', Option);
    };
    /**
     * click listener for routing events on anchor tag
     */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** method for focus during accessibility */
    class_1.prototype.accessibilityFocus = function (ev, count, key) {
        if (ev.target.localName === LANGUAGE_SELECTOR) { // for direct access to child
            var li = !this.languageLocales ?
                ev.target.children[count].querySelector('li')
                :
                    ev.target.children[2].getElementsByTagName('dxp-language-item')[count].querySelector('li');
            this.focusElement(li);
        }
        else if (ev.target.parentElement.classList.contains(SHOW_LANGUAGE_LIST)) {
            var elem = ev.target.parentElement;
            var li = this.returnFocusItem(elem, key, count);
            this.focusElement(li);
        }
        else if (ev.target.classList.contains(SHOW_LANGUAGE_LIST)) {
            var elem = ev.target;
            var li = this.returnFocusItem(elem, key, count);
            this.focusElement(li);
        }
        else { // for going to parent element and finding child, in case one is selected
            var parent = ev.target.parentElement.parentElement;
            var li = key === 'down' ? parent.nextElementSibling.querySelector('li') : parent.previousElementSibling.querySelector('li');
            this.focusElement(li);
        }
    };
    /** fetch API data */
    class_1.prototype.fetchAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cCode = this.locale.substr(3);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dxp.api(this.apiUrl)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        dxp.log.error(this.element.tagName, 'fetchAPI()', "fetch failed for " + this.apiUrl, err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** fetch locale list */
    class_1.prototype.fetchLocales = function (LanguageArray) {
        if (LanguageArray) {
            for (var _i = 0, _a = LanguageArray.countries; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.countryCode.toUpperCase() === this.cCode.toUpperCase()) {
                    this.languageLocales = item.locales;
                }
            }
        }
    };
    /** method to focus input element  */
    class_1.prototype.focusElement = function (elem) {
        elem.focus();
    };
    /** method for returning li for IE accessibility */
    class_1.prototype.returnFocusItem = function (elem, key, count) {
        var ul = elem.nextElementSibling.children[0];
        if (key === 'down') {
            return ul.children[count].querySelector('li');
        }
        return ul.children[count - 1].querySelector('li');
    };
    /** sort language names */
    class_1.prototype.sortByLanguageName = function (languagesData) {
        if (languagesData) {
            return languagesData.sort(function (a, b) {
                var nameA = a.language.toUpperCase(); // ignore upper and lowercase
                var nameB = b.language.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                } // names must be equal
                return 0;
            });
        }
    };
    /** to toggle whether to show or hide list */
    class_1.prototype.toggleShowLanguage = function () {
        this.showLanguage = !this.showLanguage;
    };
    /** render function */
    class_1.prototype.render = function () {
        var _this = this;
        if ((this.languageLocales && this.languageLocales.length > 0) || this.isLanguageItemPresent) {
            return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, h("div", { class: "language-selector" }, h("div", { class: "language-wrapper " + (this.showLanguage ? 'active' : ''), role: "application" }, h("span", { id: "language-selector", class: "show-lang-list", onClick: function () { return _this.toggleShowLanguage(); }, "aria-haspopup": "listbox", role: "button", "aria-label": "Language Selector Dropdown", tabindex: "0" }, h("span", { class: "sel-lang lang-position lang-caret" })), h("ul", { class: "header-lang-list lang-list", role: "listbox", "aria-label": "select language from list " }, h("div", { ref: function (el) { return _this.languageContainer = el; } }, h("slot", null)))))));
        }
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "languageLocales": ["languageHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-language-selector .language-wrapper{padding-right:0;width:50px;position:relative;cursor:pointer}div.dxp.dxp-language-selector .language-wrapper.active .header-lang-list{display:block}div.dxp.dxp-language-selector .show-lang-list{height:56px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-language-selector .sel-lang{height:25px;width:40px;padding-left:0;display:inline-block}div.dxp.dxp-language-selector ul{display:none;padding-top:12px;border-radius:0 0 4px 4px;position:absolute;top:56px;z-index:1;right:0}div.dxp.dxp-language-selector .lang-caret{position:relative}div.dxp.dxp-language-selector .lang-caret:after,div.dxp.dxp-language-selector .lang-caret:before{content:\"\";height:6px;width:1px;position:absolute;top:10px;display:block;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:0;border-radius:3px}div.dxp.dxp-language-selector .lang-caret:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:4px}div.dxp.dxp-language-selector .lang-list:hover>li.active span{border:none;padding:12px 0}div.dxp.dxp-language-selector .lang-list:hover>li.active:hover span{padding-bottom:8px}div.dxp.dxp-language-selector .language-selector>div{padding-right:0}div.dxp.dxp-language-selector .language-selector>div:after{content:\".\";display:block;height:0;clear:both;visibility:hidden}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper{float:left}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper ul{left:0;right:auto}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper li{text-align:left}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .sel-lang{padding-right:32px}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret{position:relative}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret:after,div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret:before{content:\"\";height:6px;width:1px;position:absolute;top:10px;display:block;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:32px;border-radius:3px}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:36px}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { LanguageSelector as dxp_language_selector };
