import React from "react";
import useAuth from "./hooks/useAuth";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";

export default function Main() {
    const auth = useAuth();

    if (auth?.isAuthenciated) {
        return <DrawerRoute />;
    }

    return <AuthRoute />;
}
