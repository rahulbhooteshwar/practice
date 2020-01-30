import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-range-slider */
export declare class RangeSlider {
    /** base component - common functionality */
    base: BaseComponent;
    /** range selector innerbar */
    innerBar: HTMLElement;
    /** keyboard keycode */
    keyCode: any;
    /** maximum value of range slider */
    maxRangeValue: any;
    /** maximum thumb element */
    maxThumbNode: HTMLElement;
    /** maximum value of thumb display element */
    maxValueNode: HTMLElement;
    /** minimum value of range slider */
    minRangeValue: any;
    /** minimum thumb element */
    minThumbNode: HTMLElement;
    /** minimum value of thumb display element */
    minValueNode: HTMLElement;
    /** parent element of range slider */
    rangeSliderTrack: HTMLElement;
    /** width of parent element */
    rangeSliderTrackWidth: any;
    /** thumb height */
    thumbHeight: number;
    /** thumb width */
    thumbWidth: number;
    /** border width */
    trackBorderWidth: number;
    /** current value of single or multi slider thumb */
    valueNow: number;
    /** range-selector element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** accessibility text */
    accessibilityText: string;
    /** maximum value */
    maxValue: number;
    /** minimum value */
    minValue: number;
    /** range of slider */
    range: any;
    /** single or multi-thumb slider */
    type: string;
    /** value of range */
    value: number;
    /** emit range slider value */
    changeValue: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** common value initialize between single thumb and multiple thumb slider value */
    commonInit(): void;
    /** fill lower track of single-value-slider */
    fillLowerTrackInnerBar(): void;
    /** fill color between two thumb */
    fillMultipleThumbInnerBar(): void;
    /** onblur thumb event handler */
    handleBlur(event: any): void;
    /** onfocus on thumb event handler */
    handleFocus(event: any): void;
    /** handle keyboard event */
    handleKeyDown(event: any): void;
    /** mouse down/move/up event handler  */
    handleMouseDown(event: any): void;
    /** initialize numeric-range-slider value */
    initMultiThumbSlider(): void;
    /** initialize single thumb slider value */
    initSingleThumbSlider(): void;
    /** movie single or multi thumb slider  */
    moveSliderTo(value: any, thumbElement: any, thumbType: any): void;
    /** Render the range-selector */
    render(): any;
}
