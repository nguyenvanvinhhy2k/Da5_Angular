import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  id;
  orderDetail:any;
  total:number=0;
  constructor(
    private service:OrderService,
    private routers:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.loadOrderDetail();
  }

  loadOrderDetail(){
    this.id = this.routers.snapshot.params["id"];
    this.service.getOrderById(this.id).then((data)=>{
      this.orderDetail = data;
      this.orderDetail.forEach(element => {
        console.log(element);
        this.total+=(element.price)*(element.quantity);
      });
    },error=>{
      console.log("lỗi");
    })
  }


}
