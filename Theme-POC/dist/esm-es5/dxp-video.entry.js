var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
    'en': {
        play: 'Play'
    }
};
var VIDEO_FULL_HEIGHT = 'full-height-video';
var Video = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** video auto play property */
        this.autoplay = false;
        /** custom mute button in case of disabled controls for HTML5 video */
        this.customMuteButton = false;
        /** custom mute button position */
        this.customMuteButtonPosition = 'top-right';
        /** disable video controls */
        this.disableControls = false;
        /** display full height video  */
        this.fullHeight = false;
        /** video play icon type e.g light, dark */
        this.iconType = 'light';
        /** video mute unmute control property */
        this.muted = true;
        this.analyticsDataEmitter = createEvent(this, "dxp_comp", 7);
    }
    /** actions to be performed prior to component loading */
    class_1.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Video', messages);
        // autoplay is always true for disable video controls
        if (this.disableControls) {
            this.autoplay = true;
        }
        this.srcVideo ? this.formVideoSource() : dxp.log.debug(this.element.tagName, 'componentWillLoad()', 'Source id is missing');
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    class_1.prototype.componentDidLoad = function () {
        if (this.autoplay && this.type === 'hostedInternally' ||
            (this.type === 'hostedExternally' && this.srcVideo.toLowerCase().indexOf('akamai') > 0)) {
            if (!this.width) {
                this.videoElementRef.setAttribute('width', '100%');
            }
        }
        if (this.autoplay) {
            this.emitAnalyticsData('play');
        }
        this.schemaScript();
        this.lazyLoadVideo();
    };
    /** component did update  */
    class_1.prototype.componentDidUpdate = function () {
        this.lazyLoadVideo();
    };
    /** keydown handler */
    class_1.prototype.keyDownHandler = function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            // on enter keypress
            if (this.iframePoster && this.iframePoster.style.display !== 'none') {
                // only if manually created poster is visible
                this.onPosterClick();
            }
        }
    };
    /** to call pause from outside for video hosted internally */
    class_1.prototype.pauseVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var videoEle;
            return __generator(this, function (_a) {
                videoEle = this.base.shadowRootQuerySelector(this.element, 'video');
                videoEle.pause();
                return [2 /*return*/];
            });
        });
    };
    /** to call play from outside for video hosted internally */
    class_1.prototype.playVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var videoEle;
            return __generator(this, function (_a) {
                videoEle = this.base.shadowRootQuerySelector(this.element, 'video');
                videoEle.play();
                return [2 /*return*/];
            });
        });
    };
    /** disable video constrols */
    class_1.prototype.disableVideoControls = function () {
        var _this = this;
        return (this.disableControls && this.customMuteButton ?
            h("button", { ref: function (el) { return _this.customMuteRef = el; }, onClick: function () { _this.toggleMute(); }, class: this.customMuteButtonPosition + " custom-control" }, h("i", { class: "" + (this.muted ? 'mute-icon' : 'unmute-icon') }))
            : '');
    };
    /** emit analytics data */
    class_1.prototype.emitAnalyticsData = function (videoAction) {
        var analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_title': this.srcVideo,
            'di_comp_videoname': this.videoName,
            'di_comp_videoaction': videoAction
        };
        this.analyticsDataEmitter.emit(analyticsInfoObj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
    };
    /** lazy load fallback condition for IE and Edge browser */
    class_1.prototype.fallBack = function () {
        var lazyloadVideo = this.base.shadowRootQuerySelector(this.element, 'video', false);
        var lazyloadImage = this.base.shadowRootQuerySelector(this.element, 'img', false);
        setTimeout(function () {
            var scrollTop = window.pageYOffset;
            if (lazyloadVideo && lazyloadVideo['offsetTop'] < (window.innerHeight + scrollTop)) {
                lazyloadVideo['src'] = lazyloadVideo['dataset'].src;
            }
            if (lazyloadImage && lazyloadImage['offsetTop'] < (window.innerHeight + scrollTop)) {
                lazyloadImage['src'] = lazyloadImage['dataset'].src;
            }
        }, 20);
    };
    /** function to form video source */
    class_1.prototype.formVideoSource = function () {
        if (this.type && this.type.toLocaleLowerCase() === 'youtube') {
            this.handleYoutube();
        }
        else if (this.type && this.type.toLocaleLowerCase() === 'vimeo') {
            this.handleVimeo();
        }
        else if (this.type && this.type.toLocaleLowerCase() === 'youku') {
            this.handleYouku();
        }
        else {
            this.videoSource = this.autoplay ? this.srcVideo + "?autoplay=1" : this.srcVideo;
        }
    };
    /** handle type for hosted extenally */
    class_1.prototype.handleAkamai = function () {
        var _this = this;
        var videoposter = h("div", { ref: function (el) { return _this.iframePoster = el; }, onClick: function () { return _this.onPosterClick(); }, tabindex: "0", class: "video-thumbnail", "aria-label": dxp.i18n.t('Video:play'), style: { display: (this.autoplay) ? 'none' : 'block' } }, h("img", { "data-src": this.srcPoster, style: { display: (!this.srcPoster) ? 'none' : 'block' } }), h("div", { class: "video-poster" }, h("img", { "data-src": "https://asset.mastercard.com/dxp-ui/assets" + "/dxp-video/play-icon-" + this.iconType + ".png" })));
        return (h("div", { tabindex: "0", class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive embed-responsive-16by9' }, h("iframe", { ref: function (el) { return _this.iframeRef = el; }, style: { display: (this.autoplay || !this.srcPoster) ? 'block' : 'none' }, class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive-item', src: (this.autoplay || !this.srcPoster) ? this.videoSource : '', frameborder: "0", allowFullScreen: true }), videoposter));
    };
    /** handle vimeo video type */
    class_1.prototype.handleVimeo = function () {
        var source = 'https://player.vimeo.com/video/';
        this.videoSource = this.is_url(this.srcVideo) ? this.srcVideo.slice(this.srcVideo.lastIndexOf('/') + 1, this.srcVideo.length) : this.srcVideo;
        this.videoSource = source + this.videoSource;
        this.videoSource = this.autoplay ? this.videoSource + "?autoplay=1" : this.videoSource;
        if (this.disableControls) {
            var tempVideoSrc = this.videoSource.split('?')[0];
            this.videoSource = tempVideoSrc + "?autoplay=1&api=1&background=1&loop=1";
        }
    };
    /** handle Youku video type */
    class_1.prototype.handleYouku = function () {
        var videoSourceId;
        var source = 'https://player.youku.com/embed/';
        if (this.is_url(this.srcVideo)) {
            if (this.srcVideo.indexOf('/embed/') === -1) {
                videoSourceId = this.srcVideo.split('id_');
                videoSourceId = videoSourceId[1].split('.html');
                this.videoSource = videoSourceId[0].slice(0);
                this.videoSource = source + this.videoSource;
            }
            else {
                this.videoSource = this.srcVideo;
            }
        }
        else {
            this.videoSource = this.srcVideo;
            this.videoSource = source + this.videoSource;
        }
        this.videoSource = this.autoplay ? this.videoSource + "?autoplay=1" : this.videoSource;
    };
    /** handle youtube video type */
    class_1.prototype.handleYoutube = function () {
        var playlistVideoId; // video id require for looping video
        var videoSourceId;
        var source = 'https://www.youtube.com/embed/';
        if (this.is_url(this.srcVideo)) {
            if (this.srcVideo.indexOf('/embed/') === -1) {
                playlistVideoId = videoSourceId = this.srcVideo.split('?');
                playlistVideoId = playlistVideoId[1].split('=')[1]; // fetching qHoyF4yKhjU video id from v=qHoyF4yKhjU
                videoSourceId = videoSourceId[1].split('&');
                this.videoSource = videoSourceId[0].slice(2);
                this.videoSource = source + this.videoSource;
            }
            else {
                this.videoSource = this.srcVideo;
                var srcAfterEmbedPath = this.srcVideo.split('embed/')[1];
                playlistVideoId = srcAfterEmbedPath.split('?')[0]; // fetching video id from embed src
            }
        }
        else {
            playlistVideoId = this.srcVideo;
            this.videoSource = this.srcVideo;
            this.videoSource = source + this.videoSource;
        }
        this.videoSource = this.autoplay ? this.videoSource + "?autoplay=1" : this.videoSource;
        if (this.disableControls) {
            var tempVideoSrc = this.videoSource.split('?')[0];
            this.videoSource = tempVideoSrc + "?autoplay=1&controls=0&showinfo=0&rel=0&version=3&loop=1&playlist=" + playlistVideoId;
        }
    };
    /** identify if string is valid url */
    class_1.prototype.is_url = function (str) {
        var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (regexp.test(str)) {
            return true;
        }
        return false;
    };
    /** apply lazy loading for browser chrome, safari and firefox. Not supported on IE/Edge as it does not support event */
    class_1.prototype.lazyLoadVideo = function () {
        var lazyloadVideo;
        var lazyLoadImage;
        if (window['IntersectionObserver']) {
            lazyloadVideo = this.base.shadowRootQuerySelector(this.element, 'video', false);
            lazyLoadImage = this.base.shadowRootQuerySelector(this.element, 'img', false);
            var videoObserver_1 = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var video = entry.target;
                        video['src'] = video['dataset'].src;
                        videoObserver_1.unobserve(video);
                    }
                });
            });
            var imageObserver_1 = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        image['src'] = image['dataset'].src;
                        imageObserver_1.unobserve(image);
                    }
                });
            });
            if (lazyloadVideo) {
                videoObserver_1.observe(lazyloadVideo);
            }
            if (lazyLoadImage) {
                imageObserver_1.observe(lazyLoadImage);
            }
        }
        else {
            this.fallBack();
        }
    };
    /** on poster click */
    class_1.prototype.onPosterClick = function () {
        this.iframeRef.setAttribute('src', this.videoSource + "?autoplay=1");
        this.iframeRef.setAttribute('style', 'display:block');
        this.iframePoster.setAttribute('style', 'display:none');
        this.emitAnalyticsData('play'); // emit data to analytics script on click on video poster
    };
    /** SEO script of Schema  */
    class_1.prototype.schemaScript = function () {
        var schemaObj = {
            '@context': 'http://schema.org',
            '@type': 'VideoObject',
            'name': this.videoName,
            'description': this.videoDescription,
            'thumbnailUrl': this.srcPoster,
            'uploadDate': this.videoUploadDate,
            'contentUrl': this.videoSource
        };
        var schema = JSON.stringify(schemaObj);
        /** created script tag to be appended on the body tag for SEO schema */
        this.base.createSeoSchema(dxp, this.element, schema);
    };
    /** on mute toggle */
    class_1.prototype.toggleMute = function () {
        this.muted = !this.muted;
        this.emitAnalyticsData(this.muted ? 'mute' : 'unmute');
    };
    /** Render the video */
    class_1.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-video render() : " + "DEVELOPMENT");
        var video = function () {
            if (_this.type !== 'hostedInternally' && (_this.srcVideo && _this.srcVideo.toLowerCase().indexOf('akamai') === -1)) {
                return _this.handleAkamai();
            }
            // video when hosted internally
            return (h("div", { class: _this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive embed-responsive-16by9' }, h("video", { ref: function (el) { return _this.videoElementRef = el; }, class: _this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive-item', poster: _this.srcPoster, "data-src": _this.videoSource, loop: true, autoplay: _this.autoplay, muted: _this.muted, controls: !_this.disableControls, width: _this.width }), _this.disableVideoControls()));
        };
        var styles = (h("span", null, h("link", { rel: "stylesheet", href: "" }), this.theme && h("link", { rel: "stylesheet", href: "" }), this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-video.min.css" }), this.dtmUrl && (h("script", { src: this.dtmUrl }))));
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, style: { width: this.width + "px", height: this.fullHeight ? '100%' : '' } }, styles, video()));
    };
    Object.defineProperty(class_1.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "div.dxp.dxp-video{width:100%}div.dxp.dxp-video .top-left{position:absolute;top:0;left:0}div.dxp.dxp-video .top-right{position:absolute;top:0;right:0}div.dxp.dxp-video .bottom-right{position:absolute;bottom:0;right:0}div.dxp.dxp-video .bottom-left{position:absolute;bottom:0;left:0}div.dxp.dxp-video .custom-control{cursor:pointer;z-index:100;bottom:.9375rem;right:.9375rem;margin:.125rem;border-radius:50%;overflow:hidden;border:none;-webkit-backdrop-filter:blur(1.25rem);backdrop-filter:blur(1.25rem)}div.dxp.dxp-video .custom-control,div.dxp.dxp-video .custom-control i{display:inline-block;height:2.5rem;width:2.5rem}div.dxp.dxp-video .full-height-video{height:100%;width:100%}div.dxp.dxp-video .full-height-video iframe,div.dxp.dxp-video .full-height-video video{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);height:auto;width:auto;min-height:100%;min-width:100%}div.dxp.dxp-video .embed-responsive{position:relative;padding-bottom:56.25%;height:0}div.dxp.dxp-video .embed-responsive iframe{position:absolute;top:0;left:0;width:100%;height:100%}div.dxp.dxp-video .video-thumbnail{cursor:pointer;position:absolute;text-align:center;top:0;width:100%;height:100%}div.dxp.dxp-video .video-thumbnail img{width:100%;height:100%}div.dxp.dxp-video .video-overlay,div.dxp.dxp-video .video-poster{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}div.dxp.dxp-video .video-overlay{display:block;height:80px;width:80px}\@media (max-width:767.98px){div.dxp.dxp-video .embed-responsive{position:relative;display:block;width:100%!important;padding:0;height:auto!important;overflow:hidden}div.dxp.dxp-video .embed-responsive:before{display:block;content:\"\"}div.dxp.dxp-video .embed-responsive-item,div.dxp.dxp-video iframe,div.dxp.dxp-video video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}div.dxp.dxp-video .embed-responsive-16by9:before{padding-top:56.25%}div.dxp.dxp-video .video-thumbnail{position:absolute;top:0}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Video as dxp_video };
