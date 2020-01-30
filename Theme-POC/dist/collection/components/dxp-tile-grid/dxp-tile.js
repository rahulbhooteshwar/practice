import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const IMAGE_BACKGROUND = 'image-background';
/** dxp-tile */
export class Tile {
    constructor() {
        /** To show video on click on play icon */
        this.isVideoShow = false;
        /** background type for regular banner */
        this.backgroundType = IMAGE_BACKGROUND;
        /** icon type for header video */
        this.iconType = 'light';
    }
    /** component will load */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Tile', messages);
    }
    /** key up events */
    handleUpkeyEvents(e) {
        const keycode = e.key || e.code;
        if (keycode.toLowerCase() === 'escape' && this.isVideoShow) {
            this.isVideoShow = false;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** crossIcon handler */
    closeIconClickHandler() {
        const bodyEle = document.querySelector('body');
        bodyEle.style.overflow = 'unset';
        const parentEle = this.element.parentElement.parentElement;
        parentEle.classList.remove('show-popup');
        const elepopup = this.base.shadowRootQuerySelector(this.element, '.popup');
        elepopup.classList.remove('fadein');
        elepopup.classList.add('fadeout');
    }
    /** show the content video block */
    getContentOfVideo() {
        return (h("div", { class: "content-video" },
            h("img", { class: "content-background-img", src: this.srcPoster, alt: dxp.i18n.t('Tile:videoPosterImageText') }),
            h("a", { class: "play-icon", "aria-label": dxp.i18n.t('Tile:videoPlayBtnText'), onClick: event => this.toggleVideo(true, event) },
                h("img", { alt: "image", src: `${process.env.DXP_COMPONENT_ASSET_PATH}/images/icons/play-icon-${this.iconType}.png` }))));
    }
    /** show video overlay block */
    getVideoOverlay() {
        const bodyEle = document.querySelector('body');
        bodyEle.style.overflow = 'hidden';
        return (h("div", { class: "overlay-video-block" },
            h("a", { role: "button", class: "btn-close", "aria-label": dxp.i18n.t('TileVideo:close'), onClick: event => this.toggleVideo(false, event) },
                h("span", { class: "dxp-icon dxp-icon-large dxp-icon-close white-cross-icon" })),
            h("div", { class: "align-middle" },
                h("dxp-video", { type: this.videoType, "icon-type": this.iconType, "src-video": this.src, "src-poster": this.srcPoster, autoplay: this.autoPlay, "disable-controls": this.disableControls, "video-name": this.videoName, "video-description": this.videoDescription, "video-upload-date": this.videoUploadDate }))));
    }
    /** if image don't have link or href */
    imageClickHandler(event) {
        const eleVideo = this.base.shadowRootQuerySelector(this.element, '.content-video');
        if (eleVideo) {
            this.toggleVideo(true, event);
        }
        else {
            const popEle = this.element.parentElement.parentElement.style.getPropertyValue('left').match(/(-?[0-9\.]+)/g);
            const transformVal = popEle;
            const data = Math.abs(transformVal);
            if (!this.href) {
                const parentEle = this.element.parentElement.parentElement;
                parentEle.classList.add('show-popup');
                const elepopup = this.base.shadowRootQuerySelector(this.element, '.popup');
                elepopup.style.left = `${data}px`;
                elepopup.classList.remove('fadeout');
                elepopup.classList.add('fadein');
                elepopup.classList.remove('dxp-none');
            }
        }
    }
    /** Show/hide the video  */
    toggleVideo(displayVideo, ev) {
        ev.preventDefault();
        this.isVideoShow = displayVideo;
        const bodyEle = document.querySelector('body');
        bodyEle.style.overflow = 'unset';
    }
    /** Render the tile */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-tile render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tile-grid.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} ${this.isSquare ? 'square' : ''}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "tile-container", tabindex: "1" },
                h("div", { class: "media-container", onClick: event => !this.isSquare && this.imageClickHandler(event) },
                    this.backgroundType === IMAGE_BACKGROUND ? (
                    /* tslint:disable: ter-no-script-url */
                    h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, responsive: this.responsive, href: this.href ? this.href : 'javascript:void(0)', "open-in-new-tab": this.openInNewTab, "focal-point": this.focalPoint }, " ")) :
                        this.backgroundType === 'video-background' && this.getContentOfVideo(),
                    h("div", { class: "cta" },
                        this.badgeText && h("div", { class: "badge" },
                            " ",
                            h("span", { class: "badge-cont" },
                                h("span", { class: "badge-text" }, this.badgeText)),
                            " "),
                        this.eyebrowTitle && h("p", { class: "dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowTitle),
                        this.tileCaption && h("h5", { class: "dxp-title-4" }, this.tileCaption),
                        this.description && h("p", { class: "desc dxp-font-size-sm" }, this.description),
                        h("slot", { name: "cta" })))),
            h("div", { class: "popup dxp-scrollable-container dxp-none" },
                h("button", { class: "dxp-icon dxp-icon-large dxp-icon-close", "aria-label": dxp.i18n.t('Popup:closeIcon'), onClick: () => { this.closeIconClickHandler(); } }),
                h("div", { class: "popup-contents dxp-scrollable" },
                    h("slot", null))),
            this.isVideoShow && this.getVideoOverlay()));
    }
    static get is() { return "dxp-tile"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-tile.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-tile.css"]
    }; }
    static get properties() { return {
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
                "original": "'image-background' | 'video-background'",
                "resolved": "\"image-background\" | \"video-background\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "background type for regular banner"
            },
            "attribute": "background-type",
            "reflect": false,
            "defaultValue": "IMAGE_BACKGROUND"
        },
        "badgeText": {
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
                "text": "text for badge"
            },
            "attribute": "badge-text",
            "reflect": false
        },
        "ctaListData": {
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
                "text": "cta for tile"
            },
            "attribute": "cta-list-data",
            "reflect": false
        },
        "description": {
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
                "text": "is description for square tile"
            },
            "attribute": "description",
            "reflect": false
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
                "text": "Focal point of XL images"
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
                "text": "href for tile component"
            },
            "attribute": "href",
            "reflect": false
        },
        "iconType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'light' | 'dark'",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "icon type for header video"
            },
            "attribute": "icon-type",
            "reflect": false,
            "defaultValue": "'light'"
        },
        "isSquare": {
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
                "text": "check if tile is square"
            },
            "attribute": "is-square",
            "reflect": false
        },
        "openInNewTab": {
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
                "text": "Link target.  Set to true to open in an new window."
            },
            "attribute": "open-in-new-tab",
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
                "text": "Path for the Background image and video to display"
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
        "tileCaption": {
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
                "text": "title of caption to be shown over the image"
            },
            "attribute": "tile-caption",
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
        "dir": {},
        "isVideoShow": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keyup",
            "method": "handleUpkeyEvents",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
