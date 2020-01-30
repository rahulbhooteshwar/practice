import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-site-map-list */
export declare class SiteMapList {
    /** base component - common functionality */
    base: BaseComponent;
    /** site-map element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render site-map-list */
    render(): any;
}
