var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-2df5adb6.js';
var CommentsWithReply = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** count for show more */
        this.stepCount = 1;
        /** prop holds get user id from */
        this.userDataContainer = 'COOKIE';
    }
    /** Listener that looks for commentObj to be assigned/changed externally */
    class_1.prototype.commentChangeHandler = function (updatedObj) {
        this.comments = typeof (updatedObj) === 'string' ? JSON.parse(updatedObj) : updatedObj;
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'CommentsWithReply', messages);
        this.comments = typeof (this.commentObj) === 'string' ? JSON.parse(this.commentObj) : this.commentObj;
        this.showReplySection = false;
    };
    /** click listener for cta button */
    class_1.prototype.submitHandler = function (e) {
        if (e.target.getAttribute('btn-id') === 'load-more-replies') {
            this.stepCount++;
        }
    };
    /** click listener after clicking cta from particular comment or reply */
    class_1.prototype.updateCommentObj = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (event.detail.action === 'reply') {
                    this.showReplySection = true;
                }
                return [2 /*return*/];
            });
        });
    };
    /** Functionality to display replies */
    class_1.prototype.renderList = function (list) {
        var _this = this;
        this.lastIndex = (this.repliesLimit * this.stepCount);
        return list.slice(0, this.lastIndex).map(function (reply) { return h("dxp-comments-item", { "is-reply": "true", "max-characters": _this.maxCharacters, "user-data-container": _this.userDataContainer, "userid-key": _this.useridKey, "comment-obj": JSON.stringify(reply) }); });
    };
    /** Render the comments */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-comments-with-reply render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("dxp-comments-item", { "is-reply": "false", "max-characters": this.maxCharacters, "user-data-container": this.userDataContainer, "userid-key": this.useridKey, "comment-obj": JSON.stringify(this.comments) }), (this.comments && this.comments.replies.length) ?
            (h("div", { class: "option-wrapper" }, h("a", { href: "javascript : void(0)", "btn-id": "show-all-replies", class: this.showReplySection ? 'hide-link' : 'show-link', onClick: function (e) {
                    e.preventDefault();
                    _this.showReplySection = !_this.showReplySection;
                } }, this.showReplySection ?
                dxp.i18n.t('CommentsWithReply:hideTxt', { repliesCount: this.comments.replies.length })
                :
                    dxp.i18n.t('CommentsWithReply:showTxt', { repliesCount: this.comments.replies.length }), h("i", { class: "caret-icon" })))) : '', (this.showReplySection) ?
            (h("div", { class: "reply-section is-visible" }, this.renderList(this.comments.replies), (this.lastIndex < this.comments.replies.length) &&
                (h("dxp-cta", { type: "button", "button-type": "secondary", "btn-id": "load-more-replies", text: dxp.i18n.t('CommentsWithReply:loadmoreReplies'), onClick: function (e) { return _this.submitHandler(e); } })))) : '', h("div", { class: "dxp-clear-fix" })));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "commentObj": ["commentChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-comments-with-reply{margin:.5rem 0 1.75rem}div.dxp.dxp-comments-with-reply .reply-section{margin-left:4rem;display:none;-webkit-transition:all .5s ease-in;transition:all .5s ease-in}div.dxp.dxp-comments-with-reply .reply-section.is-visible{display:block}\@media (max-width:576px){div.dxp.dxp-comments-with-reply .reply-section{margin-left:2rem}}div.dxp.dxp-comments-with-reply .option-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-comments-with-reply .option-wrapper a{display:-ms-flexbox;display:flex}div.dxp.dxp-comments-with-reply .option-wrapper a:hover{text-decoration:underline}div.dxp.dxp-comments-with-reply .option-wrapper a .caret-icon{width:1rem;display:inline-block;margin-left:.75rem;-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}div.dxp.dxp-comments-with-reply .option-wrapper a.hide-link .caret-icon{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}div.dxp.dxp-comments-with-reply .action-link{display:block;padding:.25rem 1.25rem;-webkit-transition:color,background-color .15s ease-in;transition:color,background-color .15s ease-in}div.dxp.dxp-comments-with-reply[dir=rtl] .reply-section{margin-left:0;margin-right:4rem}\@media (max-width:576px){div.dxp.dxp-comments-with-reply[dir=rtl] .reply-section{margin-left:0;margin-right:2rem}}div.dxp.dxp-comments-with-reply[dir=rtl] .option-wrapper a .caret-icon{margin-right:.75rem;margin-left:0}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { CommentsWithReply as dxp_comments_with_reply };
