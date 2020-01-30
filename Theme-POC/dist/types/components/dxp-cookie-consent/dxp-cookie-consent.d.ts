/** dxp-cookie-consent */
export declare class CookieConsent {
    /** declare content cid */
    cid: number;
    /** declare content pid */
    pid: number;
    /** actions to be performed prior to component loading */
    componentDidLoad(): void;
    /** Method to pass value of cid and pid, function used for consent callback */
    cookieConsent(pid: any, cid: any, cb: any): void;
    /** Method to check page bottom */
    getSatellite(_satellite: any): void;
    /** Method to create script element */
    g_addScript(): void;
    /** Method to set interval timeout */
    whenAvailable(name: any, callback: any): void;
}
