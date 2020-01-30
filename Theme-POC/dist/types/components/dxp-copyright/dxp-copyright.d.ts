import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-copyright */
export declare class Copyright {
    /** base component - common functionality */
    base: BaseComponent;
    /** copyright element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Prop for the copyright text */
    text: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the copyright */
    render(): any;
}
