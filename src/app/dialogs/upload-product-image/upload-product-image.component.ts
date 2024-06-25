import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/product.service';
import { Product_Show_Image } from 'src/app/contracts/product_show_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $:any

@Component({
  selector: 'app-upload-product-image',
  templateUrl: './upload-product-image.component.html',
  styleUrls: ['./upload-product-image.component.scss']
})
export class UploadProductImageComponent extends BaseDialog<UploadProductImageComponent> implements OnInit{

  constructor(dialogRef: MatDialogRef<UploadProductImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadProductImageState | string,
    private productService:ProductService, private spinner:NgxSpinnerService,
    private dialogService:DialogService) 
   {
    super(dialogRef);
   }

  productImages : Product_Show_Image[]
  
  async ngOnInit(){
    this.spinner.show(SpinnerTypes.BallFussion)
    this.productImages = await this.productService.getImages(this.data as string, ()=>{
      this.spinner.hide(SpinnerTypes.BallFussion)
    })
  }

  async deleteImage(imageId:string, event:any){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data: DeleteState.Yes,
      afterSelection: async () => {
        this.spinner.show(SpinnerTypes.BallFussion)
        await this.productService.deleteImage(this.data as string,imageId, ()=> {
          this.spinner.hide(SpinnerTypes.BallFussion)

          var productCard = $(event.srcElement).parent().parent()
          productCard.fadeOut(200)
        })
      }
    })   
  }

   @Output() options: Partial<FileUploadOptions> = {
    accept : ".png, .jpeg, .jpg",
    action : "upload",
    controller :"products",
    description : "Ürün resimlerini seçiniz",
    queryString : `id=${this.data}`
   }
}

export enum UploadProductImageState{
  Close
}