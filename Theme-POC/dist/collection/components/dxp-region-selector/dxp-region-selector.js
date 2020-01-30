import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-region-selector */
export class RegionSelector {
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
            return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
                styles,
                h("div", { class: "padding" },
                    h("div", { class: "dxp-row" },
                        h("div", { class: "dxp-col-12" },
                            h("div", { class: "region-selector-wrapper" },
                                h("div", { class: "dxp-col-sm-12 dxp-col-md-12 dxp-col-lg-6" },
                                    this.eyebrowText && h("p", { class: "eyebrow-text", innerHTML: this.eyebrowText }),
                                    this.titleText && h("p", { class: "title-text", innerHTML: this.titleText })),
                                h("div", { class: "dxp-col-sm-12 dxp-col-md-12 dxp-col-lg-6" },
                                    h("div", { class: "close-icon", onClick: () => this.dismissRegionSelector(), onKeyUp: e => e.keyCode === 13 && this.dismissRegionSelector() },
                                        h("span", { class: `dxp-icon dxp-icon-close`, "aria-label": dxp.i18n.t('RegionSelector:close'), tabIndex: 3 })),
                                    h("div", { class: "row-reverse dxp-col-sm-12" },
                                        this.buttonText && h("div", { class: "cta-button", tabIndex: -1 },
                                            h("dxp-cta", { type: "button", "button-type": "secondary", text: this.buttonText, tabIndex: 2 })),
                                        h("div", { class: "select-button" },
                                            h("select", { tabIndex: 1 }, this.siteList.map(site => {
                                                if (site.hasOwnProperty('country')) {
                                                    return h("option", null, `${site['country']} - ${site['language']}`);
                                                }
                                                return h("option", null, site['text']);
                                            })))))))))));
        }
    }
    static get is() { return "dxp-region-selector"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-region-selector.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-region-selector.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "url of api that returns list of websites and locales"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "buttonText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "text be displayed on button"
            },
            "attribute": "button-text",
            "reflect": false
        },
        "cookieExpiryTime": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "cookie expiry time (in days)"
            },
            "attribute": "cookie-expiry-time",
            "reflect": false
        },
        "countryLanguagePageLink": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "country language page link"
            },
            "attribute": "country-language-page-link",
            "reflect": false
        },
        "countryLanguagePageText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "other country or region option text"
            },
            "attribute": "country-language-page-text",
            "reflect": false
        },
        "eyebrowText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "eyebrow text for region selector"
            },
            "attribute": "eyebrow-text",
            "reflect": false
        },
        "siteList": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "list of websites in the request origin locale"
            },
            "attribute": "site-list",
            "reflect": false
        },
        "titleText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title text for region selector"
            },
            "attribute": "title-text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "buttonClick",
            "name": "buttonClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event, that'll be emitted when user clicks on the button (continue)"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "ctaClickEvent",
            "method": "onClick",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
