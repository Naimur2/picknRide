import React from "react";
import { AuthContext } from "../context/contexts";

export default function useAuth() {
    const authCtx = React.useContext(AuthContext);

    const {
        isLoggedIn: isAuthenciated,
        user,
        login,
        logout,
        register,
    } = authCtx;

    return {
        isAuthenciated,
        user,
        login,
        logout,
        register,
    };
}
