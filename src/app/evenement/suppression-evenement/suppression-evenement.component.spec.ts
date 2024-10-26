import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionEvenementComponent } from './suppression-evenement.component';

describe('SuppressionEvenementComponent', () => {
  let component: SuppressionEvenementComponent;
  let fixture: ComponentFixture<SuppressionEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppressionEvenementComponent]
    });
    fixture = TestBed.createComponent(SuppressionEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
