import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:RestApiService,private https:HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';
  getAllPageing(keyWord:string,pageIndex:number,pageSize:number,CateID?:number){
    if(CateID!=null){
      return this.http.get(this.BaseURI+"/Product/GetAllPageing?keyWord="+keyWord
      +"&pageIndex="+pageIndex+"&pageSize="+pageSize+"&CateID="+CateID);
    } 
    else{
      return this.http.get(this.BaseURI+"/Product/GetAllPageing?keyWord="+keyWord
      +"&pageIndex="+pageIndex+"&pageSize="+pageSize);
    }
  }
  addProduct(form:any){
    return this.http.post(this.BaseURI+"/Product/Create",form);
  }

  getProductById(id){
    return this.http.get(this.BaseURI+"/Product/GetById/"+id);
  }
  updateProduct(id,form:any){
    return this.http.put(this.BaseURI+"/Product/Update",id, form);
  }

  uploadPhoto(val: any) {
    return this.http.post(this.BaseURI + '/Product/SaveFile/', val)
  }

  delete(id:any){
    return this.http.delete(this.BaseURI+'/Product/Delete',id);
  }
  
}
