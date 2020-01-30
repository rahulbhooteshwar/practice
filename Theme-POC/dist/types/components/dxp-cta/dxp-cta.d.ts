import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-cta */
export declare class Cta {
    /** base component - common functionality */
    base: BaseComponent;
    /** cta element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** Is With icon */
    isWithIcon: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's base styles (if any) */
    styles: any;
    /** the component's theme (if any) */
    theme: string;
    /** add custom color */
    accentColor: string;
    /** Alternative text for icon image */
    alt: string;
    /** btn-with-text */
    ariaLabel: string;
    /** full width button */
    blockButton: boolean;
    /** size of button */
    buttonSize: 'xs' | 'sm' | 'md' | 'lg';
    /** type of button */
    buttonType: 'primary' | 'secondary' | 'branded';
    /** state of button */
    disabled: boolean;
    /** title of cta needed for analytics */
    dtmCtaTitle: string;
    /** Cta link */
    href: string;
    /** Icon url of button */
    iconAlign: 'left' | 'right';
    /** to add icon badge */
    iconBadge: string;
    /** link type */
    linkType: 'dxp-btn-video-link' | 'dxp-btn-download-link' | 'dxp-btn-external-link' | 'dxp-btn-internal-link' | 'dxp-cta-link' | 'dxp-btn-custom-link' | 'dxp-cta-normal-link';
    /** Link target.  Set to true to open in an new window. */
    openInNewTab: boolean;
    /** Icon url of button */
    src: string;
    /** btn-with-text */
    text: string;
    /** type of cta */
    type: 'icon' | 'link' | 'button';
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** CTA one click event. Emitted when CTA one is clicked */
    ctaClickEvent: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after  component loading */
    componentDidLoad(): void;
    /** calculate button size */
    calculateButtonSize(buttonSize: any): string;
    /** emit analytic data */
    emitAnalyticsData(): void;
    /** redirecting to link */
    redirectToLink(e: any): void;
    /** Render the cta as button */
    renderButton(): any;
    /** Render the cta as icon */
    renderIcon(): any;
    /** Render the cta as link */
    renderLink(isAnchorWithButtonUI: boolean): any;
    /** Render cta link icon */
    renderLinkIcon(isAnchorWithButtonUI: any, position: any): any;
    /** Render the cta as link with text */
    renderLinkWithText(isAnchorWithButtonUI: any): any;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** to show badge. this method is added to avoid redundancy of code when this feature will be used for other types in future */
    showBadge(): HTMLElement | undefined;
    /** Render the cta */
    render(): any;
}
