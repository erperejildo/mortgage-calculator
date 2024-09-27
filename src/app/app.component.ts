import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-mortgage-forms
        (calculationDone)="handleCalculation($event)"
        (formHasErrors)="handleErrors($event)"
      ></app-mortgage-forms>

      <app-mortgage-result
        [monthlyPayment]="calculatedData?.monthlyPayment"
        [debtToIncomeRatio]="calculatedData?.debtToIncomeRatio"
        [loanToValueRatio]="calculatedData?.loanToValueRatio"
        [loanTerm]="calculatedData?.loanTerm"
        [hasError]="formHasErrors"
      ></app-mortgage-result>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  calculatedData: any = null;
  formHasErrors: boolean = false;

  handleCalculation(eventData: any) {
    this.calculatedData = eventData;
  }
  handleErrors(evenData: any) {
    this.formHasErrors = evenData.hasError;
  }
}
