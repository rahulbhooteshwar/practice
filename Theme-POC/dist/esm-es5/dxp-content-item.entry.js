import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        close: 'Click to close video overlay popup',
        closeText: 'Close',
        videoPlayBtnText: 'Video play button',
        videoPosterImageText: 'Video poster image'
    }
};
var MEDIA_TOP = 'media-on-top';
var DESCRIPTION_HIDDEN_XS = 'description dxp-hidden-xs-only';
var ContentItem = /** @class */ (function () {
    function ContentItem(hostRef) {
        registerInstance(this, hostRef);
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
        this.clickCtaCard = createEvent(this, "clickCtaCard", 7);
        this.clickCtaFav = createEvent(this, "clickCtaFav", 7);
        this.clickCtaMoreAction = createEvent(this, "clickCtaMoreAction", 7);
        this.clickCtaOne = createEvent(this, "clickCtaOne", 7);
        this.clickCtaTwo = createEvent(this, "clickCtaTwo", 7);
    }
    /** Watcher that looks for cta object to be assigned/changed externally */
    ContentItem.prototype.ctaDataChangeHandler = function () {
        this.base.createNestedMarkup(this.ctaContainer, 'dxp-cta-list', this.ctaData);
    };
    /** actions to be performed prior to component loading */
    ContentItem.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'ContentItem', messages);
    };
    /** life cycle hook */
    ContentItem.prototype.componentDidLoad = function () {
        this.ctaDataChangeHandler();
        if (this.contentItemTitleUrl) {
            var contUrlChange = this.element.querySelector('.dxp-title-3').querySelector('a');
            contUrlChange.setAttribute('href', this.contentItemTitleUrl);
        }
        if (this.badgeRef) {
            this.badgeRef.style.color = this.badgeTextColor;
            this.badgeRef.style.backgroundColor = this.badgeBackgroundColor;
        }
    };
    /** Listen scroll for animation */
    ContentItem.prototype.handleScroll = function () {
        if (this.animation !== 'none') {
            var elementsToShow = this.element.querySelector('.dxp-content-item');
            var rect = elementsToShow.getBoundingClientRect();
            if (elementsToShow && (rect.top <= 0
                && rect.bottom >= 0)
                ||
                    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
                ||
                    (rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))) {
                elementsToShow.style.animation = this.animation + "-fade-in ease " + this.animationDuration + "s";
                elementsToShow.style.animationFillMode = 'forwards';
                elementsToShow.style.animationIterationCount = 1;
                elementsToShow.style.opacity = 0;
            }
            else {
                elementsToShow.style.animation = 'none';
            }
        }
    };
    /** key up events */
    ContentItem.prototype.handleUpkeyEvents = function (e) {
        if (e.keyCode === 27 && this.isVideoShow) {
            this.isVideoShow = false;
        }
    };
    /** click listener for routing events on anchor tag */
    ContentItem.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** show the content video block */
    ContentItem.prototype.getContentOfVideo = function () {
        var _this = this;
        return (h("div", { class: "content-video " + this.orientation }, h("img", { class: "content-background-img", src: this.srcPoster, alt: dxp.i18n.t('ContentItem:videoPosterImageText') }), h("a", { class: "play-icon " + (this.playIconBottomLeft ? 'bottom-left' : 'center'), "aria-label": dxp.i18n.t('ContentItem:videoPlayBtnText'), onClick: function (ev) { return _this.toggleVideo(true, ev); }, href: "" }, h("img", { alt: dxp.i18n.t('ContentItem:videoPlayBtnText'), src: "https://asset.mastercard.com/dxp-ui/assets" + "/images/icons/play-icon-" + this.iconType + ".png" }))));
    };
    /** show video overlay block */
    ContentItem.prototype.getVideoOverlay = function () {
        var _this = this;
        return (h("div", { class: "overlay-video-block" }, h("a", { role: "button", class: "btn-close", "aria-label": dxp.i18n.t('ContentItem:close'), onClick: function (ev) { return _this.toggleVideo(false, ev); }, href: "" }, h("span", { class: "dxp-icon dxp-icon-large dxp-icon-close white-cross-icon", title: dxp.i18n.t('ContentItem:closeText') })), h("div", { class: "align-middle" }, h("dxp-video", { type: this.type, "icon-type": this.iconType, "src-video": this.srcVideo, "src-poster": this.srcPoster, autoplay: this.autoplay, "disable-controls": this.disableControls, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }))));
    };
    /** Handler for content item click. Emits click event */
    ContentItem.prototype.onClickCtaCardHandler = function (event) {
        this.clickCtaCard.emit(event);
        this.showMore = false;
    };
    /** Handler for CTA Header right icon click. Emits click event */
    ContentItem.prototype.onClickCtaFavHandler = function (event) {
        this.clickCtaFav.emit(event);
    };
    /** Handler for content item more button click. Emits click event */
    ContentItem.prototype.onClickCtaMoreActionHandler = function (event) {
        this.clickCtaMoreAction.emit(event);
        this.showMore = false;
    };
    /** Handler for content item more button click. Emits click event */
    ContentItem.prototype.onClickCtaShowMore = function () {
        this.showMore = !this.showMore;
    };
    /** render dom of content item */
    ContentItem.prototype.renderContentItem = function () {
        var themeCheck = this.dataTheme ? "dxp " + this.dataTheme : this.base.componentClass();
        return (h("div", { class: themeCheck + " column-content " + this.orientation + " " + (this.contentType === 'content-logo' ? 'logo-wrapper' : ''), tabindex: "0" }, h("div", { class: "column-content-item " + (this.headerType === 'none' ? 'content-text-only' : this.contentType) + "\n        " + (this.headerline ? 'headerline' : '') + " " + (this.positionOfMedia.toUpperCase() === 'RIGHT' ? ' reverse' : '') }, this.orientation === 'horizontal' ?
            // Horizontal Orientation
            this.renderHorizontalOrientation()
            :
                // Vertical Orientation
                this.renderVerticalOrientaion(), this.isVideoShow && this.getVideoOverlay())));
    };
    /** Render horizontal orienation */
    ContentItem.prototype.renderHorizontalOrientation = function () {
        var _this = this;
        return ([this.headerType === 'image' ?
                h("div", { class: "img-container" }, this.categoryTag ? h("p", { class: "item-category-tags" }, this.categoryTag) : '', h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive }, h("p", { slot: "overlay" }, h("slot", { name: "overlay" })))))
                :
                    this.headerType === 'video' ? this.getContentOfVideo() : '',
            h("div", { class: "content-text " + (this.indentation ? 'indentation' : '') }, h("div", null, this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText), this.contentItemTitle && h("h3", { class: "dxp-title-3" }, h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self', innerHTML: this.contentItemTitle }), this.badgeText && h("span", { class: "badge-cont" }, h("span", { ref: function (el) { return _this.badgeRef = el; }, class: "badge-text" }, this.badgeText))), this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description ', innerHTML: this.description }), h("div", { class: "cta-block", ref: function (el) { return _this.ctaContainer = el; } }, h("slot", null))))]);
    };
    /** Render vertical orientation */
    ContentItem.prototype.renderVerticalOrientaion = function () {
        var _this = this;
        return ([this.contentItemType === MEDIA_TOP ?
                this.showMediaOnTop()
                : this.contentItemType === 'eyebrow-on-top' ?
                    this.showEyebrowOnTop()
                    : this.contentItemType === 'title-on-top' ?
                        this.showTitleOnTop()
                        : this.showDescriptionOnTop(),
            this.count ? h("span", { class: "account-count" }, this.count) : '',
            this.status ? h("p", { class: "access-status" }, h("span", { class: "pending-icon icons-sprite" }), h("a", { href: this.statusUrl, class: "access-pending-link", target: this.statusUrlOpenInNewTab ? '_blank' : '_self' }, this.status)) : '',
            this.date ? h("span", { class: "card-date" }, this.date) : '',
            [this.contentItemType !== MEDIA_TOP &&
                    h("div", { class: "cta-block", ref: function (el) { return _this.ctaContainer = el; } }, h("slot", null))],
            [this.cardMoreButton ? this.showMoreButtons() : '']
        ]);
    };
    /** show description on top */
    ContentItem.prototype.showDescriptionOnTop = function () {
        return ([this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
            this.contentItemTitle && h("h3", { class: "dxp-title-3" }, h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self' }, this.contentItemTitle)),
            this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description' + ' dxp-lead', innerHTML: this.description }),
            this.headerType === 'image' ?
                h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive }, h("p", { slot: "overlay" }, h("slot", { name: "overlay" }))))
                : this.headerType === 'video' && this.getContentOfVideo()
        ]);
    };
    /** show eyebrow on top */
    ContentItem.prototype.showEyebrowOnTop = function () {
        return ([this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
            this.headerType === 'image' ?
                h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive }, h("p", { slot: "overlay" }, h("slot", { name: "overlay" }))))
                :
                    this.headerType === 'video' && this.getContentOfVideo(),
            this.contentItemTitle && h("h3", { class: "dxp-title-3" }, h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self' }, this.contentItemTitle)),
            this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description' + ' dxp-lead', innerHTML: this.description })]);
    };
    /** show media on top */
    ContentItem.prototype.showMediaOnTop = function () {
        var _this = this;
        return ([this.headerType === 'image' ?
                h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive }, h("p", { slot: "overlay" }, h("slot", { name: "overlay" }))))
                :
                    this.headerType === 'video' && this.getContentOfVideo(),
            h("div", { class: (this.indentation ? 'indentation' : '') + " content-text-wrapper" }, this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText), this.contentItemTitle && h("h3", { class: "dxp-title-3" }, h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self', innerHTML: this.contentItemTitle }), this.badgeText && h("span", { class: "badge-cont" }, h("span", { ref: function (el) { return _this.badgeRef = el; }, class: "badge-text" }, this.badgeText))), this.description && h("p", { class: this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description', innerHTML: this.description }), h("div", { class: "cta-block", ref: function (el) { return _this.ctaContainer = el; } }, h("slot", null)))]);
    };
    /** show more buttons */
    ContentItem.prototype.showMoreButtons = function () {
        var _this = this;
        return ([
            h("a", { onClick: function (event) {
                    event.stopPropagation();
                    _this.onClickCtaShowMore();
                }, class: (this.buttonOneDisplayAs === 'link' ? 'column-item-link' : 'dxp-btn dxp-btn-primary') + "\n          " + ((this.buttonOneDisplayAs === 'link' || this.ribbonType) ? 'edit-order-link' : ''), href: " JavaScript:void(0) " }, h("span", { class: "more-link-icon icons-sprite" })),
            this.showMore ? [
                h("ul", { class: "card-actions" }, this.actionList && this.actionList.map(function (action) { return h("li", { class: "card-action-items", onClick: function (event) { _this.onClickCtaMoreActionHandler(event); } }, action.name); }))
            ]
                : ''
        ]);
    };
    /** show ribbon type card item */
    ContentItem.prototype.showRibbonTypeCardItem = function () {
        var _this = this;
        return ([h("div", { class: "card-head" }, h("span", { class: "app-kind" }, h("span", { class: this.headerIconLeft ? this.headerIconLeft + " icons-sprite" : '' }), h("span", { class: "card-name" }, this.headerText), this.categoryLabel ? h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.categoryLabel) : '', this.categoryTarget ? h("span", { class: "tag-name" }, this.categoryText) : '', h("span", { onClick: function (event) {
                    event.stopPropagation();
                    _this.onClickCtaFavHandler(event);
                }, class: "dxp-pull-right " + this.headerIconRight + " icons-sprite" })), (this.headerIconRight === '' || this.headerIconRight === undefined) && this.categoryTarget ?
                h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive }, h("p", { slot: "overlay" }, h("slot", { name: "overlay" })))) : '')]);
    };
    /** show title on top */
    ContentItem.prototype.showTitleOnTop = function () {
        return ([this.eyebrowText && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText),
            this.contentItemTitle && h("h3", { class: "dxp-title-3" }, h("a", { target: this.contentItemTitleTarget ? '_blank' : '_self' }, this.contentItemTitle)),
            this.headerType === 'image' ?
                h("div", { class: "img-wrapper" }, h("dxp-image", { src: this.src, "image-title": this.imageTitle, alt: this.alt, href: this.href, "enable-overlay": this.enableOverlay, "open-in-new-tab": this.openInNewTab, "focal-points": this.focalPoints, "device-height": this.deviceHeight, responsive: this.responsive }, h("p", { slot: "overlay" }, h("slot", { name: "overlay" }))))
                :
                    this.headerType === 'video' && this.getContentOfVideo(),
            this.description && h("p", { class: (this.descriptionTarget ? DESCRIPTION_HIDDEN_XS : 'description') + "\n      " + (this.ribbonType ? 'overview-text' : ''), innerHTML: this.description })]);
    };
    /** Show/hide the video  */
    ContentItem.prototype.toggleVideo = function (displayVideo, ev) {
        ev.preventDefault();
        this.isVideoShow = displayVideo;
    };
    /** Render the content-item */
    ContentItem.prototype.render = function () {
        var _this = this;
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme &&
                    h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + (this.dataTheme ? this.dataTheme : this.theme) + "/" + (this.dataTheme ? this.dataTheme : this.theme) + ".min.css" })
            ],
            [this.theme &&
                    h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + (this.dataTheme ? this.dataTheme : this.theme) + "/dxp-content-item.min.css" })
            ],
        ];
        var ribbonTypeCheck = this.ribbonType ? this.ribbonType : '';
        var categoryTargetCheck = this.categoryTarget === false ? "card " + this.heightType : '';
        var categoryTargetImage = this.categoryTarget ? "card-image " + this.heightType : '';
        return (h("div", { class: "dxp dxp-content-item", onClick: function (event) {
                _this.onClickCtaCardHandler(event);
            }, dir: this.dir, "data-theme": this.dataTheme ? this.dataTheme : this.theme }, styles, h("div", { class: "column-item " + (this.headerType === 'card' && ribbonTypeCheck) + "\n         " + (this.headerType === 'card' && categoryTargetCheck) + "\n         " + (this.headerType === 'card' && categoryTargetImage) }, (this.headerType === 'card' && this.ribbonType) ?
            this.showRibbonTypeCardItem() : '', this.renderContentItem())));
    };
    Object.defineProperty(ContentItem.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentItem, "watchers", {
        get: function () {
            return {
                "ctaData": ["ctaDataChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentItem, "style", {
        get: function () { return "div.dxp.dxp-content-item{height:100%}\@-webkit-keyframes slide-up-fade-in{0%{opacity:0;-webkit-transform:translateY(100px);transform:translateY(100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@keyframes slide-up-fade-in{0%{opacity:0;-webkit-transform:translateY(100px);transform:translateY(100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@-webkit-keyframes slide-down-fade-in{0%{opacity:0;-webkit-transform:translateY(-100px);transform:translateY(-100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@keyframes slide-down-fade-in{0%{opacity:0;-webkit-transform:translateY(-100px);transform:translateY(-100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@-webkit-keyframes slide-right-fade-in{0%{opacity:0;-webkit-transform:translate(-100px);transform:translate(-100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@keyframes slide-right-fade-in{0%{opacity:0;-webkit-transform:translate(-100px);transform:translate(-100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@-webkit-keyframes slide-left-fade-in{0%{opacity:0;-webkit-transform:translate(100px);transform:translate(100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}\@keyframes slide-left-fade-in{0%{opacity:0;-webkit-transform:translate(100px);transform:translate(100px)}to{opacity:1;-webkit-transform:translate(0);transform:translate(0)}}div.dxp.dxp-content-item .column-content .column-content-item p{float:left;margin-bottom:0}div.dxp.dxp-content-item .content-text-wrapper .dxp-title-3 a,div.dxp.dxp-content-item .content-text .dxp-title-3 a{margin-right:.75rem}div.dxp.dxp-content-item .content-text-wrapper .dxp-title-3 span,div.dxp.dxp-content-item .content-text .dxp-title-3 span{vertical-align:top;padding:.25rem .563rem .25rem .563rem}div.dxp.dxp-content-item .badge-text{line-height:38px;letter-spacing:.1125rem;text-align:center;margin-top:7px}div.dxp.dxp-content-item .overlay-video-block{-webkit-transition:opacity .3s ease-in;transition:opacity .3s ease-in;position:fixed;top:0;left:0;width:100%;min-height:100vh;z-index:998}div.dxp.dxp-content-item .align-middle{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:70vw;padding:0 5%}div.dxp.dxp-content-item .btn-close{position:absolute;right:20%;top:5%;border:none;cursor:pointer;margin:5px 5px 0 0;font-size:30px}div.dxp.dxp-content-item .cta-block{margin-top:1.313rem;clear:both}div.dxp.dxp-content-item .column-item{height:100%}div.dxp.dxp-content-item .column-item:after{clear:both}div.dxp.dxp-content-item .column-content-item{padding-bottom:1.5em}div.dxp.dxp-content-item .column-content-item .content-text-wrapper:not(:first-child){margin-top:2.688rem;margin-bottom:0;padding-bottom:1.5rem}div.dxp.dxp-content-item .column-content-item .indentation{margin:0 2rem}div.dxp.dxp-content-item .column-content-item .content-text,div.dxp.dxp-content-item .column-content-item .content-video,div.dxp.dxp-content-item .column-content-item .img-container{-ms-flex-positive:1;flex-grow:1;width:50%;position:relative}div.dxp.dxp-content-item .column-content-item .content-text .content-background-img,div.dxp.dxp-content-item .column-content-item .content-text.vertical,div.dxp.dxp-content-item .column-content-item .content-video .content-background-img,div.dxp.dxp-content-item .column-content-item .content-video.vertical,div.dxp.dxp-content-item .column-content-item .img-container .content-background-img,div.dxp.dxp-content-item .column-content-item .img-container.vertical{width:100%}div.dxp.dxp-content-item .column-content-item .content-text.horizontal,div.dxp.dxp-content-item .column-content-item .content-video.horizontal,div.dxp.dxp-content-item .column-content-item .img-container.horizontal{height:100%}div.dxp.dxp-content-item .column-content-item .content-text .play-icon,div.dxp.dxp-content-item .column-content-item .content-video .play-icon,div.dxp.dxp-content-item .column-content-item .img-container .play-icon{position:absolute;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}div.dxp.dxp-content-item .column-content-item .content-text .play-icon img,div.dxp.dxp-content-item .column-content-item .content-video .play-icon img,div.dxp.dxp-content-item .column-content-item .img-container .play-icon img{width:72px;height:72px}div.dxp.dxp-content-item .column-content-item .content-text .play-icon.center,div.dxp.dxp-content-item .column-content-item .content-video .play-icon.center,div.dxp.dxp-content-item .column-content-item .img-container .play-icon.center{top:50%;left:50%}div.dxp.dxp-content-item .column-content-item .content-text .play-icon.bottom-left,div.dxp.dxp-content-item .column-content-item .content-video .play-icon.bottom-left,div.dxp.dxp-content-item .column-content-item .img-container .play-icon.bottom-left{left:60px;bottom:-12px}div.dxp.dxp-content-item .column-content{height:100%}div.dxp.dxp-content-item .column-content .column-content-item:after{content:\"\";display:block;clear:both}div.dxp.dxp-content-item .column-content .column-content-item .a{display:block}div.dxp.dxp-content-item .column-content .column-content-item .dxp-btn{margin-top:16px;margin-right:16px;vertical-align:inherit}div.dxp.dxp-content-item .column-content .column-content-item .dxp-title-3{margin-bottom:.1875rem;margin-top:.75rem}div.dxp.dxp-content-item .column-content .column-content-item .description{margin-top:.5625rem;margin-bottom:1.375rem}div.dxp.dxp-content-item .headerline{padding-top:2.5rem}div.dxp.dxp-content-item .column-item-link{margin-top:6px;margin-right:1em;display:inline-block;margin-bottom:2.4em}div.dxp.dxp-content-item .horizontal{overflow:visible}div.dxp.dxp-content-item .horizontal .column-content-item{padding-bottom:0}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .description,div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .dxp-title-3{float:left;clear:both}div.dxp.dxp-content-item .horizontal .content-small-image{margin-top:0;border-top:none}div.dxp.dxp-content-item .horizontal .content-small-image .img-container{display:block;width:80px;height:80px}div.dxp.dxp-content-item .horizontal .content-small-image .content-text div .description,div.dxp.dxp-content-item .horizontal .content-small-image dxp-image{margin-top:0}div.dxp.dxp-content-item .horizontal .content-image-text.reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-content-item .vertical{overflow:visible}div.dxp.dxp-content-item .vertical .column-content-item{padding-bottom:0}div.dxp.dxp-content-item .vertical .column-content-item .dxp-title-3{margin-bottom:.6875rem;float:left;clear:both}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper .dxp-title-3 a{margin-right:.75rem}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper .content-text-only .dxp-title-eyebrow{margin-bottom:0}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .description,div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .dxp-title-3{float:left}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .description{margin-top:.8125rem}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .dxp-title-3{margin:.6875rem 1.25rem .6875rem 0}div.dxp.dxp-content-item .column-content.vertical .column-content-item p{clear:both}div.dxp.dxp-content-item .content-text-only{padding-bottom:0}div.dxp.dxp-content-item .content-text-only .content-text-wrapper{margin:0}div.dxp.dxp-content-item .content-text-only .dxp-title-eyebrow{margin-bottom:2px}div.dxp.dxp-content-item .content-text-only .description{margin-bottom:0}div.dxp.dxp-content-item .content-text-only .dxp-title-3{margin-top:1.9rem}div.dxp.dxp-content-item .content-text-only.headerline{padding-top:2.25rem}div.dxp.dxp-content-item .content-small-image{padding-bottom:0}div.dxp.dxp-content-item .content-small-image .content-text-wrapper{margin:0}div.dxp.dxp-content-item .content-small-image .content-text-wrapper:not(:first-child){margin-top:1.8125rem}div.dxp.dxp-content-item .content-small-image dxp-image{display:block;width:80px;height:80px}div.dxp.dxp-content-item .content-small-image .dxp-title-eyebrow{display:none}div.dxp.dxp-content-item .content-small-image .dxp-title-3{margin-top:2rem}div.dxp.dxp-content-item .content-small-image .column-item-link{display:block}div.dxp.dxp-content-item .content-small-image .content-text,div.dxp.dxp-content-item .content-small-image .img-container{-ms-flex-positive:unset;flex-grow:unset;width:unset}div.dxp.dxp-content-item .content-small-image .content-text div{width:75%;height:auto}div.dxp.dxp-content-item .content-small-image .cta-block{margin-top:1rem}div.dxp.dxp-content-item .logo-wrapper{width:184px}div.dxp.dxp-content-item .content-logo{padding-bottom:0;-webkit-box-sizing:content-box;box-sizing:content-box}div.dxp.dxp-content-item .content-logo *,div.dxp.dxp-content-item .content-logo .content-text{display:none}div.dxp.dxp-content-item .content-logo.headerline{border-top-style:none;padding-top:0}div.dxp.dxp-content-item .content-logo .img-container,div.dxp.dxp-content-item .content-logo .img-wrapper,div.dxp.dxp-content-item .content-logo dxp-image{display:block;height:auto;width:auto}div.dxp.dxp-content-item .card-date{display:block}div.dxp.dxp-content-item .item-category-tags{display:inline-block;font-size:14px;margin:0;letter-spacing:2.1px;padding:5px 25px;position:absolute;z-index:1}div.dxp.dxp-content-item .card{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;padding:15px;border-top-left-radius:6px;border-top-right-radius:6px;max-width:280px;margin-bottom:24px}div.dxp.dxp-content-item .card.small{height:200px}div.dxp.dxp-content-item .card.small .dxp-title-eyebrow{height:75px;overflow:hidden}div.dxp.dxp-content-item .card.large{height:264px}div.dxp.dxp-content-item .card.large .dxp-title-eyebrow{height:72px;overflow:hidden}div.dxp.dxp-content-item .card.large .overview-text{height:40px;overflow:hidden}div.dxp.dxp-content-item .card .dxp-title-eyebrow{font-size:20px;line-height:24px;letter-spacing:normal;margin-bottom:8px}div.dxp.dxp-content-item .card .column-content .overview-text{font-size:12px;margin:8px 0}div.dxp.dxp-content-item .card .column-content .access-status{margin:3px 0 5px 0}div.dxp.dxp-content-item .card .app-title{font-size:20px;margin-bottom:0;line-height:24px}div.dxp.dxp-content-item .card .account-count{font-size:12px;font-weight:500;margin-bottom:0}div.dxp.dxp-content-item .card .edit-order-link{font-size:12px;margin:0 0 5px 0;float:right;position:absolute;bottom:0;left:90%}div.dxp.dxp-content-item .card .access-pending-link{font-size:12px;font-weight:500;line-height:24px;vertical-align:top}div.dxp.dxp-content-item .card .card-date{font-size:12px;position:absolute;bottom:10px}div.dxp.dxp-content-item .card .card-actions{position:absolute;width:55%;clear:both;left:42%;top:99%;padding:10px 0}div.dxp.dxp-content-item .card .card-actions:after,div.dxp.dxp-content-item .card .card-actions:before{border:solid transparent;content:\" \";position:absolute;pointer-events:none;bottom:100%;left:106%}div.dxp.dxp-content-item .card .card-actions:before{border-width:9px;margin-left:-28px}div.dxp.dxp-content-item .card .card-actions:after{border-width:8px;margin-left:-27px}div.dxp.dxp-content-item .card .card-actions .card-action-items{list-style-type:none;z-index:1;position:relative;font-size:14px;padding:5px 15px}div.dxp.dxp-content-item .card .card-head{margin-bottom:10px}div.dxp.dxp-content-item .card .app-kind{font-size:10px;font-weight:700;letter-spacing:1.5px}div.dxp.dxp-content-item .card .app-kind .card-name{line-height:16px;vertical-align:text-bottom}div.dxp.dxp-content-item .card-image{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;padding:15px 15px 25px 15px}div.dxp.dxp-content-item .card-image.api{border-radius:0}div.dxp.dxp-content-item .card-image .app-kind{float:left;width:68%}div.dxp.dxp-content-item .card-image .card-head{display:inline-block}div.dxp.dxp-content-item .card-image .card-head dxp-image{float:left;width:32%}div.dxp.dxp-content-item .card-image .tag-name{font-size:.7rem;border-radius:12.5px;display:inline-block;margin-bottom:18px;padding:2px 7px 4px 7px}div.dxp.dxp-content-item .card-image .dxp-title-eyebrow{height:auto;font-size:1.5rem;line-height:2rem}div.dxp.dxp-content-item .card-image .description{font-size:18px;line-height:2rem;min-height:124px;overflow:hidden;max-height:3.6em;position:relative}div.dxp.dxp-content-item .card-image .description:before{content:\"...\";position:absolute;right:5px;bottom:-5px}div.dxp.dxp-content-item .card-image .description:after{content:\"\";position:absolute;right:0;width:1em;height:1em;margin-top:4.2em}div.dxp.dxp-content-item .card-image .block-with-text:after{content:\"\";position:absolute;right:0;width:1em;height:1em;margin-top:.2em;background:#fff}\@media (min-width:768px) and (max-width:991px){div.dxp.dxp-content-item .column-content-item{padding-bottom:1rem}div.dxp.dxp-content-item .column-content-item .align-middle{width:100vw;padding:0 2%}div.dxp.dxp-content-item .column-content-item .dxp-title-eyebrow{margin-top:2.25rem}div.dxp.dxp-content-item .column-content-item .btn-close{right:1%}div.dxp.dxp-content-item .column-content-item .content-video{width:100%}div.dxp.dxp-content-item .column-content-item .content-text-wrapper:not(:first-child){float:left;margin-top:2.3rem;padding-bottom:.8125rem}div.dxp.dxp-content-item .logo-wrapper{width:216px}div.dxp.dxp-content-item .content-logo,div.dxp.dxp-content-item .content-text-only{padding-bottom:0}div.dxp.dxp-content-item .content-logo .dxp-title-eyebrow,div.dxp.dxp-content-item .content-text-only .dxp-title-eyebrow{margin-top:0}div.dxp.dxp-content-item .content-small-image{padding-bottom:0}div.dxp.dxp-content-item .content-small-image .content-text-wrapper:not(:first-child){margin-top:2rem}div.dxp.dxp-content-item .horizontal .column-content-item{padding-bottom:1rem}div.dxp.dxp-content-item .horizontal .column-content-item div{width:auto}div.dxp.dxp-content-item .horizontal .column-content-item div:first-child{padding-right:0}div.dxp.dxp-content-item .horizontal .column-content-item div:nth-child(2){margin-top:2.25rem}div.dxp.dxp-content-item .horizontal .column-content-item div .description{margin-bottom:2.5em}div.dxp.dxp-content-item .horizontal .column-content-item .content-text.indentation{padding:0 2.8125rem}div.dxp.dxp-content-item .horizontal .column-content-item.content-small-image{display:-ms-flexbox;display:flex;padding-bottom:0;-ms-flex-align:stretch;align-items:stretch}div.dxp.dxp-content-item .horizontal .column-content-item.content-small-image div{margin-top:0}div.dxp.dxp-content-item .horizontal .column-content-item.content-small-image div:first-child{padding-left:0}div.dxp.dxp-content-item .horizontal .column-content-item.content-text-only{padding-bottom:0}div.dxp.dxp-content-item .horizontal .column-content-item.content-text-only .content-text{padding:0}div.dxp.dxp-content-item .horizontal .column-content-item.content-logo{padding-bottom:0}}\@media only screen and (max-width:415px){div.dxp.dxp-content-item .content-text-wrapper .dxp-title-3 a,div.dxp.dxp-content-item .content-text .dxp-title-3 a{margin-right:0}}\@media only screen and (max-width:767px){div.dxp.dxp-content-item .column-content-item{padding-bottom:1rem}div.dxp.dxp-content-item .column-content-item .align-middle{width:100vw;padding:0 2%}div.dxp.dxp-content-item .column-content-item .btn-close{right:1%}div.dxp.dxp-content-item .column-content-item .dxp-icon-large{width:18px;height:18px;font-size:18px}div.dxp.dxp-content-item .column-content-item .content-video .play-icon.bottom-left{left:35px;bottom:-14px}div.dxp.dxp-content-item .column-content-item .content-video .play-icon img{width:50px;height:50px}div.dxp.dxp-content-item .column-content-item .content-text-wrapper:not(:first-child){margin-top:2.3rem;padding-bottom:.8125rem}div.dxp.dxp-content-item .column-content-item .description,div.dxp.dxp-content-item .column-content-item .dxp-title-3,div.dxp.dxp-content-item .column-content-item .dxp-title-eyebrow{margin-bottom:.75rem}div.dxp.dxp-content-item .column-content-item .content-video{width:100%}div.dxp.dxp-content-item .content-text-only{padding-bottom:0}div.dxp.dxp-content-item .content-text-only.headerline{padding-top:1.6875rem}div.dxp.dxp-content-item .headerline{padding-top:2rem}div.dxp.dxp-content-item .content-small-image{padding-bottom:0}div.dxp.dxp-content-item .content-small-image h3:nth-child(3){margin-top:1.5rem}div.dxp.dxp-content-item .content-small-image .content-text-wrapper:not(:first-child){margin-top:1.55rem}div.dxp.dxp-content-item .logo-wrapper{width:136px}div.dxp.dxp-content-item .content-logo{padding-bottom:0}div.dxp.dxp-content-item .horizontal .column-content-item{padding-bottom:1rem}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div{margin-bottom:.625rem}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .description,div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .dxp-title-3{float:left}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .dxp-title-3{margin-bottom:0}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .description{margin-right:0;margin-top:0}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div .dxp-title-3{margin:.75rem 1.25rem .5625rem 0;font-size:1.5rem}div.dxp.dxp-content-item .horizontal .column-content-item div:first-child{padding-right:0}div.dxp.dxp-content-item .horizontal .column-content-item div:nth-child(2){margin-top:2.25rem}div.dxp.dxp-content-item .horizontal .column-content-item .content-text,div.dxp.dxp-content-item .horizontal .column-content-item .content-video,div.dxp.dxp-content-item .horizontal .column-content-item .img-container{width:100%}div.dxp.dxp-content-item .horizontal .column-content-item .cta-block{margin-top:1.5rem}div.dxp.dxp-content-item .horizontal .content-small-image .content-text,div.dxp.dxp-content-item .horizontal .content-text-only .content-text{padding:0}div.dxp.dxp-content-item .horizontal .content-logo,div.dxp.dxp-content-item .horizontal .content-small-image,div.dxp.dxp-content-item .horizontal .content-text-only{padding-bottom:0}div.dxp.dxp-content-item .vertical{overflow:visible}div.dxp.dxp-content-item .vertical .column-content .column-content-item p{margin-bottom:.6875rem}div.dxp.dxp-content-item .vertical .column-content-item{padding-bottom:0}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .description,div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .dxp-title-3{float:left}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div p:nth-child(2){margin-top:.8125rem}div.dxp.dxp-content-item .vertical .column-content-item .content-text-wrapper div .dxp-title-3{margin:-.1875rem 1.25rem 0 0;font-size:1.5rem}}\@media screen and (min-width:992px){div.dxp.dxp-content-item .horizontal{overflow:visible}div.dxp.dxp-content-item .horizontal .column-content-item{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch}div.dxp.dxp-content-item .horizontal .column-content-item .content-text{-ms-flex-item-align:center;align-self:center;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-content-item .horizontal .column-content-item .content-text.indentation{margin-left:2rem}div.dxp.dxp-content-item .horizontal .column-content-item .content-text div:first-child{padding-left:5.875rem}div.dxp.dxp-content-item .horizontal .column-content-item.reverse .content-text{padding-right:7.5rem;margin-left:0}div.dxp.dxp-content-item .horizontal .column-content-item.reverse .content-text div:first-child{padding-left:0}div.dxp.dxp-content-item .horizontal .column-content-item.content-small-image .content-text div:first-child{padding-left:13px}div.dxp.dxp-content-item .horizontal .column-content-item.content-text-only .content-text{margin-left:0}div.dxp.dxp-content-item .horizontal .column-content-item.content-text-only .content-text>div{margin:0}div.dxp.dxp-content-item .horizontal .content-logo{display:block}}\@media only screen and (min-width:1024px){div.dxp.dxp-content-item .content-text{position:relative;height:100%}div.dxp.dxp-content-item .content-text .dxp-title-eyebrow{margin-top:2.25rem}div.dxp.dxp-content-item .content-text div{width:auto;height:auto}div.dxp.dxp-content-item .content-text div:first-child{padding-left:5.875rem}}div.dxp.dxp-content-item[dir=rtl] .column-content-item .content-text-wrapper span a,div.dxp.dxp-content-item[dir=rtl] .column-content-item .content-text span a{margin-left:1.25rem;margin-right:0;float:right}div.dxp.dxp-content-item[dir=rtl] .column-content-item .content-text{margin-left:auto;margin-right:2rem}div.dxp.dxp-content-item[dir=rtl] .column-content-item .content-text .dxp-title-3{float:right;margin-left:1.25rem}div.dxp.dxp-content-item[dir=rtl] .column-content-item .content-text .description{margin-right:0;float:right}div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text div:first-child{padding-right:5.875rem;padding-left:0}div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text .dxp-title-3 a{float:right;margin-right:0;margin-left:.75rem}div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text .description{float:right}div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text .dxp-title-3{margin-right:0}div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text .description{margin-right:0;margin-bottom:1.375rem}div.dxp.dxp-content-item[dir=rtl] .vertical .column-content-item .content-text-wrapper .dxp-title-3 a{float:right;margin-right:0;margin-left:.75rem}\@media screen and (max-width:991px){div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text{padding:0}div.dxp.dxp-content-item[dir=rtl] .horizontal .column-content-item .content-text div:first-child{padding-right:0;padding-left:0}}"; },
        enumerable: true,
        configurable: true
    });
    return ContentItem;
}());
export { ContentItem as dxp_content_item };
