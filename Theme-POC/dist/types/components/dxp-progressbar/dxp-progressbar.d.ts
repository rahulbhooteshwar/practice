import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-progressbar */
export declare class Progressbar {
    /** base component - common functionality */
    base: BaseComponent;
    /** progress element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** to define custom text for accessibility */
    accessibilityText: string;
    /** if percentage to be shown in tooltip (for linear) */
    asTooltip: boolean;
    /** change color of progress background (for both) */
    backgroundColor: string;
    /** define background width of progress (for both) */
    backgroundWidth: number;
    /** current value of progress  (for both) */
    currentValue: number;
    /** define fontColor  (for both) */
    fontColor: string;
    /** If description should be shown or not  (for both) */
    haveDescription: boolean;
    /** define height  (for linear) */
    height: string;
    /** maximum value for progress  (for both) */
    maxValue: number;
    /** minimum value for progress  (for both) */
    minValue: number;
    /** move percentage text to right of progress  (for linear) */
    percentRight: boolean;
    /** change color of progress  (for both) */
    progressColor: string;
    /** description to show after progress count  (for both) */
    progressDescription: string;
    /** define width of progress  (for both) */
    progressWidth: number;
    /** show percentage instead of XX/XX type  (for both) */
    showPercentage: boolean;
    /** define if corner should be square instead of round */
    squareCorner: boolean;
    /** type of progress */
    type: 'radial' | 'linear';
    /** define width  (for both) */
    width: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** actions to be performed after component updating */
    componentDidUpdate(): void;
    /** method to calculate radius */
    calculateRadius(): number;
    /** progressbar logic for linear type */
    linearProgress(): void;
    /** conditional function to check if defined type is radial or linear */
    loadProgress(): void;
    /** progressbar logic for radial type */
    radialProgress(): void;
    /** show description for progress bar */
    showDescription(tempVal: any): any;
    /** show progress as percentage  */
    showPercentageForLinearTooltip(calcVal: any, progressContainer: any, tooltip: any): void;
    /** Render the progress */
    render(): any;
}
