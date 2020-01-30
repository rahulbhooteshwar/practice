import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
/** dxp-tile-grid */
export declare class TileGrid {
    /** base component - common functionality */
    base: BaseComponent;
    /** page number count defined */
    pageNumber: number;
    /** tile item count defined */
    tileItemCount: number;
    /** tile-grid element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** locale (i18n) - to force re-render on locale change */
    locale: string;
    /** the component's theme (if any) */
    theme: string;
    /** Nested layout items */
    tileItems: HTMLElement[];
    /** cta for tile grid */
    ctaListData: any;
    /** class to be applied for header alignment */
    headerAlignment: 'left' | 'right' | 'center';
    /** href for tile component */
    href: string;
    /** check if tile is square */
    isSquare: boolean;
    /** view all cta data for tile grid components */
    tileGridCta: any;
    /** description to be shown in the header of tile grid */
    tileGridDescription: string;
    /** eyebrow text to be shown in the header of tile grid */
    tileGridEyebrowText: string;
    /** Prop for the tile grid text */
    tileGridTitle: string;
    /** json data for tile */
    tileListData: any;
    /** actions to be performed prior to component loading */
    componentWillLoad(): void;
    /** actions to be performed prior to component loading */
    componentDidLoad(): void;
    /** Listen for the window resize changes */
    handleResizeEvent(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** click event for sliding tiles */
    changeSlide(direction: 'NEXT' | 'PREV'): void;
    /** function for list data */
    findTileList(): number;
    /** convert node list to array */
    getArrayFromNodeList(nodeList: any): any;
    /** function return width of container */
    getCalcWidth(): any;
    /** get array of rendered child tab elements */
    getRenderedTileItems(): any;
    /** render classes for slot */
    renderColumns(noOfTiles: any): string;
    /** assign width */
    setX(x: any): void;
    /** Tile calculation function */
    tileCalc(): void;
    /** Render dxp-tile-grid */
    render(): any;
}
