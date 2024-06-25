import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/customized-toastr-service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClientService,
    private toastr:CustomToastrService
  ) { }

  async create(user:User): Promise<Create_User>{
    const obs : Observable<Create_User|User> = this.httpClient.post<Create_User|User>({
      controller: "users",
      
    },user)

    return await firstValueFrom(obs) as Create_User
  }

  async login(usernameOrEmail:string,password:string, successCallback? : () => void){
    const obs : Observable<any|TokenResponse> = this.httpClient.post<any|TokenResponse>({
      controller:"users",
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
