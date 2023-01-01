import { apiSlice } from "../apiSlice";

import { login } from "../../../features/auth/authSlice";
import { IAuthState } from "../../../features/auth/authSlice.types";
import {
    IAddCard,
    ILoginProps,
    IOtpVerify,
    IUpdateResidency,
    TResendOtp,
} from "./authApiSlice.types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginApi: builder.mutation({
            query: (body: ILoginProps) => {
                return {
                    url: "login",
                    method: "POST",
                    body: body,
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    console.log("arg", arg);
                    const result = await queryFulfilled;
                    const { data } = result;
                    console.log({ data });
                    dispatch(login(data.data as IAuthState));
                } catch (error) {}
            },
        }),
        registerApi: builder.mutation({
            query: (body) => ({
                url: "sign_up",
                method: "POST",
                body: body,
            }),
        }),
        otpVerifyApi: builder.mutation({
            query: (body: IOtpVerify) => ({
                url: "otp_verify",
                method: "POST",
                body: body,
            }),
        }),
        resendOtpApi: builder.mutation({
            query: (body: TResendOtp) => ({
                url: "resend_otp",
                method: "POST",
                body: body,
            }),
        }),
        addCardsApi: builder.mutation({
            query: (body: IAddCard) => ({
                url: "addCards",
                method: "POST",
                body: body,
            }),
        }),
        updateResidencyApi: builder.mutation({
            query: (body: IUpdateResidency) => ({
                url: "updateResidency",
                method: "POST",
                body: body,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useLoginApiMutation,
    useRegisterApiMutation,
    useOtpVerifyApiMutation,
    useResendOtpApiMutation,
    useAddCardsApiMutation,
    useUpdateResidencyApiMutation,
} = authApiSlice;
