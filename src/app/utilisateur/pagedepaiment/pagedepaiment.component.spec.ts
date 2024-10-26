import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedepaimentComponent } from './pagedepaiment.component';

describe('PagedepaimentComponent', () => {
  let component: PagedepaimentComponent;
  let fixture: ComponentFixture<PagedepaimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagedepaimentComponent]
    });
    fixture = TestBed.createComponent(PagedepaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
