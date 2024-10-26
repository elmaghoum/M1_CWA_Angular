import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEvenementComponent } from './creation-evenement.component';

describe('CreationEvenementComponent', () => {
  let component: CreationEvenementComponent;
  let fixture: ComponentFixture<CreationEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationEvenementComponent]
    });
    fixture = TestBed.createComponent(CreationEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
