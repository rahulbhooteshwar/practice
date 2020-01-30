import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-autowriter */
export declare class Autowriter {
    /** base component - common functionality */
    base: BaseComponent;
    /** variable for array objects */
    count: number;
    /** variable to loop display of each characted */
    counter: number;
    /** variable to support interval time for alteranting text */
    private interval;
    /** variable to hold placeholder text */
    text: string;
    /** variable for alternating text */
    _count: number;
    /** variable to support interval time for displaying each character */
    private _interval;
    /** autowriter element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** variable text that gets displayed in loop as innerHTML */
    displayText: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** custom css class name if needed to be applied to display text */
    customStyleClass: '';
    /** to fix the cursor position at the start */
    fixCursor: boolean;
    /** speed in milliseconds for interval to display next character */
    speed: number;
    /** array text that needs to be displayed */
    textList: any[];
    /** calls function when value assigned to textList */
    textChange(): void;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** method to clear intervals */
    clearAutoWriterIntervals(): Promise<void>;
    /** reverse the direction of autowriter */
    alternatingWriterText(): void;
    /** to assign all the objects of array */
    assignPlaceholderText(): void;
    /** to display the normal autowriter text */
    autowriterText(): void;
    /** method to return autowriter dom with fix or moving cursor */
    renderAutowriter(): any[];
    /** Render the autowriter */
    render(): any;
}
