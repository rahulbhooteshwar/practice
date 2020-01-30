import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-country-item */
export declare class DxpCountryItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** country-item element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** country name */
    name: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the country-selector */
    render(): any;
}
