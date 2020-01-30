import { EventEmitter } from '../../stencil.core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-radio-button */
export declare class RadioGroup {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for radio buttons */
    radioContainer: HTMLElement;
    /** static radio button name */
    static radioName: string;
    /** static radio button alignment */
    static useParentAlign: string;
    /** radio-button element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** radio button select */
    radioSelect: any;
    /** condition based on which error is shown */
    showError: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** radio button alignment */
    alignment: 'vertical' | 'horizontal';
    /** radio button content id */
    contentId: string;
    /** Defines if the field is disabled */
    isDisabled: boolean;
    /** radio button group label */
    label: string;
    /** radio button name */
    name: string;
    /** Defines if the field is required */
    required: boolean;
    /** Error message will appear if none of radio is selected */
    validationMessage: string;
    /** object to hold multiple content list items blocks that can be passed as json array */
    radioBtn: any;
    /** Listener that looks for radio buttons object to be assigned/changed externally */
    radioButtonChangeHandler(): void;
    /** emit custom event when radio button is clicked */
    radionBtnLoad: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** Listener for radio selection */
    radioSelectedHandler(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** getCheckedStatus method adds the show-error class to radio buttons if radio button is not selected */
    getCheckedStatus(): Promise<void>;
    /** Render the radio-button-group */
    render(): any;
}
