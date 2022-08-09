import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentSubmission from "../screens/DocumentSubmission/DocumentSubmission";

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
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="DocumentSubmission" component={DocumentSubmission} />
        </Stack.Navigator>
    );
}
