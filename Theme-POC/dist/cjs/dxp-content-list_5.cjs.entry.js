'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const CONTENT_LIST_ITEM = 'dxp-content-list-item';
const ContentList = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** list item alignment */
        this.orientation = 'vertical';
    }
    /** Listener that looks for content list items object to be assigned/changed externally */
    contentItemsChangeHandler() {
        if (this.contentListItems) {
            this.base.createNestedMarkup(this.linksContainer, CONTENT_LIST_ITEM, this.contentListItems);
        }
    }
    /** actions to perform prior to component load */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-content-list.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to perform after component load */
    componentDidLoad() {
        this.contentItemsChangeHandler();
        const dxpContentListItemsWithSlot = this.element.querySelectorAll(CONTENT_LIST_ITEM).length ?
            this.element.querySelectorAll(CONTENT_LIST_ITEM)
            :
                this.element.querySelectorAll(CONTENT_LIST_ITEM);
        const ele = dxpContentListItemsWithSlot.length - 1;
        if (dxpContentListItemsWithSlot.length !== 0) {
            dxpContentListItemsWithSlot[ele].classList.add('margin-bottom-0');
            dxpContentListItemsWithSlot[ele].componentOnReady().then(res => {
                res.querySelector('.dxp-content-list-item').classList.add('margin-bottom-0');
            });
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the content list */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-content-list render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("div", { class: "header-tag" }, this.titleText && (this.href ? core$1.h("h4", { class: this.headerSize }, core$1.h("a", { href: this.href }, this.titleText)) :
            core$1.h("h4", { class: this.headerSize }, this.titleText))), core$1.h("div", { class: `dxp-content-list-items sc-dxp-content-list ${this.orientation ? this.orientation : 'vertical'}`, ref: el => this.linksContainer = el }, core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "contentListItems": ["contentItemsChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-content-list .header-tag h4{margin-bottom:1.2rem}div.dxp.dxp-content-list .dxp-content-list-items.horizontal{display:-ms-flexbox;display:flex}div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item:not(:last-child) .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.horizontal ::slotted(dxp-content-list-item:not(:last-child)) .dxp-content-list-item.sc-dxp-content-list{margin-right:2rem}div.dxp.dxp-content-list .dxp-content-list-items.sc-dxp-content-list.vertical .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.sc-dxp-content-list.vertical ::slotted(dxp-content-list-item:not(:last-child)){margin-bottom:.625rem}div.dxp.dxp-content-list .dxp-content-list-items.sc-dxp-content-list.vertical .margin-bottom-0.sc-dxp-content-list{margin-bottom:0}\@media screen and (max-width:992px){div.dxp.dxp-content-list .dxp-content-list-items.horizontal{display:block}div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item{margin-right:0}div.dxp.dxp-content-list .dxp-content-list-items .dxp-content-list-item,div.dxp.dxp-content-list .dxp-content-list-items ::slotted(dxp-content-list-item:not(:last-child)){margin:0 0 .625rem 0;display:block}div.dxp.dxp-content-list .dxp-content-list-items .dxp-content-list-item.sc-dxp-content-list{margin-bottom:.625rem}div.dxp.dxp-content-list .dxp-content-list-items .margin-bottom-0.sc-dxp-content-list{margin-bottom:0}div.dxp.dxp-content-list .dxp-content-list-items{margin-right:0}div.dxp.dxp-content-list .dxp-content-list-items dxp-content-list-item:last-child .dxp-content-list-item{margin-bottom:0}}\@media screen and (min-width:993px){div.dxp.dxp-content-list .dxp-content-list-items.horizontal{display:-ms-flexbox;display:flex}div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.horizontal ::slotted(dxp-content-list-item:not(:last-child)){margin-right:2rem}div.dxp.dxp-content-list .dxp-content-list-items.vertical{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-content-list .dxp-content-list-items.vertical .dxp-content-list-item.sc-dxp-content-list:not(:last-child){margin-bottom:.75rem}}\@media (min-width:993px) and (max-width:1200px){div.dxp.dxp-content-list .dxp-content-list-items.horizontal .dxp-content-list-item.sc-dxp-content-list,div.dxp.dxp-content-list .dxp-content-list-items.horizontal ::slotted(dxp-content-list-item:not(:last-child)){margin-right:1rem}}\@media (min-width:993px) and (max-width:1200px){div.dxp.dxp-content-list[dir=rtl] .dxp-content-list-items.horizontal .dxp-content-list-item.sc-dxp-content-list:first-child{margin-right:0}}"; }
};

const ContentListItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to perform after component load */
    componentDidLoad() {
        // For supporting RTE, this code will work fine for the normal text too
        if (this.element) {
            this.element.querySelector('.sub-title').innerHTML = this.subTitle;
        }
        else {
            this.element.querySelector('.sub-title').innerHTML = this.subTitle;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the content list items */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-content-list-items render() : ${"DEVELOPMENT"}`);
        return ([
            core$1.h("div", { class: `${this.base.componentClass()} sc-dxp-content-list`, "data-theme": this.theme }, (this.href && this.href !== '') ?
                core$1.h("a", { class: "sub-title", href: this.href, "aria-label": this.ariaLabel, target: this.target ? '_blank' : '_self' }, this.subTitle)
                : core$1.h("span", { class: "sub-title" }, this.subTitle))
        ]);
    }
    get element() { return core$1.getElement(this); }
    static get style() { return ".dxp.dxp-content-list-item a,.dxp.dxp-content-list-item span.sub-title{display:inline-block}"; }
};

const Copyright = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
    /** Render the copyright */
    render() {
        /* istanbul ignore next */
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-copyright render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme &&
                    core$1.h("link", { rel: "stylesheet", href: `` })
            ],
            [this.theme &&
                    core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-copyright.min.css` })
            ]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.text && core$1.h("p", null, this.text), core$1.h("slot", null)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-copyright p{margin-bottom:0}"; }
};

const CountryLanguageSelector = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (this.endPointUrl) {
            try {
                this.countryLanguageData = await core$1.dxp.api(this.endPointUrl);
            }
            catch (err) {
                core$1.dxp.log.error(this.element.tagName, 'componentWillLoad()', `fetch failed for ${this.endPointUrl}`, err);
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
                            if (core$1.dxp.locale() === loc.locale) {
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-country-language-selector render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-country-language-selector.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("a", { href: this.targetUrl ? this.handleTarget(this.targetUrl) : '#', target: "_parent" }, core$1.h("span", { class: "globe-wrapper lang-globe" }), core$1.h("span", { class: "country dxp-font-size-md" }, core$1.h("span", null, this.toTitlelCase(this.selectedCountry), " "), core$1.h("span", { "aria-hidden": "true" }, " - "), core$1.h("span", { class: "lang small" }, " ", this.toTitlelCase(this.selectedLanguage))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-country-language-selector a>span{display:table-cell}div.dxp.dxp-country-language-selector a>span:last-child{padding-left:.532rem}div.dxp.dxp-country-language-selector a:focus{outline:1px solid}\@media (min-width:993px) and (max-width:1200px){div.dxp.dxp-country-language-selector .country{width:115px}}div.dxp.dxp-country-language-selector[dir=rtl] a>span:last-child{padding:0 .532rem 0 0}"; }
};

const SOCIAL_LINKS_ITEM_CLASS = '.dxp-social-links-item';
const SOCIAL_LINKS_ITEM = 'dxp-social-links-item';
const SocialLinks = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** orientation of icons list (horizontal/ vertical) */
        this.orientation = 'horizontal';
    }
    /** Listener that looks for links object to be assigned/changed externally */
    socialLinksChangeHandler() {
        if (this.selectedLinksItems) {
            const props = this.selectedLinksItems.map(it => (Object.assign(Object.assign({}, it), { socialType: this.socialType })));
            this.base.createNestedMarkup(this.linksContainer, SOCIAL_LINKS_ITEM_CLASS, props);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (this.socialLinksItems) {
            this.socialLinksItems = (typeof this.socialLinksItems === 'string') ? JSON.parse(this.socialLinksItems) : this.socialLinksItems;
        }
    }
    /** actions to be performed after component load */
    componentDidLoad() {
        const socialElements = this.element.querySelectorAll(SOCIAL_LINKS_ITEM);
        if (socialElements.length > 0) {
            for (const socialEle of socialElements) {
                socialEle.setAttribute('social-type', this.socialType);
            }
        }
        if (this.socialLinksItems && this.socialLinksItems.length > 0) {
            this.selectedLinksItems = [];
            this.socialLinksItems.forEach(socialLinksItem => {
                if (socialLinksItem['enable-sharing']) {
                    this.selectedLinksItems.push(socialLinksItem);
                }
            });
        }
        this.socialLinksChangeHandler();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** render social links */
    render() {
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-social-links.min.css` })]
        ];
        this.socialItems = this.socialType === 'follow' ? this.socialLinksItems : this.selectedLinksItems;
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-social-links render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), "data-theme": this.theme, dir: this.dir }, styles, this.socialLabel &&
            core$1.h("p", null, this.socialLabel), core$1.h("div", { class: this.orientation }, this.socialItems
            ? this.socialItems.map(item => core$1.h("dxp-social-links-item", { "social-type": this.socialType, type: item['type'], href: item['href'], "social-title": item['social-title'], "share-content": item['share-content'], alt: item['alt'], target: item['target'] }))
            : core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "selectedLinksItems": ["socialLinksChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-social-links .horizontal,div.dxp.dxp-social-links .vertical{display:-ms-inline-flexbox;display:inline-flex}div.dxp.dxp-social-links .vertical{-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-social-links p:first-child{margin-bottom:8px}"; }
};

exports.dxp_content_list = ContentList;
exports.dxp_content_list_item = ContentListItem;
exports.dxp_copyright = Copyright;
exports.dxp_country_language_selector = CountryLanguageSelector;
exports.dxp_social_links = SocialLinks;
