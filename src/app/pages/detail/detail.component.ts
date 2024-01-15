import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { switchMap } from 'rxjs';
import { Participation } from 'src/app/core/models/Participation';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  countryData: Olympic[] = [];
  constructor(
    private olympicService: OlympicService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  getParticipations(): Participation[] {
    return this.countryData.flatMap((olympic) => olympic.participations);
  }
  getTotalMedals(participations: Participation[]): number {
    return participations.reduce(
      (total, participation) => total + participation.medalsCount,
      0
    );
  }
  getTotalAthletes(participations: Participation[]): number {
    return participations.reduce(
      (total, participation) => total + participation.athleteCount,
      0
    );
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const countryName = params.get('name');

          if (countryName) {
            return this.olympicService.getOlympicsByCountry(countryName);
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.countryData = data;
      });
  }
}
