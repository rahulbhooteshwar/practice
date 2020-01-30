import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-social-links */
export declare class SocialLinks {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for social links */
    linksContainer: HTMLElement;
    /** social-links element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** Set list of social links items to be displayed */
    socialItems: any[];
    /** the component's theme (if any) */
    theme: string;
    /** set list of media items */
    selectedLinksItems: any[];
    /** Listener that looks for links object to be assigned/changed externally */
    socialLinksChangeHandler(): void;
    /** orientation of icons list (horizontal/ vertical) */
    orientation: 'horizontal' | 'vertical';
    /** text for heading of icons list */
    socialLabel: string;
    /** get list of all media platforms */
    socialLinksItemList: any[];
    /** Social links items - to be utilized by DXP framework */
    socialLinksItems: any;
    /** Type of social link */
    socialType: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component load */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** render social links */
    render(): any;
}
