import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Loaisanpham } from 'src/app/models/loaisanpham/loaisanpham.model';
import { Khachhang } from 'src/app/models/khachhang/khachhang.model';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem = 0;
  products: any[] = [];
  totalMoney!: number;
  photoPath: string;

  keyword: string;

  kh_id: number;
  kh_taikhoan: string;
  kh_matkhau: string;
  kh_matkhau2: string;
  kh_diachi: string;
  kh_sdt: string;
  kh_email: string;
  kh_tenkh: string;

  listUser: Khachhang[];

  user: Khachhang;

  dsLoaiSP: Loaisanpham[];
  listCategory: any;
  customer: string;

  form: FormGroup;
  constructor(
    private service: SharedService,
    private route: Router,
    private cartSerice: CartService,
    private fb: FormBuilder,
    private routes: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadListCategory();
    this.totalItem = this.cartSerice.getProducts().length;
    this.service.getAllCate().subscribe((data) => {
      this.dsLoaiSP = data;
    });
    this.loadData();
    this.loadCart();
    this.loadFormGroupLogin();

    //phần control Login

    let user = localStorage.getItem('user');
    if (user) {
      console.log(JSON.parse(user).fullName);
      this.customer = JSON.parse(user).fullName;
    }
  }

  loadFormGroupLogin() {
    this.form = this.fb.group({
      UserName: ['', Validators.required],
      PassWord: ['', Validators.required],
    });
  }
  locSP(id: number) {
    console.log(id);
    localStorage.removeItem('maloai');
    localStorage.setItem('maloai', JSON.stringify(id));
    this.route.navigate(['/locSP']);
  }
  loadData() {
    this.kh_id = 0;
    this.kh_taikhoan = '';
    this.kh_matkhau = '';
    this.kh_matkhau2 = '';
    this.kh_diachi = '';
    this.kh_sdt = '';
    this.kh_email = '';
    this.kh_tenkh = '';
  }

  loginNow() {
    debugger;
    this.service.loginCustomer(this.form.value).then((data: any) => {
      localStorage.setItem('user', JSON.stringify(data.obj));
      alert(data.obj);
    });
    location.reload();
  }

  log_out() {
    localStorage.removeItem('user');
    location.reload();
  }

  addUser() {
    this.user = {
      KhachHangID: this.kh_id,
      TAIKHOAN: this.kh_taikhoan,
      MATKHAU: this.kh_matkhau,
      DIACHI: this.kh_diachi,
      SODIENTHOAI: this.kh_sdt,
      EMAIL: this.kh_email,
      TENKH: this.kh_tenkh,
    };

    if (
      this.kh_matkhau != this.kh_matkhau2 ||
      this.kh_taikhoan == '' ||
      this.kh_tenkh == '' ||
      this.kh_sdt == ''
    ) {
      alert(
        'Phát hiện dữ liệu truyền vào không hợp lệ, vui lòng kiểm tra lại!'
      );
    } else if (this.checkAccountDB() == false) {
      alert(
        'Tài khoản hoặc số điện thoại đã được sử dụng, vui lòng kiểm tra lại!'
      );
    } else {
      this.service.addUser(this.user).subscribe((data) => {
        alert('Hoàn tất mở tài khoản!');
        location.reload();
      });
    }
  }

  checkAccountDB() {
    let rs = true;
    this.service.getAllUser().subscribe((data) => {
      console.log(data);
      for (let i of data) {
        if (this.kh_sdt == i.sdt || this.kh_taikhoan == i.taikhoan) {
          rs = false;
        }
      }
    });
    return rs;
  }

  loadCart() {
    this.cartSerice.products$.subscribe((res) => {
      this.products = res;
      this.totalMoney = 0;
      for (let p of this.products) {
        this.totalMoney += p.Quantity * p.giaban;
      }
    });
    this.photoPath = this.service.PhotoUrl;
  }

  go(keyword: string) {
    localStorage.removeItem('keyword');
    localStorage.setItem('keyword', JSON.stringify(keyword));
    this.route.navigateByUrl(`/search?keywork=${keyword}`);
  }

  keyPress(event: any) {
    let key = this.keyword;
    if (key) {
      if (event.keyCode == 13) {
        this.go(key);
      }
    }
  }

  loadListCategory() {
    this.service.getListCategory().then(
      (data) => {
        this.listCategory = data;
        console.log(data);
      },
      (error) => {}
    );
  }
}
