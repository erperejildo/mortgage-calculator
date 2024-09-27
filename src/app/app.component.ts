import { Component, OnInit } from '@angular/core';
import { MortgageService } from './services/mortgage.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-mortgage-form
        (calculationDone)="handleCalculation($event)"
        (formHasErrors)="handleErrors($event)"
      ></app-mortgage-form>

      <app-mortgage-result></app-mortgage-result>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  calculatedData: any = null;
  formHasErrors: boolean = false;

  constructor(private mortgageService: MortgageService) {}

  ngOnInit() {
    this.mortgageService.getCalculationData().subscribe((data) => {
      this.calculatedData = data;
    });

    this.mortgageService.getFormErrors().subscribe((hasError) => {
      this.formHasErrors = hasError;
    });
  }

  handleCalculation(eventData: any) {
    this.calculatedData = eventData;
    this.mortgageService.setCalculationData(eventData);
  }

  handleErrors(eventData: any) {
    this.formHasErrors = eventData.hasError;
    this.mortgageService.setFormErrors(this.formHasErrors);
  }
}
