'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        hello: 'Hello World!'
    },
    'en-US': {
        hello: 'Hello World! en-US'
    },
    'es': {
        hello: 'Hola Mundo!'
    },
    'es-ES': {
        hello: 'Hola Mundo! es-ES'
    }
};

const Audio = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** audio state */
        this.audioState = { playing: false };
        /** host style object */
        this.hostStyle = {};
        /** audio auto play property */
        this.autoplay = false;
        /** audio default control property */
        this.defaultControls = true;
        /** hide audio play pause control */
        this.hidePlayPauseControl = false;
        /** holds boolean value of looping audio */
        this.loop = false;
        /** audio mute unmute control property */
        this.muted = false;
        /** audio preload property */
        this.preload = 'auto';
        /** holds type of audio format */
        this.type = 'mpeg';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        this.base.i18Init(core.dxp, 'Audio', messages);
        if (this.autoplay) {
            this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: true });
        }
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.audioRef.addEventListener('ended', () => {
            this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: false });
        });
        this.updateTopPosition();
    }
    /** listener for window resize/orientation change */
    windowResize() {
        this.updateTopPosition();
    }
    /**
     * toggle audio play/pause state
     */
    async toggleAudio() {
        if (this.audioState.playing) {
            this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: false });
            this.audioRef.pause();
        }
        else {
            this.audioState = Object.assign(Object.assign({}, this.audioState), { playing: true });
            await this.audioRef.play();
        }
    }
    /**
     * toggle audio mute/unmute state
     */
    toggleMute() {
        this.muted = !this.muted;
    }
    /** update top position of floating audio */
    updateTopPosition() {
        if (this.position && this.position.startsWith('top')) {
            let availableHeader = document.querySelector('dxp-header');
            availableHeader = availableHeader ? availableHeader : document.querySelector('dxp-header-rich');
            if (availableHeader) {
                availableHeader.componentOnReady().then(hederRef => {
                    const headerElement = availableHeader.tagName.toLowerCase() === 'dxp-header' ?
                        this.base.shadowRootQuerySelector(hederRef, 'header', false)
                        : this.base.shadowRootQuerySelector(hederRef, '.header', false);
                    if (headerElement) {
                        this.hostStyle = Object.assign(Object.assign({}, this.hostStyle), { top: `${headerElement.offsetHeight + 5}px` });
                    }
                });
            }
            else if (document.querySelector('header')) {
                this.hostStyle = Object.assign(Object.assign({}, this.hostStyle), { top: `${document.querySelector('header').offsetHeight + 5}px` });
            }
        }
    }
    /** Render the audio */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-audio render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-audio.min.css` })]
        ];
        return (core.h("div", { style: this.hostStyle, class: `${this.base.componentClass()} ${this.position}`, dir: this.dir, "data-theme": this.theme }, styles, core.h("audio", { autoplay: this.autoplay, muted: this.muted, ref: el => { this.audioRef = el; }, controls: true, class: this.defaultControls ? ' ' : 'hide-default', loop: this.loop }, core.h("source", { src: this.src, type: `audio/${this.type}` })), !this.defaultControls ?
            core.h("div", null, !this.hidePlayPauseControl ?
                core.h("a", { role: "button", href: "javascript:void(0)", onClick: () => { this.toggleAudio(); }, "aria-label": this.ariaLabelPlayPause, class: "audio-control" }, core.h("i", { class: `${this.audioState.playing ? 'pause-icon' : 'play-icon'}` }))
                : '', this.hidePlayPauseControl && !this.autoplay ?
                core.h("a", { role: "button", href: "javascript:void(0)", onClick: () => { this.toggleAudio(); }, "aria-label": this.ariaLabelPlayPause, class: "audio-control" }, core.h("i", { class: `${this.audioState.playing ? 'unmute-icon' : 'mute-icon'}` }))
                :
                    core.h("a", { role: "button", href: "javascript:void(0)", onClick: () => { this.toggleMute(); }, "aria-label": this.ariaLabelMuteUnmute, class: "audio-control" }, core.h("i", { class: `${this.muted ? 'mute-icon' : 'unmute-icon'}` })))
            : ''));
    }
    get element() { return core.getElement(this); }
    static get style() { return "div.dxp.dxp-audio{background-color:transparent;z-index:100}div.dxp.dxp-audio .audio-control{cursor:pointer;bottom:.9375rem;right:.9375rem;margin:.125rem;border-radius:50%;overflow:hidden;background-color:rgba(60,60,60,.35);-webkit-backdrop-filter:blur(1.25rem);backdrop-filter:blur(1.25rem)}div.dxp.dxp-audio .audio-control,div.dxp.dxp-audio .audio-control i{display:inline-block;height:2.5rem;width:2.5rem}div.dxp.dxp-audio.top-left{position:fixed;top:10px;left:10px}div.dxp.dxp-audio.top-right{position:fixed;top:10px;right:10px}div.dxp.dxp-audio.bottom-left{position:fixed;bottom:10px;left:10px}div.dxp.dxp-audio.bottom-right{position:fixed;bottom:10px;right:10px}div.dxp.dxp-audio .hide-default{display:none}"; }
};

exports.dxp_audio = Audio;
