import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-data-grid */
export declare class DataGridRow {
    /** base component - common functionality */
    base: BaseComponent;
    /** filter wrapper element  */
    filterElement: HTMLElement;
    /** grid row element  */
    rowElement: HTMLElement;
    /** grid element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** attribute to pass row data */
    data: any;
    /** attribute to check row and head row */
    isHeader: boolean;
    /** attribute to check stackheader  */
    isStackHeader: boolean;
    /** attribute to check color of stackhead  */
    stackHeaderColor: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** to handle column pin features */
    handleColumnPinFeatures(cellEle: any, index: any): void;
    /** Render the Row */
    render(): any;
}
