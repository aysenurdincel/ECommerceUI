import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UploadProductImageComponent } from './upload-product-image/upload-product-image.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    FileUploadDialogComponent,
    DeleteDialogComponent,
    UploadProductImageComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,MatButtonModule,MatCardModule,
    FileUploadModule
  ]
})
export class DialogModule { }
