import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-step */
export declare class Step {
    /** base component - common functionality */
    base: BaseComponent;
    /** step element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** custom icon for the step */
    iconPath: string;
    /** label of the step */
    name: string;
    /** stores the status of step */
    status: 'unvisited' | 'active' | 'completed' | 'incomplete' | 'custom';
    /** optional attribute which describes about the step */
    stepInfo: string;
    /** emit custom event when step is clicked */
    stepSelected: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** emits selected steps data */
    emitData(name: any, status: any, stepData: any): void;
    /** Render the step */
    render(): any;
}
