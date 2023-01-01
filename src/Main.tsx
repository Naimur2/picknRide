import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Spinner } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { selectAuth, selectLoading } from "@store/store";

const Stack = createNativeStackNavigator();

export default function Main() {
    const auth = useSelector(selectAuth) as IAuthState;
    const loading = useSelector(selectLoading);

    const Content = auth?.token ? DrawerRoute : AuthRoute;

    return (
        <>
            {loading && (
                <Spinner
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    size={"lg"}
                    color="blue"
                    zIndex={1000}
                />
            )}
            <Content />
        </>
    );

    // return (
    //     <Stack.Navigator>
    //         <Stack.Screen name="Home" component={HomeScreen} />
    //     </Stack.Navigator>
    // );
}
