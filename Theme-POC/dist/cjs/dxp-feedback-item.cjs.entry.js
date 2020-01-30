'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-146e73c2.js');

const FeedbackItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** display feedback as */
        this.displayAs = 'star';
        this.analyticsDataEmitter = core$1.createEvent(this, "dxp_feedback", 7);
        this.emitfeedback = core$1.createEvent(this, "emitfeedback", 7);
        this.radioFeedback = core$1.createEvent(this, "radioFeedback", 7);
        this.starFeedback = core$1.createEvent(this, "starFeedback", 7);
    }
    /** on componentWillLoad feedback */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Feedback', messages.messages);
        if (this.configData && typeof this.configData === 'string') {
            this.configData = JSON.parse(this.configData);
        }
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = ``;
        core$1.dxp.util.appendLinkElement(shadow, href);
        href = `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-feedback.min.css`;
        core$1.dxp.util.appendLinkElement(shadow, href);
    }
    /** on dropdown change */
    dropdownChange(e) {
        this.dropdownValSelected = e.target.value;
        this.emitAnalyticsData('Dropdown Feedback', this.dropdownValSelected);
        this.emitfeedback.emit({ 'feedbackValue': this.dropdownValSelected, 'feedbackId': this.feedbackId });
    }
    /** Emit the analytics data after clicking on dxp-feedback component */
    emitAnalyticsData(feedbackType, value) {
        const obj = { 'di_comp_name': this.element.tagName, 'di_comp_type': feedbackType, 'di_comp_value': value };
        this.analyticsDataEmitter.emit(obj);
    }
    /** keyboard event */
    handleKeypressEvents(e) {
        if (e.keyCode === 13) {
            this.handleStarRating(e);
        }
    }
    /** handle radio feedback */
    handleRadio(e) {
        this.radioValue = e.target.id;
        this.emitAnalyticsData('Radio Feedback', this.radioValue);
        this.emitfeedback.emit({ 'feedbackValue': this.radioValue, 'feedbackId': this.feedbackId });
    }
    /** handle star rating */
    handleStarRating(e) {
        this.selectedIndex = e.target.getAttribute('custom-id') ? e.target.getAttribute('custom-id') : undefined;
        this.starValue = Number(this.selectedIndex) + 1;
        this.emitfeedback.emit({ 'feedbackValue': this.starValue, 'feedbackId': this.feedbackId });
    }
    /** to render stars */
    renderStars() {
        const stars = [];
        for (let i = 0; i < this.starCount; i++) {
            const n = i + 1;
            stars.push(core$1.h("span", { role: "radio", "aria-checked": `${this.selectedIndex >= 0 && i <= this.selectedIndex ? 'true' : 'false'}`, class: `${this.selectedIndex >= 0 && i <= this.selectedIndex ? 'active' : ''}`, tabindex: "0", "aria-label": this.selectedIndex >= 0 && i <= this.selectedIndex ? `${core$1.dxp.i18n.t('Feedback:starSelected', { starcount: this.starCount, stars: n })}`
                    : `${core$1.dxp.i18n.t('Feedback:starNotSelected', { starcount: this.starCount, stars: n })}`, "custom-id": i, "tag-name": "dxp-star", onKeyPress: e => this.handleKeypressEvents(e), onClick: e => this.handleStarRating(e) }));
        }
        return stars;
    }
    /** Render the feedback */
    render() {
        return (core$1.h("div", { class: `container ${this.base.componentClass()}`, dir: this.dir }, core$1.h("div", { class: "feedback-item" }, (this.displayAs.trim().toLowerCase() === 'star') &&
            core$1.h("div", { class: "rating" }, (this.feedbackRatingTitle && this.feedbackRatingTitle.length > 0) && core$1.h("div", null, this.feedbackRatingTitle), this.renderStars()), (this.displayAs.trim().toLowerCase() === 'dropdown' && this.displayAs) &&
            core$1.h("div", { class: "dropdown-wrapper" }, (this.feedbackRatingTitle && this.feedbackRatingTitle.length > 0) && core$1.h("div", null, this.feedbackRatingTitle), core$1.h("select", { class: "dropdown", onChange: e => this.dropdownChange(e) }, core$1.h("option", { value: "" }, " ", this.placeholder), this.configData.map(el => {
                return core$1.h("option", { value: el.key }, el.key);
            }))), (this.displayAs.trim().toLowerCase() === 'radio' && this.displayAs) &&
            core$1.h("div", { class: "radio-wrapper" }, core$1.h("dxp-radio-group", { label: this.feedbackRatingTitle }, this.configData.map(el => {
                return core$1.h("dxp-radio-button", { tabindex: "0", "radio-key": el.key, "radio-value": el.value, onChange: e => this.handleRadio(e) });
            }))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-feedback-item .rating{margin-bottom:1rem}div.dxp.dxp-feedback-item .rating span{margin:.5rem .2rem;cursor:pointer}div.dxp.dxp-feedback-item .rating h4,div.dxp.dxp-feedback-item .rating h6{margin-bottom:0}div.dxp.dxp-feedback-item .dropdown-wrapper,div.dxp.dxp-feedback-item .radio-wrapper{margin-bottom:1rem;width:100%}div.dxp.dxp-feedback-item .select-tiltle{margin-bottom:.75rem}div.dxp.dxp-feedback-item .textarea-wrapper{margin-top:.75rem}"; }
};

exports.dxp_feedback_item = FeedbackItem;
