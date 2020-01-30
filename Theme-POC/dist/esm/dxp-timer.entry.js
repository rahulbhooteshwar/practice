import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const messages = {
    'en': {
        months: 'Months',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        milliseconds: 'Milliseconds',
        stop: 'Stop',
        start: 'Start',
        reset: 'Reset',
        minUnitError: 'Please select minimum unit less than or equal to selected maximum unit.',
        invalidDateError: 'Please enter date in valid ISO 8601 standard format (YYYY-MM-DDThh:mm:ssTZD).'
    },
    'en-US': {
        months: 'Months',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        milliseconds: 'Milliseconds',
        stop: 'Stop',
        start: 'Start',
        reset: 'Reset',
        minUnitError: 'Please select minimum unit less than or equal to selected maximum unit.',
        invalidDateError: 'Please enter date in valid ISO 8601 standard format (YYYY-MM-DDThh:mm:ssTZD).'
    },
    'es': {
        months: 'Meses',
        days: 'Dias',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
        milliseconds: 'Milisegundas',
        stop: 'Detener',
        start: 'comienzo',
        reset: 'Reiniciar',
        minUnitError: 'Seleccione la unidad mínima menor o igual a la unidad máxima seleccionada.',
        invalidDateError: 'Ingrese la fecha en un formato estándar ISO 8601 válido (AAAA-MM-DDThh: mm: ssTZD).'
    },
    'es-ES': {
        months: 'Meses',
        days: 'Dias',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
        milliseconds: 'Milisegundas',
        stop: 'Detener',
        start: 'comienzo',
        reset: 'Reiniciar',
        minUnitError: 'Seleccione la unidad mínima menor o igual a la unidad máxima seleccionada.',
        invalidDateError: 'Ingrese la fecha en un formato estándar ISO 8601 válido (AAAA-MM-DDThh: mm: ssTZD).'
    }
};

const Timer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-timer render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", type: "text/css", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-timer.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: `${this.displayDirection} ${this.timerSize}` }, (this.showError) ?
            (h("div", { class: "unit-wrapper error-msg" }, this.errorMsg)) :
            Object.keys(this.timeCounter).map(unit => (h("div", { class: "unit-wrapper" }, h("div", { class: "unit-count" }, this.timeCounter[unit]), h("div", { class: "unit-label" }, dxp.i18n.t(`Timer:${unit}`)))))), this.timerType === 'stopwatch' && !this.showError ?
            h("div", { class: `${this.displayDirection}` }, h("dxp-cta", { type: "button", "btn-title": this.buttonTitle, "button-type": "secondary", text: this.buttonText, onClick: e => this.onStart(e) }), h("dxp-cta", { type: "button", "btn-title": "reset-button", "button-type": "secondary", text: dxp.i18n.t('Timer:reset'), onClick: () => this.onReset() })) : ''));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-timer{-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-timer,div.dxp.dxp-timer .horizontal,div.dxp.dxp-timer .vertical{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-timer .horizontal,div.dxp.dxp-timer .vertical{padding:.16rem}div.dxp.dxp-timer .horizontal dxp-cta:not(:first-child){padding-left:.5rem}div.dxp.dxp-timer .vertical{-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-timer .vertical dxp-cta:not(:first-child){padding-top:.5rem}div.dxp.dxp-timer .unit-wrapper{-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;min-width:4rem;margin:.16rem;padding:.25rem .5rem}div.dxp.dxp-timer .unit-wrapper.error-msg{width:20rem}div.dxp.dxp-timer .large{padding:.25rem}div.dxp.dxp-timer .large .unit-wrapper{margin:.25rem;min-width:6rem;padding:.75rem 1.5rem}\@media (max-width:767px){div.dxp.dxp-timer{padding:.1rem}div.dxp.dxp-timer .unit-wrapper{min-width:3rem;margin:.1rem;padding:.1rem .3rem}div.dxp.dxp-timer .large{padding:.25rem}div.dxp.dxp-timer .large .unit-wrapper{margin:.25rem;min-width:4rem;padding:.5rem 1.2rem}}"; }
};

export { Timer as dxp_timer };
