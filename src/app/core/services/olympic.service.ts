import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympicEditionsCount(): Observable<number> {
    return this.http.get<any[]>(this.olympicUrl).pipe(
      map((countries) => {
        const allYears = countries.flatMap((country) =>
          country.participations.map(
            (participation: { year: any }) => participation.year
          )
        );
        const uniqueYears = new Set(allYears);
        return uniqueYears.size;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  getOlympicsByCountry(countryName: string): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      map((olympics) => olympics.filter((olympic) => olympic.country === countryName))
    );
  }
}
