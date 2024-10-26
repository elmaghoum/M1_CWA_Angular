import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsEvenementComponent } from './details-evenement.component';

describe('DetailsEvenementComponent', () => {
  let component: DetailsEvenementComponent;
  let fixture: ComponentFixture<DetailsEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsEvenementComponent]
    });
    fixture = TestBed.createComponent(DetailsEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
