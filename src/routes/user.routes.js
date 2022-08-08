import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import Dashboard from "../screens/Dashboard/Dashboard";

export default function UserRoute() {
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
                name="Dashboard"
                component={Dashboard}
            />
           
        </Stack.Navigator>
    );
}
