import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationEvenementComponent } from './modification-evenement.component';

describe('ModificationEvenementComponent', () => {
  let component: ModificationEvenementComponent;
  let fixture: ComponentFixture<ModificationEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationEvenementComponent]
    });
    fixture = TestBed.createComponent(ModificationEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
