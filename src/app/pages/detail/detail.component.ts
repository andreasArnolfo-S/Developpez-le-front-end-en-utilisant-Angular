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
  /**
   * Retrieves all participations.
   *
   * @return {Participation[]} An array of all participations.
   */
  getParticipations(): Participation[] {
    return this.countryData.flatMap((olympic) => olympic.participations);
  }
  /**
   * Calculates the total number of medals earned by a participant.
   *
   * @param {Participation[]} participations - An array of participations representing the participant's performance in various events.
   * @return {number} The total number of medals earned by the participant.
   */
  getTotalMedals(participations: Participation[]): number {
    return participations.reduce(
      (total, participation) => total + participation.medalsCount,
      0
    );
  }
  /**
   * Calculates the total number of athletes based on the given participations.
   *
   * @param {Participation[]} participations - An array of participations.
   * @return {number} The total number of athletes.
   */
  getTotalAthletes(participations: Participation[]): number {
    return participations.reduce(
      (total, participation) => total + participation.athleteCount,
      0
    );
  }
  /**
   * Navigates back to the previous page.
   *
   * @return {void} This function does not return a value.
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
  /**
   * Initializes the component and subscribes to the activated route paramMap.
   * Retrieves the countryName from the paramMap and makes a call to the OlympicService
   * to get the Olympics data for the specified country. Updates the countryData property
   * with the retrieved data.
   *
   * @return {void}
   */
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
