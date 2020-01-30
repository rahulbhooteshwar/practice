import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-toggle-switch */
export declare class ToggleSwitch {
    /** base component - common functionality */
    base: BaseComponent;
    /** toggle-switch element - utilized by DXP framework */
    element: HTMLElement;
    /** the class applied to define position of toggle component */
    componentClass: string;
    /** page dir attribute */
    dir: string;
    /** the class applied to define position of toggle label */
    labelClass: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** toggle on/off status */
    checked: boolean;
    /** description text for toggle */
    description: string;
    /** toggle active/inactive status */
    disabled: boolean;
    /** label for toggle */
    label: string;
    /** label orientation for toggle */
    labelPosition: 'left' | 'right';
    /** value for toggle */
    value: string;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** click event. Emitted when clicked */
    clickHandler: EventEmitter;
    /** click event. Emitted when clicked */
    toggleDataEmitter: EventEmitter<{}>;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Method to handle click event for button */
    onClick(event: any): void;
    /** emit analytic data */
    emitAnalyticsData(): void;
    /** emit toggle data */
    emitData(): void;
    /** Render the toggle-switch */
    render(): any;
}
