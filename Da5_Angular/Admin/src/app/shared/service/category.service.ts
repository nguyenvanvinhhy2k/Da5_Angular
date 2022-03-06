import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:RestApiService,private https:HttpClient) { }
  readonly BaseURI = 'https://localhost:5001/api';
  
  getallCategory(){
    return this.http.get(this.BaseURI+"/Category/GetAll");
  }
  uploadPhoto(val: any) {
    return this.http.post(this.BaseURI + '/Product/SaveFile/', val)
  }
  
  getAllPageing(keyWord:string,pageIndex:number,pageSize:number,CateID?:number){
    if(CateID!=null){
      return this.http.get(this.BaseURI+"/Category/GetAllPageing?keyWord="+keyWord
      +"&pageIndex="+pageIndex+"&pageSize="+pageSize+"&CateID="+CateID);
    } 
    else{
      return this.http.get(this.BaseURI+"/Category/GetAllPageing?keyWord="+keyWord
      +"&pageIndex="+pageIndex+"&pageSize="+pageSize);
    }
  }
  addCategory(form:any){
    return this.http.post(this.BaseURI+"/Category/Create",form);
  }

  getCategory(id){
    return this.http.get(this.BaseURI+"/Category/GetById/"+id);
  }
  updateCategory(id,form:any){
    return this.http.put(this.BaseURI+"/Category/Update",id, form);
  }
  delete(id:any){
    return this.http.delete(this.BaseURI+'/Category/Delete',id);
  }
}
