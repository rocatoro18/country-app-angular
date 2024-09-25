import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  // INYECTAMOS EL SERVICIO
  constructor(private countriesService: CountriesService){}

  searchByRegion(term: string): void{
    // SI NO SE SUSCRIBE NO SE OBTENDRAN NOTIFICACIONES DE NADA
    this.countriesService.searchRegion(term).subscribe(countries => {this.countries = countries});
  }

}
