import { ILoginProps } from "../../../types/interfaces/index";
import { login } from "../../features/auth/authSlice";
import { apiSlice } from "../apiSlice";
import { IAuthState } from "../../features/auth/authSlice.types";

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
    }),
    overrideExisting: true,
});

export const { useLoginApiMutation, useRegisterApiMutation } = authApiSlice;
