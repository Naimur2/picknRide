import React from "react";

export const AuthContext = React.createContext({
    isLoggedIn: false,
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const UIContext = React.createContext({
    backButtonColor: "#000",
    setBackButtonColor: () => {},
});
