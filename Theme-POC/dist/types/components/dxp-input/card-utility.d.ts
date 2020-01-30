/**
 * Based on input value
 * CardUtility class is used to find the card type and formating the card details.
 * @export
 * @class CardUtility
 */
export declare class CardUtility {
    /**
     * Default CVC Length
     *
     * @memberof CardUtility
     */
    DEFAULT_CVC_LENGTH: number;
    /**
     * Default Zipcode value
     *
     * @memberof CardUtility
     */
    DEFAULT_ZIP_LENGTH: number;
    /**
     * Default Card Format
     *
     * @memberof CardUtility
     */
    DEFAULT_CARD_FORMAT: RegExp;
    /**
     * Different Card Types Used.
     *
     * @memberof CardUtility
     */
    CARD_TYPES: ({
        type: string;
        format: RegExp;
        startPattern: RegExp;
        maxCardNumberLength: number;
        cvcLength: number;
        luhn?: undefined;
    } | {
        type: string;
        format: RegExp;
        startPattern: RegExp;
        maxCardNumberLength: number;
        cvcLength: number;
        luhn: boolean;
    })[];
    /**
     * getCardTypeByValue
     * based on input get the Card type
     * @param {*} value
     * @returns
     * @memberof CardUtility
     */
    getCardTypeByValue(value: any): {
        type: string;
        format: RegExp;
        startPattern: RegExp;
        maxCardNumberLength: number;
        cvcLength: number;
        luhn?: undefined;
    } | {
        type: string;
        format: RegExp;
        startPattern: RegExp;
        maxCardNumberLength: number;
        cvcLength: number;
        luhn: boolean;
    };
    /**
     * formatCardNumber
     * Formats the display of card detail
     * @param {*} cardNumber
     * @returns
     * @memberof CardUtility
     */
    formatCardNumber(cardNumber: any): any;
}
