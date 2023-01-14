import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { selectAuth, selectLoading } from "@store/store";
import { Spinner } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";

const Stack = createNativeStackNavigator();

export default function Main() {
    const auth = useSelector(selectAuth) as IAuthState;
    const loading = useSelector(selectLoading);
    const navigation = useNavigation();

    const currentRoute = navigation.getCurrentRoute();

    const Content = auth?.token ? DrawerRoute : AuthRoute;

    return (
        <>
            {loading && currentRoute?.name !== "MapScreen" && (
                <Spinner
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    size={80}
                    color="#2d064f"
                    zIndex={1000}
                />
            )}
            <Content />
        </>
    );
}
