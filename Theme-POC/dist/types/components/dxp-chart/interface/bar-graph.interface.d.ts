import { CommonGraphDataInterface } from './common-graph-data.interface';
import { GraphDataInterface } from './graph-data.interface';
export interface BarChartInterface extends CommonGraphDataInterface {
    signals?: Signal[];
    scales: Scale[];
    axes: Axis[];
    data: GraphDataInterface[];
    marks: Mark[];
    config?: any;
    legends?: any;
}
interface Signal {
    name: string;
    init?: any;
    value?: any;
    on?: any;
}
interface Scale {
    name?: string;
    type?: string;
    domain?: Domain;
    range?: any;
    padding?: number;
    round?: boolean;
    nice?: boolean;
    zero?: boolean;
}
interface Domain {
    data: string;
    field: string;
}
interface Axis {
    orient: string;
    scale: string;
    format?: string;
    titleFontSize?: number;
    title?: string;
    labelPadding?: number;
    tickSize?: number;
    zindex?: number;
}
interface Mark {
    type: string;
    encode: any;
    from?: any;
    scales?: any;
    signals?: any;
    marks?: any;
}
export {};
