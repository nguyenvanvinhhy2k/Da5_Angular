import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  constructor(private service:ProductService) { }
  listProduct:any;
  keyWord:string='';
  pageIndex:number = 1;
  pageSize:number = 10;
  ngOnInit(): void {
    this.loadProduct(this.keyWord,this.pageIndex,this.pageSize);
  }
  loadProduct(keyWord,pageIndex,pageSize){
    this.service.getAllPageing(keyWord,pageIndex,pageSize).then((data:any)=>{
      this.listProduct = data;
      console.log(data.objects);
    },error=>{
      console.log(error);
    })
  }
  Delete(id){
    debugger
    this.service.delete(id).then((data)=>{
      this.loadProduct(this.keyWord,this.pageIndex,this.pageSize);
    },error=>{
      console.log("error");
    })
  }
  search(keyWord){
    this.loadProduct(keyWord,this.pageIndex,this.pageSize);
  }
  refresh(){
    this.loadProduct(this.keyWord,this.pageIndex,this.pageSize);
  }
}
