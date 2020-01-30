import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-location-search-banner */
export declare class LocationSearchBanner {
    /** base component - common functionality */
    base: BaseComponent;
    /** Emit selected location data */
    locationData: any;
    /** location-search-banner element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** DXP-Image component props */
    /** Alt/title text for image. Also for SEO. */
    alt: string;
    /** api-key for url to search offer */
    apiKey: any;
    /** aria-label for image link. Also for accessibility. */
    ariaLabel: string;
    /** Location search banner data for script support */
    bannerData: any;
    /** bannerText */
    bannerTitle: string;
    /** description */
    descriptionText: string;
    /** Eyeborw title */
    eyebrowTitle: string;
    /** Focal point of XL images */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** placeholder text for search box */
    placeholder: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** text to show in the CTA */
    searchBtnText: string;
    /** CTA type to show the link OR button */
    searchBtnType: any;
    /** CTA input field type  */
    searchInputType: any;
    /** searchType for search offer by cities,region ex */
    searchType: any;
    /** Image path to display the banner image */
    src: string;
    /** This emit the selected checkbox data to listen any event listener */
    locationSelected: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Component did load */
    componentDidLoad(): void;
    /** Render the location-search-banner */
    render(): any;
}
