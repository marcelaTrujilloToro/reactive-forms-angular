import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country';
import { Observable, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.component.html',
  styles: ``,
})
export class SelectorsPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countryService: CountriesService
  ) {}

  //? se ejecuta cuando se esta inicializando el componente
  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChange();
  }

  get regions(): Region[] {
    return this.countryService.regions;
  }

  onRegionChanged(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => (this.borders = [])),
        switchMap((region) => this.countryService.getCountriesByRegion(region))
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChange(): void {
    //? cuando el valor del country cambia
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        //?se disparan taps (efectos secundarios) para limpiar los otros campos
        tap(() => this.myForm.get('borders')?.setValue('')),

        //?lo filtra si no cumple la condicion no sigue con las siguientes lineas
        filter((value: string) => value.length > 0),

        //?toma el valor del observable anterior y va a subscribirse al siguiente observable
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode)
        ),
        switchMap((country) =>
          this.countryService.getCountryBordersByCode(country.borders)
        )
      )
      .subscribe((countries) => {
        this.borders = countries;
      });
  }
}
