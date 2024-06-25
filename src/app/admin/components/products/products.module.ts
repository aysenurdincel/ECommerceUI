import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';

import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    ShowProductComponent,
    DeleteDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: ProductsComponent
    }]),
    MatSidenavModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatDialogModule,
    FileUploadModule,DialogModule
  ]
})
export class ProductsModule { }
