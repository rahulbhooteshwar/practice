import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-data-grid */
export declare class DataGridCell {
    /** base component - common functionality */
    base: BaseComponent;
    /** cellElement component - HTML element */
    cellElement: HTMLElement;
    /** filterWrapperElement component - HTML element */
    filterWrapperElement: HTMLElement;
    /** grid element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /**  filterIcon - flag to show/hide filter icon */
    filterIcon: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /**  sortIcon - flag to show/hide sort icon */
    sortIcon: string;
    /** the component's theme (if any) */
    theme: string;
    /** cell key */
    cellKey: string;
    /** sort and filter options */
    cellOptions: any;
    /** Cell type */
    cellType: 'text' | 'cta' | 'checkbox';
    /** content inside cell of grid */
    content: string;
    /** cell data */
    data: any;
    /** enableFilter - flag to enable/disable filter dialog */
    enableFilter: boolean;
    /** header false */
    isHeader: boolean;
    /**  showFilters - flag to show/hide filter dialog */
    showFilters: boolean;
    /** cell width */
    width: string;
    /** Event to emit cell event */
    dxpDataGridEvents: EventEmitter<{}>;
    /** Event to emit on click header cell */
    toggleFilterEvent: EventEmitter<{}>;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after to component loading */
    componentDidLoad(): void;
    /** Listener to value from dxp-cta component */
    buttonClicked(event: any): boolean | undefined;
    /** click listener for checkbox */
    checkboxClicked(event: any): void;
    /** Listener for action to perform toggle filter on key press event */
    handleKeyEvents(event: any): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** when cell type is checkbox */
    cellTypeCheckBox(): void;
    /** set sort icon ascending or descending */
    setSortFilterIcon(): void;
    /** Shows or Hides the filter dialog */
    toggleFilters(e: any): void;
    /** Render the data grid */
    render(): any;
}
