import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-3c2a7f4a.js';
var FeedbackDisplay = /** @class */ (function () {
    function FeedbackDisplay(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to perform before component load */
    FeedbackDisplay.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Feedback', messages);
    };
    /** to render stars */
    FeedbackDisplay.prototype.renderStars = function () {
        var stars = [];
        for (var i = 0; i < this.starCount; i++) {
            stars.push(h("span", { class: "active", "custom-id": i }, " "));
        }
        return stars;
    };
    /** Render the feedback */
    FeedbackDisplay.prototype.render = function () {
        var convertStarCount = Number(this.starCount);
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && (h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + ".min.css" }))]
        ];
        return (h("div", { class: "container " + this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "feedback-list" }, h("div", { class: "profile-block" }, h("div", { class: "profile-icon" }, " ")), h("div", { class: "detail-block" }, h("div", { class: "user-name" }, " ", this.displayUserName), h("div", { class: "time-stamp" }, this.timeStamp))), h("div", { class: "user-ratings" }, (this.starCount && typeof (convertStarCount) === 'number') ?
            h("div", { class: "display-rating", role: "img", "aria-label": " " + this.starCount + " " + dxp.i18n.t('Feedback:starGiven') }, " ", this.renderStars(), " ")
            :
                h("div", null, this.feedbackValue)), (this.feedbackAdditionalText && this.feedbackAdditionalText.length > 0)
            && h("div", { class: "additional-text", role: "text", "aria-label": dxp.i18n.t('Feedback:additionalFeedback') + " " + this.feedbackAdditionalText }, this.feedbackAdditionalText)));
    };
    Object.defineProperty(FeedbackDisplay.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeedbackDisplay, "style", {
        get: function () { return "div.dxp.dxp-feedback-display{margin-bottom:2rem}div.dxp.dxp-feedback-display .user-ratings{margin:.5rem 0}div.dxp.dxp-feedback-display .additional-text{margin:.5rem 0;padding:1rem;border-radius:.25rem;clear:both;word-break:break-word}div.dxp.dxp-feedback-display .feedback-list{display:-ms-flexbox;display:flex}div.dxp.dxp-feedback-display .feedback-list .profile-block{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}div.dxp.dxp-feedback-display .feedback-list .detail-block{width:100%;-ms-flex:1;flex:1;margin:0 .75rem}div.dxp.dxp-feedback-display .feedback-list .detail-block .time-stamp,div.dxp.dxp-feedback-display .feedback-list .detail-block .user-name{word-break:break-all}"; },
        enumerable: true,
        configurable: true
    });
    return FeedbackDisplay;
}());
export { FeedbackDisplay as dxp_feedback_display };
