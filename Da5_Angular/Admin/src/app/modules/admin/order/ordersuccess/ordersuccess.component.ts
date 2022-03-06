import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrls: ['./ordersuccess.component.scss']
})
export class OrdersuccessComponent implements OnInit {

  keyWord:string='';
  pageIndex:number = 1;
  pageSize:number = 10;
  listOrderSuccess:any;
  constructor(private service:OrderService,
    private router:Router) { }

  ngOnInit(): void {
    this.getAllOrder(this.keyWord,this.pageIndex,this.pageSize);
  }

  getAllOrder(keyWord,pageIndex,pageSize){
    this.service.getAllOrderSuccess(keyWord,pageIndex,pageSize).then((data:any)=>{
      this.listOrderSuccess = data.items;
      console.log(data);
    },error=>{
      console.log("eorr");
    })
  }
  search(key:any){

  }
  refresh(){
    
  }
  Delete(){

  }

}
