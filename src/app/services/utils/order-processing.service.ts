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
    return { subtotal, shipping, tax, total, price, quantities };
  }

calcOrder(price: string, quantity: string) {
    // Convert to number
   const prFormat = +price.replace(/[^0-9.]+/g,'');
   const pr: any = this.roundDecimals(prFormat);
   const qt: any = +quantity;
    // Calculate subtotal
   const num = pr * qt;
   const fsubtotal: any  = this.roundDecimals(num);
    // Save data to sessionStorage
    sessionStorage.setItem('price', pr);
    sessionStorage.setItem('quantities', qt);
    sessionStorage.setItem('subtotal', fsubtotal);
    const sumPrice = 'US$ ' + pr; 
    const sumQuan = qt; 
    const subtotal = 'US$ ' + fsubtotal;
    return { sumPrice, sumQuan, subtotal }
  }
}
