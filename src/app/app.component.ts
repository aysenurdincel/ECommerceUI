import { Component } from '@angular/core';
import { AuthorizationService } from './services/common/authorization.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/customized-toastr-service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(public authService:AuthorizationService, 
    private toastr:CustomToastrService,
    private router:Router)
    {
    authService.identityalidation()
  }

  signOut(){
    localStorage.removeItem("accessToken")
    this.authService.identityalidation()

    this.router.navigate([""])
    
    this.toastr.message("Oturum başarıyla kapatılmıştır","Çıkış Başarılı",{
      messageType :ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }
}



