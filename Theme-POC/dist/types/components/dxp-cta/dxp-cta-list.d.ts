import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-cta-list */
export declare class CtaList {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for social CTAs */
    ctaContainer: HTMLElement;
    /** cta List - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** orientation of icons list (horizontal/ vertical) */
    orientation: 'horizontal' | 'vertical';
    /** title style property */
    titleStyle: string;
    /** title text property */
    titleText: string;
    /** object to hold multiple CTA blocks that can be passed as json array */
    ctaList: any;
    /** Listener that looks for CTA object to be assigned/changed externally */
    ctaChangeHandler(): void;
    /** action performed before the component has loaded */
    componentWillLoad(): void;
    /** actions to be performed after component load */
    componentDidLoad(): void;
    /** listens to window resize event and applies vertical orientation on mobile devices */
    handleCTAResize(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /**
     * method that returns class name based on type
     * of titleStyle applied
     */
    getClassName(): "dxp-title-3" | "dxp-title-1" | "dxp-title-2" | "dxp-title-4";
    /** listen to window resize events and change the orientation of list */
    /** Render the cta-list */
    render(): any;
}
