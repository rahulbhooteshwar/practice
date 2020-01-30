import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-tab-item */
export declare class TabItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** tabs element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** is orientation vertical */
    orientationVertical: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** tab item status */
    active: boolean;
    /** alt text for tab icon  */
    alt: string;
    /** animation status */
    animationStatus: string;
    /** arrow orientation */
    arrowOrientation: string;
    /** tab item contents */
    content: string;
    /** enable animation */
    enableAnimation: boolean;
    /** enable close */
    enableClose: boolean;
    /** Enable adaptive or fixed width designs */
    fixedWidth: boolean;
    /** Enable icon only labels on mobile devices */
    iconOnlySm: boolean;
    /** tab item is isDefault */
    isDefault: boolean;
    /** tab item is default view */
    isDefaultView: boolean;
    /** is default view on */
    isDefaultViewOn: boolean;
    /** image url for tab icon  */
    tabIconSrc: string;
    /** tab item title */
    tabTitle: string;
    /** vertical align */
    verticalAlign: boolean;
    /** vertical content position */
    verticalContentPosition: any;
    /** emit close tab content event */
    closeTabContent: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** window resize event */
    windowResize(): void;
    /** close tab content */
    closeTabContentHandler(_e: any): void;
    /** set orientation */
    setOrientation(): void;
    /** Render the tabs */
    render(): any;
}
