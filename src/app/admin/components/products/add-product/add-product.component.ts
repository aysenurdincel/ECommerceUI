import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Product_Add } from 'src/app/contracts/product_add';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent extends BaseComponent implements OnInit{

  constructor(private productService:ProductService, private alertify:AlertifyService, spinner:NgxSpinnerService){
    super(spinner)
  }

  ngOnInit(): void {
   
  }

  @Output() onProductAdd : EventEmitter<Product_Add> = new EventEmitter();

  addProduct(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement){
    this.showSpinner(SpinnerTypes.BallFussion)
    const add_product:Product_Add = new Product_Add();
    add_product.name = name.value;
    add_product.price = parseInt(price.value);
    add_product.stock = parseFloat(stock.value);

    this.productService.addProduct(add_product, ()=>{
      this.hideSpinner(SpinnerTypes.BallFussion);
      this.alertify.message("Ürün eklendi",{  
        messageType : MessageType.Success,
        position : Position.TopRight,
        dissmissOthers:true,
      });
      this.onProductAdd.emit(add_product);
    },error => {
      this.alertify.message(error,{
        dissmissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    })
  }
}
