import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-comments */
export declare class Comments {
    /** Holds api result */
    apiResult: any;
    /** base component - common functionality */
    base: BaseComponent;
    /** holds the count of comments posted */
    commentCount: number;
    /** holds the selected comments id */
    commentId: string;
    /** holds the selected edit mode comments id */
    editCommentId: string;
    /** holds the selected reply link comments id */
    replyCommentId: string;
    /** textArea component */
    textAreaInput: any;
    /** Comments element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** Holds the comment list */
    domComments: any;
    /** last index to display */
    lastIndex: number;
    /** count for show more */
    stepCount: number;
    /** the component's theme (if any) */
    theme: string;
    /** holds user id value */
    userId: any;
    /** holds api end point path */
    apiUrl: string;
    /** prop holds application Id */
    appId: any;
    /** prop Holds comments cancel button text */
    cancelText: string;
    /** Holds comments content id */
    commentContentId: string;
    /** Limit to show comments */
    commentsLimit: number;
    /** comment value in the text area */
    commentText: any;
    /** max-length for comment textarea */
    maxCharacters: number;
    /** mock comment json url */
    mockcommentUrl: string;
    /** prop holds needs of moderation value */
    needsModeration: boolean;
    /** Limit to show replies */
    repliesLimit: number;
    /** prop holds comments submit button text */
    submitText: string;
    /** prop holds comment textarea placeholder text */
    textareaPlaceholder: string;
    /** prop holds get user id from */
    userDataContainer: 'COOKIE' | 'SESSION' | 'OTHER';
    /** prop holds stored user info key name */
    useridKey: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** listen click from action menu */
    clickActionMenuHandler(e: any): void;
    /** listen click from edit comment/reply action */
    clickEditCommentHandler(e: any): void;
    /** method for listen click */
    clickHandler(): void;
    /** listen click from reply link */
    clickReplyCommentHandler(e: any): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** click listener for cta button */
    submitHandler(e: any): Promise<void>;
    /** click listener of textarea */
    textAreaValueHandler(event: any): void;
    /** click listener after clicking cta from particular comment or reply */
    updateCommentObj(event: any): Promise<void>;
    /** Add comment api call */
    addComment(commentText: string): Promise<any>;
    /** Add comment api call */
    addReply(replyText: string, replyof: string): Promise<any>;
    /** Common api service */
    apiService(url: string, queryString?: any): Promise<any>;
    /** Function decide from where to get user detail */
    config(): boolean;
    /** Convert api date in custom format */
    convertDate(date: string): any;
    /** Delete comment api call */
    deleteComment(id: string): Promise<any>;
    /** Delete reply api call */
    deleteReply(id: string, replyid: string): Promise<any>;
    /** Edit comment api call */
    editComment(id: string, commentText: string): Promise<any>;
    /** Edit reply api call */
    editReply(id: string, replyid: string, replyText: string): Promise<any>;
    /** Populate list of comment */
    fetchComment(): Promise<any>;
    /** Get user detail form cookie */
    getCookie(name: any): string;
    /** Handle api response */
    handleApiResponse(action?: string, text?: string, id?: string, replyid?: string): Promise<void>;
    /** Handle header */
    handleHeaders(type?: string): {
        [key: string]: any;
    };
    /** Handle mock comments */
    handleMockResponse(): Promise<void>;
    /** Functionality to display comments */
    renderList(list: any): any;
    /** Render the comments */
    render(): any;
}
