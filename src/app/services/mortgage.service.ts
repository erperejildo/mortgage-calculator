import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MortgageService {
  private calculationDataSubject = new BehaviorSubject<any>(null);
  private formHasErrorsSubject = new BehaviorSubject<boolean>(false);

  setCalculationData(data: any) {
    this.calculationDataSubject.next(data);
  }

  getCalculationData() {
    return this.calculationDataSubject.asObservable();
  }

  setFormErrors(hasError: boolean) {
    this.formHasErrorsSubject.next(hasError);
  }

  getFormErrors() {
    return this.formHasErrorsSubject.asObservable();
  }
}
