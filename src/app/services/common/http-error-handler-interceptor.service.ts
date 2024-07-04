import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/customized-toastr-service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr:CustomToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error =>{
      
        switch(error.status){
          case HttpStatusCode.Unauthorized:
            this.toastr.message("Bu işlem için yetkiniz bulunmamaktadır.", "Yetkisiz İşlem",{
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight
            })
            break
          case HttpStatusCode.BadRequest:
            this.toastr.message("Yapılan istek geçersiz", "Geçersiz İstek",{
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
            break
          case HttpStatusCode.NotFound:
            this.toastr.message("Sayfa bulunamadı", "404 Not Found",{
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
            break
          case HttpStatusCode.InternalServerError:
            this.toastr.message("Sunucuya erişim başarısız.", "Sunucu Hatası",{
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
            break
          default:
            this.toastr.message("Beklenmeyen bir hata oluştu", "Hata",{
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
            break
        }

      return of(error)
    }))
  }
}
