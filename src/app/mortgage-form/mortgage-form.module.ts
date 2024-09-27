import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { MortgageFormComponent } from './mortgage-form.component';

const routes: Routes = [{ path: '', component: MortgageFormComponent }];

@NgModule({
  declarations: [MortgageFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatRadioModule,
    RouterModule.forChild(routes),
  ],
  exports: [MortgageFormComponent],
})
export class MortgageFormModule {}
