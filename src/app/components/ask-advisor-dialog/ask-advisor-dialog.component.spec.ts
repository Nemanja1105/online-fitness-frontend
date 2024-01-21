import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAdvisorDialogComponent } from './ask-advisor-dialog.component';

describe('AskAdvisorDialogComponent', () => {
  let component: AskAdvisorDialogComponent;
  let fixture: ComponentFixture<AskAdvisorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskAdvisorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskAdvisorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
