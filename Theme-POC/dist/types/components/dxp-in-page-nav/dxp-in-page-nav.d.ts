import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-in-page-nav */
export declare class InPageNav {
    /** base component - common functionality */
    base: BaseComponent;
    /** current target */
    currentTarget: any;
    /** to hold reference of nav items */
    itemContainer: HTMLElement;
    /** array of dxp-in-page-nav-items inside dxp-in-page-nav */
    navItems: any;
    /** in-page-nav bar height */
    NAV_HEIGHT: number;
    /** navbar offset top on component load */
    NAV_OFFSET_TOP: number;
    /** in-page-nav element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** inPageNavItemsData */
    inPageNavItemsData: any;
    /** inPageNavItemsData */
    dataChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** On component load */
    componentDidLoad(): Promise<void>;
    /** listen to window scroll event */
    handleScroll(): Promise<void>;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** function to check if a given div is in viewport or not */
    checkViewPort(element: any, nextElement: any): boolean;
    /** method to calculate client height */
    clientHeight(elem: any): any;
    /** function to toggle nav dropdown on mobile devices */
    toggleNavDropdown(): void;
    /** Render in-page-nav */
    render(): any;
}
