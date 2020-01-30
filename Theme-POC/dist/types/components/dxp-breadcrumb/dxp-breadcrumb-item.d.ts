import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-breadcrumb */
export declare class BreadcrumbItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** to set li element style attribute */
    liStyle: any;
    /** breadcrumb element - utilized by DXP framework */
    element: HTMLElement;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** accessibility text of the breadcrumb items */
    accessibilityText: string;
    /** hides the current item in breadcrumb */
    hideCurrentPage: boolean;
    /** to set the z-index value */
    indexVal: number;
    /** define for current page in breadcrumb */
    isCurrentPage: boolean;
    /** link of the breadcrumb item  */
    link: string;
    /** title of the breadcrumb items */
    linkTitle: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the breadcrumb */
    render(): any;
}
