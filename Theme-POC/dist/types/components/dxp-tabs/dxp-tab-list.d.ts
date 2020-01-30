import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-tab-item */
export declare class TabList {
    /** base component - common functionality */
    base: BaseComponent;
    /** tabs element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** currently focused tab control element */
    focusedControl: HTMLElement;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** tab item status */
    active: boolean;
    /** alt text for tab icon  */
    alt: string;
    /** animation status */
    animationStatus: string;
    /** arrowOrientation */
    arrowOrientation: string;
    /** tab item contents */
    content: string;
    /** Enable adaptive or fixed width designs */
    fixedWidth: boolean;
    /** Enable icon only labels on mobile devices */
    iconOnlySm: boolean;
    /** Enable icon only labels on mobile devices */
    iconSm: boolean;
    /** Nested tab elements */
    nestedTabs: HTMLElement[];
    /** image url for tab icon  */
    tabIconSrc: string;
    /** tab item title */
    tabTitle: string;
    /** vertical align */
    verticalAlign: boolean;
    /** emit activate tab content event */
    activateTabs: EventEmitter;
    /** emit focus tab content event */
    focusTabs: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** activate default tab if not provided */
    activateTab(_e: any): void;
    /** onFocusElement for tabs */
    onFocusElement(_e: any): void;
    /** Render the tabs */
    render(): any;
}
