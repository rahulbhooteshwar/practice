import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-checkbox */
export declare class CheckboxGroup {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for checkbox */
    checkBoxContainer: HTMLElement;
    /** unique chechbox id */
    checkboxId: string;
    /** items */
    items: any[];
    /** checkbox element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** validation flag */
    flag: boolean;
    /** This store the value true if the checkbox is required filed */
    isValid: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** The component's theme (if any) */
    theme: string;
    /** layout of check-box. Author can set the alignment of check-boxes horizontally / vertically */
    alignment: 'horizontal' | 'vertical';
    /** This is heading of checkbox items */
    caption: string;
    /** More and less will be shown and hidden based on the number of incoming items */
    initialItemsCount: number;
    /** Defines if the field is required */
    required: boolean;
    /** Select-all checkbox button will be present if the author set it to true */
    selectAll: boolean;
    /** separator will be shown and hidden if the property is set to true and false respectively */
    separatorRequired: boolean;
    /** Error message will appear if none of checkbox is checked */
    validationMessage: string;
    /** checkbox items data */
    checkboxItemsData: any;
    /** Listener that looks for checkbox items object to be assigned/changed externally */
    checkboxesChangeHandler(): void;
    /** This emit the selected checkbox data to listen any event listener */
    onCheckboxSelect: EventEmitter;
    /** Actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Add the class on checkbox element if the dxp-checkbox-group if provide the alignment by author */
    componentDidLoad(): void;
    /** Actions to be performed on click on select-all checkbox button */
    handleClickEvent(e: any): void;
    /** responsible for validation message at appropriate place */
    handleValidationEvent(e: any): void;
    /**
     * Store in an array all checkbox elements checked status (in true/false value).
     * if the element is checked/selected the value will store true otherwise false
     * (checkboxItems) - All checkbox elements
     * (checkboxState) - Array for store the checkbox checked status
     */
    checkboxCheckedStatus(checkboxItems: any, checkboxState: any): void;
    /**
     * Data will be emitted of all selected/checked checkboxes, and can be listen through event.
     * Emitted data/values can be listen through 'checkboxItemsData' event.
     * checkboxState - array of all checkbox elements checked/unchecked status
     * checkboxItems - all checkbox elements
     */
    checkboxDataHandler(checkboxState: any, checkboxItems: any): void;
    /** for array of checkboxes */
    createCheckboxArray(checkboxItems: any): void;
    /**
     * When More or less will be visible and will be pressed this method will be used.
     * More changes into less and all the checkboxes will be shown.
     */
    handleMore(e: any): void;
    /** get initial items from checkboxItemsData array */
    renderInitialItems(): any;
    /** Render select all for checkbox */
    renderSelectAll(): any;
    /**
     * If "select-all" check-box is checked, all checkbox elements will become checked
     * selectAll - .select-all checkbox input
     * isChecked - checkbox checked state
     * checkboxItems - all checkbox elements
     */
    selectAllCheckboxes(selectAll: any, isChecked: any, checkboxItems: any): void;
    /**
     * If user select/checked all checkbox element, the 'select-all' checkbox will automatically get selected/checked
     * isSelectAll - .select-all checkbox
     * checkboxState - Array for store the checkbox checked status
     * selectAllCheckbox - select-all checkbox element
     */
    selectAllElementChecked(isSelectAll: any, checkboxState: any, selectAllElement: any): void;
    /** show error message */
    showErrorMessage(): any;
    /**
     * If  "select-all" checkbox become unchecked,  all checkbox elements will become unchecked
     * isSelectAll - .select-all checkbox input
     * isChecked - checkbox checked state
     * checkboxItems - all checkbox elements
     */
    uncheckAllCheckboxes(isSelectAll: any, isChecked: any, checkboxItems: any): void;
    /**
     * this execute the all function which are required in shadow DOM and without Shadow DOM
     */
    updateCheckboxState(currentElement: any, checkboxItems: any, selectAllCheckbox: any): void;
    /**
     * Render the checkbox
     */
    render(): any;
}
