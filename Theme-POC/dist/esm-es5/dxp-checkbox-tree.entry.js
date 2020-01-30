var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
/** CSS class constants */
var CSS_CLASS = {
    HIDE: 'dxp-none',
    SHOW: 'dxp-block',
    CLOSE: 'chkbox-tree-node-close',
    DISABLED: 'chkbox-tree-node-disabled',
    FULL_SELECTED: 'chkbox-tree-node-checked',
    PARTIAL_SELECTED: 'chkbox-tree-node-halfchecked',
    TOP_PARENT: 'chkbox-tree-node-topparent',
    BOLD: 'chkbox-tree-label-bold',
    MT_15: 'dxp-mt-2',
    MT_10: 'dxp-mt-3',
    NO_RESULT: 'chkbox-tree-node-noresult',
    TRUNCATE: 'dxp-text-truncate',
    TRUNCATE_RTL: 'trunc-rtl',
    TRUNCATE_DISPLAY: 'trunc-display',
    B2B_SPRITE: 'b2b-sprite',
    HELP: 'help-g',
    TRUNCATE_ALIGN: 'trunc-align',
    MARGIN_BOTTOM: 'dxp-mb-0',
    ACCESS_FOCUS: 'access-fc',
    IE_PREFIX: 'sc-dxp-checkbox-tree'
};
/** CSS class constants specific to Checkbox nodes */
var TREE_JS_CLASS = {
    TREE: 'chkbox-tree',
    PLACEHOLDER: 'chkbox-tree-placeholder',
    CHECKBOX: 'chkbox-tree-checkbox',
    LABEL: 'chkbox-tree-label',
    SWITCHER: 'chkbox-tree-switcher',
    NODE: 'chkbox-tree-node',
    NODES: 'chkbox-tree-nodes'
};
/** Logical constants */
var DISPLAY = {
    NOT_SELECTED: 0,
    PARTIALLY_SELECTED: 1,
    FULLY_SELECTED: 2,
    CHECKBOX_CLICK: 'onclickCheckbox',
    COLLAPSE_LIST: 'Collapse List',
    EXPAND_LIST: 'Expand List'
};
/** Account constants specific to MCC */
var ACCOUNT = {
    ICA: 'ica',
    BIN: 'bin',
    RNG: 'rng',
    CID: 'cid',
    RTN: 'rtn',
    PROC: 'proc',
    RPPS: 'rpps',
    BILR: 'bilr',
};
/** Pill class constants */
var PILL_CLASS = {
    ICA: 'chk-pill-ica',
    BIN: 'chk-pill-bin',
    RNG: 'chk-pill-rng',
    CID: 'chk-pill-cid',
    RTN: 'chk-pill-rtn',
    PROC: 'chk-pill-proc',
    RPPS: 'chk-pill-rpps',
    BILR: 'chk-pill-bilr',
};
/** DOM atrribute constansts */
var ATTRIBUTE = {
    ARIA_LABLE: 'aria-label',
    ARIA_EXPANDED: 'aria-expanded',
    ARIA_PRESSED: 'aria-pressed',
};
var messages = {
    'en': {
        noResult: 'No result found'
    }
};
var CheckboxTree = /** @class */ (function () {
    function CheckboxTree(hostRef) {
        registerInstance(this, hostRef);
        /** List to hold output data on emit */
        this.checkboxData = [];
        /** Property to hold the count for disable node inside a parent node */
        this.disabledCount = 0;
        /** List to hold Leaf node */
        this.leafNodesById = [];
        /** List to hold all LI node */
        this.liElementsById = [];
        /** List to hold all node */
        this.nodesById = [];
        /** List to hold nodes which update after click */
        this.willUpdateNodesById = [];
        /** serchtext to filter data */
        this.searchText = '';
        /** show only selected checkbox nodes */
        this.showSelected = false;
        this.checkboxSelection = createEvent(this, "checkboxSelection", 7);
    }
    /** watch for searchText prop */
    CheckboxTree.prototype.searchHandler = function () {
        this.performSearch();
    };
    /** watch for showSelected prop */
    CheckboxTree.prototype.watchHandler = function () {
        this.displaySelectedNodes();
    };
    /** Keyboard Event */
    CheckboxTree.prototype.handleKeyDown = function (ev) {
        if ((ev.key === ' ') || (ev.key === 'Spacebar') || (ev.key === 'Enter')) {
            this.onItemClick(ev.target['htmlFor']);
        }
    };
    /** actions to be performed prior to component loading */
    CheckboxTree.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'CheckboxTree', messages);
        this.setNodeId(this.dataSource);
    };
    /** actions to be performed after component load */
    CheckboxTree.prototype.componentDidLoad = function () {
        if (this.dataSource) {
            this.originalData = JSON.parse(JSON.stringify(this.dataSource));
            this.processData();
        }
    };
    /** Identify the top most parent and add pills to its childen */
    CheckboxTree.prototype.addPill = function (node, li, checkboxSprite, label) {
        if (node.hasOwnProperty('parent')) {
            var pill = document.createElement('span');
            if (this.base.dxp.is.ie()) {
                pill.classList.add(CSS_CLASS.IE_PREFIX);
            }
            if (node.code) {
                var pillClass = this.getPillClass(node.code);
                pill.classList.add(pillClass);
                pill.setAttribute('title', node.code);
                var pilltext = document.createTextNode(node.code.toString().toUpperCase());
                pill.appendChild(pilltext);
                checkboxSprite.appendChild(pill);
            }
            label.appendChild(document.createTextNode(node.value));
        }
        else {
            /** perform separate styles for top most parent */
            li.classList.add(CSS_CLASS.TOP_PARENT);
            label.classList.add(CSS_CLASS.BOLD);
            label.innerText = node.name || node.value;
            label.title = node.name || node.value;
            if (node.value && node.name) {
                label.appendChild(document.createTextNode(" [" + node.value + "]"));
            }
        }
    };
    /** add css classes for expand and colapse functionalities */
    CheckboxTree.prototype.addSwitcher = function (mainDiv, node, li) {
        var switcher = document.createElement('button');
        if (this.base.dxp.is.ie()) {
            switcher.classList.add(CSS_CLASS.IE_PREFIX);
        }
        switcher.classList.add(TREE_JS_CLASS.SWITCHER);
        if (node.hasOwnProperty('parent')) {
            li.classList.add(CSS_CLASS.CLOSE);
            switcher.setAttribute(ATTRIBUTE.ARIA_LABLE, DISPLAY.EXPAND_LIST);
            switcher.setAttribute('title', DISPLAY.EXPAND_LIST);
            switcher.setAttribute(ATTRIBUTE.ARIA_EXPANDED, 'false');
            switcher.setAttribute(ATTRIBUTE.ARIA_PRESSED, 'false');
        }
        else {
            switcher.setAttribute(ATTRIBUTE.ARIA_LABLE, DISPLAY.COLLAPSE_LIST);
            switcher.setAttribute('title', DISPLAY.COLLAPSE_LIST);
            switcher.setAttribute(ATTRIBUTE.ARIA_EXPANDED, 'true');
            switcher.setAttribute(ATTRIBUTE.ARIA_PRESSED, 'true');
        }
        mainDiv.appendChild(switcher);
    };
    /** Process data object */
    CheckboxTree.prototype.setNodeId = function (nodes) {
        var _this = this;
        if (nodes === void 0) { nodes = []; }
        nodes.forEach(function (node) {
            node['id'] = "_" + Math.random().toString(36).substr(2, 9);
            if (node.children && node.children.length) {
                _this.setNodeId(node.children);
            }
        });
    };
    /** Process data object */
    CheckboxTree.prototype.processData = function () {
        var treeEle = this.generateRootElement();
        this.processTreeObj(this.dataSource);
        treeEle.appendChild(this.constructTree(this.dataSource, 0));
        this.bindEvent(treeEle, 'click');
        this.bindEvent(treeEle, 'document:keypress');
        this.checkboxDefaultUpdate();
        this.contentItemsContainer.appendChild(treeEle);
        this.displaySelectedNodes();
    };
    /** Apply animation to expand and colapse */
    CheckboxTree.prototype.animation = function (callback) {
        requestAnimationFrame(function () {
            callback.enter();
            requestAnimationFrame(function () {
                callback.active();
                callback.leave();
            });
        });
    };
    /** Binding click event with tree object */
    CheckboxTree.prototype.bindEvent = function (ele, typeOfEvent) {
        var _this = this;
        ele.addEventListener(typeOfEvent, function (e) {
            var target = e.target;
            // bind event for checkbox
            if (target.nodeName === 'LABEL' && target.classList.contains(TREE_JS_CLASS.CHECKBOX)) {
                _this.onItemClick(target.parentNode.parentNode.getAttribute('node_id'));
            }
            else if (target.nodeName === 'SPAN' && target.classList.contains(TREE_JS_CLASS.LABEL)) {
                _this.onItemClick(target.getAttribute('id').slice(4));
            }
            else if (target.nodeName === 'BUTTON' && target.classList.contains(TREE_JS_CLASS.SWITCHER)) {
                _this.onSwitcherClick(target);
            }
        }, false);
    };
    /** Perform action on default check &&  default disabled */
    CheckboxTree.prototype.checkboxDefaultUpdate = function () {
        var _this = this;
        if (this.dataSource && this.dataSource.length) {
            /** calback to check if all the childrens are disabled than make parent disabled */
            var checkDisabledParent_1 = function (node) {
                _this.checkDisabledNode(node);
                _this.checkDisableChildren(node);
            };
            /** callback to loop and pre select first time load */
            var iter_1 = function (node) {
                node.status = node.checked ? DISPLAY.FULLY_SELECTED : DISPLAY.NOT_SELECTED;
                _this.updateNonCheckedNode(node);
                /** check for parent whether its childrens are all disabled or not */
                if (node.children && node.children.length) {
                    node.children.forEach(checkDisabledParent_1);
                    if (node.children.length === _this.disabledCount && node.hasOwnProperty('parent')) {
                        [node.parent].forEach(checkDisabledParent_1);
                    }
                    node.children.forEach(iter_1);
                }
            };
            this.dataSource.forEach(iter_1);
        }
    };
    /** check if all children are disable than make parent node disable */
    CheckboxTree.prototype.checkDisableChildren = function (node) {
        if (node.children && node.children.length) {
            if (node.children.length === this.disabledCount) { // disable parent if all children are disable
                node.disabled = true;
            }
        }
    };
    /** check whether children node have any disable node */
    CheckboxTree.prototype.checkDisabledNode = function (node) {
        var _this = this;
        this.disabledCount = 0;
        /** callback to find whether there is a disabled node inside and if so how many are there  */
        var iter = function (n) {
            if (n.disabled) {
                _this.disabledCount++;
                return true;
            }
            if (n.children && n.children.length) {
                return n.children.filter(iter).length;
            }
        };
        var disabled = [node].filter(iter);
        return disabled.length;
    };
    /** Dynamically prepare the checkbox tree from the JSON */
    CheckboxTree.prototype.constructTree = function (nodes, depth) {
        var _this = this;
        var rootUlEle = this.generateUlElement();
        if (nodes && nodes.length) {
            nodes.forEach(function (node) {
                var liEle = _this.generateLiElement(node);
                _this.liElementsById[node.id] = liEle;
                var ulEle;
                if (node.children && node.children.length) {
                    ulEle = _this.constructTree(node.children, depth + 1);
                }
                if (ulEle) {
                    liEle.appendChild(ulEle);
                }
                rootUlEle.appendChild(liEle);
            });
        }
        return rootUlEle;
    };
    /** Toggle show/hide selected nodes based on showSelected flag */
    CheckboxTree.prototype.displaySelectedNodes = function (search) {
        var _this = this;
        if (search === void 0) { search = true; }
        /** If serch combined with show selected first get serched data than perform show selected */
        if (this.searchText && search) {
            this.performSearch(search);
        }
        /** Get respective dom nodes */
        var domTopParent = this.contentItemsContainer.querySelectorAll("ul");
        var domTopParentLi = this.contentItemsContainer.querySelectorAll("li");
        var domCheckedNodes = domTopParent[0].querySelectorAll("li." + CSS_CLASS.FULL_SELECTED + "." + CSS_CLASS.SHOW);
        var domPartiallyCheckedNodes = domTopParent[0].querySelectorAll("li." + CSS_CLASS.PARTIAL_SELECTED + "." + CSS_CLASS.SHOW);
        var domActiveNodes = __spreadArrays(domCheckedNodes, domPartiallyCheckedNodes);
        /** perform loop on active nodes top of all nodes to find out the result */
        domTopParentLi.forEach(function (node) {
            if (_this.showSelected) {
                if (domActiveNodes.length) {
                    _this.showSelectActiveNodes(node, domActiveNodes); // perform loop on active nodes
                }
                else {
                    _this.hideNode(node); // If there is no active node and show selected is checked than hide the node
                }
            }
            else {
                /** if show selected flag is false and there is no search text than dispaly all the nodes */
                if (!_this.searchText) {
                    node.classList.add(CSS_CLASS.SHOW);
                }
            }
        });
    };
    /** Emit output event on click */
    CheckboxTree.prototype.emitData = function () {
        this.checkboxSelection.emit(this.originalData);
    };
    /** Generate list element dynamically */
    CheckboxTree.prototype.generateLiElement = function (node) {
        var li = document.createElement('li');
        var mainDiv = document.createElement('div');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            li.classList.add(CSS_CLASS.IE_PREFIX);
            mainDiv.classList.add(CSS_CLASS.IE_PREFIX);
        }
        li.classList.add(TREE_JS_CLASS.NODE);
        mainDiv.classList.add(CSS_CLASS.MT_10);
        mainDiv.classList.add(CSS_CLASS.TRUNCATE);
        mainDiv.classList.add(CSS_CLASS.TRUNCATE_RTL);
        mainDiv.classList.add(CSS_CLASS.TRUNCATE_ALIGN);
        if (node.children && node.children.length) {
            this.addSwitcher(mainDiv, node, li);
        }
        else {
            li.classList.add(TREE_JS_CLASS.PLACEHOLDER);
        }
        var help = document.createElement('i');
        var checkbox = document.createElement('input');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            help.classList.add(CSS_CLASS.IE_PREFIX);
            checkbox.classList.add(CSS_CLASS.IE_PREFIX);
        }
        checkbox.type = 'checkbox';
        checkbox.name = node.value;
        checkbox.value = node.value;
        checkbox.id = node.id;
        checkbox.title = node.value;
        checkbox.setAttribute('tabIndex', '-1');
        mainDiv.appendChild(checkbox);
        /** add css classes for checkbox functionalities */
        var checkboxSprite = document.createElement('label');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            checkboxSprite.classList.add(CSS_CLASS.IE_PREFIX);
        }
        checkboxSprite.htmlFor = node.id;
        checkboxSprite.classList.add(CSS_CLASS.MARGIN_BOTTOM);
        checkboxSprite.classList.add(TREE_JS_CLASS.CHECKBOX);
        checkboxSprite.classList.add(CSS_CLASS.TRUNCATE);
        checkboxSprite.classList.add(CSS_CLASS.TRUNCATE_DISPLAY);
        checkboxSprite.classList.add(CSS_CLASS.ACCESS_FOCUS);
        checkboxSprite.tabIndex = 0;
        mainDiv.appendChild(checkboxSprite);
        li.appendChild(mainDiv);
        /** add css classes for lable present in checkbox */
        var label = document.createElement('span');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            label.classList.add(CSS_CLASS.IE_PREFIX);
        }
        label.classList.add(TREE_JS_CLASS.LABEL);
        label.id = "span" + node.id;
        label.title = node.value;
        /** add pill */
        this.addPill(node, li, checkboxSprite, label);
        /** add help icon to the node if helpText exist */
        if (node.helpText) {
            help.title = node.helpText;
            help.classList.add(CSS_CLASS.B2B_SPRITE);
            help.classList.add(CSS_CLASS.HELP);
            checkboxSprite.classList.add(CSS_CLASS.TRUNCATE_ALIGN);
            checkboxSprite.classList.add(CSS_CLASS.TRUNCATE_RTL);
            label.classList.add(CSS_CLASS.TRUNCATE);
        }
        checkboxSprite.appendChild(label);
        checkboxSprite.appendChild(help);
        li.setAttribute('node_id', node.id);
        return li;
    };
    /** Get css class for Pills */
    CheckboxTree.prototype.getPillClass = function (text) {
        var className;
        switch (text.toString().toLowerCase()) {
            case ACCOUNT.ICA:
                className = PILL_CLASS.ICA;
                break;
            case ACCOUNT.BIN:
                className = PILL_CLASS.BIN;
                break;
            case ACCOUNT.RNG:
                className = PILL_CLASS.RNG;
                break;
            case ACCOUNT.CID:
                className = PILL_CLASS.CID;
                break;
            case ACCOUNT.RTN:
                className = PILL_CLASS.RTN;
                break;
            case ACCOUNT.PROC:
                className = PILL_CLASS.PROC;
                break;
            case ACCOUNT.RPPS:
                className = PILL_CLASS.RPPS;
                break;
            case ACCOUNT.BILR:
                className = PILL_CLASS.BILR;
                break;
            default:
                className = PILL_CLASS.ICA;
        }
        return className;
    };
    /** Create root element where the dynamic tree structure will render */
    CheckboxTree.prototype.generateRootElement = function () {
        var div = document.createElement('div');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            div.classList.add(CSS_CLASS.IE_PREFIX);
        }
        div.classList.add(TREE_JS_CLASS.TREE);
        return div;
    };
    /** Create a wrapper for list elements */
    CheckboxTree.prototype.generateUlElement = function () {
        var ul = document.createElement('ul');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            ul.classList.add(CSS_CLASS.IE_PREFIX);
        }
        ul.classList.add(TREE_JS_CLASS.NODES);
        return ul;
    };
    /** get status of a node */
    CheckboxTree.prototype.getNodeStatus = function (disabledCount, node, child, changeState) {
        return (disabledCount && node.status === DISPLAY.PARTIALLY_SELECTED && child.children && changeState === DISPLAY.CHECKBOX_CLICK) ? DISPLAY.PARTIALLY_SELECTED :
            (node.status === DISPLAY.FULLY_SELECTED) ? node.status : DISPLAY.NOT_SELECTED;
    };
    /** hide a node */
    CheckboxTree.prototype.hideNode = function (node) {
        if (node) {
            if (node.classList.contains(CSS_CLASS.SHOW)) {
                node.classList.remove(CSS_CLASS.SHOW);
            }
            node.classList.add(CSS_CLASS.HIDE);
        }
    };
    /** Construct a list of array that need to update on click on a list */
    CheckboxTree.prototype.markWillUpdateNode = function (node) {
        this.willUpdateNodesById[node.id] = node;
    };
    /** Perform action on click of a list */
    CheckboxTree.prototype.onItemClick = function (id) {
        var _this = this;
        var node = this.nodesById[id];
        if (node && !node.disabled) {
            this.checkboxData = [];
            this.setValue(id);
            this.updateLiElements();
            this.displaySelectedNodes();
            /** update the original data source to emit on check/uncheck */
            var iter_2 = function (n) {
                var classList = _this.liElementsById[n.id].classList;
                n.checked = (classList.contains(CSS_CLASS.FULL_SELECTED) || classList.contains(CSS_CLASS.PARTIAL_SELECTED));
                if (n.children && n.children.length) {
                    n.children.forEach(iter_2);
                }
            };
            this.originalData.forEach(iter_2);
            this.emitData();
        }
    };
    /** Perform expand and colapse */
    CheckboxTree.prototype.onSwitcherClick = function (target) {
        var liEle = target.parentNode.parentNode;
        var ele = liEle.lastChild;
        var height = ele.scrollHeight;
        var isNodeClosed = liEle.classList.contains(CSS_CLASS.CLOSE);
        this.animation({
            enter: function () {
                ele.style.height = isNodeClosed ? 0 : height + "px";
                ele.style.opacity = isNodeClosed ? 0 : 1;
            },
            active: function () {
                ele.style.height = isNodeClosed ? height + "px" : 0;
                ele.style.opacity = isNodeClosed ? 1 : 0;
            },
            leave: function () {
                ele.style.height = '';
                ele.style.opacity = '';
                if (isNodeClosed) {
                    liEle.classList.remove(CSS_CLASS.CLOSE);
                    target.setAttribute(ATTRIBUTE.ARIA_LABLE, DISPLAY.COLLAPSE_LIST);
                    target.setAttribute(ATTRIBUTE.ARIA_EXPANDED, 'true');
                    target.setAttribute(ATTRIBUTE.ARIA_PRESSED, 'true');
                }
                else {
                    liEle.classList.add(CSS_CLASS.CLOSE);
                    target.setAttribute(ATTRIBUTE.ARIA_LABLE, DISPLAY.EXPAND_LIST);
                    target.setAttribute(ATTRIBUTE.ARIA_EXPANDED, 'false');
                    target.setAttribute(ATTRIBUTE.ARIA_PRESSED, 'false');
                }
            },
        });
    };
    /** Search first label child from the HTML DOM */
    CheckboxTree.prototype.performSearch = function (selectedNode) {
        if (selectedNode === void 0) { selectedNode = false; }
        var nodes = this.originalData;
        var searchText = this.searchText;
        var cloneNodes = JSON.parse(JSON.stringify(nodes)); // deep clone the node to perform serarch on originl data
        var iter = function (node) {
            var temp;
            /** perform partial search */
            if (node.value.toString().includes(searchText)) {
                return true;
            }
            if (!Array.isArray(node.children)) {
                return false;
            }
            temp = node.children.filter(iter);
            if (temp.length) {
                node.children = temp;
                return true;
            }
        };
        var filterData = cloneNodes.filter(iter);
        this.processFilterData(filterData, searchText, selectedNode);
    };
    /** filter data logic */
    CheckboxTree.prototype.filterNodes = function (domNodes, filterData) {
        var _this = this;
        /** loop filter data over dom nodes to find the search result */
        domNodes.forEach(function (node) {
            var iter = function (f) {
                if (node.getAttribute('node_id') === f.id) {
                    _this.showNode(node);
                    return true;
                }
                if (node.getAttribute('node_id') !== f.id) {
                    _this.hideNode(node);
                }
                if (f.children && f.children.length) {
                    return f.children.some(iter);
                }
            };
            filterData.some(iter);
        });
    };
    /** Update DOM with filterdata */
    CheckboxTree.prototype.processFilterData = function (filterData, searchText, selectedNode) {
        var _this = this;
        var domNodes = __spreadArrays(this.contentItemsContainer.querySelectorAll('li'));
        var noresultEl = document.querySelector("." + CSS_CLASS.NO_RESULT);
        if (filterData.length && searchText) { // If search result not empty
            this.hideNode(noresultEl);
            this.filterNodes(domNodes, filterData);
        }
        else if (!filterData.length) { // If search result is empty
            domNodes.forEach(function (n) {
                _this.hideNode(n);
            });
            this.showNode(noresultEl);
        }
        else { // If search text is empty
            this.hideNode(noresultEl);
            domNodes.forEach(function (n) {
                _this.showNode(n);
            });
        }
        /** combination of filter and show selected functionalities */
        if (this.showSelected && !selectedNode) {
            this.displaySelectedNodes(selectedNode);
        }
    };
    /** Process configurable JSON */
    CheckboxTree.prototype.processTreeObj = function (nodes, parent) {
        var _this = this;
        if (parent === void 0) { parent = ''; }
        nodes.forEach(function (node) {
            _this.nodesById[node.id] = node;
            /** for each node assign its parent to a property called parent */
            if (parent) {
                node.parent = parent;
            }
            /** store each node to an array uniqly identified by its id */
            (node.children && node.children.length) ? _this.processTreeObj(node.children, node) :
                _this.leafNodesById[node.id] = node;
        });
    };
    /** routingHandler */
    CheckboxTree.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** set flag for the clicked checkbox */
    CheckboxTree.prototype.setValue = function (value, changeState) {
        if (changeState === void 0) { changeState = DISPLAY.CHECKBOX_CLICK; }
        var node = this.nodesById[value];
        if (!node) {
            return;
        }
        if (changeState === DISPLAY.CHECKBOX_CLICK) {
            var state = void 0;
            var prevStatus = node.status;
            state = prevStatus === DISPLAY.PARTIALLY_SELECTED ? DISPLAY.FULLY_SELECTED :
                prevStatus === DISPLAY.FULLY_SELECTED ? this.checkDisabledNode(node) ? DISPLAY.PARTIALLY_SELECTED : DISPLAY.NOT_SELECTED : DISPLAY.FULLY_SELECTED;
            node.status = state;
        }
        this.markWillUpdateNode(node);
        this.walkUp(node, changeState);
        this.walkDown(node, changeState);
    };
    /** show a node */
    CheckboxTree.prototype.showNode = function (node) {
        if (node) {
            if (node.classList.contains(CSS_CLASS.HIDE)) {
                node.classList.remove(CSS_CLASS.HIDE);
            }
            node.classList.add(CSS_CLASS.SHOW);
        }
    };
    /** display active nodes */
    CheckboxTree.prototype.showSelectActiveNodes = function (node, domActiveNodes) {
        domActiveNodes.some(function (activeNode) {
            if (node.getAttribute('node_id') === activeNode.getAttribute('node_id')) {
                node.classList.add(CSS_CLASS.SHOW);
                return true;
            }
            if (node.classList.contains(CSS_CLASS.SHOW)) {
                node.classList.remove(CSS_CLASS.SHOW);
            }
            node.classList.add(CSS_CLASS.HIDE);
        });
    };
    /** if node is not checked than upate this node to update then perform update on parent and children */
    CheckboxTree.prototype.updateNonCheckedNode = function (node) {
        if (!node.checked || !node.children) {
            this.setValue(node.id, 'default');
            this.updateLiElements();
        }
    };
    /** perform update */
    CheckboxTree.prototype.updateLiElement = function (node) {
        var classList = this.liElementsById[node.id].classList;
        this.updateNonDisabledNode(classList, node);
        this.updateDisabledNode(classList, node);
    };
    /** update disabled node */
    CheckboxTree.prototype.updateDisabledNode = function (classList, node) {
        switch (node.disabled) {
            case true:
                if (!classList.contains(CSS_CLASS.DISABLED)) {
                    classList.add(CSS_CLASS.DISABLED);
                }
                break;
            case false:
                if (classList.contains(CSS_CLASS.DISABLED)) {
                    classList.remove(CSS_CLASS.DISABLED);
                }
                break;
            default:
                return;
        }
    };
    /** Perform update on the list array */
    CheckboxTree.prototype.updateLiElements = function () {
        var _this = this;
        Object.values(this.willUpdateNodesById).forEach(function (node) {
            _this.updateLiElement(node);
        });
    };
    /** update non-disabled node */
    CheckboxTree.prototype.updateNonDisabledNode = function (classList, node) {
        if (!classList.contains(CSS_CLASS.SHOW)) {
            classList.add(CSS_CLASS.SHOW);
        }
        switch (node.status) {
            case DISPLAY.NOT_SELECTED:
                classList.remove(CSS_CLASS.PARTIAL_SELECTED, CSS_CLASS.FULL_SELECTED);
                break;
            case DISPLAY.PARTIALLY_SELECTED:
                classList.remove(CSS_CLASS.FULL_SELECTED);
                classList.add(CSS_CLASS.PARTIAL_SELECTED);
                break;
            case DISPLAY.FULLY_SELECTED:
                classList.remove(CSS_CLASS.PARTIAL_SELECTED);
                classList.add(CSS_CLASS.FULL_SELECTED);
                break;
            default:
                return;
        }
    };
    /** Process the list down to the clicked element */
    CheckboxTree.prototype.walkDown = function (node, changeState) {
        var _this = this;
        if (node.children && node.children.length) {
            node.children.forEach(function (child) {
                var disabledCount = _this.checkDisabledNode(child);
                if (!child.disabled || changeState === 'default') {
                    child.status = _this.getNodeStatus(disabledCount, node, child, changeState);
                    _this.markWillUpdateNode(child);
                    _this.walkDown(child, changeState);
                }
            });
        }
    };
    /** Process the list up to the clicked element */
    CheckboxTree.prototype.walkUp = function (node, changeState) {
        var parent = node.parent;
        if (parent) {
            var pStatus = void 0;
            var statusCount = parent.children.reduce(function (acc, child) {
                if (!isNaN(child.status)) {
                    return acc + child.status;
                }
                return acc;
            }, 0);
            pStatus = statusCount ? statusCount === parent.children.length * 2 ? DISPLAY.FULLY_SELECTED : DISPLAY.PARTIALLY_SELECTED : DISPLAY.NOT_SELECTED;
            parent.status = pStatus;
            this.markWillUpdateNode(parent);
            this.walkUp(parent, changeState);
        }
    };
    /** Render the checkbox-tree */
    CheckboxTree.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-checkbox-tree render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-checkbox-tree.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("span", { class: "chkbox-tree-node-noresult dxp-none" }, dxp.i18n.t('CheckboxTree:noResult')), h("div", { ref: function (el) { return _this.contentItemsContainer = el; } })));
    };
    Object.defineProperty(CheckboxTree.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTree, "watchers", {
        get: function () {
            return {
                "searchText": ["searchHandler"],
                "showSelected": ["watchHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxTree, "style", {
        get: function () { return "div.dxp.dxp-checkbox-tree .chkbox-tree{-webkit-box-sizing:border-box;box-sizing:border-box}div.dxp.dxp-checkbox-tree .chkbox-tree>.chkbox-tree-node{padding-left:0}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-nodes{list-style:none;padding-left:1.438rem;overflow:hidden}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-nodes:first-child{padding-left:0}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node{cursor:pointer;overflow:hidden}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node.chkbox-tree-placeholder{padding-left:1.438rem}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node>div input[type=checkbox]{opacity:0;position:absolute;visibility:hidden}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-checkbox:before,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-icon,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-checked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-disabled.chkbox-tree-node-checked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-halfchecked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-checkbox:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-checked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-disabled.chkbox-tree-node-checked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-halfchecked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-switcher:before{cursor:pointer;position:absolute;top:.2rem}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-checkbox,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-sw,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-switcher,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-checkbox,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-switcher{vertical-align:sub;margin-right:1.438rem;cursor:pointer;position:relative}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-switcher:before{top:-.5rem}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-close>.chkbox-tree-nodes{height:0}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-disabled,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-disabled>div .chkbox-tree-checkbox,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-disabled>div .chkbox-tree-checkbox:before{cursor:not-allowed}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-disabled>div .chkbox-tree-checkbox:hover:before{-webkit-box-shadow:none;box-shadow:none}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-label{vertical-align:middle;margin-top:.125rem}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-label-bold{margin-left:1.375rem}div.dxp.dxp-checkbox-tree .chkbox-tree .help-g{margin-top:0;margin-left:.5rem;cursor:pointer}div.dxp.dxp-checkbox-tree .chkbox-tree .trunc-display{-ms-flex-align:center;align-items:center}div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-bin,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-cid,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-ica,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rng,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rpps,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rtn,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bin,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-cid,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-ica,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rng,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rpps,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rtn{text-align:center;padding:.069rem .375rem .006rem;text-decoration:none;border-radius:.5rem;margin-right:.5rem;width:2.125rem;height:1rem;margin-left:1.4rem}div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rpps{padding:.069rem .188rem .006rem}div.dxp.dxp-checkbox-tree .chkbox-tree .trunc-align.trunc-rtl{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-bin,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-cid,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-ica,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rng,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rpps,div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-rtn,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bin,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-cid,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-ica,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rng,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rpps,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rtn{padding:.125rem .375rem}div.dxp.dxp-checkbox-tree .chkbox-tree .chk-pill-proc{padding:.125rem .25rem}div.dxp.dxp-checkbox-tree .chkbox-tree .trunc-align.trunc-rtl{display:inline-table;-ms-flex-align:center;align-items:center}div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree .chkbox-tree .chkbox-tree-switcher:before{top:-1.188rem}}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree{-webkit-box-sizing:border-box;box-sizing:border-box}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree>.chkbox-tree-node{padding-right:0}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-nodes{list-style:none;padding-right:1.438rem;overflow:hidden}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-nodes:first-child{padding-right:0}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node{cursor:pointer;overflow:hidden}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node.chkbox-tree-placeholder{padding-right:1.438rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-checkbox:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-icon,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-checked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-disabled.chkbox-tree-node-checked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-halfchecked>div>.chkbox-tree-checkbox:after,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-switcher:before{cursor:pointer;position:absolute;top:.2rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-checkbox,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-sw,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-switcher{vertical-align:sub;margin-left:1.438rem;cursor:pointer;position:relative}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-switcher:before{top:-.5rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-close>.chkbox-tree-nodes{height:0}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-checkbox{margin-right:0}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-disabled,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-disabled>div .chkbox-tree-checkbox,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-disabled>div .chkbox-tree-checkbox:before{cursor:not-allowed}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-disabled>div .chkbox-tree-checkbox:hover:before{-webkit-box-shadow:none;box-shadow:none}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-label{vertical-align:middle;margin-top:.125rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-label-bold{margin-right:1.375rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .help-g{margin-top:0;margin-right:.5rem;cursor:pointer}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .trunc-display{-ms-flex-align:center;align-items:center}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bin,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-cid,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-ica,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rng,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rpps,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rtn{text-align:center;padding:.069rem .375rem .006rem;text-decoration:none;border-radius:.5rem;margin-left:.5rem;width:2.125rem;height:1rem;margin-right:1.4rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rpps{padding:.069rem .188rem .006rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .trunc-align.trunc-rtl{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bilr,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-bin,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-cid,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-ica,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-proc,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rng,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rpps,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chk-pill-rtn{padding:.125rem .375rem}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .trunc-align.trunc-rtl{display:inline-table;-ms-flex-align:center;align-items:center}div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-node-close>div>.chkbox-tree-switcher:before,div.dxp.dxp-checkbox-tree[dir=rtl] .chkbox-tree .chkbox-tree-switcher:before{top:-1.188rem}}"; },
        enumerable: true,
        configurable: true
    });
    return CheckboxTree;
}());
export { CheckboxTree as dxp_checkbox_tree };
