import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
interface IBreadcrumb {
    /** link to the level of hierarchy */
    link: string;
    /** ID of the configured link */
    linkId: string;
    /** title of the added link */
    title: string;
    /** route path value */
    routePath: string;
    /** whether to show nav item or not */
    showNavItem: boolean;
}
/** dxp-breadcrumb */
export declare class Breadcrumb {
    /** base component - common functionality */
    base: BaseComponent;
    /** stores the length of breadcrumb items */
    childCount: any;
    /** Url of current route */
    currentRouteUrl: string;
    /** breadcrumb element - utilized by DXP framework */
    element: HTMLElement;
    /** breadcrumb-items to be display */
    breadcrumbItems: IBreadcrumb[];
    /** json response object from site map service */
    dataLookup: any;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** api url */
    apiUrl: string;
    /** define for which site/application sitemap is required */
    applicationName: string;
    /** hides the current item in breadcrumb */
    hideCurrentPage: boolean;
    /** define the navigation start level */
    navStartLevel: number;
    /** define the navigation root site path for sitemap service to fetch data */
    rootSitePath: string;
    /** show hidden navigation items which are marked as hidden */
    showHiddenNavItems: boolean;
    /** checkboxes items data */
    breadcrumbItemsData: any;
    /** watcher for breadcrumb items data */
    breadcrumbItemsChange(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad(): void;
    /** Listen for the window resize changes */
    handleResizeEvent(): void;
    /** Listen for the window url changes */
    onpopstate(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** refresh Breadcrumb Items */
    refreshBreadcrumbItems(): Promise<void>;
    /** private method to build breadcrumb items */
    buildBreadcrumbItems(): void;
    /** private method to get the site map data from service */
    getData(): any;
    /** private method to check for # or / in url and return the array of token */
    getRouteArray(): any[];
    /** private method return the url */
    getUrl(): string;
    /** For hiding breadcrumb items on mobile view */
    hideItemsOnMobile(): void;
    /** private method to search for route in lookup and add breadcrumb Item */
    searchAndAddItem(route: string, path: string, tempjson: any, navIndex: number): any[];
    /** Render the breadcrumb */
    render(): any;
}
export {};
