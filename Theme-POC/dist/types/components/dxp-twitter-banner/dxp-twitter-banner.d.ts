import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-twitter-banner */
export declare class TwitterBanner {
    /** base component - common functionality */
    base: BaseComponent;
    /** twitter-banner element - utilized by DXP framework */
    element: HTMLElement;
    /** Current screen Name */
    currentName: string;
    /** holds the recent tweet */
    currentTweet: string;
    /** Holds the tweet index */
    currentTweetIndex: number;
    /** page dir attribute */
    dir: string;
    /** li Element */
    liElement: any;
    /** The component's theme (if any) */
    theme: string;
    /** tweet Url */
    tweetJsonUrl: string;
    /** tweets */
    tweets: any;
    /** sets the handle value for fetching the corresponding the tweets */
    handle: string;
    /** handle type can be either screen name or hash tag */
    handleType: string;
    /** Sets the hash tag for fetching corresponding tweets */
    hashtag: any;
    /** Sets the maximum number of tweets to be shown */
    maxCount: number;
    /** Sets the image link to the twitter account */
    src: string;
    /** window to target for link */
    target: string;
    /** Sets Twitter Tweets URL */
    twitterApiEndPoint: string;
    /** Sets Twitter Domain URL */
    twitterUrl: string;
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after component get loaded */
    componentDidLoad(): Promise<void>;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** appends hashtags */
    appendHashtags(tweetJsonUrl: any): any;
    /** fetch tweets */
    getTweets(): Promise<any>;
    /** private method to create tweet url based on handle type */
    getTweetUrl(handletype: string): string;
    /** moves to next tweet */
    nextTweet(): void;
    /** move to previous tweet */
    prevTweet(): void;
    /** private method to set the current tweet and screen name  */
    setTweetAndScreenName(currentTweetIndex: number): void;
    /** Render the twitter-banner */
    render(): any;
}
