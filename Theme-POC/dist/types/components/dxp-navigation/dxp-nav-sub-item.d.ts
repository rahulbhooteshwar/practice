import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import CommonUtility from './common-utility';
/** dxp-navigation */
export declare class NavSubItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** Common utility  */
    utility: CommonUtility;
    /** GroupNav element - utilized by DXP framework */
    element: HTMLElement;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Accessibility. Screen readers will red this. */
    accessibilityText: string;
    /** Link title (Display on mouse hover) */
    linkTitle: string;
    /** url of menu icon image */
    menuIcon: string;
    /** link url */
    menuRouteLink: string;
    /** Navigation text will display in browser */
    navigationTitle: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to perform after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** will remove is-active attribute on click and will add active link function */
    clickHandler(): void;
    /** Render the GroupNav */
    render(): any;
}
