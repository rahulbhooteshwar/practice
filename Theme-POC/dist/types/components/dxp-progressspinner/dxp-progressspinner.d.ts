import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-progressspinner */
export declare class Progressspinner {
    /** base component - common functionality */
    base: BaseComponent;
    /** styling for circle. added support for IE */
    circle: {
        'stroke-dasharray': string;
        'stroke-dashoffset': string;
        'stroke': string;
        'animation': string;
        'stroke-linecap': string;
    };
    /** spinnerColor class */
    spinnerColor: string;
    /** spinnerDash class */
    spinnerDash: string;
    /** local style string */
    styleString: {
        'animation-duration': string;
    };
    /** progressspinner element - utilized by DXP framework */
    element: HTMLElement;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Prop for animationDuration */
    animationDuration: number;
    /** Prop for fill */
    fill: string;
    /** Prop for fill radius */
    radius: number;
    /** Prop for strokeColor */
    strokeColor: string;
    /** Prop for strokeWidth */
    strokeWidth: number;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the progressspinner */
    render(): any;
}
