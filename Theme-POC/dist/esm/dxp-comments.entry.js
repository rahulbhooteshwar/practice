import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-2df5adb6.js';

const IS_VISIBLE = 'is-visible';
const HANDLE_API_RESPONSE = 'handleApiResponse()';
const ERROR_OCCURRED = 'Some error occurred';
const Comments = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Holds api result */
        this.apiResult = [];
        /** Holds the comment list */
        this.domComments = [];
        /** count for show more */
        this.stepCount = 1;
        /** prop holds get user id from */
        this.userDataContainer = 'COOKIE';
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Comments', messages);
        this.config();
        if (this.apiUrl) {
            await this.handleApiResponse();
        }
        else if (this.mockcommentUrl) {
            await this.handleMockResponse();
        }
    }
    /** listen click from action menu */
    clickActionMenuHandler(e) {
        this.commentId = (e.detail.commentId) ? e.detail.commentId : '';
    }
    /** listen click from edit comment/reply action */
    clickEditCommentHandler(e) {
        this.editCommentId = (e.detail.commentId) ? e.detail.commentId : '';
    }
    /** method for listen click */
    clickHandler() {
        const dxpComments = this.element.querySelectorAll('dxp-comments-with-reply');
        dxpComments.forEach((elm) => {
            const dxpCommentItems = elm.querySelectorAll('dxp-comments-item');
            dxpCommentItems.forEach((item) => {
                const dxpCommentItem = (typeof item['commentObj'] === 'string') ? JSON.parse(item['commentObj']) : item['commentObj'];
                const actionMenu = item.querySelector('.action-list-wrapper');
                if (actionMenu !== null) {
                    if (dxpCommentItem.id !== this.commentId) {
                        item['isActionMenuActive'] = false;
                        actionMenu.classList.remove(IS_VISIBLE);
                    }
                    else {
                        item['isActionMenuActive'] = true;
                        actionMenu.classList.add(IS_VISIBLE);
                    }
                }
                const updateSection = item.querySelector('.reply-textarea');
                if (dxpCommentItem.id === this.editCommentId) {
                    // Show edit mode for comment (update section)
                    updateSection.classList.remove('dxp-none');
                    updateSection.classList.add('dxp-flex');
                    item['isOpenedForEditReply'] = true;
                    item['isOpenedForReply'] = false;
                    item['isReplyLinkActive'] = false;
                    updateSection.classList.remove('reply-section');
                }
                else if (dxpCommentItem.id === this.replyCommentId) {
                    // Show replay add mode for reply/comment (update section)
                    updateSection.classList.remove('dxp-none');
                    updateSection.classList.add('reply-section');
                    item['isOpenedForEditReply'] = false;
                    item['isOpenedForReply'] = true;
                    item['isReplyLinkActive'] = true;
                    updateSection.classList.remove('dxp-flex');
                }
                else {
                    // Reset to view mode for comment/reply (update section)
                    updateSection.classList.remove('dxp-flex');
                    updateSection.classList.add('dxp-none');
                    item['isOpenedForReply'] = false;
                    item['isOpenedForEditReply'] = false;
                    item['isReplyLinkActive'] = false;
                    updateSection.classList.remove('reply-section');
                }
            });
        });
        this.commentId = '';
        this.editCommentId = '';
        this.replyCommentId = '';
    }
    /** listen click from reply link */
    clickReplyCommentHandler(e) {
        this.replyCommentId = (e.detail.commentId) ? e.detail.commentId : '';
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** click listener for cta button */
    async submitHandler(e) {
        if (e.target.getAttribute('btn-id') === 'submitButton') {
            if (this.commentText) {
                await this.handleApiResponse('add', this.commentText);
                this.commentText = '';
            }
        }
        else if (e.target.getAttribute('btn-id') === 'load-more-comments') {
            this.stepCount++;
        }
        if (this.textAreaInput && this.textAreaInput) {
            this.textAreaInput.querySelector('textarea').value = '';
        }
    }
    /** click listener of textarea */
    textAreaValueHandler(event) {
        this.commentText = event.detail.value;
    }
    /** click listener after clicking cta from particular comment or reply */
    async updateCommentObj(event) {
        if (event && event.detail) {
            if (event.detail.action === 'delete') {
                if (event.detail.isReplied) {
                    await this.handleApiResponse('replyDelete', '', event.detail.replyOf, event.detail.commentId);
                }
                else {
                    await this.handleApiResponse('delete', '', event.detail.commentId);
                }
            }
            else if (event.detail.action === 'edit') {
                if (event.detail.isReplied) {
                    await this.handleApiResponse('replyEdit', event.detail.updatedText, event.detail.replyOf, event.detail.commentId);
                }
                else {
                    await this.handleApiResponse('edit', event.detail.updatedText, event.detail.commentId);
                }
            }
            else if (event.detail.action === 'reply') {
                await this.handleApiResponse('replyAdd', event.detail.updatedText, event.detail.commentId);
            }
        }
    }
    /** Add comment api call */
    async addComment(commentText) {
        const data = {
            appId: this.appId,
            contentId: this.commentContentId,
            text: commentText,
            createdBy: this.userId,
            needsModeration: 0
        };
        const header = this.handleHeaders();
        const dataQueryString = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        };
        const url = `${this.apiUrl}/comment`;
        return this.apiService(url, dataQueryString);
    }
    /** Add comment api call */
    async addReply(replyText, replyof) {
        const data = {
            commentId: replyof,
            comment: {
                text: replyText,
                createdBy: this.userId,
                needsModeration: 0,
                replyOf: replyof
            }
        };
        const header = this.handleHeaders();
        const dataQueryString = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        };
        const url = `${this.apiUrl}/reply`;
        return this.apiService(url, dataQueryString);
    }
    /** Common api service */
    async apiService(url, queryString) {
        if (queryString && queryString !== '') {
            return dxp.api(url, queryString);
        }
        return dxp.api(url);
    }
    /** Function decide from where to get user detail */
    config() {
        if (this.userDataContainer && this.userDataContainer === 'COOKIE' && this.getCookie(this.useridKey)) {
            this.userId = this.getCookie(this.useridKey);
            return true;
        }
        if (this.userDataContainer && this.userDataContainer === 'SESSION' && (sessionStorage.getItem(this.useridKey))) {
            this.userId = sessionStorage.getItem(this.useridKey);
            return true;
        }
        if (this.userDataContainer && this.userDataContainer === 'OTHER') {
            this.userId = 'Other';
            return true;
        }
        this.userId = 'Anonymous';
        return true;
    }
    /** Convert api date in custom format */
    convertDate(date) {
        return dxp.moment(`${date.replace('T', ' ')}Z`).fromNow();
    }
    /** Delete comment api call */
    async deleteComment(id) {
        const data = {
            commentId: id,
            userId: this.userId
        };
        const header = this.handleHeaders();
        const dataQueryString = {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        };
        const url = `${this.apiUrl}/comment/delete`;
        return this.apiService(url, dataQueryString);
    }
    /** Delete reply api call */
    async deleteReply(id, replyid) {
        const data = {
            commentId: id,
            userId: this.userId,
            replyId: replyid
        };
        const header = this.handleHeaders();
        const dataQueryString = {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        };
        const url = `${this.apiUrl}/reply/delete`;
        return this.apiService(url, dataQueryString);
    }
    /** Edit comment api call */
    async editComment(id, commentText) {
        const data = {
            commentId: id,
            userId: this.userId,
            comment: {
                text: commentText,
                needsModeration: 0
            }
        };
        const header = this.handleHeaders();
        const dataQueryString = {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        };
        const url = `${this.apiUrl}/comment`;
        return this.apiService(url, dataQueryString);
    }
    /** Edit reply api call */
    async editReply(id, replyid, replyText) {
        const data = {
            commentId: id,
            replyId: replyid,
            userId: this.userId,
            comment: {
                text: replyText,
                needsModeration: 0
            }
        };
        const header = this.handleHeaders();
        const dataQueryString = {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        };
        const url = `${this.apiUrl}/reply`;
        return this.apiService(url, dataQueryString);
    }
    /** Populate list of comment */
    async fetchComment() {
        const header = this.handleHeaders('GET');
        const dataQueryString = {
            method: 'GET',
            headers: header
        };
        const url = `${this.apiUrl}/comment`;
        return this.apiService(url, dataQueryString);
    }
    /** Get user detail form cookie */
    getCookie(name) {
        const nameEQ = `${name}=`;
        const tempVariable = document.cookie.split(';');
        for (const element of tempVariable) {
            let cookie = element;
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return undefined;
    }
    /** Handle api response */
    async handleApiResponse(action, text, id, replyid) {
        if (action === 'add') {
            await this.addComment(text).then(result => {
                this.apiResult = result;
                if (this.apiResult) {
                    this.apiResult['commentConvertedTime'] = this.convertDate(this.apiResult.createdDate);
                    this.domComments = [this.apiResult, ...this.domComments];
                    this.commentCount = this.domComments.length;
                }
                dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Comment list after Add comment:`, this.domComments);
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
        else if (action === 'edit') {
            await this.editComment(id, text).then(result => {
                this.apiResult = result;
                if (this.apiResult) {
                    this.apiResult['commentConvertedTime'] = this.convertDate(this.apiResult.updatedDate);
                    this.domComments = this.domComments
                        .map((comment) => {
                        if (comment.id === id) {
                            this.apiResult.replies = this.apiResult.replies.map((reply) => {
                                reply['commentConvertedTime'] = this.convertDate(reply.createdDate);
                                return reply;
                            });
                            return this.apiResult;
                        }
                        return comment;
                    });
                    this.commentCount = this.domComments.length;
                    dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Edit Comment list after edit comment:`, this.domComments);
                }
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
        else if (action === 'delete') {
            await this.deleteComment(id).then(result => {
                this.apiResult = result;
                if (this.apiResult) {
                    this.domComments = this.domComments
                        .map((comment) => comment)
                        .filter((comment) => (comment.id !== id));
                    this.commentCount = this.domComments.length;
                    dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Comment list after delete comment:`, this.domComments);
                }
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
        else if (action === 'replyAdd') {
            await this.addReply(text, id).then(result => {
                this.apiResult = result;
                if (this.apiResult) {
                    this.apiResult['commentConvertedTime'] = this.convertDate(this.apiResult.createdDate);
                    this.domComments = this.domComments
                        .map((comment) => {
                        if (comment.id === id) {
                            comment.replies = [...comment.replies, this.apiResult];
                            return comment;
                        }
                        return comment;
                    });
                    this.commentCount = this.domComments.length;
                }
                dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Comment list after Add reply:`, this.domComments);
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
        else if (action === 'replyEdit') {
            await this.editReply(id, replyid, text).then(result => {
                this.apiResult = result;
                if (this.apiResult) {
                    this.apiResult['commentConvertedTime'] = this.convertDate(this.apiResult.updatedDate);
                    this.domComments = this.domComments
                        .map((comment) => {
                        if (comment.id === id) {
                            comment.replies = comment.replies.map((reply) => ((reply.id === replyid) ? this.apiResult : reply));
                        }
                        return comment;
                    });
                    this.commentCount = this.domComments.length;
                }
                dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Comment list after Edit reply:`, this.domComments);
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
        else if (action === 'replyDelete') {
            await this.deleteReply(id, replyid).then(result => {
                this.apiResult = result;
                if (this.apiResult) {
                    this.domComments = this.domComments
                        .map((comment) => {
                        if (comment.id === id) {
                            comment.replies = comment.replies.map((reply) => reply)
                                .filter((reply) => (reply.id !== replyid));
                        }
                        return comment;
                    });
                    this.commentCount = this.domComments.length;
                    dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Comment list after delete reply:`, this.domComments);
                }
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
        else { // Get action
            await this.fetchComment().then(result => {
                this.apiResult = result;
                if (this.apiResult.length > 0) {
                    let tempComment = this.apiResult.map((comment) => {
                        comment['commentConvertedTime'] = this.convertDate(comment.updatedDate ? comment.updatedDate : comment.createdDate);
                        comment.replies = comment.replies.map((reply) => {
                            reply['commentConvertedTime'] = this.convertDate(reply.updatedDate ? reply.updatedDate : reply.createdDate);
                            return reply;
                        });
                        return comment;
                    });
                    tempComment = tempComment.reverse();
                    this.domComments = [...tempComment, ...this.domComments];
                    this.commentCount = this.domComments.length;
                }
                dxp.log.info(this.element.tagName, HANDLE_API_RESPONSE, `Fetch approved comment:`, this.domComments);
            }).catch(err => {
                dxp.log.error(this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
            });
        }
    }
    /** Handle header */
    handleHeaders(type) {
        const headerObj = {};
        headerObj['Content-Type'] = 'application/json';
        if (type === 'GET') {
            headerObj['appId'] = this.appId;
            headerObj['contentId'] = this.commentContentId;
        }
        return headerObj;
    }
    /** Handle mock comments */
    async handleMockResponse() {
        this.domComments = await this.apiService(this.mockcommentUrl);
        this.commentCount = this.domComments.length;
    }
    /** Functionality to display comments */
    renderList(list) {
        this.lastIndex = (this.commentsLimit * this.stepCount);
        return list.slice(0, this.lastIndex).map(item => h("dxp-comments-with-reply", { "userid-key": this.useridKey, "user-data-container": this.userDataContainer, "replies-limit": this.repliesLimit, "max-characters": this.maxCharacters, "comment-obj": JSON.stringify(item) }));
    }
    /** Render the comments */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-comments render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-comments.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "comment-count" }, (this.domComments.length) ?
            h("h3", null, this.commentCount, " ", (this.commentCount > 1) ? dxp.i18n.t('Comments:multipleCommentsText') : dxp.i18n.t('Comments:singleCommentText'))
            :
                ''), h("dxp-textarea", { label: dxp.i18n.t('Comments:textarealabel'), ref: el => this.textAreaInput = el, placeholder: this.textareaPlaceholder ? this.textareaPlaceholder : dxp.i18n.t('Comments:commentplaceholder'), "max-length": this.maxCharacters, required: false }), h("div", { class: "comment-hint" }, dxp.i18n.t('Comments:commentHint', { maxlength: this.maxCharacters })), h("div", { class: "editable-block" }, h("dxp-cta-list", { "title-text": "", orientation: "horizontal" }, h("dxp-cta", { type: "button", "btn-id": "submitButton", "button-type": "primary", text: this.submitText ? this.submitText : dxp.i18n.t('Comments:submit'), onClick: e => this.submitHandler(e) }), h("dxp-cta", { type: "button", "btn-id": "cancelButton", "button-type": "secondary", text: this.cancelText ? this.cancelText : dxp.i18n.t('Comments:cancel'), onClick: e => this.submitHandler(e) }))), h("div", { class: "comment-list" }, this.domComments.length ? this.renderList(this.domComments) : '', (this.lastIndex < this.commentCount) &&
            (h("dxp-cta", { type: "button", "btn-id": "load-more-comments", "button-type": "secondary", text: dxp.i18n.t('Comments:loadmoreComments'), onClick: e => this.submitHandler(e) })))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-comments{padding:.5rem}div.dxp.dxp-comments .editable-block{margin-top:1rem}div.dxp.dxp-comments .comment-count{margin:2rem 0;clear:both}div.dxp.dxp-comments .comment-count h3{direction:ltr;display:inline-block}div.dxp.dxp-comments .comment-hint{margin:.5rem 0}div.dxp.dxp-comments .comment-list{margin-top:1.25rem}"; }
};

export { Comments as dxp_comments };
