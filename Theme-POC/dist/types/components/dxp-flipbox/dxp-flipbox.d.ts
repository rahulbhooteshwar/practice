import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-flipbox */
export declare class Flipbox {
    /** base component - common functionality */
    base: BaseComponent;
    /** flip-box element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** background color for back part */
    backgroundColorBack: string;
    /** background color for front part */
    backgroundColorFront: string;
    /** css styling for border of back part */
    borderStyleBack: string;
    /** css styling for border of front part */
    borderStyleFront: string;
    /** css styling for border of front part */
    customStyleClass: string;
    /** flipping direction */
    flipDirection: 'horizontal' | 'vertical';
    /** heading for back part */
    headingBack: string;
    /** heading for front part */
    headingFront: string;
    /** height of the box */
    height: string;
    /** width of the box */
    width: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the flip-box */
    render(): any;
}
