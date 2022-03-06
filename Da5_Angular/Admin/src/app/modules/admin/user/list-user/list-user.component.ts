import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  keyWord:string  = '';
  pageIndex:number =1;
  pageSize:number = 10;
  listUser:any;
  
  constructor(private service:UserService,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getListUser(this.keyWord,this.pageIndex,this.pageSize);
  }

  getListUser(keyWord,pageIndex,pageSize){
    this.service.getAllPageing(keyWord,pageIndex,pageSize).then((data:any)=>{
      this.listUser = data;
      console.log(data);
    },error=>{
      console.log("Lỗi");
    })
  }
  search(keyWord){
    this.getListUser(keyWord,this.pageIndex,this.pageSize);
  }
  refresh(){
    this.getListUser(this.keyWord,this.pageIndex,this.pageSize);
  }
  Delete(id:any){
    debugger
    this.service.delete(id).then(()=>{
      this.getListUser(this.keyWord,this.pageIndex,this.pageSize);
    })
  }
  

}
