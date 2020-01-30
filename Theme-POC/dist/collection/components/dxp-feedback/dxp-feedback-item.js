import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** component feedback  */
export class FeedbackItem {
    constructor() {
        /** display feedback as */
        this.displayAs = 'star';
    }
    /** on componentWillLoad feedback */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Feedback', messages);
        if (this.configData && typeof this.configData === 'string') {
            this.configData = JSON.parse(this.configData);
        }
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-feedback.min.css`;
        dxp.util.appendLinkElement(shadow, href);
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
            stars.push(h("span", { role: "radio", "aria-checked": `${this.selectedIndex >= 0 && i <= this.selectedIndex ? 'true' : 'false'}`, class: `${this.selectedIndex >= 0 && i <= this.selectedIndex ? 'active' : ''}`, tabindex: "0", "aria-label": this.selectedIndex >= 0 && i <= this.selectedIndex ? `${dxp.i18n.t('Feedback:starSelected', { starcount: this.starCount, stars: n })}`
                    : `${dxp.i18n.t('Feedback:starNotSelected', { starcount: this.starCount, stars: n })}`, "custom-id": i, "tag-name": "dxp-star", onKeyPress: e => this.handleKeypressEvents(e), onClick: e => this.handleStarRating(e) }));
        }
        return stars;
    }
    /** Render the feedback */
    render() {
        return (h("div", { class: `container ${this.base.componentClass()}`, dir: this.dir },
            h("div", { class: "feedback-item" },
                (this.displayAs.trim().toLowerCase() === 'star') &&
                    h("div", { class: "rating" },
                        (this.feedbackRatingTitle && this.feedbackRatingTitle.length > 0) && h("div", null, this.feedbackRatingTitle),
                        this.renderStars()),
                (this.displayAs.trim().toLowerCase() === 'dropdown' && this.displayAs) &&
                    h("div", { class: "dropdown-wrapper" },
                        (this.feedbackRatingTitle && this.feedbackRatingTitle.length > 0) && h("div", null, this.feedbackRatingTitle),
                        h("select", { class: "dropdown", onChange: e => this.dropdownChange(e) },
                            h("option", { value: "" },
                                " ",
                                this.placeholder),
                            this.configData.map(el => {
                                return h("option", { value: el.key }, el.key);
                            }))),
                (this.displayAs.trim().toLowerCase() === 'radio' && this.displayAs) &&
                    h("div", { class: "radio-wrapper" },
                        h("dxp-radio-group", { label: this.feedbackRatingTitle }, this.configData.map(el => {
                            return h("dxp-radio-button", { tabindex: "0", "radio-key": el.key, "radio-value": el.value, onChange: e => this.handleRadio(e) });
                        }))))));
    }
    static get is() { return "dxp-feedback-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-feedback-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-feedback-item.css"]
    }; }
    static get properties() { return {
        "configData": {
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
                "text": "prop to hold feedback object values"
            },
            "attribute": "config-data",
            "reflect": false
        },
        "displayAs": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'star' | 'dropdown' | 'radio'",
                "resolved": "\"dropdown\" | \"radio\" | \"star\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "display feedback as"
            },
            "attribute": "display-as",
            "reflect": false,
            "defaultValue": "'star'"
        },
        "feedbackId": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds the individual feedback id"
            },
            "attribute": "feedback-id",
            "reflect": false
        },
        "feedbackRatingTitle": {
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
                "text": "prop to hold feedback individual title"
            },
            "attribute": "feedback-rating-title",
            "reflect": false
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "dropdown placeholder"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "starCount": {
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
                "text": "prop to hold star length"
            },
            "attribute": "star-count",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "radioValue": {},
        "selectedIndex": {},
        "starValue": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_feedback",
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
            "method": "emitfeedback",
            "name": "emitfeedback",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event Emit for dropdown"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "radioFeedback",
            "name": "radioFeedback",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event Emit for radio feedback"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "starFeedback",
            "name": "starFeedback",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event Emit for star rating"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
}
