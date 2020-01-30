import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const IMAGE_BACKGROUND_TYPE = 'image-background';
const VIDEO_BACKGROUND_TYPE = 'video-background';
const SOLID_BACKGROUND_TYPE = 'solid-background';
const BANNER_VIDEO = 'banner-with-video';
const XL_VIDEO = 'extra-long';
/** dxp-banner-image-overlay */
export class BannerImageOverlay {
    constructor() {
        /** display video on full height */
        this.displayVideoOnFullHeight = true;
        /** show the video on condition */
        this.isVideoShow = false;
        /** add circle design over banner */
        this.addCircle = false;
        /** animation for overlay content and CTA */
        this.animation = false;
        /** custom mute button in case of disabled controls for HTML5 video */
        this.customMuteButton = false;
        /** custom mute button position */
        this.customMuteButtonPosition = 'top-right';
        /** Video mute option */
        this.muted = true;
        /** show/hide text contents over image overlay banner */
        this.showContentSm = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'BannerImageOverlay', messages);
        /** banner size is by default extra long for 'banner-with-video' banner type */
        if (this.bannerType === BANNER_VIDEO) {
            this.bannerSize = XL_VIDEO;
        }
        this.cssClass = [((this.enableOverlay === 'true') ? 'sub-feature-bg-block' : 'sub-feature-image'), 'js-fontsize', this.bannerSize, this.backgroundType,
            ((this.addCircle === true && this.backgroundType === SOLID_BACKGROUND_TYPE) ? 'css-circle-banner' : '')].join(' ');
        this.overlayClass = ['overlay-content', ((this.enableOverlay === 'true') ? `${this.overlayPosition} white-block` : ''),
            ((this.showContentSm && this.enableOverlay === 'true') ? 'display-text' : '')].join(' ');
        this.imagePresentClass = ['img-parent', ((this.bannerType === BANNER_VIDEO) ? 'full-width-of-img' : '')].join(' ');
        if (this.bannerSize === 'medium' && this.enableOverlay === 'false' && window.innerWidth < 768) {
            this.responsive = true;
        }
    }
    /** Actions to perform after component load */
    componentDidLoad() {
        this.applyWindowHeight();
        window.addEventListener('orientationchange', () => {
            dxp.log.debug(this.element.tagName, 'componentDidLoad()', `inside orientationchange`);
            setTimeout(() => {
                this.responsive = this.base.returnBooleanValue(this.bannerSize === 'medium' && this.enableOverlay === 'false' && window.innerWidth < 768);
                this.applyWindowHeight();
            }, 200);
        });
    }
    /** mouse click events */
    handleClickEvents(event) {
        this.scrollWebPage(event);
        this.base.routingEventListener(event);
    }
    /** keyboard event */
    handleKeypressEvents(e) {
        if (e.keyCode === 13) {
            this.scrollWebPage(e);
        }
    }
    /** key up events */
    handleUpkeyEvents(e) {
        if (e.keyCode === 27 && this.isVideoShow) {
            this.isVideoShow = false;
        }
    }
    /** height for solid background */
    applyHeightsolidBackground(subFeatureImg) {
        const windowHeight = window.innerHeight;
        const extraLong = this.element ? this.element.querySelector('.extra-long') : this.element.querySelector('.extra-long');
        if (window.innerWidth >= 992 && extraLong && subFeatureImg) {
            subFeatureImg.style.height = `${windowHeight}px`;
            subFeatureImg.style.maxHeight = '100%';
        }
        else if (window.innerWidth < 992 && extraLong && subFeatureImg) {
            dxp.log.debug(this.element.tagName, 'applyWindowHeight()', `inside applyWindowHeight in else block`);
            subFeatureImg.removeAttribute('style');
        }
        if (this.addCircle && this.backgroundType === SOLID_BACKGROUND_TYPE && extraLong && subFeatureImg) {
            this.designCircle(windowHeight, subFeatureImg);
        }
    }
    /** Apply window height to banner */
    applyWindowHeight() {
        const subFeatureImg = this.element ? this.element.querySelector('.sub-feature-image') : this.element.querySelector('.sub-feature-image');
        const imgPresent = this.element ? this.element.querySelector('.img-parent') : this.element.querySelector('.img-parent');
        switch (this.backgroundType) {
            case VIDEO_BACKGROUND_TYPE: {
                if (this.bannerSize === XL_VIDEO) {
                    subFeatureImg.style.maxHeight = '100%';
                    imgPresent.style.height = '100vh';
                }
                break;
            }
            case IMAGE_BACKGROUND_TYPE:
            case SOLID_BACKGROUND_TYPE: {
                this.applyHeightsolidBackground(subFeatureImg);
                break;
            }
            default: dxp.log.error('Invalid background type');
        }
    }
    /** Check the current position of the banner button. The remains visible portion will scroll up to hide the banner completely  */
    currentPos(target) {
        const currentButtonPos = target.parentElement.getClientRects()[0].bottom;
        if (currentButtonPos > 0) {
            window.scrollBy(0, currentButtonPos);
        }
    }
    /** design css circle as per window height for extra-long banner */
    designCircle(windowHeight, subFeatureImg) {
        const subFeatureImgAfter = subFeatureImg.querySelector('.after-span');
        const subFeatureImgBefore = subFeatureImg.querySelector('.before-span');
        if (window.innerWidth >= 992) {
            subFeatureImgBefore.style.cssText = `width:${windowHeight + 647}px;height:${windowHeight + 647}px;`;
            subFeatureImgAfter.style.cssText = `width:${windowHeight + 465}px;height:${windowHeight + 465}px;`;
        }
        else if (window.innerWidth >= 768) {
            subFeatureImgAfter.style.cssText = `width:${windowHeight + 558}px;height:${windowHeight + 558}px;`;
        }
        else {
            subFeatureImgBefore.style.cssText = `width:${windowHeight + 162}px;height:${windowHeight + 162}px;`;
            subFeatureImgAfter.style.cssText = `width:${windowHeight + 128}px;height:${windowHeight + 128}px;`;
        }
    }
    /** Render Baner image overlay */
    renderBanerImageOverlay() {
        return (h("div", { class: this.overlayClass },
            h("div", { class: this.animation && 'overlay-content-animation' },
                (this.bannerType === BANNER_VIDEO) &&
                    h("a", { "aria-label": dxp.i18n.t('BannerImageOverlay:videoPlayBtnText'), onClick: ev => this.toggleVideo(true, ev), href: "" },
                        h("img", { class: "play-icon", alt: dxp.i18n.t('BannerImageOverlay:videoPlayBtnAltText'), src: (this.srcVideoPlayImage && this.srcVideoPlayImage.length !== 0) ?
                                this.srcVideoPlayImage
                                :
                                    `${process.env.DXP_COMPONENT_ASSET_PATH}/dxp-banner/play-icon-${this.iconType}.png` })),
                this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }),
                this.titleText &&
                    h("h1", { class: (this.bannerSize === XL_VIDEO || this.bannerSize === 'long') && this.enableOverlay !== 'true' ? 'dxp-heading-lg' : undefined, innerHTML: this.titleText }),
                this.subTitle && h("p", { class: "lead block-with-text", innerHTML: this.subTitle })),
            this.animation ?
                h("div", { class: "slot-wrapper" },
                    h("slot", null)) : h("slot", null)));
    }
    /** Render solid background */
    renderSolidBackground() {
        return (h("div", { class: this.imagePresentClass },
            this.backgroundType === IMAGE_BACKGROUND_TYPE &&
                h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive }),
            this.backgroundType === VIDEO_BACKGROUND_TYPE && this.bannerSize !== 'short' &&
                h("dxp-video", { type: this.videoType, "full-height": this.displayVideoOnFullHeight, "src-video": this.srcVideo, autoplay: this.autoPlay, "disable-controls": this.disableControls, "src-poster": this.srcPoster, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate, muted: this.muted })));
    }
    /** Scroll web page with down arrow button */
    scrollWebPage(e) {
        const target = e.target ? e.composedPath()[0] : e.target;
        if (target.classList.contains('dxp-down-arrow')) {
            const bottom = e.target.parentElement.getClientRects()[0].bottom + 3;
            const scrollStep = 10;
            let sum = 0;
            const scrollInterval = setInterval(() => {
                sum += scrollStep;
                if (bottom >= sum) {
                    window.scrollBy(0, scrollStep);
                }
                else {
                    clearInterval(scrollInterval);
                    this.currentPos(target);
                }
            }, 0);
        }
    }
    /** Show/hide the video */
    toggleVideo(displayVideo, ev) {
        ev.preventDefault();
        this.isVideoShow = displayVideo;
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-image-overlay render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })],
        ];
        if (this.bannerType === 'image-overlay' || this.bannerType === BANNER_VIDEO) {
            return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme },
                styles,
                this.isVideoShow &&
                    h("div", { class: "overlay-video-block" },
                        h("span", { role: "button", class: "btn-close", id: "closeBtn", onClick: ev => this.toggleVideo(false, ev) },
                            h("span", { class: "dxp-icon dxp-icon-close white-cross-icon" })),
                        h("div", { class: "align-middle" },
                            h("dxp-video", { type: this.videoType, "src-video": this.srcVideo, "icon-type": this.iconType, "disable-controls": this.disableControls, autoplay: this.autoPlay, "src-poster": this.srcPoster, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate, muted: this.muted }))),
                h("div", { dir: this.dir, id: "sub-feature-image", class: this.cssClass },
                    this.addCircle ? h("span", { class: "before-span" }) : '',
                    this.categoryTag ? h("p", { class: "category-tags" }, this.categoryTag) : '',
                    (this.backgroundType !== SOLID_BACKGROUND_TYPE) &&
                        this.renderSolidBackground(),
                    this.renderBanerImageOverlay(),
                    this.pageScrollDownArrow && (this.bannerSize === XL_VIDEO || this.bannerSize === 'long') ?
                        h("span", { tabindex: "0", class: "dxp-down-arrow", role: "button", "aria-label": dxp.i18n.t('BannerImageOverlay:pageScrollDown') })
                        : '',
                    this.addCircle ? h("span", { class: "after-span" }) : '')));
        }
    }
    static get is() { return "dxp-banner-image-overlay"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-image-overlay.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-image-overlay.css"]
    }; }
    static get properties() { return {
        "addCircle": {
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
                "text": "add circle design over banner"
            },
            "attribute": "add-circle",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "alt Text"
            },
            "attribute": "alt",
            "reflect": false
        },
        "animation": {
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
                "text": "animation for overlay content and CTA"
            },
            "attribute": "animation",
            "reflect": false,
            "defaultValue": "false"
        },
        "autoPlay": {
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
                "text": "auto play video"
            },
            "attribute": "auto-play",
            "reflect": false
        },
        "backgroundType": {
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
                "text": "background type of Hero Banner like Image, Video, Solid"
            },
            "attribute": "background-type",
            "reflect": false
        },
        "bannerSize": {
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
                "text": "banner size"
            },
            "attribute": "banner-size",
            "reflect": false
        },
        "bannerType": {
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
                "text": "banner type"
            },
            "attribute": "banner-type",
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
                "text": "category"
            },
            "attribute": "category-tag",
            "reflect": false
        },
        "cta": {
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
                "text": "cta attributes"
            },
            "attribute": "cta",
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
                "text": "enable overlay"
            },
            "attribute": "enable-overlay",
            "reflect": false
        },
        "eyebrowTitle": {
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
                "text": "eyebrow title"
            },
            "attribute": "eyebrow-title",
            "reflect": false
        },
        "focalPoint": {
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
                "text": "focal Point"
            },
            "attribute": "focal-point",
            "reflect": false
        },
        "focalPointLg": {
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
                "text": "focal point for large devices"
            },
            "attribute": "focal-point-lg",
            "reflect": false
        },
        "focalPointMd": {
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
                "text": "focal point for medium devices"
            },
            "attribute": "focal-point-md",
            "reflect": false
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
                "text": "image Href"
            },
            "attribute": "href",
            "reflect": false
        },
        "iconType": {
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
                "text": "video play icon type e.g light, dark"
            },
            "attribute": "icon-type",
            "reflect": false
        },
        "imageEnableOverlay": {
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
                "text": "position Of Image"
            },
            "attribute": "image-enable-overlay",
            "reflect": false
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
                "text": "image Title"
            },
            "attribute": "image-title",
            "reflect": false
        },
        "muted": {
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
                "text": "Video mute option"
            },
            "attribute": "muted",
            "reflect": false,
            "defaultValue": "true"
        },
        "openInNewTab": {
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
                "text": "Open in new tab"
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "overlayPosition": {
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
                "text": "overlay Position"
            },
            "attribute": "overlay-position",
            "reflect": false
        },
        "pageScrollDownArrow": {
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
                "text": "Web page scroll down"
            },
            "attribute": "page-scroll-down-arrow",
            "reflect": false
        },
        "positionOfImage": {
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
                "text": "position Of Image"
            },
            "attribute": "position-of-image",
            "reflect": false
        },
        "responsive": {
            "type": "boolean",
            "mutable": true,
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
            "reflect": false
        },
        "showContentSm": {
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
                "text": "show/hide text contents over image overlay banner"
            },
            "attribute": "show-content-sm",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "image source"
            },
            "attribute": "src",
            "reflect": false
        },
        "srcLg": {
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
                "text": "source lg"
            },
            "attribute": "src-lg",
            "reflect": false
        },
        "srcMd": {
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
                "text": "source md"
            },
            "attribute": "src-md",
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
                "text": "poster link Of video"
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
                "text": "source Of video"
            },
            "attribute": "src-video",
            "reflect": false
        },
        "srcVideoPlayImage": {
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
                "text": "video play image icon"
            },
            "attribute": "src-video-play-image",
            "reflect": false
        },
        "subTitle": {
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
                "text": "subtitle"
            },
            "attribute": "sub-title",
            "reflect": false
        },
        "titleText": {
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
                "text": "title text"
            },
            "attribute": "title-text",
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
        "videoType": {
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
                "text": "video type like youtube, youku, akamai etc"
            },
            "attribute": "video-type",
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
                "text": "video first published date"
            },
            "attribute": "video-upload-date",
            "reflect": false
        }
    }; }
    static get states() { return {
        "cssClass": {},
        "dir": {},
        "displayVideoOnFullHeight": {},
        "imagePresentClass": {},
        "isVideoShow": {},
        "locale": {},
        "overlayClass": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClickEvents",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "keypress",
            "method": "handleKeypressEvents",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keyup",
            "method": "handleUpkeyEvents",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
