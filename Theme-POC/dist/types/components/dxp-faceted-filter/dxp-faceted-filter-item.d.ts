import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-faceted-filter-item */
export declare class FacetedFilterItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** Faceted filter element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** checkbox to expand the filter item description */
    isSubCategory: boolean;
    /** sets the description */
    itemDescription: string;
    /** sets the sub-title */
    itemSubtitle: string;
    /** sets the title */
    itemTitle: string;
    /** checkbox to expand the filter item description */
    showExpanded: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** expand and collapse */
    expandCollapse(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Attaching click listener to the block for expanding and collapsing action */
    expandAndCollapse(element: any, filterLabel: any): any;
    /** get parent element of any dom element */
    getParentOfClass(el: any, cls: any): any;
    /** handle mouse enter */
    onmouseenter(): void;
    /** handle mouse leave */
    onmouseleave(): void;
    /** toggle list */
    toggleList(target: any): void;
    /** render dxp-faceted-filter item(s) */
    render(): any;
}
