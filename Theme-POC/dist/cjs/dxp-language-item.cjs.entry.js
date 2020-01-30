'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const LanguageItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** condition to show the language */
        this.showLanguage = false;
        this.languageChanged = core$1.createEvent(this, "languageChanged", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** change of language */
    async handleChange() {
        core$1.dxp.i18n.changeLanguage(this.locale);
        this.languageChanged.emit({ 'locale': this.locale.toLowerCase() });
        if (this.link) { // not to redirect in case of SPAs
            window.location.href = this.link;
        }
    }
    /** render function */
    render() {
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-language-selector.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, core$1.h("li", { tabindex: "-2", role: "option", "data-value": this.locale, "aria-label": this.accessibilityText, "aria-selected": "true", class: this.selectedLanguage ? 'active langElement' : 'langElement', onClick: async () => { await this.handleChange(); } }, core$1.h("a", { class: "language-link", "data-value": this.locale }, this.inLanguage))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-language-item li{cursor:pointer;padding:0 16px 12px 16px}div.dxp.dxp-language-item li a,div.dxp.dxp-language-item li span{padding:12px 0;display:inline-block;font-size:16px;letter-spacing:0}div.dxp.dxp-language-item li.active a,div.dxp.dxp-language-item li.active a:focus,div.dxp.dxp-language-item li.active span,div.dxp.dxp-language-item li:focus a,div.dxp.dxp-language-item li:focus a:focus,div.dxp.dxp-language-item li:focus span,div.dxp.dxp-language-item li:hover a,div.dxp.dxp-language-item li:hover a:focus,div.dxp.dxp-language-item li:hover span{padding-bottom:8px;text-decoration:none}"; }
};

exports.dxp_language_item = LanguageItem;
