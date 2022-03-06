import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  helle:any = 'duma';
  form:FormGroup;
  constructor(private router:Router,private fb:FormBuilder,private service:UserService) {
    this.form = fb.group({
      UserName:['',Validators.required],
      PassWord:['',[Validators.required,Validators.minLength(6)]],
      Remember:['']
    })
   }

  ngOnInit(): void {
    if(localStorage.getItem("userToken")!=null){
      this.router.navigate(['admin']);
    }
  }

  login(){
    debugger
    this.service.login(this.form.value).then((data:any)=>{
      debugger;
      console.log(data);
      if(data.messgae==null){
        localStorage.setItem("userToken",data.obj);
        this.router.navigate(['admin']);
      }
      else
      this.router.navigate(['login']);
    },error=>{
      console.log(error);
    });
  }
}
