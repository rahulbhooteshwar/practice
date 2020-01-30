import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-banner-carousel */
export declare class BannerCarousel {
    /** base component - common functionality */
    base: BaseComponent;
    /** variable for setting indicator index */
    indicatorIndex: number;
    /** total number of slides */
    maxSlides: any;
    /**  to show the progress of slides */
    setWidth: any;
    /** banner-carousel element - utilized by DXP framework */
    element: HTMLElement;
    /** carousel state */
    carouselState: {
        activeSlide: any;
        activeSlideIndex: any;
        slides: any;
        intervalObj: any;
        navigationReady: boolean;
    };
    /** page dir attribute */
    dir: string;
    /** state variable for dots arrow */
    focusOnDots: boolean;
    /** state variable for next arrow */
    focusOnNext: boolean;
    /** state variable for prev arrow */
    focusOnPrev: boolean;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** This is property for autoplay of carousel */
    autoPlay: boolean;
    /** This is property to set the position of badge/dots */
    badgeAlignment: boolean;
    /** This is property to set indicator color in b2b carousel */
    indicatorColor: string;
    /** Check this to set indicator position to left in b2b carousel */
    indicatorToLeft: boolean;
    /** If banner type is benefits hero then set this to true */
    isBenefitsHero: boolean;
    /** This defines the speed of carousel */
    pauseDuration: number;
    /** check this to show arrows for carousel */
    showArrows: boolean;
    /** check this property to show thumbnails of banner */
    showProgressbar: boolean;
    /** check this property to show thumbnails of banner */
    showThumbnails: boolean;
    /** slide data for script elements */
    slides: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /** keydown events for accessibility */
    keydownEvents(event: any): void;
    /** listener for accessibility to stop carousel autoplay on focus */
    onCarouselFocus(): void;
    /** Mouseout event listener */
    onMouseout(): void;
    /** Mouseover event listener */
    onMouseover(): void;
    /** window resize event */
    windowResize(): void;
    /** active slide by index */
    activateSlide(index: any): void;
    /** add slide animation styles */
    animateSlide(index: any, direction: any): void;
    /** apply calculations to indicators, progrssbar and arrows */
    applyCalculationsToElements(bannerType: any, carouselElement: any, imgTag: any): void;
    /** center align */
    applyDefaultCenter(carouselElement: any): void;
    /** apply calculations to indicators */
    applyLeftValue(indicatorsEle: any, positionLeft: any): void;
    /** apply top values for alignment of indicators and navigation arrows */
    applyTopValue(calcTop: any, indicatorsEle: any, navControls: any, imgEleHeight: any): void;
    /** pause auto play */
    autoPlayPause(): void;
    /** to reset the state for focus of next or prev navigation arrows */
    blurNextPrev(direction: 'NEXT' | 'PREV'): void;
    /** calculate indicator position */
    calculateIndicatorPosition(): void;
    /** active slide by index */
    changeSlide(direction: 'NEXT' | 'PREV'): void;
    /** to end the bar progress */
    endProgressBar(): void;
    /** to show the bar progress */
    fillProgressBar(): void;
    /** to set the state for focus of next or prev navigation arrows */
    focusNextPrev(direction: 'NEXT' | 'PREV'): void;
    /** convert node list to array */
    getArrayFromNodeList(nodeList: any): any;
    /** get array of rendered child tab elements */
    getCarouselItems(): any;
    /** insert animation styles */
    insertAnimationStyles(): void;
    /** pause auto play */
    pauseAutoplay(): void;
    /** show the indicators for transition of slides */
    renderIndicators(): any;
    /** show the progress bar for transition of slides */
    renderProgressBar(): any;
    /** show thumnails for transition of slides */
    renderThumbnails(): any;
    /** set focus for accessibility */
    setFocus(): void;
    /** set focus for accessibility */
    setFocusElement(ele: any): void;
    /** method to set indicator/dots and navigation arrow positions */
    setIndicatorsPosition(): void;
    /** fired on focus for accessibility */
    showSlide(index: any): void;
    /** start slide show */
    startSlideShow(): void;
    /** Render the banner-carousel */
    render(): any;
}
