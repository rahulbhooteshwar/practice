import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-search-result */
export declare class SearchResult {
    /** base component - common functionality */
    base: BaseComponent;
    /** count - to hold count */
    count: number;
    /** highlightLines - text of title/description to highlight */
    highlightLines: any[];
    /** to hold page start number */
    pageStart: number;
    /** to hold element for accessibility element focus */
    tempElement: any;
    /** to hold temporary search results data */
    tempResultsData: any[];
    /** search-result element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** page dtmUrl attribute */
    dtmUrl: string;
    /** descHighlighter - title/description to highlight */
    highlighter: any[];
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** noResult - to hold the boolean value when no search result found  */
    noResult: string;
    /** promotionsKeywordsArray - to display promotions links based on promotions keywords */
    promotionsKeywordsArray: any;
    /** responseData - service response data */
    responseData: any;
    /** resultCount - service result counts */
    resultCount: number;
    /** searchConfig - search config object */
    searchConfig: any;
    /** searchEndPoint - search end point url */
    searchEndPoint: string;
    /** searchResults - service search results data */
    searchResults: any;
    /** searchValue - to hold the search value */
    searchValue: string;
    /** the component's theme (if any) */
    theme: string;
    /** cfq - suggester config object Context Filter Query */
    cfq: string;
    /** cfqLocale - to add to cfq on locale change */
    cfqLocale: string;
    /** descriptionLength - search result description character length  */
    descriptionLength: number;
    /** Error Message */
    errorMessage: any;
    /** highlightFields - search config object highlighting field  */
    highlightFields: string;
    /** placeholder text for search box */
    placeholder: string;
    /** promotionsData - to display promotions links */
    promotionsData: any;
    /** promotionsKeywords - to display promotions links based on promotions keywords */
    promotionsKeywords: string;
    /** rows - search config object rows  */
    rows: number;
    /** searchApiUrl - API for search */
    searchApiUrl: string;
    /** searchCollection - search collection name  */
    searchCollection: string;
    /** searchFl - search config object fl  */
    searchFl: string;
    /** searchParamKey - search url parameter key  */
    searchParamKey: string;
    /** showPromotions - to show promotions links before search results  */
    showPromotions: boolean;
    /** sortingField - search config object sorting field  */
    sortingField: string;
    /** start - search config object start page  */
    start: number;
    /** suggestApiUrl - API for suggest collection  */
    suggestApiUrl: string;
    /** suggestCollection - suggest collection name  */
    suggestCollection: string;
    /** suggestCount - suggester config object count  */
    suggestCount: string;
    /** suggestDictionary - suggester config object dictionary  */
    suggestDictionary: string;
    /** tags - to filter search results data based on specific tags */
    tags: string;
    /** titleLength - search result title character length  */
    titleLength: number;
    /** text to be shown on view more button */
    viewMoreText: string;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): Promise<void>;
    /** accessibility implementation for key events */
    handleKeyUp(e: any): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** on search term changed */
    searchTermChangedHandler(e: CustomEvent): Promise<void>;
    /** Method to emit the analytics data after performing search */
    analyticSearchResult(): Promise<void>;
    /** Public method used in dxp-search-result-item as well */
    setValue(item: any): Promise<void>;
    /** Method used to change in search result if search text changes */
    changeSearchResults(isIntialCall: any): Promise<void>;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** method to return input element reference  */
    getInputElement(): Element;
    /** Method to get the locale of the page */
    getPageLang(locale: any): any;
    /** Get method to fetch the service data */
    getSearchData(config: any, endPointUrl: any, query: any): any;
    /** method to highlight the text in search result */
    highlightSearchKeyword(collection: any, highlight: any): any;
    /** render search results */
    renderSearchResults(searchResults: any): any;
    /** used to scroll to top on pagination click */
    scrollToTop(): void;
    /** check visibility of the next button */
    viewMore(): void;
    /** Render the search-result */
    render(): any;
}
