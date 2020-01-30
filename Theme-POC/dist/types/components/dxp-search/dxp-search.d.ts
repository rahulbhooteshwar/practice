import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-search */
export declare class Search {
    /** base component - common functionality */
    base: BaseComponent;
    /** Html element to hold search box input */
    inputBoxSearch: any;
    /** onEnterFocus - focus flag for accessibility */
    onEnterFocus: boolean;
    /** search element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** responseData - service response data */
    responseData: any;
    /** searchDataCombined - duplicates removed combined data  */
    searchDataCombined: any;
    /** searchValue - to hold the search value */
    searchValue: string;
    /** showSearchBox - to show/hide the searchbox */
    showSearchBox: boolean;
    /** showSearchBoxList - to show/hide the search items list */
    showSearchBoxList: boolean;
    /** suggestEndPoint - suggest end point url */
    suggestEndPoint: string;
    /** suggesterConfig - suggester config object */
    suggesterConfig: any;
    /** suggesterData - dropdown suggester data */
    suggesterData: any;
    /** the component's theme (if any) */
    theme: string;
    /** cfq - suggester config object Context Filter Query */
    cfq: string;
    /** cfqLocale - to add to cfq on locale change */
    cfqLocale: string;
    /** placeholder for search input */
    placeholder: string;
    /** resultPageExtension - search result page extension without .(dot) */
    resultPageExtension: string;
    /** resultPageUrl - search result page url  */
    resultPageUrl: string;
    /** searchBoxSize - defines the height of search box */
    searchBoxSize: 'sm' | 'md' | 'lg';
    /** searchParamKey - search url parameter key  */
    searchParamKey: string;
    /** searchType - search render type, can be advance or simple  */
    searchType: 'simple' | 'advance' | 'homepage';
    /** showSuggestions - search url parameter key  */
    showSuggestions: boolean;
    /** suggestApiUrl - API for suggest collection  */
    suggestApiUrl: string;
    /** suggestCollection - suggest collection name  */
    suggestCollection: string;
    /** suggestCount - suggester config object count  */
    suggestCount: number;
    /** suggestDictionary - suggester config object dictionary  */
    suggestDictionary: string;
    /** if search term changed */
    searchTermChanged: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate(): void;
    /** for mouse click outside of  component */
    clickEvent(e: any): Promise<void>;
    /** for accessibility implementation */
    handleKeyUp(e: any): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Method to clear the searchbox value */
    clearSearchBox(): Promise<void>;
    /** Method to hide searchbox */
    closeSearchBox(): Promise<void>;
    /** Method to show searchbox */
    searchBoxToggle(): Promise<void>;
    /** Clear input box field value */
    clearInputFieldValue(): void;
    /** disable auto-writer */
    disableAutowriter(): void;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** Get method to fetch the service data */
    getData(config: any, endPointUrl: any, query: any): Promise<any>;
    /** method to return input element reference  */
    getInputElement(): Element;
    /** method to return search dropdown reference  */
    getSearchListElement(): Element;
    /** method to fetch the search suggester data */
    handleChange(e: any): Promise<void>;
    /** on li item selection emit event */
    onListItemSelection(text: any): void;
    /** handler method for input change */
    onTextInput(event: any): void;
    /** on view item selection emit event */
    onViewAllSelection(): void;
    /** handler method for page redirection */
    redirectPage(searchText: any): void;
    /** to remove duplicates from data */
    removeDuplicates(arr: any): unknown[];
    /** Render the advance search */
    renderAdvanceSearch(): any;
    /** Render the home page search */
    renderHomePageSearch(): any;
    /** Render the simple search */
    renderSimpleSearch(): any;
    /** SEO script of Schema  */
    schemaScript(): void;
    /** method to fetch the search data */
    searchData(e: any, key: any): void;
    /** on li selection populate on searchbox */
    selectSuggestion(e: any, key: any): void;
    /** Render dxp-search */
    render(): any;
}
