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
import { m as messages } from './messages-3c2a7f4a.js';
var DISPLAY_AS = 'display-as';
var Feedback = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** to hold api result values */
        this.apiResult = [];
        /** holds average values of stars */
        this.avgStars = [];
        /** to store feedback item's values */
        this.feedbackListArray = [];
        /** feedback item display list */
        this.feedbackListDisplay = [];
        /** to hold api result for star count */
        this.starCountArray = [];
        /** prop for inject feedback item list */
        this.feedbackItemList = [];
        /** prop holds number of reviews to load more reviews */
        this.reviewsLimit = 10;
        /** prop holds username key */
        this.usernameKeyLocation = 'COOKIE';
    }
    /** actions to perform before component load */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Feedback', messages);
        this.stepCount = this.reviewsLimit;
        this.isSubmitDisabled = true;
    };
    /** actions to perform after component load */
    class_1.prototype.componentDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.feedbackItemList) {
                            this.feedbackDataChangeHandler();
                        }
                        if (this.feedbackListDisplay) {
                            this.feedbackDataDisplay();
                        }
                        return [4 /*yield*/, this.loadFeedBack()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after component update */
    class_1.prototype.componentDidUpdate = function () {
        this.showAverageStars();
    };
    /** listen emitted feedback value */
    class_1.prototype.emittedFeedback = function (e) {
        var isPresent = this.feedbackListArray.find(function (feedback) { return feedback.ratingId === e.detail.feedbackId; });
        isPresent ?
            this.feedbackListArray = this.feedbackListArray.map(function (feedback) { return (feedback.ratingId === e.detail.feedbackId) ? Object.assign(Object.assign({}, feedback), { 'ratingValue': e.detail.feedbackValue }) : feedback; })
            : this.feedbackListArray.push({ 'ratingId': e.detail.feedbackId, 'ratingValue': e.detail.feedbackValue });
        this.isSubmitDisabled = (this.feedbackItemList.length !== this.feedbackListArray.length) ? true : false;
    };
    /** click listener for cta button */
    class_1.prototype.submitHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyData, dataQueryString, addFeedbackResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(e.target.getAttribute('btn-id') === 'load-more')) return [3 /*break*/, 2];
                        this.reviewsLimit = this.reviewsLimit + this.stepCount;
                        return [4 /*yield*/, this.loadFeedBack()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (e.target.getAttribute('btn-id') === 'cancel') {
                            this.clearFeedbackForm();
                        }
                        if (!(e.target.getAttribute('btn-id') === 'submit')) return [3 /*break*/, 8];
                        if (this.loadMoreElement) {
                            this.loadMoreElement.style.display = 'none';
                        }
                        if (this.itemContainerDisplay) {
                            this.itemContainerDisplay.innerHTML = '';
                        }
                        bodyData = {
                            appId: this.appId,
                            contentId: this.contentId,
                            ratings: this.feedbackListArray,
                            feedback: this.textareaValue,
                            createdBy: this.getUserName()
                        };
                        dataQueryString = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'appId': this.appId,
                                'contentId': this.contentId
                            },
                            body: JSON.stringify(bodyData)
                        };
                        this.textareaValue = '';
                        if (!this.apiUrl) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.apiService(this.apiUrl, dataQueryString)];
                    case 3:
                        addFeedbackResponse = _a.sent();
                        if (!addFeedbackResponse) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.loadFeedBack()];
                    case 4:
                        _a.sent();
                        this.clearFeedbackForm();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        if (bodyData.ratings[0]) {
                            Number.isInteger(bodyData.ratings[0]['ratingValue']) ?
                                this.feedbackListDisplay.unshift({
                                    displayUserName: bodyData.createdBy,
                                    starCount: Number(bodyData.ratings[0]['ratingValue']),
                                    timeStamp: dxp.moment(new Date()).fromNow(),
                                    feedbackAdditionalText: bodyData.feedback
                                }) : this.feedbackListDisplay.unshift({
                                displayUserName: bodyData.createdBy,
                                feedbackValue: bodyData.ratings[0]['ratingValue'],
                                timeStamp: dxp.moment(new Date()).fromNow(),
                                feedbackAdditionalText: bodyData.feedback
                            });
                        }
                        return [4 /*yield*/, this.loadFeedBack()];
                    case 7:
                        _a.sent();
                        this.clearFeedbackForm();
                        _a.label = 8;
                    case 8:
                        this.isSubmitDisabled = true;
                        return [2 /*return*/];
                }
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
    /** method for clearing form */
    class_1.prototype.clearFeedbackForm = function () {
        this.feedbackDataChangeHandler();
        this.textAreaElement ?
            this.textAreaElement.querySelectorAll('textarea')[0].value = ''
            :
                this.textAreaElement.querySelectorAll('textarea')[0].value = '';
        this.feedbackListArray = [];
    };
    /**  feedbackItems data obj */
    class_1.prototype.feedbackDataChangeHandler = function () {
        if (this.feedbackItemList && this.feedbackItemList.length > 0) {
            this.base.createNestedMarkup(this.itemContainer, 'dxp-feedback-item', this.feedbackItemList);
        }
    };
    /**  feedbackItems display obj */
    class_1.prototype.feedbackDataDisplay = function () {
        if (this.feedbackListDisplay && this.feedbackListDisplay.length > 0) {
            this.base.createNestedMarkup(this.itemContainerDisplay, 'dxp-feedback-display', this.feedbackListDisplay.slice(0, this.reviewsLimit));
        }
    };
    /** get username  */
    class_1.prototype.getUserName = function () {
        var _this = this;
        var userName = 'Anonymous';
        if (this.usernameKeyLocation === 'COOKIE') {
            var cookiesValue = document.cookie.split(';');
            cookiesValue.forEach(function (cookie) {
                if (cookie.match(_this.usernameKey)) {
                    var cookieMap = cookie.match(_this.usernameKey).input.split('=');
                    userName = cookieMap[1];
                }
            });
        }
        if (this.usernameKeyLocation === 'SESSION') {
            userName = sessionStorage.getItem(this.usernameKey);
        }
        if (this.usernameKeyLocation === 'OTHER') {
            userName = 'Other';
        }
        userName = userName ? userName : 'Anonymous';
        return userName;
    };
    /** handle textarea values */
    class_1.prototype.handleTextarea = function (e) {
        this.textareaValue = e.target.value;
    };
    /** load feedback from api */
    class_1.prototype.loadFeedBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apiResultFeedbackList, dataQueryString, feedbackList, starValues_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataQueryString = {
                            method: 'GET',
                            headers: {
                                'appId': this.appId,
                                'contentId': this.contentId,
                                'Content-Type': 'application/json'
                            }
                        };
                        if (!(this.apiUrl && (this.feedbackItemList.length === 1))) return [3 /*break*/, 2];
                        if (this.loadMoreElement) {
                            this.loadMoreElement.style.display = 'none';
                        }
                        return [4 /*yield*/, this.apiService(this.apiUrl, dataQueryString)];
                    case 1:
                        apiResultFeedbackList = _a.sent();
                        feedbackList = void 0;
                        if (apiResultFeedbackList && apiResultFeedbackList.length > 0) {
                            feedbackList = __spreadArrays(apiResultFeedbackList).reverse().filter(function (feedback) { return feedback.ratings[0]; }).map(function (feedback) { return Number.isInteger(feedback.ratings[0]['ratingValue']) ? ({
                                displayUserName: feedback.createdBy,
                                feedbackValue: feedback.ratings[0]['ratingValue'],
                                timeStamp: dxp.moment(feedback.createdDate.replace('T', ' ') + "Z").fromNow(),
                                feedbackAdditionalText: feedback.feedback
                            }) : ({
                                displayUserName: feedback.createdBy,
                                starCount: Number(feedback.ratings[0]['ratingValue']),
                                feedbackValue: feedback.ratings[0]['ratingValue'],
                                timeStamp: dxp.moment(feedback.createdDate.replace('T', ' ') + "Z").fromNow(),
                                feedbackAdditionalText: feedback.feedback
                            }); });
                        }
                        this.feedbackListDisplay = feedbackList && feedbackList.length > 0 ? __spreadArrays(feedbackList) : [];
                        this.avgStars = [];
                        starValues_1 = this.feedbackListDisplay.reduce(function (init, next) {
                            var _a;
                            return (Object.assign(Object.assign({}, init), (_a = {}, _a[next.starCount] = ((init[next.feedbackValue] | 0) + 1), _a.total = ((init['total'] | 0) + 1), _a)));
                        }, {});
                        for (i = 0; i < this.feedbackItemList[0]['star-count']; i++) {
                            this.avgStars.push({ star: i + 1, rating: 0 });
                        }
                        this.avgStars.forEach(function (avgStar) {
                            for (var _i = 0, _a = Object.keys(starValues_1); _i < _a.length; _i++) {
                                var key = _a[_i];
                                if (key !== 'total' && avgStar.star === Number(key)) {
                                    avgStar.rating = Math.round((starValues_1[key] / starValues_1.total) * 100);
                                }
                            }
                        });
                        this.avgStars.sort(function (a, b) { return b.star - a.star; });
                        _a.label = 2;
                    case 2:
                        this.feedbackDataDisplay();
                        if (this.averageDisplayElement) {
                            this.showAverageDisplayElement();
                        }
                        if (this.countDisplayElement) {
                            this.countDisplayElement.innerHTML = this.feedbackListDisplay.length > 0 ?
                                " " + this.feedbackListDisplay.length + " <span class=\"feedback-heading\">" + ((this.feedbackListDisplay.length > 1) ?
                                    dxp.i18n.t('Feedback:Reviews') : dxp.i18n.t('Feedback:Review')) + "</span>" : '';
                        }
                        if (this.loadMoreElement) {
                            this.loadMoreElement.style.display = (this.feedbackListDisplay.length > this.reviewsLimit) ? 'block' : 'none';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** to render stars */
    class_1.prototype.renderStars = function () {
        var star = '';
        var isHalfStar = false;
        isHalfStar = this.starFillIndex - Math.floor(this.starFillIndex) !== 0 ? true : false;
        this.starFillIndex = isHalfStar ? Math.ceil(this.starFillIndex) : Math.floor(this.starFillIndex);
        for (var i = 1; i <= this.avgStars.length; i++) {
            star = star + "<span class= " + ((i === this.starFillIndex && isHalfStar) ? 'half-star' : (i >= 0 && i <= this.starFillIndex) ? ' active ' : '') + " custom-id={" + i + "} > </span>";
        }
        return star;
    };
    /** show average display element that is star */
    class_1.prototype.showAverageDisplayElement = function () {
        if (this.feedbackItemList.length === 1 && this.feedbackItemList[0][DISPLAY_AS] === 'star') {
            var totalStar = this.feedbackListDisplay.reduce(function (init, next) { return ((init | 0) + next.starCount); }, 0);
            var avgStar = (totalStar / this.feedbackListDisplay.length).toFixed(1);
            var avgStarCheck = avgStar.split('.');
            if (avgStarCheck[1] && Number(avgStarCheck[1]) >= 8) {
                this.starFillIndex = Math.round(Number(avgStar));
            }
            else if (avgStarCheck[1] && Number(avgStarCheck[1]) >= 3 && Number(avgStarCheck[1]) <= 7) {
                avgStarCheck.splice(1, 1, '5');
                this.starFillIndex = avgStarCheck.join('.');
            }
            else {
                this.starFillIndex = Math.round(Number(avgStar));
            }
            this.averageDisplayElement.innerHTML = this.feedbackListDisplay.length > 0 ? " <span class=\"count-display\">" + avgStar + "</span>\n        <div class='render-stars' role='img' aria-label= " + dxp.i18n.t('Feedback:star') + ">  " + this.renderStars() + " </div>\n        " + dxp.i18n.t('Feedback:basedOn') + " " + this.feedbackListDisplay.length + " " + ((this.feedbackListDisplay.length > 1) ?
                dxp.i18n.t('Feedback:ratings') : dxp.i18n.t('Feedback:rating')) + "." : '';
        }
    };
    /** show average star rating progress bar */
    class_1.prototype.showAverageStars = function () {
        var _this = this;
        this.avgStars.forEach(function (avgStar, index) {
            if (_this.starAverageDisplay && _this.starAverageDisplay.getElementsByClassName('average-line')[index]) {
                _this.starAverageDisplay.getElementsByClassName('average-line')[index].style.width = avgStar.rating + "%";
            }
        });
    };
    /** Render the feedback */
    class_1.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && (h("link", { rel: "stylesheet", href: "" }))],
            [this.theme && (h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-feedback.min.css" }))]
        ];
        return (h("div", { class: "container " + this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("h3", { class: "feedback-title-display" }, this.feedbackTitle), h("div", { class: "feedback-item-wrapper" }, h("div", { class: "feedback-items", ref: function (el) { return (_this.itemContainer = el); } }, h("slot", null)), this.isAdditionalCommentRequired &&
            h("div", null, this.feedbackAdditionalText, h("div", { class: "textarea-wrapper" }, h("dxp-textarea", { rows: 3, "max-length": 500, placeholder: this.feedbackAdditionalTextPlaceholder, onInput: function (e) { return _this.handleTextarea(e); }, ref: function (el) { return _this.textAreaElement = el; } }))), h("div", { class: "btn-wrapper" }, h("div", { class: "submit-btn" }, h("dxp-cta-list", null, h("dxp-cta", { type: "button", "btn-id": "submit", "button-type": "primary", text: "Submit", disabled: this.isSubmitDisabled, onClick: function (e) { return _this.submitHandler(e); } }), h("dxp-cta", { type: "button", "btn-id": "cancel", "button-type": "secondary", text: "Cancel", onClick: function (e) { return _this.submitHandler(e); } }))))), this.feedbackItemList.length === 1 ?
            h("div", { class: "display-wrapper" }, this.feedbackItemList[0][DISPLAY_AS] === 'star' ? h("div", { class: "avg-rating-wrapper" }, h("div", { class: "average-rating", ref: function (el) { return _this.averageDisplayElement = el; } }), h("div", { class: "star-rating", ref: function (el) { return _this.starAverageDisplay = el; } }, this.avgStars.map(function (avgStar) {
                return (h("div", { class: "star-line" }, h("span", null, avgStar.star, h("i", { class: "active", role: "img", "aria-label": dxp.i18n.t('Feedback:starRatedBy') + " " + avgStar.rating + " " + dxp.i18n.t('Feedback:percentageUsers') })), h("div", { class: "grey-line" }, h("div", { class: "average-line" }))));
            }))) : '', this.feedbackItemList[0][DISPLAY_AS] !== 'star' ? h("h3", { ref: function (el) { return _this.countDisplayElement = el; } }) : '', h("div", { class: "feedback-display", ref: function (el) { return (_this.itemContainerDisplay = el); } }), h("div", { class: "load-more", ref: function (el) { return (_this.loadMoreElement = el); } }, h("dxp-cta", { type: "button", "btn-id": "load-more", "button-type": "secondary", text: dxp.i18n.t('Feedback:showMoreReview'), onClick: function (e) { return _this.submitHandler(e); } }))) : ''));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-feedback{padding:.93rem}div.dxp.dxp-feedback .btn-wrapper{display:-ms-flexbox;display:flex;margin-top:1.5rem}div.dxp.dxp-feedback .textarea-wrapper{margin:1rem 0}div.dxp.dxp-feedback .feedback-title-display{margin-top:1rem;margin-bottom:2rem}div.dxp.dxp-feedback .display-wrapper{margin-top:1.5rem}div.dxp.dxp-feedback .display-wrapper .average-rating{margin-bottom:2rem;width:50%}div.dxp.dxp-feedback .display-wrapper .average-rating .count-display{display:block;padding-right:1rem}div.dxp.dxp-feedback .display-wrapper .star-rating{width:50%}div.dxp.dxp-feedback .display-wrapper .star-rating span{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 .5rem}div.dxp.dxp-feedback .display-wrapper .star-rating .star-line{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;place-content:flex-end}div.dxp.dxp-feedback .display-wrapper .star-rating .star-line .grey-line{width:50%;height:.25rem}div.dxp.dxp-feedback .display-wrapper .star-rating .star-line .grey-line .average-line{width:0;height:100%;-webkit-transition:width .6s ease-out;transition:width .6s ease-out}div.dxp.dxp-feedback .display-wrapper .avg-rating-wrapper{display:-ms-flexbox;display:flex}div.dxp.dxp-feedback .display-wrapper .feedback-heading{display:inline-block}div.dxp.dxp-feedback .display-wrapper .feedback-heading:first-letter{text-transform:capitalize}div.dxp.dxp-feedback .display-wrapper .load-more{margin-bottom:1.75rem}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Feedback as dxp_feedback };
