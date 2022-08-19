import React from "react";
import { AuthContext } from "../contexts";

const defaultState = {
    isAuthenciated: false,
    user: {
        name: "John Doe",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
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
