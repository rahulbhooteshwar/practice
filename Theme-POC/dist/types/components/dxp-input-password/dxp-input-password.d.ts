import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-input-password */
export declare class InputPassword {
    /** base component - common functionality */
    base: BaseComponent;
    /** input-password element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /**
     * State of Field (valid or not)
     *
     * @memberof Input-password
     */
    isValid: boolean;
    /**
     * State of Field (validate or not)
     *
     * @memberof Input-password
     */
    isValidate: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /**
     * define the Accessibility Text
     * @requires
     * @type {*}
     * @memberof Input-password
     */
    accessibilityText: any;
    /**
     * This attribute specifies that the input field should automatically get focus when the page loads
     * @requires
     * @ignore
     * @memberof Input-password
     */
    autoFocus: boolean;
    /**
     * To set unique identifier to the selector
     * @requires
     * @type {*}
     * @memberof Input-password
     */
    contentId: any;
    /**
     * It specifies that the input field is disabled
     * @requires
     * @ignore
     * @memberof Input-password
     */
    disabled: boolean;
    /**
     * To define the accessibility text when foucs is on error icon
     * @requires
     * @ignore
     * @memberof Input-password
     */
    errorIconAccessibilityText: string;
    /**
     * To show the tooltip text on error icon click
     * @requires
     * @ignore
     * @memberof Input-password
     */
    errorIconText: string;
    /**
     * To Specifie the color if password strength is good
     * @requires
     * @ignore
     * @memberof Input-password
     */
    goodPasswordColor: string;
    /**
     * To define the accessibility text when foucs is on help icon
     * @requires
     * @ignore
     * @memberof Input-password
     */
    helpIconAccessibilityText: string;
    /**
     * To show the tooltip text on help icon click
     * @requires
     * @ignore
     * @memberof Input-password
     */
    helpIconText: string;
    /**
     * This attribute specifies that an input field need the icon or not
     * @requires
     * @ignore
     * @memberof Input-password
     */
    iconType: 'error' | 'help' | 'success' | 'none';
    /**
     * To store icon type value for further use
     * @requires
     * @ignore
     * @memberof Input-password
     */
    iconTypeInfo: string;
    /**
     * To define the support text for password criterias to make more understandable
     * @requires
     * @ignore
     * @memberof Input-input
     */
    instructionText: string;
    /**
     * This attribute specifies that an input field is optional
     * @requires
     * @ignore
     * @memberof Input-input
     */
    isOptional: boolean;
    /**
     * This attribute specifies that an input field must be filled out before submitting the form
     * @requires
     * @ignore
     * @memberof Input-input
     */
    isRequired: boolean;
    /**
     * To set label of the dxp-input
     * @requires
     * @ignore
     * @memberof Input-password
     */
    label: any;
    /**
     * To Specifie the color if password strength is medium
     * @requires
     * @ignore
     * @memberof Input-password
     */
    mediumPasswordColor: string;
    /**
     * To allow the regular expression of medium password
     * @requires
     * @ignore
     * @memberof Input-password
     */
    mediumPasswordPattern: any;
    /**
     * To allow minimum character in the dxp-input-password, default value is 0
     * @requires
     * @ignore
     * @memberof Input-password
     */
    minLength: number;
    /**
     * To allow regular expression for the password criteria
     * @requires
     * @type {*}
     * @memberof Input-password
     */
    passwordCriteria: any;
    /**
     * It specifies that strength of the password
     * @requires
     * @ignore
     * @memberof Input-password
     */
    passwordStrength: string;
    /**
     * This attribute specifies a hint that describes the expected value of an input field (a sample value or a short description of the format).
     * @required
     * @type {*}
     * @memberof Input-password
     */
    placeholder: any;
    /**
     * It specifies that whether need to show progress bar or not
     * @requires
     * @ignore
     * @memberof Input-password
     */
    progressBar: boolean;
    /**
     * It specifies that whether need to show progress bar or not
     * @requires
     * @ignore
     * @memberof Input-password
     */
    showCriteria: boolean;
    /**
     * It specifies the  tooltip visibility(show or hide)
     *
     * @memberof Input-password
     */
    showTooltip: boolean;
    /**
     * color code for password strength
     * @requires
     * @ignore
     * @memberof Input-password
     */
    statusColor: string;
    /**
     * To allow the regular expression of strong password
     * @requires
     * @ignore
     * @memberof Input-password
     */
    strongPasswordPattern: any;
    /**
     * To define the accessibility text when foucs is on success icon
     * @requires
     * @ignore
     * @memberof Input-password
     */
    successIconAccessibilityText: string;
    /**
     * To define the validation message if dxp-input is set to required
     * @requires
     * @type {*}
     * @memberof Input-password
     */
    unmaskValue: boolean;
    /**
     * To unmask password value in dxp-input
     * @requires
     * @ignore
     * @memberof Input-password
     */
    validationMessage: string;
    /**
     * valid count of the password criteria
     * @requires
     * ignore
     * @memberof Input-password
     */
    validCount: number;
    /**
     * Value of the password
     * @requires
     * @ignore
     * @memberof Input-password
     */
    value: string;
    /**
     * To Specifie the color if password strength is weak
     * @requires
     * @ignore
     * @memberof Input-password
     */
    weakPasswordColor: string;
    /**
     * Event listener for any changes in input field
     *
     * @type {EventEmitter}
     * @memberof Input-password
     */
    passwordValue: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** To update the progress bar width after component update */
    componentDidUpdate(): void;
    /**
     * click listener for routing events on anchor tag
     */
    /** for mouse click outside of  component */
    clickEvent(e: any): Promise<void>;
    /** Method to handle blur of password */
    handleBlur(): void;
    /** Method to handle focus on password */
    handleFocus(): void;
    /** Method to handle keydown of input password */
    handleKeyDown(ev: any): void;
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     * @memberof Input-password
     */
    handleChange(event: any): Promise<void>;
    /**
     * Check password criteria
     * @param input
     */
    checkPasswordCriteria(input: any): void;
    /** to choose color as per strength */
    colorChoose(): void;
    /**
     * handles the error icon click event
     * @param {*}
     * @memberof Input-password
     */
    errorIconClick(): void;
    /**
     * returns the current element
     * @memberof Input-password
     */
    getCurrentElement(): HTMLElement;
    /**
     *  handles the help icon click event
     * @param {*}
     * @memberof Input-password
     */
    helpIconClick(): void;
    /**
     * The aim of this function is to provide the validation message if required property is/isn't provided without standard types like text
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    isRequiredProvided(input: any): boolean;
    /**
     * To validate the input password
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    isValidPassword(input: any): void;
    /**
     * To validate the input is in provided pattern or not
     *
     * @param {*} input
     * @returns
     * @memberof Input-password
     */
    isValidPattern(input: any): void;
    /** Render progress bar */
    renderProgressbar(): any[];
    /** Render Validation Error */
    renderValidationError(): any[];
    /** Render the input-password */
    render(): any;
}
