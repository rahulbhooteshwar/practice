import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-tooltip */
export declare class Tooltip {
    /** base component - common functionality */
    base: BaseComponent;
    /** tooltip element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** tool tip content */
    content: string;
    /** is used as nested element or document level element */
    insideShadow: boolean;
    /** placement of tooltip */
    placement: 'top' | 'top-right' | 'top-left' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-right' | 'bottom-left' | 'left' | 'left-top' | 'left-bottom';
    /** host Element ID */
    selectorId: string;
    /** Title of tooltip */
    tooltipTitle: string;
    /** comma separated list of event to trigger tooltip on host Element */
    trigger: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed prior to component loading */
    componentDidLoad(): Promise<void>;
    /** actions to be performed after component is updated */
    componentDidUpdate(): Promise<void>;
    /** actions to be performed after component is unloaded */
    componentDidUnload(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Create tooltip */
    createTooltip(): Promise<void>;
    /** Set tooltip header */
    setTooltipHeader(selectorElement: any, toolTipContainer: any): void;
    /** Destroy tooltip */
    destroyTooltip(): Promise<void>;
    /** Method to open modal */
    hideTooltip(): Promise<void>;
    /** Method to open modal */
    showTooltip(): Promise<void>;
    /** Method to open modal */
    toggleTooltip(): Promise<void>;
    /** call event handler on action */
    actionEventHandler(): void;
    /** Click Handler */
    eventHandler(event: any): void;
    /** getOffsetParent */
    getOffsetParent(element: any): any;
    /** getStyleComputedProperty out of style */
    getStyleComputedProperty(element: any, property: any): any;
    /** Insert DOM element after referenceNode */
    insertAfter(el: any, referenceNode: any): void;
    /** Insert DOM element Before referenceNode */
    insertBefore(el: any, referenceNode: any): void;
    /** Render the tooltip */
    render(): any;
}
