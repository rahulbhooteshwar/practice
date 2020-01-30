'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-146e73c2.js');

const FeedbackDisplay = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to perform before component load */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Feedback', messages.messages);
    }
    /** to render stars */
    renderStars() {
        const stars = [];
        for (let i = 0; i < this.starCount; i++) {
            stars.push(core$1.h("span", { class: "active", "custom-id": i }, " "));
        }
        return stars;
    }
    /** Render the feedback */
    render() {
        const convertStarCount = Number(this.starCount);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}.min.css` }))]
        ];
        return (core$1.h("div", { class: `container ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { class: "feedback-list" }, core$1.h("div", { class: "profile-block" }, core$1.h("div", { class: "profile-icon" }, " ")), core$1.h("div", { class: "detail-block" }, core$1.h("div", { class: "user-name" }, " ", this.displayUserName), core$1.h("div", { class: "time-stamp" }, this.timeStamp))), core$1.h("div", { class: "user-ratings" }, (this.starCount && typeof (convertStarCount) === 'number') ?
            core$1.h("div", { class: "display-rating", role: "img", "aria-label": ` ${this.starCount} ${core$1.dxp.i18n.t('Feedback:starGiven')}` }, " ", this.renderStars(), " ")
            :
                core$1.h("div", null, this.feedbackValue)), (this.feedbackAdditionalText && this.feedbackAdditionalText.length > 0)
            && core$1.h("div", { class: "additional-text", role: "text", "aria-label": `${core$1.dxp.i18n.t('Feedback:additionalFeedback')} ${this.feedbackAdditionalText}` }, this.feedbackAdditionalText)));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-feedback-display{margin-bottom:2rem}div.dxp.dxp-feedback-display .user-ratings{margin:.5rem 0}div.dxp.dxp-feedback-display .additional-text{margin:.5rem 0;padding:1rem;border-radius:.25rem;clear:both;word-break:break-word}div.dxp.dxp-feedback-display .feedback-list{display:-ms-flexbox;display:flex}div.dxp.dxp-feedback-display .feedback-list .profile-block{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}div.dxp.dxp-feedback-display .feedback-list .detail-block{width:100%;-ms-flex:1;flex:1;margin:0 .75rem}div.dxp.dxp-feedback-display .feedback-list .detail-block .time-stamp,div.dxp.dxp-feedback-display .feedback-list .detail-block .user-name{word-break:break-all}"; }
};

exports.dxp_feedback_display = FeedbackDisplay;
