import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa','Americas','Asia','Europa','Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  // INYECTAMOS EL SERVICIO
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region): void{
    this.selectedRegion = term;
    this.isLoading = true;
    // SI NO SE SUSCRIBE NO SE OBTENDRAN NOTIFICACIONES DE NADA
    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries
        this.isLoading = false;
      });
  }

}
