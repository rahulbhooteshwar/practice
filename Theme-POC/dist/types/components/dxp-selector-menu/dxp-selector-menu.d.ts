import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
import { MenuType } from './dxp-selector-menu-constants';
/** dxp-selector-menu */
export declare class SelectorMenu {
    /** base component - common functionality */
    base: BaseComponent;
    /** NodeList use to query icons def and change it */
    iconsNodeList: NodeListOf<Element>;
    /** type of card icon */
    iconSprite: string;
    /** Array of icons URLS */
    iconsUrls: string[];
    /** Enum used for different type of menu */
    menuType: MenuType;
    /** DefaultSelector option selected  */
    optionSelected: boolean;
    /** selector-menu element - utilized by DXP framework */
    element: HTMLElement;
    /** holds list item on keypress */
    activeListEl: HTMLElement;
    /** additional params to be passed in the apiUrl to fetch the data when enableLazyLoading is set to true */
    additionalParams: string;
    /** page dir attribute */
    dir: string;
    /** a boolean used when enableLazyLoading is set to true to detect if there are more items available  */
    hasMoreItems: boolean;
    /** input element appears for searchable selector type */
    inputSearchBox: HTMLInputElement;
    /** show/hide spinner */
    isLoading: boolean;
    /** checks if component is valid or not */
    isValid: boolean;
    /** element index of each element in the listbox */
    listIndex: number;
    /** element of all items in dropdown */
    listItemElements: HTMLElement[];
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** preserves the state of the current offset/page that is fetched when enableLazyLoading is set to true */
    offset: number;
    /** maximum number of pages available to be loaded when enableLazyLoading is set to true */
    pageCount: number;
    /** responseData - service response data */
    responseData: any;
    /** holds the value entered in the searchbox */
    searchTerm: string;
    /** component's theme (if any) */
    theme: string;
    /** toggle variable to hide/show dropdown */
    toggle: boolean;
    /** accessibility text for the searchbox */
    accessibilityText: any;
    /** shows additional value for option with details selector type */
    additionalValue: string;
    /** apiUrl - headers for API url  */
    apiHeaders: string;
    /** apiUrl - suggest data API url  */
    apiUrl: string;
    /** set autofocus for searchable type component */
    autofocus: boolean;
    /** set dataSourceKeyName for configurable key name while pass data */
    dataSourceKeyName: string;
    /** state of button */
    disabled: boolean;
    /** enable/disable lazy loading for the content loaded in the dropdown. */
    enableLazyLoading: boolean;
    /** make selector menu optional */
    isOptional: boolean;
    /** Array provide for the user  */
    items: any[];
    /** label for selector menu */
    label: string;
    /** maximum record limit per page to enable lazy loading */
    limit: any;
    /** number of records key name for each api call when enableLazyLoading is true */
    limitKeyName: string;
    /** maximum characters allowed in the searchbox */
    maxSearchCharLength: any;
    /** minimum search character length */
    minSearchCharLength: any;
    /** page number / offset key name when enableLazyLoading is true */
    offsetKeyName: string;
    /** placeholder of selector menu */
    placeholder: string;
    /** set id attribute for selector component */
    selectorId: string;
    /** total number of pages key name when enableLazyLoading is true */
    totalPagesKeyName: string;
    /** method implemented in parent to to transform the data fetched from the APi */
    transformData: (data: any[]) => {};
    /** selector menu type */
    type: string;
    /** validation message */
    validationMessage: string;
    /** set the value of selector menu */
    value: string;
    /** width of the menu box */
    width: number;
    /** Emit after the api call is completed */
    apiCallCompleted: EventEmitter;
    /** emits when the search box is cleared */
    clearValue: EventEmitter;
    /** Emit current value in the searchbox  */
    searchEmitter: EventEmitter;
    /** Emit selected item */
    selectedItemChanged: EventEmitter;
    /** Emit toggle change  */
    toggleEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** hook that is triggered after the component is loaded */
    componentDidLoad(): void;
    /** triggered when the component is updated. */
    componentDidUpdate(): void;
    /** for mouse click outside of component */
    detectingClickOutside(e: any): void;
    /** listen to the access */
    handleKeyboardA11y(event: any): void;
    /** for accessibility implementation */
    handleKeyUp(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** hides the loader */
    hideSpinner(): Promise<void>;
    /** shows the loader overlay in the center of the dropdown. */
    showSpinner(): Promise<void>;
    /** this method will be used to update isValid flag to show/hide validation message */
    updateValidationState(isValid: boolean): Promise<void>;
    /** sets the searchbox value to null */
    clearSearchBox(): void;
    /** clear selected option */
    clearSelectorMenu(event: any): void;
    /** Closes the dropdown */
    closeDropdown(): void;
    /** Get method to fetch the service data */
    getData(apiUrl: any, query: any, offset?: number, limit?: number): Promise<any>;
    /** method to fetch the search suggester data */
    handleChange(e: any): Promise<void>;
    /** handle success */
    handleSuccess(data: any): void;
    /** event callback to the scroll event in the listbox */
    onListboxScroll(e: any): Promise<void>;
    /** emits an event with the search keyword entered in the textbox */
    onSearch(event: any): void;
    /** Render default selector menu */
    renderDefaultSelector(): any;
    /** render list item */
    renderItem(item: any): any;
    /** render label */
    renderLabel(): any;
    /** Render Link Selector menu */
    renderLinkSelector(): any;
    /** render list item of list wrapper */
    renderListItem(item: any): any;
    /** Set icon on the cell for predefine StatusType */
    renderListItemIcon(iconStatus: any): HTMLElement | undefined;
    /** Render Detaile Selector menu */
    renderOptionWithDetailsSelector(): any;
    /** Render spinner */
    renderProgressbarSpinner(): any;
    /** Render Searchable Selector menu */
    renderSearchableSelector(): any;
    /** Define the selector menu type */
    renderSelectorType(): HTMLElement | undefined;
    /** Trigger action on the item selection. It will check if the selected item is of type array then first index is mapped to value & second index to additionalValue. */
    selectItem(item: any): void;
    /** set additionalParams */
    setAdditionalParams(offset: number, limit: number): string;
    /** set the array elements in the list box  */
    setArrayValues(items: any[]): any;
    /** Method used to convert string on the menutype enum  */
    setEnumFromString(typeString: string): MenuType;
    /** Action for toggle component */
    toggleComponent(openState?: boolean): void;
    /** Render the selector-menu */
    render(): any;
}
