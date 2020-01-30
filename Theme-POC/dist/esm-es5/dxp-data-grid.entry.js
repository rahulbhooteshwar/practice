var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-dff7d435.js';
var IS_VISIBLE = 'is-visible';
var DataGrid = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
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
    class_1.prototype.dataChangeHandler = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.isDataUpdated = true;
        }
    };
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.base = new BaseComponent(this, dxp);
                        this.base.i18Init(dxp, 'DataGrid', messages);
                        return [4 /*yield*/, this.updateDataGrid()];
                    case 1:
                        _a.sent();
                        this.isDataUpdated = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** actions to be performed after to component loading */
    class_1.prototype.componentDidLoad = function () {
        if (this.data && !this.isLoaded) {
            this.setDataGrid();
        }
    };
    /** actions to be performed on changing any state or prop */
    class_1.prototype.componentWillUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addStyles();
                        if (!this.isDataUpdated) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateDataGrid()];
                    case 1:
                        _a.sent();
                        this.gridRows.innerHTML = '';
                        this.gridHeaders.innerHTML = '';
                        this.isLoaded = false;
                        this.setDataGrid();
                        this.isDataUpdated = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** click from filter */
    class_1.prototype.clickFilterHandler = function (e) {
        this.isFilterVisible = (e.detail === 'OTHER');
    };
    /** method for listen click */
    class_1.prototype.clickHandler = function () {
        // Hide filter on click of outside area
        this.toggleFilterDialog();
        // Hide export on click of outside area
        if (this.exportSection && this.exportSection.classList.contains(IS_VISIBLE)) {
            this.exportSection.classList.remove(IS_VISIBLE);
            var exportLink = this.element.querySelector('.action-export');
            exportLink.classList.remove('hide-link');
            exportLink.setAttribute('aria-expanded', 'false');
        }
    };
    /** listen filter event */
    class_1.prototype.clickToggleFilter = function (event) {
        this.filterKey = event.detail;
    };
    /** dxpDataGridEvents listener for data grid events */
    class_1.prototype.dataGridEventHandler = function (event) {
        var _this = this;
        var eventDetail = event.detail;
        var selectForCheckbox = this.gridRows.querySelectorAll('dxp-checkbox[dxpgrid="select"]');
        if (eventDetail.actionName === 'ActionForDxpSelectAll') {
            this.dataArray = this.dataArray.map(function (row, index) {
                return (Object.assign(Object.assign({}, row), { dxpSelectedRow: (index >= _this.dataSliceStartIndex && index < _this.dataSliceEndIndex) ? eventDetail.details.isChecked : row.dxpSelectedRow }));
            });
            selectForCheckbox.forEach(function (checkbox) {
                checkbox['setChecked'](eventDetail.details.isChecked);
            });
        }
        if (eventDetail.actionName === 'ActionForDxpSelect') {
            this.dataArray = this.dataArray.map(function (row) { return ((row.dxpRowId === eventDetail.row.dxpRowId) ? Object.assign(Object.assign({}, row), { dxpSelectedRow: eventDetail.details.isChecked }) : row); });
        }
        this.setSelectAll();
    };
    /** method for filter event listener */
    class_1.prototype.filterDataGrid = function (event) {
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
    };
    /** Listener for action to perform for keypress event */
    class_1.prototype.handleKeyEvents = function (event) {
        var eventKey = event.key || event.keyCode;
        if ((eventKey === ' ' || eventKey === 32) || (eventKey === 'Enter' || eventKey === 13)) {
            this.clickHandler();
        }
        event.stopPropagation();
    };
    /** method for jumping to next page */
    class_1.prototype.nextpage = function (event) {
        this.setIndexToSliceArray(this.dataArray, event.detail.firstRowIndex, event.detail.lastRowIndex);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    };
    /** method for pin event listener */
    class_1.prototype.pinColumn = function (event) {
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
    };
    /** click listener for routing events on anchor tag */
    class_1.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** method for sort event listener */
    class_1.prototype.sortDataGrid = function (event) {
        this.cellOptions.sortOptions = {};
        this.dataArray = (JSON.stringify(this.cellOptions.filterOptions) === '{}') ? __spreadArrays(this.defaultDataArray) : __spreadArrays(this.filteredDataArray);
        this.dataArray = (this.searchString === '') ? __spreadArrays(this.dataArray) : this.applySearchToArray(__spreadArrays(this.dataArray));
        if (event.detail.sortAction !== 'remove-sort') {
            this.cellOptions.sortOptions[event.detail.cellKey] = event.detail.sortAction;
            if (typeof event.detail.cellKey === 'function') {
                this.cellOptions.sortOptions.cellKeyFunction = event.detail.cellKey;
            }
            this.dataArray = this.applySortingToArray(__spreadArrays(this.dataArray));
        }
        this.setIndexToSliceArray(this.dataArray, 0, this.rowsperpage);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    };
    /** click listener for cta button */
    class_1.prototype.submitHandler = function (e) {
        e.preventDefault();
        // Action - On click of submit button
        if (e.target.getAttribute('btn-id') === 'exportcsv') {
            var csvData = this.jsonToCSV();
            dxp.util.downloadFile(csvData, 'csv');
        }
        if (e.target.getAttribute('btn-id') === 'exportpdf') {
            var pdfData = this.jsonToPDF();
            dxp.util.downloadFile(pdfData, 'pdf');
        }
        if (e.target.getAttribute('btn-id') === 'printpreview') {
            var printData = this.jsonToPrint();
            dxp.print({
                printable: printData.body,
                properties: printData.head,
                type: 'json'
            });
        }
    };
    /** add style links to the component */
    class_1.prototype.addStyles = function () {
        var shadow = this.element ? this.element : this.element;
        var optionalLinkParams = { 'data-id': 'data-grid' };
        if (shadow.querySelectorAll('link[data-id="data-grid"]').length <= 3) {
            var href = "";
            dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
            href = "";
            dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
            href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-data-grid.min.css";
            dxp.util.appendLinkElement(shadow, href, optionalLinkParams);
        }
    };
    /**
     * Append nested markup for child elements
     * @param nestedTarget Target container where nested elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    class_1.prototype.appendNestedMarkup = function (nestedTarget, nestedSelector, data) {
        var _this = this;
        var fragment = document.createDocumentFragment();
        var appendNestedElements = [];
        if (data && nestedSelector && nestedTarget) {
            data.forEach(function (item) {
                var ref = document.createElement(nestedSelector);
                // if keys of object is in kebabcase then it should be converted into camelcase
                var formattedItem = _this.base.formatDataObjectKeys(item);
                Object.assign(ref, formattedItem);
                fragment.appendChild(ref);
                appendNestedElements.push(ref);
            });
            nestedTarget.appendChild(fragment);
        }
        return appendNestedElements;
    };
    /** Method to apply multiple filters to given array */
    class_1.prototype.applyFiltersToArray = function (dataArray) {
        var _this = this;
        Object.keys(this.cellOptions.filterOptions).forEach(function (cellKey) {
            dataArray = (_this.cellOptions.filterOptions[cellKey].hasOwnProperty('cellKeyFunction')) ?
                ((_this.cellOptions.filterOptions[cellKey].filterCondition === 'isEqualTo') ?
                    (dataArray.filter(function (obj) { return _this.cellOptions.filterOptions[cellKey].cellKeyFunction(obj).toLowerCase() === _this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase(); }))
                    :
                        (dataArray.filter(function (obj) { return _this.cellOptions.filterOptions[cellKey].cellKeyFunction(obj).toLowerCase() !== _this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase(); }))) :
                ((_this.cellOptions.filterOptions[cellKey].filterCondition === 'isEqualTo') ?
                    (dataArray.filter(function (obj) { return obj[cellKey].toString().toLowerCase() === _this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase(); })) :
                    (dataArray.filter(function (obj) { return obj[cellKey].toString().toLowerCase() !== _this.cellOptions.filterOptions[cellKey].filterValue.toLowerCase(); })));
        });
        return dataArray;
    };
    /** Method to apply search to given array */
    class_1.prototype.applySearchToArray = function (dataArray) {
        var _this = this;
        dataArray = dataArray.filter(function (obj) {
            var dataMatched = false;
            _this.visibleHeaders.forEach(function (header) {
                var cellType = header['column_type'];
                if (!cellType || cellType === 'text' || cellType === 'number') {
                    var COL_KEY_VALUE = header['column_key'];
                    var content = (typeof COL_KEY_VALUE === 'function') ? COL_KEY_VALUE(obj) : obj[COL_KEY_VALUE];
                    if (content.toString().toLowerCase().includes(_this.searchString.toLowerCase())) {
                        dataMatched = true;
                    }
                }
            });
            if (dataMatched) {
                return obj;
            }
        });
        return dataArray;
    };
    /** Method to apply sorting to given array */
    class_1.prototype.applySortingToArray = function (dataArray) {
        var sortOptions = this.cellOptions.sortOptions;
        if (sortOptions.hasOwnProperty('cellKeyFunction')) {
            dataArray.sort(function (a, b) {
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
            dataArray.sort(function (a, b) {
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
    };
    /** Method for create row */
    class_1.prototype.createRow = function (row) {
        if (row.isHeader || row.isStackHeader) {
            this.appendNestedMarkup(this.gridHeaders, 'dxp-data-grid-row', [row]);
        }
        else {
            this.appendNestedMarkup(this.gridRows, 'dxp-data-grid-row', [row]);
        }
    };
    /** create content for each row */
    class_1.prototype.createRowsContent = function () {
        var _this = this;
        this.dataArray.slice(this.rowStartIndex, this.rowEndIndex).forEach(function (row) {
            var rowdata = _this.visibleHeaders.map(function (col) {
                var content = '';
                var cellKey = col.column_key;
                var cellType = col['column_type'];
                var width = col['column_width'];
                var celldata = '';
                if (!cellType || cellType === 'text' || cellType === 'number') {
                    var COL_KEY_VALUE = col['column_key'];
                    content = (typeof COL_KEY_VALUE === 'function') ? COL_KEY_VALUE(row) : row[COL_KEY_VALUE];
                }
                else {
                    celldata = col['column_data'];
                }
                return ({ cellType: cellType ? cellType : 'text', cellKey: cellKey, content: content, data: { celldata: celldata, row: row, header: col }, width: width });
            });
            var selectbox = {
                cellType: 'checkbox', pinned: 0, width: _this.selectAllColumnWidth, data: {
                    celldata: { 'value': 'select', 'name': '' }, row: row,
                    header: { column_action: 'ActionForDxpSelect', column_key: 'dxpSelectedRow' }
                }
            };
            var rowStructure = {
                data: {
                    rowStructure: _this.enableRowSelection ? __spreadArrays([selectbox], rowdata) : rowdata, row: row, headers: _this.visibleHeaders, pinnedColumns: _this.cellOptions.pinnedColumns
                }
            };
            _this.createRow(rowStructure);
        });
    };
    /** Get formated rows */
    class_1.prototype.getFormatedRows = function (csvHeaderStructure) {
        var _this = this;
        return this.dataArray.filter(function (row, index) { return row.dxpSelectedRow && (index >= _this.dataSliceStartIndex && index < _this.dataSliceEndIndex); }).map(function (row) { return csvHeaderStructure.map(function (head) {
            var COL_KEY_VALUE = head['column_key'];
            return ((typeof COL_KEY_VALUE === 'function') ? COL_KEY_VALUE(row) : row[COL_KEY_VALUE]);
        }); });
    };
    /** Method for handle scroll */
    class_1.prototype.handlerDataGridScroll = function (event) {
        if ((event.target.scrollHeight - event.target.scrollTop) + 7 < event.target.offsetHeight) {
            if (!this.enablePagination) {
                this.rowStartIndex = this.rowEndIndex;
                this.rowEndIndex = this.rowStartIndex + this.rowsperpage;
                this.setDataGrid();
            }
        }
    };
    /** Convert array data to csv structure */
    class_1.prototype.jsonToCSV = function () {
        var csvHeaderStructure = this.headers.filter(function (head) { return (!head.column_type || head.column_type === 'text'); });
        var csvHeader = csvHeaderStructure.map(function (head) { return head.column_name; });
        var csvRows = this.getFormatedRows(csvHeaderStructure);
        var csvDataArray = __spreadArrays([csvHeader], csvRows);
        return csvDataArray.map(function (row) { return row.join(','); }).join('\r\n').toString();
    };
    /** Convert array data to pdf structure */
    class_1.prototype.jsonToPDF = function () {
        var pdfHeaderStructure = this.headers.filter(function (head) { return (!head.column_type || head.column_type === 'text'); });
        var pdfHeader = pdfHeaderStructure.map(function (head) { return head.column_name; });
        var pdfRows = this.getFormatedRows(pdfHeaderStructure);
        return ({ head: pdfHeader, body: pdfRows });
    };
    /** Convert array data to print preview */
    class_1.prototype.jsonToPrint = function () {
        var _this = this;
        var pdfHeaderStructure = this.headers.filter(function (head) { return (!head.column_type || head.column_type === 'text'); });
        var pdfHeader = pdfHeaderStructure.map(function (head) {
            return { field: (typeof head.column_key === 'function') ? (head.column_name).toLowerCase().replace(' ', '_') : head.column_key, displayName: head.column_name };
        });
        var pdfRows = this.dataArray.filter(function (row, index) { return row.dxpSelectedRow && (index >= _this.dataSliceStartIndex && index < _this.dataSliceEndIndex); }).map(function (row) {
            var modifiedRow = {};
            pdfHeaderStructure.map(function (head) {
                var col_key_value = head.column_key;
                var col_key = (typeof head.column_key === 'function') ? (head.column_name).toLowerCase().replace(' ', '_') : head.column_key;
                modifiedRow[col_key] = (typeof col_key_value === 'function') ? col_key_value(row) : (row[col_key_value] ? row[col_key_value] : '');
            });
            return modifiedRow;
        });
        var printPreviewDataArray = { head: pdfHeader, body: pdfRows };
        return printPreviewDataArray;
    };
    /** handler method for input change */
    class_1.prototype.onSearchText = function (event) {
        this.searchString = (event.target.value && event.target.value.trim()) ? event.target.value.trim() : '';
        this.updateDataArrayOnFilter();
        this.setIndexToSliceArray(this.dataArray, 0, this.rowsperpage);
        this.gridRows.innerHTML = '';
        this.gridHeaders.innerHTML = '';
        this.isLoaded = false;
        this.setDataGrid();
    };
    /** Method for set data grid */
    class_1.prototype.setDataGrid = function () {
        var _this = this;
        if ((!this.headers || this.headers.length === 0) && this.dataArray) {
            this.setHeaders();
        }
        this.setStackHeader();
        var selectAllValue = this.dataArray.slice(this.dataSliceStartIndex, this.dataSliceEndIndex).every(function (row) { return row.dxpSelectedRow; });
        var selectAll = {
            cellType: 'checkbox', pinned: 0, width: this.selectAllColumnWidth, data: {
                celldata: { 'value': 'selectall', 'name': '', 'selected': selectAllValue },
                header: { column_action: 'ActionForDxpSelectAll' }
            }
        };
        var removeSelectAll = {
            width: this.selectAllColumnWidth,
            pinned: 0,
            data: {
                celldata: {
                    'value': 'selectall', 'name': '', 'selected': selectAllValue
                },
                header: { column_action: 'ActionForDxpSelectAll' }
            }
        };
        var rowsdata = this.visibleHeaders.map(function (col) { return ({ cellType: 'text', content: col.column_name, cellKey: col.column_key, enableFilter: _this.enableFilter, cellOptions: _this.cellOptions, width: col.column_width }); });
        var stackHeadersData = this.visibleStackHeaders.map(function (stack) { return ({ cellType: 'text', content: stack.column_name, width: stack.column_width, pinned: stack.pinned }); });
        var rowHeaderStructure = {
            isHeader: true,
            data: { rowStructure: this.enableRowSelection ? __spreadArrays([selectAll], rowsdata) : rowsdata, pinnedColumns: this.cellOptions.pinnedColumns }
        };
        var stackHeaderStructure = {
            isStackHeader: true, data: {
                rowStructure: this.enableRowSelection ? __spreadArrays([removeSelectAll], stackHeadersData) : stackHeadersData
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
    };
    /** Method for set headers */
    class_1.prototype.setHeaders = function () {
        var headerKeys = this.dataArray.reduce(function (init, next) {
            init = init || [];
            Object.keys(next).forEach(function (col) {
                if (!init.includes(col)) {
                    init.push(col);
                }
            });
            return init;
        }, []);
        this.headers = headerKeys.map(function (it) { return ({ column_name: it, column_key: it }); });
    };
    /** Method to index get sliced array from dataArray */
    class_1.prototype.setIndexToSliceArray = function (objArray, firstRowIndex, lastRowIndex) {
        this.rowStartIndex = firstRowIndex;
        this.rowEndIndex = lastRowIndex;
        this.dataSliceStartIndex = this.selectionType === 'page' ? this.rowStartIndex : 0;
        this.dataSliceEndIndex = this.selectionType === 'page' ? this.rowEndIndex : objArray.length;
    };
    /** Method for setting select all */
    class_1.prototype.setSelectAll = function () {
        var selectAll = __spreadArrays(this.gridHeaders.querySelectorAll('dxp-checkbox[dxpgrid="selectall"]'), this.gridRows.querySelectorAll('dxp-checkbox[dxpgrid="selectall"]'));
        var selectAllValue = this.dataArray.slice(this.dataSliceStartIndex, this.dataSliceEndIndex).every(function (row) { return row.dxpSelectedRow; });
        if (selectAll && selectAll.length > 0) {
            selectAll[0]['setChecked'](selectAllValue);
        }
    };
    /** Method to configure the stack header */
    class_1.prototype.setStackHeader = function () {
        var _this = this;
        var pinnedHeaders = [];
        var newHeaders = [];
        var otherHeader = [];
        var pinnedStackWidth = 0;
        var leftOffset = this.enableRowSelection ?
            parseInt(this.selectAllColumnWidth.replace('px', ''), 10) : 0;
        var otherStackWidth = 0;
        var pinnedStackHeader = {
            pinned: leftOffset,
            column_name: dxp.i18n.t('DataGrid:pinnedColumnsText'),
            column_width: '0px'
        };
        var otherStackHeader = {
            column_width: '0px'
        };
        this.headers.map(function (header) {
            if (Object.keys(_this.cellOptions.pinnedColumns).indexOf(header.column_key) > -1) {
                _this.cellOptions.pinnedColumns[header.column_key] = leftOffset;
                header.column_width = header.column_width || _this.defaultColumnWidth;
                pinnedHeaders.push(header);
                pinnedStackWidth = pinnedStackWidth + parseInt(header.column_width.replace('px', ''), 10);
                leftOffset = leftOffset + parseInt(header.column_width.replace('px', ''), 10);
            }
            else if (!header.stack_key || !header.stack_key.length || !_this.stackHeaders || _this.stackHeaders.length === 0) {
                otherHeader.push(header);
                header.column_width = header.column_width || _this.defaultColumnWidth;
                otherStackWidth = otherStackWidth + parseInt(header.column_width.replace('px', ''), 10);
            }
        });
        if (this.stackHeaders && (this.stackHeaders.length !== 0) && this.dataArray) {
            this.showStackHeaders(newHeaders, pinnedStackHeader, pinnedStackWidth, otherStackHeader, otherStackWidth);
        }
        this.visibleHeaders = __spreadArrays(pinnedHeaders, newHeaders, otherHeader);
    };
    /** show stack headers */
    class_1.prototype.showStackHeaders = function (newHeaders, pinnedStackHeader, pinnedStackWidth, otherStackHeader, otherStackWidth) {
        var _this = this;
        this.stackHeaders.map(function (STACK_HEADER) {
            STACK_HEADER.column_width = 0;
            _this.headers.map(function (header) {
                var HEADER_KEY = header.stack_key;
                var STACK_HEADER_ID = STACK_HEADER.column_id;
                if ((HEADER_KEY && HEADER_KEY.findIndex(function (head) { return head.value === STACK_HEADER_ID; }) >= 0) &&
                    (Object.keys(_this.cellOptions.pinnedColumns).indexOf(header.column_key) === -1)) {
                    newHeaders.push(header);
                    header.column_width = header.column_width || _this.defaultColumnWidth;
                    STACK_HEADER.column_width = STACK_HEADER.column_width + parseInt(header.column_width.replace('px', ''), 10);
                }
            });
            pinnedStackHeader.column_width = pinnedStackWidth + "px";
            otherStackHeader.column_width = otherStackWidth + "px";
            STACK_HEADER.column_width = STACK_HEADER.column_width + "px";
        });
        if (pinnedStackWidth > 0) {
            this.stackHeaders.unshift(pinnedStackHeader);
        }
        this.stackHeaders.push(otherStackHeader);
        this.visibleStackHeaders = this.stackHeaders.filter(function (e) { return parseInt(e.column_width.replace('px', ''), 10) > 0; });
    };
    /** Toggle click for export */
    class_1.prototype.toggleClick = function (event) {
        // hide filter dialog box if open
        this.toggleFilterDialog();
        event.preventDefault();
        this.exportSection.classList.toggle(IS_VISIBLE);
        var exportLink = this.element.querySelector('.action-export');
        exportLink.classList.toggle('hide-link');
        exportLink.setAttribute('aria-expanded', exportLink.classList.contains('hide-link') ? 'true' : 'false');
        event.stopPropagation();
    };
    /** Toggle click for filter dialog box */
    class_1.prototype.toggleFilterDialog = function () {
        var _this = this;
        if (!this.isFilterVisible) {
            var dxpFilters = this.gridHeaders.querySelectorAll('dxp-data-grid-filter');
            dxpFilters.forEach(function (ele) {
                if (ele['cellKey'] !== _this.filterKey) {
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
    };
    /** Toggle Keypress for export */
    class_1.prototype.toggleKey = function (event) {
        var eventKey = event.key || event.keyCode;
        // handle space and enter key
        if ((eventKey === ' ' || eventKey === 32) || (eventKey === 'Enter' || eventKey === 13)) {
            this.toggleClick(event);
        }
    };
    /** Method to update data array after applying filter */
    class_1.prototype.updateDataArrayOnFilter = function () {
        var dataArrayToManipulate = (this.searchString === '') ? __spreadArrays(this.defaultDataArray) : this.applySearchToArray(__spreadArrays(this.defaultDataArray));
        this.filteredDataArray = this.applyFiltersToArray(__spreadArrays(dataArrayToManipulate));
        this.dataArray = (JSON.stringify(this.cellOptions.sortOptions) === '{}') ? __spreadArrays(this.filteredDataArray) : this.applySortingToArray(__spreadArrays(this.filteredDataArray));
        this.filteredDataArray = __spreadArrays(this.dataArray);
    };
    /** Method to update datagrid */
    class_1.prototype.updateDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1, _b, err_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.searchString = '';
                        this.cellOptions = {
                            sortOptions: {},
                            pinnedColumns: {},
                            maxPinsReached: false,
                            filterOptions: {}
                        };
                        if (!this.apiUrl) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, dxp.api(this.apiUrl)];
                    case 2:
                        _a.data = _c.sent();
                        this.data = JSON.stringify(this.data);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        dxp.log.error("fetch failed for " + this.apiUrl, err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.headerUrl) return [3 /*break*/, 8];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        _b = this;
                        return [4 /*yield*/, dxp.api(this.headerUrl)];
                    case 6:
                        _b.headers = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _c.sent();
                        dxp.log.error("fetch failed for " + this.headerUrl, err_2);
                        return [3 /*break*/, 8];
                    case 8:
                        if (this.data) {
                            this.defaultDataArray = typeof this.data === 'string' ?
                                JSON.parse(this.data).map(function (row, index) { return (Object.assign({ dxpRowId: index, dxpSelectedRow: !_this.enableRowSelection }, row)); })
                                : this.data.map(function (row, index) { return (Object.assign({ dxpRowId: index, dxpSelectedRow: !_this.enableRowSelection }, row)); });
                            this.setIndexToSliceArray(this.defaultDataArray, 0, this.rowsperpage);
                            this.dataArray = __spreadArrays(this.defaultDataArray);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Render the Data grid */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-data-grid render() : " + "DEVELOPMENT");
        return (h("div", { class: this.base.componentClass() + " data-grid", dir: this.dir, "data-theme": this.theme, style: { 'width': this.width } }, h("div", { class: "dxp-flex grid-options" }, (this.enableExport) ?
            (h("div", { class: "dxp-flex align-center" }, h("div", { class: "action-menu dxp-flex" }, h("a", { href: "javascript : void(0)", role: "link", class: "action-export", onClick: function (e) { return _this.toggleClick(e); }, onKeyPress: function (e) { return _this.toggleKey(e); }, "aria-expanded": "false", "aria-label": dxp.i18n.t('DataGrid:export') }, h("span", null, dxp.i18n.t('DataGrid:export')), h("i", { class: "dxp-icon dxp-icon-caret-down" })), h("div", { class: "action-list-wrapper", ref: function (el) { return _this.exportSection = el; } }, h("div", { class: "action-list" }, h("div", { class: "action-arrow" }), h("span", { class: "action-link" }, h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "exportcsv", text: dxp.i18n.t('DataGrid:exportCSV'), onClick: function (e) { return _this.submitHandler(e); } })), h("span", { class: "action-link" }, h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "exportpdf", text: dxp.i18n.t('DataGrid:exportPDF'), onClick: function (e) { return _this.submitHandler(e); } }))))), h("div", { class: "dxp-inline-block printer-icon" }, h("dxp-cta", { type: "link", "link-type": "dxp-btn-custom-link", href: "javascript : void(0)", "btn-id": "printpreview", "aria-label": dxp.i18n.t('DataGrid:printPreview'), "icon-align": "left", src: "https://fusion.mastercard.int/stash/projects/DXP/repos/dxp-demo-assets/raw/images/icons/printer.svg", text: dxp.i18n.t('DataGrid:printPreview'), onClick: function (e) { return _this.submitHandler(e); } })))) : '', (this.enableSearch) ?
            (h("div", { class: "search-block" }, h("div", { class: "search-wrapper" }, h("input", { type: "text", name: "searchbox", value: this.searchString, class: "dxp-form-control search-input", placeholder: dxp.i18n.t('DataGrid:searchText'), onKeyUp: function (event) { _this.onSearchText(event); } }), h("span", { class: "dxp-icon dxp-icon-small dxp-icon-search search-icon" }), h("span", { tabindex: "0", role: "button", "aria-label": dxp.i18n.t('DataGrid:clearSearchText'), class: "dxp-icon dxp-icon-small dxp-icon-close " + (this.searchString.length ? ' dxp-flex' : ' dxp-none'), onClick: function (event) { return _this.onSearchText(event); }, onKeyPress: function (event) { return _this.onSearchText(event); } })))) : ''), h("div", { class: "table-wrapper", style: { 'height': this.height }, onScroll: function (event) { return _this.handlerDataGridScroll(event); } }, h("div", { class: "data-grid dxp-data-grid-table" }, h("div", { class: "header-wrapper " + (this.stickyHeader ? 'sticky-top' : ''), ref: function (el) { return (_this.gridHeaders = el); } }, h("slot", null)), h("div", { ref: function (el) { return (_this.gridRows = el); } }, h("slot", null))), (this.dataArray && !this.dataArray.length) ?
            (h("div", { class: "no-result-found" }, dxp.i18n.t('DataGrid:noResultFoundText'))) : ''), (this.enablePagination && this.dataArray && this.dataArray.length) ?
            (h("dxp-grid-pagination", { "total-rows-per-page": this.rowsperpage, "total-rows": this.dataArray.length, width: this.width, "show-pagination-section": this.showPaginationSection })) : ''));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "data": ["dataChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-data-grid{margin-bottom:20px;display:block}div.dxp.dxp-data-grid ::slotted(dxp-data-grid-row){display:-ms-inline-flexbox;display:inline-flex}div.dxp.dxp-data-grid ::slotted(dxp-data-grid-row:nth-child(odd)) dxp-data-grid-row:nth-child(odd){display:block}div.dxp.dxp-data-grid ::slotted(dxp-data-grid-row:nth-child(odd)) ::slotted(dxp-data-grid-row:first-child){background-color:none}div.dxp.dxp-data-grid .grid-options{padding:.5rem .75rem 1rem;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-data-grid .grid-options .cta-block{padding-bottom:.5rem;min-width:40%}div.dxp.dxp-data-grid .grid-options .search-block{-ms-flex:1;flex:1}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper{position:relative;max-width:30rem;min-width:20rem;width:100%;float:right}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .search-input{padding:.5rem 2.5rem .5rem 2.5rem;border-radius:2rem}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-close,div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-search{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-search{left:1rem}div.dxp.dxp-data-grid .grid-options .search-block .search-wrapper .dxp-icon-close{cursor:pointer;right:1rem}div.dxp.dxp-data-grid .grid-options .printer-icon{padding-left:1rem}div.dxp.dxp-data-grid .grid-options .action-menu{position:relative}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper{z-index:5;position:absolute;visibility:hidden;opacity:0;left:-.5rem;top:100%;-webkit-transition:all .2s ease-in;transition:all .2s ease-in;padding-top:.5rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list{border-radius:.25rem;padding:.5rem 0;z-index:5;width:8.5rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link{display:block;padding:.45rem 1.25rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link a{display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link a:hover{text-decoration:underline}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-link a .btn-icon{display:inline-block;width:1rem;margin-right:.75rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper .action-list .action-arrow{height:0;width:0;border-left:.5rem solid transparent;border-right:.5rem solid transparent;position:absolute;top:0;left:.5rem}div.dxp.dxp-data-grid .grid-options .action-menu .action-list-wrapper.is-visible{visibility:visible;opacity:1}div.dxp.dxp-data-grid .grid-options .action-menu a{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-data-grid .grid-options .action-menu a:hover span{text-decoration:underline}div.dxp.dxp-data-grid .grid-options .action-menu a i{margin-left:.75rem;-webkit-transition:-webkit-transform .2s linear;transition:-webkit-transform .2s linear;transition:transform .2s linear;transition:transform .2s linear,-webkit-transform .2s linear}div.dxp.dxp-data-grid .grid-options .action-menu a.hide-link i{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}div.dxp.dxp-data-grid .grid-options .align-center{-ms-flex-align:center;align-items:center}.table-wrapper{overflow:auto;position:relative;display:inline-block;max-width:100%;min-height:40rem}.table-wrapper .header-wrapper{z-index:4}.table-wrapper .header-wrapper.sticky-top{position:-webkit-sticky;position:sticky;top:0}.table-wrapper .no-result-found{padding:2rem;text-align:center}.dxp-data-grid-table{overflow:scroll;display:table}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { DataGrid as dxp_data_grid };
