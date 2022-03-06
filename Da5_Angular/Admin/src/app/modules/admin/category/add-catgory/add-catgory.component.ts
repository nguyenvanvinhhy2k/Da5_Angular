import { CategoryService } from 'src/app/shared/service/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-catgory',
  templateUrl: './add-catgory.component.html',
  styleUrls: ['./add-catgory.component.scss']
})
export class AddCatgoryComponent implements OnInit {

  id:any;
  SubmitText:string = "ADD";

  //FronControl
  form:FormGroup
  constructor(private fb:FormBuilder,
    private http:CategoryService,
    private routes: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id'];
    if(this.id==undefined)this.SubmitText="ADD"
    this.formGroup();
    this.getCategoryByID();
  }

  formGroup(){
    this.form = this.fb.group({
      Name:['',Validators.required],
      SortOrder:['',Validators.required],
    })
  }

  addProduct(){
    this.http.addCategory(this.form.value).then((data)=>{
      this.router.navigate(['admin/category'])
    },error=>{

    })
  }
  Update(){
    this.http.updateCategory(this.id,this.form.value).then((data)=>{
      this.router.navigate(['admin/category']);
    })
  }
  getCategoryByID(){
    if(this.id!=undefined){
      this.SubmitText = "UPDATE"
      this.http.getCategory(this.id).then((data:any)=>{
        this.form.patchValue({
          Name:data.name,
          SortOrder:data.sortOrder,
        })  
        console.log(data);
      },error=>{

      })
    }
    else{
      this.SubmitText="ADD"
    }
  }
  

}
