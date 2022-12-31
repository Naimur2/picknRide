import { apiSlice } from "../apiSlice";

const configApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLocationApi: builder.query({
            query: () => ({
                url: "getLocation",
                method: "GET",
            }),
        }),
        getResidencyApi: builder.query({
            query: () => ({
                url: "getResidency",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetLocationApiQuery, useGetResidencyApiQuery } =
    configApiSlice;
