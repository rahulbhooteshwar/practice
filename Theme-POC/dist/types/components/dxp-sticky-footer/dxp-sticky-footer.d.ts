import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-sticky-footer */
export declare class FooterSticky {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for sticky-footer */
    ctaContainer: HTMLElement;
    /** footer-sticky element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** footer type on component level */
    footerType: string;
    /** title Heading */
    titleText: string;
    /** cta attributes */
    cta: any;
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** Handle resize event */
    handleResize(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the footer-sticky */
    render(): any;
}
