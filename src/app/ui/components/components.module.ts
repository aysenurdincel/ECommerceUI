import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CartModule,ProductsModule,HomeModule, RegisterModule,LoginModule
  ]
})
export class ComponentsModule { }
