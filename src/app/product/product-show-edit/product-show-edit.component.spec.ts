import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShowEditComponent } from './product-show-edit.component';

describe('ProductShowEditComponent', () => {
  let component: ProductShowEditComponent;
  let fixture: ComponentFixture<ProductShowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShowEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
