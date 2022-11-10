import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprroveraddeditComponent } from './aprroveraddedit.component';

describe('AprroveraddeditComponent', () => {
  let component: AprroveraddeditComponent;
  let fixture: ComponentFixture<AprroveraddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprroveraddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprroveraddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
