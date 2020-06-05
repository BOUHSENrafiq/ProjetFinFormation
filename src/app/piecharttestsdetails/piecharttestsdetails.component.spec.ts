import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecharttestsdetailsComponent } from './piecharttestsdetails.component';

describe('PiecharttestsdetailsComponent', () => {
  let component: PiecharttestsdetailsComponent;
  let fixture: ComponentFixture<PiecharttestsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecharttestsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecharttestsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
