'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');

const CookieConsent = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentDidLoad() {
        if (this.pid && this.cid) {
            this.cookieConsent(this.pid, this.cid, this.g_addScript);
        }
    }
    /** Method to pass value of cid and pid, function used for consent callback */
    cookieConsent(pid, cid, cb) {
        const scriptElement = document.createElement('script');
        const scriptTag = document.getElementsByTagName('script')[0];
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.setAttribute('data-ev-noticeid', pid);
        scriptElement.setAttribute('data-ev-coid', cid);
        scriptElement.setAttribute('data-ev-consent-callback', cb);
        scriptElement.setAttribute('data-ev-consent-type', 'cnp');
        scriptElement.src = '//c.betrad.com/pub/gdprnotice.js';
        if (scriptTag) {
            scriptTag.parentNode.insertBefore(scriptElement, scriptTag);
        }
    }
    /** Method to check page bottom */
    getSatellite(_satellite) {
        if (_satellite) {
            _satellite.pageBottom();
        }
    }
    /** Method to create script element */
    g_addScript() {
        const _satellite = undefined;
        const head = document.head;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `${('https:' === document.location.protocol ? 'https://' : 'http://')}c.betrad.com/geo/h1.js`;
        head.appendChild(script);
        this.whenAvailable('_satellite', this.getSatellite(_satellite));
    }
    /** Method to set interval timeout */
    whenAvailable(name, callback) {
        const interval = 10; // ms
        if (name) {
            const callee = () => {
                if (window[name]) {
                    callback(window[name]);
                }
                else {
                    window.setTimeout(() => callee(), interval);
                }
            };
            window.setTimeout(() => callee(), interval);
        }
    }
};

exports.dxp_cookie_consent = CookieConsent;
