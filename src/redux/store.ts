import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./api/v1/apiSlice";
import { apiSliceV2 } from "./api/v2/apiSlice";
import authReducer from "./features/auth/authSlice";
import carsReducer from "./features/cars/carsSlice";
import documentReducer from "./features/document/documentSlice";
import uiReducer from "./features/ui/uiSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCarsReducer = persistReducer(persistConfig, carsReducer);
const persistedDocumentReducer = persistReducer(persistConfig, documentReducer);

const reducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceV2.reducerPath]: apiSliceV2.reducer,
    auth: persistedAuthReducer,
    ui: uiReducer,
    cars: persistedCarsReducer,
    document: persistedDocumentReducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(apiSlice.middleware)
            .concat(apiSliceV2.middleware),
    devTools: false,
});

export const persistor = persistStore(store);

export const selectAuth = (state: any) => state.auth;
export const selectLoading = (state: any) => state.ui.loading;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
