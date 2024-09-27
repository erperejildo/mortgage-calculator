import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-mortgage-forms
        (calculationDone)="handleCalculation($event)"
      ></app-mortgage-forms>

      <app-mortgage-result
        [monthlyPayment]="calculatedData?.monthlyPayment"
        [debtToIncomeRatio]="calculatedData?.debtToIncomeRatio"
        [loanToValueRatio]="calculatedData?.loanToValueRatio"
        [loanTerm]="calculatedData?.loanTerm"
      ></app-mortgage-result>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  calculatedData: any = null;
  formHasErrors: boolean = false;

  // Function to handle the emitted event and store the calculation results
  handleCalculation(eventData: any) {
    this.calculatedData = eventData;
  }
}
