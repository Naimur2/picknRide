import { createSlice } from "@reduxjs/toolkit";
import { IDocumentState } from "./documentSlice.types";

const initialState: IDocumentState = {
    video: null,
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        setDocumentVideo(state, action) {
            state.video = action.payload;
        },
    },
});

export const selectDocumentVideo = (state: any) => state.document.video;
export const { setDocumentVideo } = documentSlice.actions;

const documentReducer = documentSlice.reducer;
export default documentReducer;
