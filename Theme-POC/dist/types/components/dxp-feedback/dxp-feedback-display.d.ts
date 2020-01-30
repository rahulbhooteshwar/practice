import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** component feedback-group  */
export declare class FeedbackDisplay {
    /** base component - common functionality */
    base: BaseComponent;
    /** to hold reference of feedback */
    itemContainer: HTMLElement;
    /** to store text-area rating */
    textareaRating: string;
    /** feedback element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** prop holds fetch path value for API */
    displayUserName: string;
    /** prop holds additional comment */
    feedbackAdditionalText: string;
    /** prop holds feedback value */
    feedbackValue: any;
    /** prop holds cta value */
    starCount: number;
    /** prop holds timestamp value */
    timeStamp: any;
    /** actions to perform before component load */
    componentWillLoad(): void;
    /** to render stars */
    renderStars(): any[];
    /** Render the feedback */
    render(): any;
}
