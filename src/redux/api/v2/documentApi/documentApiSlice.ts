import { apiSliceV2 } from "../apiSlice";

const documentApiSlice = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        checkVerification: builder.query({
            query: () => ({
                url: "UserDocument/GetUserDocumentsStatus",
                method: "GET",
            }),
        }),
        uploadDocument: builder.mutation({
            query: (document: FormData) => ({
                url: "UserDocument/UploadUserDocuments",
                method: "POST",
                body: document,
            }),
        }),
    }),
    overrideExisting: true,
});

export const { useUploadDocumentMutation, useCheckVerificationQuery } =
    documentApiSlice;
