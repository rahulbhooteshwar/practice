import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-vcard */
export declare class Vcard {
    /** base component - common functionality */
    base: BaseComponent;
    /** vcard element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** To show more actions popup on More button click */
    showMoreOption: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** is this card favourite ? */
    additionalInfo: string;
    /** description of card */
    cardDescription: string;
    /** is this card favourite ? */
    cardFavorited: boolean;
    /** title of card */
    cardTitle: string;
    /** type of card */
    cardType: string;
    /** view of card */
    cardView: 'tile-view' | 'list-view';
    /** Card CTA Button link */
    ctaButtonLink: string;
    /** Card CTA Button text */
    ctaButtonText: string;
    /** Card CTA Button */
    enableCardButton: boolean;
    /** Favorite icon show/hide */
    enableCardFavIcon: boolean;
    /** Create More action button */
    enableMoreOptions: boolean;
    /** Status text enable/disable */
    enableStatusText: boolean;
    /** type of card icon */
    icon: string;
    /** type of card icon */
    iconSprite: 'icon-sprite' | 'icons-sprite';
    /** More action button list */
    moreOptionList: any[];
    /** border color of an element */
    ribbonColor: string;
    /** CTA vcard click event. Emitted when Vcard is clicked */
    cardClick: EventEmitter;
    /** CTA header right icon click event. Emitted when CTA fav icon is clicked */
    favoriteClick: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loaded */
    componentDidLoad(): void;
    /** actions to be performed after component updated */
    componentDidUpdate(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Favorite/Unfavorite Item */
    favoriteCard(event: any): Promise<void>;
    /** Hide More Options Container on button click */
    hideMoreOptions(): Promise<void>;
    /** Open More Options Container */
    showMoreOptions(): Promise<void>;
    /** This method will apply card color */
    applyCardColor(): void;
    /** Handler for v-card click. Emits click event */
    onClickVCardHandler(event: any): void;
    /** render card button */
    renderCardButton(): any;
    /** render fav icon */
    renderFavIcon(): any;
    /** render more options  */
    renderMoreOptions(): any;
    /** render the vcard */
    render(): any;
}
