import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const messages = {
    'en': {
        close: 'Click to close region selector',
        countryLanguagePageText: 'Other Country or Region'
    },
    'en-US': {
        close: 'Click to close region selector',
        countryLanguagePageText: 'Other Country or Region'
    },
    'es': {
        close: 'Haga clic para cerrar el selector de región',
        countryLanguagePageText: 'Otro país o región'
    },
    'es-ES': {
        close: 'Haga clic para cerrar el selector de región',
        countryLanguagePageText: 'Otro país o región'
    }
};

const RegionSelector = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.buttonClick = createEvent(this, "buttonClick", 7);
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'RegionSelector', messages);
        if (document.querySelector('meta[name="country_code"]')) {
            this.originCountry = document.querySelector('meta[name="country_code"]').getAttribute('content').toLowerCase().trim();
        }
        this.siteList = !this.compareLocales() && !this.siteList ? await this.getSiteList() : this.parseSiteList(JSON.parse(this.siteList));
        if (this.countryLanguagePageLink) {
            this.siteList.push({ text: this.countryLanguagePageText || dxp.i18n.t('RegionSelector:countryLanguagePageText'), link: this.countryLanguagePageLink });
        }
    }
    /** function to handle the button click */
    onClick() {
        const select = this.element ? this.element.querySelector('select') : this.element.querySelector('select');
        this.setCookie(this.siteList[select.selectedIndex].locale);
        window.location.href = this.siteList[select.selectedIndex].link;
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** function to read and compare locales of a page and request origin  */
    compareLocales() {
        // Origin Country: we'll get this from the meta tag of the page
        // this.locale: this is detected automatically by dxp-ui-core and here we are assuming it to be in a format like "en-us"
        return this.originCountry.toLowerCase().trim() === this.locale.toLowerCase().split('-')[1];
    }
    /** function to dismiss region selector */
    dismissRegionSelector() {
        this.element ?
            this.element.querySelector('.dxp-region-selector').classList.add('dxp-none')
            :
                this.element.querySelector('.dxp-region-selector').classList.add('dxp-none');
    }
    /** function to fetch the list of locale-wise sites */
    async getSiteList() {
        if (this.apiUrl) {
            try {
                return this.parseSiteList(await dxp.api(this.apiUrl));
            }
            catch (err) {
                dxp.log.error(this.element.tagName, 'getSiteList()', `fetch failed for ${this.apiUrl}`, err);
            }
        }
    }
    /** function to parse the site list coming from either JSON or API */
    parseSiteList(siteList) {
        const list = [];
        for (const region of siteList['regions']) {
            region['countries'].forEach(country => {
                if (country['countryCode'].toLowerCase() === this.originCountry.toLowerCase()) {
                    country['locales'].forEach(locale => {
                        locale['country'] = country['country'];
                        locale['countryCode'] = country['countryCode'];
                        list.push(locale);
                    });
                }
            });
        }
        return list;
    }
    /** function to set cookie containing the selected locale */
    setCookie(value) {
        const days = this.cookieExpiryTime ? this.cookieExpiryTime : 7;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `locale=${value};${expires};path=/`;
    }
    /** Render the region-selector */
    render() {
        if (!this.compareLocales() && this.siteList) {
            const styles = [
                h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.css` }),
                [this.theme && h("link", { rel: "stylesheet", href: `` })],
                [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-region-selector.min.css` })]
            ];
            return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "padding" }, h("div", { class: "dxp-row" }, h("div", { class: "dxp-col-12" }, h("div", { class: "region-selector-wrapper" }, h("div", { class: "dxp-col-sm-12 dxp-col-md-12 dxp-col-lg-6" }, this.eyebrowText && h("p", { class: "eyebrow-text", innerHTML: this.eyebrowText }), this.titleText && h("p", { class: "title-text", innerHTML: this.titleText })), h("div", { class: "dxp-col-sm-12 dxp-col-md-12 dxp-col-lg-6" }, h("div", { class: "close-icon", onClick: () => this.dismissRegionSelector(), onKeyUp: e => e.keyCode === 13 && this.dismissRegionSelector() }, h("span", { class: `dxp-icon dxp-icon-close`, "aria-label": dxp.i18n.t('RegionSelector:close'), tabIndex: 3 })), h("div", { class: "row-reverse dxp-col-sm-12" }, this.buttonText && h("div", { class: "cta-button", tabIndex: -1 }, h("dxp-cta", { type: "button", "button-type": "secondary", text: this.buttonText, tabIndex: 2 })), h("div", { class: "select-button" }, h("select", { tabIndex: 1 }, this.siteList.map(site => {
                if (site.hasOwnProperty('country')) {
                    return h("option", null, `${site['country']} - ${site['language']}`);
                }
                return h("option", null, site['text']);
            })))))))))));
        }
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-region-selector{z-index:999;position:fixed;top:0;width:100%}div.dxp.dxp-region-selector .padding{padding-top:2rem;padding-bottom:1.625rem}div.dxp.dxp-region-selector .region-selector-wrapper{width:100%}div.dxp.dxp-region-selector .region-selector-wrapper p{margin:0;padding:0}div.dxp.dxp-region-selector .region-selector-wrapper .eyebrow-text{font-size:.75rem;line-height:1rem;text-transform:uppercase;letter-spacing:.1125rem;text-align:left;margin-bottom:.275rem}div.dxp.dxp-region-selector .region-selector-wrapper .eyebrow-text:only-child{margin-top:1rem}div.dxp.dxp-region-selector .region-selector-wrapper .title-text{font-size:1rem;line-height:1.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .title-text:only-child{margin-top:.75rem}div.dxp.dxp-region-selector .region-selector-wrapper .row-reverse{width:auto;float:right}div.dxp.dxp-region-selector .region-selector-wrapper .select-button{float:right}div.dxp.dxp-region-selector .region-selector-wrapper .select-button select{width:18rem;height:2.5rem;border-radius:.25rem;padding-right:2.4rem}div.dxp.dxp-region-selector .region-selector-wrapper .select-button select:focus{outline:none}div.dxp.dxp-region-selector .region-selector-wrapper .cta-button{float:right;margin-left:1rem}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon{float:right}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon .cta-with-icon{margin-left:.375rem}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon .dxp-icon-close{font-size:1.1275rem;margin-top:.75rem;margin-left:1.7175rem;display:block}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon .dxp-icon-close:focus{outline:1px solid}div.dxp.dxp-region-selector .region-selector-wrapper .dxp-btn-secondary:focus:before{border:0}\@media (max-width:992px){div.dxp.dxp-region-selector .region-selector-wrapper .row-reverse{margin-top:1.25rem;width:auto;padding-left:0;display:-webkit-flex;-webkit-flex-direction:row-reverse;display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse;float:left}div.dxp.dxp-region-selector .region-selector-wrapper .select-button{float:left;margin-bottom:.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .cta-button{float:left}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon{float:right;margin-top:-3.1875rem}}\@media (max-width:767px){div.dxp.dxp-region-selector .region-selector-wrapper .padding{padding-top:1.375rem;padding-bottom:1.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .row-reverse{-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}div.dxp.dxp-region-selector .region-selector-wrapper .cta-button{margin-left:0;margin-top:1rem}div.dxp.dxp-region-selector .region-selector-wrapper .eyebrow-text,div.dxp.dxp-region-selector .region-selector-wrapper .title-text{margin-right:3.5rem}div.dxp.dxp-region-selector .region-selector-wrapper .close-icon{margin-top:-4.85rem}}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper p:first-child{text-align:right}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .row-reverse{display:-webkit-flex;-webkit-flex-direction:row-reverse;display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .cta-button{margin-left:auto;margin-right:1rem}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .close-icon{float:left}\@media (max-width:992px){div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .row-reverse{float:right;padding-right:0}}\@media (max-width:767px){div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .row-reverse{-webkit-flex-direction:column-reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .dxp-icon-close{margin-left:0}div.dxp.dxp-region-selector[dir=rtl] .region-selector-wrapper .cta-button{margin-right:0}}\@media (max-width:767px){div.dxp.dxp-region-selector .padding{padding-top:1.375rem;padding-bottom:1.5rem}}"; }
};

export { RegionSelector as dxp_region_selector };
