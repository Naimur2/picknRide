import { createSlice } from "@reduxjs/toolkit";
import { IDocumentState } from "./documentSlice.types";
import { RootState } from "../../store";

const initialState: IDocumentState = {
    isIntlLiscense: true,
    docId1: "",
    expiry1: "",
    frontImage1: "",
    backImage1: "",
    docId2: "",
    expiry2: "",
    frontImage2: "",
    backImage2: "",
    signature: "",
    country: "",
    selfieVideo: "",
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setDocumentVideo(state, action) {
            state.selfieVideo = action.payload;
        },
        setDocumentFieldValue: (
            state,
            action: {
                payload: {
                    fieldName: keyof IDocumentState;
                    value: string;
                };
            }
        ) => {
            state[action.payload.fieldName] = action.payload.value as never;
        },
    },
});

export const selectDocumentVideo = (state: RootState) =>
    state.document.selfieVideo;
export const selectAllDocumentFieldValues = (state: RootState) =>
    state.document;

export const { setDocumentVideo, setDocumentFieldValue } =
    documentSlice.actions;

const documentReducer = documentSlice.reducer;
export default documentReducer;
