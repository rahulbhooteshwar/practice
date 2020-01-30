import { EventEmitter } from '../../stencil.core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-radio-button */
export declare class RadioButton {
    /** base component - common functionality */
    base: BaseComponent;
    /** radio-button element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    parentAlignment: string;
    /** the component's theme (if any) */
    theme: string;
    /** radiobutton alignment  */
    alignment: string;
    /** radiobutton checked  */
    checked: boolean;
    /** radiobutton checked  */
    isDisabled: boolean;
    /** radiobutton group name */
    name: string;
    /** radio-button key */
    radioKey: string;
    /** radiobutton value */
    radioValue: string;
    /** radiobutton even emitted */
    radioSelected: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** lifecycle hook */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** emits event on state change of radio button */
    handleChange(event: any): void;
    /** Render the radio-button */
    render(): any;
}
