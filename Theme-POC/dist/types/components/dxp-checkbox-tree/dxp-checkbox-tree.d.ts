import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-checkbox-tree */
export declare class CheckboxTree {
    /** base component - common functionality */
    base: BaseComponent;
    /** List to hold output data on emit */
    checkboxData: any[];
    /** Tree HTML DOM container */
    contentItemsContainer: HTMLElement;
    /** Property to hold the count for disable node inside a parent node */
    disabledCount: number;
    /** List to hold Leaf node */
    leafNodesById: any[];
    /** List to hold all LI node */
    liElementsById: any[];
    /** List to hold all node */
    nodesById: any[];
    /** List to hold nodes which update after click */
    willUpdateNodesById: any[];
    /** Hold original Object */
    originalData: any;
    /** checkbox-tree element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** checkbox-tree object */
    dataSource: any;
    /** serchtext to filter data */
    searchText: any;
    /** watch for searchText prop */
    searchHandler(): void;
    /** show only selected checkbox nodes */
    showSelected: boolean;
    /** watch for showSelected prop */
    watchHandler(): void;
    /** Keyboard Event */
    handleKeyDown(ev: KeyboardEvent): void;
    /** Emit the value of checked */
    checkboxSelection: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component load */
    componentDidLoad(): void;
    /** Identify the top most parent and add pills to its childen */
    addPill(node: any, li: any, checkboxSprite: any, label: any): void;
    /** add css classes for expand and colapse functionalities */
    addSwitcher(mainDiv: any, node: any, li: any): void;
    /** Process data object */
    setNodeId(nodes?: any[]): void;
    /** Process data object */
    processData(): void;
    /** Apply animation to expand and colapse */
    animation(callback: any): void;
    /** Binding click event with tree object */
    bindEvent(ele: any, typeOfEvent: any): void;
    /** Perform action on default check &&  default disabled */
    checkboxDefaultUpdate(): void;
    /** check if all children are disable than make parent node disable */
    checkDisableChildren(node: any): void;
    /** check whether children node have any disable node */
    checkDisabledNode(node: any): number;
    /** Dynamically prepare the checkbox tree from the JSON */
    constructTree(nodes: any, depth: any): HTMLUListElement;
    /** Toggle show/hide selected nodes based on showSelected flag */
    displaySelectedNodes(search?: boolean): void;
    /** Emit output event on click */
    emitData(): void;
    /** Generate list element dynamically */
    generateLiElement(node: any): HTMLLIElement;
    /** Get css class for Pills */
    getPillClass(text: any): any;
    /** Create root element where the dynamic tree structure will render */
    generateRootElement(): HTMLDivElement;
    /** Create a wrapper for list elements */
    generateUlElement(): HTMLUListElement;
    /** get status of a node */
    getNodeStatus(disabledCount: any, node: any, child: any, changeState: any): any;
    /** hide a node */
    hideNode(node: any): void;
    /** Construct a list of array that need to update on click on a list */
    markWillUpdateNode(node: any): void;
    /** Perform action on click of a list */
    onItemClick(id: any): void;
    /** Perform expand and colapse */
    onSwitcherClick(target: any): void;
    /** Search first label child from the HTML DOM */
    performSearch(selectedNode?: boolean): void;
    /** filter data logic */
    filterNodes(domNodes: any, filterData: any): void;
    /** Update DOM with filterdata */
    processFilterData(filterData: any, searchText: any, selectedNode: any): void;
    /** Process configurable JSON */
    processTreeObj(nodes: any, parent?: string): void;
    /** routingHandler */
    routingHandler(event: any): void;
    /** set flag for the clicked checkbox */
    setValue(value: any, changeState?: string): void;
    /** show a node */
    showNode(node: any): void;
    /** display active nodes */
    showSelectActiveNodes(node: any, domActiveNodes: any): void;
    /** if node is not checked than upate this node to update then perform update on parent and children */
    updateNonCheckedNode(node: any): void;
    /** perform update */
    updateLiElement(node: any): void;
    /** update disabled node */
    updateDisabledNode(classList: any, node: any): void;
    /** Perform update on the list array */
    updateLiElements(): void;
    /** update non-disabled node */
    updateNonDisabledNode(classList: any, node: any): void;
    /** Process the list down to the clicked element */
    walkDown(node: any, changeState: any): void;
    /** Process the list up to the clicked element */
    walkUp(node: any, changeState: any): void;
    /** Render the checkbox-tree */
    render(): any;
}
