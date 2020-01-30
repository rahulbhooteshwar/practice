import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-step-tracker */
export declare class StepTracker {
    /** base component - common functionality */
    base: BaseComponent;
    /** step-tracker element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Steps - to be utilized by DXP framework */
    steps: any;
    /** alignment of step tracker based on value. true and false will render vertical and horizontal step tracker respectively */
    verticalAlign: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** find the last step */
    findLastStep(): void;
    /** Render the step-tracker */
    render(): any;
}
