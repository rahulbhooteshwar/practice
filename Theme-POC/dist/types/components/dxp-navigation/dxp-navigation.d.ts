import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import CommonUtility from './common-utility';
/** dxp-navigation */
export declare class Navigation {
    /** base component - common functionality */
    base: BaseComponent;
    /** Clear the execution of setTimeout */
    clearSetTimeout: any;
    /** nested element container for menu items */
    navigationContainer: HTMLElement;
    /** Common Utility */
    utility: CommonUtility;
    /** navigation element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** api url for navigation */
    apiUrl: string;
    /** Navigation items */
    navData: any;
    /** life cycle hook runs before loading the component */
    componentWillLoad(): Promise<void>;
    /** Actions to perform after component load */
    componentDidLoad(): void;
    /** Actions to perform after component update */
    componentDidUpdate(): void;
    /** Click events */
    handleClickEvent(e: any): void;
    /** Document click event handler */
    handleDocumentClick(e: any): void;
    /** Key down events */
    handleKeydownEvents(e: any): void;
    /** key up events */
    handleUpkeyEvents(e: any): void;
    /** window resize event */
    onWindowResize(): void;
    /** Collapse all level menu items */
    collapseAllMenus(expandedItems: any): void;
    /** Collapse expanded menu item on click in web page anywhere */
    collapseExpandedNav(dxpNav: any, ariaExpanded: any, expandedMenus: any): void;
    /** handled the accessibility compliance  */
    defaultActions(): void;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** Collapse expanded menu items with key up event */
    hideMenuItemsOnKeyPress(target: any, keycode: any, isLevelOne: any, expandedNavItem: any, expandedMenus: any, ariaExpanded: any): void;
    /** Hide entire navigation in mobile with hamburger (close button) */
    hideNav(nav: any, target: any, expandedItems: any): void;
    /** Hide expanded nav item (level 2) if the tab key pressed on first level menu item */
    hideNavItem(target: any, isLevelOne: any, expandedNavItem: any, keycode: any): void;
    /** Hide expanded sibling sub items */
    hideSubMenu(expandedSubItems: any): void;
    /** Mobile menu/sub menu expand and collapse */
    menuItemsHandler(target: any, itemContainer: any, expandedItems: any, expandedMainMenu: any): void;
    /** Navigate expanded menu items */
    navigateInExpandedMenu(isNavItem: any, keycode: any, subItems: any, nextItem: any): void;
    /** Navigate in nav-sub-menu items */
    navigateSubItems(isSubItem: any, nextSubItem: any, keycode: any, prevSubItem: any): void;
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event: any, keys: any): void;
    /** Select Level two's first menu item with down arrow key */
    selectNestedMenuItem(nestedItem: any, keycode: any, isExpanded: any): void;
    /** Select next nav item (level 2) from nav sub item (Level 3) */
    selectNextNavItem(isSubItem: any, nextSubItem: any, nextItem: any, keycode: any): void;
    /** Select parent nav item with up arrow key (if first sub menu item is already selected) */
    selectParentNavItem(target: any, prevSubItem: any, isSubItem: any, keycode: any): void;
    /** select previous nav sub item (nav sub item) OR nav item (level-2) */
    selectPrevNavItem(isNavItem: any, prevItem: any, keycode: any): void;
    /**
     * Show/hide the nested menu items
     * Space bar key can show and hide the dropdown menu items
     * Down arrow key only expand menu items
     */
    showHideMenuWithKeys(target: any, keycode: any, nestedItem: any, isExpanded: any): void;
    /** Render the navigation */
    render(): any;
}
