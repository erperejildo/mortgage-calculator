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
      this.monthlyPayment = this.calculateMonthlyPayment(
        this.borrowAmount,
        this.interestRate,
        this.loanTerm
      );
      this.debtToIncomeRatio = this.calculateDebtToIncomeRatio(
        this.monthlyPayment,
        this.grossIncome
      );
      this.loanToValueRatio = this.calculateLoanToValueRatio(
        this.borrowAmount,
        this.purchasePrice
      );
      if (this.monthlyPayment < 0) {
        this.hasError = true;
      } else {
        this.mortgageService.setCalculationData({
          monthlyPayment: this.monthlyPayment.toFixed(2),
          debtToIncomeRatio: this.debtToIncomeRatio.toFixed(2),
          loanToValueRatio: this.loanToValueRatio.toFixed(2),
          loanTerm: this.loanTerm,
          hasError: this.hasError,
        });
      }
    }
  }

  private calculateMonthlyPayment(
    principal: number,
    annualInterestRate: number,
    loanTermYears: number
  ): number {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = loanTermYears * 12;
    const numerator =
      principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    return numerator / denominator;
  }

  private calculateDebtToIncomeRatio(
    monthlyPayment: number,
    grossIncome: number
  ): number {
    return (monthlyPayment / grossIncome) * 100;
  }

  private calculateLoanToValueRatio(
    borrowAmount: number,
    purchasePrice: number
  ): number {
    return (borrowAmount / purchasePrice) * 100;
  }
}
