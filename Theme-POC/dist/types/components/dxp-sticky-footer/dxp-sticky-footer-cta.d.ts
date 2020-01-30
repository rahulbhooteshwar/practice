import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-sticky-footer */
export declare class StickyFooterCta {
    /** base component - common functionality */
    base: BaseComponent;
    /** sticky-footer element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** button style for cta */
    buttonStyle: string;
    /** download file name for cta */
    downloadFile: string;
    /** email body for cta */
    emailBody: string;
    /** email id for cta type email */
    emailId: string;
    /** email subject for cta */
    emailSubject: string;
    /** link text for cta */
    linkText: string;
    /** link type for cta */
    linkType: string;
    /** link url for cta */
    linkUrl: string;
    /** open link in new tab for cta */
    openInNewTab: 'false';
    /** Text for visually impaired for cta */
    visuallyImpairedText: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the sticky-footer */
    render(): any;
}
