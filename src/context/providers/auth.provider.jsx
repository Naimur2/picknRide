import React from "react";
import { AuthContext } from "../contexts";

const defaultState = {
    isLoggedIn: true,
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
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
            isLoggedIn: state.isLoggedIn,
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
