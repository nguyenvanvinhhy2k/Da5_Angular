import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestApiService } from './service/rest-api.service';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient, private rest: RestApiService) {}

  readonly APIUrl = 'http://localhost:64837/api';

  readonly PhotoUrl = 'http://localhost:5001/StaticFiles/Images/';
  readonly Api = 'https://localhost:5001/api';

  //Category
  getListCategory() {
    return this.rest.get(this.Api + '/Category/GetAll');
  }
  //lấy sản phẩm mới
  getProductNew() {
    return this.rest.get(this.Api + '/Home/getNewProduct');
  }
  // lấy sản phẩm theo id
  getProductById(id: number) {
    return this.rest.get(this.Api + '/Product/GetById/' + id);
  }
  //Lấy sản phẩm theo loại
  GetProductByCategory(id: number) {
    return this.rest.get(this.Api + '/Product/GetProductByCategory/' + id);
  }

  //Đăng nhập customer

  loginCustomer(form: any) {
    return this.rest.post(this.Api + '/Customer/Login', form);
  }

  //Mua hàng
  CreateOrder(form: any) {
    return this.rest.post(this.Api + '/Order/CreateOrder', form);
  }
  CreateOrderDetail(list: any) {
    return this.rest.post(this.Api + '/Order/CreateOrderDetail', list);
  }

  // SAN PHAM
  getNewest(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/Sanphams/Newest-Products');
  }

  // mở api ra trong controler saả phẩm ý, tìm 2 cai naà um đợi
  GetByPrice(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/Sanphams/GetByPrice');
  }

  GetByPriceSmall(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/Sanphams/GetByPriceSmall');
  }

  getHostest(): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/Sanphams/Hotest-Products');
  }

  GetSPByName(TENSP: string): Observable<any> {
    let rmv = /"/gi; // tìm kiếm những chuỗi có giá trị = " trong url
    let url =
      this.Api +
      `/Product/GetAllPageing?keyWord=${TENSP}&pageIndex=1&pageSize=10`;

    return this.http.get<any>(url.replace(rmv, '')); // thay thế " = rỗng
  }

  // KHACH HANG
  getUsers(id: number) {
    return this.http.get(this.APIUrl + '/KhachHangs/' + id);
  }

  getAllUser(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/KhachHangs');
  }
  addUser(val: any) {
    return this.http.post(this.APIUrl + '/KhachHangs/', val);
  }

  getAllCate(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/loaisanphams/');
  }

  // chi tiết đơn hang
  addOrderDetail(val: any) {
    return this.http.post(this.APIUrl + '/ChiTietDonHangs/', val);
  }

  getProductsByCate(id: number): Observable<any[]> {
    return this.http.get<any>(
      this.APIUrl + '/SanPhams/LocTheoLoai/?maloai=' + id
    );
  }

  // DON HANG
  addOrder(val: any) {
    return this.http.post(this.APIUrl + '/DonHangs/', val);
  }

  getNewestOd(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/DonHangs/GetNewestOrderID/');
  }
  getMyOrders(id: number): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/KhachHangs/myOrders/' + id);
  }
  //TIN TUC
  getAllTypeNew(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/LoaiTins');
  }

  getAllNews(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/TinTucs');
  }

  getNewsByCate(typeID: number): Observable<any[]> {
    return this.http.get<any>(
      this.APIUrl + '/Tintucs/GetNewBytypeName?typeID=' + typeID
    );
  }
  logTheoLoaiTin(typeID: number): Observable<any[]> {
    return this.http.get<any>(
      this.APIUrl + '/Tintucs/LocTheoLoai?typeID=' + typeID
    );
  }
  // getMyOrders(id: number):Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl + '/Users/myOrders/' + id)
  // }
  /// VOTE PRODUCT
  vote(val: any) {
    return this.http.post(this.APIUrl + '/DanhGias', val);
  }
  getVoteProduct(SanPhamID: number): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + `/RvwProduct/${SanPhamID}`);
  }
}
