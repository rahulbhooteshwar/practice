import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import CommonUtility from './common-utility';
/** dxp-navigation */
export declare class NavGroup {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for menu items */
    navGroupContainer: HTMLElement;
    /** Common Utility */
    utility: CommonUtility;
    /** NavGroup element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /**  the component's theme (if any) */
    theme: string;
    /** Accessibility. Screen readers will red this. */
    accessibilityText: string;
    /** Listener that looks for content list items object to be assigned/changed externally */
    child: any;
    /** set active link manually (for angular route) */
    isActive: boolean;
    /** Is nested menu items */
    isNestedMenu: boolean;
    /** Link title (Display on mouse hover) */
    linkTitle: string;
    /** link url */
    menuRouteLink: string;
    /** Navigation text will display in browser */
    navigationTitle: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to perform after component load */
    componentDidLoad(): void;
    /** Actions to perform after component update */
    componentDidUpdate(): void;
    /** Listen screen change event */
    onWindowResize(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** manually active links */
    activeManually(): void;
    /** will remove is-active attribute on click and will add active link function */
    clickHandler(): void;
    /** Resolve the IE issue for alternative text for visible */
    findBrokenImage(icons: any): void;
    /** Render Nested Menu */
    renderNestedMenu(): any;
    /** Render the NavGroup */
    render(): any;
}
