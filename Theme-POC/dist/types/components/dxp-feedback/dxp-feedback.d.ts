import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** component feedback  */
export declare class Feedback {
    /** averageDisplayElement to display star average */
    averageDisplayElement: HTMLElement;
    /** base component - common functionality */
    base: BaseComponent;
    /** count display element */
    countDisplayElement: HTMLElement;
    /** to hold reference of feedback */
    itemContainer: HTMLElement;
    /** to hold reference to display feedback items  */
    itemContainerDisplay: HTMLElement;
    /** to hold reference to load more div  */
    loadMoreElement: HTMLElement;
    /** to hold reference to average star progress bar  */
    starAverageDisplay: HTMLElement;
    /** to hold reference to textarea  */
    textAreaElement: HTMLElement;
    /** to store text-area value */
    textareaValue: string;
    /** feedback element - utilized by DXP framework */
    element: HTMLElement;
    /** to hold api result values */
    apiResult: any;
    /** holds average values of stars */
    avgStars: any[];
    /** page dir attribute */
    dir: string;
    /** to store feedback item's values */
    feedbackListArray: any[];
    /** feedback item display list */
    feedbackListDisplay: any[];
    /** state of button */
    isSubmitDisabled: boolean;
    /** to hold api result for star count */
    starCountArray: any;
    /** to hold star round off value */
    starFillIndex: any;
    /** step count for load more  */
    stepCount: number;
    /** the component's theme (if any) */
    theme: string;
    /** prop holds api url */
    apiUrl: string;
    /** prop holds app id */
    appId: string;
    /** prop holds content id */
    contentId: string;
    /** feedbackAdditionalText for text area */
    feedbackAdditionalText: string;
    /** feedbackAdditionalTextPlaceholder for text area */
    feedbackAdditionalTextPlaceholder: string;
    /** prop for inject feedback item list */
    feedbackItemList: any[];
    /** prop for feedback-title */
    feedbackTitle: string;
    /** prop to hold the value to show textarea */
    isAdditionalCommentRequired: boolean;
    /** prop holds number of reviews to load more reviews */
    reviewsLimit: number;
    /** prop holds additional comment value */
    textAreaLabel: string;
    /** prop holds username key */
    usernameKey: string;
    /** prop holds username key */
    usernameKeyLocation: 'COOKIE' | 'SESSION' | 'OTHER';
    /** actions to perform before component load */
    componentWillLoad(): void;
    /** actions to perform after component load */
    componentDidLoad(): Promise<void>;
    /** actions to be performed after component update */
    componentDidUpdate(): void;
    /** listen emitted feedback value */
    emittedFeedback(e: any): void;
    /** click listener for cta button */
    submitHandler(e: any): Promise<void>;
    /** Common api service */
    apiService(url: string, queryString?: any): Promise<any>;
    /** method for clearing form */
    clearFeedbackForm(): void;
    /**  feedbackItems data obj */
    feedbackDataChangeHandler(): void;
    /**  feedbackItems display obj */
    feedbackDataDisplay(): void;
    /** get username  */
    getUserName(): string;
    /** handle textarea values */
    handleTextarea(e: any): void;
    /** load feedback from api */
    loadFeedBack(): Promise<void>;
    /** to render stars */
    renderStars(): string;
    /** show average display element that is star */
    showAverageDisplayElement(): void;
    /** show average star rating progress bar */
    showAverageStars(): void;
    /** Render the feedback */
    render(): any;
}
