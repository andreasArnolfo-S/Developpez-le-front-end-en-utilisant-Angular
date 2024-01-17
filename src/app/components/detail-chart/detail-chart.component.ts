// Imports
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';

// Interface for chart data structure
interface ChartData {
  series: [
    {
      name: number;
      value: number;
    }
  ];
}

  // Interface for chart configuration options
interface ChartOptions {
  view: [number, number];
  legend: boolean;
  showLegend: boolean;
  showLabels: boolean;
  animations: boolean;
  xAxis: boolean;
  yAxis: boolean;
  showYAxisLabel: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  timeline: boolean;
  legendPosition: LegendPosition;
  colorScheme: string;
}

@Component({
  selector: 'app-detail-chart',
  imports: [CommonModule, NgxChartsModule],
  standalone: true,
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.scss'],
})
// Component to display detailed Olympic participation data in a chart
export class DetailChartComponent implements OnInit {
  @Input() countryData: Olympic[] = []; // Input data for the countries' Olympic performance
  public chartData: ChartData[] = []; // Processed data ready for the chart

  // Configuration options for the chart
  public chartOptions: ChartOptions = {
    view: [900, 600],
    legend: true,
    showLegend: true,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    xAxisLabel: 'Year',
    yAxisLabel: 'Medals',
    timeline: true,
    legendPosition: LegendPosition.Below,
    colorScheme: 'cool',
  };
  constructor() {}


  /**
   * Initializes the component with the necessary data for chart rendering.
   *
   * @return {void} This function does not return anything.
   */
  ngOnInit(): void {
    // Build new Map
    const seriesMap = new Map();

    // Organize data into seriesMap
    for (const olympic of this.countryData) {
      for (const participation of olympic.participations) {
        if (!seriesMap.has(olympic.country)) {
          seriesMap.set(olympic.country, []);
        }
        seriesMap.get(olympic.country).push({
          name: participation.year.toString(),
          value: participation.medalsCount,
        });
      }
    }
    // Convert seriesMap to chartData array
    this.chartData = Array.from(seriesMap, ([name, series]) => ({
      name,
      series,
    }));
  }
}
