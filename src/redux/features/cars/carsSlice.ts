import { createSlice } from "@reduxjs/toolkit";
import { ICarState } from "./carsSlice.types";

const initialState: ICarState = {
    nearestCars: [],
};

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setNearestCars: (state: ICarState, action: any) => {
            state.nearestCars = [...state.nearestCars, ...action.payload];
        },
    },
});

const carsReducer = carsSlice.reducer;
export default carsReducer;
export const { setNearestCars } = carsSlice.actions;
export const selectNearestCars = (state: any) => state.cars.nearestCars;
