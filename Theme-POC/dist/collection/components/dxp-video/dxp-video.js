import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const VIDEO_FULL_HEIGHT = 'full-height-video';
/** dxp-video */
export class Video {
    constructor() {
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
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Video', messages);
        // autoplay is always true for disable video controls
        if (this.disableControls) {
            this.autoplay = true;
        }
        this.srcVideo ? this.formVideoSource() : dxp.log.debug(this.element.tagName, 'componentWillLoad()', 'Source id is missing');
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
            h("button", { ref: el => this.customMuteRef = el, onClick: () => { this.toggleMute(); }, class: `${this.customMuteButtonPosition} custom-control` },
                h("i", { class: `${this.muted ? 'mute-icon' : 'unmute-icon'}` }))
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
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
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
        const videoposter = h("div", { ref: el => this.iframePoster = el, onClick: () => this.onPosterClick(), tabindex: "0", class: "video-thumbnail", "aria-label": dxp.i18n.t('Video:play'), style: { display: (this.autoplay) ? 'none' : 'block' } },
            h("img", { "data-src": this.srcPoster, style: { display: (!this.srcPoster) ? 'none' : 'block' } }),
            h("div", { class: "video-poster" },
                h("img", { "data-src": `${process.env.DXP_COMPONENT_ASSET_PATH}/dxp-video/play-icon-${this.iconType}.png` })));
        return (h("div", { tabindex: "0", class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive embed-responsive-16by9' },
            h("iframe", { ref: el => this.iframeRef = el, style: { display: (this.autoplay || !this.srcPoster) ? 'block' : 'none' }, class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive-item', src: (this.autoplay || !this.srcPoster) ? this.videoSource : '', frameborder: "0", allowFullScreen: true }),
            videoposter));
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
        this.base.createSeoSchema(dxp, this.element, schema);
    }
    /** on mute toggle */
    toggleMute() {
        this.muted = !this.muted;
        this.emitAnalyticsData(this.muted ? 'mute' : 'unmute');
    }
    /** Render the video */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-video render() : ${process.env.MODE}`);
        const video = () => {
            if (this.type !== 'hostedInternally' && (this.srcVideo && this.srcVideo.toLowerCase().indexOf('akamai') === -1)) {
                return this.handleAkamai();
            }
            // video when hosted internally
            return (h("div", { class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive embed-responsive-16by9' },
                h("video", { ref: el => this.videoElementRef = el, class: this.fullHeight ? VIDEO_FULL_HEIGHT : 'embed-responsive-item', poster: this.srcPoster, "data-src": this.videoSource, loop: true, autoplay: this.autoplay, muted: this.muted, controls: !this.disableControls, width: this.width }),
                this.disableVideoControls()));
        };
        const styles = (h("span", null,
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-video.min.css` }),
            this.dtmUrl && (h("script", { src: this.dtmUrl }))));
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme, style: { width: `${this.width}px`, height: this.fullHeight ? '100%' : '' } },
            styles,
            video()));
    }
    static get is() { return "dxp-video"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-video.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-video.css"]
    }; }
    static get properties() { return {
        "autoplay": {
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
                "text": "video auto play property"
            },
            "attribute": "autoplay",
            "reflect": false,
            "defaultValue": "false"
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
            "reflect": false,
            "defaultValue": "false"
        },
        "fullHeight": {
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
                "text": "display full height video"
            },
            "attribute": "full-height",
            "reflect": false,
            "defaultValue": "false"
        },
        "iconType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'dark' | 'light'",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "video play icon type e.g light, dark"
            },
            "attribute": "icon-type",
            "reflect": false,
            "defaultValue": "'light'"
        },
        "muted": {
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
                "text": "video mute unmute control property"
            },
            "attribute": "muted",
            "reflect": false,
            "defaultValue": "true"
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
                "text": "video poster/thumbnail"
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
                "text": "video source e.g youtube, youku or external source"
            },
            "attribute": "src-video",
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
                "text": "video type e.g youtube, youku or external source"
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
                "text": "video  description"
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
                "text": "video name. This property is required for analytics and SEO"
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
                "text": "video first publish date."
            },
            "attribute": "video-upload-date",
            "reflect": false
        },
        "width": {
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
                "text": "video width"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dtmUrl": {},
        "locale": {},
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
        }]; }
    static get methods() { return {
        "pauseVideo": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "to call pause from outside for video hosted internally",
                "tags": []
            }
        },
        "playVideo": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "to call play from outside for video hosted internally",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
