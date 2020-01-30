import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/**
 * dxp-checkbox
 */
export declare class Checkbox {
    /** base component - common functionality */
    base: BaseComponent;
    /** this element ref for the original checkbox in dxp-checkbox */
    checkboxElement: HTMLElement;
    /** check validity of the checkbox */
    isValid: boolean;
    /** Element */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** set alignment */
    alignment: 'horizontal' | 'vertical';
    /** checkbox id */
    checkboxId: string;
    /** checkbox checked  */
    checked: boolean;
    /** checkbox disabled  */
    disabled: boolean;
    /** actions to be performed prior to component loading */
    name: any;
    /** require property */
    required: boolean;
    /** validation message */
    validationMessage: string;
    /** add the value in checkbox value attribute */
    value: any;
    /** Emit the value of checked */
    checkboxData: EventEmitter;
    /** used for emitting an event to acknowledge alignment to the group  */
    validationEvent: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** lifecycle hook */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Emit the checkbox value on selection the checkbox */
    emitData(target: any): Promise<void>;
    /** this reSet method is for the parent hosting element to reset the dxp-checkbox to unchecked status */
    reset(): Promise<void>;
    /** setChecked method is for other element to check or uncheck this dxp-checkbox */
    setChecked(isChecked: boolean): Promise<void>;
    /** Responsible for emitting an event to show error message appropriately (horizontal, vertical) */
    sendFlagToParent(): void;
    /** Render the checkbox */
    render(): any;
}
