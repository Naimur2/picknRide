import { apiSliceV2 } from "../apiSlice";
import { IUserDocumentSubmission } from "./documentApiSlice.types";

const documentApiSlice = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        submitDocument: builder.mutation({
            query: (document: IUserDocumentSubmission) => ({
                url: "UserDocument",
                method: "POST",
                body: document,
            }),
        }),
        getDocument: builder.query({
            query: (document: IUserDocumentSubmission) => ({
                url: "/UserDocument/GetUserDocument",
                method: "GET",
            }),
        }),
    }),
});

export const { useSubmitDocumentMutation } = documentApiSlice;
