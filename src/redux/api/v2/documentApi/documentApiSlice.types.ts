export interface  IDocument {
    "documentType": string;
    "docId": string;
    "expiry": string;
    "frontImage": string;
    "backImage": string;
}


export interface IUserDocumentSubmission {
    "userType": string,
    "internationalLicence": boolean,
    "documents": IDocument[]
}