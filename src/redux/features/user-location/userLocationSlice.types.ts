import { Region } from "react-native-maps";

export interface IUserLocationState {
    currentLocation: Region | null;
    hasBackgroundLocationPermission: boolean;
    hasForegroundLocationPermission: boolean;
}
