import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-shape */
export declare class Shape {
    /** base component - common functionality */
    base: BaseComponent;
    /** css classes for different shape types */
    SHAPE_CLASS: Readonly<{
        'round': string;
        'trapezoid': string;
        'rectangle': string;
        'parallelogram': string;
        'triangle-up': string;
        'triangle-down': string;
        'triangle-left': string;
        'triangle-right': string;
    }>;
    /** css classes for vertical alignment */
    VERTICAL_ALIGN_CLASS: Readonly<{
        'top': string;
        'middle': string;
        'bottom': string;
    }>;
    /** shape element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** horizontal alignment of content in shape */
    align: 'left' | 'right' | 'center';
    /** background color as hexcode of shape */
    backgroundColor: string;
    /** background image to be used in shape */
    backgroundImage: string;
    /** border color of shape */
    borderColor: string;
    /** border style of shape */
    borderStyle: 'none' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
    /** border width of shape */
    borderWidth: number;
    /** custom external css class for shape */
    customClass: string;
    /** height of shape */
    height: number;
    /** opacity of background of shape as 0-1 value where 1 is opaque and 0 is full transparent */
    opacity: number;
    /** type of shape */
    type: 'rectangle' | 'round' | 'parallelogram' | 'triangle-up' | 'triangle-down' | 'triangle-left' | 'triangle-right';
    /** vertical alignment of content in shape */
    verticalAlign: 'top' | 'bottom' | 'middle';
    /** width of shape */
    width: number;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed prior to component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Method for getting css class based on type of shape */
    getShapeClass(): any;
    /** Method for getting css class based on vertical alignment */
    getVerticalAlignmentClass(): any;
    /** Method to render triangle */
    renderTriangle(div: any): void;
    /** Render the shape */
    render(): any;
}
