import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageFormsComponent } from './mortgage-forms.component';

describe('MortgageFormsComponent', () => {
  let component: MortgageFormsComponent;
  let fixture: ComponentFixture<MortgageFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgageFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MortgageFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
