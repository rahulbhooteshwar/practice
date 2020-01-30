import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-site-map */
export declare class SiteMap {
    /** base component - common functionality */
    base: BaseComponent;
    /** site-map element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** API URL */
    apiUrl: string;
    /** Eyebrow title */
    eyebrow: string;
    /** heading of site map */
    heading: string;
    /** hold multiple group items block that can be passed as json array */
    siteMapData: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to perform after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** get nested list item */
    getListItem(sublistItem: any, title: any): boolean | undefined;
    /** get site map groups */
    getSiteMapGroup(): any;
    /** get site map group Item */
    getSiteMapGroupItem(siteMapGroupItem: any): boolean | undefined;
    /** render the site-map */
    render(): any;
}
