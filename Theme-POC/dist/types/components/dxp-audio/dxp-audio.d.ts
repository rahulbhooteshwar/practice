import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-audio */
export declare class Audio {
    /** audio reference */
    audioRef: any;
    /** base component - common functionality */
    base: BaseComponent;
    /** audio element - utilized by DXP framework */
    element: HTMLElement;
    /** audio state */
    audioState: {
        playing: boolean;
    };
    /** page dir attribute */
    dir: string;
    /** host style object */
    hostStyle: {};
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** aria-label for mute unmute button for accessibility. */
    ariaLabelMuteUnmute: string;
    /** aria-label for pay pause button for accessibility. */
    ariaLabelPlayPause: string;
    /** audio auto play property */
    autoplay: boolean;
    /** audio default control property */
    defaultControls: boolean;
    /** hide audio play pause control */
    hidePlayPauseControl: boolean;
    /** holds boolean value of looping audio */
    loop: boolean;
    /** audio mute unmute control property */
    muted: boolean;
    /** holds position for audio player */
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** audio preload property */
    preload: 'auto' | 'none' | 'metadata';
    /** holds source for audio file */
    src: string;
    /** holds type of audio format */
    type: 'mpeg' | 'ogg' | 'wav';
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** listener for window resize/orientation change */
    windowResize(): void;
    /**
     * toggle audio play/pause state
     */
    toggleAudio(): Promise<void>;
    /**
     * toggle audio mute/unmute state
     */
    toggleMute(): void;
    /** update top position of floating audio */
    updateTopPosition(): void;
    /** Render the audio */
    render(): any;
}
