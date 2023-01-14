import { apiSliceV2 } from "../apiSlice";
import {
    IUploadUserDocument,
    IUploadUserSelfieVideo,
    IUploadUserSignatureImage,
    IUserDocumentSubmission,
} from "./documentApiSlice.types";

const documentApiSlice = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        submitDocument: builder.mutation({
            query: (document: IUserDocumentSubmission) => ({
                url: "UserDocument",
                method: "POST",
                body: document,
            }),
        }),
        getUserDocumentsStatus: builder.query({
            query: (document: IUserDocumentSubmission) => ({
                url: "UserDocument/GetUserDocumentsStatus",
                method: "GET",
            }),
        }),
        uploadUserDocuments: builder.mutation({
            query: (document: IUploadUserDocument) => ({
                url: "UserDocument/UploadUserDocuments",
                method: "POST",
            }),
        }),
        uploadSelfieVideo: builder.mutation({
            query: (document: IUploadUserSelfieVideo) => ({
                url: "UserDocument/UploadSelfieVideo",
                method: "POST",
            }),
        }),
        uploadSignatureImage: builder.mutation({
            query: (document: IUploadUserSignatureImage) => ({
                url: "UserDocument/UploadSignatureImage",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useSubmitDocumentMutation,
    useUploadSelfieVideoMutation,
    useUploadSignatureImageMutation,
    useUploadUserDocumentsMutation,
    useGetUserDocumentsStatusQuery,
} = documentApiSlice;
