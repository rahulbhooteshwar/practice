import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-search-result */
export declare class SearchBox {
    /** base component - common functionality */
    base: BaseComponent;
    /** count - to hold count */
    count: number;
    /** Html element to hold search box input */
    inputBoxSearch: any;
    /** search-result element - utilized by DXP framework */
    element: HTMLElement;
    /** contentSuggesterData - response data */
    contentSuggesterData: any;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** responseData - service response data */
    responseData: any;
    /** searchDataCombined - duplicates removed combined data  */
    searchDataCombined: any;
    /** searchFilteredData - filtered data */
    searchFilteredData: any;
    /** searchValue - to hold the search value */
    searchValue: string;
    /** showSearchDropdown - boolean value */
    showSearchDropdown: boolean;
    /** suggestEndPoint - suggest end point url */
    suggestEndPoint: string;
    /** suggesterConfig - suggester config object */
    suggesterConfig: any;
    /** cfq - suggester config object Context Filter Query */
    cfq: string;
    /** cfqLocale - to add to cfq on locale change */
    cfqLocale: string;
    /** errorText - contains error message to display at bottom  */
    errorText: any;
    /** noResultFlag - to hold value, in no search results  */
    noResultFlag: string;
    /** placeholder text for search box */
    placeholder: string;
    /** holds total result */
    resultCount: any;
    /** searchedTerm - to hold the search value */
    searchedTerm: string;
    /** searchValue - to hold the search value */
    searchedText: string;
    /** suggestApiUrl - API for suggest collection  */
    suggestApiUrl: string;
    /** suggestCollection - suggest collection name  */
    suggestCollection: string;
    /** suggestCount - suggester config object count  */
    suggestCount: number;
    /** suggestDictionary - suggester config object dictionary  */
    suggestDictionary: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** actions to be performed after component loading */
    componentWillUpdate(): void;
    /** for mouse click outside of component */
    clickEvent(e: any): void;
    /** accessibility implementation for key events */
    handleKeyUp(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Method to clear the searchbox value */
    clearSearchBox(): void;
    /** method to return input element reference  */
    getInputElement(): Element;
    /** Get method to fetch the service data */
    getSuggestData(config: any, endPointUrl: any, query: any): Promise<any>;
    /** method to fetch the service data */
    handleChange(val: any): Promise<void>;
    /** handler method for input change */
    onTextInput(event: any): void;
    /** to remove duplicates from data */
    removeDuplicates(arr: any): unknown[];
    /** called when search icon click */
    setSearchValue(searchResultComponent: any): void;
    /** Render the search-result */
    render(): any[];
}
