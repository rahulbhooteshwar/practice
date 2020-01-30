import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-panel-menu */
export declare class PanelMenu {
    /** base component - common functionality */
    base: BaseComponent;
    /** panel-menu element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** currently focused menu control element */
    focusedControl: HTMLElement;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** Nested menu elements */
    nestedMenus: HTMLElement[];
    /** the component's theme (if any) */
    theme: string;
    /** Enable adaptive or fixed width designs */
    fixedWidth: boolean;
    /** Enable icon only labels on mobile devices */
    iconOnlySm: boolean;
    /** Nested menu elements */
    menuItems: {
        menuTitle: string;
        active?: boolean;
        content: string;
        alt?: string;
        menuIconSrc?: string;
        subMenu?: any;
        progressBar?: boolean;
        currentValue?: number;
        maxValue?: number;
        progressColor?: string;
    }[];
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** listen for key down on enter key to switch panel menus */
    keyDownHandler(event: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Following method will be called by child items to register items in sub-menus so that control group can be created */
    registerMenu(): Promise<void>;
    /** activate default menu if not provided */
    activateDefaultMenu(): void;
    /** activate default menu if not provided */
    activateMenu(menuElement: any): void;
    /** convert node list to array */
    getArrayFromNodeList(nodeList: any): any;
    /** get array of rendered child sub-menu elements */
    getRenderedMenuItems(): any;
    /** Render the panel-menu */
    render(): any;
}
