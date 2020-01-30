import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const LANGUAGE_SELECTOR = 'dxp-language-selector';
const SELECTED_LANGUAGE = 'selected-language';
const SHOW_LANGUAGE_LIST = 'show-lang-list';
const LanguageSelector = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Country code */
        this.cCode = '';
        /** condition to show the language */
        this.showLanguage = false;
    }
    /** Listener that looks for languageLocales object to be assigned/changed externally */
    languageHandler() {
        if (this.languageLocales && this.apiUrl) { // sorting language list in case fetch from API
            this.languageLocales = this.sortByLanguageName(this.languageLocales);
        }
        this.base.createNestedMarkup(this.languageContainer, 'dxp-language-item', this.languageLocales);
        if (this.languageLocales && this.languageContainer) {
            this.parentChildLen = this.languageContainer.children.length;
            for (const i of Object.keys(this.languageContainer.children)) { // set active language on load
                if (this.locale) { // in case active locale is set and matches, set the respective language as active
                    const activeLocale = this.languageLocales[i].locale.toLowerCase().replace('_', '-') === this.locale.replace('_', '-') ? 'true' : 'false';
                    this.languageContainer.children[i].setAttribute(SELECTED_LANGUAGE, activeLocale);
                }
                else { // for all other cases, making first one as active by default
                    this.languageContainer.children[i].setAttribute(SELECTED_LANGUAGE, i === '0' ? 'true' : 'false');
                }
            }
        }
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'LanguageSelector', '');
        this.isLanguageItemPresent = this.base.returnBooleanValue(this.element.querySelector('dxp-language-item'));
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-language-selector.min.css`;
        dxp.util.appendLinkElement(shadow, href);
        this.parentChildLen = document.querySelector(LANGUAGE_SELECTOR) ? document.querySelector(LANGUAGE_SELECTOR).children.length : 0;
        this.count = 0;
        if (this.apiUrl) { // if language data is coming from API
            this.languageData = await this.fetchAPI();
            this.fetchLocales(this.languageData);
        }
    }
    /** actions to be performed after component loaded */
    componentDidLoad() {
        // Language list will be collapse on mouse hovering on any link if present in document
        document.addEventListener('mouseenter', e => {
            const target = e.target;
            if (target.nodeName !== '#document' && target.nodeName === 'A' && !target.closest(LANGUAGE_SELECTOR)) {
                this.showLanguage = false;
            }
        }, true);
        this.languageHandler();
    }
    /** for mouse click outside of component */
    clickEvent(e) {
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
    }
    /** for accessibility */
    handleKeyDown(e) {
        if (e.keyCode === 9) {
            this.count = 0;
            this.showLanguage = false;
        }
        if (e.keyCode === 32) {
            e.preventDefault();
        }
    }
    /** for accessibility */
    handleKeyUp(ev) {
        const keycode = ev.keyCode;
        const target = ev.target ? ev.composedPath()[0] : ev.target;
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
    }
    /** for accessibility */
    languageChangedHandler(e) {
        this.showLanguage = !this.showLanguage;
        for (const i of Object.keys(e.target.parentElement.children)) {
            e.target.parentElement.children[i].setAttribute(SELECTED_LANGUAGE, 'false');
        }
        e.target.setAttribute(SELECTED_LANGUAGE, 'true');
        dxp.log.debug(this.element.tagName, 'languageChangeHandler()', 'Received the custom languageChanged event: ', Option);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** method for focus during accessibility */
    accessibilityFocus(ev, count, key) {
        if (ev.target.localName === LANGUAGE_SELECTOR) { // for direct access to child
            const li = !this.languageLocales ?
                ev.target.children[count].querySelector('li')
                :
                    ev.target.children[2].getElementsByTagName('dxp-language-item')[count].querySelector('li');
            this.focusElement(li);
        }
        else if (ev.target.parentElement.classList.contains(SHOW_LANGUAGE_LIST)) {
            const elem = ev.target.parentElement;
            const li = this.returnFocusItem(elem, key, count);
            this.focusElement(li);
        }
        else if (ev.target.classList.contains(SHOW_LANGUAGE_LIST)) {
            const elem = ev.target;
            const li = this.returnFocusItem(elem, key, count);
            this.focusElement(li);
        }
        else { // for going to parent element and finding child, in case one is selected
            const parent = ev.target.parentElement.parentElement;
            const li = key === 'down' ? parent.nextElementSibling.querySelector('li') : parent.previousElementSibling.querySelector('li');
            this.focusElement(li);
        }
    }
    /** fetch API data */
    async fetchAPI() {
        this.cCode = this.locale.substr(3);
        try {
            return await dxp.api(this.apiUrl);
        }
        catch (err) {
            dxp.log.error(this.element.tagName, 'fetchAPI()', `fetch failed for ${this.apiUrl}`, err);
        }
    }
    /** fetch locale list */
    fetchLocales(LanguageArray) {
        if (LanguageArray) {
            for (const item of LanguageArray.countries) {
                if (item.countryCode.toUpperCase() === this.cCode.toUpperCase()) {
                    this.languageLocales = item.locales;
                }
            }
        }
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** method for returning li for IE accessibility */
    returnFocusItem(elem, key, count) {
        const ul = elem.nextElementSibling.children[0];
        if (key === 'down') {
            return ul.children[count].querySelector('li');
        }
        return ul.children[count - 1].querySelector('li');
    }
    /** sort language names */
    sortByLanguageName(languagesData) {
        if (languagesData) {
            return languagesData.sort((a, b) => {
                const nameA = a.language.toUpperCase(); // ignore upper and lowercase
                const nameB = b.language.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                } // names must be equal
                return 0;
            });
        }
    }
    /** to toggle whether to show or hide list */
    toggleShowLanguage() {
        this.showLanguage = !this.showLanguage;
    }
    /** render function */
    render() {
        if ((this.languageLocales && this.languageLocales.length > 0) || this.isLanguageItemPresent) {
            return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, h("div", { class: "language-selector" }, h("div", { class: `language-wrapper ${this.showLanguage ? 'active' : ''}`, role: "application" }, h("span", { id: "language-selector", class: "show-lang-list", onClick: () => this.toggleShowLanguage(), "aria-haspopup": "listbox", role: "button", "aria-label": "Language Selector Dropdown", tabindex: "0" }, h("span", { class: "sel-lang lang-position lang-caret" })), h("ul", { class: "header-lang-list lang-list", role: "listbox", "aria-label": "select language from list " }, h("div", { ref: el => this.languageContainer = el }, h("slot", null)))))));
        }
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "languageLocales": ["languageHandler"]
    }; }
    static get style() { return "div.dxp.dxp-language-selector .language-wrapper{padding-right:0;width:50px;position:relative;cursor:pointer}div.dxp.dxp-language-selector .language-wrapper.active .header-lang-list{display:block}div.dxp.dxp-language-selector .show-lang-list{height:56px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-language-selector .sel-lang{height:25px;width:40px;padding-left:0;display:inline-block}div.dxp.dxp-language-selector ul{display:none;padding-top:12px;border-radius:0 0 4px 4px;position:absolute;top:56px;z-index:1;right:0}div.dxp.dxp-language-selector .lang-caret{position:relative}div.dxp.dxp-language-selector .lang-caret:after,div.dxp.dxp-language-selector .lang-caret:before{content:\"\";height:6px;width:1px;position:absolute;top:10px;display:block;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:0;border-radius:3px}div.dxp.dxp-language-selector .lang-caret:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:4px}div.dxp.dxp-language-selector .lang-list:hover>li.active span{border:none;padding:12px 0}div.dxp.dxp-language-selector .lang-list:hover>li.active:hover span{padding-bottom:8px}div.dxp.dxp-language-selector .language-selector>div{padding-right:0}div.dxp.dxp-language-selector .language-selector>div:after{content:\".\";display:block;height:0;clear:both;visibility:hidden}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper{float:left}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper ul{left:0;right:auto}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper li{text-align:left}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .sel-lang{padding-right:32px}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret{position:relative}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret:after,div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret:before{content:\"\";height:6px;width:1px;position:absolute;top:10px;display:block;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:32px;border-radius:3px}div.dxp.dxp-language-selector[dir=rtl] .language-wrapper .lang-caret:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:36px}"; }
};

export { LanguageSelector as dxp_language_selector };
