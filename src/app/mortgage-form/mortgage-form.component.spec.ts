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
    expect(component.borrowAmount).toBe(826800);
    expect(component.purchasePrice).toBe(910000);
    expect(component.loanTerm).toBe(30);
    expect(component.grossIncome).toBe(225000);
    expect(component.interestRate).toBe(3.65);
    expect(component.hasError).toBeFalse();
  });

  it('should calculate monthly payment, loan-to-value ratio, and debt-to-income ratio correctly', () => {
    component.calculate();

    expect(component.monthlyPayment).toBeGreaterThan(0);
    expect(component.loanToValueRatio).toBeCloseTo(91, 2);
    expect(component.debtToIncomeRatio).toBeCloseTo(3.7, 2);
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
