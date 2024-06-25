
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private jwtHelper:JwtHelperService) { }

  identityalidation(){
    const token : string = localStorage.getItem("accessToken")
  

  let expired:boolean
  try{
    expired = this.jwtHelper.isTokenExpired(token) 
  }catch{
    expired = true
  }

  isAuthenticated = token != null && !expired
  }

  get isAuthenticated():boolean{
    return isAuthenticated
  }
}

export let isAuthenticated:boolean
