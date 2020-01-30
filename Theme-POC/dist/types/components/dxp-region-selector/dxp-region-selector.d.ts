import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-region-selector */
export declare class RegionSelector {
    /** base component - common functionality */
    base: BaseComponent;
    /** country of request origin */
    originCountry: string;
    /** region-selector element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** url of api that returns list of websites and locales */
    apiUrl: string;
    /** text be displayed on button */
    buttonText: string;
    /** cookie expiry time (in days) */
    cookieExpiryTime: number;
    /** country language page link */
    countryLanguagePageLink: string;
    /** other country or region option text */
    countryLanguagePageText: string;
    /** eyebrow text for region selector */
    eyebrowText: string;
    /** list of websites in the request origin locale */
    siteList: any;
    /** title text for region selector */
    titleText: string;
    /** event, that'll be emitted when user clicks on the button (continue) */
    buttonClick: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** function to handle the button click */
    onClick(): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** function to read and compare locales of a page and request origin  */
    compareLocales(): boolean;
    /** function to dismiss region selector */
    dismissRegionSelector(): void;
    /** function to fetch the list of locale-wise sites */
    getSiteList(): Promise<object[]>;
    /** function to parse the site list coming from either JSON or API */
    parseSiteList(siteList: any): any[];
    /** function to set cookie containing the selected locale */
    setCookie(value: any): void;
    /** Render the region-selector */
    render(): any;
}
