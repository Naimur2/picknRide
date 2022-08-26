import React from "react";
import { IAuthProviderProps } from "../interfaces/context";

export const AuthContext = React.createContext<IAuthProviderProps>({
    isAuthenciated: true,
    user: null,
    currentLocation: null,
    login: () => {},
    logout: () => {},
    register: () => {},
    setCurrentLocation: () => {},
    isLoading: true,
    setLoading: () => {},
    error: null,
    setError: () => {},
});

export const UIContext = React.createContext({
    backButtonColor: "#000",
    setBackButtonColor: () => {},
});
