import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-timer */
export declare class Timer {
    /** base component - common functionality */
    base: BaseComponent;
    /** Time duration  */
    duration: any;
    /** Time difference  */
    durationDiff: any;
    /** Error message to display : String */
    errorMsg: string;
    /** Boolean: to show/hide Error messages */
    showError: boolean;
    /** Timer end time */
    timerEnd: any;
    /** Timer start time */
    timerStart: any;
    /** List of all units of time used */
    timeUnitList: string[];
    /** timer element - utilized by DXP framework */
    element: HTMLElement;
    /** contain cta button text  */
    buttonText: string;
    /** contain cta button title */
    buttonTitle: string;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** SelectedUnitRange Array: Subset of TimeUnitList */
    selectedUnitRange: string[];
    /** the component's theme (if any) */
    theme: string;
    /** TimeCounter Object: Renders counter units */
    timeCounter: any;
    /** SetInterval Object */
    timerInterval: any;
    /** Display direction of the timer : 'horizontal' || 'vertical' */
    displayDirection: 'horizontal' | 'vertical';
    /** End Time : ISO 8601 standard timer end time, complete with time zone offset (YYYY-MM-DDThh:mm:ssTZD) */
    endTime: any;
    /** Max Time Unit : months || days || hours || minutes || seconds */
    maxUnit: 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
    /** Min Time Unit : months || days || hours || minutes || seconds */
    minUnit: 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
    /** Boolean: stop timer at zero */
    stopAtZero: boolean;
    /** Set timer size as large or small */
    timerSize: 'large' | 'small';
    /** Timer type : 'countdown' || 'stopwatch' || 'timer' */
    timerType: 'countdown' | 'stopwatch' | 'timer';
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after the component loads */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** to reset the stopwatch */
    onReset(): void;
    /**  To start the stopwatch */
    onStart(e: any): void;
    /** reset timer */
    resetTimeCounter(): {};
    /**  Sets timeCounter object */
    setTimeCounter(): void;
    /** for calling setTimeCounter with setInterval */
    startTimerInterval(): void;
    /** Render the timer */
    render(): any;
}
