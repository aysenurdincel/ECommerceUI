import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService, isAuthenticated } from 'src/app/services/common/authorization.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customized-toastr-service';

export const AuthorizationGuard: CanActivateFn = (route, state) => {

  const jwtHelper: JwtHelperService = inject(JwtHelperService)
  const router:Router = inject(Router) 

  const toastr:CustomToastrService = inject(CustomToastrService)
  const authService:AuthorizationService = inject(AuthorizationService)
  

  if(!isAuthenticated){
    //bir yere tıklandığında girişi yapılmamışsa tıklanan adresi tutup giriş yap sayfasına yönlendirecek
    router.navigate(['login'], {queryParams:{returnUrl : state.url}})
    toastr.message("Giriş yapmanız gerekiyor","Erişim Yetkisi",{
      messageType:ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }

  return true;
};
