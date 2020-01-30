import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-site-map-group */
export declare class SiteMapGroup {
    /** base component - common functionality */
    base: BaseComponent;
    /** site-map element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** accessibility label */
    accessibility: string;
    /** list item text */
    heading: string;
    /** hyperlink  */
    href: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** return enable hyperlink or disable hyperlink on the basis of href prop */
    getHyperlink(): any;
    /** render site-map-list-group */
    render(): any;
}
