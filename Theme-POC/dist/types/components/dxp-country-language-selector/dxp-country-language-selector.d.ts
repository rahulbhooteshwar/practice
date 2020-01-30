import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-country-language-selector */
export declare class CountryLanguageSelector {
    /** base component - common functionality */
    base: BaseComponent;
    /** CountryLanguageSelector element - utilized by DXP Framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** selected country */
    selectedCountry: string;
    /** selected Language */
    selectedLanguage: string;
    /** target url with local */
    targetUrlWithLocale: string;
    /** the component's theme (if any) */
    theme: string;
    /** contains country language response */
    countryLanguageData: any;
    /** END POINT URL */
    endPointUrl: string;
    /** targetUrl */
    targetUrl: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** lifecycle hook */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** populate the value of href in <a> according to targetUrl */
    handleTarget(targetUrl: any): string;
    /** initialize component data */
    initializeCountryLanguageData(): void;
    /** Updating first char in upper case and rest in lower case of a word */
    toTitlelCase(str: any): any;
    /** Render the country-language-selector */
    render(): any;
}
