import { createSlice } from "@reduxjs/toolkit";
import { ICarTripState } from "./carTripSlice.types";

const initialState: ICarTripState = {
    tripInfo: null,
    hasStartedJourney: false,
};

const carTripSlice = createSlice({
    name: "carTrip",
    initialState,
    reducers: {
        setTripInfo: (state, action) => {
            state.tripInfo = action.payload;
            state.hasStartedJourney = action.payload ? true : false;
        },
        stopCarTrip: (state) => {
            state.tripInfo = null;
            state.hasStartedJourney = false;
        },
    },
});

const carTripReducer = carTripSlice.reducer;
export default carTripReducer;

export const { setTripInfo, stopCarTrip } = carTripSlice.actions;

export const selectCarTripInfo = (state: any) => state.carTrip.tripInfo;
