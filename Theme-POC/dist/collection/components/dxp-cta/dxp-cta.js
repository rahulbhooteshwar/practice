import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
// tslint:disable-next-line:ter-no-script-url
const JAVASCRIPT_VOID = 'javascript:void(0)';
/** dxp-cta */
export class Cta {
    constructor() {
        /** Is With icon */
        this.isWithIcon = true;
        /** type of button */
        this.buttonType = 'primary';
        /** Icon url of button */
        this.iconAlign = 'right';
        /** link type */
        this.linkType = 'dxp-btn-internal-link';
        /** type of cta */
        this.type = 'link';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after  component loading */
    componentDidLoad() {
        const ctaContainer = this.element ? this.element.querySelector('.dxp-cta') : this.element.querySelector('.dxp-cta');
        const ctaBtn = this.element ? this.element.querySelector('.dxp-btn') : this.element.querySelector('.dxp-btn');
        const btnBlockClass = 'dxp-btn-block';
        if (this.blockButton && this.type === 'button' && this.buttonType !== 'branded') {
            if (ctaContainer) {
                ctaContainer.classList.add(btnBlockClass);
            }
            if (ctaBtn) {
                ctaBtn.classList.add(btnBlockClass);
            }
            this.element.classList.add(btnBlockClass);
        }
    }
    /** calculate button size */
    calculateButtonSize(buttonSize) {
        return buttonSize ? `btn-${buttonSize}` : '';
    }
    /** emit analytic data */
    emitAnalyticsData() {
        const analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_cta': this.text,
            'di_comp_src': this.src,
            'di_comp_title': this.dtmCtaTitle
        };
        if (!this.disabled) {
            this.analyticsDataEmitter.emit(analyticsInfoObj);
            dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
        }
    }
    /** redirecting to link */
    redirectToLink(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this.routingHandler(e);
        }
    }
    /** Render the cta as button */
    renderButton() {
        const buttonSizeIs = this.calculateButtonSize(this.buttonSize);
        return (h("div", { class: `${this.disabled ? ' disable-cover ' : ''} dxp-cta-with-icon` },
            h("button", { class: `dxp-btn dxp-btn-${this.buttonType} ${buttonSizeIs} ${this.disabled ? ' disabled pointer-event-off' : ''}`, title: this.text, tabindex: this.disabled ? -1 : '', "aria-label": this.text, onClick: ev => this.redirectToLink(ev), "aria-disabled": this.disabled && 'true' },
                this.text && this.src && this.iconAlign.toLowerCase() === 'left' && this.buttonType !== 'branded' &&
                    h("img", { alt: this.alt, class: "cta-icon left", title: this.text, src: this.src }),
                this.buttonType !== 'branded' && this.text,
                this.text && this.src && this.iconAlign.toLowerCase() === 'right' && this.buttonType !== 'branded' &&
                    h("img", { alt: this.alt, class: "cta-icon right", title: this.text, src: this.src }),
                this.buttonType === 'branded' &&
                    h("div", { class: "branded-icon" },
                        h("span", null),
                        h("img", { alt: this.alt, title: this.text, src: this.src })))));
    }
    /** Render the cta as icon */
    renderIcon() {
        return (h("div", null,
            h("a", { class: `icon ${this.disabled ? 'disabled' : ''}`, href: this.disabled ? JAVASCRIPT_VOID : this.href, title: this.text, target: this.openInNewTab ? '_blank' : '_self', tabindex: this.disabled ? -1 : '', "aria-disabled": this.disabled && 'true' },
                h("img", { src: this.src, title: this.text, alt: this.alt, onClick: ev => this.redirectToLink(ev) }),
                this.showBadge())));
    }
    /** Render the cta as link */
    renderLink(isAnchorWithButtonUI) {
        const buttonUi = `dxp-btn dxp-btn-${this.buttonType}`;
        return (h("div", null, this.text ?
            this.renderLinkWithText(isAnchorWithButtonUI) :
            h("div", null,
                h("a", { class: `${this.disabled ? 'disabled' : ''} ${isAnchorWithButtonUI ? buttonUi : !this.src ? this.linkType : 'dxp-link-with-icon'}`, href: this.disabled ? JAVASCRIPT_VOID : this.href, "aria-label": this.ariaLabel, tabindex: this.disabled ? -1 : '', target: this.openInNewTab ? '_blank' : '_self', onClick: ev => this.redirectToLink(ev), "aria-disabled": this.disabled && 'true' }, this.buttonType === 'branded' &&
                    h("div", { class: isAnchorWithButtonUI && 'branded-icon' },
                        h("span", null),
                        h("img", { alt: this.alt, src: this.src }))),
                h("slot", null))));
    }
    /** Render cta link icon */
    renderLinkIcon(isAnchorWithButtonUI, position) {
        return (h("img", { src: this.src, class: isAnchorWithButtonUI ? `cta-icon ${position}` : `link-icon ${position}`, alt: this.alt }));
    }
    /** Render the cta as link with text */
    renderLinkWithText(isAnchorWithButtonUI) {
        const buttonSizeIs = this.calculateButtonSize(this.buttonSize);
        const buttonUi = `dxp-btn dxp-btn-${this.buttonType}`;
        return (h("div", null,
            h("a", { role: isAnchorWithButtonUI && 'button', class: `${this.disabled ? 'disabled' : ''} ${buttonSizeIs}
              ${isAnchorWithButtonUI ? buttonUi : !this.src ? this.linkType : 'dxp-link-with-icon'}`, href: this.disabled ? JAVASCRIPT_VOID : this.href, title: this.ariaLabel, tabindex: this.disabled ? -1 : '', target: this.openInNewTab ? '_blank' : '_self', onClick: ev => this.redirectToLink(ev), "aria-disabled": this.disabled && 'true', style: this.linkType === 'dxp-btn-custom-link' && { 'color': this.accentColor } },
                this.src && this.iconAlign.toLowerCase() === 'left' &&
                    this.renderLinkIcon(isAnchorWithButtonUI, this.iconAlign.toLowerCase()),
                this.text && h("span", null, this.text),
                this.src && this.iconAlign.toLowerCase() === 'right' &&
                    this.renderLinkIcon(isAnchorWithButtonUI, this.iconAlign.toLowerCase())),
            h("slot", null)));
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
        this.ctaClickEvent.emit({ event, href: this.href, text: this.text, disabled: this.disabled });
        this.emitAnalyticsData();
    }
    /** to show badge. this method is added to avoid redundancy of code when this feature will be used for other types in future */
    showBadge() {
        if (this.type === 'icon' && this.iconBadge && this.iconBadge.trim() !== '') {
            return (h("span", { class: `${this.base.componentClass()} dxp-badge-box`, "data-theme": this.theme }, this.iconBadge));
        }
    }
    /** Render the cta */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-cta.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            (this.type.toLowerCase() === 'icon') ? this.renderIcon() : '',
            (this.type.toLowerCase() === 'link') ? this.renderLink(false) : '',
            (this.type.toLowerCase() === 'button' && !this.href) ? this.renderButton() : '',
            (this.type.toLowerCase() === 'button' && this.href) ? this.renderLink(true) : ''));
    }
    static get is() { return "dxp-cta"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-cta.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-cta.css"]
    }; }
    static get properties() { return {
        "accentColor": {
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
                "text": "add custom color"
            },
            "attribute": "accent-color",
            "reflect": false
        },
        "alt": {
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
                "text": "Alternative text for icon image"
            },
            "attribute": "alt",
            "reflect": false
        },
        "ariaLabel": {
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
                "text": "btn-with-text"
            },
            "attribute": "aria-label",
            "reflect": false
        },
        "blockButton": {
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
                "text": "full width button"
            },
            "attribute": "block-button",
            "reflect": false
        },
        "buttonSize": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'xs' | 'sm' | 'md' | 'lg'",
                "resolved": "\"lg\" | \"md\" | \"sm\" | \"xs\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "size of button"
            },
            "attribute": "button-size",
            "reflect": false
        },
        "buttonType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'primary' | 'secondary' | 'branded'",
                "resolved": "\"branded\" | \"primary\" | \"secondary\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of button"
            },
            "attribute": "button-type",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "disabled": {
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
                "text": "state of button"
            },
            "attribute": "disabled",
            "reflect": false
        },
        "dtmCtaTitle": {
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
                "text": "title of cta needed for analytics"
            },
            "attribute": "dtm-cta-title",
            "reflect": false
        },
        "href": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Cta link"
            },
            "attribute": "href",
            "reflect": false
        },
        "iconAlign": {
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
                "text": "Icon url of button"
            },
            "attribute": "icon-align",
            "reflect": false,
            "defaultValue": "'right'"
        },
        "iconBadge": {
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
                "text": "to add icon badge"
            },
            "attribute": "icon-badge",
            "reflect": false
        },
        "linkType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'dxp-btn-video-link' | 'dxp-btn-download-link' | 'dxp-btn-external-link' | 'dxp-btn-internal-link' |\n    'dxp-cta-link' | 'dxp-btn-custom-link' | 'dxp-cta-normal-link'",
                "resolved": "\"dxp-btn-custom-link\" | \"dxp-btn-download-link\" | \"dxp-btn-external-link\" | \"dxp-btn-internal-link\" | \"dxp-btn-video-link\" | \"dxp-cta-link\" | \"dxp-cta-normal-link\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "link type"
            },
            "attribute": "link-type",
            "reflect": false,
            "defaultValue": "'dxp-btn-internal-link'"
        },
        "openInNewTab": {
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
                "text": "Link target.  Set to true to open in an new window."
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "src": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Icon url of button"
            },
            "attribute": "src",
            "reflect": false
        },
        "text": {
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
                "text": "btn-with-text"
            },
            "attribute": "text",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'icon' | 'link' | 'button'",
                "resolved": "\"button\" | \"icon\" | \"link\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of cta"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'link'"
        }
    }; }
    static get states() { return {
        "dir": {},
        "isWithIcon": {},
        "locale": {},
        "styles": {},
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
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "ctaClickEvent",
            "name": "ctaClickEvent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA one click event. Emitted when CTA one is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
}
