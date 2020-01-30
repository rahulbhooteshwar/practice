import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-image-slide */
export declare class ImageSlide {
    /** base component - common functionality */
    base: BaseComponent;
    /** image-slide element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** altternative text */
    alt: string;
    /** Eyebrow title */
    eyebrowTitle: string;
    /** image-title */
    imageTitle: string;
    /** Caption of slide  */
    slideCaption: string;
    /** Path for the image to display */
    src: string;
    /** source lg */
    srcLg: string;
    /** source md */
    srcMd: string;
    /** Sub title */
    subTitle: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Render the image-slide */
    render(): any;
}
