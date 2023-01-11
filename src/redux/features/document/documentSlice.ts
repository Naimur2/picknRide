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
        setAllDocumentFieldValues: (state, action) => {
            const {
                isIntlLiscense,
                docId1,
                expiry1,
                frontImage1,
                backImage1,
                docId2,
                expiry2,
                frontImage2,
                backImage2,
                signature,
                country,
            } = action.payload;
            state.isIntlLiscense = isIntlLiscense;
            state.docId1 = docId1;
            state.expiry1 = expiry1;
            state.frontImage1 = frontImage1;
            state.backImage1 = backImage1;
            state.docId2 = docId2;
            state.expiry2 = expiry2;
            state.frontImage2 = frontImage2;
            state.backImage2 = backImage2;
            state.signature = signature;
            state.country = country;
        },
    },
});

export const selectDocumentVideo = (state: RootState) =>
    state.document.selfieVideo;
export const selectAllDocumentFieldValues = (state: RootState) =>
    state.document;

export const { setDocumentVideo, setAllDocumentFieldValues } =
    documentSlice.actions;

const documentReducer = documentSlice.reducer;
export default documentReducer;
