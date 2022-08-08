import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SplashSecond from "../screens/SplashSecond/SplashSecond";
import SplashThird from "../screens/SplashThird/SplashThird";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import { useColorMode } from "native-base";
import OtpScreen from "../screens/OtpScreen/OtpScreen";
import SelectCitizenShip from "../screens/SelectCitizenShip/SelectCitizenShip";
import SelectArrivalDate from "../screens/SelectArrivalDate/SelectArrivalDate";
import AddCards from "../screens/AddCards/AddCards";


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
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="SelectCitizenShip" component={SelectCitizenShip} />
            <Stack.Screen name="SelectArrivalDate" component={SelectArrivalDate} />
            <Stack.Screen name="AddCards" component={AddCards} />
        </Stack.Navigator>
    );
}
