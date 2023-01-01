export interface IUploadCarImages {
    tripToken: string;
    vehicleNo: string;
    frontImage: string;
    backImage: string;
    leftSideImage: string;
    rightSideImage: string;
}

export interface IValidateCarTripRequest {
    numberPlateImage: string;
    mobileLatitude: string;
    mobileLongitude: string;
}
export interface IRequestStartCarTrip {
    tripToken: string;
}

export interface IStartCarTrip {
    otp: string;
    tripToken: string;
}

export interface IEndCarTrip extends IRequestStartCarTrip {}
