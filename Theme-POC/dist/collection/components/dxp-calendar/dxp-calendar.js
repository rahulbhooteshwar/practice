import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import KEY_CODES from './key-codes';
import messages from './messages';
const CLOSE_CALENDAR = 'close-calendar';
const DISABLED_DATES = 'disabled-date';
/** dxp-calendar */
export class Calendar {
    constructor() {
        /** calendar days */
        this.calDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        /** used for preparing calendar overlay body [need to check again] */
        this.calDivList = [];
        /** used to hold months list, should be initialized according to locale */
        this.months = [];
        /** current date */
        this.now = new Date();
        /** selector calendar icon */
        this.selectorCalendarIcon = 'calendar-icon';
        /** selector calendar view */
        this.selectorCalendarView = 'calendar-view';
        /** selector date */
        this.selectorDate = 'date';
        /** selected date input selector */
        this.selectorInputSelectedDate = 'input-selected-date';
        /** month list selector */
        this.selectorMonth = 'month-list-select';
        /** year list selector */
        this.selectorYear = 'year-list-select';
        /** current year */
        this.year = this.now.getFullYear();
        /** year list */
        this.yearDropdownDataList = [];
        /** a flag responsible for opening and closing calendar dialog/overlay */
        this.isCalendarOpen = false;
        /** just a configuration if consumer wants to disable the future date ( will be useful in currency converter) */
        this.futureDate = true;
        /** row with message available at footer of calendar overlay */
        this.message = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Calendar', messages);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-calendar.min.css`;
        dxp.util.appendLinkElement(shadow, href);
        this.month = this.now.getMonth();
        this.throughYear = this.throughYear ? this.throughYear : this.now.getFullYear();
        let fromYear = this.fromYear;
        if (this.throughYear < this.fromYear) {
            this.throughYear = this.now.getFullYear();
        }
        for (fromYear; fromYear <= this.throughYear; fromYear++) {
            this.yearDropdownDataList.push(fromYear);
        }
        // To prepare div list for inserting appropriate div in cal body (reference from)
        for (let i = 0; i < 49; i++) {
            this.calDivList.push(i);
        }
        // if through year is less than current year then year dropdown should have from year as default first month as default
        if (this.throughYear < this.now.getFullYear()) {
            this.year = this.fromYear;
            this.month = 0;
        }
        this.setDefaultDate();
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate() {
        if (this.isCalendarOpen) {
            // to initialize calendar data
            this.initCalendarData();
        }
    }
    /** listen to another calendar on the page */
    onCalendarClickHandler(event) {
        if (event.detail.calendarId !== this.calendarId) {
            this.isCalendarOpen = false;
        }
    }
    /** perform appropriate action on click event */
    onClickHandler(event) {
        this.base.routingEventListener(event);
        const target = event.target ? event.composedPath()[0] : event.target;
        if (target.classList.contains('next-icon')) {
            this.handleNext();
        }
        if (target.classList.contains('prev-icon')) {
            this.handlePrev();
        }
        if (target.classList.contains(CLOSE_CALENDAR) || target.classList.contains('dxp-icon-close')) {
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
        }
        if (target.classList.contains(this.selectorDate)) {
            this.selectedDateFromCalendar = Number(target.innerText);
            this.selectedMonthFromCalendar = this.month;
            this.selectedYearFromCalendar = this.year;
            /** emit an event with the selected date for the consumer use */
            const dateObj = { 'date': target.innerText, 'month': this.month, 'year': this.year, 'target': this.element };
            this.dateSelected.emit(dateObj);
            dxp.log.info(this.element.tagName, 'onClickHandler()', dateObj);
            this.isCalendarOpen = false;
        }
        if (target.classList.contains(this.selectorCalendarIcon)
            || this.checkElementAttribute(target, 'id', this.selectorInputSelectedDate)) {
            if (!this.isCalendarOpen) {
                this.calendarClick.emit({ calendarId: this.calendarId });
            }
            // toggle calendar on click
            this.isCalendarOpen = !this.isCalendarOpen;
        }
    }
    /** perform appropriate action on click event */
    onClickHandlerClose(event) {
        const target = event.target ? event.composedPath()[0] : event.target;
        if (!target.closest('.overlay')
            && !target.classList.contains(this.selectorCalendarIcon)
            && !this.checkElementAttribute(target, 'id', this.selectorInputSelectedDate)) {
            this.isCalendarOpen = false;
        }
    }
    /** Listen date selected event from event emmiter */
    onDateSelectedListen(event) {
        const detail = event.detail;
        this.selectedDate = this.getFormattedDate(detail.month, detail.date, detail.year);
    }
    /** Listener is responsible for calling */
    onKeyUpHandler(event) {
        const target = event.target ? event.target.activeElement : event.target;
        this.onTabPressed(target, event.keyCode);
    }
    /** listen to option selected event of dxp-select */
    onOptionSelected(event) {
        const selectEvent = event.detail.event;
        const target = selectEvent.target ? selectEvent.target.activeElement : selectEvent.target;
        if (target.classList.contains(this.selectorMonth)) {
            this.onMonthSelected(Number(selectEvent.target.value));
        }
        if (target.classList.contains(this.selectorYear)) {
            this.onYearSelected(Number(selectEvent.target.value));
        }
    }
    /** check element by attribute */
    checkElementAttribute(target, attribute, id) {
        if (target.getAttribute(attribute) && target.getAttribute(attribute) === id) {
            return true;
        }
        return false;
    }
    /** get aria-label for month */
    getAriaLabelMonth(month) {
        return dxp.i18n.t('Calendar:accessibilitySelectedMonthText', { selectedMonth: this.months[month] });
    }
    /** get aria-label for year */
    getAriaLabelYear(year) {
        return dxp.i18n.t('Calendar:accessibilitySelectedYearText', { selectedYear: year });
    }
    /** get element by selector */
    getElementBySelector(selector, index = 0) {
        const ele = this.element ? this.element : this.element;
        const eles = ele.querySelectorAll(`.${selector}`);
        return eles && eles[index] ? eles[index] : undefined;
    }
    /** get elements by selector */
    getElementsBySelector(selector) {
        const ele = this.element ? this.element : this.element;
        return ele.querySelectorAll(`.${selector}`);
    }
    /** get formatted date */
    getFormattedDate(m, d, y) {
        const date = new Date(y, m, d);
        return `${this.pad(date.getMonth() + 1, 2)}/${this.pad(date.getDate(), 2)}/${date.getFullYear()}`;
    }
    /** handle close calendar for accessibility */
    handleCalendarClose(target, keycode) {
        if (target.classList.contains(CLOSE_CALENDAR) && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
        }
        if (target.classList.contains(CLOSE_CALENDAR) && keycode === KEY_CODES.TAB) {
            this.setFocusBySelector('dxp-dropdown-container');
        }
    }
    /** handle accessibility events */
    handleKeyEvents(target, keycode) {
        // Overlay should be dismissed when esc key is pressed
        if (keycode === KEY_CODES.ESC) {
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
        }
        // to handle close calendar
        this.handleCalendarClose(target, keycode);
        if (target.classList.contains('prev-icon') && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.handlePrev();
        }
        if (target.classList.contains('next-icon') && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.handleNext();
        }
        // for selector dates
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.selectedDateFromCalendar = Number(target.innerText);
            this.selectedMonthFromCalendar = this.month;
            this.selectedYearFromCalendar = this.year;
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
            if (this.dateSelected) {
                /** emit an event with the selected date for the consumer use */
                const dateObj = { 'date': target.innerText, 'month': this.month, 'year': this.year, 'target': this.element };
                this.dateSelected.emit(dateObj);
            }
        }
        // Manage year dropdown from keyboard
        if (target.classList.contains(this.selectorDate)) {
            this.moveFocusOnKeyPress(target, keycode);
        }
    }
    /** handle next */
    handleNext() {
        if (this.index === 11 && this.year < this.throughYear) {
            this.index = 0;
            this.year = +this.year + 1;
            this.onYearSelected(this.year);
        }
        else if (this.index < 11) {
            this.index += 1;
        }
        this.onMonthSelected(this.index);
    }
    /** handle prev */
    handlePrev() {
        if (this.index === 0 && this.year > this.fromYear) {
            this.index = 11;
            this.year = +this.year - 1;
            this.onYearSelected(this.year);
        }
        else if (this.index > 0) {
            this.index -= 1;
        }
        this.onMonthSelected(this.index);
    }
    /** function is responsible for preparing data to show calendar when calendar icon is clicked (function designed by gesso team) */
    initCalendarData() {
        this.setDefaultYear();
        this.setDefaultMonth();
        this.index = this.month;
        this.renderDates(this.month, this.year);
        this.setFocusBySelector(this.selectorMonth);
    }
    /** check is current month */
    isCurrentMonth() {
        return this.base.returnBooleanValue(this.month === this.now.getMonth() && this.year === this.now.getFullYear());
    }
    /** if the given date (dd/m-1/yyyy) is in the list of given disabled dates, return true */
    isInDateList(currentDate, days) {
        const date = currentDate.split('-');
        const day = date[0];
        let month = date[1];
        const year = date[2];
        month = (parseInt(month, 10) + 1).toString();
        if (month.length === 1) {
            month = `0${month}`;
        }
        const formattedDate = `${day}-${month}-${year}`;
        return days.indexOf(formattedDate) > -1;
    }
    /** used for handling arrow keys movement in calendar (Generally used for accessibility) */
    moveFocusOnKeyPress(target, keycode) {
        // for left arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.LEFT)) {
            this.pressLeftArrowKey(target);
        }
        // for up arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.UP)) {
            this.pressUpArrowKey(target);
        }
        // for right arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.RIGHT)) {
            this.pressRightArrowKey(target);
        }
        // for down arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.DOWN)) {
            this.pressDownArrowKey(target);
        }
    }
    /** when month is clicked from the month's dropdown menu */
    onMonthSelected(index) {
        this.month = index;
        this.setMonthDropdown(this.month);
        this.renderDates(this.month, this.year);
        this.index = this.month;
    }
    /** This code is responsible for handing the accessibility scenarios */
    onTabPressed(target, keycode) {
        if ((target.classList.contains(this.selectorCalendarIcon) || this.checkElementAttribute(target, 'content-id', this.selectorInputSelectedDate))
            && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.calendarClick.emit({ calendarId: this.calendarId });
            // toggle calendar
            this.isCalendarOpen = !this.isCalendarOpen;
        }
        else {
            this.handleKeyEvents(target, keycode);
        }
    }
    /** when year is clicked from the year's dropdown menu */
    onYearSelected(index) {
        this.year = index;
        this.setYearDropdown(this.year);
        this.renderDates(this.month, this.year);
    }
    /** pad prefix to number */
    pad(num, size, prefix = '0') {
        let s = num.toString();
        while (s.length < size) {
            s = prefix + s;
        }
        return s;
    }
    /** for down arrow key */
    pressDownArrowKey(target) {
        let previousMonthDate;
        const dates = this.getElementsBySelector(this.selectorDate);
        if (dates && dates.length > 0) {
            previousMonthDate = Number(dates[dates.length - 1].innerHTML);
        }
        const test = Number(target.innerText) + 7;
        if (dates && dates.length > 0) {
            if (test <= Number(dates[dates.length - 1].innerHTML)) {
                this.setFocusOnKeyPress(target);
            }
            else {
                this.handleNext();
                this.setFocusBySelector(this.selectorDate, (test - previousMonthDate) - 1);
            }
        }
    }
    /** for left arrow key */
    pressLeftArrowKey(target) {
        const dates = this.getElementsBySelector(this.selectorDate);
        if (dates && dates.length > 0 && Number(target.innerText) === Number(dates[0].innerHTML)) {
            this.handlePrev();
            const date = this.getElementsBySelector(this.selectorDate);
            this.setFocusBySelector(this.selectorDate, date.length - 1);
        }
        if (dates && dates.length > 0) {
            for (const i of Object.keys(dates)) {
                if (Number(target.innerText) - 1 === Number(dates[i].innerHTML)) {
                    this.setFocusBySelector(this.selectorDate, +i);
                }
            }
        }
    }
    /** for right arrow key */
    pressRightArrowKey(target) {
        const dates = this.getElementsBySelector(this.selectorDate);
        if (dates && dates.length > 0 && Number(target.innerText) === Number(dates[dates.length - 1].innerHTML)) {
            this.handleNext();
            const date = this.getElementsBySelector(this.selectorDate);
            if (date && dates.length > 0) {
                this.setFocusBySelector(this.selectorDate, 0);
            }
        }
        if (dates && dates.length > 0) {
            for (const i of Object.keys(dates)) {
                if (Number(target.innerText) + 1 === Number(dates[i].innerHTML)) {
                    this.setFocusBySelector(this.selectorDate, +i);
                }
            }
        }
    }
    /** up key pressed */
    pressUpArrowKey(target) {
        const test = (Number(target.innerText) - 7);
        if (test > 0) {
            const dates = this.getElementsBySelector(this.selectorDate);
            if (dates && dates.length > 0) {
                for (const i of Object.keys(dates)) {
                    if (Number(target.innerText) - 7 === Number(dates[i].innerHTML)) {
                        this.setFocusBySelector(this.selectorDate, +i);
                    }
                }
            }
        }
        else {
            this.handlePrev();
            const dates = this.getElementsBySelector(this.selectorDate);
            if (dates && dates.length > 0) {
                this.setFocusBySelector(this.selectorDate, (dates.length - 1) + test);
            }
        }
    }
    /** Reflect dates relevant to month and year selected */
    renderDates(month, year) {
        const startDay = new Date(year, month, 1).getDay();
        const days = new Date(year, month + 1, 0).getDate();
        const selectedDate = `${this.selectedDateFromCalendar}-${this.selectedMonthFromCalendar}-${this.selectedYearFromCalendar}`;
        const calendarView = this.getElementBySelector(this.selectorCalendarView);
        if (!calendarView) {
            return;
        }
        this.startDay = startDay + 7;
        for (let i = 0; i < 49; i += 1) {
            calendarView.childNodes[i].innerHTML = '&nbsp';
            calendarView.childNodes[i].setAttribute('data-index', i + 1);
        }
        // set days
        const daysCount = 7;
        for (let i = 0; i < daysCount; i += 1) {
            calendarView.childNodes[i].innerHTML = this.calDays[i];
            calendarView.childNodes[i].classList.add('date-header');
        }
        // set previous month dates
        this.setPreviousMonthDates(year, month, startDay, daysCount, calendarView);
        // set current month dates
        this.setCurrentMonthDates(days, month, year, selectedDate, calendarView);
        // set next month dates
        this.setNextMonthDates(daysCount, startDay, days, year, month, calendarView);
        // set next month future dates
        this.setNextMonthFutureDates(month, year, calendarView);
        this.setDateAttributes();
    }
    /** set current month dates */
    setCurrentMonthDates(days, month, year, selectedDate, calendarView) {
        for (let j = 1; j <= days; j += 1) {
            const currentDate = `${j}-${month}-${year}`;
            const classSelectedDate = selectedDate === currentDate ? 'selected-date' : '';
            const tabIndex = -1;
            const ariaLabel = `${Number(j)} ${this.months[this.month]} ${this.year}`;
            let classDate = this.selectorDate;
            let classBold = '';
            // set class disabled-date
            if (((j > this.now.getDate() || this.month >= this.now.getMonth() + 1)
                && this.month >= this.now.getMonth() && this.year >= this.now.getFullYear() && this.futureDate === false)
                || (this.disabledDates && this.isInDateList(currentDate, this.disabledDates))
                || (this.enabledDates && !this.isInDateList(currentDate, this.enabledDates))) {
                classDate = DISABLED_DATES;
            }
            // set class bold
            if (j === this.now.getDate() && this.isCurrentMonth()) {
                classBold = 'bold';
            }
            calendarView.childNodes[this.startDay].innerHTML = `<span tabindex=${tabIndex} data-index=${currentDate}
      class='sc-dxp-calendar ${classSelectedDate} ${classDate} ${classBold}' aria-label='${ariaLabel}' > ${j} </span>`;
            this.startDay = this.startDay + 1;
        }
    }
    /** set date attributes - tabIndex, ariaLabel */
    setDateAttributes() {
        let date = this.getElementBySelector('selected-date');
        if (!date) {
            date = this.getElementBySelector('bold');
        }
        if (!date) {
            date = this.getElementBySelector(this.selectorDate);
        }
        if (date) {
            const ariaLabel = `${dxp.i18n.t('Calendar:currentDate')} ${Number(date.innerHTML)} ${this.months[this.month]} ${this.year} ${dxp.i18n.t('Calendar:arrowKeysToMove')}`;
            date.setAttribute('aria-label', ariaLabel);
            date.setAttribute('tabindex', 0);
        }
    }
    /** set default date */
    setDefaultDate() {
        if (this.defaultDate) {
            const dates = this.defaultDate.split('/');
            if (dates && dates.length) {
                this.selectedDateFromCalendar = Number(dates[0]);
                this.selectedMonthFromCalendar = Number(dates[1]) - 1;
                this.selectedYearFromCalendar = Number(dates[2]);
                this.selectedDate = this.getFormattedDate(this.selectedMonthFromCalendar, this.selectedDateFromCalendar, this.selectedYearFromCalendar);
            }
            else {
                dxp.log.info(this.element.tagName, 'componentDidUpdate', 'Invalid default date format');
            }
        }
    }
    /** set default month on init/previously selected */
    setDefaultMonth() {
        let defaultMonth = this.selectedMonthFromCalendar >= 0 ? this.selectedMonthFromCalendar : this.now.getMonth();
        if (!this.selectedMonthFromCalendar) {
            if (this.throughYear < this.now.getFullYear()) {
                defaultMonth = 0;
            }
        }
        this.month = defaultMonth;
        const label = this.getAriaLabelMonth(this.month);
        this.setSelectElementAriaLabel(label, this.selectorMonth);
        this.setSelectElementValue(defaultMonth, this.selectorMonth);
    }
    /** set default year on init/previously selected */
    setDefaultYear() {
        let defaultYear = this.selectedYearFromCalendar >= 0 ? this.selectedYearFromCalendar : this.now.getFullYear();
        if (!this.selectedYearFromCalendar) {
            if (this.throughYear < this.now.getFullYear()) {
                defaultYear = this.fromYear;
            }
        }
        this.year = defaultYear;
        const label = this.getAriaLabelYear(this.year);
        this.setSelectElementAriaLabel(label, this.selectorYear);
        this.setSelectElementValue(defaultYear, this.selectorYear);
    }
    /** set focus by selector */
    setFocusBySelector(selector, index = 0) {
        const eles = this.getElementsBySelector(selector);
        if (!eles || !(eles.length > 0) || !eles[index]) {
            return;
        }
        eles[index].focus();
    }
    /** set focus on down key press */
    setFocusOnKeyPress(target) {
        const datesArray = this.getElementsBySelector(this.selectorDate);
        if (datesArray && datesArray.length > 0) {
            for (const i of Object.keys(datesArray)) {
                if (Number(target.innerText) + 7 === Number(datesArray[i].innerHTML)) {
                    this.setFocusBySelector(this.selectorDate, +i);
                }
            }
        }
    }
    /** set month dropdown */
    setMonthDropdown(month) {
        const label = this.getAriaLabelMonth(month);
        this.setSelectElementAriaLabel(label, this.selectorMonth);
        this.setSelectElementValue(month, this.selectorMonth);
    }
    /** set next month dates in the current calendar view */
    setNextMonthDates(daysCount, startDay, days, year, month, calendarView) {
        const tdates = daysCount + startDay + days;
        const ndates = 49 - tdates;
        const lastDate = new Date(year, month, days);
        lastDate.setDate(lastDate.getDate() + ndates);
        const nmonth = lastDate.getMonth();
        const nyear = lastDate.getFullYear();
        let ndate = 1;
        for (let i = 0; i < ndates; i += 1) {
            const currentDate = `${ndate}-${nmonth}-${nyear}`;
            const tabIndex = -1;
            const ariaLabel = `${Number(ndate)} ${this.months[nmonth]} ${nyear}`;
            const classDate = DISABLED_DATES;
            calendarView.childNodes[tdates + i].innerHTML = `<span tabindex=${tabIndex} data-index=${currentDate}
      class='sc-dxp-calendar ${classDate}' aria-label='${ariaLabel}' > ${ndate} </span>`;
            ndate = ndate + 1;
        }
    }
    /** set next month future disabled dates */
    setNextMonthFutureDates(month, year, calendarView) {
        if (this.throughYear > this.now.getFullYear() && year > this.now.getFullYear() && this.futureDate === false) {
            const days = new Date(year, month + 1, 0).getDate();
            let startDay = new Date(year, month, 1).getDay();
            startDay = startDay + 7;
            for (let j = 1; j <= days; j += 1) {
                const tabIndex = -1;
                const currentDate = `${j}-${month}-${year}`;
                const classSelectedDate = '';
                const ariaLabel = `${Number(j)} ${this.months[this.month]} ${this.year}`;
                const classDate = DISABLED_DATES;
                calendarView.childNodes[startDay].innerHTML = `<span tabindex=${tabIndex} data-index=${currentDate}
        class='sc-dxp-calendar ${classSelectedDate} ${classDate}' aria-label='${ariaLabel}' > ${j} </span>`;
                startDay = startDay + 1;
            }
        }
    }
    /** to set previous month dates in the current calendar view */
    setPreviousMonthDates(year, month, startDay, daysCount, calendarView) {
        const prevDate = new Date(year, month, 1);
        prevDate.setDate(prevDate.getDate() - startDay);
        const pmonth = prevDate.getMonth();
        const pyear = prevDate.getFullYear();
        let pdate = prevDate.getDate();
        for (let i = 0 + daysCount; i <= startDay + daysCount; i += 1) {
            const currentDate = `${pdate}-${pmonth}-${pyear}`;
            const tabIndex = -1;
            const ariaLabel = `${Number(pdate)} ${this.months[pmonth]} ${pyear}`;
            const classDate = DISABLED_DATES;
            calendarView.childNodes[i].innerHTML = `<span tabindex=${tabIndex} data-index=${currentDate}
      class='sc-dxp-calendar ${classDate}' aria-label='${ariaLabel}' > ${pdate} </span>`;
            pdate = pdate + 1;
        }
    }
    /** set aria-label of select dropdown by selector */
    setSelectElementAriaLabel(label, selector) {
        const ele = this.getElementBySelector(selector);
        if (!ele) {
            return;
        }
        ele.setAttribute('aria-label', label);
    }
    /** set value of select dropdown by selector */
    setSelectElementValue(value, selector) {
        const ele = this.getElementBySelector(selector);
        if (!ele) {
            return;
        }
        ele['value'] = value.toString();
    }
    /** set year dropdown */
    setYearDropdown(year) {
        const label = this.getAriaLabelYear(year);
        this.setSelectElementAriaLabel(label, this.selectorYear);
        this.setSelectElementValue(year, this.selectorYear);
    }
    /** Render the calendar */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-calendar render() : ${process.env.MODE}`);
        /** localize months list according to locale (this assignment cannot be in componentWillLoad because on locale change componentWillLoad is not getting called) */
        this.months = dxp.i18n.t('Calendar:monthList', { returnObjects: true });
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("div", { class: "calendar-picker" },
                h("div", { class: "input-box-container" },
                    h("dxp-input", { "content-id": this.selectorInputSelectedDate, type: "text", label: `${this.label ? this.label : ''}`, value: `${this.selectedDate ? this.selectedDate : ''}`, "is-required": this.required, "max-length": "100", "accessibility-text": dxp.i18n.t('Calendar:accessibilityDateInputText'), placeholder: "mm/dd/yyyy", readonly: true })),
                h("div", { class: this.selectorCalendarIcon, "aria-expanded": this.isCalendarOpen, "aria-label": dxp.i18n.t('Calendar:accessibilityIconText'), role: "button", tabindex: "-1" })),
            this.isCalendarOpen &&
                h("div", { class: "sc-dxp-calendar overlay", role: "application", tabindex: "-1" },
                    h("div", { class: "sc-dxp-calendar calendar-modal", tabindex: "-1" },
                        h("div", { class: "sc-dxp-calendar calendar-header", tabindex: "-1" },
                            h("div", { class: "sc-dxp-calendar action-container arrow-holder left", role: "none" },
                                h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Calendar:accessibilityPrevIconText'), class: "sc-dxp-calendar prev-icon" })),
                            h("div", { tabindex: "-1", class: "sc-dxp-calendar dxp-dropdown-container calendar-month-dropdown dxp-dropdown-md" },
                                h("div", { class: "sc-dxp-calendar action-container dxp-list-container-dropdown", id: "month-list-container-dropdown" },
                                    h("dxp-select", { selector: `${this.selectorMonth}`, useIndexAsValue: true, dataList: this.months }))),
                            h("div", { class: "sc-dxp-calendar dxp-dropdown-container calendar-year-dropdown dxp-dropdown-md", tabindex: "-1" },
                                h("div", { class: "sc-dxp-calendar action-container dxp-list-container-dropdown", id: "year-list-container-dropdown", tabindex: "-1" },
                                    h("dxp-select", { selector: `${this.selectorYear}`, dataList: this.yearDropdownDataList }))),
                            h("div", { class: "sc-dxp-calendar action-container arrow-holder right", role: "none" },
                                h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Calendar:accessibilityNextIconText'), class: "sc-dxp-calendar next-icon" }))),
                        h("div", { class: "sc-dxp-calendar dxp-row dxp-no-outline", tabindex: "-1" },
                            h("div", { class: `sc-dxp-calendar ${this.selectorCalendarView}` }, this.calDivList.map(_test => {
                                return h("div", { class: "sc-dxp-calendar date-div dxp-no-outline", tabindex: "-1" });
                            }))),
                        this.message ?
                            h("div", { class: "dxp-no-outline", tabindex: "-1" },
                                h("div", { class: "calendar-note dxp-col-12" },
                                    h("p", null,
                                        h("span", { class: "info-icon", "aria-label": dxp.i18n.t('Calendar:informationIconLabel') }),
                                        h("span", { innerHTML: `${this.message}` })))) : ''))));
    }
    static get is() { return "dxp-calendar"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-calendar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-calendar.css"]
    }; }
    static get properties() { return {
        "calendarId": {
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
                "text": "calendar ID"
            },
            "attribute": "calendar-id",
            "reflect": false
        },
        "defaultDate": {
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
                "text": "default date"
            },
            "attribute": "default-date",
            "reflect": false
        },
        "disabledDates": {
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
                "text": "list of dates that will be disabled in dd/mm/yyyy format (not zero based on month)"
            },
            "attribute": "disabled-dates",
            "reflect": false
        },
        "enabledDates": {
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
                "text": "list of dates that will be enabled in dd/mm/yyyy format (not zero based on month) - all dates outside range to be disabled"
            },
            "attribute": "enabled-dates",
            "reflect": false
        },
        "fromYear": {
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
                "text": "it will be the starting year available in calendar year dropdown"
            },
            "attribute": "from-year",
            "reflect": false
        },
        "futureDate": {
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
                "text": "just a configuration if consumer wants to disable the future date ( will be useful in currency converter)"
            },
            "attribute": "future-date",
            "reflect": false,
            "defaultValue": "true"
        },
        "label": {
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
                "text": "label for date"
            },
            "attribute": "label",
            "reflect": false
        },
        "message": {
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
                "text": "row with message available at footer of calendar overlay"
            },
            "attribute": "message",
            "reflect": false,
            "defaultValue": "''"
        },
        "required": {
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
                "text": "This attribute specifies that an input field must be filled out before submitting the form"
            },
            "attribute": "required",
            "reflect": false
        },
        "throughYear": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "it will be the ending year available in calendar year dropdown"
            },
            "attribute": "through-year",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "isCalendarOpen": {},
        "locale": {},
        "selectedDate": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "calendarClick",
            "name": "calendarClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit custom event when calendar is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "dateSelected",
            "name": "dateSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "responsible for emitting an event on date selection"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "calendarClick",
            "method": "onCalendarClickHandler",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "onClickHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "click",
            "method": "onClickHandlerClose",
            "target": "window",
            "capture": false,
            "passive": false
        }, {
            "name": "dateSelected",
            "method": "onDateSelectedListen",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "onKeyUpHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "optionSelected",
            "method": "onOptionSelected",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
