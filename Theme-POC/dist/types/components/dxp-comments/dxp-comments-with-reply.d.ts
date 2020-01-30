import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-comments-with-reply */
export declare class CommentsWithReply {
    /** base component - common functionality */
    base: BaseComponent;
    /** CommentsWithReply element - utilized by DXP framework */
    element: HTMLElement;
    /** Comment object parsed */
    comments: any;
    /** page dir attribute */
    dir: string;
    /** last index to display */
    lastIndex: number;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** Flag to show/hide reply section */
    showReplySection: boolean;
    /** count for show more */
    stepCount: number;
    /** the component's theme (if any) */
    theme: string;
    /** max-length for comment textarea */
    maxCharacters: number;
    /** Limit to show replies */
    repliesLimit: number;
    /** prop holds get user id from */
    userDataContainer: 'COOKIE' | 'SESSION' | 'OTHER';
    /** prop holds stored user info key name */
    useridKey: any;
    /** comment-obj */
    commentObj: any;
    /** Listener that looks for commentObj to be assigned/changed externally */
    commentChangeHandler(updatedObj: any): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** click listener for cta button */
    submitHandler(e: any): void;
    /** click listener after clicking cta from particular comment or reply */
    updateCommentObj(event: any): Promise<void>;
    /** Functionality to display replies */
    renderList(list: any): any;
    /** Render the comments */
    render(): any;
}
