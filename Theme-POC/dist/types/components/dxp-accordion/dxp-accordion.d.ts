import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-accordion */
export declare class Accordion {
    /** nested element container for accordion */
    accItemContainer: HTMLElement;
    /** base component - common functionality */
    base: BaseComponent;
    /** accordion element - utilized by DXP framework */
    element: HTMLElement;
    /** holds the child element count */
    childElementCount: number;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** sets the accordion heading */
    heading: string;
    /** sets whether header is required */
    isHeaderRequired: boolean;
    /** sets the accordion items to be display */
    items: any;
    /** Listener that looks for accordion items object to be assigned/changed externally */
    accordionChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad(): void;
    /** action to be performed when state variable gets updates */
    componentDidUpdate(): void;
    /** action to be perform on keyup event */
    expandCollapse(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** collapse all on keyup */
    collapseAll(accLabel: any, currentAccLabel: any, accContent: any): void;
    /** This function is responsible for attaching click listener and adding/removing relevant class */
    expandAndCollapse(element: any, expandAll: any, collapseAll: any): void;
    /** private method checks for slot or items array and accordingly fetch the accordion-item element by class name */
    getElementsByClass(cssClassName: string): HTMLElement[];
    /** Render the accordion */
    render(): any;
}
