import { r as registerInstance } from './core-cdc608e2.js';
var CookieConsent = /** @class */ (function () {
    function CookieConsent(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    CookieConsent.prototype.componentDidLoad = function () {
        if (this.pid && this.cid) {
            this.cookieConsent(this.pid, this.cid, this.g_addScript);
        }
    };
    /** Method to pass value of cid and pid, function used for consent callback */
    CookieConsent.prototype.cookieConsent = function (pid, cid, cb) {
        var scriptElement = document.createElement('script');
        var scriptTag = document.getElementsByTagName('script')[0];
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
    };
    /** Method to check page bottom */
    CookieConsent.prototype.getSatellite = function (_satellite) {
        if (_satellite) {
            _satellite.pageBottom();
        }
    };
    /** Method to create script element */
    CookieConsent.prototype.g_addScript = function () {
        var _satellite = undefined;
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + "c.betrad.com/geo/h1.js";
        head.appendChild(script);
        this.whenAvailable('_satellite', this.getSatellite(_satellite));
    };
    /** Method to set interval timeout */
    CookieConsent.prototype.whenAvailable = function (name, callback) {
        var interval = 10; // ms
        if (name) {
            var callee_1 = function () {
                if (window[name]) {
                    callback(window[name]);
                }
                else {
                    window.setTimeout(function () { return callee_1(); }, interval);
                }
            };
            window.setTimeout(function () { return callee_1(); }, interval);
        }
    };
    return CookieConsent;
}());
export { CookieConsent as dxp_cookie_consent };
