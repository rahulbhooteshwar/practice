import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-accordion-item */
export declare class SidebarMenuItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for sidebar-menu */
    menuItemContainer: HTMLElement;
    /** accordion element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** Link target.  Set to true to open in an new window. */
    openInNewTab: boolean;
    /** sets logo alt */
    subMenuAlt: string;
    /** sets link for sub-menu-logo to display */
    subMenuHref: string;
    /** Navigation text will display in browser */
    subMenuIcon: string;
    /** sets route link */
    subMenuSrc: string;
    /** Navigation text will display in browser */
    subMenuTitle: string;
    /** life cycle hook runs before loading the component */
    componentWillLoad(): void;
    /** render dxp-accordion item(s) */
    render(): any;
}
