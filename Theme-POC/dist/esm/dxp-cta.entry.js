import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

// tslint:disable-next-line:ter-no-script-url
const JAVASCRIPT_VOID = 'javascript:void(0)';
const Cta = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.analyticsDataEmitter = createEvent(this, "dxp_comp", 7);
        this.ctaClickEvent = createEvent(this, "ctaClickEvent", 7);
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
        return (h("div", { class: `${this.disabled ? ' disable-cover ' : ''} dxp-cta-with-icon` }, h("button", { class: `dxp-btn dxp-btn-${this.buttonType} ${buttonSizeIs} ${this.disabled ? ' disabled pointer-event-off' : ''}`, title: this.text, tabindex: this.disabled ? -1 : '', "aria-label": this.text, onClick: ev => this.redirectToLink(ev), "aria-disabled": this.disabled && 'true' }, this.text && this.src && this.iconAlign.toLowerCase() === 'left' && this.buttonType !== 'branded' &&
            h("img", { alt: this.alt, class: "cta-icon left", title: this.text, src: this.src }), this.buttonType !== 'branded' && this.text, this.text && this.src && this.iconAlign.toLowerCase() === 'right' && this.buttonType !== 'branded' &&
            h("img", { alt: this.alt, class: "cta-icon right", title: this.text, src: this.src }), this.buttonType === 'branded' &&
            h("div", { class: "branded-icon" }, h("span", null), h("img", { alt: this.alt, title: this.text, src: this.src })))));
    }
    /** Render the cta as icon */
    renderIcon() {
        return (h("div", null, h("a", { class: `icon ${this.disabled ? 'disabled' : ''}`, href: this.disabled ? JAVASCRIPT_VOID : this.href, title: this.text, target: this.openInNewTab ? '_blank' : '_self', tabindex: this.disabled ? -1 : '', "aria-disabled": this.disabled && 'true' }, h("img", { src: this.src, title: this.text, alt: this.alt, onClick: ev => this.redirectToLink(ev) }), this.showBadge())));
    }
    /** Render the cta as link */
    renderLink(isAnchorWithButtonUI) {
        const buttonUi = `dxp-btn dxp-btn-${this.buttonType}`;
        return (h("div", null, this.text ?
            this.renderLinkWithText(isAnchorWithButtonUI) :
            h("div", null, h("a", { class: `${this.disabled ? 'disabled' : ''} ${isAnchorWithButtonUI ? buttonUi : !this.src ? this.linkType : 'dxp-link-with-icon'}`, href: this.disabled ? JAVASCRIPT_VOID : this.href, "aria-label": this.ariaLabel, tabindex: this.disabled ? -1 : '', target: this.openInNewTab ? '_blank' : '_self', onClick: ev => this.redirectToLink(ev), "aria-disabled": this.disabled && 'true' }, this.buttonType === 'branded' &&
                h("div", { class: isAnchorWithButtonUI && 'branded-icon' }, h("span", null), h("img", { alt: this.alt, src: this.src }))), h("slot", null))));
    }
    /** Render cta link icon */
    renderLinkIcon(isAnchorWithButtonUI, position) {
        return (h("img", { src: this.src, class: isAnchorWithButtonUI ? `cta-icon ${position}` : `link-icon ${position}`, alt: this.alt }));
    }
    /** Render the cta as link with text */
    renderLinkWithText(isAnchorWithButtonUI) {
        const buttonSizeIs = this.calculateButtonSize(this.buttonSize);
        const buttonUi = `dxp-btn dxp-btn-${this.buttonType}`;
        return (h("div", null, h("a", { role: isAnchorWithButtonUI && 'button', class: `${this.disabled ? 'disabled' : ''} ${buttonSizeIs}
              ${isAnchorWithButtonUI ? buttonUi : !this.src ? this.linkType : 'dxp-link-with-icon'}`, href: this.disabled ? JAVASCRIPT_VOID : this.href, title: this.ariaLabel, tabindex: this.disabled ? -1 : '', target: this.openInNewTab ? '_blank' : '_self', onClick: ev => this.redirectToLink(ev), "aria-disabled": this.disabled && 'true', style: this.linkType === 'dxp-btn-custom-link' && { 'color': this.accentColor } }, this.src && this.iconAlign.toLowerCase() === 'left' &&
            this.renderLinkIcon(isAnchorWithButtonUI, this.iconAlign.toLowerCase()), this.text && h("span", null, this.text), this.src && this.iconAlign.toLowerCase() === 'right' &&
            this.renderLinkIcon(isAnchorWithButtonUI, this.iconAlign.toLowerCase())), h("slot", null)));
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
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, (this.type.toLowerCase() === 'icon') ? this.renderIcon() : '', (this.type.toLowerCase() === 'link') ? this.renderLink(false) : '', (this.type.toLowerCase() === 'button' && !this.href) ? this.renderButton() : '', (this.type.toLowerCase() === 'button' && this.href) ? this.renderLink(true) : ''));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-cta{display:inline-block;background:transparent}div.dxp.dxp-cta a.dxp-btn-custom-link.focus.disabled,div.dxp.dxp-cta a.dxp-btn-custom-link.focus:disabled,div.dxp.dxp-cta a.dxp-btn-custom-link:focus.disabled,div.dxp.dxp-cta a.dxp-btn-custom-link:focus:disabled,div.dxp.dxp-cta a.dxp-btn-download-link.focus.disabled,div.dxp.dxp-cta a.dxp-btn-download-link.focus:disabled,div.dxp.dxp-cta a.dxp-btn-download-link:focus.disabled,div.dxp.dxp-cta a.dxp-btn-download-link:focus:disabled,div.dxp.dxp-cta a.dxp-btn-external-link.focus.disabled,div.dxp.dxp-cta a.dxp-btn-external-link.focus:disabled,div.dxp.dxp-cta a.dxp-btn-external-link:focus.disabled,div.dxp.dxp-cta a.dxp-btn-external-link:focus:disabled,div.dxp.dxp-cta a.dxp-btn-internal-link.focus.disabled,div.dxp.dxp-cta a.dxp-btn-internal-link.focus:disabled,div.dxp.dxp-cta a.dxp-btn-internal-link:focus.disabled,div.dxp.dxp-cta a.dxp-btn-internal-link:focus:disabled,div.dxp.dxp-cta a.dxp-btn-video-link.focus.disabled,div.dxp.dxp-cta a.dxp-btn-video-link.focus:disabled,div.dxp.dxp-cta a.dxp-btn-video-link:focus.disabled,div.dxp.dxp-cta a.dxp-btn-video-link:focus:disabled,div.dxp.dxp-cta a.dxp-cta-link.focus.disabled,div.dxp.dxp-cta a.dxp-cta-link.focus:disabled,div.dxp.dxp-cta a.dxp-cta-link:focus.disabled,div.dxp.dxp-cta a.dxp-cta-link:focus:disabled,div.dxp.dxp-cta a.dxp-link-with-icon.focus.disabled,div.dxp.dxp-cta a.dxp-link-with-icon.focus:disabled,div.dxp.dxp-cta a.dxp-link-with-icon:focus.disabled,div.dxp.dxp-cta a.dxp-link-with-icon:focus:disabled{outline:none}div.dxp.dxp-cta .dxp-btn-custom-link,div.dxp.dxp-cta .dxp-link-with-icon{height:1.5rem;padding:.125rem .4375rem;border-radius:.375rem}div.dxp.dxp-cta .dxp-btn-custom-link{padding:.1875rem .4375rem}div.dxp.dxp-cta .dxp-link-with-icon span{vertical-align:middle}div.dxp.dxp-cta .dxp-cta-with-icon{display:inline;vertical-align:middle}div.dxp.dxp-cta .dxp-link-with-icon{display:inline-block;background:transparent}div.dxp.dxp-cta .dxp-link-with-icon:hover{text-decoration:underline}div.dxp.dxp-cta .dxp-link-with-icon.disabled{opacity:.5;cursor:not-allowed}div.dxp.dxp-cta .dxp-link-with-icon.disabled:hover{text-decoration:none}div.dxp.dxp-cta .cta-icon,div.dxp.dxp-cta .link-icon{display:inline-block;max-height:1.25rem;max-width:1.25rem}div.dxp.dxp-cta .cta-icon.right,div.dxp.dxp-cta .link-icon.right{margin:0 0 0 .625rem}div.dxp.dxp-cta .cta-icon.left,div.dxp.dxp-cta .link-icon.left{margin:0 .625rem 0 0}div.dxp.dxp-cta .cta-icon{position:relative}div.dxp.dxp-cta .cta-icon.right{top:-.0625rem}div.dxp.dxp-cta .cta-icon.left{top:-.125rem}div.dxp.dxp-cta .dxp-btn-custom-link.disabled{opacity:.5;cursor:not-allowed}div.dxp.dxp-cta .dxp-btn-custom-link.disabled:hover{text-decoration:none}div.dxp.dxp-cta .branded-icon img{max-height:2.375rem;width:auto}div.dxp.dxp-cta .icon{position:relative;height:2.5rem;width:2.5rem;display:inline-block;font-size:0;line-height:2.5rem;text-align:center}div.dxp.dxp-cta .icon img{display:inline-block;max-width:100%;max-height:100%;vertical-align:middle}div.dxp.dxp-cta .icon.disabled{opacity:.5;cursor:not-allowed}div.dxp.dxp-cta .icon .dxp-badge-box{border-radius:.8125rem;padding:.0625rem .25rem .125rem .25rem;min-width:20px;display:inline-block;text-align:center;position:absolute;right:0;-webkit-transform:translateX(40%);transform:translateX(40%);top:-5px;max-height:1rem}div.dxp.dxp-cta[dir=rtl] .dxp-btn-branded,div.dxp.dxp-cta[dir=rtl] a.dxp-btn-branded{padding:0 0 0 2.125rem}div.dxp.dxp-cta[dir=rtl] .dxp-btn-branded span,div.dxp.dxp-cta[dir=rtl] a.dxp-btn-branded span{left:0;right:auto}div.dxp.dxp-cta[dir=rtl] .dxp-btn-branded span:after,div.dxp.dxp-cta[dir=rtl] a.dxp-btn-branded span:after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}div.dxp.dxp-cta[dir=rtl] .dxp-btn-branded span:before,div.dxp.dxp-cta[dir=rtl] a.dxp-btn-branded span:before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}div.dxp.dxp-cta[dir=rtl] .cta-icon.right,div.dxp.dxp-cta[dir=rtl] .link-icon.right{margin:0 .625rem 0 0}div.dxp.dxp-cta[dir=rtl] .cta-icon.left,div.dxp.dxp-cta[dir=rtl] .link-icon.left{margin:0 0 0 .625rem}div.dxp.dxp-cta[dir=rtl] .icon .dxp-badge-box{right:auto;left:0;-webkit-transform:translateX(-40%);transform:translateX(-40%)}div.dxp.dxp-cta .pointer-event-off{pointer-events:none}div.dxp.dxp-cta .disable-cover{cursor:not-allowed;display:block}"; }
};

export { Cta as dxp_cta };
