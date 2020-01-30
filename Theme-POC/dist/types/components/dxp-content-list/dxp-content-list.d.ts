import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-content-list */
export declare class ContentList {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for links */
    linksContainer: HTMLElement;
    /** Content List - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** content title accessibility data */
    ariaLabel: string;
    /** content header size */
    headerSize: string;
    /** content href */
    href: string;
    /** list item alignment */
    orientation: 'vertical' | 'horizontal';
    /** content target */
    target: boolean;
    /** content title text */
    titleText: string;
    /** object to hold multiple content list items blocks that can be passed as json array */
    contentListItems: any;
    /** Listener that looks for content list items object to be assigned/changed externally */
    contentItemsChangeHandler(): void;
    /** actions to perform prior to component load */
    componentWillLoad(): void;
    /** actions to perform after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the content list */
    render(): any;
}
