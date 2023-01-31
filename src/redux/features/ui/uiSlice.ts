import { UIState } from "./uiSlice.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UIState = {
    loading: false,
    startOrEndRide: undefined,
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
    },
});

export const { setLoading, setStartOrEndRide } = uiSlice.actions;
export const selectStartOrEndRide = (state: any) => state.ui.startOrEndRide;
export default uiSlice.reducer;
