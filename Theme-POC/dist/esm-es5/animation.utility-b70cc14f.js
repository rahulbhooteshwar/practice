/** class animator */
var Animator = /** @class */ (function () {
    function Animator() {
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
    Animator.prototype.getStatus = function () {
        return this.status;
    };
    /** set status */
    Animator.prototype.setStatus = function (status) {
        this.status = this.options[status] ? this.options[status] : this.options.none;
    };
    /** get animation classes */
    Animator.prototype.getClass = function () {
        var CLASS_NONE = '';
        var CLASS_INIT = 'animation content-overlay';
        var CLASS_INIT_ABSOLUTE = 'animation content-overlay absolute';
        var CLASS_HIDE = 'animation content-overlay hide';
        var CLASS_LEFT = 'animation content-overlay right-to-left-animation';
        var CLASS_FADEIN = 'animation content-overlay left-fix fade-in';
        var CLASS_RIGHT = 'animation content-overlay left-to-right-animation';
        var className;
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
    };
    return Animator;
}());
var animator = new Animator();
export { animator as a };
