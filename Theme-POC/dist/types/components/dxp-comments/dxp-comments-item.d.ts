import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-comments-item */
export declare class CommentsItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** parsed commentObj data */
    comments: any;
    /** Edit/Delete section */
    editDeleteSection: HTMLDivElement;
    /** textArea section */
    updateSection: HTMLDivElement;
    /** CommentsItem element - utilized by DXP framework */
    element: HTMLElement;
    /** current user-id */
    currentUserId: string;
    /** page dir attribute */
    dir: string;
    /** comment text separated using delimiter */
    seperatedReplyText: string;
    /** userId separated using delimiter */
    seperatedUserId: string;
    /** textarea placeholder */
    textareaPlaceholder: string;
    /** the component's theme (if any) */
    theme: string;
    /** set action menu is click */
    isActionMenuActive: boolean;
    /** Flag to identify textarea opened for edit reply */
    isOpenedForEditReply: boolean;
    /** Flag to identify textarea opened for reply to comment */
    isOpenedForReply: boolean;
    /** Flag to identify comment or reply */
    isReply: boolean;
    /** set reply link is active on click */
    isReplyLinkActive: boolean;
    /** max-length for comment textarea */
    maxCharacters: number;
    /** prop holds get user id from */
    userDataContainer: 'COOKIE' | 'SESSION' | 'OTHER';
    /** prop holds stored user info key name */
    useridKey: any;
    /** comment-obj */
    commentObj: any;
    /** Listener that looks for commentObj to be assigned/changed externally */
    commentChangeHandler(updatedObj: any): void;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** Event to emit when click action menu */
    clickActionMenu: EventEmitter<{}>;
    /** Event to emit when click action menu */
    clickEditComment: EventEmitter<{}>;
    /** Event to emit when click reply link */
    clickReplyComment: EventEmitter<{}>;
    /** Event to emit when changing current page */
    commentUpdated: EventEmitter<{}>;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after to component load */
    componentDidLoad(): void;
    /** click listener on click primary button of modal */
    primaryActionHandler(): Promise<void>;
    /** click listener for cta button */
    submitHandler(e: any): Promise<void>;
    /** Action cancel link click */
    actionCancelComment(e: any): void;
    /** Action delete link click */
    actionDeleteComment(e: any): void;
    /** Action edit link click */
    actionEditComment(e: any): void;
    /** Action send link click */
    actionSendComment(e: any): void;
    /** Reply to comment */
    commentReply(): any;
    /** Function decide from where to get user detail */
    config(): boolean;
    /** emit analytics data */
    emitAnalyticsData(analyticsObj: any): void;
    /** Get user detail form cookie */
    getCookie(name: any): string;
    /** Set updated section to Add/Edit mode */
    setMode(): void;
    /** Functionality to display replies */
    showSeparatedComment(repliedString: any): any;
    /** Hide/show editDelete section */
    toggleClick(e: any): void;
    /** Render the comments */
    render(): any;
}
