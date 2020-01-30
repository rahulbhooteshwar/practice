import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-footer */
export declare class Footer {
    /** base component - common functionality */
    base: BaseComponent;
    /** footer element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** contentListData - utilized by DXP footer script support */
    contentListData: any;
    /** copyrightData - utilized by DXP footer script support */
    copyrightData: any;
    /** countryLanguageData - utilized by DXP footer script support */
    countryLanguageData: any;
    /** ctaListData - utilized by DXP footer script support */
    ctaListData: any;
    /** isContentList Present */
    enableContentlist: boolean;
    /** is Copyright Present */
    enableCopyright: boolean;
    /** is Country Language Selector Present */
    enableCountrylanguageselectors: boolean;
    /** is QuickLink Present */
    enableFooterlink: boolean;
    /** isLogo Present */
    enableLogo: boolean;
    /** isCTA Present */
    enableQuicklink: boolean;
    /** is Social Follow Present */
    enableSociallinks: boolean;
    /** footer object which contains data for all elements */
    footerData: any;
    /** footerlinkData - utilized by DXP footer script support */
    footerlinkData: any;
    /** logoData - utilized by DXP footer script support */
    logoData: any;
    /** socialFollowData - utilized by DXP footer script support */
    socialFollowData: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** lifecycle hook */
    componentDidLoad(): void;
    /** Listen for the window resize changes */
    handleResizeEvent(): void;
    /** click listener for routing event on anchor tag */
    routingHandler(event: any): void;
    /** Render Quicklink and Content List */
    renderQuicklinkAndContentList(): any[];
    /** Render the footer */
    render(): any;
}
