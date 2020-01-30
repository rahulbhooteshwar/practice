import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-timer */
export class Timer {
    constructor() {
        /** Boolean: to show/hide Error messages */
        this.showError = false;
        /** List of all units of time used */
        this.timeUnitList = ['months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
        /** Display direction of the timer : 'horizontal' || 'vertical' */
        this.displayDirection = 'horizontal';
        /** Max Time Unit : months || days || hours || minutes || seconds */
        this.maxUnit = 'days';
        /** Min Time Unit : months || days || hours || minutes || seconds */
        this.minUnit = 'milliseconds';
        /** Boolean: stop timer at zero */
        this.stopAtZero = true;
        /** Set timer size as large or small */
        this.timerSize = 'small';
        /** Timer type : 'countdown' || 'stopwatch' || 'timer' */
        this.timerType = 'countdown';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Timer', messages);
        this.timeCounter = {};
        this.timerStart = (this.timerType === 'countdown') ? dxp.moment.utc() : dxp.moment.utc();
        this.timerEnd = (this.timerType === 'countdown') ? dxp.moment.parseZone(this.endTime).utc() : dxp.moment.utc().clone();
        if (this.timeUnitList.indexOf(this.minUnit) < this.timeUnitList.indexOf(this.maxUnit)) {
            this.errorMsg = dxp.i18n.t('Timer:minUnitError');
            this.showError = true;
        }
        else {
            this.selectedUnitRange = this.timeUnitList.slice(this.timeUnitList.indexOf(this.maxUnit), this.timeUnitList.indexOf(this.minUnit) + 1);
            this.durationDiff = dxp.moment.duration(Object.assign({}, this.resetTimeCounter()));
            if (this.timerType === 'stopwatch') {
                this.onReset();
            }
            else if (dxp.moment.utc(this.endTime).isValid()) {
                this.setTimeCounter();
            }
            else {
                this.errorMsg = dxp.i18n.t('Timer:invalidDateError');
                this.showError = true;
            }
        }
    }
    /** actions to be performed after the component loads */
    componentDidLoad() {
        if (this.timerType !== 'stopwatch') {
            this.startTimerInterval();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** to reset the stopwatch */
    onReset() {
        this.timeCounter = Object.assign({}, this.resetTimeCounter());
        this.duration = dxp.moment.duration(Object.assign({}, this.resetTimeCounter())).clone();
        this.buttonText = dxp.i18n.t('Timer:start');
        this.buttonTitle = 'start';
        clearInterval(this.timerInterval);
    }
    /**  To start the stopwatch */
    onStart(e) {
        const currentTarget = e.currentTarget.getAttribute('btn-title');
        if (currentTarget === 'stop') {
            clearInterval(this.timerInterval);
            this.buttonText = dxp.i18n.t('Timer:start');
            this.buttonTitle = 'start';
        }
        else {
            this.timerEnd = dxp.moment.utc().clone();
            this.timerStart = dxp.moment.utc();
            this.durationDiff = this.duration;
            this.startTimerInterval();
            this.buttonText = dxp.i18n.t('Timer:stop');
            this.buttonTitle = 'stop';
        }
    }
    /** reset timer */
    resetTimeCounter() {
        const counterUpdater = {};
        for (const unit of this.selectedUnitRange) {
            counterUpdater[unit] = 0;
        }
        return counterUpdater;
    }
    /**  Sets timeCounter object */
    setTimeCounter() {
        this.timerStart = dxp.moment.utc().clone();
        const timeCheck = (this.timerType === 'countdown') ? dxp.moment.utc(this.timerEnd).isSameOrAfter(this.timerStart)
            : dxp.moment.utc(this.timerStart).isSameOrAfter(this.timerEnd);
        let counterUpdater = {};
        if (!this.stopAtZero || timeCheck) {
            this.duration = (this.timerType === 'countdown') ? dxp.moment.duration(this.timerEnd.diff(this.timerStart))
                : dxp.moment.duration(this.timerStart.diff(this.timerEnd)).add(this.durationDiff);
            for (const unit of this.selectedUnitRange) {
                counterUpdater[unit] = (unit === this.maxUnit) ?
                    (timeCheck ?
                        Math.floor(this.duration.as(unit))
                        :
                            Math.ceil(this.duration.as(unit)))
                    :
                        this.duration.get(unit);
            }
        }
        else {
            counterUpdater = this.resetTimeCounter();
            clearInterval(this.timerInterval);
        }
        this.timeCounter = Object.assign({}, counterUpdater);
    }
    /** for calling setTimeCounter with setInterval */
    startTimerInterval() {
        this.timerInterval = setInterval(() => {
            this.setTimeCounter();
        }, dxp.moment.duration(1, this.minUnit).asMilliseconds());
    }
    /** Render the timer */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-timer render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", type: "text/css", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-timer.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: `${this.displayDirection} ${this.timerSize}` }, (this.showError) ?
                (h("div", { class: "unit-wrapper error-msg" }, this.errorMsg)) :
                Object.keys(this.timeCounter).map(unit => (h("div", { class: "unit-wrapper" },
                    h("div", { class: "unit-count" }, this.timeCounter[unit]),
                    h("div", { class: "unit-label" }, dxp.i18n.t(`Timer:${unit}`)))))),
            this.timerType === 'stopwatch' && !this.showError ?
                h("div", { class: `${this.displayDirection}` },
                    h("dxp-cta", { type: "button", "btn-title": this.buttonTitle, "button-type": "secondary", text: this.buttonText, onClick: e => this.onStart(e) }),
                    h("dxp-cta", { type: "button", "btn-title": "reset-button", "button-type": "secondary", text: dxp.i18n.t('Timer:reset'), onClick: () => this.onReset() })) : ''));
    }
    static get is() { return "dxp-timer"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-timer.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-timer.css"]
    }; }
    static get properties() { return {
        "displayDirection": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'horizontal' | 'vertical'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Display direction of the timer : 'horizontal' || 'vertical'"
            },
            "attribute": "display-direction",
            "reflect": false,
            "defaultValue": "'horizontal'"
        },
        "endTime": {
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
                "text": "End Time : ISO 8601 standard timer end time, complete with time zone offset (YYYY-MM-DDThh:mm:ssTZD)"
            },
            "attribute": "end-time",
            "reflect": false
        },
        "maxUnit": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'",
                "resolved": "\"days\" | \"hours\" | \"milliseconds\" | \"minutes\" | \"months\" | \"seconds\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Max Time Unit : months || days || hours || minutes || seconds"
            },
            "attribute": "max-unit",
            "reflect": false,
            "defaultValue": "'days'"
        },
        "minUnit": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'",
                "resolved": "\"days\" | \"hours\" | \"milliseconds\" | \"minutes\" | \"months\" | \"seconds\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Min Time Unit : months || days || hours || minutes || seconds"
            },
            "attribute": "min-unit",
            "reflect": false,
            "defaultValue": "'milliseconds'"
        },
        "stopAtZero": {
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
                "text": "Boolean: stop timer at zero"
            },
            "attribute": "stop-at-zero",
            "reflect": false,
            "defaultValue": "true"
        },
        "timerSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'large' | 'small'",
                "resolved": "\"large\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set timer size as large or small"
            },
            "attribute": "timer-size",
            "reflect": false,
            "defaultValue": "'small'"
        },
        "timerType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'countdown' | 'stopwatch' | 'timer'",
                "resolved": "\"countdown\" | \"stopwatch\" | \"timer\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Timer type : 'countdown' || 'stopwatch' || 'timer'"
            },
            "attribute": "timer-type",
            "reflect": false,
            "defaultValue": "'countdown'"
        }
    }; }
    static get states() { return {
        "buttonText": {},
        "buttonTitle": {},
        "dir": {},
        "locale": {},
        "selectedUnitRange": {},
        "theme": {},
        "timeCounter": {},
        "timerInterval": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
