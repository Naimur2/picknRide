import BackButton from "@components/BackButton/BackButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCards from "@screens/auth-screens/AddCards/AddCards";
import Login from "@screens/auth-screens/Login/Login";
import OtpScreen from "@screens/auth-screens/OtpScreen/OtpScreen";
import Register from "@screens/auth-screens/Register/Register";
import SplashSecond from "@screens/auth-screens/SplashSecond/SplashSecond";
import SplashThird from "@screens/auth-screens/SplashThird/SplashThird";
import SelectArrivalDate from "@screens/user-screens/SelectArrivalDate/SelectArrivalDate";
import SelectCitizenShip from "@screens/user-screens/SelectCitizenShip/SelectCitizenShip";
import { useColorMode } from "native-base";
import React from "react";

export default function AuthRoute() {
    const Stack = createNativeStackNavigator();
    const { colorMode } = useColorMode();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: "",
                headerTitleStyle: { color: "white" },
                headerTintColor: colorMode === "light" ? "black" : "white",
                headerLeft: () => <BackButton />,
                headerStyle: {
                    backgroundColor: colorMode === "light" ? "white" : "black",
                },
                headerShadowVisible: false,
                animation: "slide_from_left",

                // statusBarHidden: true,
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                    headerTransparent: true,
                }}
                name="SplashSecond"
                component={SplashSecond}
            />
            <Stack.Screen name="SplashThird" component={SplashThird} />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,

                    headerBackTitleVisible: false,
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,

                    headerBackTitleVisible: false,
                }}
                name="Register"
                component={Register}
            />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen
                name="SelectCitizenShip"
                component={SelectCitizenShip}
            />
            <Stack.Screen
                name="SelectArrivalDate"
                component={SelectArrivalDate}
            />
            <Stack.Screen
                name="AddCards"
                component={AddCards}
                options={{
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}
