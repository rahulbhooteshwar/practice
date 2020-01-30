import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner */
export declare class Banner {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for CTAs */
    ctaContainer: HTMLElement;
    /** banner element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** image position as per dir attribute (if any) */
    positionOfImageClass: string;
    /** the component's theme (if any) */
    theme: string;
    /** add circle design over banner */
    addCircle: boolean;
    /** alt Text */
    alt: string;
    /** animation for overlay content and CTA */
    animation: boolean;
    /** Auto play video */
    autoPlay: boolean;
    /** background type for regular hero and banner  */
    backgroundType: string;
    /** banner size */
    bannerSize: string;
    /** banner type */
    bannerType: string;
    /** slide background color */
    cardColor: string;
    /** category */
    categoryTag: string;
    /** Enable disable out of the box padding & margin around component */
    containerFluid: boolean;
    /** to give custom id to banner */
    customId: string;
    /** custom mute button in case of disabled controls for HTML5 video */
    customMuteButton: boolean;
    /** custom mute button position */
    customMuteButtonPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** disable video controls */
    disableControls: boolean;
    /** enable overlay */
    enableOverlay: string;
    /** eyebrow title */
    eyebrowTitle: string;
    /** focal Points */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** image Href */
    href: string;
    /** video play icon type e.g light, dark */
    iconType: string;
    /** overlay for Image */
    imageEnableOverlay: string;
    /** image Title */
    imageTitle: string;
    /** Video mute option */
    muted: boolean;
    /** Open in new tab */
    openInNewTab: string;
    /** overlay Position */
    overlayPosition: string;
    /** Web page scroll with this button. Listen on bottom side of banner */
    pageScrollDownArrow: string;
    /** position Of Image */
    positionOfImage: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** key of the query that is to be sent to results page */
    searchParamKey: string;
    /** placeholder for search in in-page-search banner */
    searchPlaceholder: string;
    /** extension of search result page for in page search banner */
    searchResultPageExtension: string;
    /** result page URL for in page search banner */
    searchResultPageUrl: string;
    /** show/hide text contents over image overlay banner */
    showContentSm: boolean;
    /** image source */
    src: string;
    /** source lg */
    srcLg: string;
    /** source md */
    srcMd: string;
    /** poster link Of video */
    srcPoster: string;
    /** source Of video */
    srcVideo: string;
    /** image of video play  */
    srcVideoPlayImage: string;
    /** subtitle */
    subTitle: string;
    /** slide text color */
    textColor: string;
    /** title text */
    titleText: string;
    /** description of video */
    videoDescription: string;
    /** name of video */
    videoName: string;
    /** video type like youtube, youku, akamai etc */
    videoType: string;
    /** video first published date */
    videoUploadDate: string;
    /** cta attributes */
    cta: any;
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after the component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** apply default focal point if invalid focal point */
    applyDefaultFocalPoint(): void;
    /** Apply the width value as 'auto' to all broken images to resolve the IE issue */
    applyImgWidthAuto(): void;
    /** change image properties as per banner type */
    changeImageProp(): void;
    /** check dxp-cta-list is present and add classes */
    ctaContainerUpdate(banner: any): void;
    /** validate focal point */
    validateFocalPoint(focalpt: any): any;
    /** Render the banner */
    render(): any;
}
