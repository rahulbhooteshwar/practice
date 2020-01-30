import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-site-list */
export declare class DxpSiteList {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for menu items */
    countryContainer: HTMLElement;
    /** site-list element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** responsible to get data from the server */
    endPointUrl: string;
    /** region list */
    regions: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** set description text */
    setDescriptionText(regionListMarkup: any, regions: any, locale: any): void;
    /** Render the country-selector */
    render(): any;
}
