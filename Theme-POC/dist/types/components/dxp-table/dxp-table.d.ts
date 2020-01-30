import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-table */
export declare class Table {
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
    /** accessibility text for table */
    accessibilityText: string;
    /** to facilitate object support in component */
    data: any;
    /** responsible for heading data which needs to be visible in table head */
    heading: any[];
    /** responsible for number of rows and data which needs to be visible in table rows head */
    rows: any[];
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** lifeCycle hook */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the table */
    render(): any;
}
