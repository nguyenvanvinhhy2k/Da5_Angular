import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  keyWord:string='';
  pageIndex:number = 1;
  pageSize:number = 10;
  listOrder:any;
  selectedValue = null;
  status = [
    {id: 0, status_name: "Chờ xác nhận"},
    {id: 1, status_name: "Chờ lấy hàng"},
    {id: 2, status_name: "Đang giao"},
    {id: 3, status_name: "Thành công"},
    {id: 4, status_name: "Đã hủy"}
 ];
  constructor(private service:OrderService,
    private router:Router) { }

  ngOnInit(): void {
    this.getAllOrder(this.keyWord,this.pageIndex,this.pageSize);
  }

  getAllOrder(keyWord,pageIndex,pageSize){
    this.service.getAllPageing(keyWord,pageIndex,pageSize).then((data:any)=>{
      this.listOrder = data.items;
      console.log(data);
    },error=>{
      console.log("eorr");
    })
  }
  UpdateOrderStatus(event,id){
    debugger
    let form = {
      ID:id,
      Status:Number(event)
    }
    this.service.UpdateOrderStatus(id,form).then((data:any)=>{
      this.getAllOrder(this.keyWord,this.pageIndex,this.pageSize);
    },error=>{
      alert("lỗi");
    })
  }
  search(key:any){

  }
  refresh(){
    
  }
  Delete(){

  }
}
