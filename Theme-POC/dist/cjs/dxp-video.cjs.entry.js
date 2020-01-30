'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        play: 'Play'
    }
};

const VIDEO_FULL_HEIGHT = 'full-height-video';
const Video = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
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
        this.analyticsDataEmitter = core$1.createEvent(this, "dxp_comp", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Video', messages);
        // autoplay is always true for disable video controls
        if (this.disableControls) {
            this.autoplay = true;
        }
        this.srcVideo ? this.formVideoSource() : core$1.dxp.log.debug(this.element.tagName, 'componentWillLoad()', 'Source id is missing');
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidLoad() {
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
    }
    /** component did update  */
    componentDidUpdate() {
        this.lazyLoadVideo();
    }
    /** keydown handler */
    keyDownHandler(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            // on enter keypress
            if (this.iframePoster && this.iframePoster.style.display !== 'none') {
                // only if manually created poster is visible
                this.onPosterClick();
            }
        }
    }
    /** to call pause from outside for video hosted internally */
    async pauseVideo() {
        const videoEle = this.base.shadowRootQuerySelector(this.element, 'video');
        videoEle.pause();
    }
    /** to call play from outside for video hosted internally */
    async playVideo() {
        const videoEle = this.base.shadowRootQuerySelector(this.element, 'video');
        videoEle.play();
    }
    /** disable video constrols */
    disableVideoControls() {
        return (this.disableControls && this.customMuteButton ?
            core$1.h("button", { ref: el => this.customMuteRef = el, onClick: () => { this.toggleMute(); }, class: `${this.customMuteButtonPosition} custom-control` }, core$1.h("i", { class: `${this.muted ? 'mute-icon' : 'unmute-icon'}` }))
            : '');
    }
    /** emit analytics data */
    emitAnalyticsData(videoAction) {
        const analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_title': this.srcVideo,
            'di_comp_videoname': this.videoName,
            'di_comp_videoaction': videoAction
        };
        this.analyticsDataEmitter.emit(analyticsInfoObj);
        core$1.dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
    }
    /** lazy load fallback condition for IE and Edge browser */
    fallBack() {
        const lazyloadVideo = this.base.shadowRootQuerySelector(this.element, 'video', false);
        const lazyloadImage = this.base.shadowRootQuerySelector(this.element, 'img', false);
        setTimeout(() => {
            const scrollTop = window.pageYOffset;
            if (lazyloadVideo && lazyloadVideo['offsetTop'] < (window.innerHeight + scrollTop)) {
                lazyloadVideo['src'] = lazyloadVideo['dataset'].src;
            }
            if (lazyloadImage && lazyloadImage['offsetTop'] < (window.innerHeight + scrollTop)) {
                lazyloadImage['src'] = lazyloadImage['dataset'].src;
            }
        }, 20);
    }
    /** function to form video source */
    formVideoSource() {
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
            this.videoSource = this.autoplay ? `${this.srcVideo}?autoplay=1` : this.srcVideo;
        }
    }
    /** handle type for hosted extenally */
    handleAkamai() {
        const videoposter = core$1.h("div", { ref: el => this.iframePoster = el, onClick: () => this.onPosterClick(), tabindex: "0", class: "video-thumbnail", "aria-label": core$1.dxp.i18n.t('Video:play'), style: { display: (this.autoplay) ? 'none' : 'block' } }, core$1.h("img", { "data-src": this.srcPoster, style: { display: (!this.srcPoster) ? 'none' : 'block' } }), core$1.h("div", { class: "video-poster" }, core$1.h("img", { "data-src": `${"https://asset.mastercard.com/dxp-ui/assets"}/dxp-video/play-icon-${this.iconType}.png` })));
        return (core$1.h("div", { tabindex: "0", class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive embed-responsive-16by9' }, core$1.h("iframe", { ref: el => this.iframeRef = el, style: { display: (this.autoplay || !this.srcPoster) ? 'block' : 'none' }, class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive-item', src: (this.autoplay || !this.srcPoster) ? this.videoSource : '', frameborder: "0", allowFullScreen: true }), videoposter));
    }
    /** handle vimeo video type */
    handleVimeo() {
        const source = 'https://player.vimeo.com/video/';
        this.videoSource = this.is_url(this.srcVideo) ? this.srcVideo.slice(this.srcVideo.lastIndexOf('/') + 1, this.srcVideo.length) : this.srcVideo;
        this.videoSource = source + this.videoSource;
        this.videoSource = this.autoplay ? `${this.videoSource}?autoplay=1` : this.videoSource;
        if (this.disableControls) {
            const tempVideoSrc = this.videoSource.split('?')[0];
            this.videoSource = `${tempVideoSrc}?autoplay=1&api=1&background=1&loop=1`;
        }
    }
    /** handle Youku video type */
    handleYouku() {
        let videoSourceId;
        const source = 'https://player.youku.com/embed/';
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
        this.videoSource = this.autoplay ? `${this.videoSource}?autoplay=1` : this.videoSource;
    }
    /** handle youtube video type */
    handleYoutube() {
        let playlistVideoId; // video id require for looping video
        let videoSourceId;
        const source = 'https://www.youtube.com/embed/';
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
                const srcAfterEmbedPath = this.srcVideo.split('embed/')[1];
                playlistVideoId = srcAfterEmbedPath.split('?')[0]; // fetching video id from embed src
            }
        }
        else {
            playlistVideoId = this.srcVideo;
            this.videoSource = this.srcVideo;
            this.videoSource = source + this.videoSource;
        }
        this.videoSource = this.autoplay ? `${this.videoSource}?autoplay=1` : this.videoSource;
        if (this.disableControls) {
            const tempVideoSrc = this.videoSource.split('?')[0];
            this.videoSource = `${tempVideoSrc}?autoplay=1&controls=0&showinfo=0&rel=0&version=3&loop=1&playlist=${playlistVideoId}`;
        }
    }
    /** identify if string is valid url */
    is_url(str) {
        const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (regexp.test(str)) {
            return true;
        }
        return false;
    }
    /** apply lazy loading for browser chrome, safari and firefox. Not supported on IE/Edge as it does not support event */
    lazyLoadVideo() {
        let lazyloadVideo;
        let lazyLoadImage;
        if (window['IntersectionObserver']) {
            lazyloadVideo = this.base.shadowRootQuerySelector(this.element, 'video', false);
            lazyLoadImage = this.base.shadowRootQuerySelector(this.element, 'img', false);
            const videoObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        video['src'] = video['dataset'].src;
                        videoObserver.unobserve(video);
                    }
                });
            });
            const imageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image['src'] = image['dataset'].src;
                        imageObserver.unobserve(image);
                    }
                });
            });
            if (lazyloadVideo) {
                videoObserver.observe(lazyloadVideo);
            }
            if (lazyLoadImage) {
                imageObserver.observe(lazyLoadImage);
            }
        }
        else {
            this.fallBack();
        }
    }
    /** on poster click */
    onPosterClick() {
        this.iframeRef.setAttribute('src', `${this.videoSource}?autoplay=1`);
        this.iframeRef.setAttribute('style', 'display:block');
        this.iframePoster.setAttribute('style', 'display:none');
        this.emitAnalyticsData('play'); // emit data to analytics script on click on video poster
    }
    /** SEO script of Schema  */
    schemaScript() {
        const schemaObj = {
            '@context': 'http://schema.org',
            '@type': 'VideoObject',
            'name': this.videoName,
            'description': this.videoDescription,
            'thumbnailUrl': this.srcPoster,
            'uploadDate': this.videoUploadDate,
            'contentUrl': this.videoSource
        };
        const schema = JSON.stringify(schemaObj);
        /** created script tag to be appended on the body tag for SEO schema */
        this.base.createSeoSchema(core$1.dxp, this.element, schema);
    }
    /** on mute toggle */
    toggleMute() {
        this.muted = !this.muted;
        this.emitAnalyticsData(this.muted ? 'mute' : 'unmute');
    }
    /** Render the video */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-video render() : ${"DEVELOPMENT"}`);
        const video = () => {
            if (this.type !== 'hostedInternally' && (this.srcVideo && this.srcVideo.toLowerCase().indexOf('akamai') === -1)) {
                return this.handleAkamai();
            }
            // video when hosted internally
            return (core$1.h("div", { class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive embed-responsive-16by9' }, core$1.h("video", { ref: el => this.videoElementRef = el, class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive-item', poster: this.srcPoster, "data-src": this.videoSource, loop: true, autoplay: this.autoplay, muted: this.muted, controls: !this.disableControls, width: this.width }), this.disableVideoControls()));
        };
        const styles = (core$1.h("span", null, core$1.h("link", { rel: "stylesheet", href: `` }), this.theme && core$1.h("link", { rel: "stylesheet", href: `` }), this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-video.min.css` }), this.dtmUrl && (core$1.h("script", { src: this.dtmUrl }))));
        return (core$1.h("div", { class: this.base.componentClass(), "data-theme": this.theme, style: { width: `${this.width}px`, height: this.fullHeight ? '100%' : '' } }, styles, video()));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-video{width:100%}div.dxp.dxp-video .top-left{position:absolute;top:0;left:0}div.dxp.dxp-video .top-right{position:absolute;top:0;right:0}div.dxp.dxp-video .bottom-right{position:absolute;bottom:0;right:0}div.dxp.dxp-video .bottom-left{position:absolute;bottom:0;left:0}div.dxp.dxp-video .custom-control{cursor:pointer;z-index:100;bottom:.9375rem;right:.9375rem;margin:.125rem;border-radius:50%;overflow:hidden;border:none;-webkit-backdrop-filter:blur(1.25rem);backdrop-filter:blur(1.25rem)}div.dxp.dxp-video .custom-control,div.dxp.dxp-video .custom-control i{display:inline-block;height:2.5rem;width:2.5rem}div.dxp.dxp-video .full-height-video{height:100%;width:100%}div.dxp.dxp-video .full-height-video iframe,div.dxp.dxp-video .full-height-video video{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);height:auto;width:auto;min-height:100%;min-width:100%}div.dxp.dxp-video .embed-responsive{position:relative;padding-bottom:56.25%;height:0}div.dxp.dxp-video .embed-responsive iframe{position:absolute;top:0;left:0;width:100%;height:100%}div.dxp.dxp-video .video-thumbnail{cursor:pointer;position:absolute;text-align:center;top:0;width:100%;height:100%}div.dxp.dxp-video .video-thumbnail img{width:100%;height:100%}div.dxp.dxp-video .video-overlay,div.dxp.dxp-video .video-poster{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}div.dxp.dxp-video .video-overlay{display:block;height:80px;width:80px}\@media (max-width:767.98px){div.dxp.dxp-video .embed-responsive{position:relative;display:block;width:100%!important;padding:0;height:auto!important;overflow:hidden}div.dxp.dxp-video .embed-responsive:before{display:block;content:\"\"}div.dxp.dxp-video .embed-responsive-item,div.dxp.dxp-video iframe,div.dxp.dxp-video video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}div.dxp.dxp-video .embed-responsive-16by9:before{padding-top:56.25%}div.dxp.dxp-video .video-thumbnail{position:absolute;top:0}}"; }
};

exports.dxp_video = Video;
