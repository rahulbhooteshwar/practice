import { BarChartInterface } from './interface/bar-graph.interface';
import Theme from './theme';
/** BarChart class for performing operations */
export default class BarChart {
    /** holds theme object reference */
    themeObj: Theme;
    /** Reference of bar chart interface */
    barGraphData: BarChartInterface;
    /** x axis label */
    xAxisField: string;
    /** y axis label */
    yAxisField: string;
    /** holds identifier fields for stacked bar chart */
    valueField: string;
    /** data reference for graph data */
    dataField: string;
    /** holds data values (numbers, strings) to visual properties (coordinates, colors, sizes) */
    barScales: any;
    /** holds visually encoded data with graphical marks such as rectangles, lines, and symbols */
    barMarks: any;
    /** holds scale mappings for spatial encodings using coordinate axes for bar graph */
    barAxes: any;
    /** holds dynamic variables that can drive interactive updates */
    barSignal: any;
    /** holds theming of graph */
    barConfig: any;
    /** holds bar legend */
    barLegend: any;
    constructor();
    /** Method to prepare data for axis for bar graph */
    prepareData(data: any, spec: any): Promise<void>;
    /** Method to return data for bar graph */
    getData(data: any, spec: any): Promise<BarChartInterface>;
    /** Method to set data for bar graph */
    setData(spec: any): void;
    /** Method to prepare basic graph data */
    prepareBasicBarGraph(spec: any, data: any): void;
    /** Method to prepare stacked graph data */
    prepareStackedBarGraph(spec: any, data: any): void;
    /** Method to prepare grouped graph data */
    prepareGroupedBarGraph(spec: any, data: any): void;
}
