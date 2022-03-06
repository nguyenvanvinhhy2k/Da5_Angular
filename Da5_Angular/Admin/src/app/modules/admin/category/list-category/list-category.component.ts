import { CategoryService } from 'src/app/shared/service/category.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  keyWord:string='';
  pageIndex:number =1;
  pageSize:number = 10;
  constructor(private http:CategoryService) { }

  listCategory:any;
  ngOnInit(): void {
    this.loadCategory('',this.pageIndex,this.pageSize);
  }

  loadCategory(keyWord='',pageIndex=1,pageSize=10){
    debugger
    this.http.getAllPageing(keyWord,pageIndex,pageSize).then((data:any)=>{
      this.listCategory = data;
      console.log(data);
    },error=>{
      console.log("lỗi");
    })
  }
 
  delete(id){
    this.http.delete(id).then((data)=>{
      this.loadCategory('',1,10);
    })
  }
  search(keyWord){
    debugger
    this.loadCategory(keyWord,this.pageIndex,this.pageSize);
  }
  refresh(){
    this.loadCategory();
  }

}
