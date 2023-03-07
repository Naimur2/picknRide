import { apiSliceV2 } from "../apiSlice";
import { ITopUpBalance } from "../documentApi/documentApiSlice.types";
import {
    IExecuteDirectPaymentWithToken,
    IExecuteDirectPaymentWithoutToken,
    IInitiateDirectPayment,
} from "./paymentApiSlice.types";

export const paymentApiSilce = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        topUP: builder.mutation({
            query: (body: ITopUpBalance) => ({
                url: "Payment/TopUp",
                method: "POST",
                body,
            }),
        }),
        initiateDirectPayment: builder.mutation({
            query: (body: IInitiateDirectPayment) => ({
                url: "Payment/InitiateDirectPayment",
                method: "POST",
                body,
            }),
        }),
        exexuteDirectPaymentWithToken: builder.mutation({
            query: (body: IExecuteDirectPaymentWithToken) => ({
                url: "Payment/ExecuteDirectPaymentWithToken",
                method: "POST",
                body,
            }),
        }),
        executeDirectPaymentWithoutToken: builder.mutation({
            query: (body: IExecuteDirectPaymentWithoutToken) => ({
                url: "Payment/ExecuteDirectPaymentWithoutToken",
                method: "POST",
                body,
            }),
        }),
        callbackPayment: builder.query({
            query: (body: { paymentId: string; id: string }) => ({
                url: `Payment/CallBackPayment?paymentId=${body.paymentId}&id=${body.id}`,
                method: "GET",
            }),
        }),
        callbackPaymentError: builder.query({
            query: (body: { paymentId: string; id: string }) => ({
                url: `Payment/CallBackPaymentError?paymentId=${body.paymentId}&id=${body.id}`,
                method: "GET",
            }),
        }),
        getPaymentStatus: builder.query({
            query: (body: { paymentId: string }) => ({
                url: `Payment/GetPaymentStatus?paymentId=${body.paymentId}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useTopUPMutation,
    useInitiateDirectPaymentMutation,
    useExexuteDirectPaymentWithTokenMutation,
    useExecuteDirectPaymentWithoutTokenMutation,
    useCallbackPaymentQuery,
    useCallbackPaymentErrorQuery,
    useGetPaymentStatusQuery,
} = paymentApiSilce;
