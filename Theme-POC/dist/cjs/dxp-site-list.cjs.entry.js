'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-b7e92014.js');

const ACCORDION_ITEM = 'dxp-accordion-item';
const ACCORDION_LABEL_CLASS = '.acc-label';
const DxpSiteList = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'SiteList', messages.messages);
        if (this.endPointUrl) {
            try {
                const response = await core$1.dxp.api(this.endPointUrl);
                this.regions = response.regions;
            }
            catch (err) {
                core$1.dxp.log.error(this.element.tagName, 'componentWillLoad()', `fetch failed for`, err);
            }
        }
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
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
            const locale = core$1.dxp.util.getQueryParameterByKey('locale', window.location.href);
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
                        core$1.dxp.i18n.t('SiteList:regionDescription', { regionalSiteLink: regions.defaultSiteLink, region: regions.region });
                const descriptionBlockregion = regionListMarkup.querySelector('.description a');
                descriptionBlockregion.setAttribute('aria-label', core$1.dxp.i18n.t('SiteList:defaultRegional', { region: regions.defaultSiteLink }));
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-site render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("h1", null, core$1.dxp.i18n.t('SiteList:title')), this.regions ? (this.regions.map((object) => {
            return (core$1.h("dxp-region", { name: object.region, "is-open": object.isOpen }, object.countries.map(country => {
                return (core$1.h("dxp-country-item", { name: country.country, slot: "top" }, country.locales.map((locale) => {
                    return (core$1.h("dxp-in-language", { link: locale.link, name: locale.inLanguage }));
                })));
            }), core$1.h("div", { class: "description", slot: "top" })));
        })) : (core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return ""; }
};

exports.dxp_site_list = DxpSiteList;
