import { Component, OnInit, Input } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, map, of } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Defines the structure of the chart data
interface ChartData {
  name: string;
  value: number;
}
// Defines chart configuration options
interface ChartOptions {
  gradient: boolean;
  showLegend: boolean;
  showLabels: boolean;
  isDoughnut: boolean;
  legendPosition: LegendPosition;
  colorScheme: string;
}

@Component({
  selector: 'app-home-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './home-chart.component.html',
  styleUrls: ['./home-chart.component.scss'],
})
export class HomeChartComponent implements OnInit {

  @Input() olympics: Observable<Olympic[]> = of([]);
  public chartData$: Observable<ChartData[]> = of([]);

  public chartOptions: ChartOptions = {
    gradient: true,
    showLegend: false,
    showLabels: true,
    isDoughnut: false,
    legendPosition: LegendPosition.Below,
    colorScheme: 'cool',
  };
  constructor(private olympicService: OlympicService, private router: Router) {}

  /**
   * Handles the selection of a chart item.
   * Navigates to the details page of the selected country when a chart item is clicked
   * @param {ChartData} data - The selected chart data.
   * @return {void} - This function does not return a value.
   */
  onSelect(data: ChartData): void {
    this.router.navigateByUrl(`details/${data.name}`);
  }

  /**
   * Initializes the component and sets up the chart data.
   *
   * @return {void} This function does not return a value.
   */
  ngOnInit(): void {
    this.chartData$ = this.olympicService.getOlympics().pipe(
      map((data) =>
        data.map((item) => {
          // Sum all medals from the participations array for each country
          const numberOfMedals = item.participations
            .map((participation) => participation.medalsCount)
            .reduce((a, b) => a + b, 0);
          // Return the country name and total medals for chart consumption
          return {
            name: item.country,
            value: numberOfMedals,
          };
        })
      )
    );
  }
}
