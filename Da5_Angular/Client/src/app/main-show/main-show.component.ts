import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-show',
  templateUrl: './main-show.component.html',
  styleUrls: ['./main-show.component.css'],
})
export class MainShowComponent implements OnInit {
  constructor(
    private service: SharedService,
    private cartService: CartService,
    private route: Router
  ) {}

  listNewest: Sanpham[];

  listHotest: Sanpham[];
  listBigPrice: Sanpham[];
  listSmallPrice: Sanpham[];
  listProductNew: any;

  imagePath: string = this.service.PhotoUrl;
  urlimage: any;

  ngOnInit(): void {
    this.lamMoiDuLieu();
    this.getListProductNew();
  }

  getListProductNew() {
    this.service.getProductNew().then((data: any) => {
      this.listProductNew = data.items;
      console.log(data.items);
      this.urlimage = this.service.PhotoUrl;
      console.log(data);
    });
  }

  // addToCart(product: any): void {
  //   this.cartService.addToCart(product);
  //   alert(`Đã thêm ${product.tensanpham}`)
  // }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert(`Đã thêm ${product.name}`);
    location.reload();
  }

  lamMoiDuLieu() {
    this.service.getHostest().subscribe((data) => {
      this.listHotest = data;
      this.urlimage = this.service.PhotoUrl;
    });

    this.service.getNewest().subscribe((data) => {
      this.listNewest = data;
      this.urlimage = this.service.PhotoUrl;
    });

    this.service.GetByPrice().subscribe((data) => {
      this.listBigPrice = data;
      this.urlimage = this.service.PhotoUrl;
    });

    this.service.GetByPriceSmall().subscribe((data) => {
      this.listSmallPrice = data;
      this.urlimage = this.service.PhotoUrl;
    });
  }

  // addToCart(product: any): void {
  //   this.cartService.addToCart(product);
  //   alert(`Đã thêm ${product.TENSP}`)
  //   location.reload();
  // }
  chitiet(item: any) {
    console.log(item);
    localStorage.removeItem('ProductDetail');
    localStorage.setItem('ProductDetail', JSON.stringify(item));
    this.route.navigate([`/chitiet`]);
  }

  formatCurrency(value: any) {
    let rs = value.toString().split('');
    for (let i = rs.length - 4; i >= 0; i -= 3) {
      rs[i] += ',';
    }
    return rs.join('') + ' vnđ';
  }
}
