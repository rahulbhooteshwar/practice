import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-tag-input */
export declare class TagInput {
    /** base component - common functionality */
    base: BaseComponent;
    /** tag-input element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** keysArray - key fields to display in dropdown */
    keysArray: any[];
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** responseData - service response data */
    responseData: any;
    /** searchValue - to hold the search value */
    searchValue: string;
    /** showSearchBoxList - to show/hide the search items list */
    showSearchBoxList: boolean;
    /** suggestData - dropdown suggester data */
    suggestData: any;
    /** tagsArray - tagsArray data to display as pills/tags */
    tagsArray: any[];
    /** tagsTempArray - tagsTempArray data to display as pills/tags */
    tagsTempArray: any[];
    /** the component's theme (if any) */
    theme: string;
    /** apiUrl - headers for API url  */
    apiHeaders: string;
    /** apiUrl - suggest data API url  */
    apiUrl: string;
    /** dataKey - key which contain API data  */
    dataKey: string;
    /** groupByField - to group the objects data */
    groupByField: string;
    /** keysToDisplay - keys to display into suggestion list */
    keysToDisplay: string;
    /** input placeholder - to display the place holder text when input is empty */
    placeholder: string;
    /** tagsData - to hold tagsData */
    tagsData: any;
    /** if search tag items changed */
    tagItemsChanged: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate(): void;
    /** for mouse click outside of  component */
    clickEvent(e: any): void;
    /** for accessibility implementation */
    handleKeyUp(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** on tags remove clear item from tags list */
    clearItem(id: any): void;
    /** method to calculate client height */
    clientHeight(): number;
    /** method to filter tags data based on user type string  */
    filterTagsData(query: any): any;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** method to return input element reference  */
    focusInput(): void;
    /** Get method to fetch the service data */
    getData(apiUrl: any, query: any): Promise<any>;
    /** method to return input element reference  */
    getInputElement(): Element;
    /** method to return search dropdown reference  */
    getSearchListElement(): Element;
    /** Group the data by groupByField */
    groupDataByField(): void;
    /** Grouping of search suggester data */
    groupSearchSuggestData(): void;
    /** method to fetch the search suggester data */
    handleChange(e: any): Promise<void>;
    /** method to check the suggester data */
    isSuggestData(): boolean;
    /** Handle on backspace key */
    OnBackspaceKey(target: any, searchBox: any, tags: any): void;
    /** Handle on delete key */
    onDeleteKey(target: any, tags: any): void;
    /** Handle on down arrow key */
    onDownArrowKey(e: any, searchBox: any, nextSibling: any, parentLi: any, nextEl: any): void;
    /** Handle on enter and space key */
    OnEnterAndSpaceKey(target: any, parentLi: any): void;
    /** Handle on left arrow key */
    onLeftArrowKey(target: any, searchBox: any, tags: any, prevEl: any): void;
    /** on suggestion item selection emit event */
    onListItemSelection(item: any): void;
    /** Handle on right arrow key */
    onRightArrowKey(tags: any, nextEl: any): void;
    /** handler method for input change */
    onTextInput(event: any): void;
    /** Handle on up arrow key */
    onUpArrowKey(e: any, prevSibling: any, parentLi: any, prevEl: any): void;
    /** Render suggestion data */
    renderSuggestionData(key: any): any;
    /** on li selection populate on searchbox */
    selectSuggestion(item: any): void;
    /** Render the tag-input */
    render(): any;
}
