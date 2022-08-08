import React from "react";
import AuthRoute from "./routes/auth.routes";
import useAuth from "./hooks/useAuth";
import DrawerRoute from "./routes/drawer.routes";

export default function Main() {
    const auth = useAuth();

    return auth.isAuthenciated ? <DrawerRoute /> : <AuthRoute />;
}
