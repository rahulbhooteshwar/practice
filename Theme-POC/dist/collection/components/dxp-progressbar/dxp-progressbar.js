import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-progressbar */
export class Progressbar {
    constructor() {
        /** If description should be shown or not  (for both) */
        this.haveDescription = true;
        /** minimum value for progress  (for both) */
        this.minValue = 0;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.loadProgress();
    }
    /** actions to be performed after component updating */
    componentDidUpdate() {
        this.loadProgress();
    }
    /** method to calculate radius */
    calculateRadius() {
        let radius = 50;
        if (this.progressWidth || this.backgroundWidth) {
            const maxVal = (this.progressWidth > this.backgroundWidth) ? this.progressWidth : this.backgroundWidth;
            radius = radius - (maxVal / 2);
        }
        else {
            radius = radius - 2;
        }
        return radius;
    }
    /** progressbar logic for linear type */
    linearProgress() {
        let progress;
        progress = this.element.querySelector('.progress-bar');
        let progressContainer;
        progressContainer = this.element.querySelector('.progress-container');
        let progressBar;
        progressBar = this.element.querySelector('.progress-value');
        let progressBorder;
        progressBorder = this.element.querySelector('.progress-linear');
        let tooltip;
        tooltip = this.element.querySelector('.tooltip-container');
        // apply width if defined
        if (this.width) {
            progressContainer.style.width = this.width;
        }
        // calculate percentage based on values defined
        const calcVal = Math.round(this.currentValue * 100 / this.maxValue);
        // apply class if percent-right attribute defined
        if (this.percentRight) {
            progress.classList.add('percent-right');
        }
        // calculate percentage from values defined
        if (this.currentValue <= this.maxValue && this.currentValue >= this.minValue) {
            progressBar.style.width = `${calcVal}%`;
        }
        // apply height if defined
        if (this.height) {
            progressBorder.style.height = this.height;
        }
        // apply progress color if defined
        if (this.progressColor) {
            progressBar.style.background = this.progressColor;
        }
        // apply text color if defined
        if (this.fontColor) {
            progressContainer.style.color = this.fontColor;
        }
        // apply progress background if defined
        if (this.backgroundColor) {
            progressBorder.style.background = this.backgroundColor;
        }
        if (this.asTooltip) {
            this.showPercentageForLinearTooltip(calcVal, progressContainer, tooltip);
        }
    }
    /** conditional function to check if defined type is radial or linear */
    loadProgress() {
        (this.type === 'radial') ? this.radialProgress() : this.linearProgress();
    }
    /** progressbar logic for radial type */
    radialProgress() {
        let progressContainer;
        progressContainer = this.element.querySelector('.progress-container');
        let progressSVG;
        progressSVG = this.element.querySelector('.progress');
        let progressBar;
        progressBar = this.element.querySelector('.progress-value');
        let progressBorder;
        progressBorder = this.element.querySelector('.progress-meter');
        const circleRadius = this.calculateRadius();
        const calcVal = 2 * Math.PI * circleRadius;
        // apply width if defined.
        if (this.width) {
            progressContainer.style.width = this.width;
            progressSVG.style.width = this.width;
            progressSVG.style.height = this.width;
        }
        // progress logic for svg
        if (this.currentValue <= this.maxValue && this.currentValue >= this.minValue) {
            let finalValue;
            finalValue = (calcVal * (this.maxValue - this.currentValue)) / this.maxValue;
            progressBar.style.strokeDashoffset = `${finalValue}px`;
        }
        else {
            progressBar.style.strokeDashoffset = `${calcVal}0px`;
        }
        // define percentage based on values.
        progressBar.style.strokeDasharray = `${calcVal}px`;
        // apply text color if defined
        progressSVG.querySelector('g').setAttribute('transform', 'rotate(-90 50 50)');
        if (this.fontColor) {
            try {
                // @ts-ignore
                (progressSVG.querySelector('.description-container')).style.fill = this.fontColor;
            }
            catch (e) {
                // in case of haveDescription false code will come to this catch.
                dxp.log.debug(this.element.tagName, 'radialProgress()', `description not found.`);
            }
        }
        // apply progress color if applied.
        if (this.progressColor) {
            progressBar.style.stroke = this.progressColor;
        }
        // apply progress background if applied.
        if (this.backgroundColor) {
            progressBorder.style.stroke = this.backgroundColor;
        }
    }
    /** show description for progress bar */
    showDescription(tempVal) {
        return (h("g", { class: "description-container sc-dxp-progressbar-0", transform: ((this.dir && this.dir === 'rtl') ? 'scale(-1, 1) translate(-100, 0)' : ''), "transform-origin": "center" },
            h("text", { x: "50", y: this.showPercentage ? '50' : '45', class: "svg-stats sc-dxp-progressbar-0", "alignment-baseline": "middle", "text-anchor": "middle" }, tempVal),
            h("text", { x: "50", y: this.showPercentage ? '67' : '60', class: "svg-description sc-dxp-progressbar-0", "alignment-baseline": "middle", "text-anchor": "middle" }, this.progressDescription)));
    }
    /** show progress as percentage  */
    showPercentageForLinearTooltip(calcVal, progressContainer, tooltip) {
        if (this.haveDescription) {
            progressContainer.classList.add('tooltip-enabled');
            tooltip.style.display = 'block';
            if (this.progressColor) {
                tooltip.style.background = this.progressColor;
            }
            if (this.progressColor) {
                tooltip.style.borderColor = this.progressColor;
            }
            if (this.fontColor) {
                tooltip.style.color = this.fontColor;
            }
            tooltip.innerHTML = `${calcVal}%`;
        }
    }
    /** Render the progress */
    render() {
        /** if show-percentage true then show value in percentage instead of XX/XX format. */
        const tempVal = (this.showPercentage) ? `${Math.round(this.currentValue * 100 / this.maxValue)}%` : `${this.currentValue}/${this.maxValue}`;
        // radial progress code
        const radial = h("div", { class: "svg-flex" },
            h("div", { class: "svg-flex-inner" },
                h("svg", { class: "progress progress-radial sc-dxp-progressbar-0", width: "100%", height: "100%", viewBox: "0 0 100 100" },
                    h("g", { class: "svg-circles" },
                        h("circle", { class: "progress-meter sc-dxp-progressbar-0", "data-svg-origin": "200 200", cx: "50%", cy: "50%", r: this.calculateRadius(), "stroke-width": (this.backgroundWidth) ? `${this.backgroundWidth}px` : '2px' }),
                        h("circle", { class: `progress-value sc-dxp-progressbar-0 ${this.squareCorner ? '' : 'round'}`, "data-svg-origin": "200 200", cx: "50%", cy: "50%", r: this.calculateRadius(), "stroke-width": (this.progressWidth) ? `${this.progressWidth}px` : '4px' })),
                    (this.haveDescription) ? this.showDescription(tempVal) : '')));
        // linear progress code
        const linear = [
            h("div", { class: "progress progress-linear" },
                h("div", { class: "progress-value" }, (this.haveDescription) ? h("span", { class: "tooltip-container" }) : '')),
            (this.haveDescription && !this.asTooltip) ? h("div", { class: "progress-info" },
                h("div", { class: "progress-digit" }, tempVal),
                h("div", { class: "progress-text" }, this.progressDescription)) : ''
        ];
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-progressbar render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-progressbar.min.css` })]
        ];
        return (h("div", { role: "progressbar", "aria-valuetext": (this.accessibilityText) ? this.accessibilityText
                : `${this.currentValue} out of ${this.maxValue} ${(this.progressDescription ? this.progressDescription : 'tasks completed')}`, "aria-valuenow": this.currentValue, "aria-valuemax": this.maxValue, "aria-valuemin": this.minValue, class: `${this.base.componentClass()} progress-container ${this.type}-progressbar sc-dxp-progressbar-0`, dir: this.dir, "data-theme": this.theme, tabindex: "0" },
            styles,
            h("div", { class: 'progress-bar sc-dxp-progressbar-0' }, this.type === 'radial' ? radial : linear)));
    }
    static get is() { return "dxp-progressbar"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-progressbar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-progressbar.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
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
                "text": "to define custom text for accessibility"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "asTooltip": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "if percentage to be shown in tooltip (for linear)"
            },
            "attribute": "as-tooltip",
            "reflect": false
        },
        "backgroundColor": {
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
                "text": "change color of progress background (for both)"
            },
            "attribute": "background-color",
            "reflect": false
        },
        "backgroundWidth": {
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
                "text": "define background width of progress (for both)"
            },
            "attribute": "background-width",
            "reflect": false
        },
        "currentValue": {
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
                "text": "current value of progress  (for both)"
            },
            "attribute": "current-value",
            "reflect": false
        },
        "fontColor": {
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
                "text": "define fontColor  (for both)"
            },
            "attribute": "font-color",
            "reflect": false
        },
        "haveDescription": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If description should be shown or not  (for both)"
            },
            "attribute": "have-description",
            "reflect": false,
            "defaultValue": "true"
        },
        "height": {
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
                "text": "define height  (for linear)"
            },
            "attribute": "height",
            "reflect": false
        },
        "maxValue": {
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
                "text": "maximum value for progress  (for both)"
            },
            "attribute": "max-value",
            "reflect": false
        },
        "minValue": {
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
                "text": "minimum value for progress  (for both)"
            },
            "attribute": "min-value",
            "reflect": false,
            "defaultValue": "0"
        },
        "percentRight": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "move percentage text to right of progress  (for linear)"
            },
            "attribute": "percent-right",
            "reflect": false
        },
        "progressColor": {
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
                "text": "change color of progress  (for both)"
            },
            "attribute": "progress-color",
            "reflect": false
        },
        "progressDescription": {
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
                "text": "description to show after progress count  (for both)"
            },
            "attribute": "progress-description",
            "reflect": false
        },
        "progressWidth": {
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
                "text": "define width of progress  (for both)"
            },
            "attribute": "progress-width",
            "reflect": false
        },
        "showPercentage": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "show percentage instead of XX/XX type  (for both)"
            },
            "attribute": "show-percentage",
            "reflect": false
        },
        "squareCorner": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "define if corner should be square instead of round"
            },
            "attribute": "square-corner",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'radial' | 'linear'",
                "resolved": "\"linear\" | \"radial\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of progress"
            },
            "attribute": "type",
            "reflect": false
        },
        "width": {
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
                "text": "define width  (for both)"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
}
