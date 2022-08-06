import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SplashSecond from "../screens/SplashSecond/SplashSecond";
import SplashThird from "../screens/SplashThird/SplashThird";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

export default function AuthRoute() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="SplashSecond"
                component={SplashSecond}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="SplashThird"
                component={SplashThird}
            />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTitle: "",
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTitle: "",
                }}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}
