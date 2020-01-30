/** class animator */
declare class Animator {
    /** holds animation status */
    status: string;
    /** holds reset duration */
    durationReset: number;
    /** animation options available */
    options: {
        left: string;
        fadein: string;
        right: string;
        init: string;
        initabsolute: string;
        hide: string;
        none: string;
    };
    /** get status */
    getStatus(): string;
    /** set status */
    setStatus(status: any): void;
    /** get animation classes */
    getClass(): any;
}
declare const _default: Animator;
export default _default;
