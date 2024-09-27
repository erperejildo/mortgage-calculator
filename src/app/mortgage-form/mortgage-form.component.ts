import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../services/mortgage.service';

@Component({
  selector: 'app-mortgage-form',
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.scss'],
})
export class MortgageFormComponent implements OnInit {
  // just for an easy testing
  borrowAmount: number | null = 826800;
  purchasePrice: number | null = 910000;
  loanTerm: number = 30;
  loanTerms = [
    { label: '35 Years', value: 35 },
    { label: '30 Years', value: 30 },
    { label: '25 Years', value: 25 },
    { label: '20 Years', value: 20 },
    { label: '15 Years', value: 15 },
  ];
  grossIncome: number | null = 225000;
  interestRate: number | null = 3.65;

  monthlyPayment: number = 0;
  debtToIncomeRatio: number = 0;
  loanToValueRatio: number = 0;

  hasError: boolean = false;

  constructor(private mortgageService: MortgageService) {}

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

      this.mortgageService.setCalculationData(null);
    } else {
      this.hasError = false;
      (this[model] as number) = parseFloat(value);
      this.calculate();
    }
    this.mortgageService.setFormErrors(this.hasError);
  }

  calculate() {
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

      if (this.monthlyPayment < 0) {
        this.hasError = true;
      } else {
        this.mortgageService.setCalculationData({
          monthlyPayment: this.monthlyPayment,
          debtToIncomeRatio: this.debtToIncomeRatio,
          loanToValueRatio: this.loanToValueRatio,
          loanTerm: this.loanTerm,
          hasError: this.hasError,
        });
      }
    }
  }
}
