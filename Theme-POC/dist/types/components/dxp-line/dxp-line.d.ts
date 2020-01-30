import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-line */
export declare class Line {
    /** base component - common functionality */
    base: BaseComponent;
    /** String for className for the line */
    className: string;
    /** String set for border and background color */
    styleString: {
        'border-color': string;
        'background-color': string;
    };
    /** line element - utilized by DXP framework */
    element: HTMLElement;
    /** Prop for backgroundColor */
    backgroundColor: string;
    /** Prop for borderColor */
    borderColor: string;
    /** Prop for borderWidth */
    borderWidth: number;
    /** Prop for customClass */
    customClass: string;
    /** height for line */
    height: number;
    /** Prop for height for lg device */
    heightLg: number;
    /** Prop for height md device */
    heightMd: number;
    /** Prop for height for sm device */
    heightSm: number;
    /** Prop for height for xl device */
    heightXl: number;
    /** Prop for line-type */
    type: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** returnCalHeight */
    getCalHeight(): void;
    /** Method for getting class name based on type */
    getClassName(type: any): any;
    /** Render the line */
    render(): any;
}
