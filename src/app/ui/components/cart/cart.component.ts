import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService){
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerTypes.BallRotatePulse)
  }
}
