import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const IS_VISIBLE = 'is-visible';
/** dxp-data-grid */
export class DataGrid {
    constructor() {
        /** default column width */
        this.defaultColumnWidth = '200px';
        /** select all column width */
        this.selectAllColumnWidth = '50px';
        /** flag to change on data updated */
        this.isDataUpdated = false;
        /** grid loaded change */
        this.isLoaded = false;
        /** array of pinned column keys */
        this.pinnedColumns = [];
        /** flag to show/hide pagination */
        this.showPaginationSection = true;
        /** headers visible on the screen */
        this.visibleHeaders = [];
        /** stackheaders visible on the screen */
        this.visibleStackHeaders = [];
        /** configuaration  to enable export function  */
        this.enableExport = true;
        /** flag to show/hide pagination */
        this.enablePagination = true;
        /** configuaration  to enable search data function  */
        this.enableSearch = true;
        /** page headers attribute */
        this.headers = [];
        /** max number of columns that can be pinned */
        this.maxColumnPins = 2;
        /** grid no of rows */
        this.rowsperpage = 10;
        /** grid selection type */
        this.selectionType = 'grid';
        /** page stackheaders attribute */
        this.stackHeaders = [];
        /** sticky header: boolean */
        this.stickyHeader = true;
    }
    /** Listener that looks for totalRows to be changed */
    dataChangeHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.isDataUpdated = true;
        }
    }
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'DataGrid', messages);
        await this.updateDataGrid();
        this.isDataUpdated = false;
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        if (this.data && !this.isLoaded) {
            this.setDataGrid();
        }
    }
    /** actions to be performed on changing any state or prop */
    async componentWillUpdate() {
        this.addStyles();
        if (this.isDataUpdated) {
            await this.updateDataGrid();
            this.gridRows.innerHTML = '';
            this.gridHeaders.innerHTML = '';
            this.isLoaded = false;
            this.setDataGrid();
            this.isDataUpdated = false;
        }
    }
    /** click from filter */
    clickFilterHandler(e) {
        this.isFilterVisible = (e.detail === 'OTHER');
    }
    /** method for listen click */
    clickHandler() {
        // Hide filter on click of outside area
        this.toggleFilterDialog();
        // Hide export on click of outside area
        if (this.exportSection && this.exportSection.classList.contains(IS_VISIBLE)) {
            this.exportSection.classList.remove(IS_VISIBLE);
            const exportLink = this.element.querySelector('.action-export');
            exportLink.classList.remove('hide-link');
            exportLink.setAttribute('aria-expanded', 'false');
        }
    }
    /** listen filter event */
    clickToggleFilter(event) {
        this.filterKey = event.detail;
    }
    /** dxpDataGridEvents listener for data grid events */
    dataGridEventHandler(event) {
        const eventDetail = event.detail;
        const selectForCheckbox = this.gridRows.querySelectorAll('dxp-checkbox[dxpgrid="select"]');
        if (eventDetail.actionName === 'ActionForDxpSelectAll') {
            this.dataArray = this.dataArray.map((row, index) => {
                return (Object.assign(Object.assign({}, row), { dxpSelectedRow: (index >= this.dataSliceStartIndex && index < this.dataSliceEndIndex) ? eventDetail.details.isChecked : row.dxpSelectedRow }));
            });
            selectForCheckbox.forEach((checkbox) => {
                checkbox['setChecked'](eventDetail.details.isChecked);
            });
        }
        if (eventDetail.actionName === 'ActionForDxpSelect') {
            this.dataArray = this.dataArray.map((row) => ((row.dxpRowId === eventDetail.row.dxpRowId) ? Object.assign(Object.assign({}, row), { dxpSelectedRow: eventDetail.details.isChecked }) : row));
        }
        this.setSelectAll();
    }
    /** method for filter event listener */
    filterDataGrid(event) {
        if (event.detail.filterAction === 'filtering') {
            this.cellOptions.filterOptions[event.detail.cellKey] = {
                filterAction: 'filtering',
                filterCondition: event.detail.filterCondition,
                filterValue: event.detail.filterValue
            };
            if (typeof event.detail.cellKey === 'function') {
                this.cellOptions.filterOptions[event.detail.cellKey].cellKeyFunction = event.detail.cellKey;
            }
        }
        else if (event.detail.filterAction === 'remove-filter' && this.cellOptions.filterOptions && this.cellOptions.filterOptions[event.detail.cellKey]) {
            delete this.cellOptions.filterOptions[event.detail.cellKey];
        }
        this.updateDataArrayOnFilter();
        this.setIndexToSliceArray(this.dataArray, 0, this.rowsperpage);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    }
    /** Listener for action to perform for keypress event */
    handleKeyEvents(event) {
        const eventKey = event.key || event.keyCode;
        if ((eventKey === ' ' || eventKey === 32) || (eventKey === 'Enter' || eventKey === 13)) {
            this.clickHandler();
        }
        event.stopPropagation();
    }
    /** method for jumping to next page */
    nextpage(event) {
        this.setIndexToSliceArray(this.dataArray, event.detail.firstRowIndex, event.detail.lastRowIndex);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    }
    /** method for pin event listener */
    pinColumn(event) {
        if (event.detail.status) {
            this.cellOptions.pinnedColumns[event.detail.cellKey] = 0;
            if (Object.keys(this.cellOptions.pinnedColumns).length >= this.maxColumnPins) {
                this.cellOptions.maxPinsReached = true;
            }
        }
        else {
            delete this.cellOptions.pinnedColumns[event.detail.cellKey];
            this.cellOptions.maxPinsReached = false;
        }
        if (!this.enablePagination) {
            this.setIndexToSliceArray(this.dataArray, 0, this.rowsperpage);
        }
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** method for sort event listener */
    sortDataGrid(event) {
        this.cellOptions.sortOptions = {};
        this.dataArray = (JSON.stringify(this.cellOptions.filterOptions) === '{}') ? [...this.defaultDataArray] : [...this.filteredDataArray];
        this.dataArray = (this.searchString === '') ? [...this.dataArray] : this.applySearchToArray([...this.dataArray]);
        if (event.detail.sortAction !== 'remove-sort') {
            this.cellOptions.sortOptions[event.detail.cellKey] = event.detail.sortAction;
            if (typeof event.detail.cellKey === 'function') {
                this.cellOptions.sortOptions.cellKeyFunction = event.detail.cellKey;
            }
            this.dataArray = this.applySortingToArray([...this.dataArray]);
        }
        this.setIndexToSliceArray(this.dataArray, 0, this.rowsperpage);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    }
    /** click listener for cta button */
    submitHandler(e) {
        e.preventDefault();
        // Action - On click of submit button
        if (e.target.getAttribute('btn-id') === 'exportcsv') {
            const csvData = this.jsonToCSV();
            dxp.util.downloadFile(csvData, 'csv');
        }
        if (e.target.getAttribute('btn-id') === 'exportpdf') {
            const pdfData = this.jsonToPDF();
            dxp.util.downloadFile(pdfData, 'pdf');
        }
        if (e.target.getAttribute('btn-id') === 'printpreview') {
            const printData = this.jsonToPrint();
            dxp.print({
                printable: printData.body,
                properties: printData.head,
                type: 'json'
            });
        }
    }
    /** add style links to the component */
    addStyles() {
        const shadow = this.element ? this.element : this.element;
        const optionalLinkParams = { 'data-id': 'data-grid' };
        if (shadow.querySelectorAll('link[data-id="data-grid"]').length <= 3) {
            let href = ``;
            dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
            href = ``;
            dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
            href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-data-grid.min.css`;
            dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
        }
    }
    /**
     * Append nested markup for child elements
     * @param nestedTarget Target container where nested elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    appendNestedMarkup(nestedTarget, nestedSelector, data) {
        const fragment = document.createDocumentFragment();
        const appendNestedElements = [];
        if (data && nestedSelector && nestedTarget) {
            data.forEach((item) => {
                const ref = document.createElement(nestedSelector);
                // if keys of object is in kebabcase then it should be converted into camelcase
                const formattedItem = this.base.formatDataObjectKeys(item);
                Object.assign(ref, formattedItem);
                fragment.appendChild(ref);
                appendNestedElements.push(ref);
            });
            nestedTarget.appendChild(fragment);
        }
        return appendNestedElements;
    }
    /** Method to apply multiple filters to given array */
    applyFiltersToArray(dataArray) {
        Object.keys(this.cellOptions.filterOptions).forEach(cellKey => {
            dataArray = (this.cellOptions.filterOptions[cellKey].hasOwnProperty('cellKeyFunction')) ?
                ((this.cellOptions.filterOptions[cellKey].filterCondition === 'isEqualTo') ?
                    (dataArray.filter(obj => this.cellOptions.filterOptions[cellKey].cellKeyFunction(obj).toLowerCase() === this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase()))
                    :
                        (dataArray.filter(obj => this.cellOptions.filterOptions[cellKey].cellKeyFunction(obj).toLowerCase() !== this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase()))) :
                ((this.cellOptions.filterOptions[cellKey].filterCondition === 'isEqualTo') ?
                    (dataArray.filter(obj => obj[cellKey].toString().toLowerCase() === this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase())) :
                    (dataArray.filter(obj => obj[cellKey].toString().toLowerCase() !== this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase())));
        });
        return dataArray;
    }
    /** Method to apply search to given array */
    applySearchToArray(dataArray) {
        dataArray = dataArray.filter(obj => {
            let dataMatched = false;
            this.visibleHeaders.forEach(header => {
                const cellType = header['column_type'];
                if (!cellType || cellType === 'text' || cellType === 'number') {
                    const COL_KEY_VALUE = header['column_key'];
                    const content = (typeof COL_KEY_VALUE === 'function') ? COL_KEY_VALUE(obj) : obj[COL_KEY_VALUE];
                    if (content.toString().toLowerCase().includes(this.searchString.toLowerCase())) {
                        dataMatched = true;
                    }
                }
            });
            if (dataMatched) {
                return obj;
            }
        });
        return dataArray;
    }
    /** Method to apply sorting to given array */
    applySortingToArray(dataArray) {
        const sortOptions = this.cellOptions.sortOptions;
        if (sortOptions.hasOwnProperty('cellKeyFunction')) {
            dataArray.sort((a, b) => {
                if (sortOptions.cellKeyFunction(a) > sortOptions.cellKeyFunction(b)) {
                    return 1;
                }
                if (sortOptions.cellKeyFunction(a) < sortOptions.cellKeyFunction(b)) {
                    return -1;
                }
                return 0;
            });
        }
        else {
            dataArray.sort((a, b) => {
                if (a[Object.keys(sortOptions)[0]] > b[Object.keys(sortOptions)[0]]) {
                    return 1;
                }
                if (a[Object.keys(sortOptions)[0]] < b[Object.keys(sortOptions)[0]]) {
                    return -1;
                }
                return 0;
            });
        }
        return (sortOptions[Object.keys(sortOptions)[0]] === 'descending') ? dataArray.reverse() : dataArray;
    }
    /** Method for create row */
    createRow(row) {
        if (row.isHeader || row.isStackHeader) {
            this.appendNestedMarkup(this.gridHeaders, 'dxp-data-grid-row', [row]);
        }
        else {
            this.appendNestedMarkup(this.gridRows, 'dxp-data-grid-row', [row]);
        }
    }
    /** create content for each row */
    createRowsContent() {
        this.dataArray.slice(this.rowStartIndex, this.rowEndIndex).forEach(row => {
            const rowdata = this.visibleHeaders.map(col => {
                let content = '';
                const cellKey = col.column_key;
                const cellType = col['column_type'];
                const width = col['column_width'];
                let celldata = '';
                if (!cellType || cellType === 'text' || cellType === 'number') {
                    const COL_KEY_VALUE = col['column_key'];
                    content = (typeof COL_KEY_VALUE === 'function') ? COL_KEY_VALUE(row) : row[COL_KEY_VALUE];
                }
                else {
                    celldata = col['column_data'];
                }
                return ({ cellType: cellType ? cellType : 'text', cellKey, content, data: { celldata, row, header: col }, width });
            });
            const selectbox = {
                cellType: 'checkbox', pinned: 0, width: this.selectAllColumnWidth, data: {
                    celldata: { 'value': 'select', 'name': '' }, row,
                    header: { column_action: 'ActionForDxpSelect', column_key: 'dxpSelectedRow' }
                }
            };
            const rowStructure = {
                data: {
                    rowStructure: this.enableRowSelection ? [selectbox, ...rowdata] : rowdata, row, headers: this.visibleHeaders, pinnedColumns: this.cellOptions.pinnedColumns
                }
            };
            this.createRow(rowStructure);
        });
    }
    /** Get formated rows */
    getFormatedRows(csvHeaderStructure) {
        return this.dataArray.filter((row, index) => row.dxpSelectedRow && (index >= this.dataSliceStartIndex && index < this.dataSliceEndIndex)).map(row => csvHeaderStructure.map(head => {
            const COL_KEY_VALUE = head['column_key'];
            return ((typeof COL_KEY_VALUE === 'function') ? COL_KEY_VALUE(row) : row[COL_KEY_VALUE]);
        }));
    }
    /** Method for handle scroll */
    handlerDataGridScroll(event) {
        if ((event.target.scrollHeight - event.target.scrollTop) + 7 < event.target.offsetHeight) {
            if (!this.enablePagination) {
                this.rowStartIndex = this.rowEndIndex;
                this.rowEndIndex = this.rowStartIndex + this.rowsperpage;
                this.setDataGrid();
            }
        }
    }
    /** Convert array data to csv structure */
    jsonToCSV() {
        const csvHeaderStructure = this.headers.filter(head => (!head.column_type || head.column_type === 'text'));
        const csvHeader = csvHeaderStructure.map(head => head.column_name);
        const csvRows = this.getFormatedRows(csvHeaderStructure);
        const csvDataArray = [csvHeader, ...csvRows];
        return csvDataArray.map(row => row.join(',')).join('\r\n').toString();
    }
    /** Convert array data to pdf structure */
    jsonToPDF() {
        const pdfHeaderStructure = this.headers.filter(head => (!head.column_type || head.column_type === 'text'));
        const pdfHeader = pdfHeaderStructure.map(head => head.column_name);
        const pdfRows = this.getFormatedRows(pdfHeaderStructure);
        return ({ head: pdfHeader, body: pdfRows });
    }
    /** Convert array data to print preview */
    jsonToPrint() {
        const pdfHeaderStructure = this.headers.filter(head => (!head.column_type || head.column_type === 'text'));
        const pdfHeader = pdfHeaderStructure.map(head => {
            return { field: (typeof head.column_key === 'function') ? (head.column_name).toLowerCase().replace(' ', '_') : head.column_key, displayName: head.column_name };
        });
        const pdfRows = this.dataArray.filter((row, index) => row.dxpSelectedRow && (index >= this.dataSliceStartIndex && index < this.dataSliceEndIndex)).map(row => {
            const modifiedRow = {};
            pdfHeaderStructure.map(head => {
                const col_key_value = head.column_key;
                const col_key = (typeof head.column_key === 'function') ? (head.column_name).toLowerCase().replace(' ', '_') : head.column_key;
                modifiedRow[col_key] = (typeof col_key_value === 'function') ? col_key_value(row) : (row[col_key_value] ? row[col_key_value] : '');
            });
            return modifiedRow;
        });
        const printPreviewDataArray = { head: pdfHeader, body: pdfRows };
        return printPreviewDataArray;
    }
    /** handler method for input change */
    onSearchText(event) {
        this.searchString = (event.target.value && event.target.value.trim()) ? event.target.value.trim() : '';
        this.updateDataArrayOnFilter();
        this.setIndexToSliceArray(this.dataArray, 0, this.rowsperpage);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    }
    /** Method for set data grid */
    setDataGrid() {
        if ((!this.headers || this.headers.length === 0) && this.dataArray) {
            this.setHeaders();
        }
        this.setStackHeader();
        const selectAllValue = this.dataArray.slice(this.dataSliceStartIndex, this.dataSliceEndIndex).every((row) => row.dxpSelectedRow);
        const selectAll = {
            cellType: 'checkbox', pinned: 0, width: this.selectAllColumnWidth, data: {
                celldata: { 'value': 'selectall', 'name': '', 'selected': selectAllValue },
                header: { column_action: 'ActionForDxpSelectAll' }
            }
        };
        const removeSelectAll = {
            width: this.selectAllColumnWidth,
            pinned: 0,
            data: {
                celldata: {
                    'value': 'selectall', 'name': '', 'selected': selectAllValue
                },
                header: { column_action: 'ActionForDxpSelectAll' }
            }
        };
        const rowsdata = this.visibleHeaders.map(col => ({ cellType: 'text', content: col.column_name, cellKey: col.column_key, enableFilter: this.enableFilter, cellOptions: this.cellOptions, width: col.column_width }));
        const stackHeadersData = this.visibleStackHeaders.map(stack => ({ cellType: 'text', content: stack.column_name, width: stack.column_width, pinned: stack.pinned }));
        const rowHeaderStructure = {
            isHeader: true,
            data: { rowStructure: this.enableRowSelection ? [selectAll, ...rowsdata] : rowsdata, pinnedColumns: this.cellOptions.pinnedColumns }
        };
        const stackHeaderStructure = {
            isStackHeader: true, data: {
                rowStructure: this.enableRowSelection ? [removeSelectAll, ...stackHeadersData] : stackHeadersData
            },
            stackHeaderColor: this.enableStackheaderBgcolor
        };
        if (this.enablePagination || !this.isLoaded) {
            if (this.stackHeaders && (this.stackHeaders.length !== 0) && this.dataArray) {
                this.createRow(stackHeaderStructure);
            }
            if (this.enablePagination) {
                this.showPaginationSection = this.dataArray.length > this.rowsperpage;
            }
            this.createRow(rowHeaderStructure);
        }
        this.createRowsContent();
        this.isLoaded = true;
    }
    /** Method for set headers */
    setHeaders() {
        const headerKeys = this.dataArray.reduce((init, next) => {
            init = init || [];
            Object.keys(next).forEach(col => {
                if (!init.includes(col)) {
                    init.push(col);
                }
            });
            return init;
        }, []);
        this.headers = headerKeys.map(it => ({ column_name: it, column_key: it }));
    }
    /** Method to index get sliced array from dataArray */
    setIndexToSliceArray(objArray, firstRowIndex, lastRowIndex) {
        this.rowStartIndex = firstRowIndex;
        this.rowEndIndex = lastRowIndex;
        this.dataSliceStartIndex = this.selectionType === 'page' ? this.rowStartIndex : 0;
        this.dataSliceEndIndex = this.selectionType === 'page' ? this.rowEndIndex : objArray.length;
    }
    /** Method for setting select all */
    setSelectAll() {
        const selectAll = [...this.gridHeaders.querySelectorAll('dxp-checkbox[dxpgrid="selectall"]'),
            ...this.gridRows.querySelectorAll('dxp-checkbox[dxpgrid="selectall"]')];
        const selectAllValue = this.dataArray.slice(this.dataSliceStartIndex, this.dataSliceEndIndex).every((row) => row.dxpSelectedRow);
        if (selectAll && selectAll.length > 0) {
            selectAll[0]['setChecked'](selectAllValue);
        }
    }
    /** Method to configure the stack header */
    setStackHeader() {
        const pinnedHeaders = [];
        const newHeaders = [];
        const otherHeader = [];
        let pinnedStackWidth = 0;
        let leftOffset = this.enableRowSelection ?
            parseInt(this.selectAllColumnWidth.replace('px', ''), 10) : 0;
        let otherStackWidth = 0;
        const pinnedStackHeader = {
            pinned: leftOffset,
            column_name: dxp.i18n.t('DataGrid:pinnedColumnsText'),
            column_width: '0px'
        };
        const otherStackHeader = {
            column_width: '0px'
        };
        this.headers.map(header => {
            if (Object.keys(this.cellOptions.pinnedColumns).indexOf(header.column_key) > -1) {
                this.cellOptions.pinnedColumns[header.column_key] = leftOffset;
                header.column_width = header.column_width || this.defaultColumnWidth;
                pinnedHeaders.push(header);
                pinnedStackWidth = pinnedStackWidth + parseInt(header.column_width.replace('px', ''), 10);
                leftOffset = leftOffset + parseInt(header.column_width.replace('px', ''), 10);
            }
            else if (!header.stack_key || !header.stack_key.length || !this.stackHeaders || this.stackHeaders.length === 0) {
                otherHeader.push(header);
                header.column_width = header.column_width || this.defaultColumnWidth;
                otherStackWidth = otherStackWidth + parseInt(header.column_width.replace('px', ''), 10);
            }
        });
        if (this.stackHeaders && (this.stackHeaders.length !== 0) && this.dataArray) {
            this.showStackHeaders(newHeaders, pinnedStackHeader, pinnedStackWidth, otherStackHeader, otherStackWidth);
        }
        this.visibleHeaders = [...pinnedHeaders, ...newHeaders, ...otherHeader];
    }
    /** show stack headers */
    showStackHeaders(newHeaders, pinnedStackHeader, pinnedStackWidth, otherStackHeader, otherStackWidth) {
        this.stackHeaders.map(STACK_HEADER => {
            STACK_HEADER.column_width = 0;
            this.headers.map(header => {
                const HEADER_KEY = header.stack_key;
                const STACK_HEADER_ID = STACK_HEADER.column_id;
                if ((HEADER_KEY && HEADER_KEY.findIndex(head => head.value === STACK_HEADER_ID) >= 0) &&
                    (Object.keys(this.cellOptions.pinnedColumns).indexOf(header.column_key) === -1)) {
                    newHeaders.push(header);
                    header.column_width = header.column_width || this.defaultColumnWidth;
                    STACK_HEADER.column_width = STACK_HEADER.column_width + parseInt(header.column_width.replace('px', ''), 10);
                }
            });
            pinnedStackHeader.column_width = `${pinnedStackWidth}px`;
            otherStackHeader.column_width = `${otherStackWidth}px`;
            STACK_HEADER.column_width = `${STACK_HEADER.column_width}px`;
        });
        if (pinnedStackWidth > 0) {
            this.stackHeaders.unshift(pinnedStackHeader);
        }
        this.stackHeaders.push(otherStackHeader);
        this.visibleStackHeaders = this.stackHeaders.filter(e => parseInt(e.column_width.replace('px', ''), 10) > 0);
    }
    /** Toggle click for export */
    toggleClick(event) {
        // hide filter dialog box if open
        this.toggleFilterDialog();
        event.preventDefault();
        this.exportSection.classList.toggle(IS_VISIBLE);
        const exportLink = this.element.querySelector('.action-export');
        exportLink.classList.toggle('hide-link');
        exportLink.setAttribute('aria-expanded', exportLink.classList.contains('hide-link') ? 'true' : 'false');
        event.stopPropagation();
    }
    /** Toggle click for filter dialog box */
    toggleFilterDialog() {
        if (!this.isFilterVisible) {
            const dxpFilters = this.gridHeaders.querySelectorAll('dxp-data-grid-filter');
            dxpFilters.forEach((ele) => {
                if (ele['cellKey'] !== this.filterKey) {
                    ele.closest('dxp-data-grid-cell')['showFilters'] = false;
                    ele.parentNode.parentNode['classList'].remove('is-selected');
                }
                else {
                    ele.closest('dxp-data-grid-cell')['showFilters'] = true;
                    ele.parentNode.parentNode['classList'].add('is-selected');
                }
            });
            this.filterKey = '';
        }
        else {
            this.isFilterVisible = false;
        }
    }
    /** Toggle Keypress for export */
    toggleKey(event) {
        const eventKey = event.key || event.keyCode;
        // handle space and enter key
        if ((eventKey === ' ' || eventKey === 32) || (eventKey === 'Enter' || eventKey === 13)) {
            this.toggleClick(event);
        }
    }
    /** Method to update data array after applying filter */
    updateDataArrayOnFilter() {
        const dataArrayToManipulate = (this.searchString === '') ? [...this.defaultDataArray] : this.applySearchToArray([...this.defaultDataArray]);
        this.filteredDataArray = this.applyFiltersToArray([...dataArrayToManipulate]);
        this.dataArray = (JSON.stringify(this.cellOptions.sortOptions) === '{}') ? [...this.filteredDataArray] : this.applySortingToArray([...this.filteredDataArray]);
        this.filteredDataArray = [...this.dataArray];
    }
    /** Method to update datagrid */
    async updateDataGrid() {
        this.searchString = '';
        this.cellOptions = {
            sortOptions: {},
            pinnedColumns: {},
            maxPinsReached: false,
            filterOptions: {}
        };
        if (this.apiUrl) {
            try {
                this.data = await dxp.api(this.apiUrl);
                this.data = JSON.stringify(this.data);
            }
            catch (err) {
                dxp.log.error(`fetch failed for ${this.apiUrl}`, err);
            }
        }
        if (this.headerUrl) {
            try {
                this.headers = await dxp.api(this.headerUrl);
            }
            catch (err) {
                dxp.log.error(`fetch failed for ${this.headerUrl}`, err);
            }
        }
        if (this.data) {
            this.defaultDataArray = typeof this.data === 'string' ?
                JSON.parse(this.data).map((row, index) => (Object.assign({ dxpRowId: index, dxpSelectedRow: !this.enableRowSelection }, row)))
                : this.data.map((row, index) => (Object.assign({ dxpRowId: index, dxpSelectedRow: !this.enableRowSelection }, row)));
            this.setIndexToSliceArray(this.defaultDataArray, 0, this.rowsperpage);
            this.dataArray = [...this.defaultDataArray];
        }
    }
    /** Render the Data grid */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-data-grid render() : ${process.env.MODE}`);
        return (h("div", { class: `${this.base.componentClass()} data-grid`, dir: this.dir, "data-theme": this.theme, style: { 'width': this.width } },
            h("div", { class: "dxp-flex grid-options" },
                (this.enableExport) ?
                    (h("div", { class: "dxp-flex align-center" },
                        h("div", { class: "action-menu dxp-flex" },
                            h("a", { href: "javascript : void(0)", role: "link", class: "action-export", onClick: e => this.toggleClick(e), onKeyPress: e => this.toggleKey(e), "aria-expanded": "false", "aria-label": dxp.i18n.t('DataGrid:export') },
                                h("span", null, dxp.i18n.t('DataGrid:export')),
                                h("i", { class: "dxp-icon dxp-icon-caret-down" })),
                            h("div", { class: "action-list-wrapper", ref: el => this.exportSection = el },
                                h("div", { class: "action-list" },
                                    h("div", { class: "action-arrow" }),
                                    h("span", { class: "action-link" },
                                        h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "exportcsv", text: dxp.i18n.t('DataGrid:exportCSV'), onClick: e => this.submitHandler(e) })),
                                    h("span", { class: "action-link" },
                                        h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "exportpdf", text: dxp.i18n.t('DataGrid:exportPDF'), onClick: e => this.submitHandler(e) }))))),
                        h("div", { class: "dxp-inline-block printer-icon" },
                            h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "printpreview", "aria-label": dxp.i18n.t('DataGrid:printPreview'), "icon-align": "left", src: "https://fusion.mastercard.int/stash/projects/DXP/repos/dxp-demo-assets/raw/images/icons/printer.svg", text: dxp.i18n.t('DataGrid:printPreview'), onClick: e => this.submitHandler(e) })))) : '',
                (this.enableSearch) ?
                    (h("div", { class: "search-block" },
                        h("div", { class: "search-wrapper" },
                            h("input", { type: "text", name: "searchbox", value: this.searchString, class: "dxp-form-control search-input", placeholder: dxp.i18n.t('DataGrid:searchText'), onKeyUp: event => { this.onSearchText(event); } }),
                            h("span", { class: "dxp-icon dxp-icon-small dxp-icon-search search-icon" }),
                            h("span", { tabindex: "0", role: "button", "aria-label": dxp.i18n.t('DataGrid:clearSearchText'), class: `dxp-icon dxp-icon-small dxp-icon-close ${(this.searchString.length ? ' dxp-flex' : ' dxp-none')}`, onClick: event => this.onSearchText(event), onKeyPress: event => this.onSearchText(event) })))) : ''),
            h("div", { class: "table-wrapper", style: { 'height': this.height }, onScroll: event => this.handlerDataGridScroll(event) },
                h("div", { class: "data-grid dxp-data-grid-table" },
                    h("div", { class: `header-wrapper ${this.stickyHeader ? 'sticky-top' : ''}`, ref: el => (this.gridHeaders = el) },
                        h("slot", null)),
                    h("div", { ref: el => (this.gridRows = el) },
                        h("slot", null))),
                (this.dataArray && !this.dataArray.length) ?
                    (h("div", { class: "no-result-found" }, dxp.i18n.t('DataGrid:noResultFoundText'))) : ''),
            (this.enablePagination && this.dataArray && this.dataArray.length) ?
                (h("dxp-grid-pagination", { "total-rows-per-page": this.rowsperpage, "total-rows": this.dataArray.length, width: this.width, "show-pagination-section": this.showPaginationSection })) : ''));
    }
    static get is() { return "dxp-data-grid"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-data-grid.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-data-grid.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
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
                "text": "api url for data of grid"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "enableExport": {
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
                "text": "configuaration  to enable export function"
            },
            "attribute": "enable-export",
            "reflect": false,
            "defaultValue": "true"
        },
        "enableFilter": {
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
                "text": "enableFilter - flag to enable/disable filter dialog"
            },
            "attribute": "enable-filter",
            "reflect": false
        },
        "enablePagination": {
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
                "text": "flag to show/hide pagination"
            },
            "attribute": "enable-pagination",
            "reflect": false,
            "defaultValue": "true"
        },
        "enableRowSelection": {
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
                "text": "configuaration  to enable row selction"
            },
            "attribute": "enable-row-selection",
            "reflect": false
        },
        "enableSearch": {
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
                "text": "configuaration  to enable search data function"
            },
            "attribute": "enable-search",
            "reflect": false,
            "defaultValue": "true"
        },
        "enableStackheaderBgcolor": {
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
                "text": "page stackheaders bgcolor attribute"
            },
            "attribute": "enable-stackheader-bgcolor",
            "reflect": false
        },
        "headers": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "page headers attribute"
            },
            "attribute": "headers",
            "reflect": false,
            "defaultValue": "[]"
        },
        "headerUrl": {
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
                "text": "page headers attribute"
            },
            "attribute": "header-url",
            "reflect": false
        },
        "height": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "grid height"
            },
            "attribute": "height",
            "reflect": false
        },
        "maxColumnPins": {
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
                "text": "max number of columns that can be pinned"
            },
            "attribute": "max-column-pins",
            "reflect": false,
            "defaultValue": "2"
        },
        "rowsperpage": {
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
                "text": "grid no of rows"
            },
            "attribute": "rowsperpage",
            "reflect": false,
            "defaultValue": "10"
        },
        "selectionType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'page' | 'grid'",
                "resolved": "\"grid\" | \"page\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "grid selection type"
            },
            "attribute": "selection-type",
            "reflect": false,
            "defaultValue": "'grid'"
        },
        "stackHeaders": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "page stackheaders attribute"
            },
            "attribute": "stack-headers",
            "reflect": false,
            "defaultValue": "[]"
        },
        "stickyHeader": {
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
                "text": "sticky header: boolean"
            },
            "attribute": "sticky-header",
            "reflect": false,
            "defaultValue": "true"
        },
        "width": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "grid width"
            },
            "attribute": "width",
            "reflect": false
        },
        "data": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "page data attribute"
            },
            "attribute": "data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "cellOptions": {},
        "dataArray": {},
        "dataSliceEndIndex": {},
        "dataSliceStartIndex": {},
        "defaultDataArray": {},
        "dir": {},
        "filteredDataArray": {},
        "isDataUpdated": {},
        "isLoaded": {},
        "locale": {},
        "pinnedColumns": {},
        "rowEndIndex": {},
        "rowStartIndex": {},
        "searchString": {},
        "showPaginationSection": {},
        "theme": {},
        "visibleHeaders": {},
        "visibleStackHeaders": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "data",
            "methodName": "dataChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "clickFilter",
            "method": "clickFilterHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "clickHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "toggleFilterEvent",
            "method": "clickToggleFilter",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "dxpDataGridEvents",
            "method": "dataGridEventHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "filterGrid",
            "method": "filterDataGrid",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "keypress",
            "method": "handleKeyEvents",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "toPageNumber",
            "method": "nextpage",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "pinColumn",
            "method": "pinColumn",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "sortGrid",
            "method": "sortDataGrid",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "ctaClickEvent",
            "method": "submitHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
