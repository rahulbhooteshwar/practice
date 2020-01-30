import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-3c2a7f4a.js';
var FeedbackItem = /** @class */ (function () {
    function FeedbackItem(hostRef) {
        registerInstance(this, hostRef);
        /** display feedback as */
        this.displayAs = 'star';
        this.analyticsDataEmitter = createEvent(this, "dxp_feedback", 7);
        this.emitfeedback = createEvent(this, "emitfeedback", 7);
        this.radioFeedback = createEvent(this, "radioFeedback", 7);
        this.starFeedback = createEvent(this, "starFeedback", 7);
    }
    /** on componentWillLoad feedback */
    FeedbackItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Feedback', messages);
        if (this.configData && typeof this.configData === 'string') {
            this.configData = JSON.parse(this.configData);
        }
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-feedback.min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** on dropdown change */
    FeedbackItem.prototype.dropdownChange = function (e) {
        this.dropdownValSelected = e.target.value;
        this.emitAnalyticsData('Dropdown Feedback', this.dropdownValSelected);
        this.emitfeedback.emit({ 'feedbackValue': this.dropdownValSelected, 'feedbackId': this.feedbackId });
    };
    /** Emit the analytics data after clicking on dxp-feedback component */
    FeedbackItem.prototype.emitAnalyticsData = function (feedbackType, value) {
        var obj = { 'di_comp_name': this.element.tagName, 'di_comp_type': feedbackType, 'di_comp_value': value };
        this.analyticsDataEmitter.emit(obj);
    };
    /** keyboard event */
    FeedbackItem.prototype.handleKeypressEvents = function (e) {
        if (e.keyCode === 13) {
            this.handleStarRating(e);
        }
    };
    /** handle radio feedback */
    FeedbackItem.prototype.handleRadio = function (e) {
        this.radioValue = e.target.id;
        this.emitAnalyticsData('Radio Feedback', this.radioValue);
        this.emitfeedback.emit({ 'feedbackValue': this.radioValue, 'feedbackId': this.feedbackId });
    };
    /** handle star rating */
    FeedbackItem.prototype.handleStarRating = function (e) {
        this.selectedIndex = e.target.getAttribute('custom-id') ? e.target.getAttribute('custom-id') : undefined;
        this.starValue = Number(this.selectedIndex) + 1;
        this.emitfeedback.emit({ 'feedbackValue': this.starValue, 'feedbackId': this.feedbackId });
    };
    /** to render stars */
    FeedbackItem.prototype.renderStars = function () {
        var _this = this;
        var stars = [];
        for (var i = 0; i < this.starCount; i++) {
            var n = i + 1;
            stars.push(h("span", { role: "radio", "aria-checked": "" + (this.selectedIndex >= 0 && i <= this.selectedIndex ? 'true' : 'false'), class: "" + (this.selectedIndex >= 0 && i <= this.selectedIndex ? 'active' : ''), tabindex: "0", "aria-label": this.selectedIndex >= 0 && i <= this.selectedIndex ? "" + dxp.i18n.t('Feedback:starSelected', { starcount: this.starCount, stars: n })
                    : "" + dxp.i18n.t('Feedback:starNotSelected', { starcount: this.starCount, stars: n }), "custom-id": i, "tag-name": "dxp-star", onKeyPress: function (e) { return _this.handleKeypressEvents(e); }, onClick: function (e) { return _this.handleStarRating(e); } }));
        }
        return stars;
    };
    /** Render the feedback */
    FeedbackItem.prototype.render = function () {
        var _this = this;
        return (h("div", { class: "container " + this.base.componentClass(), dir: this.dir }, h("div", { class: "feedback-item" }, (this.displayAs.trim().toLowerCase() === 'star') &&
            h("div", { class: "rating" }, (this.feedbackRatingTitle && this.feedbackRatingTitle.length > 0) && h("div", null, this.feedbackRatingTitle), this.renderStars()), (this.displayAs.trim().toLowerCase() === 'dropdown' && this.displayAs) &&
            h("div", { class: "dropdown-wrapper" }, (this.feedbackRatingTitle && this.feedbackRatingTitle.length > 0) && h("div", null, this.feedbackRatingTitle), h("select", { class: "dropdown", onChange: function (e) { return _this.dropdownChange(e); } }, h("option", { value: "" }, " ", this.placeholder), this.configData.map(function (el) {
                return h("option", { value: el.key }, el.key);
            }))), (this.displayAs.trim().toLowerCase() === 'radio' && this.displayAs) &&
            h("div", { class: "radio-wrapper" }, h("dxp-radio-group", { label: this.feedbackRatingTitle }, this.configData.map(function (el) {
                return h("dxp-radio-button", { tabindex: "0", "radio-key": el.key, "radio-value": el.value, onChange: function (e) { return _this.handleRadio(e); } });
            }))))));
    };
    Object.defineProperty(FeedbackItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeedbackItem, "style", {
        get: function () { return "div.dxp.dxp-feedback-item .rating{margin-bottom:1rem}div.dxp.dxp-feedback-item .rating span{margin:.5rem .2rem;cursor:pointer}div.dxp.dxp-feedback-item .rating h4,div.dxp.dxp-feedback-item .rating h6{margin-bottom:0}div.dxp.dxp-feedback-item .dropdown-wrapper,div.dxp.dxp-feedback-item .radio-wrapper{margin-bottom:1rem;width:100%}div.dxp.dxp-feedback-item .select-tiltle{margin-bottom:.75rem}div.dxp.dxp-feedback-item .textarea-wrapper{margin-top:.75rem}"; },
        enumerable: true,
        configurable: true
    });
    return FeedbackItem;
}());
export { FeedbackItem as dxp_feedback_item };
