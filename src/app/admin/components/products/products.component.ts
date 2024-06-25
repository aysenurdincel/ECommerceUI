import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Product_Add } from 'src/app/contracts/product_add';

import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ShowProductComponent } from './show-product/show-product.component';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor( spinner:NgxSpinnerService){
    super(spinner)
  }
  ngOnInit(): void {
    
  }
  
  //htmldeki childlardan birini yada hepsini yakalayabilmek için
  @ViewChild(ShowProductComponent) showComponents : ShowProductComponent

  onProductAdd(addedProduct:Product_Add){
    this.showComponents.listProducts()
  }
}
