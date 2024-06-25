import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog:MatDialog) { }

  openDialog(dialogParameters:Partial<DialogParameters>) {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == dialogParameters.data)
        dialogParameters.afterSelection()
    });
  }
}

export class DialogParameters{
  componentType: ComponentType<any>
  data: any
  afterSelection: () => void
  options?: Partial<DialogFrameOptions> = new DialogFrameOptions()
}

export class DialogFrameOptions{
  width?: string = "200px"
  height?: string 
  position?: DialogPosition
}
