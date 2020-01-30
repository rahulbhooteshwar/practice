import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { EventEmitter } from '../../stencil.core';
/** dxp-modal */
export declare class Modal {
    /** base component - common functionality */
    base: BaseComponent;
    /** String set width, top and right for sidebar modal */
    styleString: {
        'width': string;
        'top': string;
        'right': string;
    };
    /** modal element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** page dtmUrl attribute */
    dtmUrl: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** accessibility text for primary footer button */
    accessibilityTextFooterPrimary: string;
    /** accessibility text for secondary footer button */
    accessibilityTextFooterSecondary: string;
    /** button position */
    buttonPosition: 'left' | 'right' | 'center';
    /** close modal on Esc keypress */
    closeOnEscKey: boolean;
    /** close modal on click outside of modal */
    closeOnOutsideClick: boolean;
    /** to show demo for modal */
    demo: boolean;
    /** to determine footer type of modal */
    footerType: string;
    /** header logo configurations for modal */
    headerLogo: any;
    /** configurable property for cancel button */
    isCancelButtonRequire: boolean;
    /** configurable property for close button */
    isCloseButtonRequired: boolean;
    /** make modal work as a sidebar */
    isSidebar: boolean;
    /** title for footer primary button */
    linkTitleFooterPrimary: string;
    /** title for footer secondary button */
    linkTitleFooterSecondary: string;
    /** link to target when footer primary button is clicked */
    linkUrlFooterPrimary: string;
    /** link to target when footer secondary button is clicked */
    linkUrlFooterSecondary: string;
    /** description text of modal */
    modalDescription: string;
    /** Subtitle text of modal */
    modalSubtitle: string;
    /** Title text of modal */
    modalTitle: string;
    /** flag to determine url to be open in new tab for primary footer button */
    openInNewTabFooterPrimary: boolean;
    /** flag to determine url to be open in new tab for primary footer button */
    openInNewTabFooterSecondary: boolean;
    /** Footer primary button text */
    primaryButtonText: string;
    /** to set modal's right space */
    right: number;
    /** Footer secondary button text */
    secondaryButtonText: string;
    /** configure sidebar position */
    sidebarPosition: 'left' | 'right';
    /** to set modal's top space */
    top: number;
    /** to set modal width */
    width: number;
    /** Analytics data emitter */
    analyticsDataEmitter: EventEmitter;
    /** event to be emitted on closing modal */
    modalClose: EventEmitter;
    /** event to be emitted on opening modal */
    modalOpen: EventEmitter;
    /** event to be emitted on primary button action */
    modalPrimaryButtonAction: EventEmitter;
    /** event to be emitted on secondary button action */
    modalSecondaryButtonAction: EventEmitter;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed prior to component loading */
    componentDidLoad(): void;
    /** handle click event */
    onHandleClickEvent(event: any): Promise<void>;
    /** handle keydown event */
    onKeyDownHandler(event: any): Promise<void>;
    /** Method to close modal */
    closeModal(): Promise<void>;
    /** Method to open modal */
    openModal(): Promise<void>;
    /** emit analytics data */
    emitAnalyticsData(buttonText: any): void;
    /** method to focus input element  */
    focusElement(elem: any): void;
    /** method to focus input element  */
    focusTimer(ele: any): void;
    /** handle modal close for accessibility */
    handleCloseEvents(closeModalIcon: any, event: any, target: any): void;
    /** handle focus events on buttons for accessibility */
    handleFocusEvents(closeModalIcon: any, event: any, target: any): void;
    /** Method to close modal through (space and enter) keys */
    handleKeyDownCloseModal(event: any): Promise<void>;
    /** Function to be called on primary button action */
    primaryActionHandler(): void;
    /** render buttons for modal */
    renderButtons(): any;
    /** render buttons for modal */
    renderModalBody(): any;
    /** Function to be called on secondary button action */
    secondaryActionHandler(): void;
    /** Render the modal */
    render(): any;
}
