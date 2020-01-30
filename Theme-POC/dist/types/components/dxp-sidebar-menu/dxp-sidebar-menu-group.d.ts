import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-sidebar-menu */
export declare class SidebarMenuGroup {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for sub-menu */
    subMenuContainer: HTMLElement;
    /** sidebar-menu element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** value to check for child side-menu-items */
    hasChildMenuItems: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** toggle variable to hide and display menu */
    toggle: boolean;
    /** sets logo alt */
    menuAlt: string;
    /** sets link for menu-logo to display */
    menuHref: string;
    /** sets the menu items to be display */
    menuItem: any;
    /**  sets max height for the list of child elements inside a menu group */
    menuItemsListMaxHeight: string;
    /** sets route link */
    menuSrc: string;
    /** Navigation text will display in browser */
    menuTitle: string;
    /** toggle variable to display popup */
    viewPopup: boolean;
    /** sets the menu items to be display */
    child: any;
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    subMenuChangeHandler(): void;
    /** Emit toggle change */
    toggleEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loaded */
    componentDidLoad(): void;
    /** Actions to perform after component update */
    componentDidUpdate(): void;
    /** for mouse click outside of component */
    clickOutsideComponentEvent(e: any): void;
    /** show and hide overlay */
    handleKeyPress(event: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** to collapse sideMenu group from parent component */
    collapse(): Promise<void>;
    /** to expand sideMenu group from parent component */
    expand(): Promise<void>;
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event: any, keys: any): void;
    /** Sub-menu item container */
    renderMenuItems(): any;
    /** Action for toggle component */
    toggleMenu(): void;
    /** Render the sidebar-menu */
    render(): any;
}
