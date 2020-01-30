import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import CommonUtility from './common-utility';
/** dxp-navigation */
export declare class NavItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** Nested menu item container */
    navItemContainer: HTMLElement;
    /** Common Utility */
    utility: CommonUtility;
    /** GroupNav element - utilized by DXP framework */
    element: HTMLElement;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /**  Accessibility. Screen readers will red this. */
    accessibilityText: string;
    /**  Alternative text for menu icon image */
    altText: string;
    /**  Nav sub items */
    child: any;
    /** Is nested menu items */
    isNestedMenu: boolean;
    /**  Link title (Display on mouse hover) */
    linkTitle: string;
    /**  link url */
    menuRouteLink: string;
    /** Navigation text will display in browser */
    navigationTitle: string;
    /** url of menu icon image */
    src: string;
    /** Actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Actions to perform after component load */
    componentDidLoad(): void;
    /** Actions to perform after component update */
    componentDidUpdate(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** will remove is-active attribute on click and will add active link function */
    clickHandler(): void;
    /** Render nested menu */
    renderNestedMenu(): any[];
    /** Render the GroupNav */
    render(): any;
}
