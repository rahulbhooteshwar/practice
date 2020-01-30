import { EventEmitter } from '../../stencil.core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-language-selector */
export declare class LanguageItem {
    /** base component - common functionality */
    base: BaseComponent;
    /** language-selector element - utilized by DXP framework */
    element: HTMLElement;
    /** condition to show the language */
    showLanguage: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** Accessibility text */
    accessibilityText: any;
    /** display language */
    inLanguage: any;
    /** language in plain English */
    language: any;
    /** URL for particular language */
    link: any;
    /** locale for the language */
    locale: any;
    /** selected language */
    selectedLanguage: boolean;
    /** if language changed */
    languageChanged: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** change of language */
    handleChange(): Promise<void>;
    /** render function */
    render(): any;
}
