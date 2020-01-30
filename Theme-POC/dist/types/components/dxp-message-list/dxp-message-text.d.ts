import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-message-text */
export declare class MessageText {
    /** base component - common functionality */
    base: BaseComponent;
    /** message element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** summary text of the message displayed in bold */
    text: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the message */
    render(): any;
}
