import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http:HttpClient) { }
  getHeader(){
    const token = localStorage.getItem("userToken");
    return token?new HttpHeaders().set('Authorization','Bearer ' + token):null;
  }
  get(link:string){
    let header = this.getHeader();
    if(header instanceof HttpHeaders)
    return this.http.get(link,{headers:header}).toPromise();
    return this.http.get(link).toPromise();
  }
  getOne(link:string,id:string){
    let header = this.getHeader();
    if(header instanceof HttpHeaders)
    return this.http.get(link + '/' + id,{headers:header}).toPromise();
    return this.http.get(link + '/' + id).toPromise();
  }
  post(link:string,body:any){
    let header = this.getHeader();
    if(header instanceof HttpHeaders)
    return this.http.post(link,body,{headers:header}).toPromise();
    return this.http.post(link,body).toPromise();
  }
  put(link:string,id:string,body:any){
    let header = this.getHeader();
    if(header instanceof HttpHeaders)
    return this.http.put(link + '/' + id,body,{headers:header}).toPromise();
    return this.http.put(link + '/' + id,body).toPromise();
  }
  delete(link:string,id:string){
    let header = this.getHeader();
    if(header instanceof HttpHeaders)
    return this.http.delete(link + '/' + id,{headers:header}).toPromise();
    return this.http.delete(link + '/' + id).toPromise();
  }
}
