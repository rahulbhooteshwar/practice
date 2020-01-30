import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const NESTED_LOGO = 'NESTED:dxp-logo';
/** dxp-modal */
export class Modal {
    constructor() {
        /** String set width, top and right for sidebar modal */
        this.styleString = {
            'width': '',
            'top': '',
            'right': ''
        };
        /** button position */
        this.buttonPosition = 'left';
        /** close modal on Esc keypress */
        this.closeOnEscKey = true;
        /** close modal on click outside of modal */
        this.closeOnOutsideClick = true;
        /** configurable property for cancel button */
        this.isCancelButtonRequire = false;
        /** configurable property for close button */
        this.isCloseButtonRequired = true;
        /** configure sidebar position */
        this.sidebarPosition = 'right';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Modal', messages);
        if (this.width) {
            this.styleString['width'] = `${this.width}px`;
        }
        if (this.top) {
            this.styleString['top'] = `${this.top}px`;
        }
        if (this.right) {
            this.styleString['right'] = `${this.right}px`;
        }
    }
    /** actions to be performed prior to component loading */
    componentDidLoad() {
        if (this.modalTitle) {
            if (this.element.querySelector('dxp-logo')) {
                this.element.querySelector('dxp-logo').remove();
            }
        }
    }
    /** handle click event */
    async onHandleClickEvent(event) {
        const target = event.target ? event.composedPath()[0] : event.target;
        if (target.classList.contains('dxp-comp-modal') && this.isCloseButtonRequired && this.closeOnOutsideClick) {
            await this.closeModal();
        }
        this.base.routingEventListener(event);
    }
    /** handle keydown event */
    async onKeyDownHandler(event) {
        const target = event.target ? event.composedPath()[0] : event.target;
        // handle esc keypress
        if (event.keyCode === 27 && this.isCloseButtonRequired && this.closeOnEscKey) {
            await this.closeModal();
        }
        else {
            const cancelButton = this.element ? this.element.querySelector('.cancel-button') : this.element.querySelector('.cancel-button');
            const closeModalIcon = this.element ? this.element.querySelector('.btn-close') : this.element.querySelector('.btn-close');
            if (target.classList.contains('secondary-button') && !cancelButton) {
                this.focusTimer(closeModalIcon);
            }
            if (event.keyCode === 9) {
                this.handleFocusEvents(closeModalIcon, event, target);
            }
        }
    }
    /** Method to close modal */
    async closeModal() {
        this.emitAnalyticsData(dxp.i18n.t('Modal:cancel'));
        const shadowRoot = this.element ? this.element : this.element;
        const demoButton = shadowRoot.querySelector('#demoButton');
        shadowRoot.querySelector('.dxp-modal').classList.remove('show');
        shadowRoot.querySelector('.dxp-comp-modal').classList.remove('visible');
        document.querySelector('body').style.overflow = 'auto';
        if (demoButton) {
            setTimeout(() => {
                this.focusElement(demoButton);
            });
        }
        this.modalClose.emit();
    }
    /** Method to open modal */
    async openModal() {
        this.emitAnalyticsData(dxp.i18n.t('Modal:demoButton'));
        const shadowRoot = this.element ? this.element : this.element;
        shadowRoot.querySelector('.dxp-modal').classList.add('show');
        shadowRoot.querySelector('.dxp-comp-modal').classList.add('visible');
        document.querySelector('body').style.overflow = 'hidden';
        this.modalOpen.emit();
    }
    /** emit analytics data */
    emitAnalyticsData(buttonText) {
        const analyticsObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_title': this.modalTitle && this.modalTitle.length !== 0 ? this.modalTitle : '',
            'di_comp_cta': buttonText
        };
        this.analyticsDataEmitter.emit(analyticsObj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsObj);
    }
    /** method to focus input element  */
    focusElement(elem) {
        if (elem) {
            elem.focus();
        }
    }
    /** method to focus input element  */
    focusTimer(ele) {
        setTimeout(() => {
            this.focusElement(ele);
        });
    }
    /** handle modal close for accessibility */
    handleCloseEvents(closeModalIcon, event, target) {
        const footerContainerLastChild = this.element ? this.element.querySelector('.footer-button').lastChild
            : this.element.querySelector('.footer-button').lastChild;
        if (target.classList.contains('cancel-button') && !event.shiftKey) {
            this.focusTimer(closeModalIcon);
        }
        if (target.classList.contains('btn-close')) {
            const logoContainer = this.element ? this.element.querySelector('.modal-title') : this.element.querySelector('.modal-title');
            this.focusTimer(logoContainer);
        }
        if (event.shiftKey && target.classList.contains('dxp-icon-close')) {
            this.focusElement(footerContainerLastChild);
        }
    }
    /** handle focus events on buttons for accessibility */
    handleFocusEvents(closeModalIcon, event, target) {
        const secondaryButton = this.element ? this.element.querySelector('.secondary-button') : this.element.querySelector('.secondary-button');
        this.handleCloseEvents(closeModalIcon, event, target);
        if (target.classList.contains('primary-button') && !secondaryButton && !event.shiftKey) {
            this.focusTimer(closeModalIcon);
        }
        if (target.classList.contains('demo-button')) {
            const logoContainer = this.element ? this.element.querySelector('.logo-container') : this.element.querySelector('.logo-container');
            this.focusTimer(logoContainer);
        }
        if (event.shiftKey && (target.classList.contains('logo-img') || target.classList.contains('modal-title-text'))) {
            this.focusTimer(closeModalIcon);
        }
    }
    /** Method to close modal through (space and enter) keys */
    async handleKeyDownCloseModal(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            await this.closeModal();
        }
    }
    /** Function to be called on primary button action */
    primaryActionHandler() {
        this.emitAnalyticsData(this.primaryButtonText);
        if (this.linkUrlFooterPrimary) {
            if (this.linkUrlFooterPrimary !== '' && this.openInNewTabFooterPrimary) {
                window.open(this.linkUrlFooterPrimary, '_blank');
            }
            else {
                location.href = this.linkUrlFooterPrimary;
            }
        }
        this.modalPrimaryButtonAction.emit();
    }
    /** render buttons for modal */
    renderButtons() {
        const oneButton = h("button", { class: "dxp-btn dxp-btn-primary dxp-btn-lg primary-button", id: "primaryButton", onClick: () => { this.primaryActionHandler(); }, title: this.linkTitleFooterPrimary, "aria-label": this.accessibilityTextFooterPrimary }, this.primaryButtonText);
        const twoButtons = [oneButton,
            h("button", { class: "dxp-btn dxp-btn-primary dxp-btn-lg secondary-button", id: "secondaryButton", onClick: () => { this.secondaryActionHandler(); }, title: this.linkTitleFooterSecondary, "aria-label": this.accessibilityTextFooterSecondary }, this.secondaryButtonText)];
        return (h("div", { class: `sc-dxp-modal dxp-modal-footer align-${this.buttonPosition}` },
            h("div", { class: "sc-dxp-modal footer-button" },
                this.footerType === 'two-button' ?
                    twoButtons
                    : this.footerType === 'one-button' ?
                        oneButton : '',
                this.isCancelButtonRequire &&
                    h("button", { class: "dxp-btn dxp-btn-primary dxp-btn-lg cancel-button", id: "cancelButton", title: this.linkTitleFooterSecondary, "aria-label": this.accessibilityTextFooterSecondary, onClick: () => this.closeModal() }, dxp.i18n.t('Modal:cancel')))));
    }
    /** render buttons for modal */
    renderModalBody() {
        const logo = () => {
            if (!this.headerLogo[NESTED_LOGO]) {
                return h("dxp-logo", { src: this.headerLogo['src'], "src-sm": this.headerLogo['srcSm'], href: this.headerLogo['href'], alt: this.headerLogo['alt'], target: this.headerLogo['target'] });
            }
            return h("dxp-logo", { src: this.headerLogo['src'], "src-sm": this.headerLogo['srcSm'], href: this.headerLogo['href'], alt: this.headerLogo['alt'], target: this.headerLogo['target'] },
                h("dxp-logo", { src: this.headerLogo[NESTED_LOGO].src, "src-sm": this.headerLogo[NESTED_LOGO].srcSm, href: this.headerLogo[NESTED_LOGO].href, alt: this.headerLogo[NESTED_LOGO].alt, target: this.headerLogo[NESTED_LOGO].target }));
        };
        return (h("div", { class: "sc-dxp-modal dxp-modal-body" },
            h("div", { class: "modal-title", tabindex: "-1" },
                this.modalTitle ? h("h3", { class: "modal-title-text", tabindex: "0" }, this.modalTitle) : this.headerLogo ? logo() : h("slot", { name: "logo" }),
                this.modalSubtitle && h("p", { class: "sub-title" },
                    this.modalSubtitle,
                    "\u200E")),
            this.modalDescription &&
                h("div", { class: "modal-description" },
                    h("div", { innerHTML: `${this.modalDescription}&lrm;` })),
            h("slot", null)));
    }
    /** Function to be called on secondary button action */
    secondaryActionHandler() {
        this.emitAnalyticsData(this.secondaryButtonText);
        if (this.linkUrlFooterSecondary) {
            if (this.linkUrlFooterSecondary !== '' && this.openInNewTabFooterSecondary) {
                window.open(this.linkUrlFooterSecondary, '_blank');
            }
            else {
                location.href = this.linkUrlFooterSecondary;
            }
        }
        this.modalSecondaryButtonAction.emit();
    }
    /** Render the modal */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-modal render() : ${process.env.MODE}`);
        const styles = (h("span", null,
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-modal.min.css` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-cta.min.css` }),
            this.dtmUrl && (h("script", { src: this.dtmUrl }))));
        return (h("div", null,
            this.demo ? h("button", { class: "demo-button", "aria-describedby": "demoButtonAccessibility", id: "demoButton", onClick: () => this.openModal() }, dxp.i18n.t('Modal:demoButton')) : '',
            this.demo ? h("p", { id: "demoButtonAccessibility", class: "dxp-sr-only" }, dxp.i18n.t('Modal:demoButtonAccessibilityText')) : '',
            h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
                styles,
                h("div", { class: `sc-dxp-modal dxp-comp-modal main-section dxp-col-12 ${this.isSidebar ? 'dxp-sidebar-container' : ''}` },
                    h("div", { class: `sc-dxp-modal dxp-modal-dialog dxp-col-xl-8 dxp-col-lg-8 dxp-col-md-10 ${this.isSidebar ? `dxp-sidebar-wrapper ${this.sidebarPosition}` : ''}`, "aria-modal": "true", role: "application", tabindex: "-1", style: this.styleString },
                        this.isCloseButtonRequired ?
                            h("span", { tabindex: "-1", class: "sc-dxp-modal btn-close dxp-icon dxp-icon-close", role: "button", "aria-label": dxp.i18n.t('Modal:closeModal'), onClick: () => this.closeModal(), onKeyDown: e => this.handleKeyDownCloseModal(e) })
                            : '',
                        this.renderModalBody(),
                        this.footerType !== 'no-button' || this.isCancelButtonRequire ?
                            this.renderButtons()
                            : '')))));
    }
    static get is() { return "dxp-modal"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-modal.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-modal.css"]
    }; }
    static get properties() { return {
        "accessibilityTextFooterPrimary": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "accessibility text for primary footer button"
            },
            "attribute": "accessibility-text-footer-primary",
            "reflect": false
        },
        "accessibilityTextFooterSecondary": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "accessibility text for secondary footer button"
            },
            "attribute": "accessibility-text-footer-secondary",
            "reflect": false
        },
        "buttonPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right' | 'center'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "button position"
            },
            "attribute": "button-position",
            "reflect": false,
            "defaultValue": "'left'"
        },
        "closeOnEscKey": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "close modal on Esc keypress"
            },
            "attribute": "close-on-esc-key",
            "reflect": false,
            "defaultValue": "true"
        },
        "closeOnOutsideClick": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "close modal on click outside of modal"
            },
            "attribute": "close-on-outside-click",
            "reflect": false,
            "defaultValue": "true"
        },
        "demo": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "to show demo for modal"
            },
            "attribute": "demo",
            "reflect": false
        },
        "footerType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "to determine footer type of modal"
            },
            "attribute": "footer-type",
            "reflect": false
        },
        "headerLogo": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "header logo configurations for modal"
            },
            "attribute": "header-logo",
            "reflect": false
        },
        "isCancelButtonRequire": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "configurable property for cancel button"
            },
            "attribute": "is-cancel-button-require",
            "reflect": false,
            "defaultValue": "false"
        },
        "isCloseButtonRequired": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "configurable property for close button"
            },
            "attribute": "is-close-button-required",
            "reflect": false,
            "defaultValue": "true"
        },
        "isSidebar": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "make modal work as a sidebar"
            },
            "attribute": "is-sidebar",
            "reflect": false
        },
        "linkTitleFooterPrimary": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title for footer primary button"
            },
            "attribute": "link-title-footer-primary",
            "reflect": false
        },
        "linkTitleFooterSecondary": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title for footer secondary button"
            },
            "attribute": "link-title-footer-secondary",
            "reflect": false
        },
        "linkUrlFooterPrimary": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "link to target when footer primary button is clicked"
            },
            "attribute": "link-url-footer-primary",
            "reflect": false
        },
        "linkUrlFooterSecondary": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "link to target when footer secondary button is clicked"
            },
            "attribute": "link-url-footer-secondary",
            "reflect": false
        },
        "modalDescription": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "description text of modal"
            },
            "attribute": "modal-description",
            "reflect": false
        },
        "modalSubtitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Subtitle text of modal"
            },
            "attribute": "modal-subtitle",
            "reflect": false
        },
        "modalTitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Title text of modal"
            },
            "attribute": "modal-title",
            "reflect": false
        },
        "openInNewTabFooterPrimary": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "flag to determine url to be open in new tab for primary footer button"
            },
            "attribute": "open-in-new-tab-footer-primary",
            "reflect": false
        },
        "openInNewTabFooterSecondary": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "flag to determine url to be open in new tab for primary footer button"
            },
            "attribute": "open-in-new-tab-footer-secondary",
            "reflect": false
        },
        "primaryButtonText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Footer primary button text"
            },
            "attribute": "primary-button-text",
            "reflect": false
        },
        "right": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "to set modal's right space"
            },
            "attribute": "right",
            "reflect": false
        },
        "secondaryButtonText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Footer secondary button text"
            },
            "attribute": "secondary-button-text",
            "reflect": false
        },
        "sidebarPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right'",
                "resolved": "\"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "configure sidebar position"
            },
            "attribute": "sidebar-position",
            "reflect": false,
            "defaultValue": "'right'"
        },
        "top": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "to set modal's top space"
            },
            "attribute": "top",
            "reflect": false
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "to set modal width"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "dtmUrl": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "modalClose",
            "name": "modalClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event to be emitted on closing modal"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "modalOpen",
            "name": "modalOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event to be emitted on opening modal"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "modalPrimaryButtonAction",
            "name": "modalPrimaryButtonAction",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event to be emitted on primary button action"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "modalSecondaryButtonAction",
            "name": "modalSecondaryButtonAction",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event to be emitted on secondary button action"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "closeModal": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method to close modal",
                "tags": []
            }
        },
        "openModal": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method to open modal",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "onHandleClickEvent",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "keydown",
            "method": "onKeyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
