'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const Autowriter = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** variable for array objects */
        this.count = 0;
        /** variable text that gets displayed in loop as innerHTML */
        this.displayText = '';
        /** speed in milliseconds for interval to display next character */
        this.speed = 100;
        /** array text that needs to be displayed */
        this.textList = [];
    }
    /** calls function when value assigned to textList */
    textChange() {
        core.dxp.log.debug('Inside textChange');
        this.assignPlaceholderText();
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        if (this.textList.length > 0) {
            this.assignPlaceholderText();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** method to clear intervals */
    async clearAutoWriterIntervals() {
        clearInterval(this._interval);
        clearInterval(this.interval);
    }
    /** reverse the direction of autowriter */
    alternatingWriterText() {
        // clear the interval of autowriter text
        clearInterval(this._interval);
        let counter2 = this.text.length;
        this.interval = setInterval(() => {
            counter2--;
            this._count = counter2;
            this.displayText = this.displayText.substring(0, this._count);
            if (this._count === -1) {
                this.assignPlaceholderText();
            }
        }, this.speed);
    }
    /** to assign all the objects of array */
    assignPlaceholderText() {
        if (this.count >= this.textList.length) {
            this.count = 0;
        }
        this.text = this.textList[this.count].text;
        this.count++;
        this.autowriterText();
    }
    /** to display the normal autowriter text */
    autowriterText() {
        // clear the interval of alternating text
        clearInterval(this.interval);
        this.counter = 0;
        this._interval = setInterval(() => {
            this.displayText += this.text.charAt(this.counter);
            this.counter++;
            // to display alternating text
            if (this.counter === this.text.length) {
                this.alternatingWriterText();
            }
        }, this.speed);
    }
    /** method to return autowriter dom with fix or moving cursor */
    renderAutowriter() {
        if (this.fixCursor) {
            return [
                core.h("span", { class: "blinking-cursor" }),
                core.h("span", { class: `display-text ${this.customStyleClass ? this.customStyleClass : ''}` }, this.displayText)
            ];
        }
        return [
            core.h("span", { class: `display-text ${this.customStyleClass ? this.customStyleClass : ''}` }, this.displayText),
            core.h("span", { class: "blinking-cursor" })
        ];
    }
    /** Render the autowriter */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-autowriter render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-autowriter.min.css` })]
        ];
        return (core.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.textList.length > 0 && this.renderAutowriter()));
    }
    get element() { return core.getElement(this); }
    static get watchers() { return {
        "textList": ["textChange"]
    }; }
    static get style() { return "div.dxp.dxp-autowriter .blinking-cursor{-webkit-animation:blink 1s step-end infinite;-moz-animation:1s blink step-end infinite;-ms-animation:1s blink step-end infinite;-o-animation:1s blink step-end infinite;animation:blink 1s step-end infinite;margin-right:-14px}"; }
};

exports.dxp_autowriter = Autowriter;
