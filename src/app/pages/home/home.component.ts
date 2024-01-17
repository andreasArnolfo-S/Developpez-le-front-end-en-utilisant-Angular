import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public olympicEditionsCount$: Observable<number> = of(0);

  constructor(private olympicService: OlympicService) {}

  /**
   * Initializes the component and fetches the Olympics data.
   *
   * @return {void} This function does not return anything.
   */
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicEditionsCount$ = this.olympicService.getOlympicEditionsCount();
  }
}
