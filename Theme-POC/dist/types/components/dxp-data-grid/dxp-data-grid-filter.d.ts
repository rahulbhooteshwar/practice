import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-data-grid */
export declare class DataGridFilter {
    /** base component - common functionality */
    base: BaseComponent;
    /** filterElement component - HTML element */
    filterElement: HTMLElement;
    /** Error msg for max pins exceeded */
    maxPinError: string;
    /** grid element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** filter input text value */
    enteredValue: string;
    /** Boolean: Is column pinning disabled */
    isPinDisabled: boolean;
    /** Boolean: Is column pinned */
    isPinned: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /**  selectedFilter - flag to show selected Filter option */
    selectedFilter: string;
    /**  selectedSort - flag to show selected sort option */
    selectedSort: string;
    /** filter dropdown value */
    selectedValue: string;
    /** the component's theme (if any) */
    theme: string;
    /** filter data */
    cellKey: any;
    /** cell options */
    cellOptions: any;
    /** Event to emit click events */
    clickFilter: EventEmitter<{}>;
    /** Event to emit filter events */
    filterGrid: EventEmitter<{}>;
    /** Event to emit pin events */
    pinColumn: EventEmitter<{}>;
    /** Event to emit sort events */
    sortGrid: EventEmitter<{}>;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Listener for click filter */
    clickHandler(): void;
    /** Listener for toggle switch */
    columnPinned(event: any): void;
    /** Listener to value from dxp-input component */
    inputEntered(event: any): void;
    /** click listener for cta button */
    submitHandler(e: any): void;
    /** Filter function */
    filterDataGrid(event: any, filterAction: string, filterCondition?: string, filterValue?: string): void;
    /** to read dropdown value */
    handleSelect(event: any): void;
    /** Set selectedSort state */
    setSelectedSort(): void;
    /** Sort function */
    sortDataGrid(event: any, sortAction: string): void;
    /** Render the data grid */
    render(): any;
}
