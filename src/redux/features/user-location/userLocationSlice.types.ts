import { ILatLng } from "../../../screens/MapScreen/MapScreen.types";

export interface IUserLocationState {
    currentLocation: ILatLng | null;
    hasBackgroundLocationPermission: boolean;
    hasForegroundLocationPermission: boolean;
}
