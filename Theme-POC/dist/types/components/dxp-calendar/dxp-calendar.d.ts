import { EventEmitter } from '../../stencil.core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-calendar */
export declare class Calendar {
    /** base component - common functionality */
    base: BaseComponent;
    /** calendar days */
    calDays: string[];
    /** used for preparing calendar overlay body [need to check again] */
    calDivList: any[];
    /** to identify selected month/year */
    index: number;
    /** current month */
    month: number;
    /** used to hold months list, should be initialized according to locale */
    months: any[];
    /** current date */
    now: Date;
    /** current selected date */
    selectedDateFromCalendar: number;
    /** current selected month */
    selectedMonthFromCalendar: number;
    /** current selected year */
    selectedYearFromCalendar: number;
    /** selector calendar icon */
    selectorCalendarIcon: string;
    /** selector calendar view */
    selectorCalendarView: string;
    /** selector date */
    selectorDate: string;
    /** selected date input selector */
    selectorInputSelectedDate: string;
    /** month list selector */
    selectorMonth: string;
    /** year list selector */
    selectorYear: string;
    /** used to display date according to month and date */
    startDay: number;
    /** current year */
    year: number;
    /** year list */
    yearDropdownDataList: any[];
    /** calendar element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** a flag responsible for opening and closing calendar dialog/overlay */
    isCalendarOpen: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** selected date */
    selectedDate: string;
    /** the component's theme (if any) */
    theme: string;
    /** calendar ID */
    calendarId: string;
    /** default date */
    defaultDate: string;
    /** list of dates that will be disabled in dd/mm/yyyy format (not zero based on month) */
    disabledDates: any;
    /** list of dates that will be enabled in dd/mm/yyyy format (not zero based on month) - all dates outside range to be disabled */
    enabledDates: any;
    /** it will be the starting year available in calendar year dropdown */
    fromYear: number;
    /** just a configuration if consumer wants to disable the future date ( will be useful in currency converter) */
    futureDate: boolean;
    /** label for date */
    label: string;
    /** row with message available at footer of calendar overlay */
    message: string;
    /** This attribute specifies that an input field must be filled out before submitting the form */
    required: boolean;
    /** it will be the ending year available in calendar year dropdown */
    throughYear: number;
    /** emit custom event when calendar is clicked */
    calendarClick: EventEmitter;
    /** responsible for emitting an event on date selection */
    dateSelected: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate(): void;
    /** listen to another calendar on the page */
    onCalendarClickHandler(event: any): void;
    /** perform appropriate action on click event */
    onClickHandler(event: any): void;
    /** perform appropriate action on click event */
    onClickHandlerClose(event: any): void;
    /** Listen date selected event from event emmiter */
    onDateSelectedListen(event: any): void;
    /** Listener is responsible for calling */
    onKeyUpHandler(event: any): void;
    /** listen to option selected event of dxp-select */
    onOptionSelected(event: any): void;
    /** check element by attribute */
    checkElementAttribute(target: any, attribute: any, id: any): boolean;
    /** get aria-label for month */
    getAriaLabelMonth(month: any): any;
    /** get aria-label for year */
    getAriaLabelYear(year: any): any;
    /** get element by selector */
    getElementBySelector(selector: any, index?: number): Element;
    /** get elements by selector */
    getElementsBySelector(selector: any): NodeListOf<Element>;
    /** get formatted date */
    getFormattedDate(m: any, d: any, y: any): string;
    /** handle close calendar for accessibility */
    handleCalendarClose(target: any, keycode: any): void;
    /** handle accessibility events */
    handleKeyEvents(target: any, keycode: any): void;
    /** handle next */
    handleNext(): void;
    /** handle prev */
    handlePrev(): void;
    /** function is responsible for preparing data to show calendar when calendar icon is clicked (function designed by gesso team) */
    initCalendarData(): void;
    /** check is current month */
    isCurrentMonth(): boolean;
    /** if the given date (dd/m-1/yyyy) is in the list of given disabled dates, return true */
    isInDateList(currentDate: string, days: string[]): boolean;
    /** used for handling arrow keys movement in calendar (Generally used for accessibility) */
    moveFocusOnKeyPress(target: any, keycode: any): void;
    /** when month is clicked from the month's dropdown menu */
    onMonthSelected(index: any): void;
    /** This code is responsible for handing the accessibility scenarios */
    onTabPressed(target: any, keycode: any): void;
    /** when year is clicked from the year's dropdown menu */
    onYearSelected(index: any): void;
    /** pad prefix to number */
    pad(num: any, size: any, prefix?: string): any;
    /** for down arrow key */
    pressDownArrowKey(target: any): void;
    /** for left arrow key */
    pressLeftArrowKey(target: any): void;
    /** for right arrow key */
    pressRightArrowKey(target: any): void;
    /** up key pressed */
    pressUpArrowKey(target: any): void;
    /** Reflect dates relevant to month and year selected */
    renderDates(month: any, year: any): void;
    /** set current month dates */
    setCurrentMonthDates(days: any, month: any, year: any, selectedDate: any, calendarView: any): void;
    /** set date attributes - tabIndex, ariaLabel */
    setDateAttributes(): void;
    /** set default date */
    setDefaultDate(): void;
    /** set default month on init/previously selected */
    setDefaultMonth(): void;
    /** set default year on init/previously selected */
    setDefaultYear(): void;
    /** set focus by selector */
    setFocusBySelector(selector: any, index?: number): void;
    /** set focus on down key press */
    setFocusOnKeyPress(target: any): void;
    /** set month dropdown */
    setMonthDropdown(month: any): void;
    /** set next month dates in the current calendar view */
    setNextMonthDates(daysCount: any, startDay: any, days: any, year: any, month: any, calendarView: any): void;
    /** set next month future disabled dates */
    setNextMonthFutureDates(month: any, year: any, calendarView: any): void;
    /** to set previous month dates in the current calendar view */
    setPreviousMonthDates(year: any, month: any, startDay: any, daysCount: any, calendarView: any): void;
    /** set aria-label of select dropdown by selector */
    setSelectElementAriaLabel(label: any, selector: any): void;
    /** set value of select dropdown by selector */
    setSelectElementValue(value: any, selector: any): void;
    /** set year dropdown */
    setYearDropdown(year: any): void;
    /** Render the calendar */
    render(): any;
}
