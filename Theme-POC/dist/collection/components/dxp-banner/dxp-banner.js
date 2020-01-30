import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
const CTA_LIST = 'dxp-cta-list';
/** dxp-banner */
export class Banner {
    constructor() {
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
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler() {
        if (this.cta) {
            this.base.createNestedMarkup(this.ctaContainer, CTA_LIST, this.cta);
            this.ctaContainerUpdate(this.element);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.changeImageProp();
        this.base = new BaseComponent(this, dxp);
        if (this.src || this.srcLg || this.srcMd) {
            this.applyDefaultFocalPoint();
        }
    }
    /** actions to be performed after the component loading */
    componentDidLoad() {
        this.ctaChangeHandler();
        this.applyImgWidthAuto();
        const banner = this.element;
        const bannerElement = banner && banner ? banner : banner;
        const bannerType = bannerElement && (bannerElement.querySelector('dxp-banner-benefits-hero') || bannerElement.querySelector('dxp-banner-small-image')
            || bannerElement.querySelector('dxp-banner-image-overlay') || bannerElement.querySelector('dxp-banner-regular'));
        const imgComp = bannerType && (bannerType ? bannerType.querySelector('dxp-image') : bannerType.querySelector('dxp-image'));
        if (imgComp) {
            imgComp.componentOnReady().then(res => {
                if (res) {
                    const img = res ? res.querySelector('img') : res.querySelector('img');
                    img.classList.add('full-width-lg');
                }
            });
        }
        if (!this.cta) {
            this.ctaContainerUpdate(banner);
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** apply default focal point if invalid focal point */
    applyDefaultFocalPoint() {
        this.focalPoint = this.validateFocalPoint(this.focalPoint);
        this.focalPointLg = this.validateFocalPoint(this.focalPointLg);
        this.focalPointMd = this.validateFocalPoint(this.focalPointMd);
    }
    /** Apply the width value as 'auto' to all broken images to resolve the IE issue */
    applyImgWidthAuto() {
        const imgs = this.element.querySelectorAll('img');
        // 'width' provided by the css will not apply on broken image
        for (const i of Object.keys(imgs)) {
            imgs[i].onerror = function () { this.style.width = 'auto'; };
        }
    }
    /** change image properties as per banner type */
    changeImageProp() {
        if (['small-image', 'benefits-hero'].includes(this.bannerType)) {
            this.responsive = true;
            this.positionOfImageClass = (this.positionOfImage.toUpperCase() === 'RIGHT') ? ' reverse' : '';
        }
        else {
            this.responsive = false;
            if (this.bannerType === 'regular-banner' && window.innerWidth < 768) {
                this.responsive = true;
            }
        }
    }
    /** check dxp-cta-list is present and add classes */
    ctaContainerUpdate(banner) {
        let ctaList = banner.querySelector(CTA_LIST);
        ctaList = ctaList ? ctaList : banner.querySelector(CTA_LIST);
        if (ctaList) {
            ctaList.componentOnReady().then(res => {
                if (res) {
                    this.ctaContainer.classList.add(res.orientation);
                    this.ctaContainer.classList.add(this.bannerType);
                    this.ctaContainer.classList.add(`${this.bannerSize}-size`);
                }
            }).catch(error => {
                dxp.log.error(this.element.tagName, 'ctaContainerUpdate()', 'Error message: fail to fetch cta list - ', error);
            });
        }
    }
    /** validate focal point */
    validateFocalPoint(focalpt) {
        if (focalpt !== undefined) {
            try {
                const focalPointArr = typeof focalpt === 'string' && focalpt.length !== 0 ? JSON.parse(focalpt) : focalpt;
                if (focalPointArr.length === 2 && focalPointArr[0] <= 10 && focalPointArr[1] <= 10) {
                    return focalpt;
                }
                dxp.log.info(this.element.tagName, 'applyDefaultFocalPoint()', 'Focal point values must be between 0 to 10');
                return '[5, 5]';
            }
            catch (err) {
                dxp.log.error(this.element.tagName, 'applyDefaultFocalPoint()', 'Error message: focal point values are not valid values - ', err);
                return '[5, 5]';
            }
        }
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            this.bannerType === 'solid-background' ?
                h("dxp-banner-solid-background", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "overlay-position": this.overlayPosition, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "data-theme": this.theme },
                    h("div", { class: "cta-container", ref: el => this.ctaContainer = el },
                        h("slot", null)),
                    h("div", { class: "indicators-placeholder" }))
                : '',
            this.bannerType === 'image-overlay' ?
                h("dxp-banner-image-overlay", { "add-circle": this.addCircle, animation: this.animation, "banner-type": this.bannerType, "background-type": this.backgroundType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "show-content-sm": this.showContentSm, "category-tag": this.categoryTag, "enable-overlay": this.enableOverlay, "overlay-position": this.overlayPosition, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "page-scroll-down-arrow": this.pageScrollDownArrow, "data-theme": this.theme, "video-type": this.videoType, "src-video": this.srcVideo, "src-poster": this.srcPoster, "disable-controls": this.disableControls, "auto-play": this.autoPlay, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate, muted: this.muted },
                    h("div", { class: "cta-container", ref: el => this.ctaContainer = el },
                        h("slot", null)),
                    h("div", { class: "indicators-placeholder" }))
                : '',
            this.bannerType === 'in-page-search' ?
                h("dxp-banner-image-overlay", { "add-circle": this.addCircle, animation: this.animation, "banner-type": "image-overlay", "background-type": this.backgroundType, "banner-size": "medium", "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "category-tag": this.categoryTag, "enable-overlay": "false", "overlay-position": this.overlayPosition, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "data-theme": this.theme },
                    h("div", { class: "search-container" },
                        h("dxp-search", { "search-type": "simple", "result-page-extension": this.searchResultPageExtension, placeholder: this.searchPlaceholder, "show-suggestions": "false", "search-box-size": "sm", "result-page-url": this.searchResultPageUrl, "search-param-key": this.searchParamKey, "data-theme": this.theme })))
                : '',
            this.bannerType === 'banner-with-video' ?
                h("dxp-banner-image-overlay", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "enable-overlay": this.enableOverlay, "overlay-position": this.overlayPosition, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "video-type": this.videoType, "src-video": this.srcVideo, "auto-play": this.autoPlay, "src-poster": this.srcPoster, "icon-type": this.iconType, "src-video-play-image": this.srcVideoPlayImage, "data-theme": this.theme, "disable-controls": this.disableControls, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate },
                    h("div", { class: "cta-container", ref: el => this.ctaContainer = el },
                        h("slot", null)))
                : '',
            this.bannerType === 'small-image' ?
                h("dxp-banner-small-image", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, src: this.src, "custom-id": this.customId, "card-color": this.cardColor, "text-color": this.textColor, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, "container-fluid": this.containerFluid, href: this.href, "open-in-new-tab": this.openInNewTab, "image-enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "position-of-image-class": this.positionOfImageClass, "data-theme": this.theme },
                    h("div", { class: "cta-container", ref: el => this.ctaContainer = el },
                        h("slot", null)),
                    h("div", { class: "indicators-placeholder spacer" }))
                : '',
            this.bannerType === 'benefits-hero' ?
                h("dxp-banner-benefits-hero", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "custom-id": this.customId, "card-color": this.cardColor, "text-color": this.textColor, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "image-enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "position-of-image-class": this.positionOfImageClass, "data-theme": this.theme },
                    h("div", { class: "cta-container", ref: el => this.ctaContainer = el },
                        h("slot", null)),
                    h("div", { class: "indicators-placeholder" }))
                : '',
            this.bannerType === 'regular-banner' ?
                h("dxp-banner-regular", { "add-circle": this.addCircle, animation: this.animation, "background-type": this.backgroundType, "banner-type": this.bannerType, "overlay-position": this.overlayPosition, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "data-theme": this.theme, "video-type": this.videoType, "src-video": this.srcVideo, "src-poster": this.srcPoster, "disable-controls": this.disableControls, "auto-play": this.autoPlay, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate },
                    h("div", { class: "cta-container", ref: el => this.ctaContainer = el },
                        h("slot", null)),
                    h("div", { class: "indicators-placeholder" }))
                : ''));
    }
    static get is() { return "dxp-banner"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner.css"]
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
                "text": "Auto play video"
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
                "text": "background type for regular hero and banner"
            },
            "attribute": "background-type",
            "reflect": false
        },
        "bannerSize": {
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
        "cardColor": {
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
                "text": "slide background color"
            },
            "attribute": "card-color",
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
        "containerFluid": {
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
                "text": "Enable disable out of the box padding & margin around component"
            },
            "attribute": "container-fluid",
            "reflect": false
        },
        "customId": {
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
                "text": "to give custom id to banner"
            },
            "attribute": "custom-id",
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
                "text": "focal Points"
            },
            "attribute": "focal-point",
            "reflect": false
        },
        "focalPointLg": {
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
                "text": "focal point for large devices"
            },
            "attribute": "focal-point-lg",
            "reflect": false
        },
        "focalPointMd": {
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
                "text": "overlay for Image"
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
                "text": "Web page scroll with this button. Listen on bottom side of banner"
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
        "searchParamKey": {
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
                "text": "key of the query that is to be sent to results page"
            },
            "attribute": "search-param-key",
            "reflect": false
        },
        "searchPlaceholder": {
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
                "text": "placeholder for search in in-page-search banner"
            },
            "attribute": "search-placeholder",
            "reflect": false
        },
        "searchResultPageExtension": {
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
                "text": "extension of search result page for in page search banner"
            },
            "attribute": "search-result-page-extension",
            "reflect": false
        },
        "searchResultPageUrl": {
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
                "text": "result page URL for in page search banner"
            },
            "attribute": "search-result-page-url",
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
                "text": "image of video play"
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
        "textColor": {
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
                "text": "slide text color"
            },
            "attribute": "text-color",
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
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "positionOfImageClass": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "cta",
            "methodName": "ctaChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
