import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-message-list */
export declare class MessageList {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for messages */
    messageContainer: HTMLElement;
    /** message element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** object to hold multiple message blocks that can be passed as json array */
    messages: any;
    /** Listener that looks for messageBlocks object to be assigned/changed externally */
    messagesChangeHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loaded */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Render the message */
    render(): any;
}
