import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-social-links-item component */
export declare class SocialLinksItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** set style for new window on share */
    windowStyle: {
        width: number;
        height: number;
    };
    /** social-links-item element - utilized by social-links */
    element: HTMLElement;
    /** set url to share content */
    postUrl: string;
    /** the component's theme (if any) */
    theme: string;
    /** accessibility text */
    alt: string;
    /** link to target for icon */
    href: string;
    /** set target for social share window */
    openWindowAs: string;
    /** get content to share */
    shareContent: string;
    /** title of the icon */
    socialTitle: string;
    /** Type of social link */
    socialType: string;
    /** link in new tab?  */
    target: boolean;
    /** type of social links icon */
    type: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Did load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** post content on selected media platform */
    sharePost(content: string): void;
    /** render social links item */
    render(): any[];
}
