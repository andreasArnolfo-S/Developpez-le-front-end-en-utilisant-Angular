import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Olympic } from 'src/app/core/models/Olympic';

interface ChartData {
  series: [
    {
      name: number;
      value: number;
    }
  ];
}

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
export class DetailChartComponent implements OnInit {
  @Input() countryData: Olympic[] = [];
  public chartData: ChartData[] = [];

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
  onSelect(data: ChartData): void {}

  onActivate(data: ChartData): void {}

  onDeactivate(data: ChartData): void {}

  ngOnInit(): void {
    // Création d'une nouvelle Map pour stocker les données de participation
    const seriesMap = new Map();

    // Bouclez sur chaque objet Olympic dans le tableau countryData.
    for (const olympic of this.countryData) {
      // Bouclez sur chaque participation de l'objet olympique actuel.
      for (const participation of olympic.participations) {
        // Vérifiez si le pays est déjà une clé dans la Map seriesMap.
        if (!seriesMap.has(olympic.country)) {
          // Si le pays n'est pas encore une clé, ajoutez-le avec un tableau vide comme valeur.
          seriesMap.set(olympic.country, []);
        }
        // Accédez à la série de participations pour le pays et ajoutez les données de participation actuelles.
        seriesMap.get(olympic.country).push({
          name: participation.year.toString(),
          value: participation.medalsCount,
        });
      }
    }
    // Convertissez la Map en un tableau de données utilisable par ngx-charts.
    this.chartData = Array.from(seriesMap, ([name, series]) => ({
      name,
      series,
    }));
  }
}
