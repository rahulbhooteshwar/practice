import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-content-list-item- */
export declare class ContentListItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** Content List element - utilized by DXP framework */
    element: HTMLElement;
    /** the component's theme (if any) */
    theme: string;
    /** content title accessibility */
    ariaLabel: string;
    /** content href */
    href: string;
    /** content sub title */
    subTitle: string;
    /** content target */
    target: boolean;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to perform after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the content list items */
    render(): any[];
}
