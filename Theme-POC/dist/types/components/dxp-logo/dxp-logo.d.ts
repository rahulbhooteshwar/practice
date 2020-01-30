import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-logo */
export declare class Logo {
    /** base component - common functionality */
    base: BaseComponent;
    /** check logo schema exist */
    isLogoSchemaExist: boolean;
    /** logo element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** page dtmUrl attribute */
    dtmUrl: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** alt text for logo */
    alt: string;
    /** accessibility text for logo */
    ariaLabel: string;
    /** url to link to when logo clicked */
    href: string;
    /** title text for logo */
    logoTitle: string;
    /** schema type for SEO */
    schemaType: string;
    /** logo img src */
    src: string;
    /** logo img src when small viewport */
    srcSm: string;
    /** window to target for link */
    target: boolean;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** appending domain url to relative path */
    appendingDomain(url: any): any;
    /** Emit the analytics data after clicking on dxp-logo component */
    emitAnalyticsData(): void;
    /** SEO script of Schema  */
    schemaScript(): void;
    /** Render the logo */
    render(): any;
}
