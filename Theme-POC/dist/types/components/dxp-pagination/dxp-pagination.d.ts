import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-pagination */
export declare class Pagination {
    /** base component - common functionality */
    base: BaseComponent;
    /** Object to hold all text strings */
    textGroup: {
        displayText: string;
        firstButtonLabel: string;
        lastButtonLabel: string;
        previousButtonLabel: string;
        nextButtonLabel: string;
        ofText: string;
        pageText: string;
        andText: string;
        validationMessage: string;
        inputAccessibilityText: string;
    };
    /** Pagination element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** Disable Next and Last buttons */
    disableNext: boolean;
    /** Disable Previous and First buttons */
    disablePrev: boolean;
    /** Index of first record on currently showing page */
    firstUnitIndex: number;
    /** Flag to check pagenumber is valid or not */
    isValidPageNumber: boolean;
    /** Index of last record on currently showing page */
    lastUnitIndex: number;
    /** Flag to show/hide pagination */
    showPagination: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** Total pages */
    totalPages: number;
    /** Flag to hide pagination if single page present */
    hideWhenSinglePage: boolean;
    /** Pagination position */
    position: 'left' | 'center' | 'right';
    /** Number of records per page */
    unitsPerPage: number;
    /** Pagination width */
    width: string;
    /** display caption text */
    displayText: string;
    /** first button label */
    firstButtonLabel: string;
    /** last button label */
    lastButtonLabel: string;
    /** previous button label */
    previousButtonLabel: string;
    /** next button label */
    nextButtonLabel: string;
    /** of text */
    ofText: string;
    /** page text */
    pageText: string;
    /** and text */
    andText: string;
    /** Pagination input validation message */
    validationMessage: string;
    /** Accessibility text for pagination input */
    inputAccessibilityText: string;
    /** Index of currently showing page */
    currentPageIndex: number;
    /** Listener that looks for totalUnits to be changed */
    currentPageIndexChangeHandler(newValue: number, oldValue: number): void;
    /** Total number of records */
    totalUnits: number;
    /** Listener that looks for totalUnits to be changed */
    totalUnitsChangeHandler(newValue: number, oldValue: number): void;
    /** Event to emit when changing current page */
    toPageNumber: EventEmitter<{}>;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loads */
    componentDidLoad(): void;
    /** Listener to value from dxp-input component */
    inputEntered(event: any): void;
    /** method to disable/enable buttons */
    disableButtons(): void;
    /** method for showing indexing of current page */
    getTextForCurrentPage(): string;
    /** action for switching page on navigation */
    gotoPage(e: any): void;
    /** update pagination when currentPageIndex changes */
    setPagination(): void;
    /** Assign all text strings to text group variable */
    setTextGroup(): void;
    /** code to fire event for updating pagination */
    updateUnitIndex(): void;
    /** Render the pagination */
    render(): any;
}
