import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import BackButton from "../components/BackButton/BackButton";
import AddCards from "../screens/AddCards/AddCards";
import Login from "../screens/Login/Login";
import OtpScreen from "../screens/OtpScreen/OtpScreen";
import Register from "../screens/Register/Register";
import SelectArrivalDate from "../screens/SelectArrivalDate/SelectArrivalDate";
import SelectCitizenShip from "../screens/SelectCitizenShip/SelectCitizenShip";
import SplashSecond from "../screens/SplashSecond/SplashSecond";
import SplashThird from "../screens/SplashThird/SplashThird";

export default function AuthRoute() {
    const Stack = createNativeStackNavigator();
    const { colorMode } = useColorMode();



    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: "",
                headerTitleStyle: { color: "white" },
                headerTintColor: colorMode === "light" ? "black" : "white",
                headerTransparent: true,
                headerLeft: () => <BackButton />,
            }}
        >
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
                    headerBackTitleVisible: false,
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTransparent: true,
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
