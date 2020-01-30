import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-image-carousel */
export declare class ImageCarousel {
    /** active slide index */
    activeSlide: any;
    /** base component - common functionality */
    base: BaseComponent;
    /** carousel container */
    carouselContainer: any;
    /** carousel Progressbar */
    carouselProgressbar: any;
    /** clear interval */
    clrInterval: any;
    /** the current index of the slide  */
    curIndex: number;
    /** make delay for next slide progressbar */
    delayNextProgressBar: number;
    /** store all dxp-image elements */
    dxpCarouselSlide: any;
    /** slide index */
    index: any;
    /** reference of next arrow button */
    next: any;
    /** reference of previous arrow button */
    prev: any;
    /** slide reveal duration */
    slideReveal: any;
    /** slide elements  */
    slides: any;
    /** total number of slides */
    totalSlides: any;
    /** image-carousel element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** This is property for autoplay of carousel */
    autoplay: boolean;
    /** carousel data */
    carouselData: any;
    /** This defines the speed of carousel */
    pauseDuration: number;
    /** Caption of slide  */
    slideCaption: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** Resize event handler  */
    resizeEventHandler(): void;
    /** apply width on dxp-image of carousel container  */
    applyWidthOnDxpImg(): void;
    /** to return the host elements inside or outside shadowRoot */
    findElements(host: any, query: string, all?: boolean): any;
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList: any): any;
    /** hide slide to display next one */
    hideSlide(slide: any): void;
    /** reveal the next slide */
    nextSlide(e: any): void;
    /** reveal the previous slide */
    prevSlide(e: any): void;
    /** reveal the slides with autoplay */
    revealSlide(slide: any): void;
    /** carousel */
    slideShow(nextPrevSlide: any): void;
    /** wrap each dxp-image element in a div */
    wrapDxpImg(): void;
    /** Render the image-carousel */
    render(): any;
}
