import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService){
    super(spinner)
  }
  ngOnInit(): void {
    //this.showSpinner(SpinnerTypes.BallRotatePulse)
  }
}
