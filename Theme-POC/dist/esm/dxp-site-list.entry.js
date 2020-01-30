import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-78210655.js';

const ACCORDION_ITEM = 'dxp-accordion-item';
const ACCORDION_LABEL_CLASS = '.acc-label';
const DxpSiteList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-site render() : ${"DEVELOPMENT"}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("h1", null, dxp.i18n.t('SiteList:title')), this.regions ? (this.regions.map((object) => {
            return (h("dxp-region", { name: object.region, "is-open": object.isOpen }, object.countries.map(country => {
                return (h("dxp-country-item", { name: country.country, slot: "top" }, country.locales.map((locale) => {
                    return (h("dxp-in-language", { link: locale.link, name: locale.inLanguage }));
                })));
            }), h("div", { class: "description", slot: "top" })));
        })) : (h("slot", null))));
    }
    get element() { return getElement(this); }
    static get style() { return ""; }
};

export { DxpSiteList as dxp_site_list };
