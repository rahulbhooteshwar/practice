import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-content-item */
export declare class ContentItem {
    /** Badge Reference */
    badgeRef: HTMLElement;
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for CTA */
    ctaContainer: HTMLElement;
    /** content-item element - utilized by DXP framework */
    element: HTMLElement;
    /** autoplay video */
    autoplay: boolean;
    /** page dir attribute */
    dir: string;
    /** To show video on click on play icon */
    isVideoShow: boolean;
    /** To show more actions popup on More button click */
    showMore: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** More action button list */
    actionList: any[];
    /** alt text for header image */
    alt: string;
    /** content item animation */
    animation: 'slide-right' | 'slide-left' | 'slide-up' | 'slide-down' | 'none';
    /** content item animation */
    animationDuration: number;
    /** title badge background color */
    badgeBackgroundColor: string;
    /** text for badge  */
    badgeText: string;
    /** text color for badge */
    badgeTextColor: string;
    /** CTA one display as link or button */
    buttonOneDisplayAs: 'link' | 'button';
    /** CTA one link/button text */
    buttonOneLinkText: string;
    /** to open in new tab or not when CTA one is clicked */
    buttonOneOpenInNewTab: boolean;
    /** link to destination  */
    buttonOneUrl: string;
    /** CTA two display as link or button */
    buttonTwoDisplayAs: 'link' | 'button';
    /** CTA two link/button text */
    buttonTwoLinkText: string;
    /** to open in new tab or not when CTA two is clicked */
    buttonTwoOpenInNewTab: boolean;
    /** link to destination */
    buttonTwoUrl: string;
    /** show card more button or not */
    cardMoreButton: boolean;
    /** category label for dxp-content-item */
    categoryLabel: string;
    /** category tag for dxp-content-item */
    categoryTag: string;
    /** category text target for dxp-content-item */
    categoryTarget: false;
    /** category text for dxp-content-item */
    categoryText: string;
    /** title url for dxp-content-item */
    contentItemTitle: string;
    /** title url for dxp-content-item */
    contentItemTitleTarget: true;
    /** title url for dxp-content-item */
    contentItemTitleUrl: string;
    /** type of dxp-content-item; can be either media-on-top, title-on-top */
    contentItemType: 'media-on-top' | 'eyebrow-on-top' | 'title-on-top' | 'description-on-top';
    /** Content type of dxp-content-item. */
    contentType: 'content-image-text' | 'content-small-image' | 'content-logo';
    /** count of the Content item */
    count: string;
    /** custom mute button in case of disabled controls for HTML5 video */
    customMuteButton: boolean;
    /** custom mute button position */
    customMuteButtonPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** defines theme for child components */
    dataTheme: string;
    /** date string of the Content Item */
    date: string;
    /** description for dxp-content-item */
    description: string;
    /** description target for dxp-content-item */
    descriptionTarget: boolean;
    /** Device height */
    deviceHeight: string;
    /** disable video controls */
    disableControls: boolean;
    /** set overlay to true or false on header image */
    enableOverlay: boolean;
    /** eyebrow text for dxp-content-item */
    eyebrowText: string;
    /** focal point for header image */
    focalPoints: any;
    /** Left Head icon of the Content item */
    headerIconLeft: string;
    /** Right Head icon of the Content item  */
    headerIconRight: string;
    /** whether borderline should use  */
    headerline: boolean;
    /** Header text of the Content Item */
    headerText: string;
    /** header type of dxp-content-item. Can be either image or none  */
    headerType: 'image' | 'none' | 'video' | 'card';
    /** header type of dxp-content-item. Can be either image or none  */
    heightType: 'small' | 'large';
    /** link to destination from header */
    href: string;
    /** icon type for header video */
    iconType: 'light' | 'dark';
    /** title for header image */
    imageTitle: string;
    /** whether content indentation should use  */
    indentation: boolean;
    /** header link open in new tab or not */
    openInNewTab: boolean;
    /** orientation of dxp-content-item */
    orientation: 'horizontal' | 'vertical';
    /** to align play icon on bottom left side */
    playIconBottomLeft: boolean;
    /** position Of image/video */
    positionOfMedia: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** type of the application */
    ribbonType: string;
    /** path of image if the header type is set to image */
    src: string;
    /** poster url that will be shown on video if headerType is video */
    srcPoster: string;
    /** src-video of video */
    srcVideo: string;
    /** Status of the application */
    status: string;
    /** Status url of the application */
    statusUrl: string;
    /** Status url of the application */
    statusUrlOpenInNewTab: boolean;
    /** type of video. can be either youtube, vimeo etc  */
    type: string;
    /** description of video */
    videoDescription: string;
    /** name of video */
    videoName: string;
    /** video upload date */
    videoUploadDate: string;
    /** cta data for child components */
    ctaData: any;
    /** Watcher that looks for cta object to be assigned/changed externally */
    ctaDataChangeHandler(): void;
    /** CTA content item click event. Emitted when CTA appcard is clicked */
    clickCtaCard: EventEmitter;
    /** CTA header right icon click event. Emitted when CTA fav icon is clicked */
    clickCtaFav: EventEmitter;
    /** CTA more button actions click event. Emitted when CTA More action is clicked */
    clickCtaMoreAction: EventEmitter;
    /** CTA one click event. Emitted when CTA one is clicked */
    clickCtaOne: EventEmitter;
    /** CTA two click event. Emitted when CTA two is clicked */
    clickCtaTwo: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** life cycle hook */
    componentDidLoad(): void;
    /** Listen scroll for animation */
    handleScroll(): void;
    /** key up events */
    handleUpkeyEvents(e: any): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** show the content video block */
    getContentOfVideo(): any;
    /** show video overlay block */
    getVideoOverlay(): any;
    /** Handler for content item click. Emits click event */
    onClickCtaCardHandler(event: any): void;
    /** Handler for CTA Header right icon click. Emits click event */
    onClickCtaFavHandler(event: any): void;
    /** Handler for content item more button click. Emits click event */
    onClickCtaMoreActionHandler(event: any): void;
    /** Handler for content item more button click. Emits click event */
    onClickCtaShowMore(): void;
    /** render dom of content item */
    renderContentItem(): any;
    /** Render horizontal orienation */
    renderHorizontalOrientation(): any[];
    /** Render vertical orientation */
    renderVerticalOrientaion(): any[];
    /** show description on top */
    showDescriptionOnTop(): any[];
    /** show eyebrow on top */
    showEyebrowOnTop(): any[];
    /** show media on top */
    showMediaOnTop(): any[];
    /** show more buttons */
    showMoreButtons(): any[];
    /** show ribbon type card item */
    showRibbonTypeCardItem(): any[];
    /** show title on top */
    showTitleOnTop(): any[];
    /** Show/hide the video  */
    toggleVideo(displayVideo: any, ev: any): void;
    /** Render the content-item */
    render(): any;
}
