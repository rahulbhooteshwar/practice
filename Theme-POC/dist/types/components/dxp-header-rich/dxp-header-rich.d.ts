import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-header-rich */
export declare class HeaderRich {
    /** base component - common functionality */
    base: BaseComponent;
    /** BODY Element */
    body: HTMLElement;
    /** header component - HTMLElement  */
    headerContainer: HTMLElement;
    /** header element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** background color on active header */
    isHeaderActive: boolean;
    /** isLogo Present */
    isLogoPresent: boolean;
    /** Is Nav present */
    isNavPresent: boolean;
    /** Search present */
    isNavSearch: boolean;
    /** Change the I18 message as per menu state (Expand/Collapse) */
    menuState: any;
    /** the component's theme (if any) */
    theme: string;
    /** window scroll initial value */
    windowScrollBefore: number;
    /** Prop to display header background either transparent or solid */
    backgroundType: 'transparent' | 'solid';
    /** Prop to display fixed header */
    isHeaderSticky: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after to component loading */
    componentDidLoad(): void;
    /**  click listener for routing events on anchor tag  */
    clickEventHandler(event: any): void;
    /** listen to window scroll event */
    handleScroll(): void;
    /** align nav search if available */
    alignNavSearch(): void;
    /** hide search and close icon of search container in mobile/tablet device. */
    changesInSearchComponent(searchContainer: any, searchIcon: any, searchWrapperCloseIcon: any): void;
    /** close header on-click on close icon */
    deactivateheader(): void;
    /** Render the header */
    render(): any;
}
