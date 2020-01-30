import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-small-image */
export declare class BannerSmallImage {
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
    /** banner type */
    bannerType: string;
    /** slide text color */
    cardColor: string;
    /** cta attributes */
    cta: any;
    /** to give custom id to banner */
    customId: string;
    /** eyebrow title */
    eyebrowTitle: string;
    /** Focal point of XL images */
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
    /** to generate dynamic styles */
    renderStyles(): string;
    /** Render the banner */
    render(): any;
}
