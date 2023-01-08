import { IUserLocationState } from "./userLocationSlice.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserLocationState = {
    currentLocation: null,
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
export const selectHasBackgroundLocationPermission = (state: any) =>
    state.userLocation.hasBackgroundLocationPermission;
export const selectHasForegroundLocationPermission = (state: any) =>
    state.userLocation.hasForegroundLocationPermission;

const userLocationReducer = userLocationSlice.reducer;

export const {
    setCurrentLocation,
    setHasBackgroundLocationPermission,
    setHasForegroundLocationPermission,
} = userLocationSlice.actions;

export default userLocationReducer;
