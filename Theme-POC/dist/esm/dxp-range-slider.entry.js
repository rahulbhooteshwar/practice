import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const NUMERIC_RANGE_SLIDER_TYPE = 'numeric-range-slider';
const RangeSlider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changeValue = createEvent(this, "changeValue", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        const rangeSlider = this.range.replace('[', '').replace(']', '');
        this.minRangeValue = rangeSlider.split('-')[0];
        this.maxRangeValue = rangeSlider.split('-')[1];
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.type === NUMERIC_RANGE_SLIDER_TYPE ? this.initMultiThumbSlider() : this.initSingleThumbSlider();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** common value initialize between single thumb and multiple thumb slider value */
    commonInit() {
        this.innerBar = this.base.shadowRootQuerySelector(this.element, '.inner-bar');
        this.trackBorderWidth = 1;
        this.thumbWidth = 24;
        this.thumbHeight = 24;
        const fixedReduceWidth = this.type === NUMERIC_RANGE_SLIDER_TYPE ? 80 : 150;
        const sliderContainer = this.base.shadowRootQuerySelector(this.element, '.slider-container');
        this.keyCode = Object.freeze({
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40
        });
        const hostParentElement = this.element.parentElement;
        if (hostParentElement && window.getComputedStyle(hostParentElement).getPropertyValue('width')) {
            sliderContainer.style.width = window.getComputedStyle(hostParentElement).getPropertyValue('width');
            let sliderContainerWidth = parseInt(sliderContainer.style.width, 10);
            // converting rem, em width to px
            if (sliderContainer.style.width.indexOf('rem') >= 0 || sliderContainer.style.width.indexOf('em') >= 0) {
                sliderContainerWidth = parseInt(sliderContainer.style.width, 10) * 16;
            }
            const sliderTrackWidth = sliderContainerWidth - fixedReduceWidth;
            this.rangeSliderTrack.style.width = `${sliderTrackWidth.toString()}px`;
        }
        this.rangeSliderTrackWidth = parseInt(window.getComputedStyle(this.rangeSliderTrack).getPropertyValue('width').slice(0, -2), 10);
        this.minThumbNode.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.minThumbNode.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.minThumbNode.addEventListener('focus', this.handleFocus.bind(this));
        this.minThumbNode.addEventListener('blur', this.handleBlur.bind(this));
    }
    /** fill lower track of single-value-slider */
    fillLowerTrackInnerBar() {
        this.innerBar.style.left = '0px';
        this.innerBar.style.width = `${(parseInt(this.minThumbNode.style.left, 10) + 1)}px`;
    }
    /** fill color between two thumb */
    fillMultipleThumbInnerBar() {
        this.innerBar.style.left = this.minThumbNode.style.left;
        this.innerBar.style.width = `${(parseInt(this.maxThumbNode.style.left, 10) - parseInt(this.minThumbNode.style.left, 10))}px`;
    }
    /** onblur thumb event handler */
    handleBlur(event) {
        const thumbType = event.target.getAttribute('range-thumb');
        if (thumbType === 'min') {
            this.minThumbNode.classList.remove('focus');
        }
        else {
            this.maxThumbNode.classList.remove('focus');
        }
        this.rangeSliderTrack.classList.remove('focus');
    }
    /** onfocus on thumb event handler */
    handleFocus(event) {
        const thumbType = event.target.getAttribute('range-thumb');
        if (thumbType === 'min') {
            this.minThumbNode.classList.add('focus');
        }
        else {
            this.maxThumbNode.classList.add('focus');
        }
        this.rangeSliderTrack.classList.add('focus');
    }
    /** handle keyboard event */
    handleKeyDown(event) {
        let flag = false;
        const thumbValue = event.target.getAttribute('range-thumb');
        this.valueNow = thumbValue === 'min' ? parseInt(this.minThumbNode.getAttribute('aria-valuenow'), 10) : parseInt(this.maxThumbNode.getAttribute('aria-valuenow'), 10);
        switch (event.keyCode) {
            case this.keyCode.left:
            case this.keyCode.down:
                thumbValue === 'min' ? this.moveSliderTo(this.valueNow - 1, this.minThumbNode, 'min') : this.moveSliderTo(this.valueNow - 1, this.maxThumbNode, 'max');
                flag = true;
                break;
            case this.keyCode.right:
            case this.keyCode.up:
                thumbValue === 'min' ? this.moveSliderTo(this.valueNow + 1, this.minThumbNode, 'min') : this.moveSliderTo(this.valueNow + 1, this.maxThumbNode, 'max');
                flag = true;
                break;
            default:
                break;
        }
        if (flag) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /** mouse down/move/up event handler  */
    handleMouseDown(event) {
        const self = this;
        const thumbType = event.target.getAttribute('range-thumb');
        const handleMouseMove = mouseMoveEvent => {
            const diffX = mouseMoveEvent.pageX - self.rangeSliderTrack.offsetLeft;
            self.valueNow = parseInt(self.minRangeValue + (((self.maxRangeValue - self.minRangeValue) * diffX) / self.rangeSliderTrackWidth), 10);
            if (thumbType === 'min') {
                self.moveSliderTo(self.valueNow, self.minThumbNode, 'min');
            }
            else {
                self.moveSliderTo(self.valueNow, self.maxThumbNode, 'max');
            }
            mouseMoveEvent.preventDefault();
            mouseMoveEvent.stopPropagation();
        };
        const handleMouseUp = () => {
            if (this.type === NUMERIC_RANGE_SLIDER_TYPE) {
                this.maxThumbNode.classList.remove('focus');
                const minCurrentValue = parseInt(this.minThumbNode.getAttribute('aria-valuenow'), 10);
                const maxCurrentValue = parseInt(this.maxThumbNode.getAttribute('aria-valuenow'), 10);
                // emit selected range value
                this.changeValue.emit({
                    minValue: this.minRangeValue,
                    maxValue: this.maxRangeValue,
                    range: [minCurrentValue, maxCurrentValue]
                });
            }
            else {
                const currentValue = parseInt(this.minThumbNode.getAttribute('aria-valuenow'), 10);
                // emit selected range value
                this.changeValue.emit({
                    minValue: this.minRangeValue,
                    maxValue: this.maxRangeValue,
                    currentValue
                });
            }
            this.minThumbNode.classList.remove('focus');
            this.rangeSliderTrack.classList.remove('focus');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        event.preventDefault();
        event.stopPropagation();
        // Set focus to the clicked handle
        if (thumbType === 'min') {
            self.minThumbNode.focus();
            self.minThumbNode.classList.add('focus');
        }
        else {
            self.maxThumbNode.focus();
            self.maxThumbNode.classList.add('focus');
        }
    }
    /** initialize numeric-range-slider value */
    initMultiThumbSlider() {
        this.minThumbNode = this.base.shadowRootQuerySelector(this.element, '[range-thumb=min]');
        this.maxThumbNode = this.base.shadowRootQuerySelector(this.element, '[range-thumb=max]');
        this.rangeSliderTrack = this.base.shadowRootQuerySelector(this.element, '.multi-range-slider');
        this.minValueNode = this.base.shadowRootQuerySelector(this.element, '.min-value');
        this.maxValueNode = this.base.shadowRootQuerySelector(this.element, '.max-value');
        this.minRangeValue = parseInt((this.minThumbNode.getAttribute('aria-valuemin')), 10);
        this.maxRangeValue = parseInt((this.maxThumbNode.getAttribute('aria-valuemax')), 10);
        this.commonInit();
        this.maxThumbNode.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.maxThumbNode.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.maxThumbNode.addEventListener('focus', this.handleFocus.bind(this));
        this.maxThumbNode.addEventListener('blur', this.handleBlur.bind(this));
        this.valueNow = parseInt((this.minThumbNode.getAttribute('aria-valuenow')), 10);
        this.moveSliderTo(this.valueNow, this.minThumbNode, 'min');
        this.valueNow = parseInt((this.maxThumbNode.getAttribute('aria-valuenow')), 10);
        this.moveSliderTo(this.valueNow, this.maxThumbNode, 'max');
    }
    /** initialize single thumb slider value */
    initSingleThumbSlider() {
        this.minThumbNode = this.base.shadowRootQuerySelector(this.element, '[range-thumb=min]');
        this.rangeSliderTrack = this.base.shadowRootQuerySelector(this.element, '.single-range-slider');
        this.minValueNode = this.base.shadowRootQuerySelector(this.element, '.single-thumb-value');
        this.minRangeValue = parseInt((this.minThumbNode.getAttribute('aria-valuemin')), 10);
        this.maxRangeValue = parseInt((this.minThumbNode.getAttribute('aria-valuemax')), 10);
        if (this.rangeSliderTrack) {
            this.rangeSliderTrackWidth = parseInt(window.getComputedStyle(this.rangeSliderTrack).getPropertyValue('width').slice(0, -2), 10);
        }
        this.commonInit();
        this.valueNow = parseInt((this.minThumbNode.getAttribute('aria-valuenow')), 10);
        this.moveSliderTo(this.valueNow, this.minThumbNode, 'min');
    }
    /** movie single or multi thumb slider  */
    moveSliderTo(value, thumbElement, thumbType) {
        const valueMax = parseInt(thumbElement.getAttribute('aria-valuemax'), 10);
        const valueMin = parseInt(thumbElement.getAttribute('aria-valuemin'), 10);
        if (value > valueMax) {
            value = valueMax;
        }
        if (value < valueMin) {
            value = valueMin;
        }
        this.valueNow = value;
        thumbElement.setAttribute('aria-valuenow', this.valueNow);
        thumbElement.setAttribute('aria-valuetext', this.valueNow);
        if (this.type === NUMERIC_RANGE_SLIDER_TYPE) {
            const pos = Math.round(((value - this.minRangeValue) *
                (this.rangeSliderTrackWidth - 2 * (this.thumbWidth - this.trackBorderWidth))) /
                (this.maxRangeValue - this.minRangeValue));
            if (thumbType === 'min') {
                this.maxThumbNode.setAttribute('aria-valuemin', this.valueNow.toString());
                thumbElement.style.left = `${(pos - this.trackBorderWidth)}px`;
                this.minValueNode.innerHTML = this.valueNow.toString();
            }
            else {
                this.minThumbNode.setAttribute('aria-valuemax', this.valueNow.toString());
                thumbElement.style.left = `${(pos + this.thumbWidth - this.trackBorderWidth)}px`;
                this.maxValueNode.innerHTML = this.valueNow.toString();
            }
            this.fillMultipleThumbInnerBar();
        }
        else {
            const pos = Math.round((this.valueNow * this.rangeSliderTrackWidth) / (this.maxRangeValue - this.minRangeValue)) - (this.thumbWidth / 2);
            thumbElement.style.left = `${pos}px`;
            if (this.minValueNode) {
                this.minValueNode.innerHTML = this.valueNow.toString();
            }
            this.fillLowerTrackInnerBar();
        }
    }
    /** Render the range-selector */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-range-selector render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-range-slider.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "slider-container" }, this.type === 'single-value-slider' &&
            h("div", { class: "single-range-slider-wrapper aria-widget-slider" }, h("div", { class: "single-thumb-min-value" }, this.minRangeValue), h("div", { class: "track single-range-slider" }, h("div", { class: "inner-bar single-thumb-inner-bar" }), h("div", { "range-thumb": "min", role: "slider", tabindex: "0", class: "min thumb slider-thumb", "aria-valuemin": this.minRangeValue, "aria-valuenow": this.value, "aria-valuetext": this.value, "aria-valuemax": this.maxRangeValue, "aria-label": this.accessibilityText })), h("div", { class: "single-thumb-max-value" }, this.maxRangeValue), h("div", { class: "track-label thumb-current-value-wrapper" }, h("span", { class: "single-thumb-value" }, "0"))), this.type === NUMERIC_RANGE_SLIDER_TYPE &&
            h("div", { class: "multi-range-slider-wrapper aria-widget-slider" }, h("div", { class: "track-label min-value" }, "0"), h("div", { class: "track multi-range-slider" }, h("div", { class: "inner-bar" }), h("div", { "range-thumb": "min", role: "slider", tabindex: "0", class: "min thumb slider-thumb", "aria-valuemin": this.minRangeValue, "aria-valuenow": this.minValue, "aria-valuetext": this.minValue, "aria-valuemax": this.maxRangeValue, "aria-label": this.accessibilityText }), h("div", { "range-thumb": "max", role: "slider", tabindex: "0", class: "max thumb slider-thumb", "aria-valuemin": this.minRangeValue, "aria-valuenow": this.maxValue, "aria-valuetext": this.maxValue, "aria-valuemax": this.maxRangeValue, "aria-label": this.accessibilityText })), h("div", { class: "track-label max-value" }, "0")))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-range-slider .slider-container{height:30px;margin-top:12px}div.dxp.dxp-range-slider .slider-container .aria-widget-slider{height:100%}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .track{border:none;position:relative;height:4px;border-radius:2px;float:left}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .slider-thumb[role=slider]{position:absolute;padding:0;margin:0;top:-.4375rem;width:1.5rem;height:1.5rem;border-radius:50%;margin-top:-.25rem}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .min-value{width:2rem;padding-right:1rem;float:left;position:relative;top:-.5rem}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .max-value{width:2rem;padding-left:1rem;float:left;position:relative;top:-.5rem}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .single-thumb-min-value{position:relative;top:-.5rem;width:2rem;padding-right:1rem;float:left}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .single-thumb-max-value{position:relative;top:-.5rem;width:2rem;float:left;padding-left:1rem}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .inner-bar{position:absolute;height:4px}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .single-thumb-inner-bar{border-radius:2px}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .thumb-current-value-wrapper{position:relative;top:-.7rem;float:left;margin-left:2rem;width:3rem;height:2rem;border-radius:1rem;text-align:center;vertical-align:middle}div.dxp.dxp-range-slider .slider-container .aria-widget-slider .thumb-current-value-wrapper .single-thumb-value{vertical-align:middle}"; }
};

export { RangeSlider as dxp_range_slider };
