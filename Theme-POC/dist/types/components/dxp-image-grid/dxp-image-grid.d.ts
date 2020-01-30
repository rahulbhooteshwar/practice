import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-image-grid */
export declare class ImageGrid {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for image grid */
    imagesContainer: HTMLElement;
    /** set Maximum Number of images to be shown in grid */
    IMAGE_COUNT: {
        'size-1x1': number;
        'size-2x2': number;
        'size-2x2--l': number;
        'size-2x2--c': number;
        'size-2x2--r': number;
    };
    /** image-grid element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** layout options to select image ordering placement */
    layoutOption: string;
    /** content data for child components */
    imageContentData: any;
    /** Watcher that looks for imageContentData object to be assigned/changed externally */
    imageContentDataChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Create image grid skeleton */
    createImageGridContainer(container: any, imageContentItems: any): void;
    /** Display images as per selection of grid layout */
    displayImagesInGrid(container: any, imageContentItems: any): void;
    /** Render the image grid */
    render(): any;
}
