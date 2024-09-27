import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  // INYECTAMOS EL SERVICIO
  constructor(private countriesService: CountriesService){}

  searchByCapital(term: string): void {
    this.isLoading = true;
    // SI NO SE SUSCRIBE NO SE OBTENDRAN NOTIFICACIONES DE NADA
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
