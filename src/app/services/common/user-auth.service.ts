import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from './http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/customized-toastr-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient:HttpClientService, private toastr:CustomToastrService) { }

  async login(usernameOrEmail:string,password:string, successCallback? : () => void){
    const obs : Observable<any|TokenResponse> = this.httpClient.post<any|TokenResponse>({
      controller:"auth",
      action:"login"
    }, {usernameOrEmail,password})

    const tokenResponse : TokenResponse = await firstValueFrom(obs) as TokenResponse
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      

      this.toastr.message("Kullanıcı başarıyla giriş yapmıştır","Giriş Başarılı", {
        messageType:ToastrMessageType.Success,
        position: ToastrPosition.TopRight
    })
  }
 
    successCallback()
  }
}
