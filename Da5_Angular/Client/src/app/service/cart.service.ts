import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productsCart = new BehaviorSubject<any[]>([]);
  myStorage!: any;
  products$ = this.productsCart.asObservable();

  constructor() {
    let carts = localStorage.getItem('carts');
    if (carts) {
      this.myStorage = JSON.parse(carts);
    }

    if (!this.myStorage) this.myStorage = [];
    this.productsCart.next(this.myStorage);
  }

  addToCart(product: any, quantity: number = 1): void {
    product.quantity = quantity;
    let myStorage: any[] = [];

    if (localStorage.getItem('carts') == null) {
      myStorage.push(product);
    } else {
      let carts = localStorage.getItem('carts');
      if (carts) {
        myStorage = JSON.parse(carts);
      }

      let checkProduct: boolean = true;
      for (let p of myStorage) {
        if (p.id == product.id) {
          checkProduct = false;
          p.quantity += quantity;
          break;
        }
      }

      if (checkProduct) myStorage.push(product);
    }
    this.getProducts();
    localStorage.setItem('carts', JSON.stringify(myStorage));
    this.productsCart.next(myStorage);
  }

  getProducts(): any[] {
    let myStorage = localStorage.getItem('carts');
    return myStorage == null ? [] : JSON.parse(myStorage);
  }

  deleteProduct(id: number) {
    let myStorage = this.getProducts().filter((p) => p.id != id);
    localStorage.setItem('carts', JSON.stringify(myStorage));
    this.productsCart.next(myStorage);
  }

  updateProduct(id: number, quantity: number) {
    let products = localStorage.getItem('carts');
    if (products) {
      let lstproducts = JSON.parse(products);
      for (let p of lstproducts) {
        if (p.id == id) {
          p.quantity = quantity;
          break;
        }
      }
      localStorage.setItem('carts', JSON.stringify(lstproducts));
      this.productsCart.next(lstproducts);
    }
  }

  clearCart() {
    localStorage.removeItem('carts');
    this.productsCart.next([]);
  }
}
