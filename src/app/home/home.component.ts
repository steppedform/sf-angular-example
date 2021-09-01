import { Component, OnInit } from '@angular/core';
import { StepsInterface } from '../interfaces/steps-interface';
import { RadioButtonsInterface } from '../interfaces/radio-buttons-interface';
import { ShippingDateInterface } from '../interfaces/shipping-date-interface';
import { ProductPriceInterface } from '../interfaces/product-price-interface';
import { DateOparationsService } from '../services/utils/date-oparations.service';
import { OrderProcessingService } from '../services/utils/order-processing.service';

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
    this.steps =[
      {
        stepNumber: 1,
        stepLabel: 'Place Order',
        activeStep: true,
        stepHidden: false
      },
      {
        stepNumber: 2,
        stepLabel: 'Address',
        activeStep: false,
        stepHidden: false
      },
      {
        stepNumber: 3,
        stepLabel: 'Payment',
        activeStep: false,
        stepHidden: false
      },
      {
        stepNumber: 4,
        stepLabel: 'Confirm',
        activeStep: false,
        stepHidden: false
      },
      {
        stepNumber: 5,
        stepLabel: 'Thank You',
        activeStep: false,
        stepHidden: true // Step exists but will not be added in the Stepper
      },
    ];

    this.paymentOptions = [
      {
        radioLabel: 'Same as shipping',
        radioName: 'sameAddress',
        radioModel: 'paymentAddress'
      },
      {
        radioLabel: 'Different Address',
        radioName: 'differentAddress',
        radioModel: 'paymentAddress'
      },
    ];

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

    this.productPriceOptions = [
    {
        optionLabel: 1,
        optionValue: 1,
      },
      {
        optionLabel: 2,
        optionValue: 2,
      },
      {
        optionLabel: 3,
        optionValue: 3,
      },
      {
        optionLabel: 4,
        optionValue: 4,
      },
      {
        optionLabel: 5,
        optionValue: 5,
      },
      {
        optionLabel: 6,
        optionValue: 6,
      },
      {
        optionLabel: 7,
        optionValue: 7,
      },
      {
        optionLabel: 8,
        optionValue: 8,
      },
      {
        optionLabel: 9,
        optionValue: 9,
      },
      {
        optionLabel: 10,
        optionValue: 10,
      },
    ];

    this.selectProductLabels = {
      selectLabel: 'QTY',
      selectName: 'product-qty',
    }
  }

}
