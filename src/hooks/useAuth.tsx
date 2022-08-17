import React from "react";
import { AuthContext } from "../context/contexts";
import { IAuthProviderProps } from "../interfaces/context";

interface AuthProviderProps {
    isAuthenciated: boolean;
    user: any;
    login: (user: any) => void;
    logout: () => void;
    register: (user: any) => void;
}

export default function useAuth() {
    const authCtx = React.useContext(AuthContext);

    const {
        isAuthenciated,
        user,
        login,
        logout,
        register,
    }: IAuthProviderProps = authCtx;

    return {
        isAuthenciated,
        user,
        login,
        logout,
        register,
    };
}
