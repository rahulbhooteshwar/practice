import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** component feedback-group  */
export class FeedbackDisplay {
    /** actions to perform before component load */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Feedback', messages);
    }
    /** to render stars */
    renderStars() {
        const stars = [];
        for (let i = 0; i < this.starCount; i++) {
            stars.push(h("span", { class: "active", "custom-id": i }, " "));
        }
        return stars;
    }
    /** Render the feedback */
    render() {
        const convertStarCount = Number(this.starCount);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}.min.css` }))]
        ];
        return (h("div", { class: `container ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "feedback-list" },
                h("div", { class: "profile-block" },
                    h("div", { class: "profile-icon" }, " ")),
                h("div", { class: "detail-block" },
                    h("div", { class: "user-name" },
                        " ",
                        this.displayUserName),
                    h("div", { class: "time-stamp" }, this.timeStamp))),
            h("div", { class: "user-ratings" }, (this.starCount && typeof (convertStarCount) === 'number') ?
                h("div", { class: "display-rating", role: "img", "aria-label": ` ${this.starCount} ${dxp.i18n.t('Feedback:starGiven')}` },
                    " ",
                    this.renderStars(),
                    " ")
                :
                    h("div", null, this.feedbackValue)),
            (this.feedbackAdditionalText && this.feedbackAdditionalText.length > 0)
                && h("div", { class: "additional-text", role: "text", "aria-label": `${dxp.i18n.t('Feedback:additionalFeedback')} ${this.feedbackAdditionalText}` }, this.feedbackAdditionalText)));
    }
    static get is() { return "dxp-feedback-display"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-feedback-display.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-feedback-display.css"]
    }; }
    static get properties() { return {
        "displayUserName": {
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
                "text": "prop holds fetch path value for API"
            },
            "attribute": "display-user-name",
            "reflect": false
        },
        "feedbackAdditionalText": {
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
                "text": "prop holds additional comment"
            },
            "attribute": "feedback-additional-text",
            "reflect": false
        },
        "feedbackValue": {
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
                "text": "prop holds feedback value"
            },
            "attribute": "feedback-value",
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
                "text": "prop holds cta value"
            },
            "attribute": "star-count",
            "reflect": false
        },
        "timeStamp": {
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
                "text": "prop holds timestamp value"
            },
            "attribute": "time-stamp",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
}
