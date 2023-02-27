import { apiSliceV2 } from "../apiSlice";
import { ICarCommands } from "./tripApiSlice.types";
import {
    IEndCarTrip,
    IRequestStartCarTrip,
    IStartCarTrip,
    IStartCarTripOtpType,
    IUploadCarImages,
    IValidateCarTripRequest,
} from "./tripApiSlice.types";

const tripApiSlice = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        uploadCarImage: builder.mutation({
            query: (body: IUploadCarImages) => ({
                url: "CarTrip/UploadCarImages",
                method: "POST",
                body,
            }),
        }),
        validateCarTripRequest: builder.mutation({
            query: (body: IValidateCarTripRequest) => ({
                url: "CarTrip/ValidateCarTripRequest",
                method: "POST",
                body,
            }),
        }),
        requestStartCarTrip: builder.mutation({
            query: (body: IRequestStartCarTrip) => ({
                url: "CarTrip/RequestStartCarTrip",
                method: "POST",
                body,
            }),
        }),
        startCarTrip: builder.mutation({
            query: (body: IStartCarTrip) => ({
                url: "CarTrip/StartCarTrip",
                method: "POST",
                body,
            }),
        }),
        endCarTrip: builder.mutation({
            query: (body: IEndCarTrip) => ({
                url: "CarTrip/EndCarTrip",
                method: "POST",
                body,
            }),
        }),
        sendCarTripOtpType: builder.mutation({
            query: (body: IStartCarTripOtpType) => ({
                url:
                    body.type === "email"
                        ? "CarTrip/RequestStartCarTripEmailOTP"
                        : "CarTrip/RequestStartCarTripWhatsAppOTP",
                method: "POST",
                body,
            }),
        }),
        lockUnlock: builder.mutation({
            query: (body: { lock: boolean; tripToken: string }) => ({
                url: "CarTrip/LockUnLockCarTrip",
                method: "POST",
                body,
            }),
        }),
        executeCarCommand: builder.mutation({
            query: (body: ICarCommands) => ({
                url: "CarTrip/CommandStatusCarTrip",
                method: "POST",
                body,
            }),
        }),
        checkIsCarTripActive: builder.query({
            query: () => ({
                url: "CarTrip/TripStatus",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useUploadCarImageMutation,
    useRequestStartCarTripMutation,
    useValidateCarTripRequestMutation,
    useStartCarTripMutation,
    useEndCarTripMutation,
    useSendCarTripOtpTypeMutation,
    useLockUnlockMutation,
    useExecuteCarCommandMutation,
    useCheckIsCarTripActiveQuery,
} = tripApiSlice;
