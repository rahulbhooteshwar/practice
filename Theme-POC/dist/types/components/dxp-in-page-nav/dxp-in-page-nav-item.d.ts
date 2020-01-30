import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-in-page-nav */
export declare class InPageNavItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** in-page-nav element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** set to true when item is active */
    active: boolean;
    /** link to destination or id of section */
    href: string;
    /** text to be displayed in nav-bar */
    text: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** function to get active status of an item */
    getActive(): Promise<boolean>;
    /** function to get href of an item */
    getHref(): Promise<string>;
    /** function to get active status of an item */
    setActive(): Promise<void>;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** function to scroll to the selected section */
    scrollTo(href: any): void;
    /** method to scroll to input element  */
    scrollView(elem: any): void;
    /** Render the in-page-nav */
    render(): any;
}
