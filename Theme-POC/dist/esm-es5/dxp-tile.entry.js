import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-aa646bb6.js';
var IMAGE_BACKGROUND = 'image-background';
var Tile = /** @class */ (function () {
    function Tile(hostRef) {
        registerInstance(this, hostRef);
        /** To show video on click on play icon */
        this.isVideoShow = false;
        /** background type for regular banner */
        this.backgroundType = IMAGE_BACKGROUND;
        /** icon type for header video */
        this.iconType = 'light';
    }
    /** component will load */
    Tile.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Tile', messages);
    };
    /** key up events */
    Tile.prototype.handleUpkeyEvents = function (e) {
        var keycode = e.key || e.code;
        if (keycode.toLowerCase() === 'escape' && this.isVideoShow) {
            this.isVideoShow = false;
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    Tile.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** crossIcon handler */
    Tile.prototype.closeIconClickHandler = function () {
        var bodyEle = document.querySelector('body');
        bodyEle.style.overflow = 'unset';
        var parentEle = this.element.parentElement.parentElement;
        parentEle.classList.remove('show-popup');
        var elepopup = this.base.shadowRootQuerySelector(this.element, '.popup');
        elepopup.classList.remove('fadein');
        elepopup.classList.add('fadeout');
    };
    /** show the content video block */
    Tile.prototype.getContentOfVideo = function () {
        var _this = this;
        return (h("div", { class: "content-video" }, h("img", { class: "content-background-img", src: this.srcPoster, alt: dxp.i18n.t('Tile:videoPosterImageText') }), h("a", { class: "play-icon", "aria-label": dxp.i18n.t('Tile:videoPlayBtnText'), onClick: function (event) { return _this.toggleVideo(true, event); } }, h("img", { alt: "image", src: "https://asset.mastercard.com/dxp-ui/assets" + "/images/icons/play-icon-" + this.iconType + ".png" }))));
    };
    /** show video overlay block */
    Tile.prototype.getVideoOverlay = function () {
        var _this = this;
        var bodyEle = document.querySelector('body');
        bodyEle.style.overflow = 'hidden';
        return (h("div", { class: "overlay-video-block" }, h("a", { role: "button", class: "btn-close", "aria-label": dxp.i18n.t('TileVideo:close'), onClick: function (event) { return _this.toggleVideo(false, event); } }, h("span", { class: "dxp-icon dxp-icon-large dxp-icon-close white-cross-icon" })), h("div", { class: "align-middle" }, h("dxp-video", { type: this.videoType, "icon-type": this.iconType, "src-video": this.src, "src-poster": this.srcPoster, autoplay: this.autoPlay, "disable-controls": this.disableControls, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }))));
    };
    /** if image don't have link or href */
    Tile.prototype.imageClickHandler = function (event) {
        var eleVideo = this.base.shadowRootQuerySelector(this.element, '.content-video');
        if (eleVideo) {
            this.toggleVideo(true, event);
        }
        else {
            var popEle = this.element.parentElement.parentElement.style.getPropertyValue('left').match(/(-?[0-9\.]+)/g);
            var transformVal = popEle;
            var data = Math.abs(transformVal);
            if (!this.href) {
                var parentEle = this.element.parentElement.parentElement;
                parentEle.classList.add('show-popup');
                var elepopup = this.base.shadowRootQuerySelector(this.element, '.popup');
                elepopup.style.left = data + "px";
                elepopup.classList.remove('fadeout');
                elepopup.classList.add('fadein');
                elepopup.classList.remove('dxp-none');
            }
        }
    };
    /** Show/hide the video  */
    Tile.prototype.toggleVideo = function (displayVideo, ev) {
        ev.preventDefault();
        this.isVideoShow = displayVideo;
        var bodyEle = document.querySelector('body');
        bodyEle.style.overflow = 'unset';
    };
    /** Render the tile */
    Tile.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-tile render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-tile-grid.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass() + " " + (this.isSquare ? 'square' : ''), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "tile-container", tabindex: "1" }, h("div", { class: "media-container", onClick: function (event) { return !_this.isSquare && _this.imageClickHandler(event); } }, this.backgroundType === IMAGE_BACKGROUND ? (
        /* tslint:disable: ter-no-script-url */
        h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, href: this.href ? this.href : 'javascript:void(0)', "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint }, " ")) :
            this.backgroundType === 'video-background' && this.getContentOfVideo(), h("div", { class: "cta" }, this.badgeText && h("div", { class: "badge" }, " ", h("span", { class: "badge-cont" }, h("span", { class: "badge-text" }, this.badgeText)), " "), this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowTitle), this.tileCaption && h("h5", { class: "dxp-title-4" }, this.tileCaption), this.description && h("p", { class: "desc dxp-font-size-sm" }, this.description), h("slot", { name: "cta" })))), h("div", { class: "popup dxp-scrollable-container dxp-none" }, h("button", { class: "dxp-icon dxp-icon-large dxp-icon-close", "aria-label": dxp.i18n.t('Popup:closeIcon'), onClick: function () { _this.closeIconClickHandler(); } }), h("div", { class: "popup-contents dxp-scrollable" }, h("slot", null))), this.isVideoShow && this.getVideoOverlay()));
    };
    Object.defineProperty(Tile.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile, "style", {
        get: function () { return "div.dxp.dxp-tile.tile-3{width:50%}div.dxp.dxp-tile .video-container{position:fixed;top:0;bottom:0;left:0;right:0}div.dxp.dxp-tile .overlay-video-block{position:fixed;top:0;left:0;width:100%;min-height:100vh;z-index:998;-webkit-transition:opacity .3s ease-in 0s;transition:opacity .3s ease-in 0s}div.dxp.dxp-tile .overlay-video-block .align-middle{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:70vw;padding:0 5%}div.dxp.dxp-tile .overlay-video-block .btn-close{position:absolute;right:2%;top:2%;border:none;cursor:pointer;margin:5px 5px 0 0;z-index:2}div.dxp.dxp-tile .tile-container{height:100%;position:relative}div.dxp.dxp-tile .tile-container:hover{cursor:pointer;opacity:.5;filter:alpha(opacity=50)}div.dxp.dxp-tile .tile-container .content-background-img,div.dxp.dxp-tile .tile-container .media-container{height:536px}div.dxp.dxp-tile .tile-container .content-background-img .play-icon,div.dxp.dxp-tile .tile-container .media-container .play-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%)}div.dxp.dxp-tile .tile-container .content-background-img .play-icon img,div.dxp.dxp-tile .tile-container .media-container .play-icon img{width:72px;height:72px}div.dxp.dxp-tile .tile-container .badge{padding-bottom:14px}div.dxp.dxp-tile .tile-container .badge-cont{height:25px;width:52px;padding:.25rem .563rem}div.dxp.dxp-tile .tile-container .badge-text{height:15px;width:36px;text-align:center}div.dxp.dxp-tile .tile-container .dxp-title-4{margin-bottom:14px}div.dxp.dxp-tile .tile-container .cta{position:absolute;bottom:24px;left:32px;right:32px}div.dxp.dxp-tile .tile-container .cta .dxp-title-eyebrow{margin-bottom:12px}div.dxp.dxp-tile .tile-container .cta .desc{margin-bottom:15px}div.dxp.dxp-tile.square,div.dxp.dxp-tile .square{width:100%;height:392px;overflow:hidden}div.dxp.dxp-tile.square .image,div.dxp.dxp-tile .square .image{display:contents}div.dxp.dxp-tile.square div.cta,div.dxp.dxp-tile .square div.cta{position:absolute;bottom:24px;left:24px;right:24px}div.dxp.dxp-tile.square div.cta .badge,div.dxp.dxp-tile .square div.cta .badge{padding-bottom:14px}div.dxp.dxp-tile.square div.cta .badge-cont,div.dxp.dxp-tile .square div.cta .badge-cont{height:25px;width:52px;padding:.25rem .563rem}div.dxp.dxp-tile.square div.cta .badge-text,div.dxp.dxp-tile .square div.cta .badge-text{height:15px;width:36px;text-align:center}div.dxp.dxp-tile.square div.cta .dxp-title-eyebrow,div.dxp.dxp-tile .square div.cta .dxp-title-eyebrow{margin-bottom:20px}div.dxp.dxp-tile.square div.cta .dxp-title-4,div.dxp.dxp-tile .square div.cta .dxp-title-4{margin-bottom:24px}div.dxp.dxp-tile .popup{width:100%;height:536px;position:absolute;display:block;top:0;left:0;z-index:1}div.dxp.dxp-tile .popup:after{content:\"\";display:block;clear:both}div.dxp.dxp-tile .popup-contents{height:536px;position:relative;overflow-y:auto}div.dxp.dxp-tile .popup h1{float:left}div.dxp.dxp-tile .popup dxp-image{float:right;width:50%;height:400px;overflow:hidden}div.dxp.dxp-tile .popup .dxp-icon-close{position:absolute;right:32px;top:16px;z-index:9;background:transparent;border:none}div.dxp.dxp-tile .popup .image-overlay dxp-image{width:100%}\@-webkit-keyframes fadeout{0%{opacity:1}to{opacity:0}}\@keyframes fadeout{0%{opacity:1}to{opacity:0}}div.dxp.dxp-tile .popup.fadeout{animation:fadeout 1s ease-in forwards;-webkit-animation:fadeout 1s ease-in forwards;-moz-animation:fadeout 1s ease-in forwards;-ms-animation:fadeout 1s ease-in forwards;-o-animation:fadeout 1s ease-in forwards;pointer-events:none}\@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}\@keyframes fadein{0%{opacity:0}to{opacity:1}}div.dxp.dxp-tile .popup.fadein{animation:fadein 1s ease-in forwards;-webkit-animation:fadein 1s ease-in forwards;-moz-animation:fadein 1s ease-in forwards;-ms-animation:fadein 1s ease-in forwards;-o-animation:fadein 1s ease-in forwards}div.dxp.dxp-tile.dxp-scrollable-container{margin-top:0}div.dxp.dxp-tile.show-popup{position:static;z-index:999;left:0}div.dxp.dxp-tile.show-popup .popup{display:block}\@media screen and (max-width:767px){div.dxp.dxp-tile .tile-container .media-container{height:323px}div.dxp.dxp-tile .tile-container .media-container .content-video,div.dxp.dxp-tile .tile-container .media-container img.content-background-img{width:100%;height:323px}div.dxp.dxp-tile .tile-container .media-container .cta{bottom:30px;left:16px;right:16px}div.dxp.dxp-tile .tile-container .media-container .cta .desc{margin-bottom:15px}div.dxp.dxp-tile.square .media-container div.cta{position:absolute;bottom:100px;left:16px;right:16px}}\@media (min-width:768px){div.dxp.dxp-tile.square .tile-container .media-container{height:392px}div.dxp.dxp-tile.square .tile-container .content-video,div.dxp.dxp-tile.square .tile-container img.content-background-img{width:100%;height:392px}div.dxp.dxp-tile .tile-container.media-container{height:347px}}\@media (min-width:992px){div.dxp.dxp-tile .tile-container .media-container{height:536px}div.dxp.dxp-tile .tile-container .media-container .content-video,div.dxp.dxp-tile .tile-container .media-container img.content-background-img{width:100%;height:536px}}"; },
        enumerable: true,
        configurable: true
    });
    return Tile;
}());
export { Tile as dxp_tile };
