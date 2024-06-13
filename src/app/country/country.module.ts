import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { SelectorsPageComponent } from './pages/selectors/selectors.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectorsPageComponent],
  imports: [CommonModule, CountryRoutingModule, ReactiveFormsModule],
})
export class CountryModule {}
