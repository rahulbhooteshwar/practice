'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-656d8fa0.js');

const IS_VISIBLE = 'is-visible';
const DataGrid = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'DataGrid', messages.messages);
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
            core$1.dxp.util.downloadFile(csvData, 'csv');
        }
        if (e.target.getAttribute('btn-id') === 'exportpdf') {
            const pdfData = this.jsonToPDF();
            core$1.dxp.util.downloadFile(pdfData, 'pdf');
        }
        if (e.target.getAttribute('btn-id') === 'printpreview') {
            const printData = this.jsonToPrint();
            core$1.dxp.print({
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
            core$1.dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
            href = ``;
            core$1.dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
            href = `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-data-grid.min.css`;
            core$1.dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
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
            column_name: core$1.dxp.i18n.t('DataGrid:pinnedColumnsText'),
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
                this.data = await core$1.dxp.api(this.apiUrl);
                this.data = JSON.stringify(this.data);
            }
            catch (err) {
                core$1.dxp.log.error(`fetch failed for ${this.apiUrl}`, err);
            }
        }
        if (this.headerUrl) {
            try {
                this.headers = await core$1.dxp.api(this.headerUrl);
            }
            catch (err) {
                core$1.dxp.log.error(`fetch failed for ${this.headerUrl}`, err);
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-data-grid render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: `${this.base.componentClass()} data-grid`, dir: this.dir, "data-theme": this.theme, style: { 'width': this.width } }, core$1.h("div", { class: "dxp-flex grid-options" }, (this.enableExport) ?
            (core$1.h("div", { class: "dxp-flex align-center" }, core$1.h("div", { class: "action-menu dxp-flex" }, core$1.h("a", { href: "javascript : void(0)", role: "link", class: "action-export", onClick: e => this.toggleClick(e), onKeyPress: e => this.toggleKey(e), "aria-expanded": "false", "aria-label": core$1.dxp.i18n.t('DataGrid:export') }, core$1.h("span", null, core$1.dxp.i18n.t('DataGrid:export')), core$1.h("i", { class: "dxp-icon dxp-icon-caret-down" })), core$1.h("div", { class: "action-list-wrapper", ref: el => this.exportSection = el }, core$1.h("div", { class: "action-list" }, core$1.h("div", { class: "action-arrow" }), core$1.h("span", { class: "action-link" }, core$1.h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "exportcsv", text: core$1.dxp.i18n.t('DataGrid:exportCSV'), onClick: e => this.submitHandler(e) })), core$1.h("span", { class: "action-link" }, core$1.h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "exportpdf", text: core$1.dxp.i18n.t('DataGrid:exportPDF'), onClick: e => this.submitHandler(e) }))))), core$1.h("div", { class: "dxp-inline-block printer-icon" }, core$1.h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "printpreview", "aria-label": core$1.dxp.i18n.t('DataGrid:printPreview'), "icon-align": "left", src: "https://fusion.mastercard.int/stash/projects/DXP/repos/dxp-demo-assets/raw/images/icons/printer.svg", text: core$1.dxp.i18n.t('DataGrid:printPreview'), onClick: e => this.submitHandler(e) })))) : '', (this.enableSearch) ?
            (core$1.h("div", { class: "search-block" }, core$1.h("div", { class: "search-wrapper" }, core$1.h("input", { type: "text", name: "searchbox", value: this.searchString, class: "dxp-form-control search-input", placeholder: core$1.dxp.i18n.t('DataGrid:searchText'), onKeyUp: event => { this.onSearchText(event); } }), core$1.h("span", { class: "dxp-icon dxp-icon-small dxp-icon-search search-icon" }), core$1.h("span", { tabindex: "0", role: "button", "aria-label": core$1.dxp.i18n.t('DataGrid:clearSearchText'), class: `dxp-icon dxp-icon-small dxp-icon-close ${(this.searchString.length ? ' dxp-flex' : ' dxp-none')}`, onClick: event => this.onSearchText(event), onKeyPress: event => this.onSearchText(event) })))) : ''), core$1.h("div", { class: "table-wrapper", style: { 'height': this.height }, onScroll: event => this.handlerDataGridScroll(event) }, core$1.h("div", { class: "data-grid dxp-data-grid-table" }, core$1.h("div", { class: `header-wrapper ${this.stickyHeader ? 'sticky-top' : ''}`, ref: el => (this.gridHeaders = el) }, core$1.h("slot", null)), core$1.h("div", { ref: el => (this.gridRows = el) }, core$1.h("slot", null))), (this.dataArray && !this.dataArray.length) ?
            (core$1.h("div", { class: "no-result-found" }, core$1.dxp.i18n.t('DataGrid:noResultFoundText'))) : ''), (this.enablePagination && this.dataArray && this.dataArray.length) ?
            (core$1.h("dxp-grid-pagination", { "total-rows-per-page": this.rowsperpage, "total-rows": this.dataArray.length, width: this.width, "show-pagination-section": this.showPaginationSection })) : ''));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "data": ["dataChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-data-grid{margin-bottom:20px;display:block}div.dxp.dxp-data-grid ::slotted(dxp-data-grid-row){display:-ms-inline-flexbox;display:inline-flex}div.dxp.dxp-data-grid ::slotted(dxp-data-grid-row:nth-child(odd)) dxp-data-grid-row:nth-child(odd){display:block}div.dxp.dxp-data-grid ::slotted(dxp-data-grid-row:nth-child(odd)) ::slotted(dxp-data-grid-row:first-child){background-color:none}div.dxp.dxp-data-grid .grid-options{padding:.5rem .75rem 1rem;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-data-grid .grid-options .cta-block{padding-bottom:.5rem;min-width:40%}div.dxp.dxp-data-grid .grid-options .search-block{-ms-flex:1;flex:1}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper{position:relative;max-width:30rem;min-width:20rem;width:100%;float:right}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .search-input{padding:.5rem 2.5rem .5rem 2.5rem;border-radius:2rem}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-close,div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-search{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-search{left:1rem}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-close{cursor:pointer;right:1rem}div.dxp.dxp-data-grid .grid-options .printer-icon{padding-left:1rem}div.dxp.dxp-data-grid .grid-options .action-menu{position:relative}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper{z-index:5;position:absolute;visibility:hidden;opacity:0;left:-.5rem;top:100%;-webkit-transition:all .2s ease-in;transition:all .2s ease-in;padding-top:.5rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list{border-radius:.25rem;padding:.5rem 0;z-index:5;width:8.5rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link{display:block;padding:.45rem 1.25rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link a{display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link a:hover{text-decoration:underline}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link a .btn-icon{display:inline-block;width:1rem;margin-right:.75rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-arrow{height:0;width:0;border-left:.5rem solid transparent;border-right:.5rem solid transparent;position:absolute;top:0;left:.5rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper.is-visible{visibility:visible;opacity:1}div.dxp.dxp-data-grid .grid-options .action-menu a{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-data-grid .grid-options .action-menu a:hover span{text-decoration:underline}div.dxp.dxp-data-grid .grid-options .action-menu a i{margin-left:.75rem;-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}div.dxp.dxp-data-grid .grid-options .action-menu a.hide-link i{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}div.dxp.dxp-data-grid .grid-options .align-center{-ms-flex-align:center;align-items:center}.table-wrapper{overflow:auto;position:relative;display:inline-block;max-width:100%;min-height:40rem}.table-wrapper .header-wrapper{z-index:4}.table-wrapper .header-wrapper.sticky-top{position:-webkit-sticky;position:sticky;top:0}.table-wrapper .no-result-found{padding:2rem;text-align:center}.dxp-data-grid-table{overflow:scroll;display:table}"; }
};

exports.dxp_data_grid = DataGrid;
