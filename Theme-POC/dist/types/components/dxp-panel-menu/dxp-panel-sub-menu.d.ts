import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-sub-menu */
export declare class PanelSubMenu {
    /** base component - common functionality */
    base: BaseComponent;
    /** panels element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** panel item status */
    active: boolean;
    /** alt text for panel icon  */
    alt: string;
    /** sub-menu item contents */
    content: string;
    /** current value for progress  (for both) */
    currentValue: number;
    /** maximum value for progress  (for both) */
    maxValue: number;
    /** image url for panel icon  */
    menuIconSrc: string;
    /** sub-panel item title */
    menuTitle: string;
    /** It specifies that whether need to show progress bar or not */
    progressBar: boolean;
    /** change color of progress  (for both) */
    progressColor: string;
    /** sub-menu - coma seperated string for sub-menu list for active menu panel */
    subMenu: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the panels */
    render(): any;
}
