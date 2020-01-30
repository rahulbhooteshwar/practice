import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const ACCORDION_ITEM = 'dxp-accordion-item';
const ACCORDION_LABEL_CLASS = '.acc-label';
/** dxp-site-list */
export class DxpSiteList {
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'SiteList', messages);
        if (this.endPointUrl) {
            try {
                const response = await dxp.api(this.endPointUrl);
                this.regions = response.regions;
            }
            catch (err) {
                dxp.log.error(this.element.tagName, 'componentWillLoad()', `fetch failed for`, err);
            }
        }
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        const regionList = this.element.querySelectorAll(ACCORDION_ITEM).length ?
            this.element.querySelectorAll(ACCORDION_ITEM)
            :
                this.element.querySelectorAll(ACCORDION_ITEM);
        if (regionList.length) {
            const lastRegion = regionList[regionList.length - 1];
            const accLabel = lastRegion ? lastRegion.querySelector(ACCORDION_LABEL_CLASS) : lastRegion.querySelector(ACCORDION_LABEL_CLASS);
            if (accLabel) {
                accLabel.classList.add('acc-bottom');
            }
            // get locale value from the url, required for performing expand appropriate region block
            const locale = dxp.util.getQueryParameterByKey('locale', window.location.href);
            for (const regionListMarkup of regionList) {
                if (this.regions) {
                    for (const regions of this.regions) {
                        this.setDescriptionText(regionListMarkup, regions, locale);
                    }
                }
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** set description text */
    setDescriptionText(regionListMarkup, regions, locale) {
        if (regionListMarkup.getAttribute('item-title') === regions.region) {
            const descriptionBlock = regionListMarkup.querySelector('.description');
            if (descriptionBlock) {
                descriptionBlock.innerHTML = regions.regionalDescription ?
                    regions.regionalDescription
                    :
                        dxp.i18n.t('SiteList:regionDescription', { regionalSiteLink: regions.defaultSiteLink, region: regions.region });
                const descriptionBlockregion = regionListMarkup.querySelector('.description a');
                descriptionBlockregion.setAttribute('aria-label', dxp.i18n.t('SiteList:defaultRegional', { region: regions.defaultSiteLink }));
            }
        }
        for (const countries of regions.countries) {
            for (const locales of countries.locales) {
                if (locales.locale === locale && regionListMarkup.getAttribute('item-title') === regions.region && regionListMarkup) {
                    regionListMarkup.querySelector(ACCORDION_LABEL_CLASS).click();
                }
            }
        }
    }
    /** Render the country-selector */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("h1", null, dxp.i18n.t('SiteList:title')),
            this.regions ? (this.regions.map((object) => {
                return (h("dxp-region", { name: object.region, "is-open": object.isOpen },
                    object.countries.map(country => {
                        return (h("dxp-country-item", { name: country.country, slot: "top" }, country.locales.map((locale) => {
                            return (h("dxp-in-language", { link: locale.link, name: locale.inLanguage }));
                        })));
                    }),
                    h("div", { class: "description", slot: "top" })));
            })) : (h("slot", null))));
    }
    static get is() { return "dxp-site-list"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-site-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-site-list.css"]
    }; }
    static get properties() { return {
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
                "text": "responsible to get data from the server"
            },
            "attribute": "end-point-url",
            "reflect": false
        },
        "regions": {
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
                "text": "region list"
            },
            "attribute": "regions",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
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
