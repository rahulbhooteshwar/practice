import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-grid-pagination */
export declare class GridPagination {
    /** base component - common functionality */
    base: BaseComponent;
    /** Pagination element - utilized by DXP framework */
    element: HTMLElement;
    /** Index of first record on currently showing page */
    firstRowIndex: number;
    /** Flag to check pagenumber is valid or not */
    isValidPageNumber: boolean;
    /** Index of last record on currently showing page */
    lastRowIndex: number;
    /** the component's theme (if any) */
    theme: string;
    /** Total pages in data grid */
    totalPages: number;
    /** Error message to show on wrong page entered manually */
    validationMessage: string;
    /** Index of currently showing page */
    currentPageIndex: number;
    /** flag to show/hide pagination */
    showPaginationSection: boolean;
    /** Total number of records per page */
    totalRowsPerPage: number;
    /** Pagination width */
    width: string;
    /** Total Number of records in data grid */
    totalRows: number;
    /** Listener that looks for totalRows to be changed */
    totalRowsChangeHandler(newValue: number, oldValue: number): void;
    /** Event to emit when changing current page */
    toPageNumber: EventEmitter<{}>;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after to component loading */
    componentDidLoad(): void;
    /** Listener to value from dxp-input component */
    inputEntered(event: any): void;
    /** method for showing indexing of current page */
    getTextForCurrentPage(): string;
    /** action for switching page on navigation */
    gotoPage(e: any): void;
    /** code to fire event for updating data-grid */
    updateDataGridIndex(): void;
    /** Render the pagination */
    render(): any;
}
