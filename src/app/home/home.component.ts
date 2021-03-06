import { Component, OnInit } from '@angular/core';
import { StepsInterface } from '../interfaces/steps-interface';
import { RadioButtonsInterface } from '../interfaces/radio-buttons-interface';
import { ShippingDateInterface } from '../interfaces/shipping-date-interface';
import { ProductPriceInterface } from '../interfaces/product-price-interface';
import { DateOparationsService } from '../services/utils/date-oparations.service';
import { OrderProcessingService } from '../services/utils/order-processing.service';
import * as formSettings from '../../../settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  confPrice: string = '';
  confQuantities: any;
  confSubtotal: string = '';
  confShipping: string = '';
  confTax: string = '';
  confTotal: string = '';

  currentStep: number = 0;
  orderProdPrice: string = 'US$ 118.00';
  licNumber: string = ''; // for licenses contact us at hi@steppedform.com
  steps: StepsInterface[] = [];

  paymentOptions: RadioButtonsInterface[] = [];
  shippingDatesOptions: ShippingDateInterface[] = [];
  productPriceOptions: ProductPriceInterface[] = [];
  selectProductLabels: any;

  orderPrice: string = '';
  orderQuan: string = '';
  orderSubtotal: string = '';

  constructor(
    private dateOperations: DateOparationsService,
    private orderProcessingService: OrderProcessingService
  ) {}

  ngOnInit(): void {
    this.steps = formSettings.steps;
    this.paymentOptions = formSettings.paymentOptions;
    this.shippingDatesOptions = [
      {
        radioLabel: 'Today before 08:00 PM',
        radioName: this.dateOperations.deliveryDates().todayFormatted,
        radioModel: 'shippingDate',
        radioTitle: 'FREE Prime Delivery.'
      },
      {
        radioLabel: this.dateOperations.deliveryDates().tomorrowFullDate,
        radioName: this.dateOperations.deliveryDates().tomorrowFormatted,
        radioModel: 'shippingDate',
        radioTitle: 'FREE Amazon Day Delivery',
        radioSubTitle: 'Get your order in fewer boxes.'
      },
      {
        radioLabel: this.dateOperations.deliveryDates().afterTomorrowFullDate,
        radioName: this.dateOperations.deliveryDates().afterTomorrowFormatted,
        radioModel: 'shippingDate',
        radioTitle: 'FREE No-rush shipping',
        radioSubTitle: 'Get US$1 reward for select digital purchases.'
      },
    ];
    this.productPriceOptions = formSettings.productPriceOptions;
    this.selectProductLabels = {
      selectLabel: 'QTY',
      selectName: 'product-qty',
    }
  }

  onConfirmOrder() {
    const items = { ...sessionStorage };
    return items;
  }

  async onSubmitOrder(index: number) {
    await customElements.whenDefined('sf-stepper');
    const horizontalStepper = document.querySelector('sf-stepper');
    if (horizontalStepper) {
      horizontalStepper.onNextStep(index);
    }
  }

  goNext() {
      this.currentStep++;
      this.onSubmitOrder(this.currentStep);
  }

  goBack() {
    this.currentStep--;
    this.onSubmitOrder(this.currentStep);
  }

  printCheckout() {
    const subtotal = (this.orderProcessingService.checkOutReady().subtotal) ? this.orderProcessingService.checkOutReady().subtotal : 0;
    const shipping = (this.orderProcessingService.checkOutReady().shipping) ? this.orderProcessingService.checkOutReady().shipping : 0;
    const tax = (this.orderProcessingService.checkOutReady().tax) ? this.orderProcessingService.checkOutReady().tax : 0;
    const total = (this.orderProcessingService.checkOutReady().total) ? this.orderProcessingService.checkOutReady().total : 0;
    const price = (this.orderProcessingService.checkOutReady().price) ? this.orderProcessingService.checkOutReady().price : 0;
    const quantities = (this.orderProcessingService.checkOutReady().quantities) ? this.orderProcessingService.checkOutReady().quantities : 0;
    this.confPrice = 'US$ ' + price;
    this.confQuantities = quantities;
    this.confSubtotal = 'US$ ' + subtotal;
    this.confShipping = 'US$ ' + shipping;
    this.confTax = 'US$ ' + tax;
    this.confTotal = 'US$ ' + total;
  }

  updatePrice($event: any) {
    const result = this.orderProcessingService.calcOrder(this.orderProdPrice, $event.detail);
    this.orderPrice = result.sumPrice;
    this.orderQuan = result.sumQuan;
    this.orderSubtotal = result.subtotal;
  }

  startOrder() {
    this.goNext();
  }

  updateStepper($event: any) {
    this.currentStep = $event.detail;
  }

  addressSub() {
    this.goNext();
  }

  addBackSub() {
    this.goBack();
  }

  ccSub() {
    this.goNext();
    this.printCheckout();
  }

  ccBackSub() {
    this.goBack();
  }

  shippingSelected($event: any) {
    if ($event && $event.detail){
      const shippingDate = new Date($event.detail).toString();
      sessionStorage.setItem('delivery-date', shippingDate);
    }
  }

  confirmOrder(){
    let payload = this.onConfirmOrder();
    (payload) ? console.log(payload) : console.log('Transaction Canceled');
    sessionStorage.clear();
    this.goNext();
  }

  backOrder() {
    this.onSubmitOrder(0);
  }
}
