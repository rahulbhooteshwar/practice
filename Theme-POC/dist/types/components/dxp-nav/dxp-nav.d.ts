import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import CommonUtility from './overlay';
/** dxp-nav */
export declare class Nav {
    /** base component - common functionality */
    base: BaseComponent;
    /** Nav Element */
    nav: HTMLElement;
    /** nested element container for menu items */
    navigationContainer: HTMLElement;
    /** Overlay */
    overlay: HTMLElement;
    /** Common Utility */
    utility: CommonUtility;
    /** nav element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** api url for navigation */
    apiUrl: string;
    /** the child element */
    currentChild: HTMLElement;
    /** identify currentNav from menu container  */
    currentNav: HTMLElement;
    /** background image for menu container */
    overlayBgImage: string;
    /** Listener that looks for navigation item object to be assigned/changed externally */
    navData: any;
    /** watch for navigation data change  */
    navigationDataHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** close overlay click */
    childEventHandler(e: any): void;
    /** click event on document level  */
    documentClickEventHandler(e: any): void;
    /** hide expanded sub menu items with close button */
    hideMenuWithKeys(e: any): void;
    /** Listen key down events */
    keyDownEventHandler(e: any): void;
    /** close overlay click */
    navHeaderHandler(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** crossIcon handler */
    closeIconClickHandler(): void;
    /** click handler nav */
    closeOverlayHandler(): boolean;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** Render the nav */
    render(): any;
}
