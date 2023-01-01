import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@config";

import { setLoading } from "@store/features/ui/uiSlice";
import { RootState } from "@store/store";

const baseQuery = fetchBaseQuery({
    baseUrl: config.API_V2,
    credentials: "include",
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;
        const authState = state?.auth;

        if (authState?.token) {
            headers.set("Authorization", `Bearer ${authState.token}`);
            headers.set("Pick&Ride-Token", `${authState.token}`);
        }
        return headers;
    },
});

const loadingBaseQuery: any = async (
    args: any,
    api: any,
    extraOptions: any
) => {
    const { dispatch } = api;
    dispatch(setLoading(true));
    const result = await baseQuery(args, api, extraOptions);
    dispatch(setLoading(false));
    return result;
};

export const apiSliceV2 = createApi({
    reducerPath: "apiSliceV2",
    baseQuery: loadingBaseQuery,
    endpoints: (builder) => ({}),
});
