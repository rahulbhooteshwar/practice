import { PieChartInterface } from './interface/pie-graph.interface';
import Theme from './theme';
/** PieChart class for performing operations */
export default class PieChart {
    /** holds theme object reference */
    themeObj: Theme;
    /** Reference of pie chart interface */
    pieGraphData: PieChartInterface;
    /** holds pie fields */
    pieField: string;
    /** data reference for graph data */
    dataField: string;
    /** holds pie data */
    pieData: string;
    /** holds dynamic variables that can drive interactive updates */
    signalValuePie: any;
    /** holds data values (numbers, strings) to visual properties (coordinates, colors, sizes) */
    pieScales: any;
    /** holds visually encoded data with graphical marks such as rectangles, lines, and symbols */
    pieMarks: any;
    /** pie config object */
    pieConfig: any;
    /** pie legend object */
    pieLegends: any;
    constructor();
    /** Method to prepare data for axis for pie graph */
    prepareData(data: any, spec: any): Promise<void>;
    /** Method to return data for pie graph */
    setData(): void;
    /** Method to return data for pie graph */
    getData(data: any, spec: any): Promise<PieChartInterface>;
}
