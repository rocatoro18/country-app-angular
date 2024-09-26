import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  // INVESTIGAR SOBRE EL SNAPSHOT DEL URL
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ){}

  ngOnInit(): void {

    // OBSERVABLE HEALD???
    this.activatedRoute.params
    .pipe(
      //tap(console.log)
      // RECIBE EL VALOR ANTERIOR Y SU OBJETIVO ES QUE REGRESE UN NUEVO OBSERVABLE
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id)),
    )
      .subscribe((country) => {

        if(!country) return this.router.navigateByUrl('');


        //console.log({country});
        return this.country = country;
        //return;
        /*
        this.countriesService.searchCountryByAlphaCode(id)
          .subscribe(country=>{
            console.log({country})
          });
          */

      //console.log({params: id});
    });
  }

}
