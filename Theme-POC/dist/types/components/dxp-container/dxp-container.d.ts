import { EventEmitter } from '../../stencil.core';
/**
 * dxp-container
 */
export declare class Container {
    /** JSON data from cms for content elements */
    data: any;
    /** track if we only provide content to added dom elements */
    initialAssignmentDone: boolean;
    /** track if src is assigned, only allow once */
    srcAssigned: boolean;
    /** reference to this container */
    container: HTMLElement;
    /** prop to uniquely identify a container */
    containerId: string;
    /** url to fetch CMS content from */
    src: string;
    /**
     * if src is set post-load, trigger content loading and assignment.
     * note that you can only set SRC once, it cannot be changed to
     * modify content again.
     *
     * @param {string} newSrc - new value for prop src
     * @param {string} oldSrc - previous value of src
     */
    srcChanged(): Promise<void>;
    /** cms content failed to load */
    srcFailed: EventEmitter;
    /** cms content applied */
    srcLoaded: EventEmitter;
    /** fetch content and apply mutation observer on load */
    componentWillLoad(): Promise<void>;
    /**
     * for each element, set html attributes for any normal properties,
     * and use the setter for any object/array properties
     * @param {Element} element - html element to apply attributes to
     * @param {Object.<string, obj>} obj - attributes to apply to element
     */
    applyAttributes(element: any, obj: any): any;
    /**
     * iterate through cms json and apply those data to any matching
     * content-id'd element
     */
    assignContent(): void;
    /** fetch cms json based on url provided */
    fetchContent(): Promise<void>;
    /** uppercase dashed attribute names */
    formatAttributeName(attr: any): any;
    /**
     * watch for any nodes added with a content-id property,
     * and if so see if we need to assign content to them
     */
    initObserver(): void;
    /** Render does nothing, as this is a non-visible component */
    render(): string;
}
