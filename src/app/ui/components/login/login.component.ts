import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { AuthorizationService } from 'src/app/services/common/authorization.service';
import { UserAuthService } from 'src/app/services/common/user-auth.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuth:UserAuthService, 
    spinner:NgxSpinnerService, 
    private authSerice:AuthorizationService,
    private activatedRoute:ActivatedRoute,
    private router:Router) 
    {
    super(spinner)
  }

  ngOnInit(): void {
    
  }

  async login(usernameOrEmail:string,password:string){
    this.showSpinner(SpinnerTypes.BallFussion)
    await this.userAuth.login(usernameOrEmail,password, ()=>{

      this.authSerice.identityalidation()
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl : string = params["returnUrl"]
        if(returnUrl){
          this.router.navigate([returnUrl])
         }
      })

      this.hideSpinner(SpinnerTypes.BallFussion)
    })
  }
}
