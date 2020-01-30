import { EventEmitter } from '../../stencil.core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-select */
export declare class Select {
    /** base component - common functionality */
    base: BaseComponent;
    /** select element - utilized by DXP framework */
    element: HTMLElement;
    /** default size for fixed height select */
    defaultSize: number;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** size attribute of select */
    size: any;
    /** the component's theme (if any) */
    theme: string;
    /** selector */
    dataList: any;
    /** display fix height select */
    fixHeight: boolean;
    /** selected index */
    selectedValue: any;
    /** selector */
    selector: string;
    /** use index as value */
    useIndexAsValue: boolean;
    /** emit custom event when calendar is clicked */
    optionSelected: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** Listen onblur of select */
    onBlurHandler(_event: any): void;
    /** Listen keydown of select */
    onKeyDownHandler(event: any): void;
    /** Listen mousedown of select */
    onMouseDownHandler(_event: any): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Handler for on select event of dropdown */
    onSelect(event: any): void;
    /** remove size property of select */
    removeSize(): void;
    /** set size property of select */
    setSize(): void;
    /** Render the select */
    render(): any;
}
