import { apiSliceV2 } from "../apiSlice";
import {
    IEndCarTrip,
    IRequestStartCarTrip,
    IStartCarTrip,
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
    }),
});

export const {
    useUploadCarImageMutation,
    useRequestStartCarTripMutation,
    useValidateCarTripRequestMutation,
    useStartCarTripMutation,
    useEndCarTripMutation,
} = tripApiSlice;
