import { Component, OnInit, Input } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, map, of } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ChartData {
  name: string;
  value: number;
}
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

  onSelect(data: ChartData): void {
    // Navigate to the details page of the selected item
    this.router.navigateByUrl(`details/${data.name}`);
  }

  onActivate(data: ChartData): void {}

  onDeactivate(data: ChartData): void {}

  ngOnInit(): void {
    this.chartData$ = this.olympicService.getOlympics().pipe(
      // Pour chaque élément du tableau `data`
      map((data) =>
        // Pour chaque pays (item), je calcule le nombre total de médailles obtenues.
        data.map((item) => {
          const numberOfMedals = item.participations
            .map((participation) => participation.medalsCount)
            .reduce((a, b) => a + b, 0);
          // Je retourne un objet qui contient le nom du pays et le nombre total de médailles,
          // qui correspond au format attendu par ngx-charts pour afficher ces données dans le graphique.
          return {
            name: item.country,
            value: numberOfMedals,
          };
        })
      )
    );
  }
}
