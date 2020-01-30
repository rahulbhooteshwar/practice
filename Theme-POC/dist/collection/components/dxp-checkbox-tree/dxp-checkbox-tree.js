import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { ACCOUNT, ATTRIBUTE, CSS_CLASS, DISPLAY, PILL_CLASS, TREE_JS_CLASS } from './constants';
import messages from './messages';
/** dxp-checkbox-tree */
export class CheckboxTree {
    constructor() {
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
    }
    /** watch for searchText prop */
    searchHandler() {
        this.performSearch();
    }
    /** watch for showSelected prop */
    watchHandler() {
        this.displaySelectedNodes();
    }
    /** Keyboard Event */
    handleKeyDown(ev) {
        if ((ev.key === ' ') || (ev.key === 'Spacebar') || (ev.key === 'Enter')) {
            this.onItemClick(ev.target['htmlFor']);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'CheckboxTree', messages);
        this.setNodeId(this.dataSource);
    }
    /** actions to be performed after component load */
    componentDidLoad() {
        if (this.dataSource) {
            this.originalData = JSON.parse(JSON.stringify(this.dataSource));
            this.processData();
        }
    }
    /** Identify the top most parent and add pills to its childen */
    addPill(node, li, checkboxSprite, label) {
        if (node.hasOwnProperty('parent')) {
            const pill = document.createElement('span');
            if (this.base.dxp.is.ie()) {
                pill.classList.add(CSS_CLASS.IE_PREFIX);
            }
            if (node.code) {
                const pillClass = this.getPillClass(node.code);
                pill.classList.add(pillClass);
                pill.setAttribute('title', node.code);
                const pilltext = document.createTextNode(node.code.toString().toUpperCase());
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
                label.appendChild(document.createTextNode(` [${node.value}]`));
            }
        }
    }
    /** add css classes for expand and colapse functionalities */
    addSwitcher(mainDiv, node, li) {
        const switcher = document.createElement('button');
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
    }
    /** Process data object */
    setNodeId(nodes = []) {
        nodes.forEach(node => {
            node['id'] = `_${Math.random().toString(36).substr(2, 9)}`;
            if (node.children && node.children.length) {
                this.setNodeId(node.children);
            }
        });
    }
    /** Process data object */
    processData() {
        const treeEle = this.generateRootElement();
        this.processTreeObj(this.dataSource);
        treeEle.appendChild(this.constructTree(this.dataSource, 0));
        this.bindEvent(treeEle, 'click');
        this.bindEvent(treeEle, 'document:keypress');
        this.checkboxDefaultUpdate();
        this.contentItemsContainer.appendChild(treeEle);
        this.displaySelectedNodes();
    }
    /** Apply animation to expand and colapse */
    animation(callback) {
        requestAnimationFrame(() => {
            callback.enter();
            requestAnimationFrame(() => {
                callback.active();
                callback.leave();
            });
        });
    }
    /** Binding click event with tree object */
    bindEvent(ele, typeOfEvent) {
        ele.addEventListener(typeOfEvent, e => {
            const { target } = e;
            // bind event for checkbox
            if (target.nodeName === 'LABEL' && target.classList.contains(TREE_JS_CLASS.CHECKBOX)) {
                this.onItemClick(target.parentNode.parentNode.getAttribute('node_id'));
            }
            else if (target.nodeName === 'SPAN' && target.classList.contains(TREE_JS_CLASS.LABEL)) {
                this.onItemClick(target.getAttribute('id').slice(4));
            }
            else if (target.nodeName === 'BUTTON' && target.classList.contains(TREE_JS_CLASS.SWITCHER)) {
                this.onSwitcherClick(target);
            }
        }, false);
    }
    /** Perform action on default check &&  default disabled */
    checkboxDefaultUpdate() {
        if (this.dataSource && this.dataSource.length) {
            /** calback to check if all the childrens are disabled than make parent disabled */
            const checkDisabledParent = node => {
                this.checkDisabledNode(node);
                this.checkDisableChildren(node);
            };
            /** callback to loop and pre select first time load */
            const iter = node => {
                node.status = node.checked ? DISPLAY.FULLY_SELECTED : DISPLAY.NOT_SELECTED;
                this.updateNonCheckedNode(node);
                /** check for parent whether its childrens are all disabled or not */
                if (node.children && node.children.length) {
                    node.children.forEach(checkDisabledParent);
                    if (node.children.length === this.disabledCount && node.hasOwnProperty('parent')) {
                        [node.parent].forEach(checkDisabledParent);
                    }
                    node.children.forEach(iter);
                }
            };
            this.dataSource.forEach(iter);
        }
    }
    /** check if all children are disable than make parent node disable */
    checkDisableChildren(node) {
        if (node.children && node.children.length) {
            if (node.children.length === this.disabledCount) { // disable parent if all children are disable
                node.disabled = true;
            }
        }
    }
    /** check whether children node have any disable node */
    checkDisabledNode(node) {
        this.disabledCount = 0;
        /** callback to find whether there is a disabled node inside and if so how many are there  */
        const iter = n => {
            if (n.disabled) {
                this.disabledCount++;
                return true;
            }
            if (n.children && n.children.length) {
                return n.children.filter(iter).length;
            }
        };
        const disabled = [node].filter(iter);
        return disabled.length;
    }
    /** Dynamically prepare the checkbox tree from the JSON */
    constructTree(nodes, depth) {
        const rootUlEle = this.generateUlElement();
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                const liEle = this.generateLiElement(node);
                this.liElementsById[node.id] = liEle;
                let ulEle;
                if (node.children && node.children.length) {
                    ulEle = this.constructTree(node.children, depth + 1);
                }
                if (ulEle) {
                    liEle.appendChild(ulEle);
                }
                rootUlEle.appendChild(liEle);
            });
        }
        return rootUlEle;
    }
    /** Toggle show/hide selected nodes based on showSelected flag */
    displaySelectedNodes(search = true) {
        /** If serch combined with show selected first get serched data than perform show selected */
        if (this.searchText && search) {
            this.performSearch(search);
        }
        /** Get respective dom nodes */
        const domTopParent = this.contentItemsContainer.querySelectorAll(`ul`);
        const domTopParentLi = this.contentItemsContainer.querySelectorAll(`li`);
        const domCheckedNodes = domTopParent[0].querySelectorAll(`li.${CSS_CLASS.FULL_SELECTED}.${CSS_CLASS.SHOW}`);
        const domPartiallyCheckedNodes = domTopParent[0].querySelectorAll(`li.${CSS_CLASS.PARTIAL_SELECTED}.${CSS_CLASS.SHOW}`);
        const domActiveNodes = [...domCheckedNodes, ...domPartiallyCheckedNodes];
        /** perform loop on active nodes top of all nodes to find out the result */
        domTopParentLi.forEach((node) => {
            if (this.showSelected) {
                if (domActiveNodes.length) {
                    this.showSelectActiveNodes(node, domActiveNodes); // perform loop on active nodes
                }
                else {
                    this.hideNode(node); // If there is no active node and show selected is checked than hide the node
                }
            }
            else {
                /** if show selected flag is false and there is no search text than dispaly all the nodes */
                if (!this.searchText) {
                    node.classList.add(CSS_CLASS.SHOW);
                }
            }
        });
    }
    /** Emit output event on click */
    emitData() {
        this.checkboxSelection.emit(this.originalData);
    }
    /** Generate list element dynamically */
    generateLiElement(node) {
        const li = document.createElement('li');
        const mainDiv = document.createElement('div');
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
        const help = document.createElement('i');
        const checkbox = document.createElement('input');
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
        const checkboxSprite = document.createElement('label');
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
        const label = document.createElement('span');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            label.classList.add(CSS_CLASS.IE_PREFIX);
        }
        label.classList.add(TREE_JS_CLASS.LABEL);
        label.id = `span${node.id}`;
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
    }
    /** Get css class for Pills */
    getPillClass(text) {
        let className;
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
    }
    /** Create root element where the dynamic tree structure will render */
    generateRootElement() {
        const div = document.createElement('div');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            div.classList.add(CSS_CLASS.IE_PREFIX);
        }
        div.classList.add(TREE_JS_CLASS.TREE);
        return div;
    }
    /** Create a wrapper for list elements */
    generateUlElement() {
        const ul = document.createElement('ul');
        // add IE prefix class due to dynamic injecting elements
        if (this.base.dxp.is.ie()) {
            ul.classList.add(CSS_CLASS.IE_PREFIX);
        }
        ul.classList.add(TREE_JS_CLASS.NODES);
        return ul;
    }
    /** get status of a node */
    getNodeStatus(disabledCount, node, child, changeState) {
        return (disabledCount && node.status === DISPLAY.PARTIALLY_SELECTED && child.children && changeState === DISPLAY.CHECKBOX_CLICK) ? DISPLAY.PARTIALLY_SELECTED :
            (node.status === DISPLAY.FULLY_SELECTED) ? node.status : DISPLAY.NOT_SELECTED;
    }
    /** hide a node */
    hideNode(node) {
        if (node) {
            if (node.classList.contains(CSS_CLASS.SHOW)) {
                node.classList.remove(CSS_CLASS.SHOW);
            }
            node.classList.add(CSS_CLASS.HIDE);
        }
    }
    /** Construct a list of array that need to update on click on a list */
    markWillUpdateNode(node) {
        this.willUpdateNodesById[node.id] = node;
    }
    /** Perform action on click of a list */
    onItemClick(id) {
        const node = this.nodesById[id];
        if (node && !node.disabled) {
            this.checkboxData = [];
            this.setValue(id);
            this.updateLiElements();
            this.displaySelectedNodes();
            /** update the original data source to emit on check/uncheck */
            const iter = n => {
                const { classList } = this.liElementsById[n.id];
                n.checked = (classList.contains(CSS_CLASS.FULL_SELECTED) || classList.contains(CSS_CLASS.PARTIAL_SELECTED));
                if (n.children && n.children.length) {
                    n.children.forEach(iter);
                }
            };
            this.originalData.forEach(iter);
            this.emitData();
        }
    }
    /** Perform expand and colapse */
    onSwitcherClick(target) {
        const liEle = target.parentNode.parentNode;
        const ele = liEle.lastChild;
        const height = ele.scrollHeight;
        const isNodeClosed = liEle.classList.contains(CSS_CLASS.CLOSE);
        this.animation({
            enter() {
                ele.style.height = isNodeClosed ? 0 : `${height}px`;
                ele.style.opacity = isNodeClosed ? 0 : 1;
            },
            active() {
                ele.style.height = isNodeClosed ? `${height}px` : 0;
                ele.style.opacity = isNodeClosed ? 1 : 0;
            },
            leave() {
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
    }
    /** Search first label child from the HTML DOM */
    performSearch(selectedNode = false) {
        const nodes = this.originalData;
        const searchText = this.searchText;
        const cloneNodes = JSON.parse(JSON.stringify(nodes)); // deep clone the node to perform serarch on originl data
        const iter = node => {
            let temp;
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
        const filterData = cloneNodes.filter(iter);
        this.processFilterData(filterData, searchText, selectedNode);
    }
    /** filter data logic */
    filterNodes(domNodes, filterData) {
        /** loop filter data over dom nodes to find the search result */
        domNodes.forEach((node) => {
            const iter = f => {
                if (node.getAttribute('node_id') === f.id) {
                    this.showNode(node);
                    return true;
                }
                if (node.getAttribute('node_id') !== f.id) {
                    this.hideNode(node);
                }
                if (f.children && f.children.length) {
                    return f.children.some(iter);
                }
            };
            filterData.some(iter);
        });
    }
    /** Update DOM with filterdata */
    processFilterData(filterData, searchText, selectedNode) {
        const domNodes = [...this.contentItemsContainer.querySelectorAll('li')];
        const noresultEl = document.querySelector(`.${CSS_CLASS.NO_RESULT}`);
        if (filterData.length && searchText) { // If search result not empty
            this.hideNode(noresultEl);
            this.filterNodes(domNodes, filterData);
        }
        else if (!filterData.length) { // If search result is empty
            domNodes.forEach((n) => {
                this.hideNode(n);
            });
            this.showNode(noresultEl);
        }
        else { // If search text is empty
            this.hideNode(noresultEl);
            domNodes.forEach((n) => {
                this.showNode(n);
            });
        }
        /** combination of filter and show selected functionalities */
        if (this.showSelected && !selectedNode) {
            this.displaySelectedNodes(selectedNode);
        }
    }
    /** Process configurable JSON */
    processTreeObj(nodes, parent = '') {
        nodes.forEach(node => {
            this.nodesById[node.id] = node;
            /** for each node assign its parent to a property called parent */
            if (parent) {
                node.parent = parent;
            }
            /** store each node to an array uniqly identified by its id */
            (node.children && node.children.length) ? this.processTreeObj(node.children, node) :
                this.leafNodesById[node.id] = node;
        });
    }
    /** routingHandler */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** set flag for the clicked checkbox */
    setValue(value, changeState = DISPLAY.CHECKBOX_CLICK) {
        const node = this.nodesById[value];
        if (!node) {
            return;
        }
        if (changeState === DISPLAY.CHECKBOX_CLICK) {
            let state;
            const prevStatus = node.status;
            state = prevStatus === DISPLAY.PARTIALLY_SELECTED ? DISPLAY.FULLY_SELECTED :
                prevStatus === DISPLAY.FULLY_SELECTED ? this.checkDisabledNode(node) ? DISPLAY.PARTIALLY_SELECTED : DISPLAY.NOT_SELECTED : DISPLAY.FULLY_SELECTED;
            node.status = state;
        }
        this.markWillUpdateNode(node);
        this.walkUp(node, changeState);
        this.walkDown(node, changeState);
    }
    /** show a node */
    showNode(node) {
        if (node) {
            if (node.classList.contains(CSS_CLASS.HIDE)) {
                node.classList.remove(CSS_CLASS.HIDE);
            }
            node.classList.add(CSS_CLASS.SHOW);
        }
    }
    /** display active nodes */
    showSelectActiveNodes(node, domActiveNodes) {
        domActiveNodes.some((activeNode) => {
            if (node.getAttribute('node_id') === activeNode.getAttribute('node_id')) {
                node.classList.add(CSS_CLASS.SHOW);
                return true;
            }
            if (node.classList.contains(CSS_CLASS.SHOW)) {
                node.classList.remove(CSS_CLASS.SHOW);
            }
            node.classList.add(CSS_CLASS.HIDE);
        });
    }
    /** if node is not checked than upate this node to update then perform update on parent and children */
    updateNonCheckedNode(node) {
        if (!node.checked || !node.children) {
            this.setValue(node.id, 'default');
            this.updateLiElements();
        }
    }
    /** perform update */
    updateLiElement(node) {
        const { classList } = this.liElementsById[node.id];
        this.updateNonDisabledNode(classList, node);
        this.updateDisabledNode(classList, node);
    }
    /** update disabled node */
    updateDisabledNode(classList, node) {
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
    }
    /** Perform update on the list array */
    updateLiElements() {
        Object.values(this.willUpdateNodesById).forEach(node => {
            this.updateLiElement(node);
        });
    }
    /** update non-disabled node */
    updateNonDisabledNode(classList, node) {
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
    }
    /** Process the list down to the clicked element */
    walkDown(node, changeState) {
        if (node.children && node.children.length) {
            node.children.forEach(child => {
                const disabledCount = this.checkDisabledNode(child);
                if (!child.disabled || changeState === 'default') {
                    child.status = this.getNodeStatus(disabledCount, node, child, changeState);
                    this.markWillUpdateNode(child);
                    this.walkDown(child, changeState);
                }
            });
        }
    }
    /** Process the list up to the clicked element */
    walkUp(node, changeState) {
        const { parent } = node;
        if (parent) {
            let pStatus;
            const statusCount = parent.children.reduce((acc, child) => {
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
    }
    /** Render the checkbox-tree */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-checkbox-tree render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-checkbox-tree.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("span", { class: "chkbox-tree-node-noresult dxp-none" }, dxp.i18n.t('CheckboxTree:noResult')),
            h("div", { ref: el => this.contentItemsContainer = el })));
    }
    static get is() { return "dxp-checkbox-tree"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-checkbox-tree.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-checkbox-tree.css"]
    }; }
    static get properties() { return {
        "dataSource": {
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
                "text": "checkbox-tree object"
            },
            "attribute": "data-source",
            "reflect": false
        },
        "searchText": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "serchtext to filter data"
            },
            "attribute": "search-text",
            "reflect": false,
            "defaultValue": "''"
        },
        "showSelected": {
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
                "text": "show only selected checkbox nodes"
            },
            "attribute": "show-selected",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "checkboxSelection",
            "name": "checkboxSelection",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit the value of checked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "searchText",
            "methodName": "searchHandler"
        }, {
            "propName": "showSelected",
            "methodName": "watchHandler"
        }]; }
    static get listeners() { return [{
            "name": "keypress",
            "method": "handleKeyDown",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
