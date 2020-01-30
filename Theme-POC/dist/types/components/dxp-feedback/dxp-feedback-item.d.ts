import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** component feedback  */
export declare class FeedbackItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** holds the feedback array with index */
    data: any;
    /** to store dropdown selected value */
    dropdownValSelected: any;
    /** to store the emitted feedback value */
    feedbackValue: any;
    /** feedback element - utilized by DXP framework   */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** to store radio rating value */
    radioValue: any;
    /** selected index for stars */
    selectedIndex: number;
    /** to store star rating value */
    starValue: any;
    /** the component's theme (if any) */
    theme: string;
    /** prop to hold feedback object values */
    configData: any;
    /** display feedback as */
    displayAs: 'star' | 'dropdown' | 'radio';
    /** holds the individual feedback id */
    feedbackId: string;
    /** prop to hold feedback individual title */
    feedbackRatingTitle: any;
    /** dropdown placeholder */
    placeholder: string;
    /** prop to hold star length */
    starCount: number;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** event Emit for dropdown */
    emitfeedback: EventEmitter;
    /** event Emit for radio feedback */
    radioFeedback: EventEmitter;
    /** event Emit for star rating */
    starFeedback: EventEmitter;
    /** on componentWillLoad feedback */
    componentWillLoad(): void;
    /** on dropdown change */
    dropdownChange(e: any): void;
    /** Emit the analytics data after clicking on dxp-feedback component */
    emitAnalyticsData(feedbackType: any, value: any): void;
    /** keyboard event */
    handleKeypressEvents(e: any): void;
    /** handle radio feedback */
    handleRadio(e: any): void;
    /** handle star rating */
    handleStarRating(e: any): void;
    /** to render stars */
    renderStars(): any[];
    /** Render the feedback */
    render(): any;
}
