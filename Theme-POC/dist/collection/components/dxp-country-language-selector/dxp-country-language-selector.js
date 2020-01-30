import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-country-language-selector */
export class CountryLanguageSelector {
    constructor() {
        /** selected country */
        this.selectedCountry = 'United States';
        /** selected Language */
        this.selectedLanguage = 'English';
        /** target url with local */
        this.targetUrlWithLocale = 'en-us';
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.countryLanguageData = typeof (this.countryLanguageData) === 'string' ? JSON.parse(this.countryLanguageData) : this.countryLanguageData;
        this.base = new BaseComponent(this, dxp);
        if (this.endPointUrl) {
            try {
                this.countryLanguageData = await dxp.api(this.endPointUrl);
            }
            catch (err) {
                dxp.log.error(this.element.tagName, 'componentWillLoad()', `fetch failed for ${this.endPointUrl}`, err);
            }
        }
    }
    /** lifecycle hook */
    componentDidLoad() {
        this.initializeCountryLanguageData();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** populate the value of href in <a> according to targetUrl */
    handleTarget(targetUrl) {
        { /* tslint:disable: ter-no-script-url */ }
        return targetUrl ? `${targetUrl}?locale=${this.targetUrlWithLocale}` : 'javascript:void(0)';
    }
    /** initialize component data */
    initializeCountryLanguageData() {
        if (this.countryLanguageData && this.countryLanguageData.regions) {
            this.countryLanguageData.regions.forEach((region) => {
                if (region && region.countries) {
                    /* tslint:disable-next-line */
                    region.countries.forEach((obj) => {
                        /* tslint:disable-next-line */
                        obj.locales.forEach((loc) => {
                            if (dxp.locale() === loc.locale) {
                                this.selectedCountry = obj.country;
                                this.selectedLanguage = loc.language;
                                this.targetUrlWithLocale = loc.locale;
                            }
                        });
                    });
                }
            });
        }
    }
    /** Updating first char in upper case and rest in lower case of a word */
    toTitlelCase(str) {
        return str.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }
    /** Render the country-language-selector */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-country-language-selector render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-country-language-selector.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("a", { href: this.targetUrl ? this.handleTarget(this.targetUrl) : '#', target: "_parent" },
                h("span", { class: "globe-wrapper lang-globe" }),
                h("span", { class: "country dxp-font-size-md" },
                    h("span", null,
                        this.toTitlelCase(this.selectedCountry),
                        " "),
                    h("span", { "aria-hidden": "true" }, " - "),
                    h("span", { class: "lang small" },
                        " ",
                        this.toTitlelCase(this.selectedLanguage))))));
    }
    static get is() { return "dxp-country-language-selector"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-country-language-selector.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-country-language-selector.css"]
    }; }
    static get properties() { return {
        "countryLanguageData": {
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
                "text": "contains country language response"
            },
            "attribute": "country-language-data",
            "reflect": false
        },
        "endPointUrl": {
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
                "text": "END POINT URL"
            },
            "attribute": "end-point-url",
            "reflect": false
        },
        "targetUrl": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "targetUrl"
            },
            "attribute": "target-url",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "selectedCountry": {},
        "selectedLanguage": {},
        "targetUrlWithLocale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
