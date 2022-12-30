import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../../config";
import { IAuthState } from "../features/auth/authSlice.types";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: config.API_V1,
    credentials: "include",
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;
        const authState = state?.auth;

        if (authState?.token) {
            headers.set("Authorization", `Bearer ${authState.token}`);
        }
        return headers;
    },
});

// // base query with refresh token logic
// export const baseQueryWithRefresh = async (
//     args: any,
//     api: any,
//     extraOptions: any
// ) => {
//     const result = await baseQuery(args, api, extraOptions);
//     if (result.error) {
//         const { status } = result.error;
//         if (status === 401) {
//             // refresh token logic
//         }
//     }
//     return result;
// };

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});
