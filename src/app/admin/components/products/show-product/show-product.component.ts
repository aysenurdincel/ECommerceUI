import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Product_Show } from 'src/app/contracts/product_show';
import { UploadProductImageComponent, UploadProductImageState } from 'src/app/dialogs/upload-product-image/upload-product-image.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/product.service';
declare var  $:any;

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent extends BaseComponent implements OnInit{
  constructor(private productService:ProductService, spinner:NgxSpinnerService, private alertify:AlertifyService,
    private dialog :DialogService
  ) {
    super(spinner)
   }
  
 
  displayedColumns: string[] = ['name', 'stock', 'price', 'creationDate', 'lastModifiedDate', 'image','edit','delete'];
  dataSource : MatTableDataSource<Product_Show> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async listProducts(){
    this.showSpinner(SpinnerTypes.BallFussion)
    const products : {total:number,products:Product_Show[]} = await this.productService.getProduct(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerTypes.BallFussion), error => this.alertify.message("Bir hata oluştu",{
      messageType:MessageType.Error,
      dissmissOthers:true,
      position:Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<Product_Show>(products.products)

    this.paginator.length = products.total
    
  }

  async onPageChange(){
    await this.listProducts()
  }

  uploadImage(id:string){
    this.dialog.openDialog({
      componentType: UploadProductImageComponent,
      data: id,
      options:{
        width: '50%',
      }
    })
  }
  

  async ngOnInit(){
    await this.listProducts()
  } 
}
