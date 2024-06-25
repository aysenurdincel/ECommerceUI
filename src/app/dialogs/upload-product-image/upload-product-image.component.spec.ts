import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductImageComponent } from './upload-product-image.component';

describe('UploadProductImageComponent', () => {
  let component: UploadProductImageComponent;
  let fixture: ComponentFixture<UploadProductImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadProductImageComponent]
    });
    fixture = TestBed.createComponent(UploadProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
