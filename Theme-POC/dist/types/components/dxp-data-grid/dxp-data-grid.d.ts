import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
interface CellOptions {
    /** sorting options object */
    sortOptions: any;
    /** pin options object */
    pinnedColumns: any;
    /** max pins reached check */
    maxPinsReached: boolean;
    /** filter options object */
    filterOptions: any;
}
/** dxp-data-grid */
export declare class DataGrid {
    /** base component - common functionality */
    base: BaseComponent;
    /** data-grid cta element */
    ctaContainer: HTMLElement;
    /** default column width */
    defaultColumnWidth: string;
    /** Export CSV/PDF section */
    exportSection: HTMLDivElement;
    /** filter value from event */
    filterKey: string;
    /** grid headers wrapper - common functionality */
    gridHeaders: HTMLElement;
    /** grid component - common functionality */
    gridRows: HTMLElement;
    /** isFilterVisible for store filter visibility */
    isFilterVisible: boolean;
    /** select all column width */
    selectAllColumnWidth: string;
    /** togglefilter key to handle toggle effect */
    toggleFilter: boolean;
    /** data-grid element - utilized by DXP framework */
    element: HTMLElement;
    /** cell options - store sort and filter options */
    cellOptions: CellOptions;
    /** page dataArray state */
    dataArray: JSON[];
    /** data Slice end index */
    dataSliceEndIndex: number;
    /** data Slice start index */
    dataSliceStartIndex: number;
    /** page defaultDataArray state */
    defaultDataArray: JSON[];
    /** page dir attribute */
    dir: string;
    /** page filters applied DataArray state */
    filteredDataArray: JSON[];
    /** flag to change on data updated */
    isDataUpdated: boolean;
    /** grid loaded change */
    isLoaded: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** array of pinned column keys */
    pinnedColumns: string[];
    /** row's end index */
    rowEndIndex: number;
    /** row's start index */
    rowStartIndex: number;
    /** string for storing search value */
    searchString: string;
    /** flag to show/hide pagination */
    showPaginationSection: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** headers visible on the screen */
    visibleHeaders: any;
    /** stackheaders visible on the screen */
    visibleStackHeaders: any;
    /** api url for data of grid */
    apiUrl: string;
    /** configuaration  to enable export function  */
    enableExport: boolean;
    /** enableFilter - flag to enable/disable filter dialog */
    enableFilter: boolean;
    /** flag to show/hide pagination */
    enablePagination: boolean;
    /** configuaration  to enable row selction  */
    enableRowSelection: boolean;
    /** configuaration  to enable search data function  */
    enableSearch: boolean;
    /** page stackheaders bgcolor attribute */
    enableStackheaderBgcolor: boolean;
    /** page headers attribute */
    headers: any;
    /** page headers attribute */
    headerUrl: string;
    /** grid height */
    height: string;
    /** max number of columns that can be pinned */
    maxColumnPins: number;
    /** grid no of rows */
    rowsperpage: number;
    /** grid selection type */
    selectionType: 'page' | 'grid';
    /** page stackheaders attribute */
    stackHeaders: any;
    /** sticky header: boolean */
    stickyHeader: boolean;
    /** grid width */
    width: string;
    /** page data attribute */
    data: any;
    /** Listener that looks for totalRows to be changed */
    dataChangeHandler(newValue: number, oldValue: number): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after to component loading */
    componentDidLoad(): void;
    /** actions to be performed on changing any state or prop */
    componentWillUpdate(): Promise<void>;
    /** click from filter */
    clickFilterHandler(e: any): void;
    /** method for listen click */
    clickHandler(): void;
    /** listen filter event */
    clickToggleFilter(event: any): void;
    /** dxpDataGridEvents listener for data grid events */
    dataGridEventHandler(event: any): void;
    /** method for filter event listener */
    filterDataGrid(event: any): void;
    /** Listener for action to perform for keypress event */
    handleKeyEvents(event: any): void;
    /** method for jumping to next page */
    nextpage(event: any): void;
    /** method for pin event listener */
    pinColumn(event: any): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** method for sort event listener */
    sortDataGrid(event: any): void;
    /** click listener for cta button */
    submitHandler(e: any): void;
    /** add style links to the component */
    addStyles(): void;
    /**
     * Append nested markup for child elements
     * @param nestedTarget Target container where nested elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    appendNestedMarkup(nestedTarget: HTMLElement, nestedSelector: string, data: JSON[]): HTMLElement[];
    /** Method to apply multiple filters to given array */
    applyFiltersToArray(dataArray: JSON[]): JSON[];
    /** Method to apply search to given array */
    applySearchToArray(dataArray: JSON[]): JSON[];
    /** Method to apply sorting to given array */
    applySortingToArray(dataArray: JSON[]): JSON[];
    /** Method for create row */
    createRow(row: any): void;
    /** create content for each row */
    createRowsContent(): void;
    /** Get formated rows */
    getFormatedRows(csvHeaderStructure: any): any[];
    /** Method for handle scroll */
    handlerDataGridScroll(event: any): void;
    /** Convert array data to csv structure */
    jsonToCSV(): string;
    /** Convert array data to pdf structure */
    jsonToPDF(): {
        head: any;
        body: any;
    };
    /** Convert array data to print preview */
    jsonToPrint(): any;
    /** handler method for input change */
    onSearchText(event: any): void;
    /** Method for set data grid */
    setDataGrid(): void;
    /** Method for set headers */
    setHeaders(): void;
    /** Method to index get sliced array from dataArray */
    setIndexToSliceArray(objArray: any, firstRowIndex: any, lastRowIndex: any): void;
    /** Method for setting select all */
    setSelectAll(): void;
    /** Method to configure the stack header */
    setStackHeader(): void;
    /** show stack headers */
    showStackHeaders(newHeaders: any, pinnedStackHeader: any, pinnedStackWidth: any, otherStackHeader: any, otherStackWidth: any): void;
    /** Toggle click for export */
    toggleClick(event: any): void;
    /** Toggle click for filter dialog box */
    toggleFilterDialog(): void;
    /** Toggle Keypress for export */
    toggleKey(event: any): void;
    /** Method to update data array after applying filter */
    updateDataArrayOnFilter(): void;
    /** Method to update datagrid */
    updateDataGrid(): Promise<void>;
    /** Render the Data grid */
    render(): any;
}
export {};
