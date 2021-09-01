import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderProcessingService {

  constructor() { }

 roundDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

 checkOutReady() {
    const price = sessionStorage.getItem('price');
    const quantities = sessionStorage.getItem('quantities');
    const subtl: any = sessionStorage.getItem('subtotal');
    const subtotal: any = this.roundDecimals(subtl);
    const shipping: any  = this.roundDecimals(subtotal * 0.15);
    const tax: any  = this.roundDecimals(subtotal * 0.10);
    const globalTotal = Number(subtotal) + Number(shipping) + Number(tax);
    const total: any  = this.roundDecimals(globalTotal);
    // Define is session Storage
    sessionStorage.setItem('shipping', shipping);
    sessionStorage.setItem('tax', tax);
    sessionStorage.setItem('total', total);
    return {subtotal, shipping, tax, total, price, quantities};
  }

calcOrder(price: string, quantity: string) {
    // Convert to number
    var prFormat = +price.replace(/[^0-9.]+/g,'');
    var pr: any = this.roundDecimals(prFormat);
    var qt: any = +quantity;
    // Calculate subtotal
    var num = pr * qt;
    var subtotal: any  = this.roundDecimals(num);
    // Save data to sessionStorage
    sessionStorage.setItem('price', pr);
    sessionStorage.setItem('quantities', qt);
    sessionStorage.setItem('subtotal', subtotal);
    return {sumPrice: 'US$ ' + pr, sumQuan: qt, subtotal: 'US$ ' + subtotal}
  }
}
