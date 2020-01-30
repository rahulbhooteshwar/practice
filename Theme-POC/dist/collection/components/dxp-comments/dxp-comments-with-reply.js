import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-comments-with-reply */
export class CommentsWithReply {
    constructor() {
        /** count for show more */
        this.stepCount = 1;
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
        this.base.i18Init(dxp, 'CommentsWithReply', messages);
        this.comments = typeof (this.commentObj) === 'string' ? JSON.parse(this.commentObj) : this.commentObj;
        this.showReplySection = false;
    }
    /** click listener for cta button */
    submitHandler(e) {
        if (e.target.getAttribute('btn-id') === 'load-more-replies') {
            this.stepCount++;
        }
    }
    /** click listener after clicking cta from particular comment or reply */
    async updateCommentObj(event) {
        if (event.detail.action === 'reply') {
            this.showReplySection = true;
        }
    }
    /** Functionality to display replies */
    renderList(list) {
        this.lastIndex = (this.repliesLimit * this.stepCount);
        return list.slice(0, this.lastIndex).map(reply => h("dxp-comments-item", { "is-reply": "true", "max-characters": this.maxCharacters, "user-data-container": this.userDataContainer, "userid-key": this.useridKey, "comment-obj": JSON.stringify(reply) }));
    }
    /** Render the comments */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-comments-with-reply render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("dxp-comments-item", { "is-reply": "false", "max-characters": this.maxCharacters, "user-data-container": this.userDataContainer, "userid-key": this.useridKey, "comment-obj": JSON.stringify(this.comments) }),
            (this.comments && this.comments.replies.length) ?
                (h("div", { class: "option-wrapper" },
                    h("a", { href: "javascript : void(0)", "btn-id": "show-all-replies", class: this.showReplySection ? 'hide-link' : 'show-link', onClick: e => {
                            e.preventDefault();
                            this.showReplySection = !this.showReplySection;
                        } },
                        this.showReplySection ?
                            dxp.i18n.t('CommentsWithReply:hideTxt', { repliesCount: this.comments.replies.length })
                            :
                                dxp.i18n.t('CommentsWithReply:showTxt', { repliesCount: this.comments.replies.length }),
                        h("i", { class: "caret-icon" })))) : '',
            (this.showReplySection) ?
                (h("div", { class: "reply-section is-visible" },
                    this.renderList(this.comments.replies),
                    (this.lastIndex < this.comments.replies.length) &&
                        (h("dxp-cta", { type: "button", "button-type": "secondary", "btn-id": "load-more-replies", text: dxp.i18n.t('CommentsWithReply:loadmoreReplies'), onClick: e => this.submitHandler(e) })))) : '',
            h("div", { class: "dxp-clear-fix" })));
    }
    static get is() { return "dxp-comments-with-reply"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-comments-with-reply.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-comments-with-reply.css"]
    }; }
    static get properties() { return {
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
        "repliesLimit": {
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
                "text": "Limit to show replies"
            },
            "attribute": "replies-limit",
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
        "comments": {},
        "dir": {},
        "lastIndex": {},
        "locale": {},
        "showReplySection": {},
        "stepCount": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "commentObj",
            "methodName": "commentChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "ctaClickEvent",
            "method": "submitHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "commentUpdated",
            "method": "updateCommentObj",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
