import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-flex-layout */
export declare class FlexLayout {
    /** base component - common functionality */
    base: BaseComponent;
    /** layout element - utilized by DXP framework */
    element: HTMLElement;
    /** Nested layout items */
    layoutItems: HTMLElement[];
    /** this object is used to re-render the dom as we dont have any state to force re render */
    reRender: {};
    /** the component's theme (if any) */
    theme: string;
    /** borderStyle */
    borderStyle: string;
    /** reverse columns for small devices */
    columnReverse: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** listner for window resize/orientation change */
    windowResize(): void;
    /** actions to be performed after render method is called */
    componentDidRender(): void;
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList: any): any;
    /**
     * Function to return column class based on provided column width
     */
    getColumnClass(item: HTMLElement): string;
    /** get array of rendered child tab elements */
    getLayoutItems(): any;
    /** apply column reverse as per condition */
    isColumnReverseApplicable(): boolean;
    /** Render the layout */
    render(): any;
}
