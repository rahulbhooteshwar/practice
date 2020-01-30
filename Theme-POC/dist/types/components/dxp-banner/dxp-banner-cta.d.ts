import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner */
export declare class BannerCta {
    /** base component - common functionality */
    base: BaseComponent;
    /** 'with-overlay' css class will be store in this variable */
    withOverlay: string;
    /** banner element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** button style for cta */
    bannerSize: string;
    /** banner type for cta */
    bannerType: string;
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
    /** prop value is true when overlay is enabled on 'image banner' */
    enableOverlay: string;
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
    /** Render the banner */
    render(): any;
}
