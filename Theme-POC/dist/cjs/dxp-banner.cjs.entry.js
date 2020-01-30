'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const CTA_LIST = 'dxp-cta-list';
const Banner = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
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
                core$1.dxp.log.error(this.element.tagName, 'ctaContainerUpdate()', 'Error message: fail to fetch cta list - ', error);
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
                core$1.dxp.log.info(this.element.tagName, 'applyDefaultFocalPoint()', 'Focal point values must be between 0 to 10');
                return '[5, 5]';
            }
            catch (err) {
                core$1.dxp.log.error(this.element.tagName, 'applyDefaultFocalPoint()', 'Error message: focal point values are not valid values - ', err);
                return '[5, 5]';
            }
        }
    }
    /** Render the banner */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })]
        ];
        return (core$1.h("div", { dir: this.dir, class: this.base.componentClass(), "data-theme": this.theme }, styles, this.bannerType === 'solid-background' ?
            core$1.h("dxp-banner-solid-background", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "overlay-position": this.overlayPosition, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "data-theme": this.theme }, core$1.h("div", { class: "cta-container", ref: el => this.ctaContainer = el }, core$1.h("slot", null)), core$1.h("div", { class: "indicators-placeholder" }))
            : '', this.bannerType === 'image-overlay' ?
            core$1.h("dxp-banner-image-overlay", { "add-circle": this.addCircle, animation: this.animation, "banner-type": this.bannerType, "background-type": this.backgroundType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "show-content-sm": this.showContentSm, "category-tag": this.categoryTag, "enable-overlay": this.enableOverlay, "overlay-position": this.overlayPosition, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "page-scroll-down-arrow": this.pageScrollDownArrow, "data-theme": this.theme, "video-type": this.videoType, "src-video": this.srcVideo, "src-poster": this.srcPoster, "disable-controls": this.disableControls, "auto-play": this.autoPlay, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate, muted: this.muted }, core$1.h("div", { class: "cta-container", ref: el => this.ctaContainer = el }, core$1.h("slot", null)), core$1.h("div", { class: "indicators-placeholder" }))
            : '', this.bannerType === 'in-page-search' ?
            core$1.h("dxp-banner-image-overlay", { "add-circle": this.addCircle, animation: this.animation, "banner-type": "image-overlay", "background-type": this.backgroundType, "banner-size": "medium", "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "category-tag": this.categoryTag, "enable-overlay": "false", "overlay-position": this.overlayPosition, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "data-theme": this.theme }, core$1.h("div", { class: "search-container" }, core$1.h("dxp-search", { "search-type": "simple", "result-page-extension": this.searchResultPageExtension, placeholder: this.searchPlaceholder, "show-suggestions": "false", "search-box-size": "sm", "result-page-url": this.searchResultPageUrl, "search-param-key": this.searchParamKey, "data-theme": this.theme })))
            : '', this.bannerType === 'banner-with-video' ?
            core$1.h("dxp-banner-image-overlay", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, "enable-overlay": this.enableOverlay, "overlay-position": this.overlayPosition, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "video-type": this.videoType, "src-video": this.srcVideo, "auto-play": this.autoPlay, "src-poster": this.srcPoster, "icon-type": this.iconType, "src-video-play-image": this.srcVideoPlayImage, "data-theme": this.theme, "disable-controls": this.disableControls, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }, core$1.h("div", { class: "cta-container", ref: el => this.ctaContainer = el }, core$1.h("slot", null)))
            : '', this.bannerType === 'small-image' ?
            core$1.h("dxp-banner-small-image", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, src: this.src, "custom-id": this.customId, "card-color": this.cardColor, "text-color": this.textColor, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, "container-fluid": this.containerFluid, href: this.href, "open-in-new-tab": this.openInNewTab, "image-enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "position-of-image-class": this.positionOfImageClass, "data-theme": this.theme }, core$1.h("div", { class: "cta-container", ref: el => this.ctaContainer = el }, core$1.h("slot", null)), core$1.h("div", { class: "indicators-placeholder spacer" }))
            : '', this.bannerType === 'benefits-hero' ?
            core$1.h("dxp-banner-benefits-hero", { "banner-type": this.bannerType, "banner-size": this.bannerSize, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "custom-id": this.customId, "card-color": this.cardColor, "text-color": this.textColor, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, href: this.href, "open-in-new-tab": this.openInNewTab, "image-enable-overlay": this.imageEnableOverlay, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "position-of-image": this.positionOfImage, "position-of-image-class": this.positionOfImageClass, "data-theme": this.theme }, core$1.h("div", { class: "cta-container", ref: el => this.ctaContainer = el }, core$1.h("slot", null)), core$1.h("div", { class: "indicators-placeholder" }))
            : '', this.bannerType === 'regular-banner' ?
            core$1.h("dxp-banner-regular", { "add-circle": this.addCircle, animation: this.animation, "background-type": this.backgroundType, "banner-type": this.bannerType, "overlay-position": this.overlayPosition, "eyebrow-title": this.eyebrowTitle, "title-text": this.titleText, "sub-title": this.subTitle, src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, "image-title": this.imageTitle, alt: this.alt, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, "data-theme": this.theme, "video-type": this.videoType, "src-video": this.srcVideo, "src-poster": this.srcPoster, "disable-controls": this.disableControls, "auto-play": this.autoPlay, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }, core$1.h("div", { class: "cta-container", ref: el => this.ctaContainer = el }, core$1.h("slot", null)), core$1.h("div", { class: "indicators-placeholder" }))
            : ''));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "cta": ["ctaChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-banner div.dxp.dxp-banner:after,div.dxp.dxp-banner div.dxp.dxp-banner:before{content:\"\";display:table}div.dxp.dxp-banner div.dxp.dxp-banner:after{clear:both}\@media (min-width:576px){div.dxp.dxp-banner .dxp-cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner .dxp-cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:61.5%}div.dxp.dxp-banner .dxp-cta-banner,div.dxp.dxp-banner .sub-feature-bg-block,div.dxp.dxp-banner .sub-feature-default,div.dxp.dxp-banner .sub-feature-image{max-height:800px;overflow:hidden;position:relative}}\@media (min-width:992px){div.dxp.dxp-banner .dxp-cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:54.6%}div.dxp.dxp-banner .dxp-cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .dxp-cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner .dxp-cta-banner,div.dxp.dxp-banner .sub-feature-bg-block,div.dxp.dxp-banner .sub-feature-default,div.dxp.dxp-banner .sub-feature-image{max-height:720px;overflow:hidden;position:relative}}\@media (min-width:1200px){div.dxp.dxp-banner .dxp-cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner .dxp-cta-banner .overlay-content p:last-child,div.dxp.dxp-banner .sub-feature-default .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner .dxp-cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .dxp-cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(2){width:auto}div.dxp.dxp-banner .dxp-cta-banner,div.dxp.dxp-banner .sub-feature-bg-block,div.dxp.dxp-banner .sub-feature-default,div.dxp.dxp-banner .sub-feature-image{max-height:784px;overflow:hidden;position:relative}}\@media (max-width:575px){div.dxp.dxp-banner .dxp-cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner .dxp-cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner .dxp-cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-links{display:block}div.dxp.dxp-banner .cta-links .visit-link:first-child{margin-right:0}div.dxp.dxp-banner .dxp-cta-banner,div.dxp.dxp-banner .sub-feature-bg-block,div.dxp.dxp-banner .sub-feature-default,div.dxp.dxp-banner .sub-feature-image{max-height:614px;overflow:hidden}}div.dxp.dxp-banner .long{height:592px;position:relative;overflow:hidden}div.dxp.dxp-banner .long .dxp-title-eyebrow{letter-spacing:1.8px}div.dxp.dxp-banner .long .overlay-content .lead{line-height:32px;margin-bottom:0}div.dxp.dxp-banner .long .overlay-content h1:last-child{margin-bottom:0}div.dxp.dxp-banner .long.cta-banner,div.dxp.dxp-banner .long.sub-feature-bg-block,div.dxp.dxp-banner .long.sub-feature-default,div.dxp.dxp-banner .long.sub-feature-image{max-height:592px;overflow:hidden;position:relative}\@media (min-width:576px){div.dxp.dxp-banner .cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner .cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:61.5%}}\@media (min-width:992px){div.dxp.dxp-banner .cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:54.6%}div.dxp.dxp-banner .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px){div.dxp.dxp-banner .cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner .cta-banner .overlay-content p:last-child,div.dxp.dxp-banner .sub-feature-default .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(2){width:auto}}\@media (max-width:575px){div.dxp.dxp-banner .cta-banner .overlay-content,div.dxp.dxp-banner .sub-feature-default .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner .cta-banner .overlay-content :nth-last-child(2),div.dxp.dxp-banner .cta-banner .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default .overlay-content :nth-last-child(n+3){width:100%}}\@media (max-width:1199px){div.dxp.dxp-banner .long.cta-banner,div.dxp.dxp-banner .long.sub-feature-bg-block,div.dxp.dxp-banner .long.sub-feature-default,div.dxp.dxp-banner .long.sub-feature-image{max-height:536px;overflow:hidden}}\@media (max-width:991px){div.dxp.dxp-banner .long.cta-banner,div.dxp.dxp-banner .long.sub-feature-bg-block,div.dxp.dxp-banner .long.sub-feature-default,div.dxp.dxp-banner .long.sub-feature-image{max-height:600px;overflow:hidden}}\@media (max-width:767px){div.dxp.dxp-banner .long.cta-banner,div.dxp.dxp-banner .long.sub-feature-bg-block,div.dxp.dxp-banner .long.sub-feature-default,div.dxp.dxp-banner .long.sub-feature-image{max-height:336px;overflow:hidden}div.dxp.dxp-banner .long.sub-feature-bg-block .overlay-content{position:absolute}div.dxp.dxp-banner .long.sub-feature-image .overlay-content .cta-links{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-banner .long.cta-banner,div.dxp.dxp-banner .long.sub-feature-bg-block,div.dxp.dxp-banner .long.sub-feature-default,div.dxp.dxp-banner .long.sub-feature-image{max-height:400px;overflow:hidden}div.dxp.dxp-banner .long.sub-feature-image .overlay-content{top:0;padding-top:64px}}div.dxp.dxp-banner .medium{max-height:432px;overflow:hidden}div.dxp.dxp-banner .medium img{position:relative}\@media (max-width:1199px){div.dxp.dxp-banner .medium{max-height:392px}}\@media (max-width:991px){div.dxp.dxp-banner .medium{max-height:440px}div.dxp.dxp-banner .medium.cta-banner .overlay-content,div.dxp.dxp-banner .medium.sub-feature-bg-block .overlay-content{padding:0 16px}}\@media (max-width:767px){div.dxp.dxp-banner .medium{max-height:248px}div.dxp.dxp-banner .medium.sub-feature-bg-block .overlay-content{position:relative;padding-left:24px;left:auto;right:auto}div.dxp.dxp-banner .medium.sub-feature-bg-block .overlay-content.white-block{padding-top:0;bottom:auto;top:40px}div.dxp.dxp-banner .medium.sub-feature-image .overlay-content .cta-links{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-banner .medium{max-height:320px}}\@media (min-width:576px){div.dxp.dxp-banner .cta-banner.medium .overlay-content,div.dxp.dxp-banner .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner .cta-banner.medium .overlay-content,div.dxp.dxp-banner .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:24px;width:61.5%}}\@media (min-width:992px){div.dxp.dxp-banner .cta-banner.medium .overlay-content,div.dxp.dxp-banner .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:24px;width:54.6%}div.dxp.dxp-banner .cta-banner.medium .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default.medium .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-banner.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default.medium .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px){div.dxp.dxp-banner .cta-banner.medium .overlay-content,div.dxp.dxp-banner .sub-feature-default.medium .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner .cta-banner.medium .overlay-content p:last-child,div.dxp.dxp-banner .sub-feature-default.medium .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner .cta-banner.medium .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default.medium .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-banner.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default.medium .overlay-content :nth-last-child(2){width:auto}}\@media (max-width:575px){div.dxp.dxp-banner .cta-banner.medium .overlay-content,div.dxp.dxp-banner .sub-feature-default.medium .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner .cta-banner.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner .cta-banner.medium .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default.medium .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default.medium .overlay-content :nth-last-child(n+3){width:100%}}div.dxp.dxp-banner .short{max-height:304px;overflow:hidden}div.dxp.dxp-banner .short img{position:relative}div.dxp.dxp-banner .short.sub-feature-bg-block .overlay-content{padding-top:56px;top:0;bottom:0}div.dxp.dxp-banner .short.sub-feature-bg-block .overlay-content.align-left{left:auto}div.dxp.dxp-banner .short.sub-feature-bg-block .cta-links{display:block}\@media (min-width:576px) and (max-width:991px){div.dxp.dxp-banner .short.cta-banner h1,div.dxp.dxp-banner .short.sub-feature-image h1{margin-bottom:0}}\@media (max-width:1199px){div.dxp.dxp-banner .short{max-height:288px}}\@media (max-width:991px){div.dxp.dxp-banner .short{max-height:320px}}\@media (max-width:767px){div.dxp.dxp-banner .short{max-height:200px}div.dxp.dxp-banner .short.sub-feature-bg-block .overlay-content .cta-links,div.dxp.dxp-banner .short.sub-feature-image .overlay-content .cta-links{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-banner .short{max-height:288px}div.dxp.dxp-banner .short .overlay-content{top:64px;padding-bottom:64px}}\@media (min-width:576px){div.dxp.dxp-banner .cta-banner.short .overlay-content,div.dxp.dxp-banner .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:24px;width:51.7%}}\@media (min-width:768px){div.dxp.dxp-banner .cta-banner.short .overlay-content,div.dxp.dxp-banner .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:24px;width:61.5%}}\@media (min-width:992px){div.dxp.dxp-banner .cta-banner.short .overlay-content,div.dxp.dxp-banner .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:24px;width:54.6%}div.dxp.dxp-banner .cta-banner.short .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default.short .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-banner.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default.short .overlay-content :nth-last-child(2){width:auto}}\@media (min-width:1200px){div.dxp.dxp-banner .cta-banner.short .overlay-content,div.dxp.dxp-banner .sub-feature-default.short .overlay-content{bottom:64px;top:auto;margin-left:24px;width:55.3%}div.dxp.dxp-banner .cta-banner.short .overlay-content p:last-child,div.dxp.dxp-banner .sub-feature-default.short .overlay-content p:last-child{margin-bottom:0}div.dxp.dxp-banner .cta-banner.short .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default.short .overlay-content :nth-last-child(n+3){width:100%}div.dxp.dxp-banner .cta-banner.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default.short .overlay-content :nth-last-child(2){width:auto}}\@media (max-width:575px){div.dxp.dxp-banner .cta-banner.short .overlay-content,div.dxp.dxp-banner .sub-feature-default.short .overlay-content{width:100%;padding:0 16px}div.dxp.dxp-banner .cta-banner.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner .cta-banner.short .overlay-content :nth-last-child(n+3),div.dxp.dxp-banner .sub-feature-default.short .overlay-content :nth-last-child(2),div.dxp.dxp-banner .sub-feature-default.short .overlay-content :nth-last-child(n+3){width:100%}}div.dxp.dxp-banner .search-container{margin-top:32px}div.dxp.dxp-banner .cta-container.small-image{margin-top:1.5rem}div.dxp.dxp-banner .cta-container.regular-banner{margin-top:24px}\@media (min-width:992px){div.dxp.dxp-banner .search-container{margin:32px 0 12px}div.dxp.dxp-banner .cta-container.horizontal{margin-bottom:-24px}div.dxp.dxp-banner .cta-container.benefits-hero{margin-top:32px}div.dxp.dxp-banner .cta-container.benefits-hero.medium-size,div.dxp.dxp-banner .cta-container.benefits-hero.short-size{margin-top:23px}}\@media (min-width:768px){div.dxp.dxp-banner .cta-container.horizontal.image-overlay{margin-bottom:-24px;margin-top:25px}}\@media (max-width:991px){div.dxp.dxp-banner .cta-container.benefits-hero{margin-top:24px}div.dxp.dxp-banner .cta-container.image-overlay{margin-top:26px}}\@media (max-width:767px){div.dxp.dxp-banner .search-container{margin-top:32px;margin-bottom:12px}div.dxp.dxp-banner .cta-container.regular-banner,div.dxp.dxp-banner .cta-container.small-image{margin-top:1rem}div.dxp.dxp-banner .cta-container.benefits-hero.medium-size,div.dxp.dxp-banner .cta-container.benefits-hero.short-size{margin-top:16px}div.dxp.dxp-banner .cta-container.image-overlay{margin-top:17px}div.dxp.dxp-banner .cta-container.horizontal.image-overlay{margin-bottom:-24px}}"; }
};

exports.dxp_banner = Banner;
