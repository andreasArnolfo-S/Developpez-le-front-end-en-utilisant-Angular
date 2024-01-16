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

  /**
   * Loads the initial data by making an HTTP GET request to the Olympic API endpoint.
   *
   * @return {Observable<Olympic[]>} An Observable that emits the response from the API.
   */
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
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

  /**
   * Returns the number of Olympic editions.
   *
   * @return {Observable<number>} The number of Olympic editions.
   */
  getOlympicEditionsCount(): Observable<number> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      map((countries) => {
        const allYears = countries.flatMap((country) =>
          country.participations.map(
            (participation: { year: number }) => participation.year
          )
        );
        const uniqueYears = new Set(allYears);
        return uniqueYears.size;
      })
    );
  }

  /**
   * Retrieves the Olympics as an observable.
   *
   * @return {Observable} The Olympics as an observable.
   */
  getOlympics() {
    return this.olympics$.asObservable();
  }
  /**
   * Retrieves the list of Olympics for a specific country.
   *
   * @param {string} countryName - The name of the country.
   * @return {Observable<Olympic[]>} An observable that emits the list of Olympics for the specified country.
   */
  getOlympicsByCountry(countryName: string): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      map((olympics) => olympics.filter((olympic) => olympic.country === countryName))
    );
  }
}
