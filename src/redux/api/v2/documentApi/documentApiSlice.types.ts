export type TDDocumentType = "Licence" | "Passport" | "Address";
export type TDUserType = "Residence" | "Tourist";

export enum EDocumentType {
    Licence = "Licence",
    Passport = "Passport",
    Address = "Address",
}

export enum EUserType {
    Residence = "Residence",
    Tourist = "Tourist",
}

export interface IDocument {
    documentType: TDDocumentType;
    docId: string;
    expiry: string;
    frontImage: string;
    backImage: string;
    country?: string;
}

export interface IDocumentImage {
    image: string;
}
export interface IDocumentVideo {
    video: string;
}

export interface IUserDocumentSubmission {
    userType: TDUserType;
    internationalLicence: boolean;
    documents: IDocument[];
    selfie?: IDocumentImage;
    signature: IDocumentImage;
    selfieVideo: IDocumentVideo;
}
