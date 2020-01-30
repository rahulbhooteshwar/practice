'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-b7e92014.js');

const DxpCountryItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'CountrySelector', messages.messages);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the country-selector */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-country render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("p", { tabindex: "0", class: "country-name dxp-font-size-lg dxp-bold", "aria-label": core$1.dxp.i18n.t('CountrySelector:accessibilitySelectedcountry', { selectedcountry: this.name }) }, this.name, " "), core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-country-item{width:100%}div.dxp.dxp-country-item:after{content:\"\";display:block;clear:both;width:100%}div.dxp.dxp-country-item .country-name{margin-bottom:0;border:1px solid transparent}div.dxp.dxp-country-item dxp-in-language{display:block;float:left}div.dxp.dxp-country-item dxp-in-language a{border:1px solid transparent}div.dxp.dxp-country-item dxp-in-language+dxp-in-language span{margin-left:1rem;padding-left:1rem;position:relative}div.dxp.dxp-country-item dxp-in-language+dxp-in-language span:after{content:\"\";display:block;position:absolute;left:0;top:.1875rem;width:.1rem;height:1.125rem}div.dxp.dxp-country-item[dir=rtl] dxp-language{float:right}div.dxp.dxp-country-item[dir=rtl] dxp-language+dxp-language span{margin-left:0;padding-left:0;margin-right:1.5rem;padding-right:1.5rem}div.dxp.dxp-country-item[dir=rtl] dxp-language+dxp-language span:after{left:auto;right:0}"; }
};

const DxpInLanguage = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'CountrySelector', messages.messages);
        this.countryName = this.element && this.element.parentElement ? this.element.parentElement.querySelector('.country-name').textContent : '';
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the country-selector */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-country render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css` })]
        ];
        return (core$1.h("span", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("a", { href: this.link, "aria-label": core$1.dxp.i18n.t('CountrySelector:accessibilitySelectedcountrylang', { selectedcountry: this.countryName, selectedlanguage: this.name }) }, this.name)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return ""; }
};

const ACCORDION_ITEM = 'dxp-accordion-item';
const DxpRegion = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** expand region item by default */
        this.isOpen = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'CountrySelector', messages.messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        if (this.isOpen) {
            const accItem = this.element.querySelector(ACCORDION_ITEM) ?
                this.element.querySelector(ACCORDION_ITEM).querySelector('.acc-item')
                :
                    this.element.querySelector(ACCORDION_ITEM).querySelector('.acc-item');
            if (accItem) {
                accItem.click();
            }
        }
        const dxpInLanguage = this.element.querySelectorAll('dxp-in-language');
        for (const i of Object.keys(dxpInLanguage)) {
            dxpInLanguage[i].classList.add('country-lang-selector');
        }
        const descriptionBlock = this.element.querySelector('.description');
        if (descriptionBlock) {
            descriptionBlock.innerHTML = this.description;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the region-selector */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-region render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("dxp-accordion-item", { "item-title": this.name }, core$1.h("slot", { name: "top" }), this.description && (core$1.h("div", { class: "description", slot: "top" })))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-region dxp-country-item{display:block;width:100%;margin-top:1.75rem}div.dxp.dxp-region dxp-country-item:first-child{margin-top:0}div.dxp.dxp-region dxp-country-item:last-of-type{margin-bottom:3.3125rem}div.dxp.dxp-region .description{padding:1.625rem 1.5rem 1.75rem;margin:0 0 .34rem;clear:both}div.dxp.dxp-region .description a{text-decoration:underline;border:1px solid transparent}\@media (min-width:768px){div.dxp.dxp-region dxp-country-item{width:50%;float:left;margin-top:0}div.dxp.dxp-region dxp-country-item:nth-of-type(2)~dxp-country-item{margin-top:1.375rem}div.dxp.dxp-region dxp-country-item:after{content:\"\";display:block;clear:both}}\@media (min-width:992px){div.dxp.dxp-region dxp-country-item{width:25%;margin-top:0}div.dxp.dxp-region dxp-country-item:nth-of-type(2)~dxp-country-item{margin-top:0}div.dxp.dxp-region dxp-country-item:nth-of-type(4)~dxp-country-item{margin-top:1.375rem}}\@media (min-width:768px){div.dxp.dxp-region[dir=rtl] dxp-country-item{float:right}}"; }
};

exports.dxp_country_item = DxpCountryItem;
exports.dxp_in_language = DxpInLanguage;
exports.dxp_region = DxpRegion;
