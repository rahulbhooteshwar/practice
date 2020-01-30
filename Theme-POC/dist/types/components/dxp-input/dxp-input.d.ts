import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/**
 * DXP Input Component is a wrapper over input tag (`<input></input>`) available in standard HTML.
 * At present it handles the following type:
 * Standard Types:
 * 1. Text
 * 2. Email
 * 3. Password
 * 4. Number
 * 5. Search
 * 6. Tel
 *
 * Custom Type:
 * 1. Card
 * @export
 * @class Input
 */
export declare class Input {
    /**
     * Base component used to get the i18n values and more
     *
     * @type {BaseComponent}
     * @memberof Input
     */
    base: BaseComponent;
    /**
     * temporary store of card info
     */
    cardInfo: any[];
    /**
     * Defines listener attached to field or not
     *
     * @memberof Input
     */
    isListenerAttached: boolean;
    /**
     * Is password Field
     *
     * @memberof Input
     */
    isPassword: boolean;
    /**
     * Checks is field type is card
     */
    isTypeCard: boolean;
    /**
     * Current Html Element of dxp-input tag
     *
     * @type {HTMLElement}
     * @memberof Input
     */
    element: HTMLElement;
    /**
     * State of the Card Type
     *
     * @type {*}
     * @memberof Input
     */
    cardType: any;
    /**
     * State of Field (valid or not)
     *
     * @memberof Input
     */
    isValid: boolean;
    /**
     * State of Field (validate or not)
     *
     * @memberof Input
     */
    isValidate: boolean;
    /**
     * locale (i18n) - to force re-render on locale change
     *
     * @type {string}
     * @memberof Input
     */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /**
     * define the Accessibility Text
     *
     * @type {*}
     * @memberof Input
     */
    accessibilityText: any;
    /**
     * validate Aria Valid or not
     *
     * @type {boolean}
     * @memberof Input
     */
    ariaInvalid: boolean;
    /**
     * Define Aria required or not
     *
     * @type {boolean}
     * @memberof Input
     */
    ariaRequired: boolean;
    /**
     * This attribute specifies that the input field should automatically get focus when the page loads
     *
     * @memberof Input
     */
    autoFocus: boolean;
    /**
     * To set unique identifier to the selector
     * @requires
     * @type {*}
     * @memberof Input
     */
    contentId: any;
    /**
     * define the css classes used for this tag
     *
     * @type {*}
     * @memberof Input
     */
    cssClass: any;
    /**
     * It specifies that the input field is disabled
     *
     * @memberof Input
     */
    disabled: boolean;
    /**
     * This attribute specifies whether a form or input field should have auto complete on or off
     *
     * @memberof Input
     */
    enableAutocomplete: string;
    /**
     * The height attributes specify the height of an input type image element
     *
     * @type {*}
     * @memberof Input
     */
    height: any;
    /**
     * This attribute specifies that an input field must be optional before submitting the form
     * @ignore
     * @memberof Input
     */
    isOptional: boolean;
    /**
     * This attribute specifies that an input field must be filled out before submitting the form
     * @ignore
     * @memberof Input
     */
    isRequired: boolean;
    /**
     * To set label of the dxp-input
     * @requires
     * @type {*}
     * @memberof Input
     */
    label: any;
    /**
     * The min attribute specify the maximum value for an input element (number, range)
     *
     * @memberof Input
     */
    max: string;
    /**
     * To allow maximum character in the dxp-input, default value is 100
     *
     * @memberof Input
     */
    maxLength: number;
    /**
     * The min attribute specify the minimum value for an input element (number, range)
     *
     * @memberof Input
     */
    min: string;
    /**
     * To allow minimum character in the dxp-input, default value is 0
     *
     * @memberof Input
     */
    minLength: number;
    /**
     * Name of the field
     *
     * @type {*}
     * @memberof Input
     */
    name: any;
    /**
     * To allow regular expression that the input element's value is checked
     *
     * @type {*}
     * @memberof Input
     */
    pattern: any;
    /**
     * This attribute specifies a hint that describes the expected value of an input field (a sample value or a short description of the format).
     *
     * @type {*}
     * @memberof Input
     */
    placeholder: any;
    /**
     * It specifies that the input field is read only
     *
     * @memberof Input
     */
    readonly: boolean;
    /**
     * define spell check required or not
     *
     * @type {boolean}
     * @memberof Input
     */
    spellcheckRequired: boolean;
    /**
     * This attribute specifies the legal number intervals for an input element
     *
     * @memberof Input
     */
    step: string;
    /**
     * To set the type of dxp-input
     * @requires
     * @type {*}
     * @memberof Input
     */
    type: any;
    /**
     * To define the validation message if dxp-input is set to required
     *
     * @memberof Input
     */
    validationMessage: string;
    /**
     * To set default value of the dxp-input
     *
     * @type {*}
     * @memberof Input
     */
    value: any;
    /**
     * The width attributes specify the width of an input type image element
     *
     * @memberof Input
     */
    width: string;
    /**
     * Event listener for any changes in input field
     *
     * @type {EventEmitter}
     * @memberof Input
     */
    textValue: EventEmitter;
    /**
     * Component Life cycle Method
     * Method loads before render() method
     * @memberof Input
     */
    componentWillLoad(): void;
    /** Method to handle keydown of input type */
    handleBlur(ev: KeyboardEvent): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     * @memberof Input
     */
    handleChange(event: any): Promise<void>;
    /**
     * this method will be used to update isValid flag
     * to show/hide validation message
     * @param isValid
     */
    updateValidationState(isValid: boolean): Promise<void>;
    /**
     * The aim of this function is to provide the validation for card input type
     */
    handleCard(event: any): void;
    /**
     * The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isRequiredProvided(input: any): boolean;
    /**
     * To validate the Card detail is valid or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidCardInput(input: any): boolean;
    /**
     * To validate the input value is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidInput(input: any): boolean;
    /**
     * To validate the input is of a minimum length
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidMinLength(input: any): boolean;
    /**
     * To validate the input is in provided number range or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidNumber(input: any): boolean;
    /**
     * To validate the input password is in provided length or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidPassword(input: any): boolean;
    /**
     * To validate the input is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidPattern(input: any): boolean;
    /**
     * To validate the input URL is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input
     */
    isValidUrlPattern(input: any): boolean;
    /**
     * handles the password field layout
     *
     * @param {*} e
     * @memberof Input
     */
    togglePasswordIcon(e: any): void;
    /**
     *
     * Renders the component - component life cycle method
     * @returns
     * @memberof Input
     */
    render(): any;
}
