import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./authSlice.types";

const initialState: IAuthState = {
    f_name: null,
    l_name: null,
    location_id: null,
    dialing_code: null,
    phone: null,
    email: null,
    wallet: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.f_name = action.payload?.f_name;
            state.l_name = action.payload?.l_name;
            state.location_id = action.payload?.location_id;
            state.dialing_code = action.payload?.dialing_code;
            state.phone = action.payload?.phone;
            state.email = action.payload?.email;
            state.wallet = action.payload?.wallet;
            state.token = action.payload.token;
        },
        logout(state) {
            state.f_name = null;
            state.l_name = null;
            state.location_id = null;
            state.dialing_code = null;
            state.phone = null;
            state.email = null;
            state.wallet = null;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
