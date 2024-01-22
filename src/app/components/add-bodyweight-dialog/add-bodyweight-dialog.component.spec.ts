import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBodyweightDialogComponent } from './add-bodyweight-dialog.component';

describe('AddBodyweightDialogComponent', () => {
  let component: AddBodyweightDialogComponent;
  let fixture: ComponentFixture<AddBodyweightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBodyweightDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBodyweightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
