import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Product_Add } from 'src/app/contracts/product_add';
import { HttpErrorResponse } from '@angular/common/http';
import { Product_Show } from 'src/app/contracts/product_show';
import { Observable, firstValueFrom } from 'rxjs';
import { Product_Show_Image } from 'src/app/contracts/product_show_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  addProduct(product:Product_Add, successCallBack?:() => void, errorCallBack?:(errorMessage:string)=>void){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe({
      complete: successCallBack,
      error: (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      }
    });
  }

  async getProduct(page: number = 0, size:number = 5, successCallBack?:() => void, errorCallBack?:(errorMessage:string)=>void): Promise<{total:number,products:Product_Show[]}> {
    const promise:Promise<{total:number,products:Product_Show[]}> = this.httpClientService.get<{total:number,products:Product_Show[]}>({
      controller:"products",
      queryString: `page=${page} & size=${size}`
    }).toPromise();
    //await firstValueFrom(promise)?
    promise.then(v => successCallBack()).catch((error: HttpErrorResponse) => errorCallBack(error.message))

    return await promise

  }

  async deleteProduct(id:string){
    const obs : Observable <any> = this.httpClientService.delete({
      controller:"products",
    },id)

    await firstValueFrom(obs)
  }

  async getImages(id:string, successCallBack?:()=> void){
    const obs : Observable<Product_Show_Image[]> = this.httpClientService.get<Product_Show_Image[]>({
      controller:"products",
      action:"getimages"
    }, id)

    const images : Product_Show_Image[] = await firstValueFrom(obs)
    successCallBack()
    return images
  }

  async deleteImage(id:string, imageId:string, successCallBack?:()=> void){
    const obs : Observable<any> = this.httpClientService.delete({
      controller:"products",
      action:"deleteimage",
      queryString:`imageId=${imageId}`
    },id)

    await firstValueFrom(obs)
    successCallBack()
  }
}
