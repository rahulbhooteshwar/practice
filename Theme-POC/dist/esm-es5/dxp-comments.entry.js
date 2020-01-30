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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-2df5adb6.js';
var IS_VISIBLE = 'is-visible';
var HANDLE_API_RESPONSE = 'handleApiResponse()';
var ERROR_OCCURRED = 'Some error occurred';
var Comments = /** @class */ (function () {
    function class_1(hostRef) {
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
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'Comments', messages);
                        this.config();
                        if (!this.apiUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handleApiResponse()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.mockcommentUrl) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.handleMockResponse()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** listen click from action menu */
    class_1.prototype.clickActionMenuHandler = function (e) {
        this.commentId = (e.detail.commentId) ? e.detail.commentId : '';
    };
    /** listen click from edit comment/reply action */
    class_1.prototype.clickEditCommentHandler = function (e) {
        this.editCommentId = (e.detail.commentId) ? e.detail.commentId : '';
    };
    /** method for listen click */
    class_1.prototype.clickHandler = function () {
        var _this = this;
        var dxpComments = this.element.querySelectorAll('dxp-comments-with-reply');
        dxpComments.forEach(function (elm) {
            var dxpCommentItems = elm.querySelectorAll('dxp-comments-item');
            dxpCommentItems.forEach(function (item) {
                var dxpCommentItem = (typeof item['commentObj'] === 'string') ? JSON.parse(item['commentObj']) : item['commentObj'];
                var actionMenu = item.querySelector('.action-list-wrapper');
                if (actionMenu !== null) {
                    if (dxpCommentItem.id !== _this.commentId) {
                        item['isActionMenuActive'] = false;
                        actionMenu.classList.remove(IS_VISIBLE);
                    }
                    else {
                        item['isActionMenuActive'] = true;
                        actionMenu.classList.add(IS_VISIBLE);
                    }
                }
                var updateSection = item.querySelector('.reply-textarea');
                if (dxpCommentItem.id === _this.editCommentId) {
                    // Show edit mode for comment (update section)
                    updateSection.classList.remove('dxp-none');
                    updateSection.classList.add('dxp-flex');
                    item['isOpenedForEditReply'] = true;
                    item['isOpenedForReply'] = false;
                    item['isReplyLinkActive'] = false;
                    updateSection.classList.remove('reply-section');
                }
                else if (dxpCommentItem.id === _this.replyCommentId) {
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
    };
    /** listen click from reply link */
    class_1.prototype.clickReplyCommentHandler = function (e) {
        this.replyCommentId = (e.detail.commentId) ? e.detail.commentId : '';
    };
    /** click listener for routing events on anchor tag */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** click listener for cta button */
    class_1.prototype.submitHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(e.target.getAttribute('btn-id') === 'submitButton')) return [3 /*break*/, 3];
                        if (!this.commentText) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handleApiResponse('add', this.commentText)];
                    case 1:
                        _a.sent();
                        this.commentText = '';
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        if (e.target.getAttribute('btn-id') === 'load-more-comments') {
                            this.stepCount++;
                        }
                        _a.label = 4;
                    case 4:
                        if (this.textAreaInput && this.textAreaInput) {
                            this.textAreaInput.querySelector('textarea').value = '';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** click listener of textarea */
    class_1.prototype.textAreaValueHandler = function (event) {
        this.commentText = event.detail.value;
    };
    /** click listener after clicking cta from particular comment or reply */
    class_1.prototype.updateCommentObj = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event && event.detail)) return [3 /*break*/, 12];
                        if (!(event.detail.action === 'delete')) return [3 /*break*/, 5];
                        if (!event.detail.isReplied) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handleApiResponse('replyDelete', '', event.detail.replyOf, event.detail.commentId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.handleApiResponse('delete', '', event.detail.commentId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 12];
                    case 5:
                        if (!(event.detail.action === 'edit')) return [3 /*break*/, 10];
                        if (!event.detail.isReplied) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.handleApiResponse('replyEdit', event.detail.updatedText, event.detail.replyOf, event.detail.commentId)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.handleApiResponse('edit', event.detail.updatedText, event.detail.commentId)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        if (!(event.detail.action === 'reply')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.handleApiResponse('replyAdd', event.detail.updatedText, event.detail.commentId)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /** Add comment api call */
    class_1.prototype.addComment = function (commentText) {
        return __awaiter(this, void 0, void 0, function () {
            var data, header, dataQueryString, url;
            return __generator(this, function (_a) {
                data = {
                    appId: this.appId,
                    contentId: this.commentContentId,
                    text: commentText,
                    createdBy: this.userId,
                    needsModeration: 0
                };
                header = this.handleHeaders();
                dataQueryString = {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(data)
                };
                url = this.apiUrl + "/comment";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Add comment api call */
    class_1.prototype.addReply = function (replyText, replyof) {
        return __awaiter(this, void 0, void 0, function () {
            var data, header, dataQueryString, url;
            return __generator(this, function (_a) {
                data = {
                    commentId: replyof,
                    comment: {
                        text: replyText,
                        createdBy: this.userId,
                        needsModeration: 0,
                        replyOf: replyof
                    }
                };
                header = this.handleHeaders();
                dataQueryString = {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(data)
                };
                url = this.apiUrl + "/reply";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Common api service */
    class_1.prototype.apiService = function (url, queryString) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (queryString && queryString !== '') {
                    return [2 /*return*/, dxp.api(url, queryString)];
                }
                return [2 /*return*/, dxp.api(url)];
            });
        });
    };
    /** Function decide from where to get user detail */
    class_1.prototype.config = function () {
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
    };
    /** Convert api date in custom format */
    class_1.prototype.convertDate = function (date) {
        return dxp.moment(date.replace('T', ' ') + "Z").fromNow();
    };
    /** Delete comment api call */
    class_1.prototype.deleteComment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, header, dataQueryString, url;
            return __generator(this, function (_a) {
                data = {
                    commentId: id,
                    userId: this.userId
                };
                header = this.handleHeaders();
                dataQueryString = {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(data)
                };
                url = this.apiUrl + "/comment/delete";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Delete reply api call */
    class_1.prototype.deleteReply = function (id, replyid) {
        return __awaiter(this, void 0, void 0, function () {
            var data, header, dataQueryString, url;
            return __generator(this, function (_a) {
                data = {
                    commentId: id,
                    userId: this.userId,
                    replyId: replyid
                };
                header = this.handleHeaders();
                dataQueryString = {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(data)
                };
                url = this.apiUrl + "/reply/delete";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Edit comment api call */
    class_1.prototype.editComment = function (id, commentText) {
        return __awaiter(this, void 0, void 0, function () {
            var data, header, dataQueryString, url;
            return __generator(this, function (_a) {
                data = {
                    commentId: id,
                    userId: this.userId,
                    comment: {
                        text: commentText,
                        needsModeration: 0
                    }
                };
                header = this.handleHeaders();
                dataQueryString = {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(data)
                };
                url = this.apiUrl + "/comment";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Edit reply api call */
    class_1.prototype.editReply = function (id, replyid, replyText) {
        return __awaiter(this, void 0, void 0, function () {
            var data, header, dataQueryString, url;
            return __generator(this, function (_a) {
                data = {
                    commentId: id,
                    replyId: replyid,
                    userId: this.userId,
                    comment: {
                        text: replyText,
                        needsModeration: 0
                    }
                };
                header = this.handleHeaders();
                dataQueryString = {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify(data)
                };
                url = this.apiUrl + "/reply";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Populate list of comment */
    class_1.prototype.fetchComment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var header, dataQueryString, url;
            return __generator(this, function (_a) {
                header = this.handleHeaders('GET');
                dataQueryString = {
                    method: 'GET',
                    headers: header
                };
                url = this.apiUrl + "/comment";
                return [2 /*return*/, this.apiService(url, dataQueryString)];
            });
        });
    };
    /** Get user detail form cookie */
    class_1.prototype.getCookie = function (name) {
        var nameEQ = name + "=";
        var tempVariable = document.cookie.split(';');
        for (var _i = 0, tempVariable_1 = tempVariable; _i < tempVariable_1.length; _i++) {
            var element = tempVariable_1[_i];
            var cookie = element;
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return undefined;
    };
    /** Handle api response */
    class_1.prototype.handleApiResponse = function (action, text, id, replyid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(action === 'add')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addComment(text).then(function (result) {
                                _this.apiResult = result;
                                if (_this.apiResult) {
                                    _this.apiResult['commentConvertedTime'] = _this.convertDate(_this.apiResult.createdDate);
                                    _this.domComments = __spreadArrays([_this.apiResult], _this.domComments);
                                    _this.commentCount = _this.domComments.length;
                                }
                                dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Comment list after Add comment:", _this.domComments);
                            }).catch(function (err) {
                                dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 2:
                        if (!(action === 'edit')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.editComment(id, text).then(function (result) {
                                _this.apiResult = result;
                                if (_this.apiResult) {
                                    _this.apiResult['commentConvertedTime'] = _this.convertDate(_this.apiResult.updatedDate);
                                    _this.domComments = _this.domComments
                                        .map(function (comment) {
                                        if (comment.id === id) {
                                            _this.apiResult.replies = _this.apiResult.replies.map(function (reply) {
                                                reply['commentConvertedTime'] = _this.convertDate(reply.createdDate);
                                                return reply;
                                            });
                                            return _this.apiResult;
                                        }
                                        return comment;
                                    });
                                    _this.commentCount = _this.domComments.length;
                                    dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Edit Comment list after edit comment:", _this.domComments);
                                }
                            }).catch(function (err) {
                                dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 4:
                        if (!(action === 'delete')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.deleteComment(id).then(function (result) {
                                _this.apiResult = result;
                                if (_this.apiResult) {
                                    _this.domComments = _this.domComments
                                        .map(function (comment) { return comment; })
                                        .filter(function (comment) { return (comment.id !== id); });
                                    _this.commentCount = _this.domComments.length;
                                    dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Comment list after delete comment:", _this.domComments);
                                }
                            }).catch(function (err) {
                                dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 6:
                        if (!(action === 'replyAdd')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.addReply(text, id).then(function (result) {
                                _this.apiResult = result;
                                if (_this.apiResult) {
                                    _this.apiResult['commentConvertedTime'] = _this.convertDate(_this.apiResult.createdDate);
                                    _this.domComments = _this.domComments
                                        .map(function (comment) {
                                        if (comment.id === id) {
                                            comment.replies = __spreadArrays(comment.replies, [_this.apiResult]);
                                            return comment;
                                        }
                                        return comment;
                                    });
                                    _this.commentCount = _this.domComments.length;
                                }
                                dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Comment list after Add reply:", _this.domComments);
                            }).catch(function (err) {
                                dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 8:
                        if (!(action === 'replyEdit')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.editReply(id, replyid, text).then(function (result) {
                                _this.apiResult = result;
                                if (_this.apiResult) {
                                    _this.apiResult['commentConvertedTime'] = _this.convertDate(_this.apiResult.updatedDate);
                                    _this.domComments = _this.domComments
                                        .map(function (comment) {
                                        if (comment.id === id) {
                                            comment.replies = comment.replies.map(function (reply) { return ((reply.id === replyid) ? _this.apiResult : reply); });
                                        }
                                        return comment;
                                    });
                                    _this.commentCount = _this.domComments.length;
                                }
                                dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Comment list after Edit reply:", _this.domComments);
                            }).catch(function (err) {
                                dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                            })];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 10:
                        if (!(action === 'replyDelete')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.deleteReply(id, replyid).then(function (result) {
                                _this.apiResult = result;
                                if (_this.apiResult) {
                                    _this.domComments = _this.domComments
                                        .map(function (comment) {
                                        if (comment.id === id) {
                                            comment.replies = comment.replies.map(function (reply) { return reply; })
                                                .filter(function (reply) { return (reply.id !== replyid); });
                                        }
                                        return comment;
                                    });
                                    _this.commentCount = _this.domComments.length;
                                    dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Comment list after delete reply:", _this.domComments);
                                }
                            }).catch(function (err) {
                                dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                            })];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 12: // Get action
                    return [4 /*yield*/, this.fetchComment().then(function (result) {
                            _this.apiResult = result;
                            if (_this.apiResult.length > 0) {
                                var tempComment = _this.apiResult.map(function (comment) {
                                    comment['commentConvertedTime'] = _this.convertDate(comment.updatedDate ? comment.updatedDate : comment.createdDate);
                                    comment.replies = comment.replies.map(function (reply) {
                                        reply['commentConvertedTime'] = _this.convertDate(reply.updatedDate ? reply.updatedDate : reply.createdDate);
                                        return reply;
                                    });
                                    return comment;
                                });
                                tempComment = tempComment.reverse();
                                _this.domComments = __spreadArrays(tempComment, _this.domComments);
                                _this.commentCount = _this.domComments.length;
                            }
                            dxp.log.info(_this.element.tagName, HANDLE_API_RESPONSE, "Fetch approved comment:", _this.domComments);
                        }).catch(function (err) {
                            dxp.log.error(_this.element.tagName, HANDLE_API_RESPONSE, ERROR_OCCURRED, err);
                        })];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /** Handle header */
    class_1.prototype.handleHeaders = function (type) {
        var headerObj = {};
        headerObj['Content-Type'] = 'application/json';
        if (type === 'GET') {
            headerObj['appId'] = this.appId;
            headerObj['contentId'] = this.commentContentId;
        }
        return headerObj;
    };
    /** Handle mock comments */
    class_1.prototype.handleMockResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.apiService(this.mockcommentUrl)];
                    case 1:
                        _a.domComments = _b.sent();
                        this.commentCount = this.domComments.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Functionality to display comments */
    class_1.prototype.renderList = function (list) {
        var _this = this;
        this.lastIndex = (this.commentsLimit * this.stepCount);
        return list.slice(0, this.lastIndex).map(function (item) { return h("dxp-comments-with-reply", { "userid-key": _this.useridKey, "user-data-container": _this.userDataContainer, "replies-limit": _this.repliesLimit, "max-characters": _this.maxCharacters, "comment-obj": JSON.stringify(item) }); });
    };
    /** Render the comments */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-comments render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/dxp.min.css" }),
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/" + this.theme + ".min.css" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-comments.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "comment-count" }, (this.domComments.length) ?
            h("h3", null, this.commentCount, " ", (this.commentCount > 1) ? dxp.i18n.t('Comments:multipleCommentsText') : dxp.i18n.t('Comments:singleCommentText'))
            :
                ''), h("dxp-textarea", { label: dxp.i18n.t('Comments:textarealabel'), ref: function (el) { return _this.textAreaInput = el; }, placeholder: this.textareaPlaceholder ? this.textareaPlaceholder : dxp.i18n.t('Comments:commentplaceholder'), "max-length": this.maxCharacters, required: false }), h("div", { class: "comment-hint" }, dxp.i18n.t('Comments:commentHint', { maxlength: this.maxCharacters })), h("div", { class: "editable-block" }, h("dxp-cta-list", { "title-text": "", orientation: "horizontal" }, h("dxp-cta", { type: "button", "btn-id": "submitButton", "button-type": "primary", text: this.submitText ? this.submitText : dxp.i18n.t('Comments:submit'), onClick: function (e) { return _this.submitHandler(e); } }), h("dxp-cta", { type: "button", "btn-id": "cancelButton", "button-type": "secondary", text: this.cancelText ? this.cancelText : dxp.i18n.t('Comments:cancel'), onClick: function (e) { return _this.submitHandler(e); } }))), h("div", { class: "comment-list" }, this.domComments.length ? this.renderList(this.domComments) : '', (this.lastIndex < this.commentCount) &&
            (h("dxp-cta", { type: "button", "btn-id": "load-more-comments", "button-type": "secondary", text: dxp.i18n.t('Comments:loadmoreComments'), onClick: function (e) { return _this.submitHandler(e); } })))));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-comments{padding:.5rem}div.dxp.dxp-comments .editable-block{margin-top:1rem}div.dxp.dxp-comments .comment-count{margin:2rem 0;clear:both}div.dxp.dxp-comments .comment-count h3{direction:ltr;display:inline-block}div.dxp.dxp-comments .comment-hint{margin:.5rem 0}div.dxp.dxp-comments .comment-list{margin-top:1.25rem}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Comments as dxp_comments };
