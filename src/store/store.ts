import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const reducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
    devTools: false,
});

export const persistor = persistStore(store);

export const selectAuth = (state: any) => state.auth;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
