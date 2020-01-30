import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-video */
export declare class Video {
    /** base component - common functionality */
    base: BaseComponent;
    /** custom mute button reference */
    customMuteRef: HTMLElement;
    /** poster ref for Iframe */
    iframePoster: HTMLElement;
    /** Non HTML5 video section reference */
    iframeRef: HTMLIFrameElement;
    /** Video Element Reference */
    videoElementRef: HTMLVideoElement;
    /** this variable contains video source */
    videoSource: string;
    /** video element - utilized by DXP framework */
    element: HTMLElement;
    /** page dtmUrl attribute */
    dtmUrl: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** video auto play property */
    autoplay: boolean;
    /** custom mute button in case of disabled controls for HTML5 video */
    customMuteButton: boolean;
    /** custom mute button position */
    customMuteButtonPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** disable video controls */
    disableControls: boolean;
    /** display full height video  */
    fullHeight: boolean;
    /** video play icon type e.g light, dark */
    iconType: 'dark' | 'light';
    /** video mute unmute control property */
    muted: boolean;
    /** video poster/thumbnail */
    srcPoster: string;
    /** video source e.g youtube, youku or external source */
    srcVideo: string;
    /** video type e.g youtube, youku or external source */
    type: string;
    /** video  description */
    videoDescription: string;
    /** video name. This property is required for analytics and SEO */
    videoName: string;
    /** video first publish date. */
    videoUploadDate: string;
    /** video width */
    width: string;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad(): void;
    /** component did update  */
    componentDidUpdate(): void;
    /** keydown handler */
    keyDownHandler(event: any): void;
    /** to call pause from outside for video hosted internally */
    pauseVideo(): Promise<void>;
    /** to call play from outside for video hosted internally */
    playVideo(): Promise<void>;
    /** disable video constrols */
    disableVideoControls(): any;
    /** emit analytics data */
    emitAnalyticsData(videoAction: any): void;
    /** lazy load fallback condition for IE and Edge browser */
    fallBack(): void;
    /** function to form video source */
    formVideoSource(): void;
    /** handle type for hosted extenally */
    handleAkamai(): any;
    /** handle vimeo video type */
    handleVimeo(): void;
    /** handle Youku video type */
    handleYouku(): void;
    /** handle youtube video type */
    handleYoutube(): void;
    /** identify if string is valid url */
    is_url(str: any): boolean;
    /** apply lazy loading for browser chrome, safari and firefox. Not supported on IE/Edge as it does not support event */
    lazyLoadVideo(): void;
    /** on poster click */
    onPosterClick(): void;
    /** SEO script of Schema  */
    schemaScript(): void;
    /** on mute toggle */
    toggleMute(): void;
    /** Render the video */
    render(): any;
}
