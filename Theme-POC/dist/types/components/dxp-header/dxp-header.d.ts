import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-header */
export declare class Header {
    /** base component - common functionality */
    base: BaseComponent;
    /** Clear the execution of setTimeout */
    clearSetTimeout: any;
    /** header component - HTMLElement  */
    headerContainer: HTMLElement;
    /** header element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** headerCTAMenu : this will be used to make a menu link and a dropdown over any supporting SPA (MCC specific) can be handled via SPA using JS and CSS */
    headerCTAMenu: boolean;
    /** isLanguageSelectorPresent Present */
    isLanguageSelectorPresent: boolean;
    /** isLogo Present */
    isLogoPresent: boolean;
    /** isNavigationPresent Present */
    isNavigationPresent: boolean;
    /** isSearchPresent Present */
    isSearchPresent: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Enable disable out of the box padding & margin around component */
    containerFluid: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after to component loading */
    componentDidLoad(): void;
    /** actions to be performed prior to component is updated */
    componentWillUpdate(): void;
    /** actions to be performed after component is updated */
    componentDidUpdate(): void;
    /** actions to be performed after component is unloaded */
    componentDidUnload(): void;
    /** Click events */
    handleClickEvent(e: any): void;
    /** Document click event handler */
    handleDocumentClick(e: any): void;
    /** On navigation mouse hover close opened component */
    hoverEvent(e: any): Promise<void>;
    /** Collapse all level menu items */
    collapseAllMenus(expandedItems: any): void;
    /** Collapse expanded menu item on click in web page anywhere */
    collapseExpandedNav(dxpNav: any, ariaExpanded: any, expandedMenus: any): void;
    /** to handle LTR for components */
    handleLtr(langugeSelectorContainer: any, navContainer: any, searchContainer: any): void;
    /** to handle RTL for components */
    handleRtl(langugeSelectorContainer: any, navContainer: any, searchContainer: any): void;
    /** Hide entire navigation in mobile with hamburger (close button) */
    hideNav(nav: any, target: any, expandedItems: any): void;
    /** Expand/Collapse navigation in mobile with hamburger button */
    showHideNav(hamburger: any, isClose: any, nav: any, target: any, expandedItems: any): void;
    /** actions to be performed after render method is called */
    hostData(): {
        'class': string;
    };
    /** Render the header */
    render(): any;
}
