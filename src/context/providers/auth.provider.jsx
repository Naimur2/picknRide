import React from "react";
import { AuthContext } from "../contexts";

const defaultState = {
    isAuthenciated: true,
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenciated: true,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenciated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default function AuthProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    const value = React.useMemo(() => {
        const login = (user) => {
            dispatch({ type: "LOGIN", payload: user });
        };

        const logout = () => {
            dispatch({ type: "LOGOUT" });
        };

        const register = (user) => {
            dispatch({ type: "LOGIN", payload: user });
        };
        return {
            isAuthenciated: state.isAuthenciated,
            user: state.user,
            login,
            logout,
            register,
        };
    }, [state]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
