import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-region */
export declare class DxpRegion {
    /** base component - common functionality */
    base: BaseComponent;
    /** region element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** region default site link with description */
    description: string;
    /** expand region item by default */
    isOpen: boolean;
    /** region name */
    name: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the region-selector */
    render(): any;
}
