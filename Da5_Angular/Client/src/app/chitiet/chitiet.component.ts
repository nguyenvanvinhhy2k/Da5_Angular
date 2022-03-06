import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CartService } from '../service/cart.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css'],
})
export class ChitietComponent implements OnInit {
  SanPhamID: number;
  TENSP: string;
  GIABAN: string;
  IMAGE: string;
  MALOAI: string;
  MOTA: string;
  XUATXU: string;
  GIANHAP: number;
  SOLUONGTON: number;

  prd: any;
  id: number;
  PrdImgPath: string;
  productDetail: any;
  constructor(
    private service: SharedService,
    public cartService: CartService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ProductDetail();

    this.PrdImgPath = this.service.PhotoUrl;
  }

  ProductDetail() {
    this.id = this.routes.snapshot.params['id'];
    debugger;
    this.service.getProductById(this.id).then(
      (data: any) => {
        this.productDetail = data;
        localStorage.setItem(
          'ProductDetail',
          JSON.stringify(this.productDetail)
        );
        this.loadProductDetails();
      },
      (error) => {}
    );
  }

  loadProductDetails() {
    this.prd = localStorage.getItem('ProductDetail');
    if (this.prd) {
      this.SanPhamID = JSON.parse(this.prd).id;
      this.TENSP = JSON.parse(this.prd).name;
      this.GIABAN = this.formatCurrency(JSON.parse(this.prd).price);
      this.IMAGE = JSON.parse(this.prd).image;
      this.MOTA = JSON.parse(this.prd).description;
    }
    console.log('đây là loadproduct');
    let x = document.getElementById('description');
    if (x) {
      x.innerHTML += `<h4 style="margin-top: 50px; color: #FE980F">Mô tả sản phẩm</h4>`;
      x.innerHTML += this.MOTA;
    }
  }

  addToCart(): void {
    if (this.prd) {
      this.cartService.addToCart(JSON.parse(this.prd));
      alert(`Đã thêm ${JSON.parse(this.prd).name}`);
    }
  }
  demo() {
    this.id = this.routes.snapshot.params['id'];
    console.log(this.prd);
    alert('hello');
  }
  formatCurrency(value: any) {
    let rs = value.toString().split('');
    for (let i = rs.length - 4; i >= 0; i -= 3) {
      rs[i] += ',';
    }
    return rs.join('') + ' vnđ';
  }
}
