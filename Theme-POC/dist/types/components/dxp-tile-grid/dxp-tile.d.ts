import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-tile */
export declare class Tile {
    /** base component - common functionality */
    base: BaseComponent;
    /** base component - common functionality */
    overlay: HTMLElement;
    /** tile element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** To show video on click on play icon */
    isVideoShow: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Auto play video */
    autoPlay: boolean;
    /** background type for regular banner */
    backgroundType: 'image-background' | 'video-background';
    /** text for badge  */
    badgeText: string;
    /** cta for tile  */
    ctaListData: any;
    /** is description for square tile */
    description: string;
    /** disable video controls */
    disableControls: boolean;
    /** eyebrow title */
    eyebrowTitle: string;
    /** Focal point of XL images */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** href for tile component */
    href: string;
    /** icon type for header video */
    iconType: 'light' | 'dark';
    /** check if tile is square */
    isSquare: boolean;
    /** Link target.  Set to true to open in an new window. */
    openInNewTab: boolean;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** Path for the Background image and video to display */
    src: string;
    /** source lg */
    srcLg: string;
    /** source md */
    srcMd: string;
    /** poster link Of video */
    srcPoster: string;
    /** title of caption to be shown over the image */
    tileCaption: string;
    /** description of video */
    videoDescription: string;
    /** name of video */
    videoName: string;
    /** video type like youtube, youku, akamai etc */
    videoType: string;
    /** video first published date */
    videoUploadDate: string;
    /** component will load */
    componentWillLoad(): void;
    /** key up events */
    handleUpkeyEvents(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** crossIcon handler */
    closeIconClickHandler(): void;
    /** show the content video block */
    getContentOfVideo(): any;
    /** show video overlay block */
    getVideoOverlay(): any;
    /** if image don't have link or href */
    imageClickHandler(event: any): void;
    /** Show/hide the video  */
    toggleVideo(displayVideo: any, ev: any): void;
    /** Render the tile */
    render(): any;
}
