import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
const IMAGE_BACKGROUND_TYPE = 'image-background';
const VIDEO_BACKGROUND_TYPE = 'video-background';
const SOLID_BACKGROUND_TYPE = 'solid-background';
/** dxp-banner-regular */
export class BannerRegular {
    constructor() {
        /** add circle design over banner */
        this.addCircle = false;
        /** animation for overlay content and CTA */
        this.animation = false;
        /** custom mute button in case of disabled controls for HTML5 video */
        this.customMuteButton = false;
        /** custom mute button position */
        this.customMuteButtonPosition = 'top-right';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.cssClass = ['regular-banner-container', 'js-fontsize', this.theme, this.backgroundType,
            ((this.addCircle && this.backgroundType === SOLID_BACKGROUND_TYPE) ? 'css-circle-banner' : ''),
            (`${this.overlayPosition}-container`)].join(' ');
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** window resize event */
    windowResize() {
        this.responsive = this.base.returnBooleanValue(window.innerWidth < 768);
    }
    /** Render the regular banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-regular render() : ${process.env.MODE}`);
        this.containerPositionClass = ['overlay-content', this.overlayPosition].join(' ');
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: `${this.base.componentClass()} ${this.backgroundType}-container`, "data-theme": this.theme },
            styles,
            h("div", { dir: this.dir, class: this.cssClass },
                this.backgroundType === IMAGE_BACKGROUND_TYPE && (h("div", { class: "media-container" },
                    h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-title": this.imageTitle, alt: this.alt, "focal-point": this.focalPoint, "focal-point-lg": this.focalPointLg, "focal-point-md": this.focalPointMd, responsive: this.responsive }))),
                this.backgroundType === VIDEO_BACKGROUND_TYPE && (h("div", { class: "media-container" },
                    h("dxp-video", { type: this.videoType, "src-video": this.srcVideo, "disable-controls": this.disableControls, autoplay: this.autoPlay, "src-poster": this.srcPoster, "custom-mute-button": this.customMuteButton, "custom-mute-button-position": this.customMuteButtonPosition, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }))),
                h("div", { class: `overlay-content ${this.overlayPosition}` },
                    h("div", { class: this.animation ? 'text-container overlay-content-animation' : 'text-container' },
                        this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm", innerHTML: this.eyebrowTitle }),
                        this.titleText && h("h2", { innerHTML: this.titleText }),
                        this.subTitle && h("p", { class: "dxp-lead", innerHTML: this.subTitle })),
                    this.animation ?
                        h("div", { class: "slot-wrapper" },
                            h("slot", null)) : h("slot", null)))));
    }
    static get is() { return "dxp-banner-regular"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-regular.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-regular.css"]
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
                "text": "background type for regular banner"
            },
            "attribute": "background-type",
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
                "text": "focal Points"
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
        "overlayPosition": {
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
                "text": "overlay text content position"
            },
            "attribute": "overlay-position",
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
        "containerPositionClass": {},
        "cssClass": {},
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "resize",
            "method": "windowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
