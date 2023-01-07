export interface IDocument {
    documentType: string;
    docId: string;
    expiry: string;
    frontImage: string;
    backImage: string;
}
const document = {
    userType: "",
    internationalLicence: true,
    documents: [
        {
            documentType: "",
            docId: "",
            expiry: "",
            frontImage: "",
            backImage: "",
        },
    ],
    selfie: {
        image: "",
    },
    signature: {
        image: "",
    },
    selfieVideo: {
        video: "",
    },
};

export interface IDocumentImage {
    image: string;
}
export interface IDocumentVideo {
    video: string;
}

export interface IUserDocumentSubmission {
    userType: "0" | "1" | "2";
    internationalLicence: boolean;
    documents: IDocument[];
    selfie?: IDocumentImage;
    signature: IDocumentImage;
    selfieVideo: IDocumentVideo;
}
