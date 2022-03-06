import { Component, ElementRef, OnInit } from '@angular/core';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { SharedService } from '../shared.service';
import { CartService } from '../service/cart.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-loc-theo-loai',
  templateUrl: './loc-theo-loai.component.html',
  styleUrls: ['./loc-theo-loai.component.css'],
})
export class LocTheoLoaiComponent implements OnInit {
  items: Sanpham[];
  id: number;
  listProduct: any;
  totalRecordProductInCategory: number;
  constructor(
    private service: SharedService,
    private cartService: CartService,
    private route: Router,
    private routes: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    route.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        this.LoadProductinCategory();
      }
    });
  }

  urlHinhanh = this.service.PhotoUrl;
  totalLength: any;
  page: number = 1;
  ngOnInit(): void {
    this.LoadProductinCategory();
  }

  LoadProductinCategory() {
    this.id = this.routes.snapshot.params['id'];
    this.service.GetProductByCategory(this.id).then(
      (data: any) => {
        this.listProduct = data.items;
        this.totalRecordProductInCategory = data.totalRecord;
      },
      (error) => {
        console.log('error');
      }
    );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert(`Đã thêm ${product.name}`);
  }
  chitiet(item: any) {
    console.log(item);
    localStorage.removeItem('ProductDetail');
    localStorage.setItem('ProductDetail', JSON.stringify(item));
    this.route.navigate([`/chitiet`]);
  }
}
