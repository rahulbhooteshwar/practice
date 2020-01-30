import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const COMMENTS_ITEM_EDIT = 'CommentsItem:edit';
const COMMENTS_ITEM_DELETE = 'CommentsItem:delete';
/** dxp-comments-item */
export class CommentsItem {
    constructor() {
        /** textarea placeholder */
        this.textareaPlaceholder = '';
        /** prop holds get user id from */
        this.userDataContainer = 'COOKIE';
    }
    /** Listener that looks for commentObj to be assigned/changed externally */
    commentChangeHandler(updatedObj) {
        this.comments = typeof (updatedObj) === 'string' ? JSON.parse(updatedObj) : updatedObj;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'CommentsItem', messages);
        this.comments = typeof (this.commentObj) === 'string' ? JSON.parse(this.commentObj) : this.commentObj;
        this.config();
    }
    /** actions to be performed after to component load */
    componentDidLoad() {
        if (this.updateSection) {
            this.updateSection.classList.add('dxp-none');
        }
    }
    /** click listener on click primary button of modal */
    async primaryActionHandler() {
        this.commentUpdated.emit({ 'action': 'delete', 'commentId': this.comments.id, 'isReplied': this.isReply, 'replyOf': this.comments.replyOf });
        await this.element.querySelector('dxp-modal').closeModal();
    }
    /** click listener for cta button */
    async submitHandler(e) {
        const textAreaInput = this.updateSection.querySelector('textarea');
        if (e.target.getAttribute('btn-id') === 'replyLink' && !this.isReplyLinkActive) {
            this.clickReplyComment.emit({ commentId: this.comments.id });
            this.textareaPlaceholder = dxp.i18n.t('CommentsItem:replyplaceholder');
            textAreaInput.value = '';
        }
    }
    /** Action cancel link click */
    actionCancelComment(e) {
        e.preventDefault();
        this.emitAnalyticsData({
            'di_comp_name': e.path[0].tagName,
            'di_comp_title': e.target.getAttribute('title'),
            'di_comp_cta': e.target.getAttribute('btn-id')
        });
    }
    /** Action delete link click */
    actionDeleteComment(e) {
        e.preventDefault();
        this.element.querySelector('dxp-modal').openModal();
        this.emitAnalyticsData({
            'di_comp_name': e.path[0].tagName,
            'di_comp_title': e.target.getAttribute('title'),
            'di_comp_cta': e.target.getAttribute('btn-id')
        });
    }
    /** Action edit link click */
    actionEditComment(e) {
        e.preventDefault();
        const textAreaInput = this.updateSection.querySelector('textarea');
        this.clickEditComment.emit({ commentId: this.comments.id });
        textAreaInput.value = this.seperatedReplyText;
        this.emitAnalyticsData({
            'di_comp_name': e.path[0].tagName,
            'di_comp_title': e.target.getAttribute('title'),
            'di_comp_cta': e.target.getAttribute('btn-id')
        });
    }
    /** Action send link click */
    actionSendComment(e) {
        e.preventDefault();
        const textAreaInput = this.updateSection.querySelector('textarea');
        if (textAreaInput.value.trim()) {
            if (this.updateSection.classList.contains('reply-section')) {
                const commentTextPrependUserId = `${this.comments.createdBy}_~${textAreaInput.value}`;
                const replyToId = this.isReply ? this.comments.replyOf : this.comments.id;
                this.commentUpdated.emit({ 'action': 'reply', 'commentId': replyToId, 'isReplied': this.isReply, 'updatedText': commentTextPrependUserId });
            }
            else {
                this.commentUpdated.emit({
                    'action': 'edit', 'commentId': this.comments.id, 'isReplied': this.isReply,
                    'replyOf': this.comments.replyOf, 'updatedText': textAreaInput.value
                });
            }
        }
        else {
            e.stopPropagation();
        }
        this.emitAnalyticsData({
            'di_comp_name': e.path[0].tagName,
            'di_comp_title': e.target.getAttribute('title'),
            'di_comp_cta': e.target.getAttribute('btn-id')
        });
    }
    /** Reply to comment */
    commentReply() {
        return (h("div", { class: "reply-textarea", ref: el => this.updateSection = el },
            h("div", { class: "reply-to-user-id" },
                (this.isReply || (!this.isReply && this.isOpenedForReply)) ? dxp.i18n.t('CommentsItem:replyingToText') : '',
                h("b", null, (this.isOpenedForReply) ?
                    (this.comments.createdBy) :
                    (this.seperatedUserId))),
            h("div", { class: "textarea-wrapper dxp-flex" },
                h("textarea", { rows: 1, placeholder: this.textareaPlaceholder, class: "comment-edit", maxlength: this.maxCharacters, onClick: () => this.setMode() }, this.seperatedReplyText),
                h("a", { class: "cancel-btn dxp-inline-block", "btn-id": "cancelLink", title: dxp.i18n.t('CommentsItem:cancelReply'), href: "javascript : void(0)", role: "link", "aria-label": dxp.i18n.t('CommentsItem:cancelReply'), onClick: e => this.actionCancelComment(e) })),
            h("a", { class: "send-btn dxp-inline-block", "btn-id": "updateLink", title: dxp.i18n.t('CommentsItem:sendReply'), href: "javascript : void(0)", role: "link", "aria-label": dxp.i18n.t('CommentsItem:sendReply'), onClick: e => this.actionSendComment(e) })));
    }
    /** Function decide from where to get user detail */
    config() {
        if (this.userDataContainer && this.userDataContainer === 'COOKIE' && this.getCookie(this.useridKey)) {
            this.currentUserId = this.getCookie(this.useridKey);
            return true;
        }
        if (this.userDataContainer && this.userDataContainer === 'SESSION' && (sessionStorage.getItem(this.useridKey))) {
            this.currentUserId = sessionStorage.getItem(this.useridKey);
            return true;
        }
        if (this.userDataContainer && this.userDataContainer === 'OTHER') {
            this.currentUserId = 'Other';
            return true;
        }
        this.currentUserId = 'Anonymous';
        return true;
    }
    /** emit analytics data */
    emitAnalyticsData(analyticsObj) {
        this.analyticsDataEmitter.emit(analyticsObj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsObj);
    }
    /** Get user detail form cookie */
    getCookie(name) {
        const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
        return v ? v[2] : undefined;
    }
    /** Set updated section to Add/Edit mode */
    setMode() {
        if (this.comments) {
            if (this.isOpenedForReply) {
                // Set reply to add mode
                this.clickReplyComment.emit({ commentId: this.comments.id });
            }
            else {
                // Set comment/reply to edit mode
                this.clickEditComment.emit({ commentId: this.comments.id });
            }
        }
    }
    /** Functionality to display replies */
    showSeparatedComment(repliedString) {
        if (this.isReply && repliedString.indexOf('_~') !== -1) {
            this.seperatedUserId = repliedString.split(/_~(.+)/)[0];
            this.seperatedReplyText = repliedString.split(/_~(.+)/)[1];
        }
        else {
            this.seperatedReplyText = repliedString;
        }
        return (h("div", { class: "added-comment" },
            this.seperatedUserId && this.seperatedUserId.length && h("span", { class: "seperated-user-id" }, this.seperatedUserId),
            this.seperatedReplyText));
    }
    /** Hide/show editDelete section */
    toggleClick(e) {
        if (this.comments && !this.isActionMenuActive) {
            this.clickActionMenu.emit({ commentId: this.comments.id });
        }
        e.preventDefault();
    }
    /** Render the comments */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-comments.min.css` })]
        ];
        return (h("div", null, (this.comments ?
            h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
                styles,
                h("div", { class: "comment-section", "data-comment-id": this.comments.id },
                    h("div", { class: "comment-header-block" },
                        h("div", { class: "profile-block" },
                            h("div", { class: `profile-icon ${(this.currentUserId === this.comments.createdBy) ? 'logged-in' : ''} ` })),
                        h("div", { class: "detail-block" },
                            h("div", { class: "comment-user" }, this.comments.createdBy),
                            h("div", { class: "comment-time" }, this.comments.commentConvertedTime)),
                        (this.currentUserId === this.comments.createdBy)
                            ? (h("div", { class: "action-menu" },
                                h("a", { href: "javascript : void(0)", class: "action-dots", onClick: e => this.toggleClick(e), "aria-label": dxp.i18n.t('CommentsItem:actionMenu') }),
                                h("div", { class: "action-list-wrapper", ref: el => this.editDeleteSection = el },
                                    h("div", { class: "action-list" },
                                        h("div", { class: "action-arrow" }),
                                        h("span", { class: "action-link" },
                                            h("a", { "btn-id": "editLink", href: "javascript : void(0)", role: "link", "aria-label": dxp.i18n.t(COMMENTS_ITEM_EDIT), title: dxp.i18n.t(COMMENTS_ITEM_EDIT), onClick: e => this.actionEditComment(e) },
                                                h("i", { class: "btn-icon edit-icon" }),
                                                dxp.i18n.t(COMMENTS_ITEM_EDIT))),
                                        h("span", { class: "action-link" },
                                            h("a", { "btn-id": "deleteLink", href: "javascript : void(0)", role: "link", "aria-label": dxp.i18n.t(COMMENTS_ITEM_DELETE), title: dxp.i18n.t(COMMENTS_ITEM_DELETE), onClick: e => this.actionDeleteComment(e) },
                                                h("i", { class: "btn-icon delete-icon" }),
                                                dxp.i18n.t(COMMENTS_ITEM_DELETE))))))) : ''),
                    (!this.isOpenedForEditReply) ? this.showSeparatedComment(this.comments.text) : '',
                    (!this.isOpenedForEditReply) &&
                        h("div", { class: "options-wrapper" },
                            h("div", { class: "dxp-inline-block" },
                                h("dxp-cta", { type: "link", "btn-id": "replyLink", tabindex: "0", text: dxp.i18n.t('CommentsItem:reply') })),
                            h("div", { class: "arrange-right dxp-inline-block" })),
                    this.commentReply(),
                    h("div", { class: "dxp-clear-fix" }),
                    h("dxp-modal", { "modal-title": dxp.i18n.t('CommentsItem:deleteModalTitle'), "modal-description": dxp.i18n.t('CommentsItem:deleteModalDescription'), "is-cancel-button-require": "true", "footer-type": "one-button", "primary-button-text": dxp.i18n.t('CommentsItem:deleteModalPrimaryBtnTxt') })))
            : '')));
    }
    static get is() { return "dxp-comments-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-comments-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-comments-item.css"]
    }; }
    static get properties() { return {
        "isActionMenuActive": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "set action menu is click"
            },
            "attribute": "is-action-menu-active",
            "reflect": false
        },
        "isOpenedForEditReply": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Flag to identify textarea opened for edit reply"
            },
            "attribute": "is-opened-for-edit-reply",
            "reflect": false
        },
        "isOpenedForReply": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Flag to identify textarea opened for reply to comment"
            },
            "attribute": "is-opened-for-reply",
            "reflect": false
        },
        "isReply": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Flag to identify comment or reply"
            },
            "attribute": "is-reply",
            "reflect": false
        },
        "isReplyLinkActive": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "set reply link is active on click"
            },
            "attribute": "is-reply-link-active",
            "reflect": false
        },
        "maxCharacters": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "max-length for comment textarea"
            },
            "attribute": "max-characters",
            "reflect": false
        },
        "userDataContainer": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'COOKIE' | 'SESSION' | 'OTHER'",
                "resolved": "\"COOKIE\" | \"OTHER\" | \"SESSION\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "prop holds get user id from"
            },
            "attribute": "user-data-container",
            "reflect": false,
            "defaultValue": "'COOKIE'"
        },
        "useridKey": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "prop holds stored user info key name"
            },
            "attribute": "userid-key",
            "reflect": false
        },
        "commentObj": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "comment-obj"
            },
            "attribute": "comment-obj",
            "reflect": false
        }
    }; }
    static get states() { return {
        "currentUserId": {},
        "dir": {},
        "seperatedReplyText": {},
        "seperatedUserId": {},
        "textareaPlaceholder": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickActionMenu",
            "name": "clickActionMenu",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit when click action menu"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "clickEditComment",
            "name": "clickEditComment",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit when click action menu"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "clickReplyComment",
            "name": "clickReplyComment",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit when click reply link"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }, {
            "method": "commentUpdated",
            "name": "commentUpdated",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event to emit when changing current page"
            },
            "complexType": {
                "original": "{}",
                "resolved": "{}",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "commentObj",
            "methodName": "commentChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "modalPrimaryButtonAction",
            "method": "primaryActionHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "ctaClickEvent",
            "method": "submitHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
