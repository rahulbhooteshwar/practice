import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import 'core-js';
import BarChart from './bar-chart';
import PieChart from './pie-chart';
/** dxp-chart */
export declare class Chart {
    /** holds bar chart reference */
    barChartObj: BarChart;
    /** base component - common functionality */
    base: BaseComponent;
    /** holds reference for chart container */
    chartHtmlRef: HTMLElement;
    /** holds chart schema data */
    chartSchemaData: any;
    /** holds spec of charts passed */
    chartSpec: any;
    /** holds pie chart reference */
    pieChartObj: PieChart;
    /** chart element - utilized by DXP framework */
    element: HTMLElement;
    /** page dir attribute */
    dir: string;
    /** the component's theme (if any) */
    theme: string;
    /** api url for chart */
    apiUrl: string;
    /** holds chart category */
    chart: 'bar' | 'pie';
    /** holds chart title */
    chartTitle: '';
    /** holds sub type of chart */
    chartType: 'basic' | 'doughnut' | 'stacked' | 'group';
    /** contains chart data array */
    data: any;
    /** holds height of chart */
    height: number;
    /** holds legend direction */
    legendDirection: 'vertical' | 'horizontal';
    /** holds legend orientation */
    legendOrient: 'top' | 'bottom' | 'left' | 'right';
    /** holds legend title */
    legendTitle: '';
    /** Chart orientation */
    orientation: 'vertical' | 'horizontal';
    /** holds legend visibility */
    showLegend: true | false;
    /** holds tool tip */
    showTooltip: true | false;
    /** holds width of chart */
    width: number;
    /** holds x axis label */
    xAxis: '';
    /** holds y axis label */
    yAxis: '';
    /** actions to be performed prior to component loading */
    componentWillLoad(): Promise<void>;
    /** actions to be performed after to component loading */
    componentDidLoad(): void;
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event: any): void;
    /** Method to draw chart */
    drawChart(chartObj: any, chartData: any): void;
    /** Method to fill data of chart according to chart type */
    fillChartData(chart: any, data: any, spec: any): Promise<any>;
    /** fill chart spec passed */
    fillChartSpec(): {
        title: "";
        xaxis: "";
        yaxis: "";
        showToolTip: boolean;
        chartType: "basic" | "group" | "stacked" | "doughnut";
        orientation: import("vega-typings/types").Orientation;
        theme: string;
        showLegend: boolean;
        legendTitle: "";
        legendOrient: import("vega-typings/types").Orient;
        legendDirection: import("vega-typings/types").Orientation;
        height: number;
        width: number;
    };
    /** Render the chart */
    render(): any;
}
