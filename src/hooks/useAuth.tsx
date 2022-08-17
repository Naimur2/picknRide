import React from "react";
import { AuthContext } from "../context/contexts";
import { IAuthProviderProps } from "../interfaces/context";

export default function useAuth() {
    const authCtx = React.useContext(AuthContext);

    const {
        isAuthenciated,
        user,
        login,
        logout,
        register,
    }: IAuthProviderProps = authCtx;

    const authProps: IAuthProviderProps = {
        isAuthenciated,
        user,
        login,
        logout,
        register,
    };

    return authProps;
}
