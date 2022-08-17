import React from "react";
import { IAuthProviderProps } from "../interfaces/context";

export const AuthContext = React.createContext<IAuthProviderProps>({
    isAuthenciated: true,
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const UIContext = React.createContext({
    backButtonColor: "#000",
    setBackButtonColor: () => {},
});
