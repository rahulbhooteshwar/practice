import { EventEmitter } from '../../stencil.core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-image */
export declare class Image {
    /** Link element  */
    anchorElm: any;
    /** base component - common functionality */
    base: BaseComponent;
    /** Parent element of component where dxp-image component is integrated */
    componentParentElm: HTMLElement;
    /** Finally applied focal point */
    focalPoints: any;
    /** Image container div  */
    imageContainer: HTMLElement;
    /** img element  */
    img: HTMLElement;
    /** Image parent element */
    imgParentElm: HTMLElement;
    /** time out */
    timeOut: any;
    /** focal point X direction */
    xPos: number;
    /** focal point Y direction */
    yPos: number;
    /** image element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** page dtmUrl attribute */
    dtmUrl: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Alt/title text for image. Also for SEO. */
    alt: string;
    /** aria-label for image link. Also for accessibility. */
    ariaLabel: string;
    /** eyebrow of caption to be shown over the image */
    captionEyebrow: string;
    /** position of the caption on image */
    captionPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'centered';
    /** subtitle of caption to be shown over the image */
    captionSubtitle: string;
    /** title of caption to be shown over the image */
    captionTitle: string;
    /** Device height */
    deviceHeight: string;
    /** Enables overlay on the image if set to true */
    enableOverlay: boolean;
    /** Focal point of XL images */
    focalPoint: any;
    /** focal point for large devices */
    focalPointLg: any;
    /** focal point for medium devices */
    focalPointMd: any;
    /** Link destination when clicked. */
    href: string;
    /** Text to be shown on overlay */
    imageTitle: string;
    /** imgSrc */
    imgSrc: string;
    /** Link target.  Set to true to open in an new window. */
    openInNewTab: boolean;
    /** whether image should use its size or be responsive */
    responsive: boolean;
    /** source lg */
    srcLg: string;
    /** source md */
    srcMd: string;
    /** Path for the image to display */
    src: string;
    /** watch change in image path and update the data-src accordingly for lazyloading */
    imagePathChangeHandler(): void;
    /** analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** updating rendered state with the componentDidLoad() */
    componentDidLoad(): void;
    /** component will update  */
    componentWillUpdate(): void;
    /** component did update  */
    componentDidUpdate(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** window resize */
    windowResizes(): void;
    /** Apply focal point values on image as per X and Y coordinates */
    applyFocalPoints(): void;
    /** calculate device specific focal point */
    calculateDeviceFocalPoint(fpMd: any, fpLg: any, fpXl: any): void;
    /** calculate focal point */
    calculateFocalPoint(): boolean;
    /** emit analytics data */
    emitAnalyticsData(): void;
    /** lazy load fallback condition for IE and Edge browser */
    fallBack(): void;
    /** apply lazy loading for browser chrome, safari and firefox. Not supported on IE/Edge as it does not support event */
    lazyLoadImage(): void;
    /** Load dynamic resources */
    loadResource(): void;
    /** render captions on image */
    renderCaptions(): any;
    /** Render the image */
    render(): any;
}
