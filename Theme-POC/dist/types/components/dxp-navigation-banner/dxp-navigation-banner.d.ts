import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-navigation-banner */
export declare class NavigationBanner {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for CTA */
    ctaContainer: HTMLElement;
    /** navigation-banner element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** navigation banner class for half width */
    navBannerClass: string;
    /** the component's theme (if any) */
    theme: string;
    /** apply default indentation for navigation banner */
    applyIndentation: boolean;
    /** dropdown data */
    dropDownData: any;
    /** eyebrow title */
    eyebrowTitle: string;
    /** navigation title */
    navTitle: string;
    /** dropdown placeholder */
    placeholder: string;
    /** navigation sub title */
    subTitle: string;
    /** navigation banner class for half width */
    verticalContentBanner: boolean;
    /** cta data for child components */
    ctaData: any;
    /** Watcher that looks for cta object to be assigned/changed externally */
    ctaDataChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** change button link according to drop down option */
    changeSecondaryCtaLink(e: any): void;
    /** Render the navigation-banner */
    render(): any;
}
