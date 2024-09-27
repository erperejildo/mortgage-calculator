import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { MortgageFormModule } from './mortgage-form/mortgage-form.module';
import { MortgageResultModule } from './mortgage-result/mortgage-result.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MortgageFormModule,
    MortgageResultModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
