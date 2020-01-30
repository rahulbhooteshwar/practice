import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-pills */
export declare class Pills {
    /** base component - common functionality */
    base: BaseComponent;
    /** pills element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** Prop for background color */
    backgroundColor: string;
    /** Prop for border color */
    borderColor: string;
    /** Prop for text color */
    color: string;
    /** property to whether show x button or now */
    removable: boolean;
    /** input text */
    text: string;
    /** notify consumer about delete event */
    deleted: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed post component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** remove element on close */
    onDeleteHandler(pillValue: string): void;
    /** Render the pills */
    render(): any;
}
