import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-language-selector */
export declare class LanguageSelector {
    /** base component - common functionality */
    base: BaseComponent;
    /** Country code */
    cCode: string;
    /** count for accessibility */
    count: number;
    /** language item boolean */
    isLanguageItemPresent: boolean;
    /** nested element container for message texts */
    languageContainer: HTMLElement;
    /** language data */
    languageData: any;
    /** length of parent */
    parentChildLen: number;
    /** language-selector element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** condition to show the language */
    showLanguage: boolean;
    /** the component's theme (if any) */
    theme: string;
    /** url for language json */
    apiUrl: any;
    /** object to hold language locales passed as json array */
    languageLocales: any;
    /** Listener that looks for languageLocales object to be assigned/changed externally */
    languageHandler(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after component loaded */
    componentDidLoad(): void;
    /** for mouse click outside of component */
    clickEvent(e: any): void;
    /** for accessibility */
    handleKeyDown(e: any): void;
    /** for accessibility */
    handleKeyUp(ev: any): void;
    /** for accessibility */
    languageChangedHandler(e: CustomEvent): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** method for focus during accessibility */
    accessibilityFocus(ev: any, count: any, key: any): void;
    /** fetch API data */
    fetchAPI(): Promise<any>;
    /** fetch locale list */
    fetchLocales(LanguageArray: any): void;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** method for returning li for IE accessibility */
    returnFocusItem(elem: any, key: any, count: any): any;
    /** sort language names */
    sortByLanguageName(languagesData: any): any;
    /** to toggle whether to show or hide list */
    toggleShowLanguage(): void;
    /** render function */
    render(): any;
}
