import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-image-overlay */
export declare class BannerImageOverlay {
    /** base component - common functionality */
    base: BaseComponent;
    /** banner element - utilized by DXP framework */
    element: HTMLElement;
    /** the component's theme (if any) */
    cssClass: string;
    /** page dir attribute */
    dir: string;
    /** display video on full height */
    displayVideoOnFullHeight: boolean;
    /** image style for different breakpoint */
    imagePresentClass: string;
    /** show the video on condition */
    isVideoShow: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    overlayClass: string;
    /** the component's theme (if any) */
    theme: string;
    /** add circle design over banner */
    addCircle: boolean;
    /** alt Text */
    alt: string;
    /** animation for overlay content and CTA */
    animation: boolean;
    /** auto play video */
    autoPlay: boolean;
    /** background type of Hero Banner like Image, Video, Solid */
    backgroundType: string;
    /** banner size */
    bannerSize: string;
    /** banner type */
    bannerType: string;
    /** category */
    categoryTag: string;
    /** cta attributes */
    cta: any;
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
    /** focal Point */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** image Href */
    href: string;
    /** video play icon type e.g light, dark */
    iconType: string;
    /** position Of Image */
    imageEnableOverlay: string;
    /** image Title */
    imageTitle: string;
    /** Video mute option */
    muted: boolean;
    /** Open in new tab */
    openInNewTab: string;
    /** overlay Position */
    overlayPosition: string;
    /** Web page scroll down */
    pageScrollDownArrow: boolean;
    /** position Of Image */
    positionOfImage: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
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
    /** video play image icon */
    srcVideoPlayImage: string;
    /** subtitle */
    subTitle: string;
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
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Actions to perform after component load */
    componentDidLoad(): void;
    /** mouse click events */
    handleClickEvents(event: any): void;
    /** keyboard event */
    handleKeypressEvents(e: any): void;
    /** key up events */
    handleUpkeyEvents(e: any): void;
    /** height for solid background */
    applyHeightsolidBackground(subFeatureImg: any): void;
    /** Apply window height to banner */
    applyWindowHeight(): void;
    /** Check the current position of the banner button. The remains visible portion will scroll up to hide the banner completely  */
    currentPos(target: any): void;
    /** design css circle as per window height for extra-long banner */
    designCircle(windowHeight: any, subFeatureImg: any): void;
    /** Render Baner image overlay */
    renderBanerImageOverlay(): any;
    /** Render solid background */
    renderSolidBackground(): any;
    /** Scroll web page with down arrow button */
    scrollWebPage(e: any): void;
    /** Show/hide the video */
    toggleVideo(displayVideo: boolean, ev: any): void;
    /** Render the banner */
    render(): any;
}
