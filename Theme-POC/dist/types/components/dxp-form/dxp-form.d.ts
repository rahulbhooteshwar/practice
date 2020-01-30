import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-form */
export declare class Form {
    /** base component - common functionality */
    base: BaseComponent;
    /** formEvents - to hold form events */
    formEvents: any;
    /** formSchema - to render form fields based on the json data */
    formSchema: any;
    /** form element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** isSubmitApi - to hold submit API call check */
    isSubmitApi: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** holds api end point path */
    apiUrl: string;
    /** button position */
    buttonPosition: 'left' | 'right' | 'center';
    /** btn-with-text */
    buttonText: string;
    /** type of button */
    buttonType: 'primary' | 'secondary' | 'branded';
    /** formId - to get the form JSON using formID */
    formId: string;
    /** formJson - to pass json and render form based on the json data */
    formJson: any;
    /** if form submit called */
    formSubmitted: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** form field validations */
    fieldValidations(element: any): void;
    /** if valid form then submit form */
    formSubmit(submitData: any): void;
    /** if form invalid then validate form and show error messaages */
    formValidations(form: any): void;
    /** check for form field validation */
    formValidityCheck(form: any): void;
    /** private method to get the data from service */
    getData(url: any): Promise<any>;
    /** return error message div */
    getErrorMessage(field: any): any;
    /** method to call form service */
    getService(url: any): Promise<void>;
    /**
     * this method called on any change in input field
     * it validates the field information
     * @param {*} event
     */
    handleChange(event: any): void;
    /** to prevent default submission of form */
    preventSubmit(e: any): boolean | undefined;
    /** to render checkbox field */
    renderChechbox(field: any): any;
    /** render form fields */
    renderFormFields(field: any): any;
    /** to render input field */
    renderInput(field: any): any;
    /** to render radio field */
    renderRadio(field: any): any;
    /** to render select field */
    renderSelect(field: any): any;
    /** to render textarea field */
    renderTextarea(field: any): any;
    /** click listener for submit button */
    submitHandler(): void;
    /** Render the form */
    render(): any;
}
