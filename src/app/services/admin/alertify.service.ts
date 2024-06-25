import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string, options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    
    if(options.dissmissOthers)
      alertify[options.messageType](message).dissmissOthers();
    
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export enum MessageType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Message = "message",
  Notify = "notify"
}

export enum Position {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right"
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopRight;
  delay: number = 2;
  dissmissOthers: boolean = false;
}
