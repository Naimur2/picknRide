import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import BackButton from "../components/BackButton/BackButton";
import useUI from "../hooks/useUI";
import CameraView from "../screens/CameraView/CameraView";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentSubmission from "../screens/DocumentSubmission/DocumentSubmission";

export default function UserRoute() {
    const Stack = createNativeStackNavigator();
    const { colorMode } = useColorMode();
    const navigation = useNavigation();
    

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: "",
                headerTitleStyle: { color: "white" },
                headerTintColor: colorMode === "light" ? "black" : "white",
                headerTransparent: true,
                headerStyle: {
                    height: "100",
                },
                headerLeft: () => <BackButton />,
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
                name="DocumentSubmission"
                component={DocumentSubmission}
            />
            <Stack.Screen
                name="CameraView"
                component={CameraView}
            />
        </Stack.Navigator>
    );
}
