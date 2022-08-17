import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import BackButton from "../components/BackButton/BackButton";
import useUI from "../hooks/useUI";
import CameraView from "../screens/CameraView/CameraView";
import Cars from "../screens/Cars/Cars";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentSubmission from "../screens/DocumentSubmission/DocumentSubmission";
import Notifications from "../screens/Notifications/Notifications";
import RideHistory from "../screens/RideHistory/RideHistory";
import Settings from "../screens/Settings/Settings";

const Stack = createNativeStackNavigator();


export default function UserRoute() {
    const { colorMode } = useColorMode();
    
    

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
            <Stack.Screen
                name="Cars"
                component={Cars}
            />
            <Stack.Screen
                name="RideHistory"
                component={RideHistory}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
            />
        </Stack.Navigator>
    );
}