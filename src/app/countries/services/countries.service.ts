import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(()=>of([])),
        delay(2000)
      );
  }

  searchCountryByAlphaCode(code: string):  Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(term : string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${term}`;
    // CUANDO SE SUSCRIBE ES CUANDO SE DISPARA EL OBSERVABLE
    return this.getCountriesRequest(url);
        //tap(countries => console.log('Paso por el tap 1',countries)),
        //map(countries => []),
        //tap(countries => console.log('Paso por el tap 2',countries)),

  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url);

  }

  searchRegion(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`;

    return this.getCountriesRequest(url);
  }

}
