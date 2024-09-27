import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  // INYECTAMOS EL SERVICIO
  constructor(private countriesService: CountriesService){}

  searchByCountry(term: string): void {
    this.isLoading = true;
    // SI NO SE SUSCRIBE NO SE OBTENDRAN NOTIFICACIONES DE NADA
    this.countriesService.searchCountry(term)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }


}
