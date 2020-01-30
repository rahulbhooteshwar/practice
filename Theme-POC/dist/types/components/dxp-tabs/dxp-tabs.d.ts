import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-tabs */
export declare class Tabs {
    /** base component - common functionality */
    base: BaseComponent;
    /** title of tab needed for analytics */
    dtmTabTitle: string;
    /** selector tabs control */
    selectorTabsControl: string;
    /** selector tabs control */
    selectorTabTitle: string;
    /** selector for vertical container */
    selectorVContainer: string;
    /** selector for tab item content */
    selectorVTabContent: string;
    /** slector for tab item default content */
    selectorVTabDefault: string;
    /** tabs element - utilized by DXP framework */
    element: HTMLElement;
    /** active tab */
    activeTab: HTMLElement;
    /** animation status */
    animationStatus: any;
    /** default tab element */
    defaultTabElement: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** currently focused tab control element */
    focusedControl: HTMLElement;
    /** is default tab active */
    isDefaultTabActive: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** Nested tab elements */
    nestedTabs: HTMLElement[];
    /** is orientation vertical */
    orientationVertical: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** cta data for child components */
    cta: any;
    /** isCTA Present */
    enableCta: boolean;
    /** eyebrow text for tabs */
    eyebrowText: string;
    /** Enable adaptive or fixed width designs */
    fixedWidth: boolean;
    /** Enable icon only labels on mobile devices */
    iconOnlySm: boolean;
    /** Nested tab elements */
    tabItems: {
        /** holds the title of a tab item */
        tabTitle: string;
        /** determines if a given item is active or not */
        active?: boolean;
        /** determines which tab is the default one */
        isDefault?: boolean;
        /** determines if tab is the default view */
        isDefaultView?: boolean;
        /** determines if close is enabled */
        enableClose?: boolean;
        /** determines if animation is enabled */
        enableAnimation?: boolean;
        /** holds the animation status */
        animationStatus?: boolean;
        /** holds the content of a tab item */
        content: string;
        /** holds the alt text for a tab title */
        alt?: string;
        /** holds the link of icon for tab item title */
        tabIconSrc?: string;
    }[];
    /** Tabs Description */
    tabsDescription: string;
    /** Tabs Title */
    tabsTitle: string;
    /** Enable vertical alignment of tabs */
    verticalAlign: boolean;
    /** vertical content position */
    verticalContentPosition: 'top' | 'bottom' | 'accordion';
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate(): void;
    /** activate tab content */
    activateTabs(e: any): void;
    /** focus tabs */
    focusTabs(event: any): void;
    /** listen for key down on enter key to switch tabs */
    keyDownHandler(event: any): void;
    /** close tab content event */
    onCloseTabContent(e: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** window resize event */
    windowResize(): void;
    /** Following method will be called by child items to register items in tabs so that control group can be created */
    registerTab(): Promise<void>;
    /** activate default tab if not provided */
    activateDefaultTab(): void;
    /** activate default tab if not provided */
    activateTab(tabItemElement: HTMLElement, isAccordion?: boolean, isTabClicked?: boolean): void;
    /** animation add status */
    animationAddStatus(item: any): void;
    /** animation after close */
    animationAfterClose(): void;
    /** animation close */
    animationClose(tabItemElement: any, callback: any, duration: any): void;
    /** check is animation enabled */
    animationEnabled(): boolean;
    /** animation ready to activate */
    animationReadyToActivate(tabItemElement: any): void;
    /** animation ready to close */
    animationReadyToClose(): void;
    /** animation upstate status */
    animationUpdateStatus(tabItemElement: any, reset?: boolean): void;
    /** close tab content */
    closeTabContent(e: any): void;
    /** emit analytic data */
    emitAnalyticsData(): void;
    /** enable close button */
    enableCloseButton(): boolean;
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList: any): any;
    /** get current index of tab control */
    getCurrentIndexTabControl(target: any): number;
    /** get default tab element */
    getDefaultTabElement(): HTMLElement;
    /** get elements by selector */
    getElementsBySelector(selector: any): NodeListOf<Element>;
    /** get if default tab is active */
    getIsDefaultTabActive(): boolean;
    /** get array of rendered child tab elements */
    getRenderedTabItems(): any;
    /** handle move on key press */
    handleMoveOnKeyPress(event: any): boolean;
    /** init default tab */
    initDefaultTab(): void;
    /** check if element is default tab element */
    isDefaultTabElement(element: any): boolean;
    /** check if view is vertical and device is other than desktop */
    isOtherDeviceVerticalView(): boolean;
    /** render arrow */
    renderArrow(arrowOrientation: any): any;
    /** render CTA */
    renderCTA(): any;
    /** render tab control */
    renderTabControl(tabItemElement: any, arrowOrientation: any): any;
    /** render tab icon */
    renderTabIcon(tabItem: any): any;
    /** render tab items */
    renderTabItems(tabItems: any): any;
    /** render tabs control */
    renderTabs(tabItems: any, arrowOrientation?: string): any;
    /** render tabs content */
    renderTabsContent(tabItems: any): any;
    /** render tabs eyebrow text */
    renderTabsEyebrowText(): any;
    /** render tabs header */
    renderTabsHeader(): any;
    /** render tabs title */
    renderTabTitleText(tabItem: any): any;
    /** reset wrapper */
    resetVContainer(): void;
    /** set default tab element */
    setDefaultTabElement(): void;
    /** set element properties */
    setElementProperties(tabItemElement: any): void;
    /** set focus control */
    setFocusTabControl(target: any, position: any): void;
    /** set orientation */
    setOrientation(): void;
    /** set tab index for tab control */
    setTabIndexForTabControl(): void;
    /** Render the tabs */
    render(): any;
}
