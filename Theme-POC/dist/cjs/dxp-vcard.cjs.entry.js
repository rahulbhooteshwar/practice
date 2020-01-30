'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        favorited: 'Favorited. Click to unfavorite this item',
        unfavorited: 'Unfavorited. Click to favorite this item',
        showMoreOptions: 'Show more options',
        hideMoreOptions: 'Hide more options',
        openInNewTab: 'in New Tab'
    },
    'en-US': {
        favorited: 'Favorited. Click to unfavorite this item',
        unfavorited: 'Unfavorited. Click to favorite this item',
        showMoreOptions: 'Show more options',
        hideMoreOptions: 'Hide more options',
        openInNewTab: 'in New Tab'
    },
    'es': {
        favorited: 'Haga clic para desfavorecer este artículo',
        unfavorited: 'haga clic para favoritos este artículo',
        showMoreOptions: 'Mostrar más opciones',
        hideMoreOptions: 'Ocultar más opciones',
        openInNewTab: 'en Nueva pestaña'
    },
    'es-ES': {
        favorited: 'Haga clic para desfavorecer este artículo',
        unfavorited: 'haga clic para favoritos este artículo',
        showMoreOptions: 'Mostrar más opciones',
        hideMoreOptions: 'Ocultar más opciones',
        openInNewTab: 'en Nueva pestaña'
    }
};

const Vcard = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** type of card icon */
        this.iconSprite = 'icons-sprite';
        /** More action button list */
        this.moreOptionList = [];
        this.cardClick = core.createEvent(this, "cardClick", 7);
        this.favoriteClick = core.createEvent(this, "favoriteClick", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        this.base.i18Init(core.dxp, 'Vcard', messages);
    }
    /** actions to be performed after component loaded */
    componentDidLoad() {
        this.applyCardColor();
    }
    /** actions to be performed after component updated */
    componentDidUpdate() {
        this.applyCardColor();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Favorite/Unfavorite Item */
    async favoriteCard(event) {
        this.cardFavorited = !this.cardFavorited;
        this.favoriteClick.emit(event);
    }
    /** Hide More Options Container on button click */
    async hideMoreOptions() {
        this.showMoreOption = false;
    }
    /** Open More Options Container */
    async showMoreOptions() {
        this.showMoreOption = true;
    }
    /** This method will apply card color */
    applyCardColor() {
        const shadowRoot = this.element ? this.element : this.element;
        if (this.ribbonColor) {
            const cardRibbonColor = shadowRoot.querySelector(`.card-ribbon-color`);
            cardRibbonColor.style.backgroundColor = this.ribbonColor;
            const icon = shadowRoot.querySelector('.icon-circle');
            if (icon) {
                icon.style.backgroundColor = this.ribbonColor;
            }
        }
    }
    /** Handler for v-card click. Emits click event */
    onClickVCardHandler(event) {
        this.cardClick.emit(event);
    }
    /** render card button */
    renderCardButton() {
        return (core.h("div", { class: "cta-wrapper", onClick: event => { event.stopPropagation(); } }, core.h("dxp-cta", { type: "link", "button-size": "md", "link-type": "dxp-cta-link", text: this.ctaButtonText, href: this.ctaButtonLink, "aria-label": this.ctaButtonText, disabled: !this.enableStatusText, "open-in-new-tab": "false" })));
    }
    /** render fav icon */
    renderFavIcon() {
        return (core.h("button", { class: `btn-icon btn-favorite ${this.cardFavorited ? 'card-favorited' : ''}`, onClick: async (event) => {
                event.stopPropagation();
                await this.favoriteCard(event);
            }, "aria-label": `${this.cardFavorited ? core.dxp.i18n.t('Vcard:favorited') : core.dxp.i18n.t('Vcard:unfavorited')}`, title: `${this.cardFavorited ? core.dxp.i18n.t('Vcard:favorited') : core.dxp.i18n.t('Vcard:unfavorited')}`, role: "button" }, core.h("i", { class: `${this.iconSprite} ${this.cardFavorited ? 'favorite-o' : 'unfavorite-o'}` })));
    }
    /** render more options  */
    renderMoreOptions() {
        return (core.h("div", { class: `more-options-container ${this.showMoreOption ? 'dxp-block' : ''}` }, core.h("div", { class: "list-wrapper", "aria-modal": "true", onClick: event => { event.stopPropagation(); } }, this.moreOptionList.length ? (core.h("ul", null, this.moreOptionList &&
            this.moreOptionList.map((action) => core.h("li", null, action.type === 'link' ?
                core.h("dxp-cta", { type: action.type, "button-size": "md", "link-type": action.linkType, text: action.text, disabled: action.disabled, href: action.href, "aria-label": action.openInNewTab ? `${action.ariaLabel} ${core.dxp.i18n.t('Vcard:openInNewTab')}` : action.ariaLabel, "open-in-new-tab": action.openInNewTab })
                : '')))) : (core.h("slot", { name: "more-options" }))), core.h("button", { role: "button", class: "btn-icon btn-link close-more-options", onClick: async (event) => {
                event.stopPropagation();
                await this.hideMoreOptions();
            }, "aria-label": core.dxp.i18n.t('Vcard:hideMoreOptions'), title: core.dxp.i18n.t('Vcard:hideMoreOptions') }, core.h("i", { class: `${this.iconSprite} cross-sm-o` }))));
    }
    /** render the vcard */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-vcard render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-vcard.min.css` })]
        ];
        return (core.h("div", { onClick: event => { this.onClickVCardHandler(event); }, class: `${this.base.componentClass()} ${this.cardView} ${this.cardType} ${(this.cardView === 'list-view' && this.showMoreOption) ? 'more-option-visible' : ''}
        ${this.additionalInfo ? 'has-additional-info' : ''} ${this.enableCardFavIcon ? 'has-favorite-btn' : ''}`, dir: this.dir, "data-theme": this.theme }, styles, core.h("div", { class: "card-ribbon-color" }), this.cardType ?
            core.h("p", { class: "card-type" }, core.h("span", { class: `icon-circle ${this.cardType}` }, core.h("i", { class: `${this.iconSprite} ${this.icon}` })), core.h("span", { tabindex: "0", class: "type", innerHTML: this.cardType }))
            : '', core.h("h2", { tabindex: "0", title: this.cardTitle, innerHTML: this.cardTitle }), this.cardDescription ?
            core.h("p", { title: this.cardDescription, class: "card-description" }, this.cardDescription)
            : '', this.enableCardButton ?
            this.renderCardButton()
            : core.h("slot", { name: "card-button" }), this.enableCardFavIcon ?
            this.renderFavIcon()
            : '', this.enableMoreOptions ?
            core.h("button", { class: "btn-icon btn-more-options", onClick: async (event) => {
                    event.stopPropagation();
                    await this.showMoreOptions();
                }, "aria-label": core.dxp.i18n.t('Vcard:showMoreOptions'), title: core.dxp.i18n.t('Vcard:showMoreOptions'), role: "button" }, core.h("i", { class: `${this.iconSprite} more-actions-md-o` }))
            : '', this.additionalInfo ?
            core.h("p", { class: "additional-info" }, this.additionalInfo)
            : '', this.enableMoreOptions ?
            this.renderMoreOptions()
            : ''));
    }
    get element() { return core.getElement(this); }
    static get style() { return "div.dxp.dxp-vcard{border:.0625rem solid transparent;border-radius:.25rem .25rem .375rem .375rem;position:relative;padding:1.1875rem 1rem 1rem;min-height:12.75rem}div.dxp.dxp-vcard .card-ribbon-color{height:.25rem;position:absolute;top:-1px;left:-1px;right:-1px;border-radius:.375rem .375rem 0 0;z-index:9}div.dxp.dxp-vcard .card-type{margin:0 0 1rem 0;letter-spacing:.113rem;text-transform:uppercase}div.dxp.dxp-vcard .card-type span{vertical-align:middle}div.dxp.dxp-vcard .card-type span.icon-circle{width:1.5rem;height:1.5rem;border-radius:50%;display:inline-block;margin-right:.5rem;padding:.1875rem}div.dxp.dxp-vcard .card-type span.type{margin-top:.0625rem;display:inline-block}div.dxp.dxp-vcard h2{margin:0;line-height:1.5rem;-webkit-line-clamp:3;height:4.5rem}div.dxp.dxp-vcard .card-description,div.dxp.dxp-vcard h2{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}div.dxp.dxp-vcard .card-description{margin-top:.9375rem;margin-bottom:4rem;-webkit-line-clamp:2;height:2.25rem}div.dxp.dxp-vcard .cta-wrapper{border:none;position:absolute;left:1rem;bottom:2.75rem}div.dxp.dxp-vcard .more-options-container{position:absolute;z-index:9;display:none;top:.5rem;left:.5rem;right:.5rem;bottom:.375rem}div.dxp.dxp-vcard .more-options-container .close-more-options{position:absolute;right:.5625rem;bottom:.625rem;cursor:pointer;border:none}div.dxp.dxp-vcard .more-options-container .list-wrapper{position:absolute;top:0;left:0;right:0;bottom:2.25rem;padding:.3125rem;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:end;align-items:flex-end;overflow-y:auto}div.dxp.dxp-vcard .more-options-container ul{margin:0;list-style:none;padding:0 .5rem;text-align:right;max-height:100%}div.dxp.dxp-vcard .more-options-container ul li{display:block;padding:.1875rem 0}div.dxp.dxp-vcard .more-options-container ul li:last-child{padding-bottom:0}div.dxp.dxp-vcard .btn-favorite,div.dxp.dxp-vcard .btn-more-options{border:none;position:absolute}div.dxp.dxp-vcard .btn-more-options{width:1.5rem;height:1.5rem;right:.875rem;bottom:.625rem}div.dxp.dxp-vcard .btn-favorite{width:1.25rem;height:1.25rem;right:.875rem;top:1rem}div.dxp.dxp-vcard .btn-icon{padding:0;min-width:1rem;min-height:1rem;cursor:pointer;background:transparent}div.dxp.dxp-vcard .additional-info{position:absolute;margin:0;bottom:.8125rem;left:1rem;max-width:6.25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\@media (min-width:993px){div.dxp.dxp-vcard.list-view{position:relative;border:none;border-bottom:.0625rem solid transparent;padding:.625rem .5rem .75rem;min-height:auto;-webkit-box-shadow:none;box-shadow:none;border-radius:0}div.dxp.dxp-vcard.list-view .card-ribbon-color{display:none}div.dxp.dxp-vcard.list-view .card-type{margin:0;display:inline-block;width:9.75rem;vertical-align:middle}div.dxp.dxp-vcard.list-view h2{display:inline-block;max-width:36%;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;height:auto}div.dxp.dxp-vcard.list-view .card-description{display:none;height:auto}div.dxp.dxp-vcard.list-view .cta-wrapper{top:.75rem;right:8.75rem;left:auto}div.dxp.dxp-vcard.list-view .btn-favorite{top:.938rem;right:4.1875rem}div.dxp.dxp-vcard.list-view .btn-more-options{right:.75rem;top:.813rem}div.dxp.dxp-vcard.list-view .more-options-container{width:50%;right:0;top:0;bottom:0;left:auto}div.dxp.dxp-vcard.list-view .more-options-container .close-more-options{width:1.25rem;height:1.25rem;position:absolute;right:.75rem;top:1rem;bottom:auto}div.dxp.dxp-vcard.list-view .more-options-container .list-wrapper{top:.75rem;left:0;bottom:auto;right:3.4375rem;border:0;padding:0}div.dxp.dxp-vcard.list-view .more-options-container ul{padding:0;text-align:right}div.dxp.dxp-vcard.list-view .more-options-container ul li{padding:0 .9375rem;display:inline-block;position:relative}div.dxp.dxp-vcard.list-view .more-options-container ul li:after{content:\"\";position:absolute;right:0;top:.25rem;bottom:.125rem;width:.0625rem}div.dxp.dxp-vcard.list-view .more-options-container ul li:first-child{padding-left:0}div.dxp.dxp-vcard.list-view .more-options-container ul li:last-child{padding-right:0}div.dxp.dxp-vcard.list-view .more-options-container ul li:last-child:after{display:none}div.dxp.dxp-vcard.list-view .additional-info{left:auto;right:4.75rem;bottom:.9375rem}div.dxp.dxp-vcard.list-view.has-favorite-btn .additional-info{right:6rem}div.dxp.dxp-vcard.list-view.has-additional-info .cta-wrapper{right:14.125rem;left:auto}}\@media (max-width:1200px){div.dxp.dxp-vcard.list-view .more-options-container{width:auto;left:0}}\@media (max-width:992px){div.dxp.dxp-vcard.list-view .more-options-container{width:auto;top:.5rem;left:.5rem;right:.5rem;bottom:.5rem}div.dxp.dxp-vcard.list-view .more-options-container .close-more-options{position:absolute;right:.5625rem;bottom:.5625rem}div.dxp.dxp-vcard.list-view .more-options-container .list-wrapper{position:absolute;top:0;left:0;right:0;bottom:2.25rem;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:end;align-items:flex-end;overflow-y:auto}div.dxp.dxp-vcard.list-view .more-options-container ul{padding:0 .5rem;list-style:none;text-align:right;max-height:100%}div.dxp.dxp-vcard.list-view .more-options-container ul li:last-child{padding-bottom:0}}div.dxp.dxp-vcard[dir=rtl] .card-type span.icon-circle{margin-left:.5rem;margin-right:0;padding-left:0;padding-right:.29rem}div.dxp.dxp-vcard[dir=rtl] .cta-wrapper{right:1rem;left:auto}div.dxp.dxp-vcard[dir=rtl] .more-options-container .close-more-options{left:.375rem;right:auto}div.dxp.dxp-vcard[dir=rtl] .more-options-container ul{text-align:left}div.dxp.dxp-vcard[dir=rtl] .btn-favorite,div.dxp.dxp-vcard[dir=rtl] .btn-more-options{left:.875rem;right:auto}div.dxp.dxp-vcard[dir=rtl] .additional-info{left:auto;right:.875rem}\@media (min-width:993px){div.dxp.dxp-vcard[dir=rtl].list-view .cta-wrapper{left:8.75rem;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .btn-favorite{left:3.625rem}div.dxp.dxp-vcard[dir=rtl].list-view .btn-more-options{left:.75rem}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container{left:0;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container .close-more-options{left:.75rem;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container .list-wrapper{right:0;left:3.4375rem}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container ul li:after{left:0;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container ul li:first-child{padding-right:0;padding-left:.9375rem}div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container ul li:last-child{padding-left:0;padding-right:.9375rem}div.dxp.dxp-vcard[dir=rtl].list-view .additional-info{right:auto;left:4.75rem}div.dxp.dxp-vcard[dir=rtl].list-view.has-favorite-btn .additional-info{left:6rem;right:auto}div.dxp.dxp-vcard[dir=rtl].list-view.has-additional-info .cta-wrapper{left:14.125rem;right:auto}}\@media (max-width:1200px){div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container{right:0}}\@media (max-width:992px){div.dxp.dxp-vcard[dir=rtl].list-view .more-options-container .close-more-options{left:.375rem;right:auto}}"; }
};

exports.dxp_vcard = Vcard;
