import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { HttpClient, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  form:FormGroup;
  listCategory:any;
  public progress: number;
  public message: string;
  id:any;
  SubmitText:string="ADD"
  cateID:any;
  Name:string;

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private service:ProductService,
     private fb:FormBuilder,
     private cateService:CategoryService,
     private router:Router,
     private http:HttpClient,
     private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDataCategory();
    this.id = this.routes.snapshot.params['id'];
    if(this.id==undefined)this.SubmitText="ADD"
    this.form = this.fb.group({
      Name:['',Validators.required],
      Price:['',Validators.required],
      OriginalPrice:['',Validators.required],
      Quantity:['',Validators.required],
      Description:['',Validators.required],
      Size:['',Validators.required],
      Image:['',Validators.required],
      CateID:['',Validators.required]
    })
   
    this.getProductByID();
   
  }
  

  loadDataCategory(){
    this.cateService.getallCategory().then((data:any)=>{
      this.listCategory = data;
      console.log(data);
    },error=>{

    })
  }

  addProduct(){
      this.service.addProduct(this.form.value).then(()=>{
        this.router.navigate(['admin/product'])
      },err => {
        console.log("Lỗi");
      })

  }
  Update(){
    debugger
    this.service.updateProduct(this.id,this.form.value).then(data=>{
      this.router.navigate(['admin/product'])
    },error=>{
      console.log("loi");
    })
  }
  
  getProductByID(){
    if(this.id!=undefined){
      this.SubmitText="Update"
      this.service.getProductById(this.id).then((data:any)=>{
        this.cateID = data.cateID;
        this.form.patchValue({
          Name:data.name,
          Price:data.price,
          OriginalPrice:data.originalPrice,
          Quantity:data.quantity,
          Description:data.description,
          Size:data.size,
          Image:data.image,
          CateID:data.cateID
        })  
    
      },error=>{

      })
    }
    else{
      this.SubmitText="ADD"
    }
  }
 

  changeImage(event: any) {
    debugger
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadPhoto(formData).then((data: any) => {
      this.form.value.Image = data.toString();
    })
  }


public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.form.value.Image = fileToUpload.name;
    this.http.post('https://localhost:5001/api/Product/SaveFile', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
