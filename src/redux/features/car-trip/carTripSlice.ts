import { createSlice } from "@reduxjs/toolkit";
import { ICarTripState } from "./carTripSlice.types";
import { RootState } from "@store/store";

const initialState: ICarTripState = {
    tripInfo: null,
    hasStartedJourney: false,
    isLocked: false,
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
        setIsLocked: (state, action) => {
            state.isLocked = action.payload;
        },
        clearCarTrip: (state) => {
            state.tripInfo = null;
            state.hasStartedJourney = false;
            state.isLocked = false;
        },
    },
});

const carTripReducer = carTripSlice.reducer;
export default carTripReducer;

export const { setTripInfo, stopCarTrip, setIsLocked, clearCarTrip } =
    carTripSlice.actions;

export const selectCarTripInfo = (state: any) => state.carTrip.tripInfo;
export const selectHasStartedJourney = (state: any) =>
    state.carTrip.hasStartedJourney;
export const selectIsLocked = (state: RootState) => state.carTrip.isLocked;
