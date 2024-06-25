import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService){
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerTypes.BallRotatePulse)
  }
}