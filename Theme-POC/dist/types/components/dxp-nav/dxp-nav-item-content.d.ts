import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-nav */
export declare class NavItemContent {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for nav menu items */
    navigationGroupContainer: HTMLElement;
    /** nav element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** description from API */
    description: string;
    /** description while authoring */
    descriptionText: string;
    /** link title properties */
    linkTitle: string;
    /** menu route link properties */
    menuRouteLink: string;
    /** navigation title properties */
    navigationTitle: string;
    /** prop to configure link target */
    openInNewTab: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the nav */
    render(): any;
}
