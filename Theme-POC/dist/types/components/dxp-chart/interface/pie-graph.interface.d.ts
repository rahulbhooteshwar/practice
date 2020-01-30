import { CommonGraphDataInterface } from './common-graph-data.interface';
import { GraphDataInterface } from './graph-data.interface';
export interface PieChartInterface extends CommonGraphDataInterface {
    signals: Signal[];
    scales: Scale[];
    marks: Mark[];
    data: Datum[];
    config?: any;
    legends: any;
}
interface Datum extends GraphDataInterface {
    transform: any;
}
interface Signal {
    name: string;
    value: any;
}
interface Scale {
    name: string;
    type: string;
    domain: Domain;
    range: any;
}
interface Domain {
    data: string;
    field: string;
}
interface Mark {
    type: string;
    from: any;
    encode: any;
}
export {};
