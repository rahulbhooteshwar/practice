import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const MEDIA_TOP = 'media-on-top';
const DESCRIPTION_HIDDEN_XS = 'description dxp-hidden-xs-only';
/** dxp-content-item */
export class ContentItem {
    constructor() {
        /** autoplay video */
        this.autoplay = true;
        /** To show video on click on play icon */
        this.isVideoShow = false;
        /** To show more actions popup on More button click */
        this.showMore = false;
        /** More action button list */
        this.actionList = [];
        /** content item animation */
        this.animation = 'none';
        /** content item animation */
        this.animationDuration = 0;
        /** title badge background color */
        this.badgeBackgroundColor = '#25836d';
        /** text color for badge */
        this.badgeTextColor = '#ffffff';
        /** CTA one display as link or button */
        this.buttonOneDisplayAs = 'button';
        /** CTA two display as link or button */
        this.buttonTwoDisplayAs = 'button';
        /** type of dxp-content-item; can be either media-on-top, title-on-top */
        this.contentItemType = MEDIA_TOP;
        /** Content type of dxp-content-item. */
        this.contentType = 'content-image-text';
        /** custom mute button in case of disabled controls for HTML5 video */
        this.customMuteButton = false;
        /** custom mute button position */
        this.customMuteButtonPosition = 'top-right';
        /** header type of dxp-content-item. Can be either image or none  */
        this.headerType = 'image';
        /** header type of dxp-content-item. Can be either image or none  */
        this.heightType = 'large';
        /** icon type for header video */
        this.iconType = 'light';
        /** whether content indentation should use  */
        this.indentation = true;
        /** orientation of dxp-content-item */
        this.orientation = 'vertical';
        /** to align play icon on bottom left side */
        this.playIconBottomLeft = false;
        /** position Of image/video */
        this.positionOfMedia = 'Left';
        /** whether image should use its size or be responsive */
        this.responsive = true;
    }
    /** Watcher that looks for cta object to be assigned/changed externally */
    ctaDataChangeHandler() {
        this.base.createNestedMarkup(this.ctaContainer, 'dxp-cta-list', this.ctaData);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'ContentItem', messages);
    }
    /** life cycle hook */
    componentDidLoad() {
        this.ctaDataChangeHandler();
        if (this.contentItemTitleUrl) {
            const contUrlChange = this.element.querySelector('.dxp-title-3').querySelector('a');
            contUrlChange.setAttribute('href', this.contentItemTitleUrl);
        }
        if (this.badgeRef) {
            this.badgeRef.style.color = this.badgeTextColor;
            this.badgeRef.style.backgroundColor = this.badgeBackgroundColor;
        }
    }
    /** Listen scroll for animation */
    handleScroll() {
        if (this.animation !== 'none') {
            const elementsToShow = this.element.querySelector('.dxp-content-item');
            const rect = elementsToShow.getBoundingClientRect();
            if (elementsToShow && (rect.top <= 0
                && rect.bottom >= 0)
                ||
                    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
                ||
                    (rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))) {
                elementsToShow.style.animation = `${this.animation}-fade-in ease ${this.animationDuration}s`;
                elementsToShow.style.animationFillMode = 'forwards';
                elementsToShow.style.animationIterationCount = 1;
                elementsToShow.style.opacity = 0;
            }
            else {
                elementsToShow.style.animation = 'none';
            }
        }
    }
    /** key up events */
    handleUpkeyEvents(e) {
        if (e.keyCode === 27 && this.isVideoShow) {
            this.isVideoShow = false;
        }
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** show the content video block */
    getContentOfVideo() {
        return (h("div", { class: `content-video ${this.orientation}` },
            h("img", { class: "content-background-img", src: this.srcPoster, alt: dxp.i18n.t('ContentItem:videoPosterImageText') }),
            h("a", { class: `play-icon ${this.playIconBottomLeft ? 'bottom-left' : 'center'}`, "aria-label": dxp.i18n.t('ContentItem:videoPlayBtnText'), onClick: ev => this.toggleVideo(true, ev), href: "" },
                h("img", { alt: dxp.i18n.t('ContentItem:videoPlayBtnText'), src: `${process.env.DXP_COMPONENT_ASSET_PATH}/images/icons/play-icon-${this.iconType}.png` }))));
    }
    /** show video overlay block */
    getVideoOverlay() {
        return (h("div", { class: "overlay-video-block" },
            h("a", { role: "button", class: "btn-close", "aria-label": dxp.i18n.t('ContentItem:close'), onClick: ev => this.toggleVideo(false, ev), href: "" },
                h("span", { class: "dxp-icon dxp-icon-large dxp-icon-close white-cross-icon", title: dxp.i18n.t('ContentItem:closeText') })),
            h("div", { class: "align-middle" },
                h("dxp-video", { type: this.type, "icon-type": this.iconType, "src-video": this.srcVideo, "src-poster": this.srcPoster, autoplay: this.autoplay, "disable-controls": this.disableControls, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }))));
    }
    /** Handler for content item click. Emits click event */
    onClickCtaCardHandler(event) {
        this.clickCtaCard.emit(event);
        this.showMore = false;
    }
    /** Handler for CTA Header right icon click. Emits click event */
    onClickCtaFavHandler(event) {
        this.clickCtaFav.emit(event);
    }
    /** Handler for content item more button click. Emits click event */
    onClickCtaMoreActionHandler(event) {
        this.clickCtaMoreAction.emit(event);
        this.showMore = false;
    }
    /** Handler for content item more button click. Emits click event */
    onClickCtaShowMore() {
        this.showMore = !this.showMore;
    }
    /** render dom of content item */
    renderContentItem() {
        const themeCheck = this.dataTheme ? `dxp ${this.dataTheme}` : this.base.componentClass();
        return (h("div", { class: `${themeCheck} column-content ${this.orientation} ${this.contentType === 'content-logo' ? 'logo-wrapper' : ''}`, tabindex: "0" },
            h("div", { class: `column-content-item ${this.headerType === 'none' ? 'content-text-only' : this.contentType}
        ${this.headerline ? 'headerline' : ''} ${this.positionOfMedia.toUpperCase() === 'RIGHT' ? ' reverse' : ''}` },
                this.orientation === 'horizontal' ?
                    // Horizontal Orientation
                    this.renderHorizontalOrientation()
                    :
                        // Vertical Orientation
                        this.renderVerticalOrientaion(),
                this.isVideoShow && this.getVideoOverlay())));
    }
    /** Render horizontal orienation */
    renderHorizontalOrientation() {
        return ([this.headerType === 'image' ?
                h("div", { class: "img-container" },
                    this.categoryTag ? h("p", { class: "item-category-tags" }, this.categoryTag) : '',
                    h("div", { class: "img-wrapper" },
                        h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive },
                            h("p", { slot: "overlay" },
                                h("slot", { name: "overlay" })))))
                :
                    this.headerType === 'video' ? this.getContentOfVideo() : '',
            h("div", { class: `content-text ${this.indentation ? 'indentation' : ''}` },
                h("div", null,
                    this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
                    this.contentItemTitle && h("h3", { class: "dxp-title-3" },
                        h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self', innerHTML: this.contentItemTitle }),
                        this.badgeText && h("span", { class: "badge-cont" },
                            h("span", { ref: el => this.badgeRef = el, class: "badge-text" }, this.badgeText))),
                    this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description ', innerHTML: this.description }),
                    h("div", { class: "cta-block", ref: el => this.ctaContainer = el },
                        h("slot", null))))]);
    }
    /** Render vertical orientation */
    renderVerticalOrientaion() {
        return ([this.contentItemType === MEDIA_TOP ?
                this.showMediaOnTop()
                : this.contentItemType === 'eyebrow-on-top' ?
                    this.showEyebrowOnTop()
                    : this.contentItemType === 'title-on-top' ?
                        this.showTitleOnTop()
                        : this.showDescriptionOnTop(),
            this.count ? h("span", { class: "account-count" }, this.count) : '',
            this.status ? h("p", { class: "access-status" },
                h("span", { class: "pending-icon icons-sprite" }),
                h("a", { href: this.statusUrl, class: "access-pending-link", target: this.statusUrlOpenInNewTab ? '_blank' : '_self' }, this.status)) : '',
            this.date ? h("span", { class: "card-date" }, this.date) : '',
            [this.contentItemType !== MEDIA_TOP &&
                    h("div", { class: "cta-block", ref: el => this.ctaContainer = el },
                        h("slot", null))],
            [this.cardMoreButton ? this.showMoreButtons() : '']
        ]);
    }
    /** show description on top */
    showDescriptionOnTop() {
        return ([this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
            this.contentItemTitle && h("h3", { class: "dxp-title-3" },
                h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self' }, this.contentItemTitle)),
            this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description' + ' dxp-lead', innerHTML: this.description }),
            this.headerType === 'image' ?
                h("div", { class: "img-wrapper" },
                    h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive },
                        h("p", { slot: "overlay" },
                            h("slot", { name: "overlay" }))))
                : this.headerType === 'video' && this.getContentOfVideo()
        ]);
    }
    /** show eyebrow on top */
    showEyebrowOnTop() {
        return ([this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
            this.headerType === 'image' ?
                h("div", { class: "img-wrapper" },
                    h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive },
                        h("p", { slot: "overlay" },
                            h("slot", { name: "overlay" }))))
                :
                    this.headerType === 'video' && this.getContentOfVideo(),
            this.contentItemTitle && h("h3", { class: "dxp-title-3" },
                h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self' }, this.contentItemTitle)),
            this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description' + ' dxp-lead', innerHTML: this.description })]);
    }
    /** show media on top */
    showMediaOnTop() {
        return ([this.headerType === 'image' ?
                h("div", { class: "img-wrapper" },
                    h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive },
                        h("p", { slot: "overlay" },
                            h("slot", { name: "overlay" }))))
                :
                    this.headerType === 'video' && this.getContentOfVideo(),
            h("div", { class: `${this.indentation ? 'indentation' : ''} content-text-wrapper` },
                this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
                this.contentItemTitle && h("h3", { class: "dxp-title-3" },
                    h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self', innerHTML: this.contentItemTitle }),
                    this.badgeText && h("span", { class: "badge-cont" },
                        h("span", { ref: el => this.badgeRef = el, class: "badge-text" }, this.badgeText))),
                this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description', innerHTML: this.description }),
                h("div", { class: "cta-block", ref: el => this.ctaContainer = el },
                    h("slot", null)))]);
    }
    /** show more buttons */
    showMoreButtons() {
        return ([
            h("a", { onClick: event => {
                    event.stopPropagation();
                    this.onClickCtaShowMore();
                }, class: `${this.buttonOneDisplayAs === 'link' ? 'column-item-link' : 'dxp-btn dxp-btn-primary'}
          ${(this.buttonOneDisplayAs === 'link' || this.ribbonType) ? 'edit-order-link' : ''}`, href: " JavaScript:void(0) " },
                h("span", { class: "more-link-icon icons-sprite" })),
            this.showMore ? [
                h("ul", { class: "card-actions" }, this.actionList && this.actionList.map((action) => h("li", { class: "card-action-items", onClick: event => { this.onClickCtaMoreActionHandler(event); } }, action.name)))
            ]
                : ''
        ]);
    }
    /** show ribbon type card item */
    showRibbonTypeCardItem() {
        return ([h("div", { class: "card-head" },
                h("span", { class: "app-kind" },
                    h("span", { class: this.headerIconLeft ? `${this.headerIconLeft} icons-sprite` : '' }),
                    h("span", { class: "card-name" }, this.headerText),
                    this.categoryLabel ? h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.categoryLabel) : '',
                    this.categoryTarget ? h("span", { class: "tag-name" }, this.categoryText) : '',
                    h("span", { onClick: event => {
                            event.stopPropagation();
                            this.onClickCtaFavHandler(event);
                        }, class: `dxp-pull-right ${this.headerIconRight} icons-sprite` })),
                (this.headerIconRight === '' || this.headerIconRight === undefined) && this.categoryTarget ?
                    h("div", { class: "img-wrapper" },
                        h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive },
                            h("p", { slot: "overlay" },
                                h("slot", { name: "overlay" })))) : '')]);
    }
    /** show title on top */
    showTitleOnTop() {
        return ([this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
            this.contentItemTitle && h("h3", { class: "dxp-title-3" },
                h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self' }, this.contentItemTitle)),
            this.headerType === 'image' ?
                h("div", { class: "img-wrapper" },
                    h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive },
                        h("p", { slot: "overlay" },
                            h("slot", { name: "overlay" }))))
                :
                    this.headerType === 'video' && this.getContentOfVideo(),
            this.description && h("p", { class: `${this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description'}
      ${this.ribbonType ? 'overview-text' : ''}`, innerHTML: this.description })]);
    }
    /** Show/hide the video  */
    toggleVideo(displayVideo, ev) {
        ev.preventDefault();
        this.isVideoShow = displayVideo;
    }
    /** Render the content-item */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme &&
                    h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.dataTheme ? this.dataTheme : this.theme}/${this.dataTheme ? this.dataTheme : this.theme}.min.css` })
            ],
            [this.theme &&
                    h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.dataTheme ? this.dataTheme : this.theme}/dxp-content-item.min.css` })
            ],
        ];
        const ribbonTypeCheck = this.ribbonType ? this.ribbonType : '';
        const categoryTargetCheck = this.categoryTarget === false ? `card ${this.heightType}` : '';
        const categoryTargetImage = this.categoryTarget ? `card-image ${this.heightType}` : '';
        return (h("div", { class: "dxp dxp-content-item", onClick: event => {
                this.onClickCtaCardHandler(event);
            }, dir: this.dir, "data-theme": this.dataTheme ? this.dataTheme : this.theme },
            styles,
            h("div", { class: `column-item ${this.headerType === 'card' && ribbonTypeCheck}
         ${this.headerType === 'card' && categoryTargetCheck}
         ${this.headerType === 'card' && categoryTargetImage}` },
                (this.headerType === 'card' && this.ribbonType) ?
                    this.showRibbonTypeCardItem() : '',
                this.renderContentItem())));
    }
    static get is() { return "dxp-content-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-content-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-content-item.css"]
    }; }
    static get properties() { return {
        "actionList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "More action button list"
            },
            "defaultValue": "[]"
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
                "text": "alt text for header image"
            },
            "attribute": "alt",
            "reflect": false
        },
        "animation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'slide-right' | 'slide-left' | 'slide-up' | 'slide-down' | 'none'",
                "resolved": "\"none\" | \"slide-down\" | \"slide-left\" | \"slide-right\" | \"slide-up\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "content item animation"
            },
            "attribute": "animation",
            "reflect": false,
            "defaultValue": "'none'"
        },
        "animationDuration": {
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
                "text": "content item animation"
            },
            "attribute": "animation-duration",
            "reflect": false,
            "defaultValue": "0"
        },
        "badgeBackgroundColor": {
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
                "text": "title badge background color"
            },
            "attribute": "badge-background-color",
            "reflect": false,
            "defaultValue": "'#25836d'"
        },
        "badgeText": {
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
                "text": "text for badge"
            },
            "attribute": "badge-text",
            "reflect": false
        },
        "badgeTextColor": {
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
                "text": "text color for badge"
            },
            "attribute": "badge-text-color",
            "reflect": false,
            "defaultValue": "'#ffffff'"
        },
        "buttonOneDisplayAs": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'link' | 'button'",
                "resolved": "\"button\" | \"link\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "CTA one display as link or button"
            },
            "attribute": "button-one-display-as",
            "reflect": false,
            "defaultValue": "'button'"
        },
        "buttonOneLinkText": {
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
                "text": "CTA one link/button text"
            },
            "attribute": "button-one-link-text",
            "reflect": false
        },
        "buttonOneOpenInNewTab": {
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
                "text": "to open in new tab or not when CTA one is clicked"
            },
            "attribute": "button-one-open-in-new-tab",
            "reflect": false
        },
        "buttonOneUrl": {
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
                "text": "link to destination"
            },
            "attribute": "button-one-url",
            "reflect": false
        },
        "buttonTwoDisplayAs": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'link' | 'button'",
                "resolved": "\"button\" | \"link\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "CTA two display as link or button"
            },
            "attribute": "button-two-display-as",
            "reflect": false,
            "defaultValue": "'button'"
        },
        "buttonTwoLinkText": {
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
                "text": "CTA two link/button text"
            },
            "attribute": "button-two-link-text",
            "reflect": false
        },
        "buttonTwoOpenInNewTab": {
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
                "text": "to open in new tab or not when CTA two is clicked"
            },
            "attribute": "button-two-open-in-new-tab",
            "reflect": false
        },
        "buttonTwoUrl": {
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
                "text": "link to destination"
            },
            "attribute": "button-two-url",
            "reflect": false
        },
        "cardMoreButton": {
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
                "text": "show card more button or not"
            },
            "attribute": "card-more-button",
            "reflect": false
        },
        "categoryLabel": {
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
                "text": "category label for dxp-content-item"
            },
            "attribute": "category-label",
            "reflect": false
        },
        "categoryTag": {
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
                "text": "category tag for dxp-content-item"
            },
            "attribute": "category-tag",
            "reflect": false
        },
        "categoryTarget": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "false",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "category text target for dxp-content-item"
            },
            "attribute": "category-target",
            "reflect": false
        },
        "categoryText": {
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
                "text": "category text for dxp-content-item"
            },
            "attribute": "category-text",
            "reflect": false
        },
        "contentItemTitle": {
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
                "text": "title url for dxp-content-item"
            },
            "attribute": "content-item-title",
            "reflect": false
        },
        "contentItemTitleTarget": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "true",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "title url for dxp-content-item"
            },
            "attribute": "content-item-title-target",
            "reflect": false
        },
        "contentItemTitleUrl": {
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
                "text": "title url for dxp-content-item"
            },
            "attribute": "content-item-title-url",
            "reflect": false
        },
        "contentItemType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'media-on-top' | 'eyebrow-on-top' | 'title-on-top' | 'description-on-top'",
                "resolved": "\"description-on-top\" | \"eyebrow-on-top\" | \"media-on-top\" | \"title-on-top\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "type of dxp-content-item; can be either media-on-top, title-on-top"
            },
            "attribute": "content-item-type",
            "reflect": false,
            "defaultValue": "MEDIA_TOP"
        },
        "contentType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'content-image-text' | 'content-small-image' | 'content-logo'",
                "resolved": "\"content-image-text\" | \"content-logo\" | \"content-small-image\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Content type of dxp-content-item."
            },
            "attribute": "content-type",
            "reflect": false,
            "defaultValue": "'content-image-text'"
        },
        "count": {
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
                "text": "count of the Content item"
            },
            "attribute": "count",
            "reflect": false
        },
        "customMuteButton": {
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
                "text": "custom mute button in case of disabled controls for HTML5 video"
            },
            "attribute": "custom-mute-button",
            "reflect": false,
            "defaultValue": "false"
        },
        "customMuteButtonPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
                "resolved": "\"bottom-left\" | \"bottom-right\" | \"top-left\" | \"top-right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "custom mute button position"
            },
            "attribute": "custom-mute-button-position",
            "reflect": false,
            "defaultValue": "'top-right'"
        },
        "dataTheme": {
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
                "text": "defines theme for child components"
            },
            "attribute": "data-theme",
            "reflect": false
        },
        "date": {
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
                "text": "date string of the Content Item"
            },
            "attribute": "date",
            "reflect": false
        },
        "description": {
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
                "text": "description for dxp-content-item"
            },
            "attribute": "description",
            "reflect": false
        },
        "descriptionTarget": {
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
                "text": "description target for dxp-content-item"
            },
            "attribute": "description-target",
            "reflect": false
        },
        "deviceHeight": {
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
                "text": "Device height"
            },
            "attribute": "device-height",
            "reflect": false
        },
        "disableControls": {
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
                "text": "disable video controls"
            },
            "attribute": "disable-controls",
            "reflect": false
        },
        "enableOverlay": {
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
                "text": "set overlay to true or false on header image"
            },
            "attribute": "enable-overlay",
            "reflect": false
        },
        "eyebrowText": {
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
                "text": "eyebrow text for dxp-content-item"
            },
            "attribute": "eyebrow-text",
            "reflect": false
        },
        "focalPoints": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "focal point for header image"
            },
            "attribute": "focal-points",
            "reflect": false
        },
        "headerIconLeft": {
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
                "text": "Left Head icon of the Content item"
            },
            "attribute": "header-icon-left",
            "reflect": false
        },
        "headerIconRight": {
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
                "text": "Right Head icon of the Content item"
            },
            "attribute": "header-icon-right",
            "reflect": false
        },
        "headerline": {
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
                "text": "whether borderline should use"
            },
            "attribute": "headerline",
            "reflect": false
        },
        "headerText": {
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
                "text": "Header text of the Content Item"
            },
            "attribute": "header-text",
            "reflect": false
        },
        "headerType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'image' | 'none' | 'video' | 'card'",
                "resolved": "\"card\" | \"image\" | \"none\" | \"video\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "header type of dxp-content-item. Can be either image or none"
            },
            "attribute": "header-type",
            "reflect": false,
            "defaultValue": "'image'"
        },
        "heightType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'small' | 'large'",
                "resolved": "\"large\" | \"small\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "header type of dxp-content-item. Can be either image or none"
            },
            "attribute": "height-type",
            "reflect": false,
            "defaultValue": "'large'"
        },
        "href": {
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
                "text": "link to destination from header"
            },
            "attribute": "href",
            "reflect": false
        },
        "iconType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'light' | 'dark'",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "icon type for header video"
            },
            "attribute": "icon-type",
            "reflect": false,
            "defaultValue": "'light'"
        },
        "imageTitle": {
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
                "text": "title for header image"
            },
            "attribute": "image-title",
            "reflect": false
        },
        "indentation": {
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
                "text": "whether content indentation should use"
            },
            "attribute": "indentation",
            "reflect": false,
            "defaultValue": "true"
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
                "text": "header link open in new tab or not"
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "orientation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'horizontal' | 'vertical'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "orientation of dxp-content-item"
            },
            "attribute": "orientation",
            "reflect": false,
            "defaultValue": "'vertical'"
        },
        "playIconBottomLeft": {
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
                "text": "to align play icon on bottom left side"
            },
            "attribute": "play-icon-bottom-left",
            "reflect": false,
            "defaultValue": "false"
        },
        "positionOfMedia": {
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
                "text": "position Of image/video"
            },
            "attribute": "position-of-media",
            "reflect": false,
            "defaultValue": "'Left'"
        },
        "responsive": {
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
                "text": "whether image should use its size or be responsive"
            },
            "attribute": "responsive",
            "reflect": false,
            "defaultValue": "true"
        },
        "ribbonType": {
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
                "text": "type of the application"
            },
            "attribute": "ribbon-type",
            "reflect": false
        },
        "src": {
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
                "text": "path of image if the header type is set to image"
            },
            "attribute": "src",
            "reflect": false
        },
        "srcPoster": {
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
                "text": "poster url that will be shown on video if headerType is video"
            },
            "attribute": "src-poster",
            "reflect": false
        },
        "srcVideo": {
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
                "text": "src-video of video"
            },
            "attribute": "src-video",
            "reflect": false
        },
        "status": {
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
                "text": "Status of the application"
            },
            "attribute": "status",
            "reflect": false
        },
        "statusUrl": {
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
                "text": "Status url of the application"
            },
            "attribute": "status-url",
            "reflect": false
        },
        "statusUrlOpenInNewTab": {
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
                "text": "Status url of the application"
            },
            "attribute": "status-url-open-in-new-tab",
            "reflect": false
        },
        "type": {
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
                "text": "type of video. can be either youtube, vimeo etc"
            },
            "attribute": "type",
            "reflect": false
        },
        "videoDescription": {
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
                "text": "description of video"
            },
            "attribute": "video-description",
            "reflect": false
        },
        "videoName": {
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
                "text": "name of video"
            },
            "attribute": "video-name",
            "reflect": false
        },
        "videoUploadDate": {
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
                "text": "video upload date"
            },
            "attribute": "video-upload-date",
            "reflect": false
        },
        "ctaData": {
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
                "text": "cta data for child components"
            },
            "attribute": "cta-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "autoplay": {},
        "dir": {},
        "isVideoShow": {},
        "showMore": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "clickCtaCard",
            "name": "clickCtaCard",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA content item click event. Emitted when CTA appcard is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickCtaFav",
            "name": "clickCtaFav",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA header right icon click event. Emitted when CTA fav icon is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickCtaMoreAction",
            "name": "clickCtaMoreAction",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA more button actions click event. Emitted when CTA More action is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clickCtaOne",
            "name": "clickCtaOne",
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
        }, {
            "method": "clickCtaTwo",
            "name": "clickCtaTwo",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "CTA two click event. Emitted when CTA two is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "ctaData",
            "methodName": "ctaDataChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "handleScroll",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "keyup",
            "method": "handleUpkeyEvents",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
