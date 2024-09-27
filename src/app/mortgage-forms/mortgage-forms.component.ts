import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mortgage-forms',
  templateUrl: './mortgage-forms.component.html',
  styleUrls: ['./mortgage-forms.component.scss'],
})
export class MortgageFormsComponent implements OnInit {
  borrowAmount: number | null = 826800;
  purchasePrice: number | null = 910000;
  loanTerm: number = 30;
  grossIncome: number | null = 225000;
  interestRate: number | null = 3.65;

  monthlyPayment: number = 0;
  debtToIncomeRatio: number = 0;
  loanToValueRatio: number = 0;

  @Output() calculationDone: EventEmitter<any> = new EventEmitter<any>();
  @Output() formHasErrors: EventEmitter<any> = new EventEmitter<any>();

  hasError: boolean = false;

  ngOnInit(): void {
    this.calculate();
  }

  onInputChange(
    event: Event,
    model: 'borrowAmount' | 'purchasePrice' | 'grossIncome' | 'interestRate'
  ) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/,/g, '');

    if (!value || isNaN(Number(value))) {
      this.hasError = true;
      (this[model] as number | null) = null;
    } else {
      this.hasError = false;
      (this[model] as number) = parseFloat(value);
      this.calculate();
    }

    this.formHasErrors.emit({
      hasError: this.hasError,
    });
  }

  calculate() {
    console.log('calculate');
    if (
      this.borrowAmount !== null &&
      this.purchasePrice !== null &&
      this.grossIncome !== null &&
      this.interestRate !== null
    ) {
      let monthlyInterestRate = this.interestRate / 100 / 12;
      let numberOfPayments = this.loanTerm * 12;

      this.monthlyPayment =
        (this.borrowAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

      this.loanToValueRatio =
        parseFloat((this.borrowAmount / this.purchasePrice).toFixed(2)) * 100;

      this.debtToIncomeRatio = parseFloat(
        (this.borrowAmount / this.grossIncome).toFixed(1)
      );

      this.calculationDone.emit({
        monthlyPayment: this.monthlyPayment,
        debtToIncomeRatio: this.debtToIncomeRatio,
        loanToValueRatio: this.loanToValueRatio,
        loanTerm: this.loanTerm,
      });
    }
  }
}
