import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-flex-layout */
export declare class LayoutItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** layout element - utilized by DXP framework */
    element: HTMLElement;
    /** this object is used to re-render the dom as we dont have any state to force re render */
    reRender: {};
    /** the component's theme (if any) */
    theme: string;
    /**
     * FOLLOWING PROPERTIES ARE BEING USED BY PARENT COMPONENT dxp-flex-layout AT RUNTIME TO APPLY COLUMN CLASSES.
     * THESE PROPERTIES ARE COLUMN SPECIFIC PROPERTIES SO CAN'T BE PART OF PARENT COMPONENT.
     * COLUMN RELATED CLASSES CAN'T BE APPLIED HERE IN THIS COMPONENT DUE TO row-column markup structuring limitations!
     */
    /** background image path */
    bgImage: string;
    /** borderStyle */
    borderStyle: string;
    /** column width for small laptops - screens equal to or greater than 992px wide */
    columnWidthLg: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /** column width for tablets - screens equal to or greater than 768px wide */
    columnWidthMd: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /** column width for phablets - screens less than 768px wide */
    columnWidthSm: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /** column width for laptops and desktops - screens equal to or greater than 1200px wide */
    columnWidthXl: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /** padding style for large devices */
    paddingStyleLg: string;
    /** padding style for Medium devices */
    paddingStyleMd: string;
    /** padding style for Small devices */
    paddingStyleSm: string;
    /** padding style for Xl devices */
    paddingStyleXl: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** listner for window resize/orientation change */
    windowResize(): void;
    /** actions to be performed after render method is called */
    componentDidRender(): void;
    /** calculate padding style */
    setColumnStyles(): {};
    /** Render the layout */
    render(): any;
}
