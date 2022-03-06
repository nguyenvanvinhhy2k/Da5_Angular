import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id:number;
  form:FormGroup;
  SubmitText:string = "ADD";
  keyWord:string ='';
  pageIndex:number = 1;
  pageSize:number = 10;
  constructor(private service:UserService,
    private router:Router,
    private fb:FormBuilder,
    private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    if(this.id==undefined)this.SubmitText="ADD"
    this.formGroup();
    this.getbyUser();
  }
  formGroup(){
    this.form = this.fb.group({
      FullName:['',Validators.required],
      UserName:['',Validators.required],
      PassWord:['',Validators.required],
    })
  }


  getbyUser(){
    debugger
    if(this.id!=undefined){
      this.SubmitText = "UPDATE"
      this.service.getUserById(this.id).then((data:any)=>{
        this.form.patchValue({
          FullName:data.fullName,
          UserName:data.userName
        })  
        console.log(data);
      },error=>{

      })
    }
    else{
      this.SubmitText="ADD"
    }
  }
  addProduct(){
    this.service.addUser(this.form.value).then((data:any)=>{
      this.router.navigate(['admin/user']);
    },error=>{
      console.log("error");
    })
  }
  Update(){
    this.service.updateUser(this.id,this.form.value).then((data)=>{
      this.router.navigate(['admin/user']);
    })
  }

}
