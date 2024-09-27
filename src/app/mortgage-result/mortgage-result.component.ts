import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mortgage-result',
  templateUrl: './mortgage-result.component.html',
  styleUrls: ['./mortgage-result.component.scss'],
})
export class MortgageResultComponent {
  @Input() monthlyPayment: number = 0;
  @Input() debtToIncomeRatio: number = 0;
  @Input() loanToValueRatio: number = 0;
  @Input() loanTerm: number = 0;
  @Input() hasError: boolean = false;
}
