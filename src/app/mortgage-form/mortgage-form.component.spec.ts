import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MortgageService } from '../services/mortgage.service';
import { MortgageFormComponent } from './mortgage-form.component';

describe('MortgageFormComponent', () => {
  let component: MortgageFormComponent;
  let fixture: ComponentFixture<MortgageFormComponent>;
  let mortgageService: jasmine.SpyObj<MortgageService>;

  const defaultValues = {
    borrowAmount: 826800,
    purchasePrice: 910000,
    loanTerm: 30,
    grossIncome: 225000,
    interestRate: 3.65,
  };

  beforeEach(async () => {
    const mortgageServiceSpy = jasmine.createSpyObj('MortgageService', [
      'setCalculationData',
      'setFormErrors',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        BrowserAnimationsModule,
      ],
      declarations: [MortgageFormComponent],
      providers: [{ provide: MortgageService, useValue: mortgageServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MortgageFormComponent);
    component = fixture.componentInstance;
    mortgageService = TestBed.inject(
      MortgageService
    ) as jasmine.SpyObj<MortgageService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.borrowAmount).toBe(defaultValues.borrowAmount);
    expect(component.purchasePrice).toBe(defaultValues.purchasePrice);
    expect(component.loanTerm).toBe(defaultValues.loanTerm);
    expect(component.grossIncome).toBe(defaultValues.grossIncome);
    expect(component.interestRate).toBe(defaultValues.interestRate);
    expect(component.hasError).toBeFalse();
  });

  it('should calculate monthly payment, loan-to-value ratio, and debt-to-income ratio correctly using default values', () => {
    component.borrowAmount = defaultValues.borrowAmount;
    component.purchasePrice = defaultValues.purchasePrice;
    component.grossIncome = defaultValues.grossIncome;
    component.loanTerm = defaultValues.loanTerm;
    component.interestRate = defaultValues.interestRate;

    component.calculate();

    const expectedMonthlyPayment = 3782.28;
    const expectedDTI = 1.68;
    const expectedLTV = 90.86;

    expect(component.monthlyPayment).toBeCloseTo(expectedMonthlyPayment, 2);
    expect(component.debtToIncomeRatio).toBeCloseTo(expectedDTI, 2);
    expect(component.loanToValueRatio).toBeCloseTo(expectedLTV, 2);

    expect(mortgageService.setCalculationData.calls.argsFor(0)).toEqual([
      {
        monthlyPayment: expectedMonthlyPayment.toFixed(2),
        debtToIncomeRatio: expectedDTI.toFixed(2),
        loanToValueRatio: expectedLTV.toFixed(2),
        loanTerm: component.loanTerm,
        hasError: false,
      },
    ]);
  });

  it('should set hasError to false and calculate values when input value is valid', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      value: { value: '1000000' },
    });

    component.onInputChange(event, 'borrowAmount');

    expect(component.hasError).toBeFalse();
    expect(mortgageService.setFormErrors).toHaveBeenCalledWith(false);
    expect(mortgageService.setCalculationData).toHaveBeenCalled();
  });

  it('should set hasError to true when input value is invalid', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      value: { value: '' },
    });

    component.onInputChange(event, 'borrowAmount');

    expect(component.hasError).toBeTrue();
    expect(mortgageService.setFormErrors).toHaveBeenCalledWith(true);
    expect(mortgageService.setCalculationData).toHaveBeenCalledWith(null);
  });

  it('should display error message when hasError is true', () => {
    component.hasError = true;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
  });

  it('should call calculate when loanTerm changes', () => {
    spyOn(component, 'calculate');

    component.loanTerm = 25;
    component.calculate();

    expect(component.calculate).toHaveBeenCalled();
  });
});
