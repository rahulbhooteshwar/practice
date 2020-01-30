'use strict';

/** class animator */
class Animator {
    constructor() {
        /** holds animation status */
        this.status = '';
        /** holds reset duration */
        this.durationReset = 2000;
        /** animation options available */
        this.options = {
            left: 'left',
            fadein: 'fadein',
            right: 'right',
            init: 'init',
            initabsolute: 'initabsolute',
            hide: 'hide',
            none: ''
        };
    }
    /** get status */
    getStatus() {
        return this.status;
    }
    /** set status */
    setStatus(status) {
        this.status = this.options[status] ? this.options[status] : this.options.none;
    }
    /** get animation classes */
    getClass() {
        const CLASS_NONE = '';
        const CLASS_INIT = 'animation content-overlay';
        const CLASS_INIT_ABSOLUTE = 'animation content-overlay absolute';
        const CLASS_HIDE = 'animation content-overlay hide';
        const CLASS_LEFT = 'animation content-overlay right-to-left-animation';
        const CLASS_FADEIN = 'animation content-overlay left-fix fade-in';
        const CLASS_RIGHT = 'animation content-overlay left-to-right-animation';
        let className;
        switch (this.status) {
            case 'left':
                className = CLASS_LEFT;
                break;
            case 'fadein':
                className = CLASS_FADEIN;
                break;
            case 'right':
                className = CLASS_RIGHT;
                break;
            case 'init':
                className = CLASS_INIT;
                break;
            case 'initabsolute':
                className = CLASS_INIT_ABSOLUTE;
                break;
            case 'hide':
                className = CLASS_HIDE;
                break;
            default:
                className = CLASS_NONE;
                break;
        }
        return className;
    }
}
const animator = new Animator();

exports.animator = animator;
