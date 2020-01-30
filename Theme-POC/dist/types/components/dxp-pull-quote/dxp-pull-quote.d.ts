import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-pull-quote */
export declare class PullQuote {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for CTA */
    ctaContainer: HTMLElement;
    /** nested element container for image */
    imageContainer: HTMLElement;
    /** without image */
    withImage: any;
    /** pull-quote element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Alt/title text for image. Also for SEO. */
    alt: string;
    /** aria-label for image link. Also for accessibility. */
    ariaLabel: string;
    /** name of the  author */
    author: string;
    /** cta data for child components */
    ctaData: any;
    /** eyebrow text for dxp-pull-quote */
    eyebrowTitle: string;
    /**
     * Array of coordinates to set the focal point of the image. values can be passed as an array of coordinates to set
     * the focal point of the image on small sized devices.[up, down, left, right]
     */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** Link destination when clicked. */
    href: string;
    /** Text to be shown on overlay */
    imageTitle: string;
    /** Link target.  Set to true to open in an new window. */
    openInNewTab: boolean;
    /** profile of the author  */
    profile: string;
    /** quote given by author */
    quote: string;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** Path for the image to display */
    src: string;
    /** source lg */
    srcLg: string;
    /** source md */
    srcMd: string;
    /** title text for dxp-pull-quote */
    titleText: string;
    /** pullQuoteData */
    pullQuoteData: any;
    /** Listener that looks for pullQuote object to be assigned/changed externally */
    pullQuoteDataChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after the component loading */
    componentDidLoad(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** check cta list orientation */
    checkCTAListOrientation(): Promise<void>;
    /** check CTA present */
    checkCTAPresent(): boolean;
    /** render cta */
    renderCta(): any;
    /** render eyebrow tiltle */
    renderEyebrowTitle(): any;
    /** render the quote text */
    renderQuoteText(): any;
    /** render text paragraphs */
    renderTextPara(): any;
    /** Render the pull-quote */
    render(): any;
}
