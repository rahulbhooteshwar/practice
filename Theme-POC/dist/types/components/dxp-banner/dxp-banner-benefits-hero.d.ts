import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-benefits-hero */
export declare class BannerBenefitsHero {
    /** base component - common functionality */
    base: BaseComponent;
    /** banner element - utilized by DXP framework */
    element: HTMLElement;
    /** the component's theme (if any) */
    cssClass: string;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** alt Text */
    alt: string;
    /** banner size */
    bannerSize: string;
    /** banner type */
    bannerType: string;
    /** slide background color */
    cardColor: string;
    /** cta attributes */
    cta: any;
    /** to give custom id to banner */
    customId: string;
    /** eyebrow title */
    eyebrowTitle: string;
    /** focal Point */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** image Href */
    href: string;
    /** position Of Image */
    imageEnableOverlay: string;
    /** image Title */
    imageTitle: string;
    /** Open in new tab */
    openInNewTab: string;
    /** position Of Image */
    positionOfImage: string;
    /** image position as per dir attribute (if any) */
    positionOfImageClass: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** image source */
    src: string;
    /** source lg */
    srcLg: string;
    /** source md */
    srcMd: string;
    /** subtitle */
    subTitle: string;
    /** slide text color */
    textColor: string;
    /** title text */
    titleText: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Actions to perform after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** apply height to banner - sm,lg,md */
    applyBannerHeight(contentWrapper: any, imageWrapper: any, bannerMaxHeight: any, bannerStateSize: any): void;
    /** Apply content height for dynamic content */
    applyContentHeight(): void;
    /** Apply window height to banner */
    applyWindowHeight(): void;
    /** apply height to extra-long banner */
    applyXLBannerHeight(contentWrapper: any, imageWrapper: any): void;
    /** calculate height for large content */
    calculateBannerHeight(): void;
    /** method to calculate client height */
    clientHeight(elem: any): any;
    /** to generate dynamic styles */
    renderStyles(): string;
    /** Render the banner */
    render(): any;
}
