import { IValidateCarTripData } from "../ScanQrCode/ScanQrCode.types";

export interface IStartEndTripParams {
    type: "START" | "END";
    data: IValidateCarTripData;
}
