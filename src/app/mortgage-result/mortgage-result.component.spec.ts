import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { MortgageService } from '../services/mortgage.service';
import { MortgageResultComponent } from './mortgage-result.component';

class MockMortgageService {
  private calculationDataSubject = new BehaviorSubject<any>(null);
  private formErrorsSubject = new BehaviorSubject<boolean>(false);

  // Default calculation data
  private defaultCalculationData = {
    monthlyPayment: 900,
    debtToIncomeRatio: 3.5,
    loanToValueRatio: 90,
    loanTerm: 30,
  };

  constructor() {
    this.calculationDataSubject.next(this.defaultCalculationData);
  }

  getCalculationData(): Observable<any> {
    return this.calculationDataSubject.asObservable();
  }

  getFormErrors(): Observable<boolean> {
    return this.formErrorsSubject.asObservable();
  }

  setCalculationData(data: any) {
    this.calculationDataSubject.next(data);
  }

  setFormErrors(hasError: boolean) {
    this.formErrorsSubject.next(hasError);
  }
}

describe('MortgageResultComponent', () => {
  let component: MortgageResultComponent;
  let fixture: ComponentFixture<MortgageResultComponent>;
  let mortgageService: MockMortgageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgageResultComponent],
      providers: [{ provide: MortgageService, useClass: MockMortgageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MortgageResultComponent);
    component = fixture.componentInstance;
    mortgageService = TestBed.inject(MortgageService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct mortgage calculation data', () => {
    expect(component.monthlyPayment).toBe(900);
    expect(component.debtToIncomeRatio).toBe(3.5);
    expect(component.loanToValueRatio).toBe(90);
    expect(component.loanTerm).toBe(30);
    expect(component.hasError).toBeFalse();
  });

  it('should handle form errors correctly', () => {
    mortgageService.setCalculationData(null);
    mortgageService.setFormErrors(true);

    component.ngOnInit();

    expect(component.hasError).toBeTrue();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
