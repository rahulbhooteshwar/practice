import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-page-header */
export declare class PageHeader {
    /** base component - common functionality */
    base: BaseComponent;
    /** page-header element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** check if app menu is visible (in mobile) */
    isAppMenuVisible: boolean;
    /** check if app menu item is active */
    isMenuItemActive: number;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** More action button list */
    appMenuItemsList: any[];
    /** More actions items slot */
    hasActionItems: boolean;
    /** App menu available or not */
    hasAppMenu: boolean;
    /** Search box slot */
    hasSearchBox: boolean;
    /** Page title */
    pageTitle: string;
    /** Link click event. Emitted when link is clicked */
    appMenuItemClick: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component is loaded */
    componentDidLoad(): void;
    /** for accessibility implementation */
    handleKeyUp(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /**
     * Activate Link based on the URL
     */
    activateLink(clickedLink?: HTMLAnchorElement): false | any[];
    /** show active app menu item in button */
    selectedLink(e: any): void;
    /** App menu visible in mobile or not */
    showResponsiveAppMenu(): void;
    /** Render the page-header */
    render(): any;
}
