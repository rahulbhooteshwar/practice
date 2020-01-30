import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-faceted-filter */
export declare class FacetedFilter {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for search-filter */
    filterItemContainer: HTMLElement;
    /** search-filter element - utilized by DXP framework */
    element: HTMLElement;
    /** holds the child element count */
    childElementCount: number;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** sets the api-endpoint for filter properties */
    apiEndpoint: string;
    /** sets the close window for search filter */
    closeWindow: string;
    /** holds the content to be used to create individual filter */
    filterItems: any;
    /** holds the content data used to create filter */
    filterItemsJson: any;
    /** sets the content data used to create filter */
    filterJson: any;
    /** sets the type of filter to be created */
    filterType: any;
    /** sets the search-filter heading */
    heading: string;
    /** sets whether header is required */
    isHeaderRequired: boolean;
    /** sets whether filter has a subcategory */
    isSubCategory: string;
    /** actions to perform before component load */
    componentWillLoad(): Promise<void>;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad(): void;
    /** action to be perform on keyup event */
    expandCollapse(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** action to be perform on keyup event */
    createCategoryMarkup(items: any, isSubCategory: any): string;
    /** action to be perform on keyup event */
    createFilterItemsObject(): void;
    /** action to be perform on keyup event */
    createNestedFilter(filterItem: any, filterContentArr: any, filterType: any): HTMLElement;
    /** action to be perform on keyup event */
    createSubCategoryMarkup(subCatItem: any): string;
    /** private method checks for slot or items array and accordingly fetch the faceted-filter-item element by class name */
    getElementsByClass(cssClassName: string): HTMLElement[];
    /** action to be perform on keyup event */
    populateCheckboxFilter(filterContentArr: any): string;
    /** action to be perform on keyup event */
    populateSelectFilter(filterContentArr: any): HTMLElement;
    /** Render the faceted-filter */
    render(): any;
}
