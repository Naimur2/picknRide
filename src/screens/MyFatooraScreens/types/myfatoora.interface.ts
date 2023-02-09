import { MFCurrencyISO, MFMobileCountryCodeISO, MFPaymentype } from "./enums.myfatoora";

export interface IGetSendPaymentRequest {
    invoiceValue: number;
    mobileCountryIsoCode: keyof typeof MFMobileCountryCodeISO;
    displayCurrencyIso: keyof typeof MFCurrencyISO;
}

export interface IExecuteResquestJson {
    invoiceValue: number;
    paymentMethods: any[];
    selectedIndex: number;
}


export interface IGetCardDetails {
    cardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardSecureCode: string;
    paymentType: keyof typeof MFPaymentype;
    cardHolderName: string;
    saveToken?: boolean;
    bypass?: boolean;
}