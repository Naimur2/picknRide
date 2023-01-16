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
    card_status: null,
    photo: null,
    resident_status: null,
    userdocuments_status: null,
    checkOtherInformation: false,
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
            state.card_status = action.payload?.card_status;
            state.photo = action.payload?.photo;
            state.resident_status = action.payload?.resident_status;
            state.userdocuments_status = action.payload?.userdocuments_status;
            state.checkOtherInformation = action.payload?.checkOtherInformation;
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
            state.card_status = null;
            state.photo = null;
            state.resident_status = null;
            state.userdocuments_status = null;
            state.checkOtherInformation = false;
        },
        setCheckOtherInformation(state, action) {
            state.checkOtherInformation = action.payload;
        },
    },
});

export const { login, logout, setCheckOtherInformation } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
