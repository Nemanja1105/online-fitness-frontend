import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramCardDetailComponent } from './fitness-program-card-detail.component';

describe('FitnessProgramCardDetailComponent', () => {
  let component: FitnessProgramCardDetailComponent;
  let fixture: ComponentFixture<FitnessProgramCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessProgramCardDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessProgramCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
