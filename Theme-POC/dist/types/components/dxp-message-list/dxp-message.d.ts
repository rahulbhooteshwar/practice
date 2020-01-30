import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-message */
export declare class Message {
    /** base component - common functionality */
    base: BaseComponent;
    /** nested element container for message texts */
    messageTextContainer: HTMLElement;
    /** theme/icon classes for different severity */
    THEME_CLASS: {
        'success': string[];
        'info': string[];
        'error': string[];
        'warn': string[];
        'general': string[];
    };
    /** message element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** show/hide close botton flag */
    hideCloseBtn: boolean;
    /** severity of the message - warn, info, error, success, general */
    severity: 'warn' | 'info' | 'error' | 'success' | 'general';
    /** object to hold multiple message texts that can be passed as json array */
    messageTexts: any;
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    messageTextsChangeHandler(): void;
    /** Emit event on click of Close button */
    closeButton: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed after component loaded */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** actions to be performed on click on Close button */
    close(): boolean;
    /** Method for getting icon based on severity */
    getIcon(): string;
    /** Method for getting theme based on severity */
    getTheme(): string;
    /** Render the message */
    render(): any;
}
