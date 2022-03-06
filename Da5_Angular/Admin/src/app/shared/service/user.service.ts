import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:RestApiService) { }
  readonly BaseURI = 'https://localhost:5001/api';

  login(form){
    return this.http.post(this.BaseURI +'/Authentication/Authentication',form);
  }
  getAllPageing(keyWord:string,pageIndex:number,pageSize:number,CateID?:number){
    if(CateID!=null){
      return this.http.get(this.BaseURI+"/User/GetAllPageing?keyWord="+keyWord
      +"&pageIndex="+pageIndex+"&pageSize="+pageSize+"&CateID="+CateID);
    } 
    else{
      return this.http.get(this.BaseURI+"/User/GetAllPageing?keyWord="+keyWord
      +"&pageIndex="+pageIndex+"&pageSize="+pageSize);
    }
  }
  addUser(form:any){
    return this.http.post(this.BaseURI+"/User/Create",form);
  }

  getUserById(id:any){
    return this.http.get(this.BaseURI+"/User/GetById/"+id);
  }
  updateUser(id:any,form:any){
    return this.http.put(this.BaseURI+"/User/Update",id, form);
  }

  delete(id:any){
    return this.http.delete(this.BaseURI+'/User/Delete',id);
  }
}
