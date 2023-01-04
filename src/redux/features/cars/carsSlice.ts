import { createSlice } from "@reduxjs/toolkit";
import {
    ICarState,
    ISetNearestCarsAction,
    ISetSelectedVeichleTypeAction,
} from "./carsSlice.types";

const initialState: ICarState = {
    nearestCars: [],
    selectedVeichleType: null,
};

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setNearestCars: (state: ICarState, action: ISetNearestCarsAction) => {
            state.nearestCars = [...state.nearestCars, ...action.payload];
        },

        setSelectedVeichleType: (
            state: ICarState,
            action: ISetSelectedVeichleTypeAction
        ) => {
            state.selectedVeichleType = action.payload;
        },
    },
});

const carsReducer = carsSlice.reducer;
export default carsReducer;
export const { setNearestCars, setSelectedVeichleType } = carsSlice.actions;
export const selectNearestCars = (state: any) => state.cars.nearestCars;
export const selectSelectedVeichleType = (state: any) =>
    state.cars.selectedVeichleType;
