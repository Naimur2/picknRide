import { IUserLocationState } from "./userLocationSlice.types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: IUserLocationState = {
    currentLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.009,
        longitudeDelta: 0.01,
    },
    hasBackgroundLocationPermission: false,
    hasForegroundLocationPermission: false,
};

export const userLocationSlice = createSlice({
    name: "userLocation",
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setHasBackgroundLocationPermission: (state, action) => {
            state.hasBackgroundLocationPermission = action.payload;
        },
        setHasForegroundLocationPermission: (state, action) => {
            state.hasForegroundLocationPermission = action.payload;
        },
    },
});

export const selectCurrentLocation = (state: any) =>
    state.userLocation.currentLocation;
export const selectHasBackgroundLocationPermission = (state: RootState) =>
    state.userLocation.hasBackgroundLocationPermission;
export const selectHasForegroundLocationPermission = (state: RootState) =>
    state.userLocation.hasForegroundLocationPermission;

export const selectCurrentRegion = (state: RootState) =>
    state.userLocation.currentLocation;

const userLocationReducer = userLocationSlice.reducer;

export const {
    setCurrentLocation,
    setHasBackgroundLocationPermission,
    setHasForegroundLocationPermission,
} = userLocationSlice.actions;

export default userLocationReducer;
