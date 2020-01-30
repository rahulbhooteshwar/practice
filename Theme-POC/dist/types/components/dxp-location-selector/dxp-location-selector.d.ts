import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-location-selector */
export declare class LocationSelector {
    /** base component - common functionality */
    base: BaseComponent;
    /** Html element to hold search box input */
    inputBoxSearch: any;
    /** location-selector element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** filterItemsJson - to get the response from api */
    filterItemsJson: any[];
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** responseFlag - to show/hide current location */
    responseFlag: boolean;
    /** searchValue - to hold the search value */
    searchValue: string;
    /** showSearchBoxArrows - to show/hide the search Arrow */
    showDownArrow: boolean;
    /** showSearchBoxList - to show/hide the search items list */
    showSearchBoxList: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** api-key for url to search offer */
    apiKey: any;
    /** placeholder text for search box */
    placeholder: string;
    /** search location data for script support */
    searchLocationData: any;
    /** searchType for search offer by cities,region ex */
    searchType: any;
    /** if search location changed */
    searchLocationChanged: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** for mouse click outside of component */
    clickEvent(e: any): void;
    /** Method to clear the searchbox value */
    clearSearchBox(): Promise<void>;
    /** Clear input box field value */
    clearInputFieldValue(): void;
    /** find result */
    findResult(results: any, name: any): any;
    /** get current location */
    getCurrentLocation(): void;
    /** Get method to fetch the service data */
    getData(endPointUrl: any): any;
    /** method to return input element reference  */
    getInputElement(): Element;
    /** api call for fetch current cities */
    getLocationCity(latitude: any, longitude: any): Promise<{}>;
    /** on li item selection emit event */
    onListItemSelection(text: any): void;
    /** handler method for input change */
    onTextInput(event: any): void;
    /** renderLocationValues */
    renderLocationValues(): any;
    /** on li selection populate on searchbox */
    selectSuggestion(e: any, key: any): void;
    /** toggle when click on input search */
    toggleCurrentLocation(): void;
    /** Render the location-selector */
    render(): any;
}
