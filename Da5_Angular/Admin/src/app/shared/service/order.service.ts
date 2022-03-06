import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:RestApiService,private https:HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';
  getAllPageing(keyWord:string,pageIndex:number,pageSize:number){
    return this.http.get(this.BaseURI+"/Order/GetAllPageing?keyWord="+keyWord
    +"&pageIndex="+pageIndex+"&pageSize="+pageSize); 
  }
  getOrderById(id){
    return this.http.get(this.BaseURI+"/Order/GetById/"+id);
  }
  UpdateOrderStatus(id,form){
    return this.http.put(this.BaseURI+"/Order/UpdateOrderStatus",id,form);
  }
  getAllOrderSuccess(keyWord:string,pageIndex:number,pageSize:number){
    return this.http.get(this.BaseURI+"/Order/OrderSuccess?keyWord="+keyWord
    +"&pageIndex="+pageIndex+"&pageSize="+pageSize); 
  }
  
}
