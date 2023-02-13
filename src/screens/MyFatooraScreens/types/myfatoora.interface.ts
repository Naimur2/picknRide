import {
    MFCurrencyISO,
    MFMobileCountryCodeISO,
    MFPaymentype,
} from "./enums.myfatoora";

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

export interface ICardProps {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    setIsDirectPayment: (isDirectPayment: boolean) => void;
    isDirectPayment: boolean;
    imageUrl: string;
    paymentMethodEn: string;
    row: number;
}

export interface ICardListProps {
    CurrencyIso: string;
    ImageUrl: string;
    IsDirectPayment: boolean;
    IsEmbeddedSupported: boolean;
    PaymentCurrencyIso: string;
    PaymentMethodAr: string;
    PaymentMethodCode: string;
    PaymentMethodEn: string;
    PaymentMethodId: number;
    ServiceCharge: number;
    TotalAmount: number;
}
