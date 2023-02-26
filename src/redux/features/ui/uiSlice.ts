import { ITemperatur, UIState } from "./uiSlice.types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState: UIState = {
    loading: false,
    startOrEndRide: undefined,
    temperatur: undefined,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setStartOrEndRide: (
            state,
            action: {
                payload: "start" | "end";
            }
        ) => {
            state.startOrEndRide = action.payload;
        },
        setTemperature: (
            state,
            action: {
                payload: ITemperatur;
            }
        ) => {
            state.temperatur = action.payload;
        },
    },
});

export const { setLoading, setStartOrEndRide, setTemperature } =
    uiSlice.actions;
export const selectStartOrEndRide = (state: RootState) =>
    state.ui.startOrEndRide;
export const selectLoading = (state: RootState) => state.ui.loading;
export const selectTemperature = (state: RootState) => state.ui.temperatur;
export default uiSlice.reducer;
