import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-solid-background */
export declare class BannerSolidBackground {
    /** base component - common functionality */
    base: BaseComponent;
    /** banner element - utilized by DXP framework */
    element: HTMLElement;
    /** the component's theme (if any) */
    cssClass: string;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    overlayClass: string;
    /** the component's theme (if any) */
    theme: string;
    /** banner size */
    bannerSize: string;
    /** banner type */
    bannerType: string;
    /** cta attributes */
    cta: any;
    /** eyebrow title */
    eyebrowTitle: string;
    /** overlay Position */
    overlayPosition: string;
    /** subtitle */
    subTitle: string;
    /** title text */
    titleText: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the banner */
    render(): any;
}
