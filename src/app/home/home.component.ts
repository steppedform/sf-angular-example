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
  currentStep: number = 0;
  licNumber: string = ''; // for licenses contact us hi@steppedform.com
  steps: StepsInterface[] = [];
  paymentOptions: RadioButtonsInterface[] = [];
  shippingDatesOptions: ShippingDateInterface[] = [];
  productPriceOptions: ProductPriceInterface[] = [];
  selectProductLabels: any;

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

  onSubmitOrder(index: number) {
         console.log(index);
/*       (async () => {
        await customElements.whenDefined('sf-stepper');
        const horizontalStepper = document.querySelector('sf-stepper');
        await horizontalStepper.onNextStep(index);
      })(); */
  }

  goNext(){
      this.currentStep++;
      this.onSubmitOrder(this.currentStep);
  }

  goBack(){
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
    const confPrice = 'US$ ' + price;
    const confQuantities = quantities;
    const confSubtotal = 'US$ ' + subtotal;
    const confShipping = 'US$ ' + shipping;
    const confTax = 'US$ ' + tax;
    const confTotal = 'US$ ' + total;
    return { confPrice, confQuantities, confSubtotal, confShipping, confTax, confTotal }
  }

}
