import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MortgageService } from '../services/mortgage.service';

@Component({
  selector: 'app-mortgage-result',
  templateUrl: './mortgage-result.component.html',
  styleUrls: ['./mortgage-result.component.scss'],
})
export class MortgageResultComponent implements OnInit, OnDestroy {
  monthlyPayment: number = 0;
  debtToIncomeRatio: number = 0;
  loanToValueRatio: number = 0;
  loanTerm: number = 0;
  hasError: boolean = false;

  private calculationDataSubscription: Subscription | undefined;
  private formErrorsSubscription: Subscription | undefined;

  constructor(private mortgageService: MortgageService) {}

  ngOnInit(): void {
    this.calculationDataSubscription = this.mortgageService
      .getCalculationData()
      .subscribe((data) => {
        if (data) {
          this.monthlyPayment = data.monthlyPayment;
          this.debtToIncomeRatio = data.debtToIncomeRatio;
          this.loanToValueRatio = data.loanToValueRatio;
          this.loanTerm = data.loanTerm;
          this.hasError = false;
        } else {
          this.mortgageService.getFormErrors().subscribe((hasError) => {
            this.hasError = hasError;
          });
        }
      });

    this.formErrorsSubscription = this.mortgageService
      .getFormErrors()
      .subscribe((hasError) => {
        this.hasError = hasError;
      });
  }

  ngOnDestroy(): void {
    this.calculationDataSubscription?.unsubscribe();
    this.formErrorsSubscription?.unsubscribe();
  }
}
