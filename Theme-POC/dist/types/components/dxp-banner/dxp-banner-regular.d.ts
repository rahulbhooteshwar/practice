import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-regular */
export declare class BannerRegular {
    /** base component - common functionality */
    base: BaseComponent;
    /** banner element - utilized by DXP framework */
    element: HTMLElement;
    /** the text container position  */
    containerPositionClass: string;
    /** the component's theme (if any) */
    cssClass: string;
    /** page dir attribute */
    dir: string;
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
    /** background type for regular banner */
    backgroundType: string;
    /** banner type */
    bannerType: string;
    /** cta attributes */
    cta: any;
    /** custom mute button in case of disabled controls for HTML5 video */
    customMuteButton: boolean;
    /** custom mute button position */
    customMuteButtonPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** disable video controls */
    disableControls: boolean;
    /** eyebrow title */
    eyebrowTitle: string;
    /** focal Points */
    focalPoint: string;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** image Title */
    imageTitle: string;
    /** overlay text content position */
    overlayPosition: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
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
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** window resize event */
    windowResize(): void;
    /** Render the regular banner */
    render(): any;
}
