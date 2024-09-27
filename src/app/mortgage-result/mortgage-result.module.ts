import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageResultComponent } from './mortgage-result.component';

const routes: Routes = [{ path: '', component: MortgageResultComponent }];

@NgModule({
  declarations: [MortgageResultComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [MortgageResultComponent],
})
export class MortgageResultModule {}
