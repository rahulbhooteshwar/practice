import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const LanguageItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** condition to show the language */
        this.showLanguage = false;
        this.languageChanged = createEvent(this, "languageChanged", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** change of language */
    async handleChange() {
        dxp.i18n.changeLanguage(this.locale);
        this.languageChanged.emit({ 'locale': this.locale.toLowerCase() });
        if (this.link) { // not to redirect in case of SPAs
            window.location.href = this.link;
        }
    }
    /** render function */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-language-selector.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme }, styles, h("li", { tabindex: "-2", role: "option", "data-value": this.locale, "aria-label": this.accessibilityText, "aria-selected": "true", class: this.selectedLanguage ? 'active langElement' : 'langElement', onClick: async () => { await this.handleChange(); } }, h("a", { class: "language-link", "data-value": this.locale }, this.inLanguage))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-language-item li{cursor:pointer;padding:0 16px 12px 16px}div.dxp.dxp-language-item li a,div.dxp.dxp-language-item li span{padding:12px 0;display:inline-block;font-size:16px;letter-spacing:0}div.dxp.dxp-language-item li.active a,div.dxp.dxp-language-item li.active a:focus,div.dxp.dxp-language-item li.active span,div.dxp.dxp-language-item li:focus a,div.dxp.dxp-language-item li:focus a:focus,div.dxp.dxp-language-item li:focus span,div.dxp.dxp-language-item li:hover a,div.dxp.dxp-language-item li:hover a:focus,div.dxp.dxp-language-item li:hover span{padding-bottom:8px;text-decoration:none}"; }
};

export { LanguageItem as dxp_language_item };
