import { Component, OnInit } from '@angular/core';

import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  constructor(){
    
  }
  ngOnInit(): void {
    //this.showSpinner(SpinnerTypes.BallRotatePulse)
  }
}