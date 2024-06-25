import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService:HttpClientService,public dialog:MatDialog, 
    private dialogService:DialogService, private spinner:NgxSpinnerService){}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files
    const fileData:FormData = new FormData();
     
    for (const droppedFile of files) {
      (droppedFile.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name, _file, droppedFile.relativePath);
      })
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterSelection: ()=>{
        this.spinner.show(SpinnerTypes.BallRotate)

        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers: new HttpHeaders({"responseType":"blob"})
        },fileData).subscribe(data=> {
          this.spinner.hide(SpinnerTypes.BallRotate)
        },(error:HttpErrorResponse)=>{
    
        });
      }
    })
  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  description?:string;
  accept?:string;
}
