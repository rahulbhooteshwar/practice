import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-textarea */
export declare class Textarea {
    /** base component - common functionality */
    base: BaseComponent;
    /** textarea element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** is backspace */
    isBackspace: boolean;
    /** State of Field (valid or not) */
    isValid: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** textarea cols - to change the width of the textarea */
    cols: number;
    /** To make textarea disabled */
    disabled: boolean;
    /** To make textarea optional */
    isOptional: boolean;
    /** textarea label - to display the label text */
    label: string;
    /** To allow maximum character in the dxp-textarea, default value is 100 */
    maxLength: number;
    /** To allow maximum character in the dxp-textarea, default value is 100  */
    minLength: number;
    /** To allow textarea resizing */
    nonResizable: boolean;
    /** textarea placeholder - to display the place holder text when textarea is empty */
    placeholder: string;
    /** textarea required - to make the field like label and value mandatory and display error message */
    required: boolean;
    /** textarea rows - to change the height of the textarea */
    rows: number;
    /** textarea validationMessage - to display the validation message text */
    validationMessage: string;
    /** textarea value - to display the value text */
    value: string;
    /** textarea rows - to change the height of the textarea */
    width: number;
    /** Event listener for any changes in textarea field */
    changeText: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Method to handle focus on textarea */
    handleFocus(): void;
    /** Method to handle keydown */
    handleKey(ev: KeyboardEvent): void;
    /** click listener for routing events on anchor tag */
    routingHandler(event: any): void;
    /** Method to handle change in value of textarea */
    handleChange(event: any): void;
    /** The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text */
    isRequiredProvided(input: any): boolean;
    /** To validate the input value is in provided pattern or not */
    isValidInput(input: any): boolean;
    /** To validate the input is of a maximum length */
    isValidMaxLength(input: any): boolean;
    /** To validate the input is of a minimum length */
    isValidMinLength(input: any): boolean;
    /** Render the textarea */
    render(): any;
}
