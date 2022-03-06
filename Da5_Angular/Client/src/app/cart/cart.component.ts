import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { SharedService } from '../shared.service';
import { Ctdonhang } from '../models/ctdonhang/ctdonhang.model';
import { Order } from '../models/order/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalMoney!: number;

  prdPhotoPath: string;

  UserName: string = '';
  Password: string = '';
  Address: string = '';
  Phone: string = '';
  Email: string = '';
  FullName: string = '';
  Notes: string = '';

  id: any;

  constructor(
    private cartService: CartService,
    private service: SharedService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  myCart: [];
  form: FormGroup;

  ngOnInit(): void {
    this.loadCart();
    this.prdPhotoPath = this.service.PhotoUrl;
    this.loadFomrGroup();
  }
  loadFomrGroup() {
    this.form = this.fb.group({
      CustemerName: ['', Validators.required],
      CustemerPhone: ['', Validators.required],
      CustemerAddress: ['', Validators.required],
    });
  }

  loadCart() {
    this.cartService.products$.subscribe((res) => {
      this.products = res;
      this.totalMoney = 0;
      for (let p of this.products) {
        this.totalMoney += p.quantity * p.price;
      }
    });
    let user = localStorage.getItem('user');
    if (user) {
      this.FullName = JSON.parse(user).TENKH;
      this.Address = JSON.parse(user).DIACHI;
      this.Phone = JSON.parse(user).SODIENTHOAI;
    }
  }

  deleteProduct(id: number): void {
    debugger;
    this.cartService.deleteProduct(id);
    location.reload();
  }

  updateProduct(id: number, quantity: number): void {
    debugger;
    if (quantity > 0) {
      this.cartService.updateProduct(id, quantity);
    }
  }

  letOrder() {
    debugger;
    let checkcart = localStorage.getItem('carts');
    if (checkcart != null) {
      let user = localStorage.getItem('user');
      if (user) {
        this.id = JSON.parse(user).id;
        this.form.addControl(
          'CustomerID',
          this.fb.control(this.id, Validators.required)
        );
        this.service.CreateOrder(this.form.value).then((data: any) => {
          let cart = localStorage.getItem('carts');
          if (cart) {
            let carts = JSON.parse(cart);
            let orderDetail: Ctdonhang;
            for (let i = 0; i < carts.length; i++) {
              console.log(carts[i]);
              let orderDetail = {
                ProductID: carts[i].id,
                OrderID: data,
                Quantity: carts[i].quantity,
                Price: carts[i].price,
                Image: carts[i].image,
              };
              this.service.CreateOrderDetail(orderDetail).then((data) => {
                console.log('oke');
              });
            }
            debugger;
            localStorage.removeItem('carts');
            alert('Mua hàng thành công');
            this.router.navigate(['/']);
          }
        });
      } else {
        alert('bạn nên đăng nhập trước khi mua hàng');
        location.reload();
      }
    } else {
      alert('bạn nên mua hàng trước khi thanh toán');
      this.router.navigate(['/']);
    }
  }
}
