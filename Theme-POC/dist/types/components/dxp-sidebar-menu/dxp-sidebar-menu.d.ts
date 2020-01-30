import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-sidebar-menu */
export declare class SidebarMenu {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for menu */
    menuContainer: HTMLElement;
    /** sidebar-menu element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** To display collapse in header/footer */
    expandCollapseIconPosition: 'header' | 'footer';
    /** prop to determine wherther to expand sidebar on hover or not */
    expandOnHover: boolean;
    /** To toggle side panel collapse */
    showExpandCollapseIcon: boolean;
    /** To toggle side panel collapse */
    showExpanded: boolean;
    /** sets the menu items to be display */
    menuItems: any;
    /** Listener that looks for menu items object to be assigned/changed externally */
    menuChangeHandler(): void;
    /** event to be emitted when sidebar is collapsed */
    collapsed: EventEmitter;
    /** event to be emitted when sidebar is expanded */
    expanded: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loaded */
    componentDidLoad(): Promise<void>;
    /** Listener for action to perform for keyup event */
    handleKeyEvents(event: any): Promise<void>;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** function to collapse sidebar */
    collapse(): Promise<void>;
    /** To collapse/expand sidebar menu panel */
    collapseExpandSidebar(): Promise<void>;
    /**  function to expnd sidebar */
    expand(): Promise<void>;
    /** to return all sidebar menu group elements */
    getAllMenuGroupElements(): any;
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event: any, keys: any): void;
    /** collapsing all opened sidebar menu groups on collapse/expand of sidebar menu panel */
    setAndCollapse(shouldShowView: boolean): void;
    /** Render the sidebar-menu */
    render(): any;
}
