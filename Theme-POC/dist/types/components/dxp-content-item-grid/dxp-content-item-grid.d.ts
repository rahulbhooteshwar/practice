import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-content-item-grid */
export declare class ContentItemGrid {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for CTA */
    ctaContainer: HTMLElement;
    /** nested element container for social links */
    contentItemsContainer: HTMLElement;
    /** device column */
    gridCols: string;
    /** variable to hold content items */
    contentItems: NodeListOf<Element>;
    /** variable to hold all content item objects */
    contentItemsData: any[];
    /** content-item-grid element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** check all content are logo */
    isLogos: boolean;
    /** Index of first visible content item */
    contentItemStartIndex: number;
    /** Index of last visible content item */
    contentItemEndIndex: number;
    /** Visible content items */
    visibleContentItems: any;
    /** api url for content items data */
    apiEndpoint: string;
    /** number of columns in the grid */
    column: number;
    /** description to be shown in the header of Grid */
    gridDescription: string;
    /** eyebrow text to be shown in the header of Grid */
    gridEyebrowText: string;
    /** Title to be shown in the header of Grid */
    gridTitle: string;
    /** Link to destination for title */
    gridTitleUrl: string;
    /** class to be applied for header alignment */
    headerAlignment: 'left' | 'right' | 'center';
    /** Link to destination for title */
    titleTarget: boolean;
    /** highlight the first column */
    highlightFirstContentItem: boolean;
    /** boolean to enable pagination on grid */
    enablePagination: boolean;
    /** boolean to hide pagination when only single page is present in pagination */
    hidePaginationWhenSingle: boolean;
    /** number of content items visible in one page of pagination */
    itemsPerPage: number;
    /** align pagination */
    paginationAlignment: 'left' | 'right' | 'center';
    /** pagination display caption text */
    paginationDisplayText: string;
    /** first button label */
    firstButtonLabel: string;
    /** last button label */
    lastButtonLabel: string;
    /** previous button label */
    previousButtonLabel: string;
    /** next button label */
    nextButtonLabel: string;
    /** of text */
    ofText: string;
    /** page text */
    pageText: string;
    /** and text */
    andText: string;
    /** Pagination input validation message */
    paginationValidationMessage: string;
    /** Accessibility text for pagination input */
    pageInputAccessibilityText: string;
    /** content data for child components */
    contentData: any;
    /** Watcher that looks for contentData object to be assigned/changed externally */
    contentDataChangeHandler(): void;
    /** cta data for child components */
    cta: any;
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler(): void;
    /** method for jumping to next page */
    nextpage(event: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * Append nested markup for child elements
     * @param nestedTarget Target container where nested elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    appendNestedMarkup(nestedTarget: HTMLElement, nestedSelector: string, data: JSON[]): HTMLElement[];
    /** Generate class for desktop, tablet and mobile to show max no of column */
    colDistribution(column: any): void;
    /** reset the content item grid to first page */
    resetContentItemGrid(): void;
    /** set the content item grid based on page change */
    setContentItemGrid(): void;
    /** Method to index get sliced array from contentItems */
    setIndexToSliceArray(firstUnitIndex: any, lastUnitIndex: any): void;
    /** actions to be performed after render method is called */
    hostData(): {
        'class': string;
    };
    /** Render the content-item-grid */
    render(): any;
}
