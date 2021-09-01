export const steps =[
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

export const paymentOptions = [
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

export const productPriceOptions = [
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