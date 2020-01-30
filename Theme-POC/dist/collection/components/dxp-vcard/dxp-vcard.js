import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-vcard */
export class Vcard {
    constructor() {
        /** type of card icon */
        this.iconSprite = 'icons-sprite';
        /** More action button list */
        this.moreOptionList = [];
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Vcard', messages);
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
        return (h("div", { class: "cta-wrapper", onClick: event => { event.stopPropagation(); } },
            h("dxp-cta", { type: "link", "button-size": "md", "link-type": "dxp-cta-link", text: this.ctaButtonText, href: this.ctaButtonLink, "aria-label": this.ctaButtonText, disabled: !this.enableStatusText, "open-in-new-tab": "false" })));
    }
    /** render fav icon */
    renderFavIcon() {
        return (h("button", { class: `btn-icon btn-favorite ${this.cardFavorited ? 'card-favorited' : ''}`, onClick: async (event) => {
                event.stopPropagation();
                await this.favoriteCard(event);
            }, "aria-label": `${this.cardFavorited ? dxp.i18n.t('Vcard:favorited') : dxp.i18n.t('Vcard:unfavorited')}`, title: `${this.cardFavorited ? dxp.i18n.t('Vcard:favorited') : dxp.i18n.t('Vcard:unfavorited')}`, role: "button" },
            h("i", { class: `${this.iconSprite} ${this.cardFavorited ? 'favorite-o' : 'unfavorite-o'}` })));
    }
    /** render more options  */
    renderMoreOptions() {
        return (h("div", { class: `more-options-container ${this.showMoreOption ? 'dxp-block' : ''}` },
            h("div", { class: "list-wrapper", "aria-modal": "true", onClick: event => { event.stopPropagation(); } }, this.moreOptionList.length ? (h("ul", null, this.moreOptionList &&
                this.moreOptionList.map((action) => h("li", null, action.type === 'link' ?
                    h("dxp-cta", { type: action.type, "button-size": "md", "link-type": action.linkType, text: action.text, disabled: action.disabled, href: action.href, "aria-label": action.openInNewTab ? `${action.ariaLabel} ${dxp.i18n.t('Vcard:openInNewTab')}` : action.ariaLabel, "open-in-new-tab": action.openInNewTab })
                    : '')))) : (h("slot", { name: "more-options" }))),
            h("button", { role: "button", class: "btn-icon btn-link close-more-options", onClick: async (event) => {
                    event.stopPropagation();
                    await this.hideMoreOptions();
                }, "aria-label": dxp.i18n.t('Vcard:hideMoreOptions'), title: dxp.i18n.t('Vcard:hideMoreOptions') },
                h("i", { class: `${this.iconSprite} cross-sm-o` }))));
    }
    /** render the vcard */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-vcard render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-vcard.min.css` })]
        ];
        return (h("div", { onClick: event => { this.onClickVCardHandler(event); }, class: `${this.base.componentClass()} ${this.cardView} ${this.cardType} ${(this.cardView === 'list-view' && this.showMoreOption) ? 'more-option-visible' : ''}
        ${this.additionalInfo ? 'has-additional-info' : ''} ${this.enableCardFavIcon ? 'has-favorite-btn' : ''}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "card-ribbon-color" }),
            this.cardType ?
                h("p", { class: "card-type" },
                    h("span", { class: `icon-circle ${this.cardType}` },
                        h("i", { class: `${this.iconSprite} ${this.icon}` })),
                    h("span", { tabindex: "0", class: "type", innerHTML: this.cardType }))
                : '',
            h("h2", { tabindex: "0", title: this.cardTitle, innerHTML: this.cardTitle }),
            this.cardDescription ?
                h("p", { title: this.cardDescription, class: "card-description" }, this.cardDescription)
                : '',
            this.enableCardButton ?
                this.renderCardButton()
                : h("slot", { name: "card-button" }),
            this.enableCardFavIcon ?
                this.renderFavIcon()
                : '',
            this.enableMoreOptions ?
                h("button", { class: "btn-icon btn-more-options", onClick: async (event) => {
                        event.stopPropagation();
                        await this.showMoreOptions();
                    }, "aria-label": dxp.i18n.t('Vcard:showMoreOptions'), title: dxp.i18n.t('Vcard:showMoreOptions'), role: "button" },
                    h("i", { class: `${this.iconSprite} more-actions-md-o` }))
                : '',
            this.additionalInfo ?
                h("p", { class: "additional-info" }, this.additionalInfo)
                : '',
            this.enableMoreOptions ?
                this.renderMoreOptions()
                : ''));
    }
    static get is() { return "dxp-vcard"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-vcard.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-vcard.css"]
    }; }
    static get properties() { return {
        "additionalInfo": {
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
                "text": "is this card favourite ?"
            },
            "attribute": "additional-info",
            "reflect": false
        },
        "cardDescription": {
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
                "text": "description of card"
            },
            "attribute": "card-description",
            "reflect": false
        },
        "cardFavorited": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "is this card favourite ?"
            },
            "attribute": "card-favorited",
            "reflect": false
        },
        "cardTitle": {
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
                "text": "title of card"
            },
            "attribute": "card-title",
            "reflect": false
        },
        "cardType": {
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
                "text": "type of card"
            },
            "attribute": "card-type",
            "reflect": false
        },
        "cardView": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'tile-view' | 'list-view'",
                "resolved": "\"list-view\" | \"tile-view\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "view of card"
            },
            "attribute": "card-view",
            "reflect": false
        },
        "ctaButtonLink": {
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
                "text": "Card CTA Button link"
            },
            "attribute": "cta-button-link",
            "reflect": false
        },
        "ctaButtonText": {
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
                "text": "Card CTA Button text"
            },
            "attribute": "cta-button-text",
            "reflect": false
        },
        "enableCardButton": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Card CTA Button"
            },
            "attribute": "enable-card-button",
            "reflect": false
        },
        "enableCardFavIcon": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Favorite icon show/hide"
            },
            "attribute": "enable-card-fav-icon",
            "reflect": false
        },
        "enableMoreOptions": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Create More action button"
            },
            "attribute": "enable-more-options",
            "reflect": false
        },
        "enableStatusText": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Status text enable/disable"
            },
            "attribute": "enable-status-text",
            "reflect": false
        },
        "icon": {
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
                "text": "type of card icon"
            },
            "attribute": "icon",
            "reflect": false
        },
        "iconSprite": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'icon-sprite' | 'icons-sprite'",
                "resolved": "\"icon-sprite\" | \"icons-sprite\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of card icon"
            },
            "attribute": "icon-sprite",
            "reflect": false,
            "defaultValue": "'icons-sprite'"
        },
        "moreOptionList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "More action button list"
            },
            "defaultValue": "[]"
        },
        "ribbonColor": {
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
                "text": "border color of an element"
            },
            "attribute": "ribbon-color",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "showMoreOption": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "cardClick",
            "name": "cardClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA vcard click event. Emitted when Vcard is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "favoriteClick",
            "name": "favoriteClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA header right icon click event. Emitted when CTA fav icon is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "favoriteCard": {
            "complexType": {
                "signature": "(event: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Favorite/Unfavorite Item",
                "tags": []
            }
        },
        "hideMoreOptions": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Hide More Options Container on button click",
                "tags": []
            }
        },
        "showMoreOptions": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Open More Options Container",
                "tags": []
            }
        }
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
