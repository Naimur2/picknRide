import React from "react";
import { AuthContext } from "../context/contexts";

export default function useAuth() {
    const authCtx = React.useContext(AuthContext);

    return authCtx;
}
