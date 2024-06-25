import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { CustomersModule } from './admin/components/customers/customers.module';
import { OrdersModule } from './admin/components/orders/orders.module';
import { ProductsModule } from './admin/components/products/products.module';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthorizationGuard } from './guards/common/authorization.guard';

const routes: Routes = [
  {path:'admin', component:LayoutComponent,
    children:[
      { path: '', component: DashboardComponent ,canActivate: [AuthorizationGuard]},
      { path: 'customers', loadChildren: () => import("./admin/components/customers/customers.module").then(module=>module.CustomersModule),canActivate: [AuthorizationGuard]},
      { path: 'orders', loadChildren: () => import("./admin/components/orders/orders.module").then(module=>module.OrdersModule),canActivate: [AuthorizationGuard]},
      { path: 'products', loadChildren: () => import("./admin/components/products/products.module").then(module=>module.ProductsModule),canActivate: [AuthorizationGuard]}, 
      ], canActivate: [AuthorizationGuard]
  },
  {path:'', component:HomeComponent},
  {path:'cart', loadChildren: () => import("./ui/components/cart/cart.module").then(module => module.CartModule)},
  {path:'products', loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path:'register', loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule)},
  {path:'login', loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
