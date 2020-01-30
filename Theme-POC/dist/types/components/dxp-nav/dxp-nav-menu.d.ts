import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
import CommonUtility from './overlay';
/** dxp-nav */
export declare class NavMenu {
    /** base component - common functionality */
    base: BaseComponent;
    /** group Container element reference */
    groupContainer: any;
    /** nav group container */
    navGroupContainer: HTMLElement;
    /** Dropdown menu container  */
    subNavChildContainer: any;
    /** nested element container for quick links items */
    quickLinksContainer: HTMLElement;
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
    /** Accessibility. Screen readers will read this. */
    accessibilityText: string;
    /** title will display in browser */
    linkTitle: string;
    /** background image for menu container */
    overlayBgImage: string;
    /** title will display in browser */
    navigationTitle: string;
    /** group container(secondary navigation) */
    child: any;
    /** if search term changed */
    navHeaderClicked: EventEmitter;
    /** if search term changed */
    childClickEvent: EventEmitter;
    /** watch for navigation data change  */
    navGroupHandler(): void;
    /** Listener that looks for quick link items object to be assigned/changed externally */
    quickLinks: any;
    /** watch for navigation data change  */
    quickLinksHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed prior to component loading */
    componentDidLoad(): Promise<void>;
    /** actions to be performed after component loading */
    componentDidUpdate(): Promise<void>;
    /** default actions */
    defaultActionOnFocus(): Promise<void>;
    /** nav click - opens overlay */
    parentNavHandler(): void;
    /** Prevent scrolling the web page with space-bar and all up/down/left/right arrow keys */
    preventDefaultBehaviour(keycode: any, e: any): void;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /**  click event handler  */
    clickEventHandler(event: any): void;
    /** show and hide overlay */
    showHideMenuWithKeyDown(e: any): void;
    /** Render the nav */
    render(): any;
}
