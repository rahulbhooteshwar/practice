import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-table */
export declare class Cell {
    /** base component - common functionality */
    base: BaseComponent;
    /** table element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** content inside cell of table */
    content: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the table */
    render(): any;
}
