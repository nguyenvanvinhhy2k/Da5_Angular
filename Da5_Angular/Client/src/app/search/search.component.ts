import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { CartService } from '../service/cart.service';
import { SharedService } from '../shared.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  listPrd: any;
  listName: string;
  PrdImgPath = this.service.PhotoUrl;
  keywork: any;

  constructor(
    private service: SharedService,
    private cartService: CartService,
    private route: Router,
    private location: Location
  ) {
    this.location.onUrlChange((x) => console.log(x));
    route.events.subscribe((val) => {
      // see also
      this.keywork = localStorage.getItem('keyword');
      console.log('chạng1');
      if (val instanceof NavigationEnd) {
        if (this.keywork) {
          console.log('chạng2');
          this.service.GetSPByName(this.keywork).subscribe((data) => {
            this.listPrd = data.items;
            console.log(data.items);
            this.listName =
              'Có ' +
              this.listPrd.length +
              ' kết quả cho từ khóa ' +
              this.keywork;
          });
        }
      }
    });
  }
  ngOnInit(): void {
    let keySearch = localStorage.getItem('keyword');
    if (this.keywork) {
      this.service.GetSPByName(this.keywork).subscribe((data) => {
        this.listPrd = data.items;
        console.log(data.items);
        this.listName =
          'Có ' + this.listPrd.length + ' kết quả cho từ khóa ' + this.keywork;
      });
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    location.reload();
    alert(`Đã thêm ${product.name}`);
  }
}
