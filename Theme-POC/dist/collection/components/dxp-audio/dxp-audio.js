import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-audio */
export class Audio {
    constructor() {
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
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Audio', messages);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-audio render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/dxp.min.css` }),
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/${this.theme}.min.css` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-audio.min.css` })]
        ];
        return (h("div", { style: this.hostStyle, class: `${this.base.componentClass()} ${this.position}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("audio", { autoplay: this.autoplay, muted: this.muted, ref: el => { this.audioRef = el; }, controls: true, class: this.defaultControls ? ' ' : 'hide-default', loop: this.loop },
                h("source", { src: this.src, type: `audio/${this.type}` })),
            !this.defaultControls ?
                h("div", null,
                    !this.hidePlayPauseControl ?
                        h("a", { role: "button", href: "javascript:void(0)", onClick: () => { this.toggleAudio(); }, "aria-label": this.ariaLabelPlayPause, class: "audio-control" },
                            h("i", { class: `${this.audioState.playing ? 'pause-icon' : 'play-icon'}` }))
                        : '',
                    this.hidePlayPauseControl && !this.autoplay ?
                        h("a", { role: "button", href: "javascript:void(0)", onClick: () => { this.toggleAudio(); }, "aria-label": this.ariaLabelPlayPause, class: "audio-control" },
                            h("i", { class: `${this.audioState.playing ? 'unmute-icon' : 'mute-icon'}` }))
                        :
                            h("a", { role: "button", href: "javascript:void(0)", onClick: () => { this.toggleMute(); }, "aria-label": this.ariaLabelMuteUnmute, class: "audio-control" },
                                h("i", { class: `${this.muted ? 'mute-icon' : 'unmute-icon'}` })))
                : ''));
    }
    static get is() { return "dxp-audio"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-audio.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-audio.css"]
    }; }
    static get properties() { return {
        "ariaLabelMuteUnmute": {
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
                "text": "aria-label for mute unmute button for accessibility."
            },
            "attribute": "aria-label-mute-unmute",
            "reflect": false
        },
        "ariaLabelPlayPause": {
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
                "text": "aria-label for pay pause button for accessibility."
            },
            "attribute": "aria-label-play-pause",
            "reflect": false
        },
        "autoplay": {
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
                "text": "audio auto play property"
            },
            "attribute": "autoplay",
            "reflect": false,
            "defaultValue": "false"
        },
        "defaultControls": {
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
                "text": "audio default control property"
            },
            "attribute": "default-controls",
            "reflect": false,
            "defaultValue": "true"
        },
        "hidePlayPauseControl": {
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
                "text": "hide audio play pause control"
            },
            "attribute": "hide-play-pause-control",
            "reflect": false,
            "defaultValue": "false"
        },
        "loop": {
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
                "text": "holds boolean value of looping audio"
            },
            "attribute": "loop",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "audio mute unmute control property"
            },
            "attribute": "muted",
            "reflect": false,
            "defaultValue": "false"
        },
        "position": {
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
                "text": "holds position for audio player"
            },
            "attribute": "position",
            "reflect": false
        },
        "preload": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'auto' | 'none' | 'metadata'",
                "resolved": "\"auto\" | \"metadata\" | \"none\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "audio preload property"
            },
            "attribute": "preload",
            "reflect": false,
            "defaultValue": "'auto'"
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
                "text": "holds source for audio file"
            },
            "attribute": "src",
            "reflect": false
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'mpeg' | 'ogg' | 'wav'",
                "resolved": "\"mpeg\" | \"ogg\" | \"wav\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds type of audio format"
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'mpeg'"
        }
    }; }
    static get states() { return {
        "audioState": {},
        "dir": {},
        "hostStyle": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "resize",
            "method": "windowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
