import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailShowComponent } from './productdetail-show.component';

describe('ProductdetailShowComponent', () => {
  let component: ProductdetailShowComponent;
  let fixture: ComponentFixture<ProductdetailShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdetailShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdetailShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
