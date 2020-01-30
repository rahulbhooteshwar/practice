import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-overlay */
export declare class Overlay {
    /** base component - common functionality */
    base: BaseComponent;
    /** overlay element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** to show demo for modal */
    demo: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** to switch the state of overlay */
    toggleState(state: boolean): Promise<void>;
    /** Render the overlay */
    render(): any;
}
