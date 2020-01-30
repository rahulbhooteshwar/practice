import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var Progressbar = /** @class */ (function () {
    function Progressbar(hostRef) {
        registerInstance(this, hostRef);
        /** If description should be shown or not  (for both) */
        this.haveDescription = true;
        /** minimum value for progress  (for both) */
        this.minValue = 0;
    }
    /** actions to be performed prior to component loading */
    Progressbar.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed after component loading */
    Progressbar.prototype.componentDidLoad = function () {
        this.loadProgress();
    };
    /** actions to be performed after component updating */
    Progressbar.prototype.componentDidUpdate = function () {
        this.loadProgress();
    };
    /** method to calculate radius */
    Progressbar.prototype.calculateRadius = function () {
        var radius = 50;
        if (this.progressWidth || this.backgroundWidth) {
            var maxVal = (this.progressWidth > this.backgroundWidth) ? this.progressWidth : this.backgroundWidth;
            radius = radius - (maxVal / 2);
        }
        else {
            radius = radius - 2;
        }
        return radius;
    };
    /** progressbar logic for linear type */
    Progressbar.prototype.linearProgress = function () {
        var progress;
        progress = this.element.querySelector('.progress-bar');
        var progressContainer;
        progressContainer = this.element.querySelector('.progress-container');
        var progressBar;
        progressBar = this.element.querySelector('.progress-value');
        var progressBorder;
        progressBorder = this.element.querySelector('.progress-linear');
        var tooltip;
        tooltip = this.element.querySelector('.tooltip-container');
        // apply width if defined
        if (this.width) {
            progressContainer.style.width = this.width;
        }
        // calculate percentage based on values defined
        var calcVal = Math.round(this.currentValue * 100 / this.maxValue);
        // apply class if percent-right attribute defined
        if (this.percentRight) {
            progress.classList.add('percent-right');
        }
        // calculate percentage from values defined
        if (this.currentValue <= this.maxValue && this.currentValue >= this.minValue) {
            progressBar.style.width = calcVal + "%";
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
    };
    /** conditional function to check if defined type is radial or linear */
    Progressbar.prototype.loadProgress = function () {
        (this.type === 'radial') ? this.radialProgress() : this.linearProgress();
    };
    /** progressbar logic for radial type */
    Progressbar.prototype.radialProgress = function () {
        var progressContainer;
        progressContainer = this.element.querySelector('.progress-container');
        var progressSVG;
        progressSVG = this.element.querySelector('.progress');
        var progressBar;
        progressBar = this.element.querySelector('.progress-value');
        var progressBorder;
        progressBorder = this.element.querySelector('.progress-meter');
        var circleRadius = this.calculateRadius();
        var calcVal = 2 * Math.PI * circleRadius;
        // apply width if defined.
        if (this.width) {
            progressContainer.style.width = this.width;
            progressSVG.style.width = this.width;
            progressSVG.style.height = this.width;
        }
        // progress logic for svg
        if (this.currentValue <= this.maxValue && this.currentValue >= this.minValue) {
            var finalValue = void 0;
            finalValue = (calcVal * (this.maxValue - this.currentValue)) / this.maxValue;
            progressBar.style.strokeDashoffset = finalValue + "px";
        }
        else {
            progressBar.style.strokeDashoffset = calcVal + "0px";
        }
        // define percentage based on values.
        progressBar.style.strokeDasharray = calcVal + "px";
        // apply text color if defined
        progressSVG.querySelector('g').setAttribute('transform', 'rotate(-90 50 50)');
        if (this.fontColor) {
            try {
                // @ts-ignore
                (progressSVG.querySelector('.description-container')).style.fill = this.fontColor;
            }
            catch (e) {
                // in case of haveDescription false code will come to this catch.
                dxp.log.debug(this.element.tagName, 'radialProgress()', "description not found.");
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
    };
    /** show description for progress bar */
    Progressbar.prototype.showDescription = function (tempVal) {
        return (h("g", { class: "description-container sc-dxp-progressbar-0", transform: ((this.dir && this.dir === 'rtl') ? 'scale(-1, 1) translate(-100, 0)' : ''), "transform-origin": "center" }, h("text", { x: "50", y: this.showPercentage ? '50' : '45', class: "svg-stats sc-dxp-progressbar-0", "alignment-baseline": "middle", "text-anchor": "middle" }, tempVal), h("text", { x: "50", y: this.showPercentage ? '67' : '60', class: "svg-description sc-dxp-progressbar-0", "alignment-baseline": "middle", "text-anchor": "middle" }, this.progressDescription)));
    };
    /** show progress as percentage  */
    Progressbar.prototype.showPercentageForLinearTooltip = function (calcVal, progressContainer, tooltip) {
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
            tooltip.innerHTML = calcVal + "%";
        }
    };
    /** Render the progress */
    Progressbar.prototype.render = function () {
        /** if show-percentage true then show value in percentage instead of XX/XX format. */
        var tempVal = (this.showPercentage) ? Math.round(this.currentValue * 100 / this.maxValue) + "%" : this.currentValue + "/" + this.maxValue;
        // radial progress code
        var radial = h("div", { class: "svg-flex" }, h("div", { class: "svg-flex-inner" }, h("svg", { class: "progress progress-radial sc-dxp-progressbar-0", width: "100%", height: "100%", viewBox: "0 0 100 100" }, h("g", { class: "svg-circles" }, h("circle", { class: "progress-meter sc-dxp-progressbar-0", "data-svg-origin": "200 200", cx: "50%", cy: "50%", r: this.calculateRadius(), "stroke-width": (this.backgroundWidth) ? this.backgroundWidth + "px" : '2px' }), h("circle", { class: "progress-value sc-dxp-progressbar-0 " + (this.squareCorner ? '' : 'round'), "data-svg-origin": "200 200", cx: "50%", cy: "50%", r: this.calculateRadius(), "stroke-width": (this.progressWidth) ? this.progressWidth + "px" : '4px' })), (this.haveDescription) ? this.showDescription(tempVal) : '')));
        // linear progress code
        var linear = [
            h("div", { class: "progress progress-linear" }, h("div", { class: "progress-value" }, (this.haveDescription) ? h("span", { class: "tooltip-container" }) : '')),
            (this.haveDescription && !this.asTooltip) ? h("div", { class: "progress-info" }, h("div", { class: "progress-digit" }, tempVal), h("div", { class: "progress-text" }, this.progressDescription)) : ''
        ];
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-progressbar render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-progressbar.min.css" })]
        ];
        return (h("div", { role: "progressbar", "aria-valuetext": (this.accessibilityText) ? this.accessibilityText
                : this.currentValue + " out of " + this.maxValue + " " + (this.progressDescription ? this.progressDescription : 'tasks completed'), "aria-valuenow": this.currentValue, "aria-valuemax": this.maxValue, "aria-valuemin": this.minValue, class: this.base.componentClass() + " progress-container " + this.type + "-progressbar sc-dxp-progressbar-0", dir: this.dir, "data-theme": this.theme, tabindex: "0" }, styles, h("div", { class: 'progress-bar sc-dxp-progressbar-0' }, this.type === 'radial' ? radial : linear)));
    };
    Object.defineProperty(Progressbar.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Progressbar, "style", {
        get: function () { return ".dxp.dxp-progressbar .progress-radial .svg-circles,.dxp.dxp-progressbar .progress-radial circle{fill:transparent}.dxp.dxp-progressbar .progress-radial-digit{line-height:1}.dxp.dxp-progressbar .progress-radial-text{text-transform:uppercase;font-size:.625rem;letter-spacing:.125rem}.dxp.dxp-progressbar .progress-linear{display:block}.dxp.dxp-progressbar .progress-meter,.dxp.dxp-progressbar .progress-value{fill:none}.dxp.dxp-progressbar .progress-bar{position:relative}.dxp.dxp-progressbar .progress-value{-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}.dxp.dxp-progressbar .progress-value.round{stroke-linecap:round}.dxp.dxp-progressbar .progress-container{position:relative;display:inline-block;min-width:150px;width:100%}.radial-progressbar .dxp.dxp-progressbar .progress-info{font-size:inherit;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;width:100%}.radial-progressbar .dxp.dxp-progressbar .progress-digit,.radial-progressbar .dxp.dxp-progressbar .progress-text{line-height:1}.radial-progressbar .dxp.dxp-progressbar .progress-digit{font-size:.3em;line-height:1;margin-bottom:.3125rem}.radial-progressbar .dxp.dxp-progressbar .progress-text{font-weight:600;font-size:.05em}.dxp.dxp-progressbar :host path,.dxp.dxp-progressbar svg path{fill:none;stroke-width:.375rem;stroke-miterlimit:round;stroke-linecap:round;-webkit-transition:stroke-dashoffset .4s ease-in-out;transition:stroke-dashoffset .4s ease-in-out}.dxp.dxp-progressbar :host{background:var(--sample-color)}.dxp.dxp-progressbar .progress-linear{height:6px;width:100%;border-radius:6.25rem;position:relative}.dxp.dxp-progressbar .progress-linear .progress-value{display:block;position:absolute;height:100%;left:0;top:0;border-radius:6.25rem}.dxp.dxp-progressbar .percent-right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.dxp.dxp-progressbar .percent-right .progress-info{margin-top:0;margin-left:.75rem;line-height:.375rem}.dxp.dxp-progressbar .percent-right .progress-info .progress-digit{margin-right:0}.dxp.dxp-progressbar text{-webkit-transform-origin:center;transform-origin:center;font-size:.625rem}.dxp.dxp-progressbar .svg-stats{font-weight:600;font-size:1.2875rem;margin-bottom:.625rem}.dxp.dxp-progressbar .svg-description{text-transform:uppercase;font-size:.375rem}.dxp.dxp-progressbar .tooltip-container{position:absolute;display:none;bottom:100%;right:0;padding:.3125rem;line-height:1;border-radius:.1875rem;-webkit-transform:translate(50%,-30%);transform:translate(50%,-30%);font-size:.875rem}.dxp.dxp-progressbar .tooltip-container:after{content:\"\";display:block;position:absolute;left:0;right:0;bottom:-.1875rem;-webkit-transform:rotate(45deg);transform:rotate(45deg);margin:auto;z-index:-1;-webkit-transform-origin:center;transform-origin:center;width:10px;height:10px;background:inherit}.dxp.dxp-progressbar.tooltip-enabled{padding-top:2rem}.linear-progressbar .progress-digit,.linear-progressbar .progress-text{font-size:.75rem;display:inline-block;width:auto;text-transform:lowercase;line-height:1}.linear-progressbar .progress-digit{margin-right:.3125rem}.linear-progressbar .progress-info{line-height:1;margin-top:.3125rem}.svg-flex-inner{position:relative;padding-top:100%}.svg-flex svg{width:100%;height:100%;position:absolute;margin-top:-100%}.progress-container[dir=rtl].linear-progressbar .progress-digit{margin-left:.3125rem;margin-right:0}.progress-container[dir=rtl].linear-progressbar .progress-linear{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.progress-container[dir=rtl].linear-progressbar .progress-linear .tooltip-container{-webkit-transform:translate(50%,135%) scale(-1);transform:translate(50%,135%) scale(-1);bottom:0}.progress-container[dir=rtl].linear-progressbar .progress-bar.percent-right .progress-info{margin-left:0;margin-right:.75rem}.progress-container[dir=rtl].linear-progressbar .progress-bar.percent-right .progress-info .progress-digit{margin-left:0;margin-right:.3125rem}.progress-container[dir=rtl] .progress-radial{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.progress-container[dir=rtl] .progress-radial .description-container{-webkit-transform:scaleX(-1);transform:scaleX(-1);-webkit-transform-origin:center;transform-origin:center}"; },
        enumerable: true,
        configurable: true
    });
    return Progressbar;
}());
export { Progressbar as dxp_progressbar };
